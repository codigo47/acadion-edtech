import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { CourseInput, GenerateModuleEvaluationJobData } from '../types';
import { getComponentLists } from '../utils';

@Injectable()
export class ModuleEvaluationHandler extends BaseHandler {
  constructor(prisma: PrismaService, sseService: CourseSSEService) {
    super(prisma, sseService, ModuleEvaluationHandler.name);
  }

  async generate(job: Job<GenerateModuleEvaluationJobData>) {
    const { courseId, courseKey, moduleNumber, moduleTitle } = job.data;

    this.logger.log(
      `Generating module evaluation for module ${moduleNumber} in course ${courseId}`,
    );

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error(`Course ${courseId} not found`);
    }

    // Extract data from course.input
    const input = course.input as unknown as CourseInput;
    const { topic, audience, branding } = input;

    // Get module data from course output
    const output = course.output as Record<string, unknown>;
    const proposedIndex = output?.proposedIndex as {
      title: string;
      modules: Array<{
        number: number;
        title: string;
        bloomObjectives?: string;
        units: Array<{ code: string; title: string; bloomObjectives?: string }>;
      }>;
    } | undefined;

    // Find module data
    const moduleData = proposedIndex?.modules.find(m => m.number === moduleNumber);
    const unitsInModule = moduleData
      ? moduleData.units.map(u => `- ${u.code}: ${u.title}`).join('\n')
      : '';
    const moduleBloomObjectives = moduleData?.bloomObjectives || '';

    // Get components from database
    const { interactiveExerciseComponentsList } = await getComponentLists(this.prisma);

    await this.prisma.courseStep.updateMany({
      where: {
        courseId,
        type: 'generating_module_evaluation',
        payload: { path: ['moduleNumber'], equals: moduleNumber },
      },
      data: { status: 'running' },
    });

    try {
      // TODO: Add your prompt here
      const systemPrompt = `You are an expert instructional designer specializing in assessment design for e-learning.
Your task is to generate a module-level evaluation unit.
This unit appears at the end of a module and evaluates only the content covered in that specific module.

Use only the information provided: module topic, module learning objectives (Bloom-aligned), target audience, unit list for this module, and available components.
Do NOT invent content that belongs to other modules.

AVAILABLE COMPONENTS
Interactive Exercise Components
${interactiveExerciseComponentsList}
(Only exercise components are allowed in this unit.)

Each component must follow exactly the schema provided.
No extra fields, renaming, or unsupported structures.

BRANDING

Primary color: ${branding.primaryColor || '#9F80DA'}
Secondary color: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}

Apply branding only when the component structure supports style fields.

INSTRUCTIONAL DESIGN FRAMEWORK (GAGNÉ FOR ASSESSMENT)
Structure this evaluation unit following an adapted version of Gagné’s instructional events:
1. Prepare the learner
- Begin with a brief paragraph setting expectations and reminding learners what this evaluation covers.
- Connect explicitly to the module’s Bloom objectives.
2. Stimulate recall
- Add a short text sentence prompting the learner to recall key concepts from the module (no new explanations).
3. Assessment sequence (Gagné Event 8)
- Provide 4 to 5 interactive exercise components.
- All of them must:
. Include clear instructions (before the component)
. Give meaningful feedback
. Be aligned with the module’s Bloom objectives
. Assess content covered in previous units of THIS module
-Exercises must vary in type when possible.
4. Feedback (Event 7)
- Each exercise must provide immediate, concise, pedagogically meaningful feedback for:
. Correct answers
. Incorrect answers
5. Enhance retention & closure
- End with a brief statement reinforcing the learner’s progress and encouraging application of the module concepts.

COMPONENT RULES
-This evaluation unit must contain 4 to 5 interactive exercise components only.
- Before each interactive component, include a one-sentence instruction explaining how to respond.
- Feedback is mandatory for every exercise.
- Do not include static or general interactive components unless the schema requires them as part of the exercise.
- No duplicated content from prior units.

OUTPUT REQUIREMENTS
- Output only the list of components using the structure defined in {format_instructions}.
- No commentary or extra text outside components.
- Reflect Bloom alignment in the design of the exercises.
- All items must relate directly to the content developed in the module’s units.

 YOUR TASK
Generate the complete evaluation unit for this module following all rules above.`;

      const userPrompt = `Course Topic: ${topic}
Target Audience: ${audience}

Module ${moduleNumber}: ${moduleTitle}

Units in This Module:
${unitsInModule}

Bloom-Aligned Learning Objectives for This Module:
${moduleBloomObjectives}

Interactive Exercise Components Available:
${interactiveExerciseComponentsList}

Branding:
Primary Color: ${branding.primaryColor || '#9F80DA'}
Secondary Color: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}

Generate the complete evaluation unit for this module, following all rules of the system prompt:
- The evaluation must assess ONLY the content developed in the units of THIS module.
- Create 4–5 interactive exercise components.
- Each exercise must include a prior instruction sentence.
- All exercises must include feedback.
- Exercises must align with the module’s Bloom objectives.
- Use only the allowed component schemas.
- Do not repeat full explanations from the learning units.
- End with a brief closing sentence reinforcing application and completion.

Respond ONLY with the components in the structure defined by {format_instructions}.`;

      const response = await this.llm.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt),
      ]);

      const content = response.content;
      const result =
        typeof content === 'string' ? content : JSON.stringify(content);

      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_module_evaluation',
          payload: { path: ['moduleNumber'], equals: moduleNumber },
        },
        data: {
          status: 'completed',
          payload: { moduleNumber, moduleTitle, result },
        },
      });

      // Save components to CourseComponent table
      const evalCode = `eval-m${moduleNumber}`;
      await this.saveComponents(courseId, course.userId, evalCode, result);

      // Get updated progress and emit completed event
      const progress = await this.getUnitProgress(courseId);
      this.sseService.emitUnitCompleted(
        courseKey,
        evalCode,
        `Module ${moduleNumber} Evaluation`,
        progress,
      );

      // Check if all units are completed
      await this.checkAndEmitGenerationComplete(courseId, courseKey);

      this.logger.log(
        `Module evaluation for module ${moduleNumber} generated successfully`,
      );
      return { success: true, moduleNumber, result };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to generate module evaluation for module ${moduleNumber}: ${err.message}`,
      );

      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_module_evaluation',
          payload: { path: ['moduleNumber'], equals: moduleNumber },
        },
        data: {
          status: 'failed',
          error: { message: err.message, stack: err.stack },
        },
      });
      this.sseService.emitError(
        courseKey,
        `Module ${moduleNumber} evaluation failed: ${err.message}`,
      );
      throw error;
    }
  }
}
