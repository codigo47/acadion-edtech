# Course Module - AI Generation Pipeline

## Overview

The course module handles both CRUD operations and AI-powered course generation via an async job pipeline.

## Task Dispatcher Pattern

Single endpoint handles all course operations:

```typescript
POST /api/v1/course/tasks
Body: { taskName: TaskName, ...taskData }
```

**Task types** (defined in `enums/task-name.enum.ts`):
- `CREATE_COURSE` → Creates course record
- `GENERATE_TITLE` → AI generates title
- `SET_AUDIENCE`, `SET_OBJECTIVE`, `SET_BUILDING_METHOD` → Metadata
- `SET_MODULES`, `SET_UNITS` → Structure
- `GET_EXERCISE_TYPES` → Available exercise types
- `SET_EVALUATION`, `SET_EVALUATION_DETAILS` → Assessment config
- `SET_BRANDING` → Visual branding
- `GENERATE_COURSE` → Triggers full generation pipeline

Each task type has a corresponding DTO in `dto/create-course.dto.ts`.

## Generation Pipeline (orchestrator/)

When `GENERATE_COURSE` is dispatched, jobs are enqueued in BullMQ:

```
1. generate_objectives  → ObjectivesHandler (Bloom's Taxonomy)
2. generate_index       → IndexHandler (course structure)
3. generate_intro_unit  → IntroUnitHandler (per unit intro)
4. generate_content_unit → ContentUnitHandler (content blocks)
5. generate_module_evaluation → ModuleEvaluationHandler
6. generate_course_evaluation → CourseEvaluationHandler
```

### BaseHandler (Abstract)

All handlers extend `BaseHandler` which provides:
- `Logger` instance
- `ChatOpenAI` LLM instance (model: gpt-5, temperature: 1)
- `PrismaService` for database access
- `CourseSSEService` for real-time events

**Key utilities:**
```typescript
protected async saveComponents(courseId, userId, unitCode, resultJson)
protected async getUnitProgress(courseId)
protected async checkAndEmitGenerationComplete(courseId, courseKey)
protected parseUnitCode(unitCode): { module: number; unit: number }
```

### Handler Pattern
```typescript
@Injectable()
export class MyHandler extends BaseHandler {
  constructor(prisma: PrismaService, sseService: CourseSSEService) {
    super(prisma, sseService, 'MyHandler');
  }

  async generate(job: Job<MyJobData>) {
    const { courseId, courseKey } = job.data;

    // 1. Mark step as running
    await this.prisma.courseStep.updateMany({
      where: { courseId, type: 'my_step' },
      data: { status: 'running' },
    });
    this.sseService.emitStatusChange(courseKey, 'MY_PHASE', 'running');

    // 2. Use LangChain with structured output (Zod schema)
    const parser = StructuredOutputParser.fromZodSchema(mySchema);
    const result = await this.llm.invoke([...messages]);

    // 3. Save results to database
    await this.prisma.course.update({ ... });

    // 4. Emit completion event
    this.sseService.emitStatusChange(courseKey, 'MY_PHASE', 'completed');
  }
}
```

### Processor
```typescript
@Processor(COURSE_ORCHESTRATION_QUEUE)
export class CourseOrchestratorProcessor extends WorkerHost {
  async process(job: Job<JobData>) {
    switch (job.name) {
      case 'generate_objectives': return this.objectivesHandler.generate(job);
      case 'generate_index': return this.indexHandler.generate(job);
      // ... etc
    }
  }
}
```

## SSE (Real-Time Events)

`CourseSSEService` manages real-time events via RxJS Subjects:

```typescript
// Controller endpoint
@Sse(':key/events')
events(@Param('key') key: string): Observable<MessageEvent>
```

**Event types:**
- `progress` - Unit completion tracking
- `status_change` - Phase transitions
- `loading_text` - Current activity description (rotates every 6s)
- `unit_started`, `unit_completed`, `unit_failed` - Unit lifecycle
- `generation_complete` - All done
- `error` - Failure

**Loading texts** are defined in `constants/loading-texts.ts`, rotated automatically per phase.

## Component Data

Course content is stored as `CourseComponent` records:
- `courseId` - Parent course
- `componentId` - References `Component` table (block type definition)
- `module`, `unit`, `sequence` - Position in course structure
- `data` - JSON blob with all block-specific props

The `Component` table defines available block types with `componentName`, `type` (static/dynamic), `subtype` (content/exercise), and `groupKey` (for style switching).

## Queue Configuration

```typescript
// Queue name constant
export const COURSE_ORCHESTRATION_QUEUE = 'course_orchestration';

// Enqueue a job
await this.courseQueue.add('job_name', jobData);
```

BullMQ connects to Redis via `REDIS_HOST` and `REDIS_PORT` env vars.

## Adding a New Generation Step

1. Create handler class extending `BaseHandler` in `orchestrator/handlers/`
2. Define Zod schema for structured output
3. Add job name case in `CourseOrchestratorProcessor.process()`
4. Enqueue from `CourseService` at the appropriate point
5. Add `CourseStep` record for tracking
6. Emit SSE events for frontend progress
