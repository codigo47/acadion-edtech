import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PrismaService } from '../prisma/prisma.service';

const mockTransaction = jest.fn((cb) => cb(mockTx));
const mockTx = {
  portfolioImage: { deleteMany: jest.fn(), createMany: jest.fn() },
  portfolioVideo: { deleteMany: jest.fn(), createMany: jest.fn() },
};

const mockPrisma = {
  user: { findUnique: jest.fn() },
  portfolio: { findUnique: jest.fn(), upsert: jest.fn() },
  portfolioCourse: { deleteMany: jest.fn(), createMany: jest.fn() },
  portfolioVisit: {
    create: jest.fn(),
    count: jest.fn(),
    findMany: jest.fn(),
    groupBy: jest.fn(),
  },
  portfolioContactMessage: { create: jest.fn() },
  course: { findMany: jest.fn() },
  $transaction: mockTransaction,
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

    it('returns empty portfolio when portfolio is private', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'uid',
        name: 'Test',
        image: null,
        username: 'test',
        portfolio: { isPublic: false },
      });
      const result = await service.getByUsername('test');
      expect(result.user.username).toBe('test');
      expect(result.portfolio.title).toBeNull();
      expect(result.portfolio.courses).toEqual([]);
      expect(result.portfolio.images).toEqual([]);
      expect(result.portfolio.videos).toEqual([]);
    });

    it('returns empty portfolio when user has no portfolio', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'uid',
        name: 'Test',
        image: null,
        username: 'test',
        portfolio: null,
      });
      const result = await service.getByUsername('test');
      expect(result.user.username).toBe('test');
      expect(result.portfolio.title).toBeNull();
      expect(result.portfolio.courses).toEqual([]);
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
          tagline: 'Designer',
          bio: 'Hello world',
          portraitImage: null,
          coverImage: null,
          email: null,
          phone: null,
          theme: 'corporate_professional',
          skills: ['JS'],
          languages: ['en'],
          socialLinkedin: null,
          socialTwitter: null,
          socialInstagram: null,
          socialCustom: [],
          courses: [
            {
              order: 0,
              course: {
                id: 1,
                key: 'abc',
                title: 'Course 1',
                status: 'completed',
              },
            },
          ],
          images: [
            { id: 1, url: 'https://img.jpg', description: 'pic', order: 0 },
          ],
          videos: [
            { id: 1, url: 'https://vid.mp4', description: 'vid', order: 0 },
          ],
        },
      });

      const result = await service.getByUsername('testuser');
      expect(result.user.username).toBe('testuser');
      expect(result.portfolio.title).toBe('My Portfolio');
      expect(result.portfolio.courses).toHaveLength(1);
      expect(result.portfolio.courses[0].id).toBe(1);
      expect(result.portfolio.images).toHaveLength(1);
      expect(result.portfolio.videos).toHaveLength(1);
    });

    it('falls back to completed courses when none manually selected', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'uid',
        name: 'Test',
        image: null,
        username: 'test',
        portfolio: {
          isPublic: true,
          title: 'Portfolio',
          tagline: null,
          bio: null,
          portraitImage: null,
          coverImage: null,
          email: null,
          phone: null,
          theme: null,
          skills: [],
          languages: [],
          socialLinkedin: null,
          socialTwitter: null,
          socialInstagram: null,
          socialCustom: null,
          courses: [],
          images: [],
          videos: [],
        },
      });
      mockPrisma.course.findMany.mockResolvedValue([
        { id: 5, key: 'c5', title: 'Auto Course', status: 'completed' },
      ]);

      const result = await service.getByUsername('test');
      expect(result.portfolio.courses).toHaveLength(1);
      expect(result.portfolio.courses[0].id).toBe(5);
      expect(result.portfolio.courses[0].order).toBe(0);
    });
  });

  describe('getMyPortfolio', () => {
    it('returns default empty portfolio when none exists', async () => {
      mockPrisma.portfolio.findUnique.mockResolvedValue(null);
      const result = await service.getMyPortfolio('user-id');
      expect(result).toEqual({
        id: null,
        title: null,
        tagline: null,
        bio: null,
        portraitImage: null,
        coverImage: null,
        email: null,
        phone: null,
        theme: 'corporate_professional',
        skills: [],
        languages: [],
        socialLinkedin: null,
        socialTwitter: null,
        socialInstagram: null,
        socialCustom: [],
        isPublic: true,
        courses: [],
        images: [],
        videos: [],
      });
    });

    it('returns existing portfolio with courses', async () => {
      const portfolio = {
        id: 1,
        title: 'Test',
        bio: null,
        isPublic: true,
        courses: [],
        images: [],
        videos: [],
      };
      mockPrisma.portfolio.findUnique.mockResolvedValue(portfolio);
      const result = await service.getMyPortfolio('user-id');
      expect(result).toEqual(portfolio);
    });
  });

  describe('upsertPortfolio', () => {
    it('creates portfolio when none exists', async () => {
      const created = {
        id: 1,
        userId: 'uid',
        title: 'New',
        bio: 'Bio',
        isPublic: true,
      };
      mockPrisma.portfolio.upsert.mockResolvedValue(created);
      // getMyPortfolio is called at end — mock it
      mockPrisma.portfolio.findUnique.mockResolvedValue({
        id: 1,
        title: 'New',
        bio: 'Bio',
        isPublic: true,
        courses: [],
        images: [],
        videos: [],
      });
      const result = await service.upsertPortfolio('uid', {
        title: 'New',
        bio: 'Bio',
        isPublic: true,
      });
      expect(mockPrisma.portfolio.upsert).toHaveBeenCalledWith(
        expect.objectContaining({ where: { userId: 'uid' } }),
      );
      expect(result.title).toBe('New');
    });

    it('handles images and videos via transaction', async () => {
      mockPrisma.portfolio.upsert.mockResolvedValue({ id: 1 });
      mockPrisma.portfolio.findUnique.mockResolvedValue({
        id: 1,
        title: null,
        courses: [],
        images: [],
        videos: [],
      });
      mockTx.portfolioImage.deleteMany.mockResolvedValue({ count: 0 });
      mockTx.portfolioImage.createMany.mockResolvedValue({ count: 1 });
      mockTx.portfolioVideo.deleteMany.mockResolvedValue({ count: 0 });
      mockTx.portfolioVideo.createMany.mockResolvedValue({ count: 1 });

      await service.upsertPortfolio('uid', {
        images: [{ url: 'https://img.jpg' }],
        videos: [{ url: 'https://vid.mp4' }],
      });

      expect(mockTransaction).toHaveBeenCalled();
      expect(mockTx.portfolioImage.deleteMany).toHaveBeenCalled();
      expect(mockTx.portfolioImage.createMany).toHaveBeenCalled();
      expect(mockTx.portfolioVideo.deleteMany).toHaveBeenCalled();
      expect(mockTx.portfolioVideo.createMany).toHaveBeenCalled();
    });
  });

  describe('updateCourses', () => {
    it('replaces all courses with new set', async () => {
      const portfolio = { id: 10 };
      mockPrisma.portfolio.upsert.mockResolvedValue(portfolio);
      mockPrisma.portfolioCourse.deleteMany.mockResolvedValue({ count: 2 });
      mockPrisma.portfolioCourse.createMany.mockResolvedValue({ count: 2 });
      mockPrisma.portfolio.findUnique.mockResolvedValue({
        id: 10,
        title: null,
        bio: null,
        isPublic: true,
        courses: [],
        images: [],
        videos: [],
      });

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
      mockPrisma.portfolio.findUnique.mockResolvedValue({
        id: 10,
        courses: [],
        images: [],
        videos: [],
      });

      await service.updateCourses('uid', { courseIds: [] });
      expect(mockPrisma.portfolioCourse.createMany).not.toHaveBeenCalled();
    });
  });

  describe('trackVisit', () => {
    it('creates a visit record', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        portfolio: { id: 5 },
      });
      mockPrisma.portfolioVisit.create.mockResolvedValue({ id: 1 });

      const result = await service.trackVisit('test', {
        country: 'AR',
        courseId: 3,
      });
      expect(mockPrisma.portfolioVisit.create).toHaveBeenCalledWith({
        data: { portfolioId: 5, country: 'AR', courseId: 3 },
      });
      expect(result).toEqual({ id: 1 });
    });

    it('throws NotFoundException when user has no portfolio', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ portfolio: null });
      await expect(
        service.trackVisit('nobody', { country: 'US' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('sendContactMessage', () => {
    it('creates a contact message', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        portfolio: { id: 5 },
      });
      const msg = { id: 1, message: 'Hello' };
      mockPrisma.portfolioContactMessage.create.mockResolvedValue(msg);
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});

      const result = await service.sendContactMessage('test', {
        name: 'John',
        email: 'john@test.com',
        message: 'Hello',
      });
      expect(result).toEqual(msg);
      consoleSpy.mockRestore();
    });

    it('throws when portfolio not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ portfolio: null });
      await expect(
        service.sendContactMessage('nobody', {
          name: 'John',
          email: 'j@t.com',
          message: 'Hi',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPortfolioAnalytics', () => {
    it('returns empty analytics when no portfolio', async () => {
      mockPrisma.portfolio.findUnique.mockResolvedValue(null);
      const result = await service.getPortfolioAnalytics('uid');
      expect(result).toEqual({
        totalVisits: 0,
        visitsPerDay: [],
        courseOpens: [],
        countries: [],
      });
    });

    it('returns aggregated analytics', async () => {
      mockPrisma.portfolio.findUnique.mockResolvedValue({ id: 5 });
      mockPrisma.portfolioVisit.count.mockResolvedValue(10);
      mockPrisma.portfolioVisit.findMany.mockResolvedValue([
        { createdAt: new Date('2026-01-15') },
        { createdAt: new Date('2026-01-15') },
      ]);
      mockPrisma.portfolioVisit.groupBy
        .mockResolvedValueOnce([
          { courseId: 1, _count: { id: 5 } },
        ])
        .mockResolvedValueOnce([
          { country: 'AR', _count: { id: 7 } },
        ]);
      mockPrisma.course.findMany.mockResolvedValue([
        { id: 1, title: 'Course A' },
      ]);

      const result = await service.getPortfolioAnalytics('uid');
      expect(result.totalVisits).toBe(10);
      expect(result.visitsPerDay).toHaveLength(1);
      expect(result.visitsPerDay[0].count).toBe(2);
      expect(result.courseOpens).toHaveLength(1);
      expect(result.courseOpens[0].title).toBe('Course A');
      expect(result.countries).toHaveLength(1);
      expect(result.countries[0].country).toBe('AR');
    });
  });
});
