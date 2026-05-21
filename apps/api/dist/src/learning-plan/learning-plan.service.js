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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningPlanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
const client_1 = require("@prisma/client");
let LearningPlanService = class LearningPlanService {
    prisma;
    notificationService;
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async getMyPlans(userId, pagination) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;
        const userOrgs = await this.prisma.userOrganization.findMany({
            where: { userId },
            select: { orgId: true },
        });
        const orgIds = userOrgs.map((uo) => uo.orgId);
        const where = { orgId: { in: orgIds } };
        const [data, total] = await Promise.all([
            this.prisma.learningPlan.findMany({
                where,
                include: {
                    org: { select: { name: true, key: true } },
                    _count: {
                        select: {
                            courses: true,
                            enrollments: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.learningPlan.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async getOrgPlans(orgKey) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        return this.prisma.learningPlan.findMany({
            where: { orgId: org.id },
            include: {
                _count: {
                    select: {
                        courses: true,
                        enrollments: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPlanDetail(planId) {
        const plan = await this.prisma.learningPlan.findUnique({
            where: { id: planId },
            include: {
                org: { select: { name: true, key: true } },
                courses: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                key: true,
                                title: true,
                                status: true,
                            },
                        },
                    },
                    orderBy: { order: 'asc' },
                },
                children: true,
                _count: {
                    select: { enrollments: true },
                },
                enrollments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });
        if (!plan)
            throw new common_1.NotFoundException('Learning plan not found');
        return plan;
    }
    async createPlan(orgKey, dto) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        return this.prisma.learningPlan.create({
            data: {
                orgId: org.id,
                name: dto.name,
                description: dto.description,
                image: dto.image,
                badgeImage: dto.badgeImage,
                badgeName: dto.badgeName,
                estimatedDays: dto.estimatedDays,
                isCorrelative: dto.isCorrelative ?? false,
                isOptional: dto.isOptional ?? false,
                parentId: dto.parentId,
            },
        });
    }
    async updatePlan(planId, dto) {
        const plan = await this.prisma.learningPlan.findUnique({
            where: { id: planId },
        });
        if (!plan)
            throw new common_1.NotFoundException('Learning plan not found');
        return this.prisma.learningPlan.update({
            where: { id: planId },
            data: dto,
        });
    }
    async deletePlan(planId) {
        const plan = await this.prisma.learningPlan.findUnique({
            where: { id: planId },
        });
        if (!plan)
            throw new common_1.NotFoundException('Learning plan not found');
        return this.prisma.learningPlan.delete({
            where: { id: planId },
        });
    }
    async addCourse(planId, dto) {
        return this.prisma.learningPlanCourse.create({
            data: {
                learningPlanId: planId,
                courseId: dto.courseId,
                order: dto.order ?? 0,
                required: dto.required ?? true,
            },
        });
    }
    async removeCourse(planId, courseId) {
        return this.prisma.learningPlanCourse.delete({
            where: {
                learningPlanId_courseId: {
                    learningPlanId: planId,
                    courseId,
                },
            },
        });
    }
    async reorderCourses(planId, dto) {
        const updates = dto.courses.map((item) => this.prisma.learningPlanCourse.update({
            where: {
                learningPlanId_courseId: {
                    learningPlanId: planId,
                    courseId: item.courseId,
                },
            },
            data: { order: item.order },
        }));
        return this.prisma.$transaction(updates);
    }
    async assignToUser(planId, dto) {
        const plan = await this.prisma.learningPlan.findUnique({
            where: { id: planId },
        });
        if (!plan)
            throw new common_1.NotFoundException('Learning plan not found');
        const enrollment = await this.prisma.userLearningPlan.create({
            data: {
                userId: dto.userId,
                learningPlanId: planId,
                deadline: dto.deadline ? new Date(dto.deadline) : undefined,
            },
        });
        await this.notificationService.create(dto.userId, client_1.NotificationType.learning_plan_assigned, { planName: plan.name, planId: plan.id });
        return enrollment;
    }
    async assignToGroup(planId, dto) {
        const plan = await this.prisma.learningPlan.findUnique({
            where: { id: planId },
        });
        if (!plan)
            throw new common_1.NotFoundException('Learning plan not found');
        const members = await this.prisma.userGroup.findMany({
            where: { groupId: dto.groupId },
        });
        const results = [];
        for (const member of members) {
            const existing = await this.prisma.userLearningPlan.findUnique({
                where: {
                    userId_learningPlanId: {
                        userId: member.userId,
                        learningPlanId: planId,
                    },
                },
            });
            if (!existing) {
                const enrollment = await this.prisma.userLearningPlan.create({
                    data: {
                        userId: member.userId,
                        learningPlanId: planId,
                        deadline: dto.deadline ? new Date(dto.deadline) : undefined,
                    },
                });
                await this.notificationService.create(member.userId, client_1.NotificationType.learning_plan_assigned, { planName: plan.name, planId: plan.id });
                results.push(enrollment);
            }
        }
        return { assigned: results.length, total: members.length };
    }
    async getStudentPlanDetail(planId, userId) {
        const plan = await this.prisma.learningPlan.findUnique({
            where: { id: planId },
            include: {
                courses: {
                    include: {
                        course: {
                            select: {
                                id: true,
                                key: true,
                                title: true,
                                status: true,
                            },
                        },
                    },
                    orderBy: { order: 'asc' },
                },
            },
        });
        if (!plan)
            throw new common_1.NotFoundException('Learning plan not found');
        const enrollment = await this.prisma.userLearningPlan.findUnique({
            where: {
                userId_learningPlanId: {
                    userId,
                    learningPlanId: planId,
                },
            },
        });
        const courseIds = plan.courses.map((c) => c.courseId);
        const enrollments = await this.prisma.enrollment.findMany({
            where: {
                userId,
                courseId: { in: courseIds },
            },
            include: {
                _count: {
                    select: { unitProgress: true },
                },
            },
        });
        const enrollmentMap = new Map(enrollments.map((e) => [e.courseId, e]));
        const coursesWithProgress = plan.courses.map((pc, index) => {
            const courseEnrollment = enrollmentMap.get(pc.courseId);
            const isCompleted = !!courseEnrollment?.completedAt;
            let locked = false;
            if (plan.isCorrelative && index > 0) {
                const prevCourse = plan.courses[index - 1];
                if (prevCourse.required) {
                    const prevEnrollment = enrollmentMap.get(prevCourse.courseId);
                    locked = !prevEnrollment?.completedAt;
                }
            }
            return {
                courseId: pc.courseId,
                courseKey: pc.course.key,
                courseTitle: pc.course.title,
                courseStatus: pc.course.status,
                order: pc.order,
                required: pc.required,
                enrolled: !!courseEnrollment,
                startedAt: courseEnrollment?.startedAt ?? null,
                completedAt: courseEnrollment?.completedAt ?? null,
                passed: courseEnrollment?.passed ?? null,
                score: courseEnrollment?.score ?? null,
                isCompleted,
                locked,
            };
        });
        return {
            id: plan.id,
            key: plan.key,
            name: plan.name,
            description: plan.description,
            image: plan.image,
            badgeImage: plan.badgeImage,
            badgeName: plan.badgeName,
            estimatedDays: plan.estimatedDays,
            isCorrelative: plan.isCorrelative,
            isOptional: plan.isOptional,
            enrollment: enrollment
                ? {
                    enrolledAt: enrollment.enrolledAt,
                    deadline: enrollment.deadline,
                    completedAt: enrollment.completedAt,
                }
                : null,
            courses: coursesWithProgress,
        };
    }
    async bulkAssignPlan(planId, users, deadline, assignerId) {
        const plan = await this.prisma.learningPlan.findUnique({
            where: { id: planId },
        });
        if (!plan)
            throw new common_1.NotFoundException('Learning plan not found');
        const results = [];
        for (const { email } of users) {
            try {
                const user = await this.prisma.user.findUnique({
                    where: { email },
                });
                if (!user) {
                    results.push({ email, status: 'error: User not found' });
                    continue;
                }
                await this.assignToUser(planId, {
                    userId: user.id,
                    deadline,
                });
                results.push({ email, status: 'assigned' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error';
                results.push({ email, status: `error: ${message}` });
            }
        }
        return results;
    }
};
exports.LearningPlanService = LearningPlanService;
exports.LearningPlanService = LearningPlanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], LearningPlanService);
//# sourceMappingURL=learning-plan.service.js.map