import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { PrismaService } from '../prisma/prisma.service';
import { COURSE_ORCHESTRATION_QUEUE } from './constants';

interface GenerateTitleJobData {
  courseId: number;
  topic: string;
}

interface GenerateObjectivesJobData {
  courseId: number;
  objective: string;
}

@Processor(COURSE_ORCHESTRATION_QUEUE)
export class CourseOrchestratorProcessor extends WorkerHost {
  private readonly logger = new Logger(CourseOrchestratorProcessor.name);
  private readonly llm: ChatOpenAI;

  constructor(private prisma: PrismaService) {
    super();
    this.llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      verbose: true, // Enable langchain logs
    });
  }

  async process(
    job: Job<GenerateTitleJobData | GenerateObjectivesJobData>,
  ): Promise<any> {
    this.logger.log(`Processing job ${job.id} - ${job.name}`);

    if (job.name === 'generate_title') {
      return this.handleGenerateTitle(job as Job<GenerateTitleJobData>);
    }

    if (job.name === 'generate_objectives') {
      return this.handleGenerateObjectives(job as Job<GenerateObjectivesJobData>);
    }

    this.logger.warn(`Unknown job name: ${job.name}`);
    return null;
  }

  private async handleGenerateTitle(job: Job<GenerateTitleJobData>) {
    const { courseId, topic } = job.data;

    this.logger.log(
      `Generating title for course ${courseId} with topic: ${topic}`,
    );

    // Mark step as running
    await this.prisma.courseStep.updateMany({
      where: { courseId, type: 'generating_title' },
      data: { status: 'running' },
    });

    try {
      const systemPrompt = `You are an expert course designer. Your task is to create a compelling, concise, and professional title for an online course.
The title should:
- Be catchy and engaging
- Clearly communicate what the student will learn
- Be between 5-10 words
- Not include quotes or special characters

Respond with ONLY the title, nothing else.`;

      const userPrompt = `Create a course title for the following topic: ${topic}`;

      this.logger.log(`[LangChain] Sending prompt to OpenAI...`);
      this.logger.log(`[LangChain] System: ${systemPrompt}`);
      this.logger.log(`[LangChain] User: ${userPrompt}`);

      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      const title = response.content.toString().trim();

      // Extract token usage from response
      const promptTokens = response.usage_metadata?.input_tokens ?? null;
      const completionTokens = response.usage_metadata?.output_tokens ?? null;

      this.logger.log(`[LangChain] Response: ${title}`);
      this.logger.log(
        `[LangChain] Tokens - Prompt: ${promptTokens}, Completion: ${completionTokens}`,
      );

      // Update course title
      await this.prisma.course.update({
        where: { id: courseId },
        data: { title },
      });

      // Mark step as completed with token usage
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_title' },
        data: {
          status: 'completed',
          payload: { title },
          promptTokens,
          completionTokens,
        },
      });

      this.logger.log(
        `Title generated successfully for course ${courseId}: ${title}`,
      );

      return { success: true, title };
    } catch (error) {
      this.logger.error(
        `Failed to generate title for course ${courseId}: ${error.message}`,
      );

      // Mark step as failed
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_title' },
        data: {
          status: 'failed',
          error: {
            message: error.message,
            stack: error.stack,
          },
        },
      });

      throw error;
    }
  }

  private async handleGenerateObjectives(job: Job<GenerateObjectivesJobData>) {
    const { courseId, objective } = job.data;

    this.logger.log(
      `Generating objectives for course ${courseId} with user objective: ${objective}`,
    );

    // Get course to access topic, audience and conversation
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        conversations: {
          take: 1,
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!course) {
      throw new Error(`Course ${courseId} not found`);
    }

    const input = course.input as Record<string, unknown>;
    const topic = input?.topic || '';
    const audience = input?.audience || '';
    const conversationId = course.conversations[0]?.id;

    // Mark step as running
    await this.prisma.courseStep.updateMany({
      where: { courseId, type: 'generating_objectives' },
      data: { status: 'running' },
    });

    try {
      const systemPrompt = `You are an expert instructional designer specializing in Bloom's Taxonomy. Your task is to transform user-provided learning objectives into well-structured objectives following Bloom's Taxonomy levels.

For each objective, you should:
1. Identify the appropriate cognitive level (Remember, Understand, Apply, Analyze, Evaluate, Create)
2. Use action verbs appropriate for that level
3. Make objectives specific, measurable, and achievable
4. Consider the target audience when setting the depth

Format your response as a clear, readable text with bullet points. For each objective, include the Bloom's level and the objective statement.

Example format:
• Remember: Define the key terminology used in agile methodology
• Understand: Explain the core principles of the Scrum framework
• Apply: Implement a basic sprint planning session
• Analyze: Compare different agile methodologies for specific use cases

Respond with ONLY the formatted objectives, no additional explanations.`;

      const userPrompt = `Course Topic: ${topic}
Target Audience: ${audience}
User's Learning Objectives: ${objective}

Please convert the user's learning objectives above into 4-6 well-defined learning objectives following Bloom's Taxonomy.`;

      this.logger.log(`[LangChain] Sending prompt to OpenAI for objectives...`);

      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      const objectives = response.content.toString().trim();

      // Extract token usage from response
      const promptTokens = response.usage_metadata?.input_tokens ?? null;
      const completionTokens = response.usage_metadata?.output_tokens ?? null;

      this.logger.log(`[LangChain] Objectives generated: ${objectives}`);
      this.logger.log(
        `[LangChain] Tokens - Prompt: ${promptTokens}, Completion: ${completionTokens}`,
      );

      // Update course input with generated objectives
      const currentInput = (course.input as Record<string, unknown>) || {};
      await this.prisma.course.update({
        where: { id: courseId },
        data: {
          input: { ...currentInput, generatedObjectives: objectives },
        },
      });

      // Save AI message to conversation
      if (conversationId) {
        await this.prisma.message.create({
          data: {
            conversationId,
            role: 'assistant',
            content: objectives,
          },
        });
      }

      // Mark step as completed with token usage
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_objectives' },
        data: {
          status: 'completed',
          payload: { objectives },
          promptTokens,
          completionTokens,
        },
      });

      this.logger.log(
        `Objectives generated successfully for course ${courseId}`,
      );

      return { success: true, objectives };
    } catch (error) {
      this.logger.error(
        `Failed to generate objectives for course ${courseId}: ${error.message}`,
      );

      // Mark step as failed
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_objectives' },
        data: {
          status: 'failed',
          error: {
            message: error.message,
            stack: error.stack,
          },
        },
      });

      throw error;
    }
  }
}
