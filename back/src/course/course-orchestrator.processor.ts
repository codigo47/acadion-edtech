import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CourseSSEService } from './course-sse.service';
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
  courseKey: string;
  topic: string;
}

interface GenerateObjectivesJobData {
  courseId: number;
  courseKey: string;
  objective: string;
}

interface GenerateIndexJobData {
  courseId: number;
  courseKey: string;
}

interface GenerateUnitJobData {
  courseId: number;
  courseKey: string;
  unitCode: string;
  unitTitle: string;
  moduleNumber: number;
  moduleTitle: string;
}

// Schema for generated unit content
const unitContentSchema = z.object({
  unitCode: z.string(),
  unitTitle: z.string(),
  components: z.array(
    z.object({
      componentName: z.string().describe('The internal name of the component'),
      order: z.number().describe('Order of the component in the unit'),
      content: z
        .record(z.string(), z.any())
        .describe('Component-specific content object'),
      styles: z
        .object({
          backgroundColor: z.string().optional(),
          textColor: z.string().optional(),
          accentColor: z.string().optional(),
          fontFamily: z.string().optional(),
        })
        .optional(),
    }),
  ),
});

@Processor(COURSE_ORCHESTRATION_QUEUE)
export class CourseOrchestratorProcessor extends WorkerHost {
  private readonly logger = new Logger(CourseOrchestratorProcessor.name);
  private readonly llm: ChatOpenAI;

  constructor(
    private prisma: PrismaService,
    private sseService: CourseSSEService,
  ) {
    super();
    this.llm = new ChatOpenAI({
      model: 'gpt-5',
      temperature: 1,
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
      | GenerateTitleJobData
      | GenerateObjectivesJobData
      | GenerateIndexJobData
      | GenerateUnitJobData
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

    if (job.name === 'generate_unit') {
      return this.handleGenerateUnit(job as Job<GenerateUnitJobData>);
    }

    this.logger.warn(`Unknown job name: ${job.name}`);
    return null;
  }

  private async handleGenerateTitle(job: Job<GenerateTitleJobData>) {
    const { courseId, courseKey, topic } = job.data;

    this.logger.log(
      `Generating title for course ${courseId} with topic: ${topic}`,
    );

    // Mark step as running and emit SSE event
    await this.prisma.courseStep.updateMany({
      where: { courseId, type: 'generating_title' },
      data: { status: 'running' },
    });
    this.sseService.emitStatusChange(courseKey, 'GENERATING_TITLE', 'running');

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

      const content = response.content;
      const title = (
        typeof content === 'string' ? content : JSON.stringify(content)
      ).trim();

      // Extract token usage from response
      const promptTokens = response.usage_metadata?.input_tokens ?? null;
      const completionTokens = response.usage_metadata?.output_tokens ?? null;

      // Update course title
      await this.prisma.course.update({
        where: { id: courseId },
        data: { title },
      });

      // Mark step as completed with token usage and emit SSE event
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_title' },
        data: {
          status: 'completed',
          payload: { title },
          promptTokens,
          completionTokens,
        },
      });
      this.sseService.emitStatusChange(
        courseKey,
        'GENERATING_TITLE',
        'completed',
      );

      this.logger.log(
        `Title generated successfully for course ${courseId}: ${title}`,
      );

      return { success: true, title };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to generate title for course ${courseId}: ${err.message}`,
      );

      // Mark step as failed and emit SSE error
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_title' },
        data: {
          status: 'failed',
          error: {
            message: err.message,
            stack: err.stack,
          },
        },
      });
      this.sseService.emitError(courseKey, err.message);

      throw error;
    }
  }

  private async handleGenerateObjectives(job: Job<GenerateObjectivesJobData>) {
    const { courseId, courseKey, objective } = job.data;

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
    const rawTopic = input?.topic;
    const rawAudience = input?.audience;
    const topic =
      typeof rawTopic === 'string' ? rawTopic : JSON.stringify(rawTopic ?? '');
    const audience =
      typeof rawAudience === 'string'
        ? rawAudience
        : JSON.stringify(rawAudience ?? '');
    const conversationId = course.conversations[0]?.id;

    // Mark step as running and emit SSE event
    await this.prisma.courseStep.updateMany({
      where: { courseId, type: 'generating_objectives' },
      data: { status: 'running' },
    });
    this.sseService.emitStatusChange(
      courseKey,
      'GENERATING_OBJECTIVES',
      'running',
    );

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

      const responseContent = response.content;
      const objectives = (
        typeof responseContent === 'string'
          ? responseContent
          : JSON.stringify(responseContent)
      ).trim();

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

      // Emit SSE event with objectives and build method message
      this.sseService.emitObjectivesCompleted(
        courseKey,
        objectives,
        'How do you want to build the course?',
      );

      this.logger.log(
        `Objectives generated successfully for course ${courseId}`,
      );

      return { success: true, objectives };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to generate objectives for course ${courseId}: ${err.message}`,
      );

