import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { CourseInput, GenerateCourseEvaluationJobData } from '../types';
import { getComponentLists } from '../utils';

@Injectable()
export class CourseEvaluationHandler extends BaseHandler {
  constructor(prisma: PrismaService, sseService: CourseSSEService) {
    super(prisma, sseService, CourseEvaluationHandler.name);
  }

  async generate(job: Job<GenerateCourseEvaluationJobData>) {
    const { courseId, courseKey } = job.data;

    this.logger.log(`Generating course evaluation for course ${courseId}`);

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error(`Course ${courseId} not found`);
    }

    // Extract data from course.input
    const input = course.input as unknown as CourseInput;
    const { topic, audience, branding, generatedObjectives } = input;

    // Get course structure from output
    const output = course.output as Record<string, unknown>;
    const proposedIndex = output?.proposedIndex as
      | {
          title: string;
          modules: Array<{
            number: number;
            title: string;
            bloomObjectives?: string;
            units: Array<{
              code: string;
              title: string;
              bloomObjectives?: string;
            }>;
          }>;
        }
      | undefined;

    // Build full course structure string
    const fullCourseStructure = proposedIndex
      ? proposedIndex.modules
          .map(
            (m) =>
              `Module ${m.number}: ${m.title}\n${m.units.map((u) => `  - ${u.code}: ${u.title}`).join('\n')}`,
          )
          .join('\n\n')
      : '';

    // Format course Bloom objectives
    const courseBloomObjectives =
      typeof generatedObjectives === 'string'
        ? generatedObjectives
        : JSON.stringify(generatedObjectives);

    // Get components from database
    const { interactiveExerciseComponentsList } = await getComponentLists(
      this.prisma,
    );

    await this.prisma.courseStep.updateMany({
      where: {
        courseId,
        type: 'generating_course_evaluation',
      },
      data: { status: 'running' },
    });

    try {
      const systemPrompt = `You are an expert instructional designer specializing in summative assessment for online learning.
Your task is to generate the final course evaluation unit, which assesses the content of all modules and all units in the course.

Use the course outline, all Bloom-aligned objectives, and the target audience description.
Do NOT invent topics outside the course structure.

AVAILABLE COMPONENTS
Interactive Exercise Components
${interactiveExerciseComponentsList}
(Only exercise components are permitted in this evaluation unit.)
All components must follow their defined schema exactly.

BRANDING
Primary color: ${branding.primaryColor || '#9F80DA'}
Secondary color: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}

Apply branding only when supported.

INSTRUCTIONAL DESIGN FRAMEWORK (GAGNÉ ADAPTED FOR SUMMATIVE ASSESSMENT)

Use Gagné’s events to structure a comprehensive final evaluation:

1. Prepare the learner for assessment
- Begin with a short paragraph explaining that this evaluation covers the entire course.
- Reinforce the purpose and connection to overall course Bloom objectives.
2. Stimulate recall
- Add a brief prompt that helps the learner mentally organize content from all modules (no explanation, just activation).
3. Assessment sequence (Event 8)
- For each unit of the entire course, create 2 to 3 exercise components.
. Exercises must align with that unit’s Bloom objectives.
. Exercises must reference the content actually developed in those units.
- Exercises must include a variety of formats when possible.
- All exercises must include feedback.
4. Provide feedback (Event 7)
Each exercise component must include concise, actionable feedback for correct and incorrect responses.
5. Closure and transfer
End the evaluation unit with a short sentence reinforcing completion and suggesting application of learning.

COMPONENT RULES
- This evaluation unit will be longer than a regular unit, because it evaluates all content.
- Exercises must be grouped logically by unit or theme, but displayed as a single evaluation unit.
- Before each interactive component, include a one-sentence instruction that clarifies the expected interaction.
- No repetition of full explanations from previous units: use references, not restatements.

OUTPUT REQUIREMENTS
- Output only the list of components using the structure defined in {format_instructions}.
- No commentary outside components.
- The number of exercises must equal: 2–3 exercises × number of units across the full course.
- All exercises must include feedback.
- All exercises must align with Bloom taxonomy levels defined for each unit.

 YOUR TASK
Generate the final evaluation unit assessing all modules and units of the course, following every rule above.`;

      const userPrompt = `Course Topic: ${topic}
Target Audience: ${audience}

Full Course Outline (Modules and Units):
${fullCourseStructure}

Bloom-Aligned Learning Objectives for the Entire Course:
${courseBloomObjectives}

Interactive Exercise Components Available:
${interactiveExerciseComponentsList}

Branding:
Primary Color: ${branding.primaryColor || '#9F80DA'}
Secondary Color: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}

Generate the final evaluation unit for the entire course, following all rules of the system prompt:
- The evaluation must assess ALL units from ALL modules.
- For EACH unit in the course, create 2–3 interactive exercise components.
- Each exercise must include a prior instruction sentence.
- All exercises must include feedback.
- Exercises must align with the Bloom objectives of their corresponding unit.
- Use only the allowed component schemas.
- Avoid repeating full explanations from the learning units.
- End with a brief sentence reinforcing completion and transfer of learning.

Respond ONLY with the components in the structure defined by {format_instructions}.`;

      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      const content = response.content;
      const result =
        typeof content === 'string' ? content : JSON.stringify(content);

      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_course_evaluation',
        },
        data: {
          status: 'completed',
          payload: { result },
        },
      });

      // Save components to CourseComponent table
      await this.saveComponents(
        courseId,
        course.userId,
        'final-evaluation',
        result,
      );

      // Get updated progress and emit completed event
      const progress = await this.getUnitProgress(courseId);
      this.sseService.emitUnitCompleted(
        courseKey,
        'final-evaluation',
        'Final Course Evaluation',
        progress,
      );

      // Check if all units are completed
      await this.checkAndEmitGenerationComplete(courseId, courseKey);

      this.logger.log(
        `Course evaluation generated successfully for course ${courseId}`,
      );
      return { success: true, result };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Failed to generate course evaluation: ${err.message}`);

      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_course_evaluation',
        },
        data: {
          status: 'failed',
          error: { message: err.message, stack: err.stack },
        },
      });
      this.sseService.emitError(
        courseKey,
        `Course evaluation failed: ${err.message}`,
      );
      throw error;
    }
  }
}
