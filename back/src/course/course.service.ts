import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCourseDto,
  GenerateTitleDto,
  SetAudienceDto,
  SetObjectiveDto,
  SetBuildingMethodDto,
  SetModulesDto,
  SetUnitsDto,
} from './dto/create-course.dto';
import { COURSE_ORCHESTRATION_QUEUE } from './constants';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(COURSE_ORCHESTRATION_QUEUE) private courseQueue: Queue,
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

    // Create initial step for generating title
    await this.prisma.courseStep.create({
      data: {
        courseId: course.id,
        type: 'generating_title',
        status: 'pending',
      },
    });

    // Add job to queue for title generation
    await this.courseQueue.add('generate_title', {
      courseId: course.id,
      topic,
    });

    // AI response message
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

    // AI response message
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

    // Update course input with objective
    const currentInput = (course.input as Record<string, unknown>) || {};
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

    // Add job to queue for objectives generation
    await this.courseQueue.add('generate_objectives', {
      courseId: course.id,
      objective,
    });

    // AI message will be saved by the worker when objectives are generated

    return {
      success: true,
    };
  }

  async getObjectiveStatus(courseKey: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      include: {
        steps: {
          where: { type: 'generating_objectives' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        conversations: {
          take: 1,
          orderBy: { createdAt: 'asc' },
          include: {
            messages: {
              where: { role: 'assistant' },
              orderBy: { createdAt: 'desc' },
              take: 2,
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    const step = course.steps[0];
    const messages = course.conversations[0]?.messages || [];
    // Messages are ordered desc, so [0] is buildMethod question, [1] is objectives
    const objectivesMessage = messages[1]?.content || null;
    const buildMethodMessage = messages[0]?.content || null;

    return {
      status: step?.status || 'not_found',
      objectivesMessage,
      buildMethodMessage,
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
    await this.createMessage(conversationKey, 'user', `${modulesCount} modules`);

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
    });

    return {
      success: true,
      modules,
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
    const evaluationComponents = await this.prisma.component.findMany({
      where: { type: 'evaluation' },
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

    // Save user message with selected components
    const userMessage = selectedComponents.map((c) => c.name).join(', ');
    await this.createMessage(conversationKey, 'user', userMessage);

    // Create step for generating evaluation
    await this.prisma.courseStep.create({
      data: {
        courseId: course.id,
        type: 'generating_evaluation',
        status: 'pending',
      },
    });

    // AI response message
    const aiMessage = 'How will the evaluation be?';

    // Save AI message to conversation
    await this.createMessage(conversationKey, 'assistant', aiMessage);

    return {
      success: true,
      aiMessage,
    };
  }

  async getIndexStatus(courseKey: string) {
    const course = await this.prisma.course.findFirst({
      where: { key: courseKey },
      include: {
        steps: {
          where: { type: 'generating_index' },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    const step = course.steps[0];
    const output = course.output as Record<string, unknown>;

    return {
      status: step?.status || 'not_found',
      proposedIndex: output?.proposedIndex || null,
    };
  }

  async updateTitle(courseId: number, title: string) {
    return this.prisma.course.update({
      where: { id: courseId },
      data: { title },
    });
  }

  async updateStepStatus(
    courseId: number,
    type:
      | 'generating_title'
      | 'generating_index'
      | 'generating_content'
      | 'generating_image'
      | 'calling_third_party',
    status: 'pending' | 'running' | 'completed' | 'failed',
    error?: any,
  ) {
    return this.prisma.courseStep.updateMany({
      where: { courseId, type },
      data: {
        status,
        ...(error && { error }),
      },
    });
  }
}
