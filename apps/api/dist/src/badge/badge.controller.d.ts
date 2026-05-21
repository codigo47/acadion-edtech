import type { Request as ExpressRequest } from 'express';
import { BadgeService } from './badge.service';
import { CreateBadgeDto, UpdateBadgeDto, AwardBadgeDto } from './dto/badge.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from '../common/dto/pagination.dto';
interface RequestWithUser extends ExpressRequest {
    user: {
        id: string;
    };
}
export declare class BadgeController {
    private readonly badgeService;
    private readonly prisma;
    constructor(badgeService: BadgeService, prisma: PrismaService);
    getMyBadges(req: RequestWithUser): Promise<({
        badge: {
            name: string;
            isActive: boolean;
            id: number;
            image: string | null;
            createdAt: Date;
            type: import("@prisma/client").$Enums.BadgeType;
            key: string;
            orgId: number | null;
            description: string | null;
            isPublic: boolean;
            conditionType: string;
            conditionValue: import("@prisma/client/runtime/client").JsonValue | null;
            targetId: number | null;
        };
    } & {
        id: number;
        userId: string;
        badgeId: number;
        earnedAt: Date;
    })[]>;
    getAllBadges(req: RequestWithUser, pagination: PaginationDto): Promise<import("../common/dto/pagination.dto").PaginatedResponse<any>>;
    getOrgBadges(orgKey: string): Promise<({
        _count: {
            userBadges: number;
        };
    } & {
        name: string;
        isActive: boolean;
        id: number;
        image: string | null;
        createdAt: Date;
        type: import("@prisma/client").$Enums.BadgeType;
        key: string;
        orgId: number | null;
        description: string | null;
        isPublic: boolean;
        conditionType: string;
        conditionValue: import("@prisma/client/runtime/client").JsonValue | null;
        targetId: number | null;
    })[]>;
    getBadgeDetail(id: number): Promise<{
        _count: {
            userBadges: number;
        };
        org: {
            name: string;
            key: string;
        } | null;
        userBadges: ({
            user: {
                name: string | null;
                id: string;
                email: string;
                image: string | null;
            };
        } & {
            id: number;
            userId: string;
            badgeId: number;
            earnedAt: Date;
        })[];
    } & {
        name: string;
        isActive: boolean;
        id: number;
        image: string | null;
        createdAt: Date;
        type: import("@prisma/client").$Enums.BadgeType;
        key: string;
        orgId: number | null;
        description: string | null;
        isPublic: boolean;
        conditionType: string;
        conditionValue: import("@prisma/client/runtime/client").JsonValue | null;
        targetId: number | null;
    }>;
    createBadge(orgKey: string, dto: CreateBadgeDto): Promise<{
        name: string;
        isActive: boolean;
        id: number;
        image: string | null;
        createdAt: Date;
        type: import("@prisma/client").$Enums.BadgeType;
        key: string;
        orgId: number | null;
        description: string | null;
        isPublic: boolean;
        conditionType: string;
        conditionValue: import("@prisma/client/runtime/client").JsonValue | null;
        targetId: number | null;
    }>;
    updateBadge(id: number, dto: UpdateBadgeDto): Promise<{
        name: string;
        isActive: boolean;
        id: number;
        image: string | null;
        createdAt: Date;
        type: import("@prisma/client").$Enums.BadgeType;
        key: string;
        orgId: number | null;
        description: string | null;
        isPublic: boolean;
        conditionType: string;
        conditionValue: import("@prisma/client/runtime/client").JsonValue | null;
        targetId: number | null;
    }>;
    deleteBadge(id: number): Promise<{
        name: string;
        isActive: boolean;
        id: number;
        image: string | null;
        createdAt: Date;
        type: import("@prisma/client").$Enums.BadgeType;
        key: string;
        orgId: number | null;
        description: string | null;
        isPublic: boolean;
        conditionType: string;
        conditionValue: import("@prisma/client/runtime/client").JsonValue | null;
        targetId: number | null;
    }>;
    duplicateBadge(id: number): Promise<{
        name: string;
        isActive: boolean;
        id: number;
        image: string | null;
        createdAt: Date;
        type: import("@prisma/client").$Enums.BadgeType;
        key: string;
        orgId: number | null;
        description: string | null;
        isPublic: boolean;
        conditionType: string;
        conditionValue: import("@prisma/client/runtime/client").JsonValue | null;
        targetId: number | null;
    }>;
    awardBadge(id: number, dto: AwardBadgeDto): Promise<{
        id: number;
        userId: string;
        badgeId: number;
        earnedAt: Date;
    }>;
}
export {};
