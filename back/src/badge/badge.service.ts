import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '@prisma/client';
import { CreateBadgeDto, UpdateBadgeDto } from './dto/badge.dto';

interface BadgeEvent {
  type: string;
  courseId?: number;
  score?: number;
  learningPlanId?: number;
  orgId?: number;
}

@Injectable()
export class BadgeService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) {}

  async getMyBadges(userId: string) {
    return this.prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    });
  }

  async getOrgBadges(orgKey: string) {
    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');

    return this.prisma.badge.findMany({
      where: { orgId: org.id },
      include: { _count: { select: { userBadges: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createBadge(dto: CreateBadgeDto) {
    const org = await this.prisma.organization.findUnique({
      where: { id: dto.orgId },
    });
    if (!org) throw new NotFoundException('Organization not found');

    return this.prisma.badge.create({
      data: {
        name: dto.name,
        description: dto.description,
        image: dto.image,
        type: dto.type,
        conditionType: dto.conditionType,
        conditionValue: dto.conditionValue ?? undefined,
        targetId: dto.targetId,
        orgId: dto.orgId,
      },
    });
  }

  async updateBadge(id: number, dto: UpdateBadgeDto) {
    return this.prisma.badge.update({
      where: { id },
      data: {
        ...dto,
        conditionValue: dto.conditionValue ?? undefined,
      },
    });
  }

  async deleteBadge(id: number) {
    return this.prisma.badge.delete({ where: { id } });
  }

  async evaluateAndGrantBadges(userId: string, event: BadgeEvent) {
    const conditionTypeMap: Record<string, string> = {
      course_completed: 'course_completed',
      score_above: 'score_above',
      completed_in_time: 'completed_in_time',
      first_in_org: 'first_in_org',
      plan_completed: 'plan_completed',
    };

    const conditionType = conditionTypeMap[event.type];
    if (!conditionType) return;

    const whereClause: any = { conditionType };
    if (event.orgId) {
      whereClause.orgId = event.orgId;
    }

    const badges = await this.prisma.badge.findMany({ where: whereClause });

    for (const badge of badges) {
      const alreadyEarned = await this.prisma.userBadge.findUnique({
        where: { userId_badgeId: { userId, badgeId: badge.id } },
      });
      if (alreadyEarned) continue;

      const conditionMet = await this.evaluateCondition(
        badge,
        userId,
        event,
      );
      if (!conditionMet) continue;

      await this.prisma.userBadge.create({
        data: { userId, badgeId: badge.id },
      });

      await this.notificationService.create(
        userId,
        NotificationType.badge_earned,
        { badgeName: badge.name, badgeImage: badge.image },
      );
    }
  }

  private async evaluateCondition(
    badge: any,
    userId: string,
    event: BadgeEvent,
  ): Promise<boolean> {
    switch (badge.conditionType) {
      case 'course_completed':
        return badge.targetId != null && badge.targetId === event.courseId;

      case 'score_above': {
        const threshold =
          (badge.conditionValue as any)?.threshold ?? 80;
        return event.score != null && event.score > threshold;
      }

      case 'completed_in_time': {
        if (!event.learningPlanId) return false;
        const userPlan = await this.prisma.userLearningPlan.findFirst({
          where: { userId, learningPlanId: event.learningPlanId, completedAt: { not: null } },
          include: { learningPlan: true },
        });
        if (!userPlan || !userPlan.completedAt || !userPlan.learningPlan.estimatedDays) {
          return false;
        }
        const deadlineMs =
          userPlan.enrolledAt.getTime() +
          userPlan.learningPlan.estimatedDays * 24 * 60 * 60 * 1000;
        return userPlan.completedAt.getTime() <= deadlineMs;
      }

      case 'first_in_org': {
        if (!badge.orgId) return false;
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
}
