export declare enum BadgeTypeEnum {
    progress = "progress",
    level = "level",
    excellence = "excellence",
    role = "role"
}
export declare class CreateBadgeDto {
    name: string;
    description?: string;
    image?: string;
    type: BadgeTypeEnum;
    conditionType: string;
    conditionValue?: Record<string, any>;
    targetId?: number;
    isPublic?: boolean;
    orgId?: number;
}
export declare class UpdateBadgeDto {
    name?: string;
    description?: string;
    image?: string;
    type?: BadgeTypeEnum;
    conditionType?: string;
    conditionValue?: Record<string, any>;
    targetId?: number;
    isPublic?: boolean;
    isActive?: boolean;
}
export declare class AwardBadgeDto {
    userId: string;
}
