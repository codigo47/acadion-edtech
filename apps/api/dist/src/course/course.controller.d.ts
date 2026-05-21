import { MessageEvent } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import type { Request as ExpressRequest } from 'express';
import { Observable } from 'rxjs';
import { CourseService } from './course.service';
import { CourseSSEService } from './course-sse.service';
interface AuthenticatedUser {
    id: string;
    email: string;
    name?: string;
}
interface RequestWithUser extends ExpressRequest {
    user: AuthenticatedUser;
}
import { TaskDto } from './dto/task.dto';
import { UpdateComponentDataDto, ReorderComponentsDto, SwitchStyleDto, CreateComponentDto } from './dto/course-component.dto';
export declare class CourseController {
    private readonly courseService;
    private readonly sseService;
    private readonly logger;
    constructor(courseService: CourseService, sseService: CourseSSEService);
    executeTask(taskDto: TaskDto): Promise<{
        courseKey: string;
        conversationKey: string;
    } | {
        success: boolean;
    }>;
    findAll(req: RequestWithUser, pagination: PaginationDto): Promise<import("../common/dto/pagination.dto").PaginatedResponse<any>>;
    findOne(key: string): Promise<{
        conversations: {
            messages: {
                sequence: number;
                role: import("@prisma/client").$Enums.MessageRole;
                id: string;
                createdAt: Date;
                metadata: import("@prisma/client/runtime/client").JsonValue | null;
                conversationId: string;
                content: string;
                modelName: string | null;
                tokensUsed: number | null;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string | null;
            isArchived: boolean;
            courseId: number | null;
        }[];
        steps: {
            error: import("@prisma/client/runtime/client").JsonValue | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: import("@prisma/client").$Enums.StepType;
            status: import("@prisma/client").$Enums.StepStatus;
            courseId: number;
            payload: import("@prisma/client/runtime/client").JsonValue | null;
            completionTokens: number | null;
            promptTokens: number | null;
        }[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        key: string;
        orgId: number | null;
        status: import("@prisma/client").$Enums.CourseStatus;
        title: string | null;
        completedAt: Date | null;
        input: import("@prisma/client/runtime/client").JsonValue | null;
        output: import("@prisma/client/runtime/client").JsonValue | null;
        estimatedMinutes: number | null;
        isAdaptive: boolean;
    }>;
    getCourseComponents(key: string): Promise<{
        courseId: number;
        components: {
            id: number;
            module: number;
            unit: number;
            sequence: number;
            componentId: number;
            componentName: string;
            componentType: import("@prisma/client").$Enums.ComponentType;
            groupKey: string | null;
            data: import("@prisma/client/runtime/client").JsonValue;
            name: string;
        }[];
        groupVariants: {
            componentId: number;
            componentName: string;
            name: string;
            groupKey: string;
        }[];
    }>;
    createComponent(key: string, dto: CreateComponentDto, req: RequestWithUser): Promise<{
        id: number;
        module: number;
        unit: number;
        sequence: number;
        componentId: number;
        componentName: string;
        componentType: import("@prisma/client").$Enums.ComponentType;
        groupKey: string | null;
        data: import("@prisma/client/runtime/client").JsonValue;
        name: string;
    }>;
    updateComponentData(id: string, dto: UpdateComponentDataDto): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sequence: number;
        courseId: number;
        componentId: number;
        module: number;
        unit: number;
    }>;
    deleteComponent(id: string): Promise<{
        success: boolean;
    }>;
    duplicateComponent(id: string): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sequence: number;
        courseId: number;
        componentId: number;
        module: number;
        unit: number;
    }>;
    reorderComponents(key: string, dto: ReorderComponentsDto): Promise<{
        success: boolean;
    }>;
    switchComponentStyle(id: string, dto: SwitchStyleDto): Promise<{
        data: import("@prisma/client/runtime/client").JsonValue | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sequence: number;
        courseId: number;
        componentId: number;
        module: number;
        unit: number;
    }>;
    events(key: string): Observable<MessageEvent>;
}
export {};
