import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  user: { findUnique: jest.fn() },
  portfolio: { findUnique: jest.fn(), upsert: jest.fn() },
  portfolioCourse: { deleteMany: jest.fn(), createMany: jest.fn() },
};

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<PortfolioService>(PortfolioService);
    jest.clearAllMocks();
  });

  describe('getByUsername', () => {
    it('throws NotFoundException when user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.getByUsername('nobody')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException when portfolio is private', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'uid',
        name: 'Test',
        image: null,
        username: 'test',
        portfolio: { isPublic: false },
      });
      await expect(service.getByUsername('test')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws NotFoundException when user has no portfolio', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'uid',
        name: 'Test',
        image: null,
        username: 'test',
        portfolio: null,
      });
      await expect(service.getByUsername('test')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('returns public portfolio data', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'uid',
        name: 'Test User',
        image: 'https://img.jpg',
        username: 'testuser',
        portfolio: {
          isPublic: true,
          title: 'My Portfolio',
          bio: 'Hello world',
          courses: [
            {
              order: 0,
              course: { id: 1, key: 'abc', title: 'Course 1', status: 'completed' },
            },
          ],
        },
      });

      const result = await service.getByUsername('testuser');
      expect(result.user.username).toBe('testuser');
      expect(result.portfolio.title).toBe('My Portfolio');
      expect(result.portfolio.courses).toHaveLength(1);
      expect(result.portfolio.courses[0].id).toBe(1);
    });
  });

  describe('getMyPortfolio', () => {
    it('returns default empty portfolio when none exists', async () => {
      mockPrisma.portfolio.findUnique.mockResolvedValue(null);
      const result = await service.getMyPortfolio('user-id');
      expect(result).toEqual({ id: null, title: null, bio: null, isPublic: true, courses: [] });
    });

    it('returns existing portfolio with courses', async () => {
      const portfolio = {
        id: 1,
        title: 'Test',
        bio: null,
        isPublic: true,
        courses: [],
      };
      mockPrisma.portfolio.findUnique.mockResolvedValue(portfolio);
      const result = await service.getMyPortfolio('user-id');
      expect(result).toEqual(portfolio);
    });
  });

  describe('upsertPortfolio', () => {
    it('creates portfolio when none exists', async () => {
      const created = { id: 1, userId: 'uid', title: 'New', bio: 'Bio', isPublic: true };
      mockPrisma.portfolio.upsert.mockResolvedValue(created);
      const result = await service.upsertPortfolio('uid', { title: 'New', bio: 'Bio', isPublic: true });
      expect(mockPrisma.portfolio.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId: 'uid' } }),
      );
      expect(result.title).toBe('New');
    });
  });

  describe('updateCourses', () => {
    it('replaces all courses with new set', async () => {
      const portfolio = { id: 10 };
      mockPrisma.portfolio.upsert.mockResolvedValue(portfolio);
      mockPrisma.portfolioCourse.deleteMany.mockResolvedValue({ count: 2 });
      mockPrisma.portfolioCourse.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.portfolio.findUnique.mockResolvedValue({ id: 10, title: null, bio: null, isPublic: true, courses: [] });

      await service.updateCourses('uid', { courseIds: [1, 2] });

      expect(mockPrisma.portfolioCourse.deleteMany).toHaveBeenCalledWith({
        where: { portfolioId: 10 },
      });
      expect(mockPrisma.portfolioCourse.createMany).toHaveBeenCalledWith({
        data: [
          { portfolioId: 10, courseId: 1, order: 0 },
          { portfolioId: 10, courseId: 2, order: 1 },
        ],
      });
    });

    it('skips createMany when courseIds is empty', async () => {
      mockPrisma.portfolio.upsert.mockResolvedValue({ id: 10 });
      mockPrisma.portfolioCourse.deleteMany.mockResolvedValue({ count: 0 });
      mockPrisma.portfolio.findUnique.mockResolvedValue({ id: 10, courses: [] });

      await service.updateCourses('uid', { courseIds: [] });
      expect(mockPrisma.portfolioCourse.createMany).not.toHaveBeenCalled();
    });
  });
});
