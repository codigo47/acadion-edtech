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
exports.AdaptiveService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdaptiveService = class AdaptiveService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPreAssessment(courseKey, userId) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
            select: { id: true, key: true, title: true, output: true, isAdaptive: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (!course.isAdaptive)
            throw new common_1.BadRequestException('Course is not adaptive');
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
        });
        if (!enrollment)
            throw new common_1.ForbiddenException('Not enrolled in this course');
        const existing = await this.prisma.adaptiveAssessment.findFirst({
            where: { enrollmentId: enrollment.id, type: 'pre' },
        });
        if (existing) {
            return { alreadyCompleted: true, enrollmentId: enrollment.id };
        }
        const output = course.output;
        const units = output?.proposedIndex?.modules?.flatMap((m) => m.units.map((u) => ({ code: u.code, title: u.title, moduleTitle: m.title }))) ?? [];
        return {
            alreadyCompleted: false,
            enrollmentId: enrollment.id,
            courseTitle: course.title,
            units: units.map((u) => ({
                unitCode: u.code,
                unitTitle: u.title,
                moduleTitle: u.moduleTitle,
                question: `How confident are you with "${u.title}"?`,
            })),
        };
    }
    async submitPreAssessment(enrollmentId, userId, answers) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { id: enrollmentId },
            include: { course: { select: { id: true, isAdaptive: true, output: true } } },
        });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        if (enrollment.userId !== userId)
            throw new common_1.ForbiddenException('Not your enrollment');
        if (!enrollment.course.isAdaptive)
            throw new common_1.BadRequestException('Course is not adaptive');
        const existing = await this.prisma.adaptiveAssessment.findFirst({
            where: { enrollmentId, type: 'pre' },
        });
        if (existing)
            throw new common_1.BadRequestException('Pre-assessment already submitted');
        for (const a of answers) {
            if (a.confidenceScore < 1 || a.confidenceScore > 5) {
                throw new common_1.BadRequestException('Confidence score must be between 1 and 5');
            }
        }
        await this.prisma.adaptiveAssessment.createMany({
            data: answers.map((a) => ({
                enrollmentId,
                type: 'pre',
                unitCode: a.unitCode,
                confidenceScore: a.confidenceScore,
            })),
        });
        const path = this.computeAdaptivePath(answers);
        for (const p of path) {
            if (p.mode === 'skip') {
                await this.prisma.courseUnitProgress.upsert({
                    where: { enrollmentId_unitCode: { enrollmentId, unitCode: p.unitCode } },
                    create: {
                        enrollmentId,
                        unitCode: p.unitCode,
                        completedAt: new Date(),
                        timeSpentSeconds: 0,
                    },
                    update: {
                        completedAt: new Date(),
                    },
                });
            }
        }
        if (!enrollment.startedAt) {
            await this.prisma.enrollment.update({
                where: { id: enrollmentId },
                data: { startedAt: new Date() },
            });
        }
        return { path };
    }
    async getAdaptivePath(enrollmentId, userId) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { id: enrollmentId },
            include: { course: { select: { output: true, isAdaptive: true } } },
        });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        if (enrollment.userId !== userId)
            throw new common_1.ForbiddenException('Not your enrollment');
        const assessments = await this.prisma.adaptiveAssessment.findMany({
            where: { enrollmentId, type: 'pre' },
        });
        if (assessments.length === 0)
            return [];
        const output = enrollment.course.output;
        const units = output?.proposedIndex?.modules?.flatMap((m) => m.units.map((u) => ({ code: u.code, title: u.title }))) ?? [];
        return assessments.map((a) => {
            const unit = units.find((u) => u.code === a.unitCode);
            return {
                unitCode: a.unitCode,
                unitTitle: unit?.title ?? a.unitCode,
                confidenceScore: a.confidenceScore,
                mode: this.confidenceToMode(a.confidenceScore),
            };
        });
    }
    async getPostAssessment(courseKey, userId) {
        const course = await this.prisma.course.findFirst({
            where: { key: courseKey },
            select: { id: true, output: true, isAdaptive: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (!course.isAdaptive)
            throw new common_1.BadRequestException('Course is not adaptive');
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId: course.id } },
        });
        if (!enrollment)
            throw new common_1.ForbiddenException('Not enrolled');
        const preAssessments = await this.prisma.adaptiveAssessment.findMany({
            where: { enrollmentId: enrollment.id, type: 'pre' },
        });
        const postExisting = await this.prisma.adaptiveAssessment.findFirst({
            where: { enrollmentId: enrollment.id, type: 'post' },
        });
        const output = course.output;
        const units = output?.proposedIndex?.modules?.flatMap((m) => m.units.map((u) => ({ code: u.code, title: u.title, moduleTitle: m.title }))) ?? [];
        return {
            alreadyCompleted: !!postExisting,
            enrollmentId: enrollment.id,
            units: units.map((u) => {
                const pre = preAssessments.find((a) => a.unitCode === u.code);
                return {
                    unitCode: u.code,
                    unitTitle: u.title,
                    moduleTitle: u.moduleTitle,
                    preScore: pre?.confidenceScore ?? null,
                    question: `How confident are you now with "${u.title}"?`,
                };
            }),
        };
    }
    async submitPostAssessment(enrollmentId, userId, answers) {
        const enrollment = await this.prisma.enrollment.findUnique({
            where: { id: enrollmentId },
        });
        if (!enrollment)
            throw new common_1.NotFoundException('Enrollment not found');
        if (enrollment.userId !== userId)
            throw new common_1.ForbiddenException('Not your enrollment');
        for (const a of answers) {
            if (a.confidenceScore < 1 || a.confidenceScore > 5) {
                throw new common_1.BadRequestException('Confidence score must be between 1 and 5');
            }
        }
        await this.prisma.adaptiveAssessment.createMany({
            data: answers.map((a) => ({
                enrollmentId,
                type: 'post',
                unitCode: a.unitCode,
                confidenceScore: a.confidenceScore,
            })),
        });
        const preAssessments = await this.prisma.adaptiveAssessment.findMany({
            where: { enrollmentId, type: 'pre' },
        });
        const comparison = answers.map((post) => {
            const pre = preAssessments.find((a) => a.unitCode === post.unitCode);
            const preScore = pre?.confidenceScore ?? 0;
            const improvement = post.confidenceScore - preScore;
            return {
                unitCode: post.unitCode,
                preScore,
                postScore: post.confidenceScore,
                improvement,
            };
        });
        const avgPreScore = comparison.reduce((s, c) => s + c.preScore, 0) / (comparison.length || 1);
        const avgPostScore = comparison.reduce((s, c) => s + c.postScore, 0) / (comparison.length || 1);
        const overallImprovement = Math.round(((avgPostScore - avgPreScore) / (5 - avgPreScore || 1)) * 100);
        return {
            comparison,
            avgPreScore: Math.round(avgPreScore * 10) / 10,
            avgPostScore: Math.round(avgPostScore * 10) / 10,
            overallImprovement,
        };
    }
    computeAdaptivePath(answers) {
        return answers.map((a) => ({
            unitCode: a.unitCode,
            unitTitle: '',
            confidenceScore: a.confidenceScore,
            mode: this.confidenceToMode(a.confidenceScore),
        }));
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
exports.AdaptiveService = AdaptiveService;
exports.AdaptiveService = AdaptiveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdaptiveService);
//# sourceMappingURL=adaptive.service.js.map