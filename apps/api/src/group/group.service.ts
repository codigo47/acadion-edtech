import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateGroupDto,
  UpdateGroupDto,
  AddGroupMemberDto,
} from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getOrgGroups(orgKey: string) {
    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');

    return this.prisma.group.findMany({
      where: { orgId: org.id },
      include: {
        _count: {
          select: { members: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getGroupDetail(groupId: number) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async createGroup(orgKey: string, dto: CreateGroupDto) {
    const org = await this.prisma.organization.findFirst({
      where: { key: orgKey },
    });
    if (!org) throw new NotFoundException('Organization not found');

    return this.prisma.group.create({
      data: {
        orgId: org.id,
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async updateGroup(groupId: number, dto: UpdateGroupDto) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) throw new NotFoundException('Group not found');

    return this.prisma.group.update({
      where: { id: groupId },
      data: dto,
    });
  }

  async deleteGroup(groupId: number) {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) throw new NotFoundException('Group not found');

    return this.prisma.group.delete({
      where: { id: groupId },
    });
  }

  async addMember(groupId: number, dto: AddGroupMemberDto) {
    return this.prisma.userGroup.create({
      data: {
        groupId,
        userId: dto.userId,
      },
    });
  }

  async removeMember(groupId: number, userId: string) {
    return this.prisma.userGroup.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
      },
    });
  }
}
