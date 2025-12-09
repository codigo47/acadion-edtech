import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { GenerateIndexJobData } from '../types';

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

@Injectable()
export class IndexHandler extends BaseHandler {
  constructor(prisma: PrismaService, sseService: CourseSSEService) {
    super(prisma, sseService, IndexHandler.name);
  }

  async generate(job: Job<GenerateIndexJobData>) {
    const { courseId, courseKey } = job.data;

    this.logger.log(`Generating index for course ${courseId}`);

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
    const evaluationDetails = input?.evaluationDetails as
      | {
          knowledgeCheckEndUnit?: boolean;
          knowledgeCheckEndModule?: boolean;
          finalExercise?: boolean;
        }
      | undefined;
    const conversationId = course.conversations[0]?.id;

    let evaluationMethod = 'end of each unit';
    if (evaluationDetails?.finalExercise) {
      evaluationMethod = 'end of course';
    } else if (evaluationDetails?.knowledgeCheckEndModule) {
      evaluationMethod = 'end of each module';
    } else if (evaluationDetails?.knowledgeCheckEndUnit) {
      evaluationMethod = 'end of each unit';
    }

    await this.prisma.courseStep.updateMany({
      where: { courseId, type: 'generating_index' },
      data: { status: 'running' },
    });
    this.sseService.emitStatusChange(courseKey, 'GENERATING_INDEX', 'running');

    try {
      const modulesDescription = Object.entries(modules)
        .map(([moduleNum, data]) => `Module ${moduleNum}: ${data.units} units`)
        .join('\n');

      const parser = StructuredOutputParser.fromZodSchema(courseIndexSchema);

      const prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          `You are an expert instructional designer. Your task is to generate the full course outline (modules and units) and the final course title, based on the user-provided topic, learning objectives, target audience, course structure, and evaluation method.

          Follow all the rules below:

          1. Course Structure Rules
          The course consists of one course, divided into modules, and each module contains units.

          IMPORTANT: The user specifies the number of CONTENT units per module. You must generate exactly that number of content units.
          An "Introduction" unit will be automatically added to each module by the system - DO NOT include introduction units in your output.

          Example: If the user says "Module 1: 2 units", you generate exactly 2 content units for Module 1.
          The system will automatically prepend an "Introduction" unit, resulting in 3 total units for that module.

          Keep module titles broad and unit titles more specific.
          Ensure progression from foundational concepts → applied skills → higher-order understanding (aligned with the learning objectives).
          DO NOT create units with titles like "Introduction", "Course Introduction", "Module Introduction", "Overview", etc.

          2. Evaluation Rules
          Use the user's selected evaluation method:

          A. Evaluation only at the end of the course
          → Add an extra final module named e.g., "Final Assessment", containing one unit titled "Final Evaluation".

          B. Evaluation at the end of each module
          → Add a final unit titled "Evaluation" at the end of every module.
          → This "Evaluation" unit is IN ADDITION to the content units requested by the user.
          → Example: If user says "Module 1: 2 units" with module evaluation, you generate 2 content units + 1 "Evaluation" unit = 3 units total (plus the auto-added Introduction = 4 total).

          C. Evaluation at the end of each unit
          → Do not add evaluation units in the outline.
          → Evaluation is internal to each unit and should not appear in the index.

          3. Alignment to Learning Objectives
          Use only the learning levels appropriate for self-paced e-learning: Remember, Understand, Apply, Analyze.
          Do not invent topics, skills, or complexity beyond what the objectives support.
          Maintain consistent depth appropriate for the target audience.
          Ensure each module and unit clearly contributes to achieving the user-provided learning objectives.

          4. Course Title Rules
          Generate the course title after completing the outline, but display it FIRST in the final output.
          The title must:
          - Be 5–10 words.
          - Be clear, professional, and engaging.
          - Reflect the topic, the scope of the outline, and the learning depth.
          - Include a natural reference to the target audience (e.g., "for Programmers", "for New Managers", "for Teachers").
          - Not include quotes or special characters.
          - Not repeat module or unit titles.

          5. Formatting Rules for the Output
          Your final output must follow exactly this structure:

          Course Title
          (on a single line, no label)

          (Include final assessment module only when required.)

          No explanations, no commentary, no extra text.
          Only the course title and the full outline.

          6. Additional Requirements
          Use precise, descriptive, meaningful titles.
          Avoid redundancy between units.
          Maintain stylistic consistency throughout the whole course.
          Never repeat the course title inside module titles.
          NEVER include "Introduction" units - they are added automatically by the system.

          Your task:
          Using the information provided by the user (topic, audience, objectives, module/unit structure, and evaluation method), create the complete course outline and the course title, following all rules above.

          {format_instructions}
          `,
        ],
        [
          'human',
          `Course Topic: ${topic}
            Target Audience: ${audience}

            User's Learning Objectives:
            ${objective}

            Generated Bloom-Aligned Objectives:
            ${generatedObjectives}

            Module Structure (CONTENT units only - Introduction units are added automatically):
            ${modulesDescription}

            Evaluation Method: ${evaluationMethod}

            Using all the information above, generate:

            1) A clear, concise, professional **course title** (5–10 words) that:
              - Reflects the course topic
              - Incorporates a natural reference to the target audience
              - Matches the depth and scope implied by the learning objectives
              - Aligns with the module structure and evaluation method

            2) The **full course outline**, following these rules:
              - Generate exactly the number of CONTENT units specified for each module
              - DO NOT include "Introduction" units - they are added automatically by the system
              - Give every module and unit a descriptive, meaningful title
              - Ensure a logical learning progression aligned with the learning objectives
              - Apply the evaluation rules:
                  • If the evaluation is "end of course": add a final module with one unit titled "Final Evaluation"
                  • If the evaluation is "end of each module": add a final unit titled "Evaluation" inside every module (in addition to content units)
                  • If the evaluation is "end of each unit": do NOT add evaluation units to the outline
              - Do not add new content outside the given learning objectives
              - Do not include descriptions or explanations—only titles

            (Include the final assessment module only if required)

            Respond ONLY with the title and outline.
          `,
        ],
      ]);

      const chain = prompt.pipe(this.llm).pipe(parser);

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
          break;
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

      // Add Introduction unit to each module (except Final Assessment) and fix unit codes
      const indexWithIntros = {
        ...proposedIndex,
        modules: proposedIndex.modules.map((module) => {
          // Check if this is the Final Assessment module
          const isFinalAssessment =
            module.title.toLowerCase().includes('final assessment') ||
            module.title.toLowerCase().includes('final evaluation');

          if (isFinalAssessment) {
            // For Final Assessment, use 'final-evaluation' code
            return {
              ...module,
              units: module.units.map((unit) => ({
                ...unit,
                code: 'final-evaluation',
              })),
            };
          }

          // Process units: separate content units and evaluation units
          const contentUnits: Array<{ code: string; title: string }> = [];
          let hasEvaluationUnit = false;

          for (const unit of module.units) {
            if (unit.title.toLowerCase() === 'evaluation') {
              hasEvaluationUnit = true;
            } else {
              contentUnits.push(unit);
            }
          }

          // Renumber content units to start from 1 (Introduction will be 0)
          const renumberedUnits = contentUnits.map((unit, idx) => ({
            ...unit,
            code: `${module.number}.${idx + 1}`,
          }));

          // Build the final units array: Introduction + content units + optional Evaluation
          const finalUnits: Array<{ code: string; title: string }> = [
            {
              code: `${module.number}.0`,
              title: 'Introduction',
            },
            ...renumberedUnits,
          ];

          // Add evaluation unit with correct code if it exists
          if (hasEvaluationUnit) {
            finalUnits.push({
              code: `eval-m${module.number}`,
              title: 'Evaluation',
            });
          }

          return {
            ...module,
            units: finalUnits,
          };
        }),
      };

      const currentOutput = (course.output as Record<string, unknown>) || {};
      await this.prisma.course.update({
        where: { id: courseId },
        data: {
          output: { ...currentOutput, proposedIndex: indexWithIntros },
        },
      });

      if (conversationId) {
        await this.createMessage(
          conversationId,
          'assistant',
          JSON.stringify(indexWithIntros),
        );
      }

      await this.prisma.courseStep.updateMany({
        where: { courseId, type: 'generating_index' },
        data: {
          status: 'completed',
          payload: { proposedIndex: indexWithIntros },
        },
      });

      this.sseService.emitIndexCompleted(courseKey, indexWithIntros);

      this.logger.log(`Index generated successfully for course ${courseId}`);

      return { success: true, proposedIndex: indexWithIntros };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to generate index for course ${courseId}: ${err.message}`,
      );

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
}
