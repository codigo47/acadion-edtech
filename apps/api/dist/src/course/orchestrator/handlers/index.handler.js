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
var IndexHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexHandler = void 0;
const common_1 = require("@nestjs/common");
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const zod_1 = require("zod");
const prisma_service_1 = require("../../../prisma/prisma.service");
const course_sse_service_1 = require("../../course-sse.service");
const base_handler_1 = require("../base-handler");
const courseIndexSchema = zod_1.z.object({
    title: zod_1.z.string().describe('The course title'),
    modules: zod_1.z.array(zod_1.z.object({
        number: zod_1.z.number().describe('Module number starting from 1'),
        title: zod_1.z.string().describe('Descriptive module title'),
        units: zod_1.z.array(zod_1.z.object({
            code: zod_1.z
                .string()
                .describe('Unit code in format moduleNumber.unitNumber (e.g., 1.1, 1.2)'),
            title: zod_1.z.string().describe('Descriptive unit title'),
        })),
    })),
});
let IndexHandler = IndexHandler_1 = class IndexHandler extends base_handler_1.BaseHandler {
    constructor(prisma, sseService) {
        super(prisma, sseService, IndexHandler_1.name);
    }
    async generate(job) {
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
        const input = course.input;
        const topic = input?.topic || '';
        const audience = input?.audience || '';
        const objective = input?.objective || '';
        const generatedObjectives = input?.generatedObjectives || '';
        const modules = input?.modules || {};
        const evaluationDetails = input?.evaluationDetails;
        const conversationId = course.conversations[0]?.id;
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
        await this.prisma.courseStep.updateMany({
            where: { courseId, type: 'generating_index' },
            data: { status: 'running' },
        });
        this.sseService.emitStatusChange(courseKey, 'GENERATING_INDEX', 'running');
        try {
            const modulesDescription = Object.entries(modules)
                .map(([moduleNum, data]) => `Module ${moduleNum}: ${data.units} units`)
                .join('\n');
            const parser = output_parsers_1.StructuredOutputParser.fromZodSchema(courseIndexSchema);
            const prompt = prompts_1.ChatPromptTemplate.fromMessages([
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
            let lastError = null;
            let proposedIndex = null;
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
                }
                catch (err) {
                    lastError = err;
                    this.logger.warn(`Index generation attempt ${attempt}/${maxRetries} failed: ${lastError.message}`);
                    if (attempt === maxRetries) {
                        throw new Error(`Failed to generate valid index after ${maxRetries} attempts: ${lastError.message}`);
                    }
                }
            }
            if (!proposedIndex) {
                throw lastError || new Error('Failed to generate index');
            }
            const indexWithIntros = {
                ...proposedIndex,
                modules: proposedIndex.modules.map((module) => {
                    const isFinalAssessment = module.title.toLowerCase().includes('final assessment') ||
                        module.title.toLowerCase().includes('final evaluation');
                    if (isFinalAssessment) {
                        return {
                            ...module,
                            units: module.units.map((unit) => ({
                                ...unit,
                                code: 'final-evaluation',
                            })),
                        };
                    }
                    const contentUnits = [];
                    let hasEvaluationUnit = false;
                    for (const unit of module.units) {
                        const titleLower = unit.title.toLowerCase();
                        if (titleLower === 'evaluation' ||
                            titleLower === 'final evaluation' ||
                            titleLower.includes('evaluación final') ||
                            titleLower.includes('evaluacion final')) {
                            if (titleLower === 'evaluation') {
                                hasEvaluationUnit = true;
                            }
                        }
                        else {
                            contentUnits.push(unit);
                        }
                    }
                    const renumberedUnits = contentUnits.map((unit, idx) => ({
                        ...unit,
                        code: `${module.number}.${idx + 1}`,
                    }));
                    const finalUnits = [
                        {
                            code: `${module.number}.0`,
                            title: 'Introduction',
                        },
                        ...renumberedUnits,
                    ];
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
            const currentOutput = course.output || {};
            await this.prisma.course.update({
                where: { id: courseId },
                data: {
                    title: indexWithIntros.title,
                    output: { ...currentOutput, proposedIndex: indexWithIntros },
                },
            });
            if (conversationId) {
                await this.createMessage(conversationId, 'assistant', JSON.stringify(indexWithIntros));
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
        }
        catch (error) {
            const err = error;
            this.logger.error(`Failed to generate index for course ${courseId}: ${err.message}`);
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
};
exports.IndexHandler = IndexHandler;
exports.IndexHandler = IndexHandler = IndexHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, course_sse_service_1.CourseSSEService])
], IndexHandler);
//# sourceMappingURL=index.handler.js.map