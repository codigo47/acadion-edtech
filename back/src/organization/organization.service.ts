import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { EmailService } from '../email/email.service';
import {
  CreateOrganizationDto,
  InviteMemberDto,
  UpdateMemberRoleDto,
} from './dto/organization.dto';
import { OrgRole, NotificationType } from '@prisma/client';
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';

@Injectable()
export class OrganizationService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
    private emailService: EmailService,
  ) {}

  private generateSlug(name: string): string {
    return (
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Date.now().toString(36)
    );
  }

  async create(userId: string, dto: CreateOrganizationDto) {
    const slug = this.generateSlug(dto.name);
    const org = await this.prisma.organization.create({
      data: {
        name: dto.name,
        slug,
        logo: dto.logo,
      },
    });

    await this.prisma.userOrganization.create({
      data: {
        userId,
        orgId: org.id,
        role: OrgRole.super_admin,
      },
    });

    return org;
  }

  async getUserOrganizations(userId: string) {
    const memberships = await this.prisma.userOrganization.findMany({
      where: { userId },
      include: {
        organization: {
          include: {
            _count: { select: { users: true } },
          },
        },
      },
    });

    return memberships.map((m) => ({
      id: m.organization.id,
      name: m.organization.name,
      key: m.organization.key,
      memberCount: m.organization._count.users,
      myRole: m.role,
    }));
  }

  async getOrganization(key: string) {
    const org = await this.prisma.organization.findFirst({
      where: { key },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!org) throw new NotFoundException('Organization not found');

    return {
      id: org.id,
      name: org.name,
      key: org.key,
      members: org.users.map((u) => ({
        id: u.orgId + '-' + u.userId,
        userId: u.userId,
        role: u.role,
        user: u.user,
      })),
    };
  }

  async getMembers(orgKey: string, pagination: PaginationDto): Promise<PaginatedResponse<any>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');

    const where = { orgId: org.id };

    const [members, total] = await Promise.all([
      this.prisma.userOrganization.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              username: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      this.prisma.userOrganization.count({ where }),
    ]);

    const data = members.map((u) => ({
      id: u.orgId + '-' + u.userId,
      userId: u.userId,
      role: u.role,
      user: u.user,
    }));

    return { data, total, page, limit };
  }

  async inviteMember(orgKey: string, dto: InviteMemberDto) {
    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user) {
      const existing = await this.prisma.userOrganization.findUnique({
        where: { userId_orgId: { userId: user.id, orgId: org.id } },
      });

      if (existing) throw new ConflictException('User is already a member');

      await this.prisma.userOrganization.create({
        data: {
          userId: user.id,
          orgId: org.id,
          role: dto.role as OrgRole,
        },
      });

      await this.notificationService.create(
        user.id,
        NotificationType.invitation,
        { message: `You were added to ${org.name}`, orgId: org.id },
      );

      return { message: 'Member added successfully', userId: user.id };
    }

    // User doesn't exist - create invitation and send email
    const existingInvite = await this.prisma.invitation.findFirst({
      where: { email: dto.email, orgId: org.id, status: 'pending' },
    });

    if (existingInvite) {
      throw new ConflictException('An invitation has already been sent to this email');
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const invitation = await this.prisma.invitation.create({
      data: {
        email: dto.email,
        role: dto.role as OrgRole,
        orgId: org.id,
        expiresAt,
      },
    });

    await this.emailService.sendInvitationEmail(
      dto.email,
      org.name,
      dto.role,
      invitation.token,
    );

    return { message: 'Invitation sent', email: dto.email };
  }

  async updateMemberRole(
    orgKey: string,
    userId: string,
    dto: UpdateMemberRoleDto,
  ) {
    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');

    return this.prisma.userOrganization.update({
      where: { userId_orgId: { userId, orgId: org.id } },
      data: { role: dto.role as OrgRole },
    });
  }

  async acceptInvitation(token: string, userId: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { token },
      include: { org: true },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.status !== 'pending') {
      throw new BadRequestException('Invitation is no longer valid');
    }

    if (new Date() > invitation.expiresAt) {
      await this.prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'expired' },
      });
      throw new BadRequestException('Invitation has expired');
    }

    const existing = await this.prisma.userOrganization.findUnique({
      where: { userId_orgId: { userId, orgId: invitation.orgId } },
    });

    if (!existing) {
      await this.prisma.userOrganization.create({
        data: {
          userId,
          orgId: invitation.orgId,
          role: invitation.role,
        },
      });
    }

    await this.prisma.invitation.update({
      where: { id: invitation.id },
      data: { status: 'accepted' },
    });

    await this.notificationService.create(
      userId,
      NotificationType.invitation,
      { message: `You joined ${invitation.org.name}`, orgId: invitation.orgId },
    );

    return { message: 'Invitation accepted', orgName: invitation.org.name };
  }

  async acceptPendingInvitations(userId: string, email: string) {
    const pendingInvitations = await this.prisma.invitation.findMany({
      where: { email, status: 'pending', expiresAt: { gt: new Date() } },
      include: { org: true },
    });

    for (const invitation of pendingInvitations) {
      const existing = await this.prisma.userOrganization.findUnique({
        where: { userId_orgId: { userId, orgId: invitation.orgId } },
      });

      if (!existing) {
        await this.prisma.userOrganization.create({
          data: {
            userId,
            orgId: invitation.orgId,
            role: invitation.role,
          },
        });

        await this.notificationService.create(
          userId,
          NotificationType.invitation,
          { message: `You were added to ${invitation.org.name}`, orgId: invitation.orgId },
        );
      }

      await this.prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'accepted' },
      });
    }

    return pendingInvitations.length;
  }

  async bulkInviteMembers(
    orgKey: string,
    members: Array<{ email: string; name: string; role: string }>,
    inviterId: string,
  ) {
    const results: Array<{ email: string; name: string; role: string; status: string }> = [];

    for (const member of members) {
      try {
        await this.inviteMember(orgKey, {
          email: member.email,
          role: member.role,
        } as InviteMemberDto);
        results.push({ ...member, status: 'invited' });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        results.push({ ...member, status: `error: ${message}` });
      }
    }

    return results;
  }

  async removeMember(orgKey: string, userId: string) {
    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');

    return this.prisma.userOrganization.delete({
      where: { userId_orgId: { userId, orgId: org.id } },
    });
  }
}
