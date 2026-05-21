"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IntroUnitHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntroUnitHandler = void 0;
const common_1 = require("@nestjs/common");
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const zod_1 = require("zod");
const prisma_service_1 = require("../../../prisma/prisma.service");
const course_sse_service_1 = require("../../course-sse.service");
const base_handler_1 = require("../base-handler");
const utils_1 = require("../utils");
const unitComponentsSchema = zod_1.z.array(zod_1.z.object({
    component: zod_1.z.string().describe('The internal name of the component (e.g., ParagraphBlock, HeadingBlock)'),
    content: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).describe('The content/props for the component following its schema'),
}));
let IntroUnitHandler = IntroUnitHandler_1 = class IntroUnitHandler extends base_handler_1.BaseHandler {
    constructor(prisma, sseService) {
        super(prisma, sseService, IntroUnitHandler_1.name);
    }
    async generate(job) {
        const { courseId, courseKey, unitCode, unitTitle } = job.data;
        this.logger.log(`Generating intro unit ${unitCode} for course ${courseId}`);
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new Error(`Course ${courseId} not found`);
        }
        const input = course.input;
        const { topic, audience, branding, evaluationDetails, generatedObjectives } = input;
        const output = course.output;
        const proposedIndex = output?.proposedIndex;
        const courseOutline = proposedIndex
            ? proposedIndex.modules
                .map((m) => `Module ${m.number}: ${m.title}\n${m.units.map((u) => `  - ${u.code}: ${u.title}`).join('\n')}`)
                .join('\n\n')
            : '';
        let evaluationMethod = 'end of each unit';
        if (evaluationDetails?.finalExercise) {
            evaluationMethod = 'end of course';
        }
        else if (evaluationDetails?.knowledgeCheckEndModule) {
            evaluationMethod = 'end of each module';
        }
        else if (evaluationDetails?.knowledgeCheckEndUnit) {
            evaluationMethod = 'end of each unit';
        }
        const { staticComponentsList, interactiveGeneralComponentsList, interactiveExerciseComponentsList, } = await (0, utils_1.getComponentLists)(this.prisma);
        const generalBloomObjectives = typeof generatedObjectives === 'string'
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
            const parser = output_parsers_1.StructuredOutputParser.fromZodSchema(unitComponentsSchema);
            const prompt = prompts_1.ChatPromptTemplate.fromMessages([
                [
                    'system',
                    `You are an expert instructional designer specializing in adult learning, cognitive scaffolding, and digital course architecture.
Your task is to generate the introductory unit of a course.
This unit sets the stage for learning and must not teach or evaluate specific content that will appear in later units.

Use only the information provided: course topic, target audience, Bloom-aligned general learning objectives, course outline (modules and units), evaluation method, and available content components.

Do NOT invent content outside the structure already defined.

AVAILABLE COMPONENTS
Static Components (information display)
${(0, utils_1.escapeBracesForLangChain)(staticComponentsList)}

Interactive General Components (non-exercise interactions)
${(0, utils_1.escapeBracesForLangChain)(interactiveGeneralComponentsList)}

Interactive Exercise Components (for activation only, not assessment)
${(0, utils_1.escapeBracesForLangChain)(interactiveExerciseComponentsList)}

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
Generate the complete introductory unit following all rules above.

{format_instructions}`,
                ],
                [
                    'human',
                    `Course Topic: {topic}
Target Audience: {audience}

General Bloom-Aligned Learning Objectives:
{generalBloomObjectives}

Full Course Outline (Modules and Units):
{courseOutline}

Evaluation Method Selected by the User:
{evaluationMethod}

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
- End with a motivating closing sentence.`,
                ],
            ]);
            const chain = prompt.pipe(this.llm).pipe(parser);
            const maxRetries = 3;
            let lastError = null;
            let components = null;
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    components = await chain.invoke({
                        topic,
                        audience,
                        generalBloomObjectives,
                        courseOutline,
                        evaluationMethod,
                        staticComponentsList: (0, utils_1.escapeBracesForLangChain)(staticComponentsList),
                        interactiveGeneralComponentsList: (0, utils_1.escapeBracesForLangChain)(interactiveGeneralComponentsList),
                        interactiveExerciseComponentsList: (0, utils_1.escapeBracesForLangChain)(interactiveExerciseComponentsList),
                        primaryColor: branding.primaryColor || '#9F80DA',
                        secondaryColor: branding.secondaryColor || '#1a1a1a',
                        font: branding.typo1 || 'Inter',
                        format_instructions: parser.getFormatInstructions(),
                    });
                    break;
                }
                catch (err) {
                    lastError = err;
                    this.logger.warn(`Intro unit generation attempt ${attempt}/${maxRetries} failed: ${lastError.message}`);
                    if (attempt === maxRetries) {
                        throw new Error(`Failed to generate intro unit after ${maxRetries} attempts: ${lastError.message}`);
                    }
                }
            }
            if (!components) {
                throw lastError || new Error('Failed to generate intro unit');
            }
            const result = JSON.stringify(components);
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
            await this.saveComponents(courseId, course.userId, unitCode, result);
            const progress = await this.getUnitProgress(courseId);
            this.sseService.emitUnitCompleted(courseKey, unitCode, unitTitle, progress);
            await this.checkAndEmitGenerationComplete(courseId, courseKey);
            this.logger.log(`Intro unit ${unitCode} generated successfully for course ${courseId}`);
            return { success: true, unitCode, result };
        }
        catch (error) {
            const err = error;
            this.logger.error(`Failed to generate intro unit ${unitCode}: ${err.message}`);
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
            this.sseService.emitUnitFailed(courseKey, unitCode, unitTitle, err.message);
            throw error;
        }
    }
};
exports.IntroUnitHandler = IntroUnitHandler;
exports.IntroUnitHandler = IntroUnitHandler = IntroUnitHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, course_sse_service_1.CourseSSEService])
], IntroUnitHandler);
//# sourceMappingURL=intro-unit.handler.js.map