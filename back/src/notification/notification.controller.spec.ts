import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

const mockNotificationService = {
  getUserNotifications: jest.fn(),
  getUnreadCount: jest.fn(),
  markAsRead: jest.fn(),
  markAllAsRead: jest.fn(),
};

describe('NotificationController', () => {
  let controller: NotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [{ provide: NotificationService, useValue: mockNotificationService }],
    }).compile();
    controller = module.get<NotificationController>(NotificationController);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('returns notifications for user', async () => {
      mockNotificationService.getUserNotifications.mockResolvedValue([{ id: 1 }]);
      const req = { user: { id: 'uid' } } as any;
      const result = await controller.getAll(req);
      expect(result).toHaveLength(1);
    });
  });

  describe('getUnreadCount', () => {
    it('returns count wrapper', async () => {
      mockNotificationService.getUnreadCount.mockResolvedValue(5);
      const req = { user: { id: 'uid' } } as any;
      const result = await controller.getUnreadCount(req);
      expect(result).toEqual({ count: 5 });
    });
  });

  describe('markAsRead', () => {
    it('marks specific notification as read', async () => {
      mockNotificationService.markAsRead.mockResolvedValue({ count: 1 });
      const req = { user: { id: 'uid' } } as any;
      const result = await controller.markAsRead(1, req);
      expect(result).toEqual({ count: 1 });
    });
  });

  describe('markAllAsRead', () => {
    it('marks all notifications as read', async () => {
      mockNotificationService.markAllAsRead.mockResolvedValue({ count: 3 });
      const req = { user: { id: 'uid' } } as any;
      const result = await controller.markAllAsRead(req);
      expect(result).toEqual({ count: 3 });
    });
  });
});
