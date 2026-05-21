import { Queue } from 'bullmq';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto, GenerateTitleDto, SetAudienceDto, SetObjectiveDto, SetBuildingMethodDto, SetModulesDto, SetUnitsDto, SetBrandingDto } from './dto/create-course.dto';
import { CourseSSEService } from './course-sse.service';
import { PaginationDto, PaginatedResponse } from '../common/dto/pagination.dto';
export declare class CourseService {
    private prisma;
    private courseQueue;
    private sseService;
    constructor(prisma: PrismaService, courseQueue: Queue, sseService: CourseSSEService);
    private getNextSequence;
    private createMessage;
    create(createCourseDto: CreateCourseDto): Promise<{
        courseKey: string;
        conversationKey: string;
    }>;
    generateTitle(generateTitleDto: GenerateTitleDto): Promise<{
        success: boolean;
        aiMessage: string;
    }>;
    findByKey(key: string): Promise<{
        conversations: {
            messages: {
                sequence: number;
                role: import("@prisma/client").$Enums.MessageRole;
                id: string;
                createdAt: Date;
                metadata: Prisma.JsonValue | null;
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
            error: Prisma.JsonValue | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            type: import("@prisma/client").$Enums.StepType;
            status: import("@prisma/client").$Enums.StepStatus;
            courseId: number;
            payload: Prisma.JsonValue | null;
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
        input: Prisma.JsonValue | null;
        output: Prisma.JsonValue | null;
        estimatedMinutes: number | null;
        isAdaptive: boolean;
    }>;
    setAudience(setAudienceDto: SetAudienceDto): Promise<{
        success: boolean;
        aiMessage: string;
    }>;
    setObjective(setObjectiveDto: SetObjectiveDto): Promise<{
        success: boolean;
    }>;
    setBuildingMethod(courseKey: string, dto: SetBuildingMethodDto): Promise<{
        success: boolean;
        aiMessage: string;
        maxModules: number;
    }>;
    setModules(courseKey: string, dto: SetModulesDto): Promise<{
        success: boolean;
        aiMessage: string;
        modulesCount: number;
        maxUnits: number;
    }>;
    setUnits(courseKey: string, dto: SetUnitsDto): Promise<{
        success: boolean;
        modules: Record<number, {
            units: number;
        }>;
        aiMessage: string;
        nextScreen: string;
    }>;
    getExerciseTypes(courseKey: string, conversationKey: string): Promise<{
        success: boolean;
        aiMessage: string;
        exerciseTypes: {
            name: string;
            id: number;
        }[];
    }>;
    setEvaluation(courseKey: string, conversationKey: string, selectedComponents: Array<{
        id: number;
        name: string;
    }>): Promise<{
        success: boolean;
        aiMessage: string;
    }>;
    setEvaluationDetails(courseKey: string, dto: {
        conversationKey: string;
        knowledgeCheckEndUnit: boolean;
        knowledgeCheckEndModule: boolean;
        finalExercise: boolean;
        restrictions: string;
    }): Promise<{
        success: boolean;
        aiMessage: string;
        nextScreen: string;
    }>;
    updateTitle(courseId: number, title: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        key: string;
        orgId: number | null;
        status: import("@prisma/client").$Enums.CourseStatus;
        title: string | null;
        completedAt: Date | null;
        input: Prisma.JsonValue | null;
        output: Prisma.JsonValue | null;
        estimatedMinutes: number | null;
        isAdaptive: boolean;
    }>;
    generateCourse(courseKey: string): Promise<{
        success: boolean;
        totalJobs: number;
    }>;
    setBranding(courseKey: string, dto: SetBrandingDto): Promise<{
        success: boolean;
        nextScreen: string;
    }>;
    findAllByUserId(userId: string, pagination: PaginationDto): Promise<PaginatedResponse<any>>;
    getCourseComponents(courseKey: string): Promise<{
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
            data: Prisma.JsonValue;
            name: string;
        }[];
        groupVariants: {
            componentId: number;
            componentName: string;
            name: string;
            groupKey: string;
        }[];
    }>;
    updateComponentData(id: number, data: Record<string, unknown>): Promise<{
        data: Prisma.JsonValue | null;
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
    deleteComponent(id: number): Promise<{
        success: boolean;
    }>;
    duplicateComponent(id: number): Promise<{
        data: Prisma.JsonValue | null;
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
    createComponent(courseKey: string, dto: {
        componentName: string;
        module: number;
        unit: number;
        afterSequence: number;
    }, userId: string): Promise<{
        id: number;
        module: number;
        unit: number;
        sequence: number;
        componentId: number;
        componentName: string;
        componentType: import("@prisma/client").$Enums.ComponentType;
        groupKey: string | null;
        data: Prisma.JsonValue;
        name: string;
    }>;
    reorderComponents(courseKey: string, items: Array<{
        id: number;
        sequence: number;
    }>): Promise<{
        success: boolean;
    }>;
    switchComponentStyle(id: number, newComponentId: number): Promise<{
        data: Prisma.JsonValue | null;
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
}
