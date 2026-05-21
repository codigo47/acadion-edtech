import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';
import { CreateLearningPlanDto, UpdateLearningPlanDto, AddPlanCourseDto, ReorderPlanCoursesDto, AssignPlanDto, AssignPlanToGroupDto } from './dto/learning-plan.dto';
export declare class LearningPlanService {
    private prisma;
    private notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    getMyPlans(userId: string, pagination: PaginationDto): Promise<PaginatedResponse<any>>;
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
    getPlanDetail(planId: number): Promise<{
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
    updatePlan(planId: number, dto: UpdateLearningPlanDto): Promise<{
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
    deletePlan(planId: number): Promise<{
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
    addCourse(planId: number, dto: AddPlanCourseDto): Promise<{
        courseId: number;
        required: boolean;
        order: number;
        learningPlanId: number;
    }>;
    removeCourse(planId: number, courseId: number): Promise<{
        courseId: number;
        required: boolean;
        order: number;
        learningPlanId: number;
    }>;
    reorderCourses(planId: number, dto: ReorderPlanCoursesDto): Promise<{
        courseId: number;
        required: boolean;
        order: number;
        learningPlanId: number;
    }[]>;
    assignToUser(planId: number, dto: AssignPlanDto): Promise<{
        id: number;
        userId: string;
        completedAt: Date | null;
        learningPlanId: number;
        enrolledAt: Date;
        deadline: Date | null;
    }>;
    assignToGroup(planId: number, dto: AssignPlanToGroupDto): Promise<{
        assigned: number;
        total: number;
    }>;
    getStudentPlanDetail(planId: number, userId: string): Promise<{
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
    bulkAssignPlan(planId: number, users: Array<{
        email: string;
    }>, deadline: string | undefined, assignerId: string): Promise<{
        email: string;
        status: string;
    }[]>;
}
