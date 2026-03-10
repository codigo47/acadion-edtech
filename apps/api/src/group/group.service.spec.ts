import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GroupService } from './group.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  organization: { findFirst: jest.fn() },
  group: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
  userGroup: { create: jest.fn(), delete: jest.fn() },
};

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<GroupService>(GroupService);
    jest.clearAllMocks();
  });

  describe('getOrgGroups', () => {
    it('returns groups for an org', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.group.findMany.mockResolvedValue([{ id: 1, name: 'Group A' }]);
      const result = await service.getOrgGroups('org-key');
      expect(result).toHaveLength(1);
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);
      await expect(service.getOrgGroups('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getGroupDetail', () => {
    it('returns group with members', async () => {
      mockPrisma.group.findUnique.mockResolvedValue({
        id: 1, name: 'Group A', members: [{ user: { id: 'u1', name: 'User' } }],
      });
      const result = await service.getGroupDetail(1);
      expect(result.members).toHaveLength(1);
    });

    it('throws NotFoundException when group not found', async () => {
      mockPrisma.group.findUnique.mockResolvedValue(null);
      await expect(service.getGroupDetail(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createGroup', () => {
    it('creates a group in org', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.group.create.mockResolvedValue({ id: 1, name: 'New Group', orgId: 1 });
      const result = await service.createGroup('org-key', { name: 'New Group' });
      expect(result.name).toBe('New Group');
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);
      await expect(service.createGroup('invalid', { name: 'G' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateGroup', () => {
    it('updates group', async () => {
      mockPrisma.group.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.group.update.mockResolvedValue({ id: 1, name: 'Updated' });
      const result = await service.updateGroup(1, { name: 'Updated' });
      expect(result.name).toBe('Updated');
    });

    it('throws NotFoundException when group not found', async () => {
      mockPrisma.group.findUnique.mockResolvedValue(null);
      await expect(service.updateGroup(999, { name: 'X' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteGroup', () => {
    it('deletes group', async () => {
      mockPrisma.group.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.group.delete.mockResolvedValue({ id: 1 });
      await service.deleteGroup(1);
      expect(mockPrisma.group.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('throws NotFoundException when group not found', async () => {
      mockPrisma.group.findUnique.mockResolvedValue(null);
      await expect(service.deleteGroup(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addMember', () => {
    it('adds user to group', async () => {
      mockPrisma.userGroup.create.mockResolvedValue({ groupId: 1, userId: 'u1' });
      const result = await service.addMember(1, { userId: 'u1' });
      expect(result.userId).toBe('u1');
    });
  });

  describe('removeMember', () => {
    it('removes user from group', async () => {
      mockPrisma.userGroup.delete.mockResolvedValue({});
      await service.removeMember(1, 'u1');
      expect(mockPrisma.userGroup.delete).toHaveBeenCalledWith({
        where: { userId_groupId: { userId: 'u1', groupId: 1 } },
      });
    });
  });
});
