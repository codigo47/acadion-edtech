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
var ObjectivesHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectivesHandler = void 0;
const common_1 = require("@nestjs/common");
const messages_1 = require("@langchain/core/messages");
const prisma_service_1 = require("../../../prisma/prisma.service");
const course_sse_service_1 = require("../../course-sse.service");
const base_handler_1 = require("../base-handler");
let ObjectivesHandler = ObjectivesHandler_1 = class ObjectivesHandler extends base_handler_1.BaseHandler {
    constructor(prisma, sseService) {
        super(prisma, sseService, ObjectivesHandler_1.name);
    }
    async generate(job) {
        const { courseId, courseKey, topic, audience, objective } = job.data;
        this.logger.log(`Generating objectives for course ${courseId} with topic: ${topic}, audience: ${audience}, objective: ${objective}`);
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
        this.sseService.emitStatusChange(courseKey, 'GENERATING_OBJECTIVES', 'running');
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
                new messages_1.SystemMessage(systemPrompt),
                new messages_1.HumanMessage(userPrompt),
            ]);
            const responseContent = response.content;
            const rawObjectives = (typeof responseContent === 'string'
                ? responseContent
                : JSON.stringify(responseContent)).trim();
            let objectives;
            try {
                objectives = JSON.parse(rawObjectives);
            }
            catch {
                this.logger.warn(`Failed to parse objectives JSON, wrapping raw response`);
                objectives = {
                    items: [{ title: 'Objectives', text: rawObjectives }],
                };
            }
            const promptTokens = response.usage_metadata?.input_tokens ?? null;
            const completionTokens = response.usage_metadata?.output_tokens ?? null;
            const currentInput = course.input || {};
            await this.prisma.course.update({
                where: { id: courseId },
                data: {
                    input: { ...currentInput, generatedObjectives: objectives },
                },
            });
            if (conversationId) {
                await this.createMessage(conversationId, 'assistant', JSON.stringify(objectives));
                await this.createMessage(conversationId, 'assistant', 'How do you want to build the course?');
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
            this.sseService.emitObjectivesCompleted(courseKey, JSON.stringify(objectives), 'How do you want to build the course?');
            this.logger.log(`Objectives generated successfully for course ${courseId}`);
            return { success: true, objectives };
        }
        catch (error) {
            const err = error;
            this.logger.error(`Failed to generate objectives for course ${courseId}: ${err.message}`);
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
};
exports.ObjectivesHandler = ObjectivesHandler;
exports.ObjectivesHandler = ObjectivesHandler = ObjectivesHandler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, course_sse_service_1.CourseSSEService])
], ObjectivesHandler);
//# sourceMappingURL=objectives.handler.js.map