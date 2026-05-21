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
exports.BadgeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
const client_1 = require("@prisma/client");
let BadgeService = class BadgeService {
    prisma;
    notificationService;
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async getMyBadges(userId) {
        return this.prisma.userBadge.findMany({
            where: { userId },
            include: { badge: true },
            orderBy: { earnedAt: 'desc' },
        });
    }
    async getAllBadges(userId, pagination) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;
        const userOrgs = await this.prisma.userOrganization.findMany({
            where: { userId },
            select: { orgId: true },
        });
        const orgIds = userOrgs.map((uo) => uo.orgId);
        const where = { orgId: { in: orgIds } };
        const [data, total] = await Promise.all([
            this.prisma.badge.findMany({
                where,
                include: {
                    org: { select: { name: true, key: true } },
                    _count: { select: { userBadges: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.badge.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async getBadgeDetail(id) {
        const badge = await this.prisma.badge.findUnique({
            where: { id },
            include: {
                org: { select: { name: true, key: true } },
                _count: { select: { userBadges: true } },
                userBadges: {
                    include: {
                        user: {
                            select: { id: true, name: true, email: true, image: true },
                        },
                    },
                    orderBy: { earnedAt: 'desc' },
                },
            },
        });
        if (!badge)
            throw new common_1.NotFoundException('Badge not found');
        return badge;
    }
    async getOrgBadges(orgKey) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        return this.prisma.badge.findMany({
            where: { orgId: org.id },
            include: { _count: { select: { userBadges: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createBadge(dto) {
        const org = await this.prisma.organization.findUnique({
            where: { id: dto.orgId },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        return this.prisma.badge.create({
            data: {
                name: dto.name,
                description: dto.description,
                image: dto.image,
                type: dto.type,
                conditionType: dto.conditionType,
                conditionValue: dto.conditionValue ?? undefined,
                targetId: dto.targetId,
                isPublic: dto.isPublic ?? false,
                orgId: dto.orgId,
            },
        });
    }
    async updateBadge(id, dto) {
        const badge = await this.prisma.badge.findUnique({ where: { id } });
        if (!badge)
            throw new common_1.NotFoundException('Badge not found');
        return this.prisma.badge.update({
            where: { id },
            data: {
                ...dto,
                conditionValue: dto.conditionValue ?? undefined,
            },
        });
    }
    async deleteBadge(id) {
        const badge = await this.prisma.badge.findUnique({ where: { id } });
        if (!badge)
            throw new common_1.NotFoundException('Badge not found');
        return this.prisma.badge.delete({ where: { id } });
    }
    async duplicateBadge(id) {
        const badge = await this.prisma.badge.findUnique({ where: { id } });
        if (!badge)
            throw new common_1.NotFoundException('Badge not found');
        return this.prisma.badge.create({
            data: {
                name: `${badge.name} (copy)`,
                description: badge.description,
                image: badge.image,
                type: badge.type,
                conditionType: badge.conditionType,
                conditionValue: badge.conditionValue ?? undefined,
                targetId: badge.targetId,
                isPublic: badge.isPublic,
                orgId: badge.orgId,
            },
        });
    }
    async awardBadge(badgeId, userId) {
        const badge = await this.prisma.badge.findUnique({ where: { id: badgeId } });
        if (!badge)
            throw new common_1.NotFoundException('Badge not found');
        const existing = await this.prisma.userBadge.findUnique({
            where: { userId_badgeId: { userId, badgeId } },
        });
        if (existing)
            throw new common_1.ConflictException('User already has this badge');
        const userBadge = await this.prisma.userBadge.create({
            data: { userId, badgeId },
        });
        await this.notificationService.create(userId, client_1.NotificationType.badge_earned, { badgeName: badge.name, badgeImage: badge.image });
        return userBadge;
    }
    async evaluateAndGrantBadges(userId, event) {
        const conditionTypeMap = {
            course_completed: 'course_completed',
            score_above: 'score_above',
            completed_in_time: 'completed_in_time',
            first_in_org: 'first_in_org',
            plan_completed: 'plan_completed',
        };
        const conditionType = conditionTypeMap[event.type];
        if (!conditionType)
            return;
        const whereClause = { conditionType, isActive: true };
        if (event.orgId) {
            whereClause.orgId = event.orgId;
        }
        const badges = await this.prisma.badge.findMany({ where: whereClause });
        for (const badge of badges) {
            const alreadyEarned = await this.prisma.userBadge.findUnique({
                where: { userId_badgeId: { userId, badgeId: badge.id } },
            });
            if (alreadyEarned)
                continue;
            const conditionMet = await this.evaluateCondition(badge, userId, event);
            if (!conditionMet)
                continue;
            await this.prisma.userBadge.create({
                data: { userId, badgeId: badge.id },
            });
            await this.notificationService.create(userId, client_1.NotificationType.badge_earned, { badgeName: badge.name, badgeImage: badge.image });
        }
    }
    async evaluateCondition(badge, userId, event) {
        switch (badge.conditionType) {
            case 'course_completed':
                return badge.targetId != null && badge.targetId === event.courseId;
            case 'score_above': {
                const threshold = badge.conditionValue?.threshold ?? 80;
                return event.score != null && event.score > threshold;
            }
            case 'completed_in_time': {
                if (!event.learningPlanId)
                    return false;
                const userPlan = await this.prisma.userLearningPlan.findFirst({
                    where: { userId, learningPlanId: event.learningPlanId, completedAt: { not: null } },
                    include: { learningPlan: true },
                });
                if (!userPlan || !userPlan.completedAt || !userPlan.learningPlan.estimatedDays) {
                    return false;
                }
                const deadlineMs = userPlan.enrolledAt.getTime() +
                    userPlan.learningPlan.estimatedDays * 24 * 60 * 60 * 1000;
                return userPlan.completedAt.getTime() <= deadlineMs;
            }
            case 'first_in_org': {
                if (!badge.orgId)
                    return false;
                const existingCount = await this.prisma.userBadge.count({
                    where: { badgeId: badge.id },
                });
                return existingCount === 0;
            }
            case 'plan_completed':
                return badge.targetId != null && badge.targetId === event.learningPlanId;
            default:
                return false;
        }
    }
};
exports.BadgeService = BadgeService;
exports.BadgeService = BadgeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], BadgeService);
//# sourceMappingURL=badge.service.js.map