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
var CourseEvaluationHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseEvaluationHandler = void 0;
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
let CourseEvaluationHandler = CourseEvaluationHandler_1 = class CourseEvaluationHandler extends base_handler_1.BaseHandler {
    constructor(prisma, sseService) {
        super(prisma, sseService, CourseEvaluationHandler_1.name);
    }
    async generate(job) {
        const { courseId, courseKey } = job.data;
        this.logger.log(`Generating course evaluation for course ${courseId}`);
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new Error(`Course ${courseId} not found`);
        }
        const input = course.input;
        const { topic, audience, branding, generatedObjectives } = input;
        const output = course.output;
        const proposedIndex = output?.proposedIndex;
        const fullCourseStructure = proposedIndex
            ? proposedIndex.modules
                .map((m) => `Module ${m.number}: ${m.title}\n${m.units.map((u) => `  - ${u.code}: ${u.title}`).join('\n')}`)
                .join('\n\n')
            : '';
        const courseBloomObjectives = typeof generatedObjectives === 'string'
            ? generatedObjectives
            : JSON.stringify(generatedObjectives);
        const { interactiveExerciseComponentsList } = await (0, utils_1.getComponentLists)(this.prisma);
        await this.prisma.courseStep.updateMany({
            where: {
                courseId,
                type: 'generating_course_evaluation',
            },
            data: { status: 'running' },
        });
        try {
            const parser = output_parsers_1.StructuredOutputParser.fromZodSchema(unitComponentsSchema);
            const prompt = prompts_1.ChatPromptTemplate.fromMessages([
                [
                    'system',
                    `You are an expert instructional designer specializing in summative assessment for online learning.
Your task is to generate the final course evaluation unit, which assesses the content of all modules and all units in the course.

Use the course outline, all Bloom-aligned objectives, and the target audience description.
Do NOT invent topics outside the course structure.

AVAILABLE COMPONENTS
Interactive Exercise Components
${(0, utils_1.escapeBracesForLangChain)(interactiveExerciseComponentsList)}
(Only exercise components are permitted in this evaluation unit.)
All components must follow their defined schema exactly.

BRANDING
Primary color: ${branding.primaryColor || '#9F80DA'}
Secondary color: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}

Apply branding only when supported.

INSTRUCTIONAL DESIGN FRAMEWORK (GAGNÉ ADAPTED FOR SUMMATIVE ASSESSMENT)

Use Gagné's events to structure a comprehensive final evaluation:

1. Prepare the learner for assessment
- Begin with a short paragraph explaining that this evaluation covers the entire course.
- Reinforce the purpose and connection to overall course Bloom objectives.
2. Stimulate recall
- Add a brief prompt that helps the learner mentally organize content from all modules (no explanation, just activation).
3. Assessment sequence (Event 8)
- For each unit of the entire course, create 2 to 3 exercise components.
. Exercises must align with that unit's Bloom objectives.
. Exercises must reference the content actually developed in those units.
- Exercises must include a variety of formats when possible.
- All exercises must include feedback.
4. Provide feedback (Event 7)
Each exercise component must include concise, actionable feedback for correct and incorrect responses.
5. Closure and transfer
End the evaluation unit with a short sentence reinforcing completion and suggesting application of learning.

COMPONENT RULES
- This evaluation unit will be longer than a regular unit, because it evaluates all content.
- Exercises must be grouped logically by unit or theme, but displayed as a single evaluation unit.
- Before each interactive component, include a one-sentence instruction that clarifies the expected interaction.
- No repetition of full explanations from previous units: use references, not restatements.

OUTPUT REQUIREMENTS
- Output only the list of components using the structure defined in {format_instructions}.
- No commentary outside components.
- The number of exercises must equal: 2–3 exercises × number of units across the full course.
- All exercises must include feedback.
- All exercises must align with Bloom taxonomy levels defined for each unit.

 YOUR TASK
Generate the final evaluation unit assessing all modules and units of the course, following every rule above.

{format_instructions}`,
                ],
                [
                    'human',
                    `Course Topic: {topic}
Target Audience: {audience}

Full Course Outline (Modules and Units):
{fullCourseStructure}

Bloom-Aligned Learning Objectives for the Entire Course:
{courseBloomObjectives}

Interactive Exercise Components Available:
{interactiveExerciseComponentsList}

Branding:
Primary Color: {primaryColor}
Secondary Color: {secondaryColor}
Font: {font}

Generate the final evaluation unit for the entire course, following all rules of the system prompt:
- The evaluation must assess ALL units from ALL modules.
- For EACH unit in the course, create 2–3 interactive exercise components.
- Each exercise must include a prior instruction sentence.
- All exercises must include feedback.
- Exercises must align with the Bloom objectives of their corresponding unit.
- Use only the allowed component schemas.
- Avoid repeating full explanations from the learning units.
- End with a brief sentence reinforcing completion and transfer of learning.`,
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
                        fullCourseStructure,
                        courseBloomObjectives,
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
                    this.logger.warn(`Course evaluation generation attempt ${attempt}/${maxRetries} failed: ${lastError.message}`);
                    if (attempt === maxRetries) {
                        throw new Error(`Failed to generate course evaluation after ${maxRetries} attempts: ${lastError.message}`);
                    }
                }
            }
            if (!components) {
                throw lastError || new Error('Failed to generate course evaluation');
            }
            const result = JSON.stringify(components);
            await this.prisma.courseStep.updateMany({
                where: {
                    courseId,
                    type: 'generating_course_evaluation',
                },
                data: {
                    status: 'completed',
                    payload: { result },
                },
            });
            await this.saveComponents(courseId, course.userId, 'final-evaluation', result);
            const progress = await this.getUnitProgress(courseId);
            this.sseService.emitUnitCompleted(courseKey, 'final-evaluation', 'Final Course Evaluation', progress);
            await this.checkAndEmitGenerationComplete(courseId, courseKey);
            this.logger.log(`Course evaluation generated successfully for course ${courseId}`);
            return { success: true, result };
        }
        catch (error) {
            const err = error;
            this.logger.error(`Failed to generate course evaluation: ${err.message}`);
            await this.prisma.courseStep.updateMany({
                where: {
                    courseId,
                    type: 'generating_course_evaluation',
                },
                data: {
                    status: 'failed',
                    error: { message: err.message, stack: err.stack },
                },
            });
            this.sseService.emitError(courseKey, `Course evaluation failed: ${err.message}`);
            throw error;
        }
    }
};
exports.CourseEvaluationHandler = CourseEvaluationHandler;
exports.CourseEvaluationHandler = CourseEvaluationHandler = CourseEvaluationHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, course_sse_service_1.CourseSSEService])
], CourseEvaluationHandler);
//# sourceMappingURL=course-evaluation.handler.js.map