import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  course: { findFirstOrThrow: jest.fn(), findMany: jest.fn() },
  enrollment: { findMany: jest.fn() },
  organization: { findFirstOrThrow: jest.fn() },
};

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<AnalyticsService>(AnalyticsService);
    jest.clearAllMocks();
  });

  describe('getCourseAnalytics', () => {
    it('returns analytics for a course with no enrollments', async () => {
      mockPrisma.course.findFirstOrThrow.mockResolvedValue({
        title: 'Test Course',
        enrollments: [],
        output: null,
      });
      const result = await service.getCourseAnalytics('test-key');
      expect(result.courseTitle).toBe('Test Course');
      expect(result.totalEnrollments).toBe(0);
      expect(result.averageScore).toBe(0);
      expect(result.passRate).toBe(0);
    });

    it('computes correct metrics for enrollments', async () => {
      mockPrisma.course.findFirstOrThrow.mockResolvedValue({
        title: 'Course A',
        output: { proposedIndex: [{ units: [{ code: '1.1', title: 'U1' }] }] },
        enrollments: [
          {
            startedAt: new Date(), completedAt: new Date(), passed: true, score: 80,
            unitProgress: [{ unitCode: '1.1', timeSpentSeconds: 100, focusLossCount: 2, completedAt: new Date() }],
          },
          {
            startedAt: new Date(), completedAt: new Date(), passed: false, score: 40,
            unitProgress: [{ unitCode: '1.1', timeSpentSeconds: 200, focusLossCount: 5, completedAt: new Date() }],
          },
          {
            startedAt: new Date(), completedAt: null, passed: null, score: null,
            unitProgress: [{ unitCode: '1.1', timeSpentSeconds: 50, focusLossCount: 1, completedAt: null }],
          },
        ],
      });

      const result = await service.getCourseAnalytics('course-a');
      expect(result.totalEnrollments).toBe(3);
      expect(result.activeStudents).toBe(1);
      expect(result.completedStudents).toBe(2);
      expect(result.averageScore).toBe(60);
      expect(result.passRate).toBe(50);
      expect(result.unitBreakdown).toHaveLength(1);
      expect(result.completionOverTime).toHaveLength(12);
    });
  });

  describe('getCourseUserProgress', () => {
    it('returns user progress sorted by completion', async () => {
      mockPrisma.course.findFirstOrThrow.mockResolvedValue({
        id: 1,
        output: { proposedIndex: [{ units: [{ code: '1.1' }, { code: '1.2' }] }] },
      });
      mockPrisma.enrollment.findMany.mockResolvedValue([
        {
          user: { id: 'u1', name: 'User 1', email: 'u1@t.com' },
          enrolledAt: new Date(), startedAt: new Date(), completedAt: null, score: null, passed: null,
          unitProgress: [{ completedAt: new Date() }],
        },
        {
          user: { id: 'u2', name: 'User 2', email: 'u2@t.com' },
          enrolledAt: new Date(), startedAt: new Date(), completedAt: new Date(), score: 90, passed: true,
          unitProgress: [{ completedAt: new Date() }, { completedAt: new Date() }],
        },
      ]);

      const result = await service.getCourseUserProgress('key');
      expect(result).toHaveLength(2);
      expect(result[0].user.id).toBe('u2');
      expect(result[0].progress).toBe(100);
    });
  });

  describe('getOrgAnalytics', () => {
    it('returns aggregated org analytics', async () => {
      mockPrisma.organization.findFirstOrThrow.mockResolvedValue({ id: 1, name: 'Org' });
      mockPrisma.course.findMany.mockResolvedValue([
        {
          key: 'c1', title: 'Course 1',
          enrollments: [
            { userId: 'u1', completedAt: new Date(), user: { id: 'u1', name: 'U1', email: 'u1@t.com' }, score: 90, passed: true },
            { userId: 'u2', completedAt: null, user: { id: 'u2', name: 'U2', email: 'u2@t.com' }, score: null, passed: null },
          ],
        },
      ]);

      const result = await service.getOrgAnalytics('org-key');
      expect(result.orgName).toBe('Org');
      expect(result.totalCourses).toBe(1);
      expect(result.totalStudents).toBe(2);
      expect(result.averageCompletion).toBe(50);
      expect(result.topCourses).toHaveLength(1);
    });
  });

  describe('getStudentAnalytics', () => {
    it('returns student analytics with course breakdown', async () => {
      mockPrisma.enrollment.findMany.mockResolvedValue([
        {
          completedAt: new Date(), score: 85, passed: true,
          course: { key: 'c1', title: 'Course 1' },
          unitProgress: [
            { id: 1, unitCode: '1.1', timeSpentSeconds: 120, completedAt: new Date() },
          ],
        },
      ]);

      const result = await service.getStudentAnalytics('uid');
      expect(result.totalEnrolled).toBe(1);
      expect(result.totalCompleted).toBe(1);
      expect(result.averageScore).toBe(85);
      expect(result.totalTimeSpent).toBe(120);
      expect(result.courseBreakdown).toHaveLength(1);
    });
  });
});
