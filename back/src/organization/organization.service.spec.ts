import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  organization: { create: jest.fn(), findFirst: jest.fn() },
  userOrganization: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn(), update: jest.fn(), delete: jest.fn() },
  user: { findUnique: jest.fn() },
};

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<OrganizationService>(OrganizationService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('creates org and adds user as super_admin', async () => {
      mockPrisma.organization.create.mockResolvedValue({ id: 1, name: 'Test Org', slug: 'test-org-abc' });
      mockPrisma.userOrganization.create.mockResolvedValue({});
      const result = await service.create('uid', { name: 'Test Org' });
      expect(result.name).toBe('Test Org');
      expect(mockPrisma.userOrganization.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ role: 'super_admin' }) }),
      );
    });
  });

  describe('getUserOrganizations', () => {
    it('returns user memberships with org details', async () => {
      mockPrisma.userOrganization.findMany.mockResolvedValue([
        { role: 'org_admin', organization: { id: 1, name: 'Org', key: 'org-1', _count: { users: 5 } } },
      ]);
      const result = await service.getUserOrganizations('uid');
      expect(result).toHaveLength(1);
      expect(result[0].myRole).toBe('org_admin');
      expect(result[0].memberCount).toBe(5);
    });
  });

  describe('getOrganization', () => {
    it('returns org with members', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({
        id: 1, name: 'Org', key: 'org-1',
        users: [{ orgId: 1, userId: 'u1', role: 'student', user: { id: 'u1', name: 'User', email: 'u@t.com', image: null, username: 'u1' } }],
      });
      const result = await service.getOrganization('org-1');
      expect(result.members).toHaveLength(1);
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);
      await expect(service.getOrganization('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('inviteMember', () => {
    it('adds existing user to org', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'u1' });
      mockPrisma.userOrganization.findUnique.mockResolvedValue(null);
      mockPrisma.userOrganization.create.mockResolvedValue({});
      const result = await service.inviteMember('org-key', { email: 'u@t.com', role: 'student' });
      expect(result.message).toBe('Member added successfully');
    });

    it('returns invitation message when user not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.user.findUnique.mockResolvedValue(null);
      const result = await service.inviteMember('org-key', { email: 'new@t.com', role: 'student' });
      expect(result.message).toBe('Invitation sent to email');
    });

    it('throws ConflictException when user is already member', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'u1' });
      mockPrisma.userOrganization.findUnique.mockResolvedValue({ id: 1 });
      await expect(service.inviteMember('org-key', { email: 'u@t.com', role: 'student' })).rejects.toThrow(ConflictException);
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);
      await expect(service.inviteMember('invalid', { email: 'u@t.com', role: 'student' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateMemberRole', () => {
    it('updates member role', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.userOrganization.update.mockResolvedValue({ role: 'editor' });
      const result = await service.updateMemberRole('org-key', 'u1', { role: 'editor' });
      expect(result.role).toBe('editor');
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);
      await expect(service.updateMemberRole('invalid', 'u1', { role: 'editor' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeMember', () => {
    it('removes member from org', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1 });
      mockPrisma.userOrganization.delete.mockResolvedValue({});
      await service.removeMember('org-key', 'u1');
      expect(mockPrisma.userOrganization.delete).toHaveBeenCalled();
    });

    it('throws NotFoundException when org not found', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue(null);
      await expect(service.removeMember('invalid', 'u1')).rejects.toThrow(NotFoundException);
    });
  });
});
