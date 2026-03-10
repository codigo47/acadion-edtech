import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { LearningPlanService } from './learning-plan.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

const mockPrisma = {
  organization: { findFirst: jest.fn() },
  learningPlan: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
  learningPlanCourse: { create: jest.fn(), delete: jest.fn(), update: jest.fn() },
  userLearningPlan: { create: jest.fn(), findUnique: jest.fn() },
  userGroup: { findMany: jest.fn() },
  enrollment: { findMany: jest.fn() },
  $transaction: jest.fn((updates) => Promise.all(updates)),
};

const mockNotification = { create: jest.fn() };

describe('LearningPlanService', () => {
  let service: LearningPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LearningPlanService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: NotificationService, useValue: mockNotification },
      ],
    }).compile();
    service = module.get<LearningPlanService>(LearningPlanService);
    jest.clearAllMocks();
  });

  describe('getOrgPlans', () => {
    it('returns plans for org', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.learningPlan.findMany.mockResolvedValue([{ id: 1, name: 'Plan A' }]);
      const result = await service.getOrgPlans('org-key');
      expect(result).toHaveLength(1);
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);
      await expect(service.getOrgPlans('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPlanDetail', () => {
    it('returns plan with courses and enrollments', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue({
        id: 1, name: 'Plan', courses: [], children: [], _count: { enrollments: 0 }, enrollments: [],
      });
      const result = await service.getPlanDetail(1);
      expect(result.name).toBe('Plan');
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue(null);
      await expect(service.getPlanDetail(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createPlan', () => {
    it('creates a learning plan', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.learningPlan.create.mockResolvedValue({ id: 1, name: 'New Plan' });
      const result = await service.createPlan('org-key', { name: 'New Plan' });
      expect(result.name).toBe('New Plan');
    });
  });

  describe('updatePlan', () => {
    it('updates plan', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.learningPlan.update.mockResolvedValue({ id: 1, name: 'Updated' });
      const result = await service.updatePlan(1, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('throws NotFoundException when not found', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue(null);
      await expect(service.updatePlan(999, { name: 'X' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePlan', () => {
    it('deletes plan', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.learningPlan.delete.mockResolvedValue({ id: 1 });
      await service.deletePlan(1);
      expect(mockPrisma.learningPlan.delete).toHaveBeenCalled();
    });
  });

  describe('addCourse', () => {
    it('adds course to plan', async () => {
      mockPrisma.learningPlanCourse.create.mockResolvedValue({ learningPlanId: 1, courseId: 5, order: 0 });
      const result = await service.addCourse(1, { courseId: 5 });
      expect(result.courseId).toBe(5);
    });
  });

  describe('removeCourse', () => {
    it('removes course from plan', async () => {
      mockPrisma.learningPlanCourse.delete.mockResolvedValue({});
      await service.removeCourse(1, 5);
      expect(mockPrisma.learningPlanCourse.delete).toHaveBeenCalled();
    });
  });

  describe('reorderCourses', () => {
    it('reorders courses in a transaction', async () => {
      mockPrisma.learningPlanCourse.update.mockResolvedValue({});
      await service.reorderCourses(1, { courses: [{ courseId: 5, order: 0 }, { courseId: 6, order: 1 }] });
      expect(mockPrisma.$transaction).toHaveBeenCalled();
    });
  });

  describe('assignToUser', () => {
    it('assigns plan to user and sends notification', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue({ id: 1, name: 'Plan' });
      mockPrisma.userLearningPlan.create.mockResolvedValue({ id: 1, userId: 'u1', learningPlanId: 1 });

      await service.assignToUser(1, { userId: 'u1' });
      expect(mockNotification.create).toHaveBeenCalledWith(
        'u1', 'learning_plan_assigned', expect.objectContaining({ planName: 'Plan' }),
      );
    });

    it('throws NotFoundException when plan not found', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue(null);
      await expect(service.assignToUser(999, { userId: 'u1' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('assignToGroup', () => {
    it('assigns plan to group members, skipping existing', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue({ id: 1, name: 'Plan' });
      mockPrisma.userGroup.findMany.mockResolvedValue([{ userId: 'u1' }, { userId: 'u2' }]);
      mockPrisma.userLearningPlan.findUnique
        .mockResolvedValueOnce(null) // u1 not enrolled
        .mockResolvedValueOnce({ id: 1 }); // u2 already enrolled
      mockPrisma.userLearningPlan.create.mockResolvedValue({ id: 2, userId: 'u1', learningPlanId: 1 });

      const result = await service.assignToGroup(1, { groupId: 10 });
      expect(result.assigned).toBe(1);
      expect(result.total).toBe(2);
    });
  });

  describe('getStudentPlanDetail', () => {
    it('returns plan detail with course progress', async () => {
      mockPrisma.learningPlan.findUnique.mockResolvedValue({
        id: 1, key: 'plan-1', name: 'Plan', description: null, image: null,
        badgeImage: null, badgeName: null, estimatedDays: null,
        isCorrelative: false, isOptional: false,
        courses: [
          { courseId: 5, order: 0, required: true, course: { id: 5, key: 'c1', title: 'Course 1', status: 'completed' } },
        ],
      });
      mockPrisma.userLearningPlan.findUnique.mockResolvedValue({
        enrolledAt: new Date(), deadline: null, completedAt: null,
      });
      mockPrisma.enrollment.findMany.mockResolvedValue([
        { courseId: 5, startedAt: new Date(), completedAt: new Date(), passed: true, score: 90, _count: { unitProgress: 5 } },
      ]);

      const result = await service.getStudentPlanDetail(1, 'uid');
      expect(result.courses).toHaveLength(1);
      expect(result.courses[0].isCompleted).toBe(true);
      expect(result.courses[0].locked).toBe(false);
    });
  });
});
