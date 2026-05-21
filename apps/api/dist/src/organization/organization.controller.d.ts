import type { Request as ExpressRequest } from 'express';
import { OrganizationService } from './organization.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateOrganizationDto, InviteMemberDto, UpdateMemberRoleDto, AcceptInvitationDto, BulkInviteMembersDto } from './dto/organization.dto';
interface RequestWithUser extends ExpressRequest {
    user: {
        id: string;
    };
}
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    create(req: RequestWithUser, dto: CreateOrganizationDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        logo: string | null;
        key: string;
        slug: string;
    }>;
    getMyOrganizations(req: RequestWithUser): Promise<{
        id: number;
        name: string;
        key: string;
        memberCount: number;
        myRole: import("@prisma/client").$Enums.OrgRole;
    }[]>;
    acceptInvitation(req: RequestWithUser, dto: AcceptInvitationDto): Promise<{
        message: string;
        orgName: string;
    }>;
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
    getMembers(key: string, pagination: PaginationDto): Promise<import("../common/dto/pagination.dto").PaginatedResponse<any>>;
    bulkInviteMembers(key: string, dto: BulkInviteMembersDto, req: RequestWithUser): Promise<{
        email: string;
        name: string;
        role: string;
        status: string;
    }[]>;
    inviteMember(key: string, dto: InviteMemberDto): Promise<{
        message: string;
        userId: string;
        email?: undefined;
    } | {
        message: string;
        email: string;
        userId?: undefined;
    }>;
    updateMemberRole(key: string, userId: string, dto: UpdateMemberRoleDto): Promise<{
        role: import("@prisma/client").$Enums.OrgRole;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orgId: number;
    }>;
    removeMember(key: string, userId: string): Promise<{
        role: import("@prisma/client").$Enums.OrgRole;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        orgId: number;
    }>;
}
export {};
