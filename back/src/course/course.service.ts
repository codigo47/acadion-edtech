import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCourseDto,
  GenerateTitleDto,
  SetAudienceDto,
  SetObjectiveDto,
  SetBuildingMethodDto,
  SetModulesDto,
  SetUnitsDto,
  SetBrandingDto,
} from './dto/create-course.dto';
import { COURSE_ORCHESTRATION_QUEUE } from './constants';
import { CourseSSEService } from './course-sse.service';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(COURSE_ORCHESTRATION_QUEUE) private courseQueue: Queue,
    private sseService: CourseSSEService,
  ) {}

  // Helper to get next sequence number for a conversation
  private async getNextSequence(conversationId: string): Promise<number> {
    const lastMessage = await this.prisma.message.findFirst({
      where: { conversationId },
      orderBy: { sequence: 'desc' },
      select: { sequence: true },
    });
    return Number(lastMessage?.sequence ?? 0) + 1;
  }

  // Helper to create a message with auto-incrementing sequence per conversation
  private async createMessage(
    conversationId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
  ) {
    const sequence = await this.getNextSequence(conversationId);
    return this.prisma.message.create({
      data: {
        conversationId,
        role,
        content,
        sequence,
      },
    });
  }

  async create(createCourseDto: CreateCourseDto) {
    const { userId } = createCourseDto;

    // Create course with empty title
    const course = await this.prisma.course.create({
      data: {
        userId,
      },
    });

    // Create conversation for this course
    const conversation = await this.prisma.conversation.create({
      data: {
        userId,
        courseId: course.id,
        title: 'Course Creation',
      },
    });

    return {
      courseKey: course.key,
      conversationKey: conversation.id,
    };
  }

  async generateTitle(generateTitleDto: GenerateTitleDto) {
    const { courseKey, conversationKey, topic } = generateTitleDto;

    // Find course by key
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Update course input with topic
    const currentInput = (course.input as Record<string, unknown>) || {};
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, topic },
      },
    });

    // Save user message to conversation
    await this.createMessage(conversationKey, 'user', topic);

    // AI response message - ask for audience (step 2)
    const aiMessage = `Let's start designing your course. Tell me, who are the target learners?

• Who are they?
• What knowledge do they have about the topic?
• Why do they need to learn?

* The more details and context you provide, the better`;

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      aiMessage,
    };
  }

  async findByKey(key: string) {
    const course = await this.prisma.course.findFirst({
      where: { key },
      include: {
        steps: {
          orderBy: { createdAt: 'asc' },
        },
        conversations: {
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${key} not found`);
    }

    // Convert BigInt sequence to Number for JSON serialization
    return {
      ...course,
      conversations: course.conversations.map((conv) => ({
        ...conv,
        messages: conv.messages.map((msg) => ({
          ...msg,
          sequence: Number(msg.sequence),
        })),
      })),
    };
  }

  async setAudience(setAudienceDto: SetAudienceDto) {
    const { courseKey, conversationKey, audience } = setAudienceDto;

    // Find course by key
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Update course input with audience
    const currentInput = (course.input as Record<string, unknown>) || {};
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, audience },
      },
    });

    // Save user message to conversation
    await this.createMessage(conversationKey, 'user', audience);

    // AI response message - ask for objectives (step 3)
    const aiMessage = `Now tell me about the course objectives. What do you want them to learn and at what depth?`;

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      aiMessage,
    };
  }

  async setObjective(setObjectiveDto: SetObjectiveDto) {
    const { courseKey, conversationKey, objective } = setObjectiveDto;

    // Find course by key
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Get topic and audience from course input
    const currentInput = (course.input as Record<string, unknown>) || {};
    const topic =
      typeof currentInput.topic === 'string'
        ? currentInput.topic
        : JSON.stringify(currentInput.topic ?? '');
    const audience =
      typeof currentInput.audience === 'string'
        ? currentInput.audience
        : JSON.stringify(currentInput.audience ?? '');

    // Update course input with objective
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, objective },
      },
    });

    // Save user message to conversation
    await this.createMessage(conversationKey, 'user', objective);

    // Create step for generating objectives
    await this.prisma.courseStep.create({
      data: {
        courseId: course.id,
        type: 'generating_objectives',
        status: 'pending',
      },
    });

    // Add job to queue for objectives generation with topic, audience, and objective
    await this.courseQueue.add('generate_objectives', {
      courseId: course.id,
      courseKey,
      topic,
      audience,
      objective,
    });

    // AI message will be saved by the worker when objectives are generated

    return {
      success: true,
    };
  }

  async setBuildingMethod(courseKey: string, dto: SetBuildingMethodDto) {
    const { conversationKey, buildingMethod } = dto;

    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Map building method to label
    const methodLabels: Record<string, string> = {
      ai: 'With AI',
      references_ai: 'With my references + AI',
      material_only: 'Only with my material',
    };

    const userMessage = methodLabels[buildingMethod];

    // Update course input with building method
    const currentInput = (course.input as Record<string, unknown>) || {};
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, buildingMethod },
      },
    });

    // Save user message to conversation
    await this.createMessage(conversationKey, 'user', userMessage);

    // AI response message
    const aiMessage = `Great! Now let's define the structure.\n\nHow many modules will the course have?`;
    const maxModules = 10;

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      aiMessage,
      maxModules,
    };
  }

  async setModules(courseKey: string, dto: SetModulesDto) {
    const { conversationKey, modulesCount } = dto;

    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Update course input with modules count
    const currentInput = (course.input as Record<string, unknown>) || {};
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, modulesCount },
      },
    });

    // Save user message to conversation
    await this.createMessage(
      conversationKey,
      'user',
      `${modulesCount} modules`,
    );

    // AI response message
    const aiMessage = `How many units per module?`;
    const maxUnits = 10;

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      aiMessage,
      modulesCount,
      maxUnits,
    };
  }

  async setUnits(courseKey: string, dto: SetUnitsDto) {
    const { conversationKey, modules } = dto;

    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Update course input with modules structure
    const currentInput = (course.input as Record<string, unknown>) || {};
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, modules },
      },
    });

    // Build user message showing units per module
    const unitsDescription = Object.entries(modules)
      .map(([moduleNum, data]) => `Module ${moduleNum}: ${data.units} units`)
      .join(', ');

    // Save user message to conversation
    await this.createMessage(conversationKey, 'user', unitsDescription);

    // AI response message - ask for evaluation details
    const aiMessage =
      "Great! Now let's configure the knowledge checks. Select when you want to evaluate your learners:";

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      modules,
      aiMessage,
      nextScreen: 'evaluation',
    };
  }

  async getExerciseTypes(courseKey: string, conversationKey: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Get evaluation components for exercise selection
    // TODO: Filter by subtype 'exercise' instead of type once the data is properly set up
    const evaluationComponents = await this.prisma.component.findMany({
      where: { subtype: 'exercise' },
      select: { id: true, name: true },
    });

    // AI message for exercise types selection
    const aiMessage =
      "To design your eLearning, let's select all the exercise types you want to include:";

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      aiMessage,
      exerciseTypes: evaluationComponents,
    };
  }

  async setEvaluation(
    courseKey: string,
    conversationKey: string,
    selectedComponents: Array<{ id: number; name: string }>,
  ) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Format components for storage
    const evaluationData = selectedComponents.map((c) => ({ name: c.name }));

    // Update course input with evaluation components
    const currentInput = (course.input as Record<string, unknown>) || {};
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, evaluation: evaluationData },
      },
    });

    // Save user message with selected components as JSON
    const userMessage = JSON.stringify({
      exerciseTypes: selectedComponents.map((c) => c.name),
    });
    await this.createMessage(conversationKey, 'user', userMessage);

    // AI response message
    const aiMessage = 'How will the evaluation be?';

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      aiMessage,
    };
  }

  async setEvaluationDetails(
    courseKey: string,
    dto: {
      conversationKey: string;
      knowledgeCheckEndUnit: boolean;
      knowledgeCheckEndModule: boolean;
      finalExercise: boolean;
      restrictions: string;
    },
  ) {
    const { conversationKey, ...evaluationDetails } = dto;

    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Update course input with evaluation details
    const currentInput = (course.input as Record<string, unknown>) || {};
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, evaluationDetails },
      },
    });

    // Save user message with JSON of evaluation details
    const userMessage = JSON.stringify({ evaluationDetails });
    await this.createMessage(conversationKey, 'user', userMessage);

    // AI response message - ask for branding
    const aiMessage =
      "Now let's set up the visual identity for your course. Configure the colors and typography:";

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      aiMessage,
      nextScreen: 'visualIdentity',
    };
  }

  async updateTitle(courseId: number, title: string) {
    return this.prisma.course.update({
      where: { id: courseId },
      data: { title },
    });
  }

  async generateCourse(courseKey: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    const input = course.input as Record<string, unknown>;
    const evaluationDetails = input?.evaluationDetails as {
      knowledgeCheckEndUnit?: boolean;
      knowledgeCheckEndModule?: boolean;
      finalExercise?: boolean;
    } | undefined;

    const output = course.output as Record<string, unknown>;
    const proposedIndex = output?.proposedIndex as {
      title: string;
      modules: Array<{
        number: number;
        title: string;
        units: Array<{ code: string; title: string }>;
      }>;
    };

    if (!proposedIndex) {
      throw new NotFoundException(
        'Course index not found. Generate index first.',
      );
    }

    type JobType =
      | 'generate_intro_unit'
      | 'generate_content_unit'
      | 'generate_module_evaluation'
      | 'generate_course_evaluation';

    type StepType =
      | 'generating_intro_unit'
      | 'generating_content_unit'
      | 'generating_module_evaluation'
      | 'generating_course_evaluation';

    interface UnitJob {
      type: JobType;
      stepType: StepType;
      unitCode: string;
      unitTitle: string;
      moduleNumber: number;
      moduleTitle: string;
    }

    interface ModuleEvaluationJob {
      type: 'generate_module_evaluation';
      stepType: 'generating_module_evaluation';
      moduleNumber: number;
      moduleTitle: string;
    }

    interface CourseEvaluationJob {
      type: 'generate_course_evaluation';
      stepType: 'generating_course_evaluation';
    }

    type Job = UnitJob | ModuleEvaluationJob | CourseEvaluationJob;

    const jobs: Job[] = [];

    for (const module of proposedIndex.modules) {
      // First, add an introduction unit for each module (auto-generated, not in index)
      jobs.push({
        type: 'generate_intro_unit',
        stepType: 'generating_intro_unit',
        unitCode: `${module.number}.0`,
        unitTitle: 'Introduction',
        moduleNumber: module.number,
        moduleTitle: module.title,
      });

      // Then add all units from the index as content units
      for (const unit of module.units) {
        // Skip if this is an "Evaluation" unit (handled separately by module evaluation job)
        if (unit.title.toLowerCase() === 'evaluation') {
          continue;
        }

        jobs.push({
          type: 'generate_content_unit',
          stepType: 'generating_content_unit',
          unitCode: unit.code,
          unitTitle: unit.title,
          moduleNumber: module.number,
          moduleTitle: module.title,
        });
      }

      // Add module evaluation if knowledgeCheckEndModule is true
      // The index should already include an "Evaluation" unit, but we generate it with the specialized handler
      if (evaluationDetails?.knowledgeCheckEndModule) {
        jobs.push({
          type: 'generate_module_evaluation',
          stepType: 'generating_module_evaluation',
          moduleNumber: module.number,
          moduleTitle: module.title,
        });
      }
    }

    // Add course evaluation if finalExercise is true
    if (evaluationDetails?.finalExercise) {
      jobs.push({
        type: 'generate_course_evaluation',
        stepType: 'generating_course_evaluation',
      });
    }

    // Update course status to generating
    await this.prisma.course.update({
      where: { id: course.id },
      data: { status: 'generating' },
    });

    // Emit SSE event to start loading texts and send initial progress
    this.sseService.emitStatusChange(courseKey, 'GENERATING_COURSE', 'running');
    this.sseService.emitUnitProgress(courseKey, {
      totalUnits: jobs.length,
      completedUnits: 0,
      failedUnits: 0,
      runningUnits: 0,
      pendingUnits: jobs.length,
    });

    // Create all steps as pending
    await Promise.all(
      jobs.map((job) => {
        if (job.type === 'generate_course_evaluation') {
          return this.prisma.courseStep.create({
            data: {
              courseId: course.id,
              type: job.stepType,
              status: 'pending',
              payload: {},
            },
          });
        } else if (job.type === 'generate_module_evaluation') {
          return this.prisma.courseStep.create({
            data: {
              courseId: course.id,
              type: job.stepType,
              status: 'pending',
              payload: {
                moduleNumber: job.moduleNumber,
                moduleTitle: job.moduleTitle,
              },
            },
          });
        } else {
          return this.prisma.courseStep.create({
            data: {
              courseId: course.id,
              type: job.stepType,
              status: 'pending',
              payload: { unitCode: job.unitCode, unitTitle: job.unitTitle },
            },
          });
        }
      }),
    );

    // Add all jobs to the queue
    await Promise.all(
      jobs.map((job) => {
        if (job.type === 'generate_course_evaluation') {
          return this.courseQueue.add(job.type, {
            courseId: course.id,
            courseKey,
          });
        } else if (job.type === 'generate_module_evaluation') {
          return this.courseQueue.add(job.type, {
            courseId: course.id,
            courseKey,
            moduleNumber: job.moduleNumber,
            moduleTitle: job.moduleTitle,
          });
        } else {
          return this.courseQueue.add(job.type, {
            courseId: course.id,
            courseKey,
            unitCode: job.unitCode,
            unitTitle: job.unitTitle,
            moduleNumber: job.moduleNumber,
            moduleTitle: job.moduleTitle,
          });
        }
      }),
    );

    return {
      success: true,
      totalJobs: jobs.length,
    };
  }

  async setBranding(courseKey: string, dto: SetBrandingDto) {
    const { conversationKey, ...brandingData } = dto;

    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    // Update course input with branding
    const currentInput = (course.input as Record<string, unknown>) || {};
    await this.prisma.course.update({
      where: { id: course.id },
      data: {
        input: { ...currentInput, branding: brandingData },
      },
    });

    // Save user message with JSON of branding data
    const userMessage = JSON.stringify({ branding: brandingData });
    await this.createMessage(conversationKey, 'user', userMessage);

    // Create step for generating index
    await this.prisma.courseStep.create({
      data: {
        courseId: course.id,
        type: 'generating_index',
        status: 'pending',
      },
    });

    // Add job to queue for index generation
    await this.courseQueue.add('generate_index', {
      courseId: course.id,
      courseKey,
    });

    return {
      success: true,
      nextScreen: 'generatingIndex',
    };
  }

  async getCourseComponents(courseKey: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    const components = await this.prisma.courseComponent.findMany({
      where: { courseId: course.id },
      include: {
        component: {
          select: {
            internalName: true,
            name: true,
            type: true,
          },
        },
      },
      orderBy: [{ module: 'asc' }, { unit: 'asc' }, { sequence: 'asc' }],
    });

    return {
      courseId: course.id,
      components: components.map((c) => ({
        id: c.id,
        module: c.module,
        unit: c.unit,
        sequence: c.sequence,
        componentName: c.component.internalName,
        componentType: c.component.type,
        data: c.data,
      })),
    };
  }
}
