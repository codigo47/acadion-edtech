import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { GenerateObjectivesJobData } from '../types';

@Injectable()
export class ObjectivesHandler extends BaseHandler {
  constructor(prisma: PrismaService, sseService: CourseSSEService) {
    super(prisma, sseService, ObjectivesHandler.name);
  }

  async generate(job: Job<GenerateObjectivesJobData>) {
    const { courseId, courseKey, topic, audience, objective } = job.data;

    this.logger.log(
      `Generating objectives for course ${courseId} with topic: ${topic}, audience: ${audience}, objective: ${objective}`,
    );

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

    const conversationId = course.conversations[0]?.id;

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
      const systemPrompt = `You are an expert instructional designer specializing in Bloom's Taxonomy. Your task is to transform user-provided learning objectives into clear, well-structured objectives aligned with Bloom's Taxonomy using only the cognitive levels appropriate for fully self-paced e-learning.

Use only these Bloom levels:
• Remember
• Understand
• Apply
• Analyze (only for structured, closed-response tasks)

Do not generate objectives at the Evaluate or Create levels, as they are not feasible in self-paced e-learning environments.

When rewriting the objectives:
- Select the appropriate Bloom level based strictly on the user's intention.
- Do not introduce new content or complexity beyond what the user describes.
- If the user's text includes expressions such as "learn the basics", "introduction", "fundamentals", "overview", "general understanding", or any similar wording, default to the Remember or Understand levels.
- Use action verbs aligned with the selected Bloom level.
- Make each objective specific, measurable, and achievable within a self-paced course.
- Combine or reformulate redundant objectives when needed.
- Present the final objectives ordered from lower to higher cognitive level (Remember → Understand → Apply → Analyze).

IMPORTANT: You MUST respond with a valid JSON object in this exact format:
{
  "items": [
    { "title": "Remember", "text": "Define the key terminology related to the topic" },
    { "title": "Understand", "text": "Explain the main concepts and their purpose" },
    { "title": "Apply", "text": "Use the learned procedures in guided scenarios" },
    { "title": "Analyze", "text": "Identify the relevant elements and relationships within a given situation" }
  ]
}

Each item should have:
- "title": The Bloom's Taxonomy level (Remember, Understand, Apply, or Analyze)
- "text": The specific learning objective for that level

Respond with ONLY the JSON object, no explanations, notes, or additional text.`;

      const userPrompt = `Course Topic: ${topic}
Target Audience: ${audience}
User's Learning Objectives: ${objective}

Based on the learning objectives provided by the user, generate 4–6 clear, well-defined objectives that align with Bloom's Taxonomy using only the levels appropriate for fully self-paced e-learning (Remember, Understand, Apply, Analyze).

When rewriting the objectives, ensure they:
• Reflect the user's intention and stay within the scope of the content.
• Default to Remember or Understand if the user describes introductory goals (e.g., "learn the basics", "overview", "fundamentals").
• Are specific, measurable, and achievable for the given audience.
• Avoid objectives from the Evaluate or Create levels.

Respond with ONLY the JSON object in the specified format.`;

      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      const responseContent = response.content;
      const rawObjectives = (
        typeof responseContent === 'string'
          ? responseContent
          : JSON.stringify(responseContent)
      ).trim();

      let objectives: { items: Array<{ title: string; text: string }> };
      try {
        objectives = JSON.parse(rawObjectives);
      } catch {
        this.logger.warn(
          `Failed to parse objectives JSON, wrapping raw response`,
        );
        objectives = {
          items: [{ title: 'Objectives', text: rawObjectives }],
        };
      }

      const promptTokens = response.usage_metadata?.input_tokens ?? null;
      const completionTokens = response.usage_metadata?.output_tokens ?? null;

      const currentInput = (course.input as Record<string, unknown>) || {};
      await this.prisma.course.update({
        where: { id: courseId },
        data: {
          input: { ...currentInput, generatedObjectives: objectives },
        },
      });

      if (conversationId) {
        await this.createMessage(
          conversationId,
          'assistant',
          JSON.stringify(objectives),
        );

        await this.createMessage(
          conversationId,
          'assistant',
          'How do you want to build the course?',
        );
      }

      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_objectives' },
        data: {
          status: 'completed',
          payload: { objectives },
          promptTokens,
          completionTokens,
        },
      });

      this.sseService.emitObjectivesCompleted(
        courseKey,
        JSON.stringify(objectives),
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
}
