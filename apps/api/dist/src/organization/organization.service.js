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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
const email_service_1 = require("../email/email.service");
const client_1 = require("@prisma/client");
let OrganizationService = class OrganizationService {
    prisma;
    notificationService;
    emailService;
    constructor(prisma, notificationService, emailService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.emailService = emailService;
    }
    generateSlug(name) {
        return (name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') +
            '-' +
            Date.now().toString(36));
    }
    async create(userId, dto) {
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
                role: client_1.OrgRole.super_admin,
            },
        });
        return org;
    }
    async getUserOrganizations(userId) {
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
    async getOrganization(key) {
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
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
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
    async getMembers(orgKey, pagination) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
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
    async inviteMember(orgKey, dto) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (user) {
            const existing = await this.prisma.userOrganization.findUnique({
                where: { userId_orgId: { userId: user.id, orgId: org.id } },
            });
            if (existing)
                throw new common_1.ConflictException('User is already a member');
            await this.prisma.userOrganization.create({
                data: {
                    userId: user.id,
                    orgId: org.id,
                    role: dto.role,
                },
            });
            await this.notificationService.create(user.id, client_1.NotificationType.invitation, { message: `You were added to ${org.name}`, orgId: org.id });
            return { message: 'Member added successfully', userId: user.id };
        }
        const existingInvite = await this.prisma.invitation.findFirst({
            where: { email: dto.email, orgId: org.id, status: 'pending' },
        });
        if (existingInvite) {
            throw new common_1.ConflictException('An invitation has already been sent to this email');
        }
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const invitation = await this.prisma.invitation.create({
            data: {
                email: dto.email,
                role: dto.role,
                orgId: org.id,
                expiresAt,
            },
        });
        await this.emailService.sendInvitationEmail(dto.email, org.name, dto.role, invitation.token);
        return { message: 'Invitation sent', email: dto.email };
    }
    async updateMemberRole(orgKey, userId, dto) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        return this.prisma.userOrganization.update({
            where: { userId_orgId: { userId, orgId: org.id } },
            data: { role: dto.role },
        });
    }
    async acceptInvitation(token, userId) {
        const invitation = await this.prisma.invitation.findUnique({
            where: { token },
            include: { org: true },
        });
        if (!invitation) {
            throw new common_1.NotFoundException('Invitation not found');
        }
        if (invitation.status !== 'pending') {
            throw new common_1.BadRequestException('Invitation is no longer valid');
        }
        if (new Date() > invitation.expiresAt) {
            await this.prisma.invitation.update({
                where: { id: invitation.id },
                data: { status: 'expired' },
            });
            throw new common_1.BadRequestException('Invitation has expired');
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
        await this.notificationService.create(userId, client_1.NotificationType.invitation, { message: `You joined ${invitation.org.name}`, orgId: invitation.orgId });
        return { message: 'Invitation accepted', orgName: invitation.org.name };
    }
    async acceptPendingInvitations(userId, email) {
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
                await this.notificationService.create(userId, client_1.NotificationType.invitation, { message: `You were added to ${invitation.org.name}`, orgId: invitation.orgId });
            }
            await this.prisma.invitation.update({
                where: { id: invitation.id },
                data: { status: 'accepted' },
            });
        }
        return pendingInvitations.length;
    }
    async bulkInviteMembers(orgKey, members, inviterId) {
        const results = [];
        for (const member of members) {
            try {
                await this.inviteMember(orgKey, {
                    email: member.email,
                    role: member.role,
                });
                results.push({ ...member, status: 'invited' });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown error';
                results.push({ ...member, status: `error: ${message}` });
            }
        }
        return results;
    }
    async removeMember(orgKey, userId) {
        const org = await this.prisma.organization.findFirst({
            where: { key: orgKey },
        });
        if (!org)
            throw new common_1.NotFoundException('Organization not found');
        return this.prisma.userOrganization.delete({
            where: { userId_orgId: { userId, orgId: org.id } },
        });
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService,
        email_service_1.EmailService])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map