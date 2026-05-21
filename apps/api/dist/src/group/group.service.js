"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GroupService = class GroupService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrgGroups(orgKey) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
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
    async getGroupDetail(groupId) {
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
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        return group;
    }
    async createGroup(orgKey, dto) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        return this.prisma.group.create({
            data: {
                orgId: org.id,
                name: dto.name,
                description: dto.description,
            },
        });
    }
    async updateGroup(groupId, dto) {
        const group = await this.prisma.group.findUnique({
            where: { id: groupId },
        });
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        return this.prisma.group.update({
            where: { id: groupId },
            data: dto,
        });
    }
    async deleteGroup(groupId) {
        const group = await this.prisma.group.findUnique({
            where: { id: groupId },
        });
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        return this.prisma.group.delete({
            where: { id: groupId },
        });
    }
    async addMember(groupId, dto) {
        return this.prisma.userGroup.create({
            data: {
                groupId,
                userId: dto.userId,
            },
        });
    }
    async removeMember(groupId, userId) {
        return this.prisma.userGroup.delete({
            where: {
                userId_groupId: {
                    userId,
                    groupId,
                },
            },
        });
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupService);
//# sourceMappingURL=group.service.js.map