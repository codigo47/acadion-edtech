import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { AdaptiveService } from './adaptive.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  course: { findFirst: jest.fn() },
  enrollment: { findUnique: jest.fn(), update: jest.fn() },
  adaptiveAssessment: { findFirst: jest.fn(), findMany: jest.fn(), createMany: jest.fn() },
  courseUnitProgress: { upsert: jest.fn() },
};

describe('AdaptiveService', () => {
  let service: AdaptiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdaptiveService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<AdaptiveService>(AdaptiveService);
    jest.clearAllMocks();
  });

  describe('getPreAssessment', () => {
    it('returns units for pre-assessment', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({
        id: 1, key: 'c1', title: 'Course', isAdaptive: true,
        output: {
          proposedIndex: {
            modules: [{ title: 'Module 1', units: [{ code: '1.1', title: 'Unit 1' }] }],
          },
        },
      });
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.adaptiveAssessment.findFirst.mockResolvedValue(null);

      const result = await service.getPreAssessment('c1', 'uid');
      expect(result.alreadyCompleted).toBe(false);
      expect(result.units).toHaveLength(1);
      expect(result.units[0].unitCode).toBe('1.1');
    });

    it('returns alreadyCompleted when pre-assessment exists', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, isAdaptive: true });
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.adaptiveAssessment.findFirst.mockResolvedValue({ id: 1 });

      const result = await service.getPreAssessment('c1', 'uid');
      expect(result.alreadyCompleted).toBe(true);
    });

    it('throws BadRequestException when course is not adaptive', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, isAdaptive: false });
      await expect(service.getPreAssessment('c1', 'uid')).rejects.toThrow(BadRequestException);
    });

    it('throws NotFoundException when course not found', async () => {
      mockPrisma.course.findFirst.mockResolvedValue(null);
      await expect(service.getPreAssessment('invalid', 'uid')).rejects.toThrow(NotFoundException);
    });

    it('throws ForbiddenException when not enrolled', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({ id: 1, isAdaptive: true });
      mockPrisma.enrollment.findUnique.mockResolvedValue(null);
      await expect(service.getPreAssessment('c1', 'uid')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('submitPreAssessment', () => {
    it('stores assessments and returns adaptive path', async () => {
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, userId: 'uid', startedAt: null,
        course: { id: 1, isAdaptive: true, output: null },
      });
      mockPrisma.adaptiveAssessment.findFirst.mockResolvedValue(null);
      mockPrisma.adaptiveAssessment.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.enrollment.update.mockResolvedValue({});

      const result = await service.submitPreAssessment(1, 'uid', [
        { unitCode: '1.1', confidenceScore: 5 },
        { unitCode: '1.2', confidenceScore: 3 },
      ]);

      expect(result.path).toHaveLength(2);
      expect(result.path[0].mode).toBe('skip');
      expect(result.path[1].mode).toBe('full');
      expect(mockPrisma.courseUnitProgress.upsert).toHaveBeenCalledTimes(1); // only score 5
    });

    it('throws BadRequestException for invalid confidence score', async () => {
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, userId: 'uid',
        course: { id: 1, isAdaptive: true },
      });
      mockPrisma.adaptiveAssessment.findFirst.mockResolvedValue(null);

      await expect(
        service.submitPreAssessment(1, 'uid', [{ unitCode: '1.1', confidenceScore: 6 }]),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException if already submitted', async () => {
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, userId: 'uid',
        course: { id: 1, isAdaptive: true },
      });
      mockPrisma.adaptiveAssessment.findFirst.mockResolvedValue({ id: 1 });

      await expect(
        service.submitPreAssessment(1, 'uid', []),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws ForbiddenException when not the owner', async () => {
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, userId: 'other',
        course: { id: 1, isAdaptive: true },
      });

      await expect(
        service.submitPreAssessment(1, 'uid', []),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getPostAssessment', () => {
    it('returns post-assessment with pre-scores', async () => {
      mockPrisma.course.findFirst.mockResolvedValue({
        id: 1, isAdaptive: true,
        output: {
          proposedIndex: {
            modules: [{ title: 'M1', units: [{ code: '1.1', title: 'U1' }] }],
          },
        },
      });
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.adaptiveAssessment.findMany.mockResolvedValue([
        { unitCode: '1.1', confidenceScore: 3 },
      ]);
      mockPrisma.adaptiveAssessment.findFirst.mockResolvedValue(null);

      const result = await service.getPostAssessment('c1', 'uid');
      expect(result.alreadyCompleted).toBe(false);
      expect(result.units[0].preScore).toBe(3);
    });
  });

  describe('submitPostAssessment', () => {
    it('returns comparison with improvement metrics', async () => {
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1, userId: 'uid' });
      mockPrisma.adaptiveAssessment.createMany.mockResolvedValue({ count: 1 });
      mockPrisma.adaptiveAssessment.findMany.mockResolvedValue([
        { unitCode: '1.1', confidenceScore: 2 },
      ]);

      const result = await service.submitPostAssessment(1, 'uid', [
        { unitCode: '1.1', confidenceScore: 4 },
      ]);

      expect(result.comparison).toHaveLength(1);
      expect(result.comparison[0].preScore).toBe(2);
      expect(result.comparison[0].postScore).toBe(4);
      expect(result.comparison[0].improvement).toBe(2);
    });

    it('throws ForbiddenException when not the owner', async () => {
      mockPrisma.enrollment.findUnique.mockResolvedValue({ id: 1, userId: 'other' });
      await expect(
        service.submitPostAssessment(1, 'uid', []),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getAdaptivePath', () => {
    it('returns adaptive path from pre-assessments', async () => {
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, userId: 'uid',
        course: {
          isAdaptive: true,
          output: { proposedIndex: { modules: [{ units: [{ code: '1.1', title: 'Unit 1' }] }] } },
        },
      });
      mockPrisma.adaptiveAssessment.findMany.mockResolvedValue([
        { unitCode: '1.1', confidenceScore: 4 },
      ]);

      const result = await service.getAdaptivePath(1, 'uid');
      expect(result).toHaveLength(1);
      expect(result[0].mode).toBe('check_only');
    });

    it('returns empty array when no assessments', async () => {
      mockPrisma.enrollment.findUnique.mockResolvedValue({
        id: 1, userId: 'uid', course: { isAdaptive: true, output: null },
      });
      mockPrisma.adaptiveAssessment.findMany.mockResolvedValue([]);

      const result = await service.getAdaptivePath(1, 'uid');
      expect(result).toEqual([]);
    });
  });
});