      // Mark step as failed and emit SSE error
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_objectives' },
        data: {
          status: 'failed',
          error: {
            message: err.message,
            stack: err.stack,
          },
        },
      });
      this.sseService.emitError(courseKey, err.message);

      throw error;
    }
  }

  private async handleGenerateIndex(job: Job<GenerateIndexJobData>) {
    const { courseId, courseKey } = job.data;

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

    // Mark step as running and emit SSE event
    await this.prisma.courseStep.updateMany({
      where: { courseId, type: 'generating_index' },
      data: { status: 'running' },
    });
    this.sseService.emitStatusChange(courseKey, 'GENERATING_INDEX', 'running');

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

      // Emit SSE event with the proposed index
      this.sseService.emitIndexCompleted(courseKey, proposedIndex);

      this.logger.log(`Index generated successfully for course ${courseId}`);

      return { success: true, proposedIndex };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to generate index for course ${courseId}: ${err.message}`,
      );

      // Mark step as failed and emit SSE error
      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_index' },
        data: {
          status: 'failed',
          error: {
            message: err.message,
            stack: err.stack,
          },
        },
      });
      this.sseService.emitError(courseKey, err.message);

      throw error;
    }
  }

  private async handleGenerateUnit(job: Job<GenerateUnitJobData>) {
    const {
      courseId,
      courseKey,
      unitCode,
      unitTitle,
      moduleNumber,
      moduleTitle,
    } = job.data;

    this.logger.log(`Generating unit ${unitCode} for course ${courseId}`);

    // Get course with all necessary data
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error(`Course ${courseId} not found`);
    }

    const input = course.input as Record<string, unknown>;
    const branding =
      (input?.branding as {
        primaryColor: string;
        secondaryColor: string;
        typo1: string;
        typo2: string;
      }) || {};
    const topic = input?.topic || '';
    const audience = input?.audience || '';
    const generatedObjectives = input?.generatedObjectives || '';
    const evaluationDetails =
      (input?.evaluationDetails as { knowledgeCheckEndUnit?: boolean }) || {};

    // Determine if this unit needs evaluation components
    const needsEvaluation = evaluationDetails.knowledgeCheckEndUnit === true;

    // Get available components based on whether we need evaluation
    const componentType = needsEvaluation
      ? undefined
      : { not: 'evaluation' as const };
    const components = await this.prisma.component.findMany({
      where: componentType ? { type: componentType } : {},
      select: {
        id: true,
        internalName: true,
        name: true,
        type: true,
        description: true,
        properties: true,
      },
    });

    // Separate content components and evaluation components
    const contentComponents = components.filter((c) => c.type !== 'evaluation');
    const evaluationComponents = components.filter(
      (c) => c.type === 'evaluation',
    );

    // Mark step as running and emit SSE event
    await this.prisma.courseStep.updateMany({
      where: {
        courseId,
        type: 'generating_unit',
        payload: { path: ['unitCode'], equals: unitCode },
      },
      data: { status: 'running' },
    });
    // Emit unit started event and start loading texts
    this.sseService.emitUnitStarted(courseKey, unitCode, unitTitle);
    this.sseService.startLoadingTexts(courseKey, 'GENERATING_UNIT');

    try {
      const parser = StructuredOutputParser.fromZodSchema(unitContentSchema);

      const formatComponentProps = (props: unknown) => {
        if (!props || typeof props !== 'object') return '';
        // Escape braces for LangChain template by doubling them
        const jsonStr = JSON.stringify(props)
          .replace(/\{/g, '{{')
          .replace(/\}/g, '}}');
        return `\n    Content structure: ${jsonStr}`;
      };

      const componentsList = contentComponents
        .map(
          (c) =>
            `- ${c.internalName}: ${c.name} - ${c.description || 'No description'}${formatComponentProps(c.properties)}`,
        )
        .join('\n');

      const evaluationList =
        needsEvaluation && evaluationComponents.length > 0
          ? `\n\nEvaluation components available (include 1-2 at the end of the unit):\n${evaluationComponents.map((c) => `- ${c.internalName}: ${c.name}${formatComponentProps(c.properties)}`).join('\n')}`
          : '';

      const evaluationRule = needsEvaluation
        ? '\n6. Include 1-2 evaluation components at the end to test understanding'
        : '';

      const prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          `You are an expert instructional designer creating e-learning content. Generate content for a single unit of a course.

Available content components:
${componentsList}
${evaluationList}

Branding guidelines:
- Primary color: ${branding.primaryColor || '#9F80DA'}
- Secondary color: ${branding.secondaryColor || '#1a1a1a'}
- Font: ${branding.typo1 || 'Inter'}

Rules:
1. Use 4-8 components per unit for a well-structured lesson
2. Start with an introduction/title component
3. Mix different component types for engagement
4. For any image component, ALWAYS use "/sample.jpeg" as the image path
5. End with a summary or key takeaways${evaluationRule}
7. Apply the branding colors in styles where appropriate
8. Content should be educational, clear, and appropriate for the target audience
9. IMPORTANT: The "content" object must EXACTLY match the "Content structure" shown for each component. Use only the fields specified in the structure.

{format_instructions}`,
        ],
        [
          'human',
          `Course Topic: {topic}
Target Audience: {audience}
Learning Objectives: {objectives}

Module {moduleNumber}: {moduleTitle}
Unit {unitCode}: {unitTitle}

Generate the complete content for this unit with appropriate components, content, and styling.`,
        ],
      ]);

      const chain = prompt.pipe(this.llm).pipe(parser);

      const maxRetries = 3;
      let lastError: Error | null = null;
      let unitContent: z.infer<typeof unitContentSchema> | null = null;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          unitContent = await chain.invoke({
            topic,
            audience,
            objectives: generatedObjectives,
            moduleNumber,
            moduleTitle,
            unitCode,
            unitTitle,
            format_instructions: parser.getFormatInstructions(),
          });
          break;
        } catch (err) {
          lastError = err as Error;
          this.logger.warn(
            `Unit generation attempt ${attempt}/${maxRetries} failed: ${lastError.message}`,
          );
          if (attempt === maxRetries) {
            throw new Error(
              `Failed to generate unit after ${maxRetries} attempts: ${lastError.message}`,
            );
          }
        }
      }

      if (!unitContent) {
        throw lastError || new Error('Failed to generate unit content');
      }

      // Parse unit code to get module and unit numbers
      const [moduleNum, unitNum] = unitCode.split('.').map(Number);

      // Create a map of component internalName to id for lookup
      const componentIdMap = new Map(
        components.map((c) => [c.internalName, c.id]),
      );

      // Save each component to CourseComponent table
      for (const comp of unitContent.components) {
        const componentId = componentIdMap.get(comp.componentName);

        if (componentId) {
          await this.prisma.courseComponent.create({
            data: {
              courseId,
              componentId,
              module: moduleNum,
              unit: unitNum,
              sequence: comp.order,
              data: comp as Prisma.InputJsonValue,
              userId: course.userId,
            },
          });
        } else {
          this.logger.warn(
            `Component ${comp.componentName} not found in database, skipping`,
          );
        }
      }

      // Update course output with generated unit
      const currentOutput = (course.output as Record<string, unknown>) || {};
      const existingUnits =
        (currentOutput.units as Record<string, unknown>) || {};

      const newOutput = {
        ...currentOutput,
        units: {
          ...existingUnits,
          [unitCode]: unitContent,
        },
      };

      await this.prisma.course.update({
        where: { id: courseId },
        data: {
          output: newOutput as Prisma.InputJsonValue,
        },
      });

      // Mark step as completed
      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_unit',
          payload: { path: ['unitCode'], equals: unitCode },
        },
        data: {
          status: 'completed',
          payload: {
            unitCode,
            unitTitle,
            componentsCount: unitContent.components.length,
          },
        },
      });

      // Check if all units are completed to update course status
      const allUnitSteps = await this.prisma.courseStep.findMany({
        where: { courseId, type: 'generating_unit' },
        select: { status: true },
      });

      const totalUnits = allUnitSteps.length;
      const completedUnits = allUnitSteps.filter(
        (s) => s.status === 'completed',
      ).length;
      const failedUnits = allUnitSteps.filter(
        (s) => s.status === 'failed',
      ).length;
      const runningUnits = allUnitSteps.filter(
        (s) => s.status === 'running',
      ).length;
      const pendingUnits = allUnitSteps.filter(
        (s) => s.status === 'pending',
      ).length;

      const progress = {
        totalUnits,
        completedUnits,
        failedUnits,
        runningUnits,
        pendingUnits,
      };

      // Emit unit completed SSE event
      this.sseService.emitUnitCompleted(
        courseKey,
        unitCode,
        unitTitle,
        progress,
      );

      const allCompleted = allUnitSteps.every((s) => s.status === 'completed');
      const anyFailed = allUnitSteps.some((s) => s.status === 'failed');

      if (allCompleted) {
        await this.prisma.course.update({
          where: { id: courseId },
          data: { status: 'completed' },
        });
        // Emit generation complete SSE event
        this.sseService.emitGenerationComplete(courseKey);
        this.logger.log(`Course ${courseId} generation completed successfully`);
      } else if (anyFailed) {
        await this.prisma.course.update({
          where: { id: courseId },
          data: { status: 'failed' },
        });
        this.sseService.emitError(courseKey, 'Some units failed to generate');
        this.logger.log(`Course ${courseId} generation failed`);
      }

      this.logger.log(
        `Unit ${unitCode} generated successfully for course ${courseId}`,
      );

      return { success: true, unitCode, unitContent };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to generate unit ${unitCode} for course ${courseId}: ${err.message}`,
      );

      // Mark step as failed and emit SSE unit failed event
      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_unit',
          payload: { path: ['unitCode'], equals: unitCode },
        },
        data: {
          status: 'failed',
          error: {
            message: err.message,
            stack: err.stack,
          },
        },
      });
      this.sseService.emitUnitFailed(
        courseKey,
        unitCode,
        unitTitle,
        err.message,
      );

      throw error;
    }
  }
}
