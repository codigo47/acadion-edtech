import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { PrismaService } from '../prisma/prisma.service';

const mockBadgeService = {
  getMyBadges: jest.fn(),
  getOrgBadges: jest.fn(),
  createBadge: jest.fn(),
  updateBadge: jest.fn(),
  deleteBadge: jest.fn(),
};

const mockPrisma = {
  organization: { findFirst: jest.fn() },
};

describe('BadgeController', () => {
  let controller: BadgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadgeController],
      providers: [
        { provide: BadgeService, useValue: mockBadgeService },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    controller = module.get<BadgeController>(BadgeController);
    jest.clearAllMocks();
  });

  it('getMyBadges delegates to service', () => {
    mockBadgeService.getMyBadges.mockResolvedValue([]);
    const req = { user: { id: 'uid' } } as any;
    expect(controller.getMyBadges(req)).resolves.toEqual([]);
  });

  it('getOrgBadges delegates to service', () => {
    mockBadgeService.getOrgBadges.mockResolvedValue([]);
    expect(controller.getOrgBadges('org-key')).resolves.toEqual([]);
  });

  it('createBadge resolves orgId and delegates', async () => {
    mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
    mockBadgeService.createBadge.mockResolvedValue({ id: 1 });
    const dto = { name: 'B', description: 'd', type: 'progress', conditionType: 'course_completed' } as any;
    const result = await controller.createBadge('org-key', dto);
    expect(dto.orgId).toBe(1);
    expect(result.id).toBe(1);
  });

  it('createBadge throws when org not found', async () => {
    mockPrisma.organization.findFirst.mockResolvedValue(null);
    await expect(controller.createBadge('invalid', {} as any)).rejects.toThrow(NotFoundException);
  });

  it('updateBadge delegates to service', () => {
    mockBadgeService.updateBadge.mockResolvedValue({ id: 1 });
    expect(controller.updateBadge(1, { name: 'Updated' })).resolves.toEqual({ id: 1 });
  });

  it('deleteBadge delegates to service', () => {
    mockBadgeService.deleteBadge.mockResolvedValue({ id: 1 });
    expect(controller.deleteBadge(1)).resolves.toEqual({ id: 1 });
  });
});
