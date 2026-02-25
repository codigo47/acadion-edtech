import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { LmsService } from './lms.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadgeService } from '../badge/badge.service';
import { NotificationService } from '../notification/notification.service';

const mockPrisma = {
  course: { findMany: jest.fn(), findFirst: jest.fn() },
  enrollment: {
    findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn(),
    createMany: jest.fn(), update: jest.fn(),
  },
  courseUnitProgress: { findMany: jest.fn(), create: jest.fn(), update: jest.fn() },
  courseComponent: { findMany: jest.fn() },
  userLearningPlan: { findMany: jest.fn() },
  adaptiveAssessment: { findMany: jest.fn(), deleteMany: jest.fn() },
  knowledgeCheckAttempt: { count: jest.fn(), create: jest.fn() },
};

const mockBadgeService = { evaluateAndGrantBadges: jest.fn() };
const mockNotificationService = { create: jest.fn() };

describe('LmsService', () => {
  let service: LmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LmsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: BadgeService, useValue: mockBadgeService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compile();
    service = module.get<LmsService>(LmsService);
    jest.clearAllMocks();
  });

  describe('getStudentDashboard', () => {
    it('returns enrolled courses and learning plans', async () => {
      mockPrisma.course.findMany.mockResolvedValue([]);
      mockPrisma.enrollment.findMany.mockResolvedValue([
        {
          id: 1, enrolledAt: new Date(), startedAt: new Date(), completedAt: null,
          passed: null, score: null, attempts: 0,
          course: { id: 1, key: 'c1', title: 'Course 1', status: 'completed', output: null, isAdaptive: false },
          unitProgress: [],
        },
      ]);
      mockPrisma.userLearningPlan.findMany.mockResolvedValue([]);

      const result = await service.getStudentDashboard('uid');
      expect(result.enrolledCourses).toHaveLength(1);
      expect(result.enrolledCourses[0].state).toBe('in_progress');
      expect(result.learningPlans).toHaveLength(0);
    });

    it('sorts courses: in_progress > not_started > completed', async () => {
      mockPrisma.course.findMany.mockResolvedValue([]);
      mockPrisma.enrollment.findMany.mockResolvedValue([
        {
          id: 1, enrolledAt: new Date(), startedAt: null, completedAt: null,
          passed: null, score: null, attempts: 0,
          course: { id: 1, key: 'c1', title: 'Not Started', status: 'completed', output: null, isAdaptive: false },
          unitProgress: [],
        },
        {
          id: 2, enrolledAt: new Date(), startedAt: new Date(), completedAt: new Date(),
          passed: true, score: 90, attempts: 1,
          course: { id: 2, key: 'c2', title: 'Completed', status: 'completed', output: null, isAdaptive: false },
          unitProgress: [],
        },
        {
          id: 3, enrolledAt: new Date(), startedAt: new Date(), completedAt: null,
          passed: null, score: null, attempts: 0,
          course: { id: 3, key: 'c3', title: 'In Progress', status: 'completed', output: null, isAdaptive: false },
          unitProgress: [],
        },
      ]);
      mockPrisma.userLearningPlan.findMany.mockResolvedValue([]);

      const result = await service.getStudentDashboard('uid');
      expect(result.enrolledCourses[0].state).toBe('in_progress');
      expect(result.enrolledCourses[1].state).toBe('not_started');
      expect(result.enrolledCourses[2].state).toBe('completed');
    });
  });

  describe('getCourseContent', () => {
    it('returns course content with components grouped by unit', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({
        id: 1, key: 'c1', title: 'Course', output: null, status: 'completed', isAdaptive: false, userId: 'uid',
      });
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, enrolledAt: new Date(), startedAt: null, completedAt: null,
        passed: null, score: null, attempts: 0, unitProgress: [],
      });
      mockPrisma.courseComponent.findMany.mockResolvedValue([
        { module: 1, unit: 1, sequence: 0, data: {}, component: { internalName: 'paragraph' } },
      ]);

      const result = await service.getCourseContent('c1', 'uid');
      expect(result.courseKey).toBe('c1');
      expect(result.componentsByUnit['1.1']).toHaveLength(1);
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(service.getCourseContent('invalid', 'uid')).rejects.toThrow(NotFoundException);
    });

    it('auto-enrolls course owner', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({
        id: 1, key: 'c1', title: 'Course', output: null, status: 'completed', isAdaptive: false, userId: 'owner',
      });
      mockPrisma.enrollment.findUnique.mockResolvedValue(null);
      mockPrisma.enrollment.create.mockResolvedValue({
        id: 1, enrolledAt: new Date(), startedAt: null, completedAt: null,
        passed: null, score: null, attempts: 0,
      });
      mockPrisma.courseComponent.findMany.mockResolvedValue([]);

      const result = await service.getCourseContent('c1', 'owner');
      expect(mockPrisma.enrollment.create).toHaveBeenCalled();
      expect(result.courseKey).toBe('c1');
    });

    it('throws ForbiddenException when not enrolled and not owner', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({
        id: 1, key: 'c1', title: 'Course', output: null, status: 'completed', isAdaptive: false, userId: 'other',
      });
      mockPrisma.enrollment.findUnique.mockResolvedValue(null);
      await expect(service.getCourseContent('c1', 'uid')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateProgress', () => {
    it('creates new unit progress', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, output: null });
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, startedAt: new Date(), unitProgress: [],
      });
      mockPrisma.courseUnitProgress.create.mockResolvedValue({});
      mockPrisma.courseUnitProgress.findMany.mockResolvedValue([]);

      const result = await service.updateProgress('c1', 'uid', {
        unitCode: '1.1', timeSpentSeconds: 30, completed: false,
      });
      expect(result.progress).toBe(0);
      expect(mockPrisma.courseUnitProgress.create).toHaveBeenCalled();
    });

    it('updates existing unit progress', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, output: null });
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, startedAt: new Date(),
        unitProgress: [{ id: 1, unitCode: '1.1', timeSpentSeconds: 10, completedAt: null, focusLossCount: 0 }],
      });
      mockPrisma.courseUnitProgress.update.mockResolvedValue({});
      mockPrisma.courseUnitProgress.findMany.mockResolvedValue([
        { completedAt: new Date() },
      ]);

      await service.updateProgress('c1', 'uid', {
        unitCode: '1.1', timeSpentSeconds: 20, completed: true,
      });
      expect(mockPrisma.courseUnitProgress.update).toHaveBeenCalled();
    });

    it('marks enrollment as started on first progress', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, output: null });
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, startedAt: null, unitProgress: [],
      });
      mockPrisma.enrollment.update.mockResolvedValue({});
      mockPrisma.courseUnitProgress.create.mockResolvedValue({});
      mockPrisma.courseUnitProgress.findMany.mockResolvedValue([]);

      await service.updateProgress('c1', 'uid', {
        unitCode: '1.1', timeSpentSeconds: 5, completed: false,
      });
      expect(mockPrisma.enrollment.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { startedAt: expect.any(Date) } }),
      );
    });
  });

  describe('completeCourse', () => {
    it('completes course and triggers notifications and badges', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, orgId: 2 });
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1, attempts: 0 });
      mockPrisma.enrollment.update.mockResolvedValue({ id: 1, completedAt: new Date() });

      await service.completeCourse('c1', 'uid', { passed: true, score: 85 });

      expect(mockPrisma.enrollment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ passed: true, score: 85, attempts: 1 }),
        }),
      );
      expect(mockNotificationService.create).toHaveBeenCalled();
      expect(mockBadgeService.evaluateAndGrantBadges).toHaveBeenCalled();
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(service.completeCourse('invalid', 'uid', { passed: true, score: 90 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('selfEnroll', () => {
    it('creates new enrollment', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.enrollment.findUnique.mockResolvedValue(null);
      mockPrisma.enrollment.create.mockResolvedValue({ id: 1, userId: 'uid', courseId: 1 });

      const result = await service.selfEnroll('c1', 'uid');
      expect(result.id).toBe(1);
    });

    it('returns existing enrollment if already enrolled', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      const existing = { id: 1, userId: 'uid', courseId: 1 };
      mockPrisma.enrollment.findUnique.mockResolvedValue(existing);

      const result = await service.selfEnroll('c1', 'uid');
      expect(result).toEqual(existing);
      expect(mockPrisma.enrollment.create).not.toHaveBeenCalled();
    });

    it('throws NotFoundException when course not found or not completed', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(service.selfEnroll('invalid', 'uid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('adminEnroll', () => {
    it('enrolls user and sends notification', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.enrollment.findUnique.mockResolvedValue(null);
      mockPrisma.enrollment.create.mockResolvedValue({ id: 1 });

      await service.adminEnroll('c1', { userId: 'u1' });
      expect(mockNotificationService.create).toHaveBeenCalledWith('u1', 'enrolled', expect.any(Object));
    });
  });

  describe('adminReEnroll', () => {
    it('resets enrollment and clears progress', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1, attempts: 1 });
      mockPrisma.enrollment.update.mockResolvedValue({ id: 1 });
      mockPrisma.courseUnitProgress.findMany.mockResolvedValue([]);
      (mockPrisma as any).courseUnitProgress.deleteMany = jest.fn().mockResolvedValue({ count: 0 });
      mockPrisma.adaptiveAssessment.deleteMany.mockResolvedValue({ count: 0 });

      await service.adminReEnroll('c1', 'uid');
      expect(mockPrisma.enrollment.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ startedAt: null, completedAt: null }),
        }),
      );
    });

    it('throws NotFoundException when enrollment not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.enrollment.findUnique.mockResolvedValue(null);
      await expect(service.adminReEnroll('c1', 'uid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('submitKnowledgeCheck', () => {
    it('creates an attempt and returns result', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.knowledgeCheckAttempt.count.mockResolvedValue(0);
      mockPrisma.knowledgeCheckAttempt.create.mockResolvedValue({
        attemptNumber: 1, isCorrect: true,
      });

      const result = await service.submitKnowledgeCheck('c1', 'uid', {
        unitCode: '1.1', questionIndex: 0, answer: 'A', isCorrect: true,
      });
      expect(result.attemptNumber).toBe(1);
      expect(result.isCorrect).toBe(true);
      expect(result.remainingAttempts).toBe(2);
    });

    it('throws BadRequestException when max attempts reached', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.knowledgeCheckAttempt.count.mockResolvedValue(3);

      await expect(
        service.submitKnowledgeCheck('c1', 'uid', { unitCode: '1.1', questionIndex: 0, answer: 'A', isCorrect: false }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
