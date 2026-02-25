import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

const mockPrisma = {
  userBadge: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn(), count: jest.fn() },
  badge: { findMany: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
  organization: { findFirst: jest.fn(), findUnique: jest.fn() },
  userLearningPlan: { findFirst: jest.fn() },
};

const mockNotification = {
  create: jest.fn(),
};

describe('BadgeService', () => {
  let service: BadgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BadgeService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: NotificationService, useValue: mockNotification },
      ],
    }).compile();
    service = module.get<BadgeService>(BadgeService);
    jest.clearAllMocks();
  });

  describe('getMyBadges', () => {
    it('returns user badges ordered by earnedAt desc', async () => {
      const badges = [{ id: 1, badge: { name: 'Badge 1' } }];
      mockPrisma.userBadge.findMany.mockResolvedValue(badges);
      const result = await service.getMyBadges('uid');
      expect(result).toEqual(badges);
    });
  });

  describe('getOrgBadges', () => {
    it('returns org badges', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.badge.findMany.mockResolvedValue([{ id: 1, name: 'B1' }]);
      const result = await service.getOrgBadges('org-key');
      expect(result).toHaveLength(1);
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);
      await expect(service.getOrgBadges('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createBadge', () => {
    it('creates a badge', async () => {
      mockPrisma.organization.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.badge.create.mockResolvedValue({ id: 1, name: 'New Badge' });
      const result = await service.createBadge({
        name: 'New Badge', description: 'desc', type: 'progress' as any,
        conditionType: 'course_completed', orgId: 1,
      });
      expect(result.name).toBe('New Badge');
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findUnique.mockResolvedValue(null);
      await expect(
        service.createBadge({ name: 'B', description: 'd', type: 'progress' as any, conditionType: 'x', orgId: 999 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateBadge', () => {
    it('updates a badge', async () => {
      mockPrisma.badge.update.mockResolvedValue({ id: 1, name: 'Updated' });
      const result = await service.updateBadge(1, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });
  });

  describe('deleteBadge', () => {
    it('deletes a badge', async () => {
      mockPrisma.badge.delete.mockResolvedValue({ id: 1 });
      const result = await service.deleteBadge(1);
      expect(result.id).toBe(1);
    });
  });

  describe('evaluateAndGrantBadges', () => {
    it('grants badge when condition is met and not already earned', async () => {
      mockPrisma.badge.findMany.mockResolvedValue([
        { id: 1, conditionType: 'course_completed', targetId: 5, orgId: null },
      ]);
      mockPrisma.userBadge.findUnique.mockResolvedValue(null);
      mockPrisma.userBadge.create.mockResolvedValue({ id: 1 });

      await service.evaluateAndGrantBadges('uid', { type: 'course_completed', courseId: 5 });

      expect(mockPrisma.userBadge.create).toHaveBeenCalled();
      expect(mockNotification.create).toHaveBeenCalled();
    });

    it('skips badge when already earned', async () => {
      mockPrisma.badge.findMany.mockResolvedValue([
        { id: 1, conditionType: 'course_completed', targetId: 5 },
      ]);
      mockPrisma.userBadge.findUnique.mockResolvedValue({ id: 1 });

      await service.evaluateAndGrantBadges('uid', { type: 'course_completed', courseId: 5 });

      expect(mockPrisma.userBadge.create).not.toHaveBeenCalled();
    });

    it('skips unknown event types', async () => {
      await service.evaluateAndGrantBadges('uid', { type: 'unknown_event' });
      expect(mockPrisma.badge.findMany).not.toHaveBeenCalled();
    });

    it('evaluates score_above condition', async () => {
      mockPrisma.badge.findMany.mockResolvedValue([
        { id: 2, conditionType: 'score_above', conditionValue: { threshold: 80 } },
      ]);
      mockPrisma.userBadge.findUnique.mockResolvedValue(null);
      mockPrisma.userBadge.create.mockResolvedValue({ id: 2 });

      await service.evaluateAndGrantBadges('uid', { type: 'score_above', score: 90 });
      expect(mockPrisma.userBadge.create).toHaveBeenCalled();
    });

    it('does not grant score_above when score is below threshold', async () => {
      mockPrisma.badge.findMany.mockResolvedValue([
        { id: 2, conditionType: 'score_above', conditionValue: { threshold: 80 } },
      ]);
      mockPrisma.userBadge.findUnique.mockResolvedValue(null);

      await service.evaluateAndGrantBadges('uid', { type: 'score_above', score: 70 });
      expect(mockPrisma.userBadge.create).not.toHaveBeenCalled();
    });

    it('evaluates first_in_org condition', async () => {
      mockPrisma.badge.findMany.mockResolvedValue([
        { id: 3, conditionType: 'first_in_org', orgId: 1 },
      ]);
      mockPrisma.userBadge.findUnique.mockResolvedValue(null);
      mockPrisma.userBadge.count.mockResolvedValue(0);
      mockPrisma.userBadge.create.mockResolvedValue({ id: 3 });

      await service.evaluateAndGrantBadges('uid', { type: 'first_in_org', orgId: 1 });
      expect(mockPrisma.userBadge.create).toHaveBeenCalled();
    });

    it('evaluates plan_completed condition', async () => {
      mockPrisma.badge.findMany.mockResolvedValue([
        { id: 4, conditionType: 'plan_completed', targetId: 10 },
      ]);
      mockPrisma.userBadge.findUnique.mockResolvedValue(null);
      mockPrisma.userBadge.create.mockResolvedValue({ id: 4 });

      await service.evaluateAndGrantBadges('uid', { type: 'plan_completed', learningPlanId: 10 });
      expect(mockPrisma.userBadge.create).toHaveBeenCalled();
    });
  });
});
