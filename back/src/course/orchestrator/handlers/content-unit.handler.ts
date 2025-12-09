import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { CourseInput, GenerateContentUnitJobData } from '../types';
import { getComponentLists, escapeBracesForLangChain } from '../utils';

// Schema for unit components output
const unitComponentsSchema = z.array(
  z.object({
    component: z.string().describe('The internal name of the component (e.g., ParagraphBlock, HeadingBlock)'),
    content: z.record(z.string(), z.unknown()).describe('The content/props for the component following its schema'),
  }),
);

@Injectable()
export class ContentUnitHandler extends BaseHandler {
  constructor(prisma: PrismaService, sseService: CourseSSEService) {
    super(prisma, sseService, ContentUnitHandler.name);
  }

  async generate(job: Job<GenerateContentUnitJobData>) {
    const {
      courseId,
      courseKey,
      unitCode,
      unitTitle,
      moduleNumber,
      moduleTitle,
    } = job.data;

    this.logger.log(
      `Generating content unit ${unitCode} for course ${courseId}`,
    );

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error(`Course ${courseId} not found`);
    }

    // Extract data from course.input
    const input = course.input as unknown as CourseInput;
    const { topic, audience, branding, evaluationDetails } = input;

    // Determine evaluation method
    let evaluationMethod = 'end of each unit';
    if (evaluationDetails?.finalExercise) {
      evaluationMethod = 'end of course';
    } else if (evaluationDetails?.knowledgeCheckEndModule) {
      evaluationMethod = 'end of each module';
    } else if (evaluationDetails?.knowledgeCheckEndUnit) {
      evaluationMethod = 'end of each unit';
    }

    // Get unit Bloom objectives from course output
    const output = course.output as Record<string, unknown>;
    const proposedIndex = output?.proposedIndex as
      | {
          title: string;
          modules: Array<{
            number: number;
            title: string;
            units: Array<{
              code: string;
              title: string;
              bloomObjectives?: string;
            }>;
          }>;
        }
      | undefined;

    // Find the unit's Bloom objectives
    let unitBloomObjectives = '';
    if (proposedIndex) {
      for (const module of proposedIndex.modules) {
        const unit = module.units.find((u) => u.code === unitCode);
        if (unit?.bloomObjectives) {
          unitBloomObjectives = unit.bloomObjectives;
          break;
        }
      }
    }

    // Get components from database
    const {
      staticComponentsList,
      interactiveGeneralComponentsList,
      interactiveExerciseComponentsList,
    } = await getComponentLists(this.prisma);

    await this.prisma.courseStep.updateMany({
      where: {
        courseId,
        type: 'generating_content_unit',
        payload: { path: ['unitCode'], equals: unitCode },
      },
      data: { status: 'running' },
    });
    this.sseService.emitUnitStarted(courseKey, unitCode, unitTitle);

