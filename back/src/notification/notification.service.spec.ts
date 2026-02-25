import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  notification: {
    findMany: jest.fn(),
    count: jest.fn(),
    updateMany: jest.fn(),
    create: jest.fn(),
  },
};

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<NotificationService>(NotificationService);
    jest.clearAllMocks();
  });

  describe('getUserNotifications', () => {
    it('returns list of notifications ordered by createdAt desc', async () => {
      const notifs = [{ id: 2 }, { id: 1 }];
      mockPrisma.notification.findMany.mockResolvedValue(notifs);
      const result = await service.getUserNotifications('uid');
      expect(result).toHaveLength(2);
      expect(mockPrisma.notification.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'uid' },
          orderBy: { createdAt: 'desc' },
        }),
      );
    });
  });

  describe('getUnreadCount', () => {
    it('returns count of unread notifications', async () => {
      mockPrisma.notification.count.mockResolvedValue(3);
      const result = await service.getUnreadCount('uid');
      expect(result).toBe(3);
      expect(mockPrisma.notification.count).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'uid', readAt: null },
        }),
      );
    });
  });

  describe('markAsRead', () => {
    it('sets readAt on a specific notification for the user', async () => {
      mockPrisma.notification.updateMany.mockResolvedValue({ count: 1 });
      const result = await service.markAsRead(1, 'uid');
      expect(mockPrisma.notification.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1, userId: 'uid' } }),
      );
      expect(result).toEqual({ count: 1 });
    });
  });

  describe('markAllAsRead', () => {
    it('updates all unread notifications for a user', async () => {
      mockPrisma.notification.updateMany.mockResolvedValue({ count: 5 });
      await service.markAllAsRead('uid');
      expect(mockPrisma.notification.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: 'uid', readAt: null },
        }),
      );
    });
  });

  describe('create', () => {
    it('creates a notification record', async () => {
      const notif = { id: 1, userId: 'uid', type: 'badge_earned', data: {} };
      mockPrisma.notification.create.mockResolvedValue(notif);
      const result = await service.create('uid', 'badge_earned' as any, {});
      expect(result).toEqual(notif);
      expect(mockPrisma.notification.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ userId: 'uid' }) }),
      );
    });
  });
});
