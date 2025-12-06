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

  async process(job: Job<GenerateTitleJobData>): Promise<any> {
    this.logger.log(`Processing job ${job.id} - ${job.name}`);

    if (job.name === 'generate_title') {
      return this.handleGenerateTitle(job);
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
}
