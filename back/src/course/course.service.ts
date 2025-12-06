import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCourseDto,
  GenerateTitleDto,
  SetAudienceDto,
  SetObjectiveDto,
} from './dto/create-course.dto';
import { COURSE_ORCHESTRATION_QUEUE } from './constants';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(COURSE_ORCHESTRATION_QUEUE) private courseQueue: Queue,
  ) {}

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
    await this.prisma.message.create({
      data: {
        conversationId: conversationKey,
        role: 'user',
        content: topic,
      },
    });

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
    await this.prisma.message.create({
      data: {
        conversationId: conversationKey,
        role: 'assistant',
        content: aiMessage,
      },
    });

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

    // Convert BigInt sequence to string for JSON serialization
    return {
      ...course,
      conversations: course.conversations.map((conv) => ({
        ...conv,
        messages: conv.messages.map((msg) => ({
          ...msg,
          sequence: msg.sequence.toString(),
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
    await this.prisma.message.create({
      data: {
        conversationId: conversationKey,
        role: 'user',
        content: audience,
      },
    });

    // AI response message
    const aiMessage = `Now tell me about the course objectives. What do you want them to learn and at what depth?`;

    // Save AI message to conversation
    await this.prisma.message.create({
      data: {
        conversationId: conversationKey,
        role: 'assistant',
        content: aiMessage,
      },
    });

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
    await this.prisma.message.create({
      data: {
        conversationId: conversationKey,
        role: 'user',
        content: objective,
      },
    });

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
              take: 1,
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with key ${courseKey} not found`);
    }

    const step = course.steps[0];
    const lastMessage = course.conversations[0]?.messages[0];

    return {
      status: step?.status || 'not_found',
      message: lastMessage?.content || null,
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
