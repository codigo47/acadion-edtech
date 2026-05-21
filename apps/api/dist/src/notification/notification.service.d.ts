import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserNotifications(userId: string, pagination: PaginationDto): Promise<PaginatedResponse<any>>;
    markAsRead(id: number, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    getUnreadCount(userId: string): Promise<number>;
    create(userId: string, type: NotificationType, data: object): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue;
        id: number;
        createdAt: Date;
        userId: string;
        type: import("@prisma/client").$Enums.NotificationType;
        readAt: Date | null;
    }>;
}
