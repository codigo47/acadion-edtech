import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { EmailService } from '../email/email.service';
import { CreateOrganizationDto, InviteMemberDto, UpdateMemberRoleDto } from './dto/organization.dto';
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';
export declare class OrganizationService {
    private prisma;
    private notificationService;
    private emailService;
    constructor(prisma: PrismaService, notificationService: NotificationService, emailService: EmailService);
    private generateSlug;
    create(userId: string, dto: CreateOrganizationDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        logo: string | null;
        key: string;
        slug: string;
    }>;
    getUserOrganizations(userId: string): Promise<{
        id: number;
        name: string;
        key: string;
        memberCount: number;
        myRole: import("@prisma/client").$Enums.OrgRole;
    }[]>;
    getOrganization(key: string): Promise<{
        id: number;
        name: string;
        key: string;
        members: {
            id: string;
            userId: string;
            role: import("@prisma/client").$Enums.OrgRole;
            user: {
                username: string | null;
                name: string | null;
                id: string;
                email: string;
                image: string | null;
            };
        }[];
    }>;
    getMembers(orgKey: string, pagination: PaginationDto): Promise<PaginatedResponse<any>>;
    inviteMember(orgKey: string, dto: InviteMemberDto): Promise<{
        message: string;
        userId: string;
        email?: undefined;
    } | {
        message: string;
        email: string;
        userId?: undefined;
    }>;
    updateMemberRole(orgKey: string, userId: string, dto: UpdateMemberRoleDto): Promise<{
        role: import("@prisma/client").$Enums.OrgRole;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orgId: number;
    }>;
    acceptInvitation(token: string, userId: string): Promise<{
        message: string;
        orgName: string;
    }>;
    acceptPendingInvitations(userId: string, email: string): Promise<number>;
    bulkInviteMembers(orgKey: string, members: Array<{
        email: string;
        name: string;
        role: string;
    }>, inviterId: string): Promise<{
        email: string;
        name: string;
        role: string;
        status: string;
    }[]>;
    removeMember(orgKey: string, userId: string): Promise<{
        role: import("@prisma/client").$Enums.OrgRole;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orgId: number;
    }>;
}
