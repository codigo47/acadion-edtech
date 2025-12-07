import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { PrismaService } from '../prisma/prisma.service';
import { COURSE_ORCHESTRATION_QUEUE } from './constants';

// Schema for course index
const courseIndexSchema = z.object({
  title: z.string().describe('The course title'),
  modules: z.array(
    z.object({
      number: z.number().describe('Module number starting from 1'),
      title: z.string().describe('Descriptive module title'),
      units: z.array(
        z.object({
          code: z
            .string()
            .describe(
              'Unit code in format moduleNumber.unitNumber (e.g., 1.1, 1.2)',
            ),
          title: z.string().describe('Descriptive unit title'),
        }),
      ),
    }),
  ),
});

interface GenerateTitleJobData {
  courseId: number;
  topic: string;
}

interface GenerateObjectivesJobData {
  courseId: number;
  objective: string;
}

interface GenerateIndexJobData {
  courseId: number;
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

  // Helper to create a message with auto-incrementing sequence per conversation
  private async createMessage(
    conversationId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
  ) {
    const lastMessage = await this.prisma.message.findFirst({
      where: { conversationId },
      orderBy: { sequence: 'desc' },
      select: { sequence: true },
    });
    const sequence = Number(lastMessage?.sequence ?? 0) + 1;
    return this.prisma.message.create({
      data: {
        conversationId,
        role,
        content,
        sequence,
      },
    });
  }

  async process(
    job: Job<
      GenerateTitleJobData | GenerateObjectivesJobData | GenerateIndexJobData
    >,
  ): Promise<any> {
    this.logger.log(`Processing job ${job.id} - ${job.name}`);

    if (job.name === 'generate_title') {
      return this.handleGenerateTitle(job as Job<GenerateTitleJobData>);
    }

    if (job.name === 'generate_objectives') {
      return this.handleGenerateObjectives(
        job as Job<GenerateObjectivesJobData>,
      );
    }

    if (job.name === 'generate_index') {
      return this.handleGenerateIndex(job as Job<GenerateIndexJobData>);
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

      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      const title = response.content.toString().trim();

      // Extract token usage from response
      const promptTokens = response.usage_metadata?.input_tokens ?? null;
      const completionTokens = response.usage_metadata?.output_tokens ?? null;

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

      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      const objectives = response.content.toString().trim();

      // Extract token usage from response
      const promptTokens = response.usage_metadata?.input_tokens ?? null;
      const completionTokens = response.usage_metadata?.output_tokens ?? null;

      // Update course input with generated objectives
      const currentInput = (course.input as Record<string, unknown>) || {};
      await this.prisma.course.update({
        where: { id: courseId },
        data: {
          input: { ...currentInput, generatedObjectives: objectives },
        },
      });

      // Save AI messages to conversation
      if (conversationId) {
        // First message: generated objectives
        await this.createMessage(conversationId, 'assistant', objectives);

        // Second message: build method question
        await this.createMessage(
          conversationId,
          'assistant',
          'How do you want to build the course?',
        );
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

  private async handleGenerateIndex(job: Job<GenerateIndexJobData>) {
    const { courseId } = job.data;

    this.logger.log(`Generating index for course ${courseId}`);

    // Get course with all necessary data
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: {
        conversations: {
          take: 1,
          orderBy: { createdAt: 'asc' },
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
            },
          },
        },
      },
    });

    if (!course) {
      throw new Error(`Course ${courseId} not found`);
    }

    const input = course.input as Record<string, unknown>;
    const topic = input?.topic || '';
    const audience = input?.audience || '';
    const objective = input?.objective || '';
    const generatedObjectives = input?.generatedObjectives || '';
    const modules = (input?.modules as Record<string, { units: number }>) || {};
    const conversationId = course.conversations[0]?.id;

    // Mark step as running
    await this.prisma.courseStep.updateMany({
      where: { courseId, type: 'generating_index' },
      data: { status: 'running' },
    });

    try {
      // Build the modules structure description for the prompt
      const modulesDescription = Object.entries(modules)
        .map(([moduleNum, data]) => `Module ${moduleNum}: ${data.units} units`)
        .join('\n');

      // Create structured output parser with schema validation
      const parser = StructuredOutputParser.fromZodSchema(courseIndexSchema);

      // Create prompt template with format instructions
      const prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          `You are an expert instructional designer. Your task is to create a detailed course index/outline based on the provided information.

The index should:
1. Have clear, descriptive titles for each module
2. Have clear, descriptive titles for each unit within modules
3. Follow a logical learning progression
4. Be appropriate for the target audience
5. Cover the learning objectives

Rules:
- Use the provided course title
- Number modules sequentially starting from 1
- Unit codes follow the pattern: moduleNumber.unitNumber (e.g., 1.1, 1.2, 2.1)
- Create descriptive, meaningful titles for modules and units
- Ensure the number of modules and units matches the provided structure

{format_instructions}`,
        ],
        [
          'human',
          `Course Topic: {topic}
Course Title: {courseTitle}
Target Audience: {audience}
User's Learning Objectives: {objective}
Generated Learning Objectives: {generatedObjectives}

Module Structure:
{modulesDescription}

Generate the course index with descriptive titles for each module and unit.`,
        ],
      ]);

      // Create the chain
      const chain = prompt.pipe(this.llm).pipe(parser);

      // Execute with retry logic (max 3 attempts)
      const maxRetries = 3;
      let lastError: Error | null = null;
      let proposedIndex: z.infer<typeof courseIndexSchema> | null = null;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          proposedIndex = await chain.invoke({
            topic,
            courseTitle: course.title || topic,
            audience,
            objective,
            generatedObjectives,
            modulesDescription,
            format_instructions: parser.getFormatInstructions(),
          });
          break; // Success, exit retry loop
        } catch (err) {
          lastError = err as Error;
          this.logger.warn(
            `Index generation attempt ${attempt}/${maxRetries} failed: ${lastError.message}`,
          );
          if (attempt === maxRetries) {
            throw new Error(
              `Failed to generate valid index after ${maxRetries} attempts: ${lastError.message}`,
            );
          }
        }
      }

      if (!proposedIndex) {
        throw lastError || new Error('Failed to generate index');
      }

      // Update course output with generated index
      const currentOutput = (course.output as Record<string, unknown>) || {};
      await this.prisma.course.update({
        where: { id: courseId },
        data: {
          output: { ...currentOutput, proposedIndex },
        },
      });

      // Save AI message to conversation as JSON string
      if (conversationId) {
        await this.createMessage(
          conversationId,
          'assistant',
          JSON.stringify(proposedIndex),
        );
      }

      // Mark step as completed
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_index' },
        data: {
          status: 'completed',
          payload: { proposedIndex },
        },
      });

      this.logger.log(`Index generated successfully for course ${courseId}`);

      return { success: true, proposedIndex };
    } catch (error) {
      this.logger.error(
        `Failed to generate index for course ${courseId}: ${error.message}`,
      );

      // Mark step as failed
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_index' },
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
