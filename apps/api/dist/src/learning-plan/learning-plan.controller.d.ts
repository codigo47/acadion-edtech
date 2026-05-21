import type { Request as ExpressRequest } from 'express';
import { LearningPlanService } from './learning-plan.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateLearningPlanDto, UpdateLearningPlanDto, AddPlanCourseDto, ReorderPlanCoursesDto, AssignPlanDto, AssignPlanToGroupDto, BulkAssignPlanDto } from './dto/learning-plan.dto';
interface RequestWithUser extends ExpressRequest {
    user: {
        id: string;
    };
}
export declare class LearningPlanController {
    private readonly learningPlanService;
    constructor(learningPlanService: LearningPlanService);
    getMyPlans(req: RequestWithUser, pagination: PaginationDto): Promise<import("../common/dto/pagination.dto").PaginatedResponse<any>>;
    getOrgPlans(orgKey: string): Promise<({
        _count: {
            courses: number;
            enrollments: number;
        };
    } & {
        name: string;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
        badgeName: string | null;
        badgeImage: string | null;
        estimatedDays: number | null;
        isCorrelative: boolean;
        isOptional: boolean;
        parentId: number | null;
    })[]>;
    getPlanDetail(id: number): Promise<{
        courses: ({
            course: {
                id: number;
                key: string;
                status: import("@prisma/client").$Enums.CourseStatus;
                title: string | null;
            };
        } & {
            courseId: number;
            required: boolean;
            order: number;
            learningPlanId: number;
        })[];
        enrollments: ({
            user: {
                name: string | null;
                id: string;
                email: string;
                image: string | null;
            };
        } & {
            id: number;
            userId: string;
            completedAt: Date | null;
            learningPlanId: number;
            enrolledAt: Date;
            deadline: Date | null;
        })[];
        _count: {
            enrollments: number;
        };
        org: {
            name: string;
            key: string;
        };
        children: {
            name: string;
            id: number;
            image: string | null;
            createdAt: Date;
            updatedAt: Date;
            key: string;
            orgId: number;
            description: string | null;
            badgeName: string | null;
            badgeImage: string | null;
            estimatedDays: number | null;
            isCorrelative: boolean;
            isOptional: boolean;
            parentId: number | null;
        }[];
    } & {
        name: string;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
        badgeName: string | null;
        badgeImage: string | null;
        estimatedDays: number | null;
        isCorrelative: boolean;
        isOptional: boolean;
        parentId: number | null;
    }>;
    createPlan(orgKey: string, dto: CreateLearningPlanDto): Promise<{
        name: string;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
        badgeName: string | null;
        badgeImage: string | null;
        estimatedDays: number | null;
        isCorrelative: boolean;
        isOptional: boolean;
        parentId: number | null;
    }>;
    updatePlan(id: number, dto: UpdateLearningPlanDto): Promise<{
        name: string;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
        badgeName: string | null;
        badgeImage: string | null;
        estimatedDays: number | null;
        isCorrelative: boolean;
        isOptional: boolean;
        parentId: number | null;
    }>;
    deletePlan(id: number): Promise<{
        name: string;
        id: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        key: string;
        orgId: number;
        description: string | null;
        badgeName: string | null;
        badgeImage: string | null;
        estimatedDays: number | null;
        isCorrelative: boolean;
        isOptional: boolean;
        parentId: number | null;
    }>;
    addCourse(id: number, dto: AddPlanCourseDto): Promise<{
        courseId: number;
        required: boolean;
        order: number;
        learningPlanId: number;
    }>;
    removeCourse(id: number, courseId: number): Promise<{
        courseId: number;
        required: boolean;
        order: number;
        learningPlanId: number;
    }>;
    reorderCourses(id: number, dto: ReorderPlanCoursesDto): Promise<{
        courseId: number;
        required: boolean;
        order: number;
        learningPlanId: number;
    }[]>;
    assignToUser(id: number, dto: AssignPlanDto): Promise<{
        id: number;
        userId: string;
        completedAt: Date | null;
        learningPlanId: number;
        enrolledAt: Date;
        deadline: Date | null;
    }>;
    assignToGroup(id: number, dto: AssignPlanToGroupDto): Promise<{
        assigned: number;
        total: number;
    }>;
    bulkAssignPlan(id: number, dto: BulkAssignPlanDto, req: RequestWithUser): Promise<{
        email: string;
        status: string;
    }[]>;
    getStudentPlanDetail(id: number, req: RequestWithUser): Promise<{
        id: number;
        key: string;
        name: string;
        description: string | null;
        image: string | null;
        badgeImage: string | null;
        badgeName: string | null;
        estimatedDays: number | null;
        isCorrelative: boolean;
        isOptional: boolean;
        enrollment: {
            enrolledAt: Date;
            deadline: Date | null;
            completedAt: Date | null;
        } | null;
        courses: {
            courseId: number;
            courseKey: string;
            courseTitle: string | null;
            courseStatus: import("@prisma/client").$Enums.CourseStatus;
            order: number;
            required: boolean;
            enrolled: boolean;
            startedAt: Date | null;
            completedAt: Date | null;
            passed: boolean | null;
            score: number | null;
            isCompleted: boolean;
            locked: boolean;
        }[];
    }>;
}
export {};
