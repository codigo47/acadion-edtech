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
var ModuleEvaluationHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleEvaluationHandler = void 0;
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
let ModuleEvaluationHandler = ModuleEvaluationHandler_1 = class ModuleEvaluationHandler extends base_handler_1.BaseHandler {
    constructor(prisma, sseService) {
        super(prisma, sseService, ModuleEvaluationHandler_1.name);
    }
    async generate(job) {
        const { courseId, courseKey, moduleNumber, moduleTitle } = job.data;
        this.logger.log(`Generating module evaluation for module ${moduleNumber} in course ${courseId}`);
        const course = await this.prisma.course.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new Error(`Course ${courseId} not found`);
        }
        const input = course.input;
        const { topic, audience, branding } = input;
        const output = course.output;
        const proposedIndex = output?.proposedIndex;
        const moduleData = proposedIndex?.modules.find(m => m.number === moduleNumber);
        const unitsInModule = moduleData
            ? moduleData.units.map(u => `- ${u.code}: ${u.title}`).join('\n')
            : '';
        const moduleBloomObjectives = moduleData?.bloomObjectives || '';
        const { interactiveExerciseComponentsList } = await (0, utils_1.getComponentLists)(this.prisma);
        await this.prisma.courseStep.updateMany({
            where: {
                courseId,
                type: 'generating_module_evaluation',
                payload: { path: ['moduleNumber'], equals: moduleNumber },
            },
            data: { status: 'running' },
        });
        try {
            const parser = output_parsers_1.StructuredOutputParser.fromZodSchema(unitComponentsSchema);
            const prompt = prompts_1.ChatPromptTemplate.fromMessages([
                [
                    'system',
                    `You are an expert instructional designer specializing in assessment design for e-learning.
Your task is to generate a module-level evaluation unit.
This unit appears at the end of a module and evaluates only the content covered in that specific module.

Use only the information provided: module topic, module learning objectives (Bloom-aligned), target audience, unit list for this module, and available components.
Do NOT invent content that belongs to other modules.

AVAILABLE COMPONENTS
Interactive Exercise Components
${(0, utils_1.escapeBracesForLangChain)(interactiveExerciseComponentsList)}
(Only exercise components are allowed in this unit.)

Each component must follow exactly the schema provided.
No extra fields, renaming, or unsupported structures.

BRANDING
Primary color: ${branding.primaryColor || '#9F80DA'}
Secondary color: ${branding.secondaryColor || '#1a1a1a'}
Font: ${branding.typo1 || 'Inter'}

Apply branding only when the component structure supports style fields.

INSTRUCTIONAL DESIGN FRAMEWORK (GAGNÉ FOR ASSESSMENT)
Structure this evaluation unit following an adapted version of Gagné's instructional events:
1. Prepare the learner
- Begin with a brief paragraph setting expectations and reminding learners what this evaluation covers.
- Connect explicitly to the module's Bloom objectives.
2. Stimulate recall
- Add a short text sentence prompting the learner to recall key concepts from the module (no new explanations).
3. Assessment sequence (Gagné Event 8)
- Provide 4 to 5 interactive exercise components.
- All of them must:
. Include clear instructions (before the component)
. Give meaningful feedback
. Be aligned with the module's Bloom objectives
. Assess content covered in previous units of THIS module
-Exercises must vary in type when possible.
4. Feedback (Event 7)
- Each exercise must provide immediate, concise, pedagogically meaningful feedback for:
. Correct answers
. Incorrect answers
5. Enhance retention & closure
- End with a brief statement reinforcing the learner's progress and encouraging application of the module concepts.

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
- All items must relate directly to the content developed in the module's units.

 YOUR TASK
Generate the complete evaluation unit for this module following all rules above.

{format_instructions}`,
                ],
                [
                    'human',
                    `Course Topic: {topic}
Target Audience: {audience}

Module {moduleNumber}: {moduleTitle}

Units in This Module:
{unitsInModule}

Bloom-Aligned Learning Objectives for This Module:
{moduleBloomObjectives}

Interactive Exercise Components Available:
{interactiveExerciseComponentsList}

Branding:
Primary Color: {primaryColor}
Secondary Color: {secondaryColor}
Font: {font}

Generate the complete evaluation unit for this module, following all rules of the system prompt:
- The evaluation must assess ONLY the content developed in the units of THIS module.
- Create 4–5 interactive exercise components.
- Each exercise must include a prior instruction sentence.
- All exercises must include feedback.
- Exercises must align with the module's Bloom objectives.
- Use only the allowed component schemas.
- Do not repeat full explanations from the learning units.
- End with a brief closing sentence reinforcing application and completion.`,
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
                        moduleNumber: String(moduleNumber),
                        moduleTitle,
                        unitsInModule,
                        moduleBloomObjectives,
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
                    this.logger.warn(`Module evaluation generation attempt ${attempt}/${maxRetries} failed: ${lastError.message}`);
                    if (attempt === maxRetries) {
                        throw new Error(`Failed to generate module evaluation after ${maxRetries} attempts: ${lastError.message}`);
                    }
                }
            }
            if (!components) {
                throw lastError || new Error('Failed to generate module evaluation');
            }
            const result = JSON.stringify(components);
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
            const evalCode = `eval-m${moduleNumber}`;
            await this.saveComponents(courseId, course.userId, evalCode, result);
            const progress = await this.getUnitProgress(courseId);
            this.sseService.emitUnitCompleted(courseKey, evalCode, `Module ${moduleNumber} Evaluation`, progress);
            await this.checkAndEmitGenerationComplete(courseId, courseKey);
            this.logger.log(`Module evaluation for module ${moduleNumber} generated successfully`);
            return { success: true, moduleNumber, result };
        }
        catch (error) {
            const err = error;
            this.logger.error(`Failed to generate module evaluation for module ${moduleNumber}: ${err.message}`);
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
            this.sseService.emitError(courseKey, `Module ${moduleNumber} evaluation failed: ${err.message}`);
            throw error;
        }
    }
};
exports.ModuleEvaluationHandler = ModuleEvaluationHandler;
exports.ModuleEvaluationHandler = ModuleEvaluationHandler = ModuleEvaluationHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, course_sse_service_1.CourseSSEService])
], ModuleEvaluationHandler);
//# sourceMappingURL=module-evaluation.handler.js.map