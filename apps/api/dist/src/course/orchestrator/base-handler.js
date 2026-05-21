"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHandler = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("@langchain/openai");
class BaseHandler {
    prisma;
    sseService;
    logger;
    llm;
    constructor(prisma, sseService, loggerContext) {
        this.prisma = prisma;
        this.sseService = sseService;
        this.logger = new common_1.Logger(loggerContext);
        this.llm = new openai_1.ChatOpenAI({
            model: 'gpt-5',
            temperature: 1,
            verbose: true,
        });
    }
    async createMessage(conversationId, role, content) {
        const lastMessage = await this.prisma.message.findFirst({
            where: { conversationId },
            orderBy: { sequence: 'desc' },
            select: { sequence: true },
        });
        const sequence = Number(lastMessage?.sequence ?? 0) + 1;
        return this.prisma.message.create({
            data: {
                conversationId,
                role,
                content,
                sequence,
            },
        });
    }
    async getUnitProgress(courseId) {
        const steps = await this.prisma.courseStep.findMany({
            where: {
                courseId,
                type: {
                    in: [
                        'generating_intro_unit',
                        'generating_content_unit',
                        'generating_module_evaluation',
                        'generating_course_evaluation',
                    ],
                },
            },
        });
        const totalUnits = steps.length;
        const completedUnits = steps.filter((s) => s.status === 'completed').length;
        const failedUnits = steps.filter((s) => s.status === 'failed').length;
        const runningUnits = steps.filter((s) => s.status === 'running').length;
        const pendingUnits = steps.filter((s) => s.status === 'pending').length;
        return {
            totalUnits,
            completedUnits,
            failedUnits,
            runningUnits,
            pendingUnits,
        };
    }
    async checkAndEmitGenerationComplete(courseId, courseKey) {
        const progress = await this.getUnitProgress(courseId);
        if (progress.pendingUnits === 0 &&
            progress.runningUnits === 0 &&
            progress.completedUnits > 0) {
            await this.prisma.course.update({
                where: { id: courseId },
                data: { status: 'completed', completedAt: new Date() },
            });
            this.sseService.emitGenerationComplete(courseKey);
            this.logger.log(`Course ${courseId} generation completed`);
        }
    }
    parseUnitCode(unitCode) {
        if (unitCode.startsWith('eval-m')) {
            const moduleNum = parseInt(unitCode.replace('eval-m', ''), 10);
            return { module: moduleNum, unit: 99 };
        }
        if (unitCode === 'final-evaluation') {
            return { module: 99, unit: 99 };
        }
        const [moduleStr, unitStr] = unitCode.split('.');
        return {
            module: parseInt(moduleStr, 10),
            unit: parseInt(unitStr, 10),
        };
    }
    async saveComponents(courseId, userId, unitCode, resultJson) {
        try {
            const components = JSON.parse(resultJson);
            if (!Array.isArray(components)) {
                this.logger.warn(`Invalid components format for unit ${unitCode}`);
                return;
            }
            const { module, unit } = this.parseUnitCode(unitCode);
            const allComponents = await this.prisma.component.findMany({
                select: { id: true, internalName: true },
            });
            const componentMap = new Map(allComponents.map((c) => [c.internalName, c.id]));
            const courseComponents = components.map((comp, index) => {
                const componentId = componentMap.get(comp.component);
                if (!componentId) {
                    this.logger.warn(`Component ${comp.component} not found in database for unit ${unitCode}`);
                    return null;
                }
                const data = (comp.props || comp.content || {});
                return {
                    courseId,
                    componentId,
                    module,
                    unit,
                    sequence: index + 1,
                    data,
                    userId,
                };
            });
            const validComponents = courseComponents.filter((c) => c !== null);
            if (validComponents.length > 0) {
                await this.prisma.courseComponent.createMany({
                    data: validComponents,
                });
                this.logger.log(`Saved ${validComponents.length} components for unit ${unitCode}`);
            }
        }
        catch (error) {
            const err = error;
            this.logger.error(`Failed to save components for unit ${unitCode}: ${err.message}`);
        }
    }
}
exports.BaseHandler = BaseHandler;
//# sourceMappingURL=base-handler.js.map