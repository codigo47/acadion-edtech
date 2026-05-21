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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCourseAnalytics(courseKey) {
        const course = await this.prisma.course.findFirstOrThrow({
            where: { key: courseKey },
            include: {
                enrollments: {
                    include: {
                        unitProgress: true,
                    },
                },
            },
        });
        const enrollments = course.enrollments;
        const totalEnrollments = enrollments.length;
        const activeStudents = enrollments.filter((e) => e.startedAt && !e.completedAt).length;
        const completedEnrollments = enrollments.filter((e) => e.completedAt);
        const completedStudents = completedEnrollments.length;
        const scoresWithValue = completedEnrollments
            .map((e) => e.score)
            .filter((s) => s !== null);
        const averageScore = scoresWithValue.length > 0
            ? scoresWithValue.reduce((a, b) => a + b, 0) / scoresWithValue.length
            : 0;
        const passedCount = completedEnrollments.filter((e) => e.passed).length;
        const passRate = completedStudents > 0 ? (passedCount / completedStudents) * 100 : 0;
        const allUnitProgress = enrollments.flatMap((e) => e.unitProgress);
        const totalTimeSeconds = allUnitProgress.reduce((sum, up) => sum + up.timeSpentSeconds, 0);
        const averageTimeSpent = completedStudents > 0 ? totalTimeSeconds / completedStudents : 0;
        const averageFocusLoss = allUnitProgress.length > 0
            ? allUnitProgress.reduce((sum, up) => sum + up.focusLossCount, 0) /
                allUnitProgress.length
            : 0;
        const output = course.output;
        const proposedIndex = output?.proposedIndex || [];
        const units = [];
        for (const mod of proposedIndex) {
            if (mod.units) {
                for (const unit of mod.units) {
                    if (unit.code) {
                        units.push({ code: unit.code, title: unit.title || unit.code });
                    }
                }
            }
        }
        const unitBreakdown = units.map((unit) => {
            const unitProgressItems = allUnitProgress.filter((up) => up.unitCode === unit.code);
            const completedCount = unitProgressItems.filter((up) => up.completedAt).length;
            const completionRate = totalEnrollments > 0 ? (completedCount / totalEnrollments) * 100 : 0;
            const avgTime = unitProgressItems.length > 0
                ? unitProgressItems.reduce((sum, up) => sum + up.timeSpentSeconds, 0) / unitProgressItems.length
                : 0;
            const avgFocusLoss = unitProgressItems.length > 0
                ? unitProgressItems.reduce((sum, up) => sum + up.focusLossCount, 0) / unitProgressItems.length
                : 0;
            return {
                unitCode: unit.code,
                title: unit.title,
                completionRate: Math.round(completionRate * 10) / 10,
                averageTime: Math.round(avgTime),
                averageFocusLoss: Math.round(avgFocusLoss * 10) / 10,
            };
        });
        const now = new Date();
        const twelveWeeksAgo = new Date(now);
        twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);
        const completionOverTime = [];
        for (let i = 11; i >= 0; i--) {
            const weekStart = new Date(now);
            weekStart.setDate(weekStart.getDate() - i * 7);
            weekStart.setHours(0, 0, 0, 0);
            const day = weekStart.getDay();
            const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
            weekStart.setDate(diff);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 7);
            const count = completedEnrollments.filter((e) => {
                const d = new Date(e.completedAt);
                return d >= weekStart && d < weekEnd;
            }).length;
            completionOverTime.push({
                week: weekStart.toISOString().slice(0, 10),
                count,
            });
        }
        return {
            courseTitle: course.title,
            totalEnrollments,
            activeStudents,
            completedStudents,
            averageScore: Math.round(averageScore * 10) / 10,
            passRate: Math.round(passRate * 10) / 10,
            averageTimeSpent: Math.round(averageTimeSpent),
            averageFocusLoss: Math.round(averageFocusLoss * 10) / 10,
            unitBreakdown,
            completionOverTime,
        };
    }
    async getCourseUserProgress(courseKey) {
        const course = await this.prisma.course.findFirstOrThrow({
            where: { key: courseKey },
        });
        const output = course.output;
        const proposedIndex = output?.proposedIndex || [];
        let totalUnits = 0;
        for (const mod of proposedIndex) {
            if (mod.units) {
                totalUnits += mod.units.length;
            }
        }
        const enrollments = await this.prisma.enrollment.findMany({
            where: { courseId: course.id },
            include: {
                user: { select: { id: true, name: true, email: true } },
                unitProgress: true,
            },
            orderBy: { enrolledAt: 'desc' },
        });
        const result = enrollments
            .map((e) => {
            const completedUnits = e.unitProgress.filter((up) => up.completedAt).length;
            const progress = totalUnits > 0
                ? Math.round((completedUnits / totalUnits) * 100 * 10) / 10
                : 0;
            return {
                user: e.user,
                enrolledAt: e.enrolledAt,
                startedAt: e.startedAt,
                completedAt: e.completedAt,
                progress,
                completedUnits,
                totalUnits,
                unitProgress: e.unitProgress,
                score: e.score,
                passed: e.passed,
            };
        })
            .sort((a, b) => b.progress - a.progress);
        return result;
    }
    async getOrgAnalytics(orgKey) {
        const org = await this.prisma.organization.findFirstOrThrow({
            where: { key: orgKey },
        });
        const courses = await this.prisma.course.findMany({
            where: { orgId: org.id },
            include: {
                enrollments: {
                    include: {
                        user: { select: { id: true, name: true, email: true } },
                    },
                },
            },
        });
        const totalCourses = courses.length;
        const uniqueStudentIds = new Set();
        let totalEnrollments = 0;
        let completedEnrollments = 0;
        for (const course of courses) {
            for (const enrollment of course.enrollments) {
                uniqueStudentIds.add(enrollment.userId);
                totalEnrollments++;
                if (enrollment.completedAt) {
                    completedEnrollments++;
                }
            }
        }
        const totalStudents = uniqueStudentIds.size;
        const averageCompletion = totalEnrollments > 0
            ? (completedEnrollments / totalEnrollments) * 100
            : 0;
        const topCourses = courses
            .map((c) => ({
            courseKey: c.key,
            title: c.title || 'Untitled',
            enrollmentCount: c.enrollments.length,
        }))
            .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
            .slice(0, 5);
        const allEnrollments = courses.flatMap((c) => c.enrollments.map((e) => ({
            ...e,
            courseTitle: c.title || 'Untitled',
            courseKey: c.key,
        })));
        const recentCompletions = allEnrollments
            .filter((e) => e.completedAt)
            .sort((a, b) => new Date(b.completedAt).getTime() -
            new Date(a.completedAt).getTime())
            .slice(0, 10)
            .map((e) => ({
            courseTitle: e.courseTitle,
            courseKey: e.courseKey,
            user: e.user,
            completedAt: e.completedAt,
            score: e.score,
            passed: e.passed,
        }));
        return {
            orgName: org.name,
            totalCourses,
            totalStudents,
            averageCompletion: Math.round(averageCompletion * 10) / 10,
            topCourses,
            recentCompletions,
        };
    }
    async getStudentAnalytics(userId) {
        const enrollments = await this.prisma.enrollment.findMany({
            where: { userId },
            include: {
                course: { select: { key: true, title: true } },
                unitProgress: { orderBy: { id: 'desc' } },
            },
        });
        const totalEnrolled = enrollments.length;
        const completedEnrollments = enrollments.filter((e) => e.completedAt);
        const totalCompleted = completedEnrollments.length;
        const scoresWithValue = completedEnrollments
            .map((e) => e.score)
            .filter((s) => s !== null);
        const averageScore = scoresWithValue.length > 0
            ? scoresWithValue.reduce((a, b) => a + b, 0) / scoresWithValue.length
            : 0;
        const allUnitProgress = enrollments.flatMap((e) => e.unitProgress);
        const totalTimeSpent = allUnitProgress.reduce((sum, up) => sum + up.timeSpentSeconds, 0);
        const courseBreakdown = enrollments.map((e) => {
            const completedUnits = e.unitProgress.filter((up) => up.completedAt).length;
            const totalUnits = e.unitProgress.length;
            const progress = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
            const timeSpent = e.unitProgress.reduce((sum, up) => sum + up.timeSpentSeconds, 0);
            return {
                courseKey: e.course.key,
                courseTitle: e.course.title || 'Untitled',
                progress,
                score: e.score,
                timeSpent,
                completedAt: e.completedAt,
                passed: e.passed,
            };
        });
        const recentActivity = allUnitProgress.slice(0, 10).map((up) => {
            const enrollment = enrollments.find((e) => e.unitProgress.some((p) => p.id === up.id));
            return {
                unitCode: up.unitCode,
                timeSpentSeconds: up.timeSpentSeconds,
                completedAt: up.completedAt,
                courseTitle: enrollment?.course.title || 'Untitled',
                courseKey: enrollment?.course.key,
            };
        });
        return {
            totalEnrolled,
            totalCompleted,
            averageScore: Math.round(averageScore * 10) / 10,
            totalTimeSpent,
            courseBreakdown,
            recentActivity,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map