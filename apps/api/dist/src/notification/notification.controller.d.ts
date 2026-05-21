import type { Request as ExpressRequest } from 'express';
import { NotificationService } from './notification.service';
import { PaginationDto } from '../common/dto/pagination.dto';
interface RequestWithUser extends ExpressRequest {
    user: {
        id: string;
    };
}
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getAll(req: RequestWithUser, pagination: PaginationDto): Promise<import("../common/dto/pagination.dto").PaginatedResponse<any>>;
    getUnreadCount(req: RequestWithUser): Promise<{
        count: number;
    }>;
    markAsRead(id: number, req: RequestWithUser): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(req: RequestWithUser): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
export {};
