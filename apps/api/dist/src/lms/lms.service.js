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
exports.LmsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const badge_service_1 = require("../badge/badge.service");
const notification_service_1 = require("../notification/notification.service");
let LmsService = class LmsService {
    prisma;
    badgeService;
    notificationService;
    constructor(prisma, badgeService, notificationService) {
        this.prisma = prisma;
        this.badgeService = badgeService;
        this.notificationService = notificationService;
    }
    async getStudentDashboard(userId) {
        const ownedWithoutEnrollment = await this.prisma.course.findMany({
            where: {
                userId,
                status: 'completed',
                enrollments: { none: { userId } },
            },
            select: { id: true },
        });
        if (ownedWithoutEnrollment.length > 0) {
            await this.prisma.enrollment.createMany({
                data: ownedWithoutEnrollment.map((c) => ({
                    userId,
                    courseId: c.id,
                })),
                skipDuplicates: true,
            });
        }
        const enrollments = await this.prisma.enrollment.findMany({
            where: { userId },
            include: {
                course: {
                    select: {
                        id: true,
                        key: true,
                        title: true,
                        status: true,
                        output: true,
                        isAdaptive: true,
                    },
                },
                unitProgress: true,
            },
            orderBy: { enrolledAt: 'desc' },
        });
        const enrolledCourses = enrollments.map((e) => {
            const output = e.course.output;
            const totalUnits = output?.proposedIndex?.modules?.reduce((acc, m) => acc + m.units.length, 0) ?? 0;
            const completedUnits = e.unitProgress.filter((u) => u.completedAt).length;
            const progress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
            let state = 'not_started';
            if (e.completedAt)
                state = 'completed';
            else if (e.startedAt)
                state = 'in_progress';
            return {
                enrollmentId: e.id,
                courseKey: e.course.key,
                courseTitle: e.course.title,
                enrolledAt: e.enrolledAt,
                startedAt: e.startedAt,
                completedAt: e.completedAt,
                passed: e.passed,
                score: e.score,
                attempts: e.attempts,
                state,
                progress,
                totalUnits,
                completedUnits,
                isAdaptive: e.course.isAdaptive,
            };
        });
        const order = { in_progress: 0, not_started: 1, completed: 2 };
        enrolledCourses.sort((a, b) => order[a.state] - order[b.state]);
        const userPlans = await this.prisma.userLearningPlan.findMany({
            where: { userId },
            include: {
                learningPlan: {
                    include: {
                        courses: true,
                    },
                },
            },
            orderBy: { enrolledAt: 'desc' },
        });
        const learningPlans = userPlans.map((up) => {
            const planCourseIds = up.learningPlan.courses.map((c) => c.courseId);
            const completedPlanCourses = enrolledCourses.filter((e) => planCourseIds.includes(e.enrollmentId) && e.state === 'completed').length;
            return {
                id: up.learningPlanId,
                key: up.learningPlan.key,
                name: up.learningPlan.name,
                description: up.learningPlan.description,
                image: up.learningPlan.image,
                estimatedDays: up.learningPlan.estimatedDays,
                isCorrelative: up.learningPlan.isCorrelative,
                enrolledAt: up.enrolledAt,
                deadline: up.deadline,
                completedAt: up.completedAt,
                totalCourses: planCourseIds.length,
                completedCourses: completedPlanCourses,
                badgeName: up.learningPlan.badgeName,
                badgeImage: up.learningPlan.badgeImage,
            };
        });
        return { enrolledCourses, learningPlans };
    }
    async getCourseContent(courseKey, userId) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
            select: {
                id: true,
                key: true,
                title: true,
                output: true,
                status: true,
                isAdaptive: true,
                userId: true,
            },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        let enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
            include: { unitProgress: true },
        });
        if (!enrollment && course.userId === userId) {
            const created = await this.prisma.enrollment.create({
                data: { userId, courseId: course.id },
            });
            enrollment = { ...created, unitProgress: [] };
        }
        if (!enrollment) {
            throw new common_1.ForbiddenException('You are not enrolled in this course');
        }
        const rawComponents = await this.prisma.courseComponent.findMany({
            where: { courseId: course.id },
            include: {
                component: {
                    select: { internalName: true },
                },
            },
            orderBy: [{ module: 'asc' }, { unit: 'asc' }, { sequence: 'asc' }],
        });
        const componentsByUnit = {};
        for (const c of rawComponents) {
            const unitCode = `${c.module}.${c.unit}`;
            if (!componentsByUnit[unitCode])
                componentsByUnit[unitCode] = [];
            componentsByUnit[unitCode].push({
                component: c.component.internalName,
                content: c.data,
            });
        }
        const output = course.output;
        let adaptivePath = null;
        if (course.isAdaptive) {
            const assessments = await this.prisma.adaptiveAssessment.findMany({
                where: { enrollmentId: enrollment.id, type: 'pre' },
            });
            if (assessments.length > 0) {
                adaptivePath = assessments.map((a) => ({
                    unitCode: a.unitCode,
                    mode: this.confidenceToMode(a.confidenceScore),
                }));
            }
        }
        const lockedUnits = this.computeLockedUnits(output?.proposedIndex ?? null, enrollment.unitProgress);
        return {
            courseKey: course.key,
            courseTitle: course.title,
            isAdaptive: course.isAdaptive,
            proposedIndex: output?.proposedIndex ?? null,
            componentsByUnit,
            enrollment: {
                id: enrollment.id,
                enrolledAt: enrollment.enrolledAt,
                startedAt: enrollment.startedAt,
                completedAt: enrollment.completedAt,
                passed: enrollment.passed,
                score: enrollment.score,
                attempts: enrollment.attempts,
            },
            unitProgress: enrollment.unitProgress,
            adaptivePath,
            lockedUnits,
        };
    }
    async updateProgress(courseKey, userId, dto) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
            select: { id: true, output: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
            include: { unitProgress: true },
        });
        if (!enrollment)
            throw new common_1.ForbiddenException('Not enrolled in this course');
        if (!enrollment.startedAt) {
            await this.prisma.enrollment.update({
                where: { id: enrollment.id },
                data: { startedAt: new Date() },
            });
        }
        const existingProgress = enrollment.unitProgress.find((p) => p.unitCode === dto.unitCode);
        if (existingProgress) {
            await this.prisma.courseUnitProgress.update({
                where: { id: existingProgress.id },
                data: {
                    timeSpentSeconds: existingProgress.timeSpentSeconds + dto.timeSpentSeconds,
                    completedAt: dto.completed && !existingProgress.completedAt
                        ? new Date()
                        : existingProgress.completedAt,
                    focusLossCount: dto.focusLossCount !== undefined
                        ? existingProgress.focusLossCount + dto.focusLossCount
                        : existingProgress.focusLossCount,
                },
            });
        }
        else {
            await this.prisma.courseUnitProgress.create({
                data: {
                    enrollmentId: enrollment.id,
                    unitCode: dto.unitCode,
                    timeSpentSeconds: dto.timeSpentSeconds,
                    completedAt: dto.completed ? new Date() : null,
                    focusLossCount: dto.focusLossCount ?? 0,
                },
            });
        }
        const output = course.output;
        const totalUnits = output?.proposedIndex?.modules?.reduce((acc, m) => acc + m.units.length, 0) ?? 0;
        const updatedProgress = await this.prisma.courseUnitProgress.findMany({
            where: { enrollmentId: enrollment.id },
        });
        const completedUnits = updatedProgress.filter((u) => u.completedAt).length;
        const progress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
        return { progress, completedUnits, totalUnits };
    }
    async completeCourse(courseKey, userId, dto) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
            select: { id: true, orgId: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
        });
        if (!enrollment)
            throw new common_1.ForbiddenException('Not enrolled in this course');
        const updated = await this.prisma.enrollment.update({
            where: { id: enrollment.id },
            data: {
                completedAt: new Date(),
                passed: dto.passed,
                score: dto.score,
                attempts: enrollment.attempts + 1,
            },
        });
        const notificationType = dto.passed ? 'course_completed' : 'course_failed';
        await this.notificationService.create(userId, notificationType, {
            message: dto.passed ? 'You passed the course!' : 'Course completed but not passed.',
            courseId: course.id,
            courseKey,
            score: dto.score,
        });
        await this.badgeService.evaluateAndGrantBadges(userId, {
            type: 'course_completed',
            courseId: course.id,
            score: dto.score,
            orgId: course.orgId ?? undefined,
        });
        if (dto.score != null) {
            await this.badgeService.evaluateAndGrantBadges(userId, {
                type: 'score_above',
                score: dto.score,
                orgId: course.orgId ?? undefined,
            });
        }
        if (course.orgId) {
            await this.badgeService.evaluateAndGrantBadges(userId, {
                type: 'first_in_org',
                orgId: course.orgId,
            });
        }
        await this.checkLearningPlanCompletion(userId, course.id);
        return updated;
    }
    async selfEnroll(courseKey, userId) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey, status: 'completed' },
            select: { id: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found or not available');
        const existing = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
        });
        if (existing)
            return existing;
        return this.prisma.enrollment.create({
            data: { userId, courseId: course.id },
        });
    }
    async adminEnroll(courseKey, dto) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
            select: { id: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const existing = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId: dto.userId, courseId: course.id } },
        });
        if (existing)
            return existing;
        const enrollment = await this.prisma.enrollment.create({
            data: { userId: dto.userId, courseId: course.id },
        });
        await this.notificationService.create(dto.userId, 'enrolled', {
            message: 'You have been enrolled in a new course.',
            courseKey,
        });
        return enrollment;
    }
    async adminReEnroll(courseKey, userId) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
            select: { id: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
        });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        const updated = await this.prisma.enrollment.update({
            where: { id: enrollment.id },
            data: {
                startedAt: null,
                completedAt: null,
                passed: null,
                score: null,
                attempts: enrollment.attempts,
            },
        });
        await this.prisma.courseUnitProgress.deleteMany({
            where: { enrollmentId: enrollment.id },
        });
        await this.prisma.adaptiveAssessment.deleteMany({
            where: { enrollmentId: enrollment.id },
        });
        await this.notificationService.create(userId, 'enrolled', {
            message: 'You have been re-enrolled in a course.',
            courseKey,
        });
        return updated;
    }
    async submitKnowledgeCheck(courseKey, userId, dto) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
            select: { id: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
        });
        if (!enrollment)
            throw new common_1.ForbiddenException('Not enrolled in this course');
        const existingAttempts = await this.prisma.knowledgeCheckAttempt.count({
            where: {
                enrollmentId: enrollment.id,
                unitCode: dto.unitCode,
                questionIndex: dto.questionIndex,
            },
        });
        const maxAttempts = 3;
        if (existingAttempts >= maxAttempts) {
            throw new common_1.BadRequestException('Maximum attempts reached for this question');
        }
        const attempt = await this.prisma.knowledgeCheckAttempt.create({
            data: {
                enrollmentId: enrollment.id,
                unitCode: dto.unitCode,
                questionIndex: dto.questionIndex,
                answer: dto.answer,
                isCorrect: dto.isCorrect,
                attemptNumber: existingAttempts + 1,
            },
        });
        return {
            attemptNumber: attempt.attemptNumber,
            isCorrect: attempt.isCorrect,
            remainingAttempts: maxAttempts - attempt.attemptNumber,
        };
    }
    computeLockedUnits(proposedIndex, unitProgress) {
        if (!proposedIndex)
            return [];
        const completedCodes = new Set(unitProgress.filter((p) => p.completedAt).map((p) => p.unitCode));
        const allUnits = proposedIndex.modules.flatMap((m) => m.units.map((u) => u.code));
        const locked = [];
        for (let i = 1; i < allUnits.length; i++) {
            const prevCode = allUnits[i - 1];
            if (!completedCodes.has(prevCode)) {
                for (let j = i; j < allUnits.length; j++) {
                    if (!completedCodes.has(allUnits[j])) {
                        locked.push(allUnits[j]);
                    }
                }
                break;
            }
        }
        return locked;
    }
    async checkLearningPlanCompletion(userId, courseId) {
        const userPlans = await this.prisma.userLearningPlan.findMany({
            where: { userId, completedAt: null },
            include: {
                learningPlan: {
                    include: { courses: true },
                },
            },
        });
        for (const userPlan of userPlans) {
            const planCourseIds = userPlan.learningPlan.courses
                .filter((c) => c.required)
                .map((c) => c.courseId);
            if (!planCourseIds.includes(courseId))
                continue;
            const completedEnrollments = await this.prisma.enrollment.count({
                where: {
                    userId,
                    courseId: { in: planCourseIds },
                    completedAt: { not: null },
                },
            });
            if (completedEnrollments >= planCourseIds.length) {
                await this.prisma.userLearningPlan.update({
                    where: { id: userPlan.id },
                    data: { completedAt: new Date() },
                });
                await this.badgeService.evaluateAndGrantBadges(userId, {
                    type: 'plan_completed',
                    learningPlanId: userPlan.learningPlanId,
                });
                await this.badgeService.evaluateAndGrantBadges(userId, {
                    type: 'completed_in_time',
                    learningPlanId: userPlan.learningPlanId,
                });
            }
        }
    }
    confidenceToMode(score) {
        switch (score) {
            case 5: return 'skip';
            case 4: return 'check_only';
            case 3: return 'full';
            case 2: return 'extended';
            case 1: return 'deep';
            default: return 'full';
        }
    }
};
exports.LmsService = LmsService;
exports.LmsService = LmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        badge_service_1.BadgeService,
        notification_service_1.NotificationService])
], LmsService);
//# sourceMappingURL=lms.service.js.map