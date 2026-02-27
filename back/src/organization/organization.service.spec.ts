import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { EmailService } from '../email/email.service';

const mockPrisma = {
  organization: { create: jest.fn(), findFirst: jest.fn() },
  userOrganization: { create: jest.fn(), findMany: jest.fn(), findUnique: jest.fn(), update: jest.fn(), delete: jest.fn() },
  user: { findUnique: jest.fn() },
  invitation: { create: jest.fn(), findFirst: jest.fn(), findUnique: jest.fn(), findMany: jest.fn(), update: jest.fn() },
  notification: { create: jest.fn() },
};

const mockNotificationService = {
  create: jest.fn(),
};

const mockEmailService = {
  sendInvitationEmail: jest.fn(),
};

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: EmailService, useValue: mockEmailService },
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
    it('adds existing user to org and sends notification', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1, name: 'Test Org' });
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'u1' });
      mockPrisma.userOrganization.findUnique.mockResolvedValue(null);
      mockPrisma.userOrganization.create.mockResolvedValue({});
      mockNotificationService.create.mockResolvedValue({});

      const result = await service.inviteMember('org-key', { email: 'u@t.com', role: 'student' });
      expect(result.message).toBe('Member added successfully');
      expect(mockNotificationService.create).toHaveBeenCalledWith(
        'u1',
        'invitation',
        expect.objectContaining({ message: 'You were added to Test Org' }),
      );
    });

    it('creates invitation and sends email when user does not exist', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1, name: 'Test Org' });
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.invitation.findFirst.mockResolvedValue(null);
      mockPrisma.invitation.create.mockResolvedValue({ id: 1, token: 'abc-token', email: 'new@t.com' });
      mockEmailService.sendInvitationEmail.mockResolvedValue(undefined);

      const result = await service.inviteMember('org-key', { email: 'new@t.com', role: 'student' });
      expect(result.message).toBe('Invitation sent');
      expect(result.email).toBe('new@t.com');
      expect(mockPrisma.invitation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ email: 'new@t.com', role: 'student', orgId: 1 }),
        }),
      );
      expect(mockEmailService.sendInvitationEmail).toHaveBeenCalledWith(
        'new@t.com', 'Test Org', 'student', 'abc-token',
      );
    });

    it('throws ConflictException when pending invitation already exists', async () => {
      mockPrisma.organization.findFirst.mockResolvedValue({ id: 1, name: 'Test Org' });
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.invitation.findFirst.mockResolvedValue({ id: 1 });

      await expect(
        service.inviteMember('org-key', { email: 'new@t.com', role: 'student' }),
      ).rejects.toThrow(ConflictException);
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

  describe('acceptInvitation', () => {
    it('accepts a valid invitation and adds user to org', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      mockPrisma.invitation.findUnique.mockResolvedValue({
        id: 1, token: 'token', status: 'pending', orgId: 1, role: 'student',
        expiresAt: futureDate, org: { name: 'Test Org' },
      });
      mockPrisma.userOrganization.findUnique.mockResolvedValue(null);
      mockPrisma.userOrganization.create.mockResolvedValue({});
      mockPrisma.invitation.update.mockResolvedValue({});
      mockNotificationService.create.mockResolvedValue({});

      const result = await service.acceptInvitation('token', 'u1');
      expect(result.message).toBe('Invitation accepted');
      expect(result.orgName).toBe('Test Org');
      expect(mockPrisma.userOrganization.create).toHaveBeenCalled();
      expect(mockPrisma.invitation.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: 'accepted' } }),
      );
    });

    it('throws NotFoundException when invitation not found', async () => {
      mockPrisma.invitation.findUnique.mockResolvedValue(null);
      await expect(service.acceptInvitation('invalid', 'u1')).rejects.toThrow(NotFoundException);
    });

    it('throws BadRequestException when invitation is already accepted', async () => {
      mockPrisma.invitation.findUnique.mockResolvedValue({
        id: 1, token: 'token', status: 'accepted', orgId: 1,
        expiresAt: new Date(), org: { name: 'Test Org' },
      });
      await expect(service.acceptInvitation('token', 'u1')).rejects.toThrow(BadRequestException);
    });

    it('throws BadRequestException and marks expired when invitation has expired', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      mockPrisma.invitation.findUnique.mockResolvedValue({
        id: 1, token: 'token', status: 'pending', orgId: 1,
        expiresAt: pastDate, org: { name: 'Test Org' },
      });
      mockPrisma.invitation.update.mockResolvedValue({});

      await expect(service.acceptInvitation('token', 'u1')).rejects.toThrow(BadRequestException);
      expect(mockPrisma.invitation.update).toHaveBeenCalledWith(
        expect.objectContaining({ data: { status: 'expired' } }),
      );
    });
  });

  describe('acceptPendingInvitations', () => {
    it('auto-accepts all pending invitations for an email', async () => {
      mockPrisma.invitation.findMany.mockResolvedValue([
        { id: 1, orgId: 1, role: 'student', org: { name: 'Org A' } },
        { id: 2, orgId: 2, role: 'editor', org: { name: 'Org B' } },
      ]);
      mockPrisma.userOrganization.findUnique.mockResolvedValue(null);
      mockPrisma.userOrganization.create.mockResolvedValue({});
      mockPrisma.invitation.update.mockResolvedValue({});
      mockNotificationService.create.mockResolvedValue({});

      const count = await service.acceptPendingInvitations('u1', 'u@t.com');
      expect(count).toBe(2);
      expect(mockPrisma.userOrganization.create).toHaveBeenCalledTimes(2);
      expect(mockNotificationService.create).toHaveBeenCalledTimes(2);
      expect(mockPrisma.invitation.update).toHaveBeenCalledTimes(2);
    });

    it('returns 0 when no pending invitations exist', async () => {
      mockPrisma.invitation.findMany.mockResolvedValue([]);
      const count = await service.acceptPendingInvitations('u1', 'u@t.com');
      expect(count).toBe(0);
    });

    it('skips creating membership if user already belongs to org', async () => {
      mockPrisma.invitation.findMany.mockResolvedValue([
        { id: 1, orgId: 1, role: 'student', org: { name: 'Org A' } },
      ]);
      mockPrisma.userOrganization.findUnique.mockResolvedValue({ userId: 'u1', orgId: 1 });
      mockPrisma.invitation.update.mockResolvedValue({});
      mockNotificationService.create.mockResolvedValue({});

      const count = await service.acceptPendingInvitations('u1', 'u@t.com');
      expect(count).toBe(1);
      expect(mockPrisma.userOrganization.create).not.toHaveBeenCalled();
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