    try {
      const parser = StructuredOutputParser.fromZodSchema(unitComponentsSchema);

      const prompt = ChatPromptTemplate.fromMessages([
        [
          'system',
          `You are an expert instructional designer specialized in digital learning and cognitive instructional sequencing.
Your task is to generate the complete content for one instructional unit of the course.
This unit is not the course introduction and not an evaluation-only unit.
Use only the information provided (topic, audience, Bloom objective, evaluation method, and component lists).
Do NOT invent content from other units.

AVAILABLE COMPONENTS
Static Components (information display)
${escapeBracesForLangChain(staticComponentsList)}
Interactive General Components (non-exercise interactions)
${escapeBracesForLangChain(interactiveGeneralComponentsList)}
Interactive Exercise Components
${escapeBracesForLangChain(interactiveExerciseComponentsList)}

Each component must strictly follow the schema provided in its content structure.
Do not modify:
field names
component names
schema structure
or add extra metadata.

BRANDING
Primary color: ${branding.primaryColor || '#9F80DA'}
Secondary color: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}
Apply branding only when a component explicitly supports style fields.

INSTRUCTIONAL DESIGN FRAMEWORK — Use Gagné's Events (adapted)
Structure the learning experience of this unit following these adapted Gagné events:
1. Gain attention
– Start with a concise, engaging idea: a question, scenario, relevant fact, or small challenge related to the learner's context.
2. State the purpose (objective)
– Clearly link what the learner will accomplish to the unit's Bloom objective and their role/audience profile.
3. Stimulate recall of prior learning
– Briefly connect to knowledge from previous units (without repeating content).
Example: "You learned previously that… Now we build on that understanding..."
4. Present the content
– Use appropriate static or interactive general components to explain concepts.
5. Provide learning guidance
– Insert brief hints, analogies, rules-of-thumb, or explanatory cues inside static components to support comprehension.
6. Elicit performance (practice)
– Insert formative exercises mid-unit according to the evaluation rules.
7. Provide feedback
– Ensure exercise components include clear, targeted feedback aligned with the Bloom level.
8. Assess performance (as applicable)
– Add an evaluative-type exercise only when rules require it (end-of-unit evaluation only).
9. Enhance retention and transfer
– End the unit with a short statement reinforcing how learners will apply what they learned in real situations.

CONTENT CREATION RULES
1. Component Count
Use 8 to 12 components total.
2. Introductory Section (Events 1–3)
The unit must begin with a single Static Component containing:
- a short hook gaining attention
- a statement linking audience + Bloom objective
- a brief connection to prior learning
- No exercises here.
3. Content Presentation & Guidance (Events 4–5)
- Use static and/or interactive general components.
- Paragraphs must be paragraphs; lists only allowed in list components.
- Avoid redundancy.
- Choose components that support learning, not decoration.
4. Image Usage
If using image components:
- Always use: "/sample.jpeg"
- Place images early in the unit to support conceptual anchoring.
- Do not scatter images without pedagogical reason.

 5. Interactive Components Rules (Events 6–7)
5.1 Mandatory instruction sentence before every interactive component
Before ANY:
- interactive general component
- interactive exercise component
Insert one brief instructional sentence describing how to interact AND the purpose.
Examples:
"Click each tab to explore the examples."
"Select the correct response to practice applying the concept."

5.2 Exercise placement depending on evaluation method
Let {evaluationMethod} be:
A) If evaluation = "end of unit"
Include two exercise components:
- One mid-unit (any exercise type)
- One at the end, using multiple choice or multiple responses

B) If evaluation = "end of module"
Include two exercise components:
- One mid-unit
- One immediately before the closing statement
(These are practice activities; the module contains a separate evaluation unit.)

C) If evaluation = "end of course"
Include:
- One or two exercise components
They may appear mid-unit and/or near the end, but do NOT label them as "assessment".

6. Pedagogical Consistency
Align explanations and exercises to the unit's Bloom objective(s).
Ensure clarity and accessibility for the target audience.
Introduce concepts once and avoid repeated explanations.

7. Strict Schema Validation
Every component must strictly follow the schema provided.
No extra fields, labels, or new component types.

8. Unit Closing (Event 9)
End with a brief sentence that:
- signals completion
- reinforces how this learning will apply in practice
Do NOT use the highlight component for closing.

9. Output Requirements
- Use 8–12 components
- Follow Gagné's sequence integrated into your structure
- Include instructions before every interactive component
- Respect evaluation rules
- No explanatory text outside of the component structure

 YOUR TASK
Generate the full content for this unit following ALL rules above.

{format_instructions}`,
        ],
        [
          'human',
          `Course Topic: {topic}
Target Audience: {audience}
Unit Bloom Objective(s): {unitBloomObjectives}

Evaluation Method: {evaluationMethod}

Module {moduleNumber}: {moduleTitle}
Unit {unitCode}: {unitTitle}

Static Components Available:
{staticComponentsList}

Interactive General Components Available:
{interactiveGeneralComponentsList}

Interactive Exercise Components Available:
{interactiveExerciseComponentsList}

Branding:
Primary Color: {primaryColor}
Secondary Color: {secondaryColor}
Font: {font}

Generate the complete content for THIS unit only, following all rules of the system prompt:
- The unit is NOT an introduction to the course and NOT an evaluation-only unit.
- Use 8–12 components total.
- Begin with a short hook + purpose + prior-knowledge activation.
- Align all content with the Bloom objective(s) for this unit and the target audience.
- Select static, interactive general, and exercise components exactly as required by the evaluation method.
- Before every interactive component, include one short instruction sentence.
- Use "/sample.jpeg" for any image component.
- Do not repeat content from other units, and do not duplicate paragraphs.
- Follow the official schemas of each component exactly (no extra fields, no modified names).
- End with a brief closing sentence reinforcing application of the content.`,
        ],
      ]);

      const chain = prompt.pipe(this.llm).pipe(parser);

      const maxRetries = 3;
      let lastError: Error | null = null;
      let components: z.infer<typeof unitComponentsSchema> | null = null;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          components = await chain.invoke({
            topic,
            audience,
            unitBloomObjectives,
            evaluationMethod,
            moduleNumber: String(moduleNumber),
            moduleTitle,
            unitCode,
            unitTitle,
            staticComponentsList: escapeBracesForLangChain(staticComponentsList),
            interactiveGeneralComponentsList: escapeBracesForLangChain(interactiveGeneralComponentsList),
            interactiveExerciseComponentsList: escapeBracesForLangChain(interactiveExerciseComponentsList),
            primaryColor: branding.primaryColor || '#9F80DA',
            secondaryColor: branding.secondaryColor || '#1a1a1a',
            font: branding.typo1 || 'Inter',
            format_instructions: parser.getFormatInstructions(),
          });
          break;
        } catch (err) {
          lastError = err as Error;
          this.logger.warn(
            `Content unit generation attempt ${attempt}/${maxRetries} failed: ${lastError.message}`,
          );
          if (attempt === maxRetries) {
            throw new Error(
              `Failed to generate content unit after ${maxRetries} attempts: ${lastError.message}`,
            );
          }
        }
      }

      if (!components) {
        throw lastError || new Error('Failed to generate content unit');
      }

      const result = JSON.stringify(components);

      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_content_unit',
          payload: { path: ['unitCode'], equals: unitCode },
        },
        data: {
          status: 'completed',
          payload: { unitCode, unitTitle, result },
        },
      });

      // Save components to CourseComponent table
      await this.saveComponents(courseId, course.userId, unitCode, result);

      // Get updated progress and emit unit completed event
      const progress = await this.getUnitProgress(courseId);
      this.sseService.emitUnitCompleted(
        courseKey,
        unitCode,
        unitTitle,
        progress,
      );

      // Check if all units are completed
      await this.checkAndEmitGenerationComplete(courseId, courseKey);

      this.logger.log(
        `Content unit ${unitCode} generated successfully for course ${courseId}`,
      );
      return { success: true, unitCode, result };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to generate content unit ${unitCode}: ${err.message}`,
      );

      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_content_unit',
          payload: { path: ['unitCode'], equals: unitCode },
        },
        data: {
          status: 'failed',
          error: { message: err.message, stack: err.stack },
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
