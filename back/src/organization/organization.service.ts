import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateOrganizationDto,
  InviteMemberDto,
  UpdateMemberRoleDto,
} from './dto/organization.dto';
import { OrgRole } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

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

  async inviteMember(orgKey: string, dto: InviteMemberDto) {
    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return { message: 'Invitation sent to email', email: dto.email };
    }

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

    return { message: 'Member added successfully', userId: user.id };
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
