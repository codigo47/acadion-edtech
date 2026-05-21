import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { CreateBadgeDto, UpdateBadgeDto } from './dto/badge.dto';
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';
interface BadgeEvent {
    type: string;
    courseId?: number;
    score?: number;
    learningPlanId?: number;
    orgId?: number;
}
export declare class BadgeService {
    private prisma;
    private notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    getMyBadges(userId: string): Promise<({
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
    getAllBadges(userId: string, pagination: PaginationDto): Promise<PaginatedResponse<any>>;
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
    createBadge(dto: CreateBadgeDto): Promise<{
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
    awardBadge(badgeId: number, userId: string): Promise<{
        id: number;
        userId: string;
        badgeId: number;
        earnedAt: Date;
    }>;
    evaluateAndGrantBadges(userId: string, event: BadgeEvent): Promise<void>;
    private evaluateCondition;
}
export {};
