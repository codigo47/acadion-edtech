import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { PrismaService } from '../../../prisma/prisma.service';
import { CourseSSEService } from '../../course-sse.service';
import { BaseHandler } from '../base-handler';
import { CourseInput, GenerateIntroUnitJobData } from '../types';
import { getComponentLists } from '../utils';

@Injectable()
export class IntroUnitHandler extends BaseHandler {
  constructor(prisma: PrismaService, sseService: CourseSSEService) {
    super(prisma, sseService, IntroUnitHandler.name);
  }

  async generate(job: Job<GenerateIntroUnitJobData>) {
    const { courseId, courseKey, unitCode, unitTitle } = job.data;

    this.logger.log(`Generating intro unit ${unitCode} for course ${courseId}`);

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new Error(`Course ${courseId} not found`);
    }

    // Extract data from course.input
    const input = course.input as unknown as CourseInput;
    const { topic, audience, branding, evaluationDetails, generatedObjectives } =
      input;

    // Get course outline from output
    const output = course.output as Record<string, unknown>;
    const proposedIndex = output?.proposedIndex as
      | {
          title: string;
          modules: Array<{
            number: number;
            title: string;
            units: Array<{ code: string; title: string }>;
          }>;
        }
      | undefined;

    // Build course outline string
    const courseOutline = proposedIndex
      ? proposedIndex.modules
          .map(
            (m) =>
              `Module ${m.number}: ${m.title}\n${m.units.map((u) => `  - ${u.code}: ${u.title}`).join('\n')}`,
          )
          .join('\n\n')
      : '';

    // Determine evaluation method
    let evaluationMethod = 'end of each unit';
    if (evaluationDetails?.finalExercise) {
      evaluationMethod = 'end of course';
    } else if (evaluationDetails?.knowledgeCheckEndModule) {
      evaluationMethod = 'end of each module';
    } else if (evaluationDetails?.knowledgeCheckEndUnit) {
      evaluationMethod = 'end of each unit';
    }

    // Get components from database
    const {
      staticComponentsList,
      interactiveGeneralComponentsList,
      interactiveExerciseComponentsList,
    } = await getComponentLists(this.prisma);

    // Format bloom objectives
    const generalBloomObjectives =
      typeof generatedObjectives === 'string'
        ? generatedObjectives
        : JSON.stringify(generatedObjectives);

    await this.prisma.courseStep.updateMany({
      where: {
        courseId,
        type: 'generating_intro_unit',
        payload: { path: ['unitCode'], equals: unitCode },
      },
      data: { status: 'running' },
    });
    this.sseService.emitUnitStarted(courseKey, unitCode, unitTitle);

    try {
      const systemPrompt = `You are an expert instructional designer specializing in adult learning, cognitive scaffolding, and digital course architecture.
Your task is to generate the introductory unit of a course.
This unit sets the stage for learning and must not teach or evaluate specific content that will appear in later units.

Use only the information provided: course topic, target audience, Bloom-aligned general learning objectives, course outline (modules and units), evaluation method, and available content components.

Do NOT invent content outside the structure already defined.

AVAILABLE COMPONENTS
Static Components (information display)
${staticComponentsList}

Interactive General Components (non-exercise interactions)
${interactiveGeneralComponentsList}

Interactive Exercise Components (for activation only, not assessment)
${interactiveExerciseComponentsList}

(Exercise components may be used ONLY for activation of prior knowledge, NOT for evaluation.)

All components must follow their schema exactly.
No extra fields, renamed fields, or invented component types.

BRANDING
Primary: ${branding.primaryColor || '#9F80DA'}
Secondary: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}

Apply branding only where the component schema allows.

INSTRUCTIONAL FRAMEWORK — Use Gagné's Events Adapted for an Introductory Unit
This unit must follow an adapted version of Gagné's 9 events:
1. Gain attention
Begin with an engaging hook connected to the real world of the target audience:
– A scenario
– A challenge
– A short reflective question
– A relevance statement

2. State the purpose
Present the overall purpose of the course in accessible language.
Connect explicitly to the general Bloom objectives.

3. Stimulate recall of prior knowledge
Include a short paragraph or one interactive component that prompts learners to recall related experiences or knowledge.
This activation must NOT teach new content.

4. Present an overview of the content
Introduce the topics that will appear in the course.
Summarize the focus of each module using the course outline.
Do NOT go into depth; only give macro-level orientation.

5- Provide learning guidance
Add brief tips on how to approach the course, suggestions for mindset, common pitfalls, or ways to connect personal experience with the course topic.

6. Introduce practice expectations (optional)
If using a warming-up exercise:
• It must be formative
• It must NOT assess the learner
• It must include feedback
• It must NOT refer to content not yet taught

7. Explain the evaluation structure
Provide a clear, concise explanation of the chosen evaluation method (end-of-unit / end-of-module / end-of-course).
Describe what learners can expect without revealing questions.

8. Enhance retention & motivation
Close the unit with a motivational statement linking:
– The topic
– The learner's context
– The value of completing the course

STRUCTURE AND COMPONENT RULES
Component Count
- Use 6 to 10 components for this unit.
Intro and overview
- Begin with a static component containing the hook + purpose + prior knowledge activation.
- Use static and interactive general components for presenting the structure and describing modules.
- If using an image, place /sample.jpeg early for conceptual anchoring.
Interaction
- Before interactive general components or activation exercises, add a one-sentence instruction.
- Activation exercises may use any interactive exercise component but must NOT function as evaluation.
Content Restrictions
- Do NOT repeat paragraphs.
- Do NOT dive into content depth that belongs to later units.
- Do NOT include formal evaluation.
- Do NOT contradict the course outline.
Ending
- End with a short closing sentence reinforcing relevance and readiness.

OUTPUT REQUIREMENTS
- Output components only, following {format_instructions}.
- No explanatory text outside the component structure.

YOUR TASK
Generate the complete introductory unit following all rules above.`;

      const userPrompt = `Course Topic: ${topic}
Target Audience: ${audience}

General Bloom-Aligned Learning Objectives:
${generalBloomObjectives}

Full Course Outline (Modules and Units):
${courseOutline}

Evaluation Method Selected by the User:
${evaluationMethod}

Static Components Available:
${staticComponentsList}

Interactive General Components Available:
${interactiveGeneralComponentsList}

Interactive Exercise Components Available:
${interactiveExerciseComponentsList}

Branding:
Primary Color: ${branding.primaryColor || '#9F80DA'}
Secondary Color: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}

Generate the complete INTRODUCTORY UNIT for the course following all rules of the system prompt:
- Begin with a hook tied to real-world relevance for the target audience.
- Introduce the overall purpose of the course and connect it to the general Bloom objectives.
- Activate prior knowledge (paragraph or light interactive component).
- Provide a high-level overview of each module based on the outline.
- Include guidance on how to approach the course.
- Clearly explain the evaluation method selected.
- Use 6–10 total components.
- Include instructions before interactive components.
- If you include an activation exercise, it must give feedback and must NOT assess new content.
- Follow component schemas exactly.
- End with a motivating closing sentence.

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
          type: 'generating_intro_unit',
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
      this.sseService.emitUnitCompleted(courseKey, unitCode, unitTitle, progress);

      // Check if all units are completed
      await this.checkAndEmitGenerationComplete(courseId, courseKey);

      this.logger.log(
        `Intro unit ${unitCode} generated successfully for course ${courseId}`,
      );
      return { success: true, unitCode, result };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to generate intro unit ${unitCode}: ${err.message}`,
      );

      await this.prisma.courseStep.updateMany({
        where: {
          courseId,
          type: 'generating_intro_unit',
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
