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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../prisma/prisma.service");
const constants_1 = require("./constants");
const course_sse_service_1 = require("./course-sse.service");
let CourseService = class CourseService {
    prisma;
    courseQueue;
    sseService;
    constructor(prisma, courseQueue, sseService) {
        this.prisma = prisma;
        this.courseQueue = courseQueue;
        this.sseService = sseService;
    }
    async getNextSequence(conversationId) {
        const lastMessage = await this.prisma.message.findFirst({
            where: { conversationId },
            orderBy: { sequence: 'desc' },
            select: { sequence: true },
        });
        return Number(lastMessage?.sequence ?? 0) + 1;
    }
    async createMessage(conversationId, role, content) {
        const sequence = await this.getNextSequence(conversationId);
        return this.prisma.message.create({
            data: {
                conversationId,
                role,
                content,
                sequence,
            },
        });
    }
    async create(createCourseDto) {
        const { userId } = createCourseDto;
        const course = await this.prisma.course.create({
            data: {
                userId,
            },
        });
        const conversation = await this.prisma.conversation.create({
            data: {
                userId,
                courseId: course.id,
                title: 'Course Creation',
            },
        });
        return {
            courseKey: course.key,
            conversationKey: conversation.id,
        };
    }
    async generateTitle(generateTitleDto) {
        const { courseKey, conversationKey, topic } = generateTitleDto;
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const currentInput = course.input || {};
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, topic },
            },
        });
        await this.createMessage(conversationKey, 'user', topic);
        const aiMessage = `Let's start designing your course. Tell me, who are the target learners?

• Who are they?
• What knowledge do they have about the topic?
• Why do they need to learn?

* The more details and context you provide, the better`;
        await this.createMessage(conversationKey, 'assistant', aiMessage);
        return {
            success: true,
            aiMessage,
        };
    }
    async findByKey(key) {
        const course = await this.prisma.course.findFirst({
            where: { key },
            include: {
                steps: {
                    orderBy: { createdAt: 'asc' },
                },
                conversations: {
                    include: {
                        messages: {
                            orderBy: { createdAt: 'asc' },
                        },
                    },
                },
            },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${key} not found`);
        }
        return {
            ...course,
            conversations: course.conversations.map((conv) => ({
                ...conv,
                messages: conv.messages.map((msg) => ({
                    ...msg,
                    sequence: Number(msg.sequence),
                })),
            })),
        };
    }
    async setAudience(setAudienceDto) {
        const { courseKey, conversationKey, audience } = setAudienceDto;
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const currentInput = course.input || {};
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, audience },
            },
        });
        await this.createMessage(conversationKey, 'user', audience);
        const aiMessage = `Now tell me about the course objectives. What do you want them to learn and at what depth?`;
        await this.createMessage(conversationKey, 'assistant', aiMessage);
        return {
            success: true,
            aiMessage,
        };
    }
    async setObjective(setObjectiveDto) {
        const { courseKey, conversationKey, objective } = setObjectiveDto;
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const currentInput = course.input || {};
        const topic = typeof currentInput.topic === 'string'
            ? currentInput.topic
            : JSON.stringify(currentInput.topic ?? '');
        const audience = typeof currentInput.audience === 'string'
            ? currentInput.audience
            : JSON.stringify(currentInput.audience ?? '');
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, objective },
            },
        });
        await this.createMessage(conversationKey, 'user', objective);
        await this.prisma.courseStep.create({
            data: {
                courseId: course.id,
                type: 'generating_objectives',
                status: 'pending',
            },
        });
        await this.courseQueue.add('generate_objectives', {
            courseId: course.id,
            courseKey,
            topic,
            audience,
            objective,
        });
        return {
            success: true,
        };
    }
    async setBuildingMethod(courseKey, dto) {
        const { conversationKey, buildingMethod } = dto;
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const methodLabels = {
            ai: 'With AI',
            references_ai: 'With my references + AI',
            material_only: 'Only with my material',
        };
        const userMessage = methodLabels[buildingMethod];
        const currentInput = course.input || {};
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, buildingMethod },
            },
        });
        await this.createMessage(conversationKey, 'user', userMessage);
        const aiMessage = `Great! Now let's define the structure.\n\nHow many modules will the course have?`;
        const maxModules = 10;
        await this.createMessage(conversationKey, 'assistant', aiMessage);
        return {
            success: true,
            aiMessage,
            maxModules,
        };
    }
    async setModules(courseKey, dto) {
        const { conversationKey, modulesCount } = dto;
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const currentInput = course.input || {};
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, modulesCount },
            },
        });
        await this.createMessage(conversationKey, 'user', `${modulesCount} modules`);
        const aiMessage = `How many units per module?`;
        const maxUnits = 10;
        await this.createMessage(conversationKey, 'assistant', aiMessage);
        return {
            success: true,
            aiMessage,
            modulesCount,
            maxUnits,
        };
    }
    async setUnits(courseKey, dto) {
        const { conversationKey, modules } = dto;
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const currentInput = course.input || {};
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, modules },
            },
        });
        const unitsDescription = Object.entries(modules)
            .map(([moduleNum, data]) => `Module ${moduleNum}: ${data.units} units`)
            .join(', ');
        await this.createMessage(conversationKey, 'user', unitsDescription);
        const aiMessage = "Great! Now let's configure the knowledge checks. Select when you want to evaluate your learners:";
        await this.createMessage(conversationKey, 'assistant', aiMessage);
        return {
            success: true,
            modules,
            aiMessage,
            nextScreen: 'evaluation',
        };
    }
    async getExerciseTypes(courseKey, conversationKey) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const evaluationComponents = await this.prisma.component.findMany({
            where: { subtype: 'exercise' },
            select: { id: true, name: true },
        });
        const aiMessage = "To design your eLearning, let's select all the exercise types you want to include:";
        await this.createMessage(conversationKey, 'assistant', aiMessage);
        return {
            success: true,
            aiMessage,
            exerciseTypes: evaluationComponents,
        };
    }
    async setEvaluation(courseKey, conversationKey, selectedComponents) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const evaluationData = selectedComponents.map((c) => ({ name: c.name }));
        const currentInput = course.input || {};
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, evaluation: evaluationData },
            },
        });
        const userMessage = JSON.stringify({
            exerciseTypes: selectedComponents.map((c) => c.name),
        });
        await this.createMessage(conversationKey, 'user', userMessage);
        const aiMessage = 'How will the evaluation be?';
        await this.createMessage(conversationKey, 'assistant', aiMessage);
        return {
            success: true,
            aiMessage,
        };
    }
    async setEvaluationDetails(courseKey, dto) {
        const { conversationKey, ...evaluationDetails } = dto;
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const currentInput = course.input || {};
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, evaluationDetails },
            },
        });
        const userMessage = JSON.stringify({ evaluationDetails });
        await this.createMessage(conversationKey, 'user', userMessage);
        const aiMessage = "Now let's set up the visual identity for your course. Configure the colors and typography:";
        await this.createMessage(conversationKey, 'assistant', aiMessage);
        return {
            success: true,
            aiMessage,
            nextScreen: 'visualIdentity',
        };
    }
    async updateTitle(courseId, title) {
        return this.prisma.course.update({
            where: { id: courseId },
            data: { title },
        });
    }
    async generateCourse(courseKey) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const input = course.input;
        const evaluationDetails = input?.evaluationDetails;
        const output = course.output;
        const proposedIndex = output?.proposedIndex;
        if (!proposedIndex) {
            throw new common_1.NotFoundException('Course index not found. Generate index first.');
        }
        const jobs = [];
        for (const module of proposedIndex.modules) {
            jobs.push({
                type: 'generate_intro_unit',
                stepType: 'generating_intro_unit',
                unitCode: `${module.number}.0`,
                unitTitle: 'Introduction',
                moduleNumber: module.number,
                moduleTitle: module.title,
            });
            for (const unit of module.units) {
                if (unit.title.toLowerCase() === 'evaluation') {
                    continue;
                }
                jobs.push({
                    type: 'generate_content_unit',
                    stepType: 'generating_content_unit',
                    unitCode: unit.code,
                    unitTitle: unit.title,
                    moduleNumber: module.number,
                    moduleTitle: module.title,
                });
            }
            if (evaluationDetails?.knowledgeCheckEndModule) {
                jobs.push({
                    type: 'generate_module_evaluation',
                    stepType: 'generating_module_evaluation',
                    moduleNumber: module.number,
                    moduleTitle: module.title,
                });
            }
        }
        if (evaluationDetails?.finalExercise) {
            jobs.push({
                type: 'generate_course_evaluation',
                stepType: 'generating_course_evaluation',
            });
        }
        await this.prisma.course.update({
            where: { id: course.id },
            data: { status: 'generating' },
        });
        this.sseService.emitStatusChange(courseKey, 'GENERATING_COURSE', 'running');
        this.sseService.emitUnitProgress(courseKey, {
            totalUnits: jobs.length,
            completedUnits: 0,
            failedUnits: 0,
            runningUnits: 0,
            pendingUnits: jobs.length,
        });
        await Promise.all(jobs.map((job) => {
            if (job.type === 'generate_course_evaluation') {
                return this.prisma.courseStep.create({
                    data: {
                        courseId: course.id,
                        type: job.stepType,
                        status: 'pending',
                        payload: {},
                    },
                });
            }
            else if (job.type === 'generate_module_evaluation') {
                return this.prisma.courseStep.create({
                    data: {
                        courseId: course.id,
                        type: job.stepType,
                        status: 'pending',
                        payload: {
                            moduleNumber: job.moduleNumber,
                            moduleTitle: job.moduleTitle,
                        },
                    },
                });
            }
            else {
                return this.prisma.courseStep.create({
                    data: {
                        courseId: course.id,
                        type: job.stepType,
                        status: 'pending',
                        payload: { unitCode: job.unitCode, unitTitle: job.unitTitle },
                    },
                });
            }
        }));
        await Promise.all(jobs.map((job) => {
            if (job.type === 'generate_course_evaluation') {
                return this.courseQueue.add(job.type, {
                    courseId: course.id,
                    courseKey,
                });
            }
            else if (job.type === 'generate_module_evaluation') {
                return this.courseQueue.add(job.type, {
                    courseId: course.id,
                    courseKey,
                    moduleNumber: job.moduleNumber,
                    moduleTitle: job.moduleTitle,
                });
            }
            else {
                return this.courseQueue.add(job.type, {
                    courseId: course.id,
                    courseKey,
                    unitCode: job.unitCode,
                    unitTitle: job.unitTitle,
                    moduleNumber: job.moduleNumber,
                    moduleTitle: job.moduleTitle,
                });
            }
        }));
        return {
            success: true,
            totalJobs: jobs.length,
        };
    }
    async setBranding(courseKey, dto) {
        const { conversationKey, ...brandingData } = dto;
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const currentInput = course.input || {};
        await this.prisma.course.update({
            where: { id: course.id },
            data: {
                input: { ...currentInput, branding: brandingData },
            },
        });
        const userMessage = JSON.stringify({ branding: brandingData });
        await this.createMessage(conversationKey, 'user', userMessage);
        await this.prisma.courseStep.create({
            data: {
                courseId: course.id,
                type: 'generating_index',
                status: 'pending',
            },
        });
        await this.courseQueue.add('generate_index', {
            courseId: course.id,
            courseKey,
        });
        return {
            success: true,
            nextScreen: 'generatingIndex',
        };
    }
    async findAllByUserId(userId, pagination) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;
        const [courses, total] = await Promise.all([
            this.prisma.course.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
                select: {
                    id: true,
                    key: true,
                    title: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                },
            }),
            this.prisma.course.count({ where: { userId } }),
        ]);
        return { data: courses, total, page, limit };
    }
    async getCourseComponents(courseKey) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const components = await this.prisma.courseComponent.findMany({
            where: { courseId: course.id },
            include: {
                component: {
                    select: {
                        id: true,
                        internalName: true,
                        name: true,
                        type: true,
                        groupKey: true,
                    },
                },
            },
            orderBy: [{ module: 'asc' }, { unit: 'asc' }, { sequence: 'asc' }],
        });
        const groupKeys = [
            ...new Set(components
                .map((c) => c.component.groupKey)
                .filter((gk) => !!gk)),
        ];
        let groupVariants = [];
        if (groupKeys.length > 0) {
            const siblings = await this.prisma.component.findMany({
                where: { groupKey: { in: groupKeys } },
                select: {
                    id: true,
                    internalName: true,
                    name: true,
                    groupKey: true,
                },
            });
            groupVariants = siblings.map((s) => ({
                componentId: s.id,
                componentName: s.internalName,
                name: s.name,
                groupKey: s.groupKey,
            }));
        }
        return {
            courseId: course.id,
            components: components.map((c) => ({
                id: c.id,
                module: c.module,
                unit: c.unit,
                sequence: c.sequence,
                componentId: c.component.id,
                componentName: c.component.internalName,
                componentType: c.component.type,
                groupKey: c.component.groupKey,
                data: c.data,
                name: c.component.name,
            })),
            groupVariants,
        };
    }
    async updateComponentData(id, data) {
        const component = await this.prisma.courseComponent.findUnique({
            where: { id },
        });
        if (!component) {
            throw new common_1.NotFoundException(`CourseComponent with id ${id} not found`);
        }
        return this.prisma.courseComponent.update({
            where: { id },
            data: { data: data },
        });
    }
    async deleteComponent(id) {
        const component = await this.prisma.courseComponent.findUnique({
            where: { id },
        });
        if (!component) {
            throw new common_1.NotFoundException(`CourseComponent with id ${id} not found`);
        }
        const { courseId, module: mod, unit } = component;
        await this.prisma.courseComponent.delete({ where: { id } });
        const siblings = await this.prisma.courseComponent.findMany({
            where: { courseId, module: mod, unit },
            orderBy: { sequence: 'asc' },
        });
        if (siblings.length > 0) {
            await this.prisma.$transaction(siblings.map((sibling, index) => this.prisma.courseComponent.update({
                where: { id: sibling.id },
                data: { sequence: index + 1 },
            })));
        }
        return { success: true };
    }
    async duplicateComponent(id) {
        const component = await this.prisma.courseComponent.findUnique({
            where: { id },
        });
        if (!component) {
            throw new common_1.NotFoundException(`CourseComponent with id ${id} not found`);
        }
        const { courseId, module: mod, unit, sequence, componentId, data, userId } = component;
        const subsequentSiblings = await this.prisma.courseComponent.findMany({
            where: {
                courseId,
                module: mod,
                unit,
                sequence: { gt: sequence },
            },
            orderBy: { sequence: 'asc' },
        });
        if (subsequentSiblings.length > 0) {
            await this.prisma.$transaction(subsequentSiblings
                .slice()
                .reverse()
                .map((sibling) => this.prisma.courseComponent.update({
                where: { id: sibling.id },
                data: { sequence: sibling.sequence + 1 },
            })));
        }
        const duplicate = await this.prisma.courseComponent.create({
            data: {
                courseId,
                module: mod,
                unit,
                sequence: sequence + 1,
                componentId,
                data: data ?? undefined,
                userId,
            },
        });
        return duplicate;
    }
    async createComponent(courseKey, dto, userId) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        const component = await this.prisma.component.findFirst({
            where: { internalName: dto.componentName },
        });
        if (!component) {
            throw new common_1.NotFoundException(`Component with name ${dto.componentName} not found`);
        }
        const subsequentSiblings = await this.prisma.courseComponent.findMany({
            where: {
                courseId: course.id,
                module: dto.module,
                unit: dto.unit,
                sequence: { gt: dto.afterSequence },
            },
            orderBy: { sequence: 'asc' },
        });
        if (subsequentSiblings.length > 0) {
            await this.prisma.$transaction(subsequentSiblings
                .slice()
                .reverse()
                .map((sibling) => this.prisma.courseComponent.update({
                where: { id: sibling.id },
                data: { sequence: sibling.sequence + 1 },
            })));
        }
        const created = await this.prisma.courseComponent.create({
            data: {
                courseId: course.id,
                module: dto.module,
                unit: dto.unit,
                sequence: dto.afterSequence + 1,
                componentId: component.id,
                data: {},
                userId,
            },
        });
        return {
            id: created.id,
            module: created.module,
            unit: created.unit,
            sequence: created.sequence,
            componentId: component.id,
            componentName: component.internalName,
            componentType: component.type,
            groupKey: component.groupKey,
            data: created.data,
            name: component.name,
        };
    }
    async reorderComponents(courseKey, items) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with key ${courseKey} not found`);
        }
        await this.prisma.$transaction(items.map((item) => this.prisma.courseComponent.update({
            where: { id: item.id },
            data: { sequence: item.sequence },
        })));
        return { success: true };
    }
    async switchComponentStyle(id, newComponentId) {
        const courseComponent = await this.prisma.courseComponent.findUnique({
            where: { id },
            include: {
                component: {
                    select: { id: true, groupKey: true },
                },
            },
        });
        if (!courseComponent) {
            throw new common_1.NotFoundException(`CourseComponent with id ${id} not found`);
        }
        const newComponent = await this.prisma.component.findUnique({
            where: { id: newComponentId },
            select: { id: true, groupKey: true },
        });
        if (!newComponent) {
            throw new common_1.NotFoundException(`Component with id ${newComponentId} not found`);
        }
        if (courseComponent.component.groupKey !== newComponent.groupKey) {
            throw new common_1.BadRequestException(`Cannot switch style: components belong to different groups (current: "${courseComponent.component.groupKey}", target: "${newComponent.groupKey}")`);
        }
        if (!courseComponent.component.groupKey) {
            throw new common_1.BadRequestException('Cannot switch style: current component does not belong to any style group');
        }
        return this.prisma.courseComponent.update({
            where: { id },
            data: { componentId: newComponentId },
        });
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)(constants_1.COURSE_ORCHESTRATION_QUEUE)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bullmq_2.Queue,
        course_sse_service_1.CourseSSEService])
], CourseService);
//# sourceMappingURL=course.service.js.map