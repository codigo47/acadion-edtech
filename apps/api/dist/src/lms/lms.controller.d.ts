import type { Request as ExpressRequest } from 'express';
import { LmsService } from './lms.service';
import { AdaptiveService } from './adaptive.service';
import { UpdateProgressDto, CompleteCourseDto, SubmitKnowledgeCheckDto, AdminEnrollDto, SubmitPreAssessmentDto, SubmitPostAssessmentDto } from './dto/lms.dto';
interface RequestWithUser extends ExpressRequest {
    user: {
        id: string;
    };
}
export declare class LmsController {
    private readonly lmsService;
    private readonly adaptiveService;
    constructor(lmsService: LmsService, adaptiveService: AdaptiveService);
    getStudentDashboard(req: RequestWithUser): Promise<{
        enrolledCourses: {
            enrollmentId: number;
            courseKey: string;
            courseTitle: string | null;
            enrolledAt: Date;
            startedAt: Date | null;
            completedAt: Date | null;
            passed: boolean | null;
            score: number | null;
            attempts: number;
            state: "completed" | "not_started" | "in_progress";
            progress: number;
            totalUnits: number;
            completedUnits: number;
            isAdaptive: boolean;
        }[];
        learningPlans: {
            id: number;
            key: string;
            name: string;
            description: string | null;
            image: string | null;
            estimatedDays: number | null;
            isCorrelative: boolean;
            enrolledAt: Date;
            deadline: Date | null;
            completedAt: Date | null;
            totalCourses: number;
            completedCourses: number;
            badgeName: string | null;
            badgeImage: string | null;
        }[];
    }>;
    getCourseContent(key: string, req: RequestWithUser): Promise<{
        courseKey: string;
        courseTitle: string | null;
        isAdaptive: boolean;
        proposedIndex: import("./lms.service").ProposedIndex | null;
        componentsByUnit: Record<string, {
            component: string;
            content: unknown;
        }[]>;
        enrollment: {
            id: number;
            enrolledAt: Date;
            startedAt: Date | null;
            completedAt: Date | null;
            passed: boolean | null;
            score: number | null;
            attempts: number;
        };
        unitProgress: {
            id: number;
            completedAt: Date | null;
            unitCode: string;
            timeSpentSeconds: number;
            focusLossCount: number;
            enrollmentId: number;
        }[];
        adaptivePath: {
            unitCode: string;
            mode: string;
        }[] | null;
        lockedUnits: string[];
    }>;
    selfEnroll(key: string, req: RequestWithUser): Promise<{
        id: number;
        userId: string;
        completedAt: Date | null;
        courseId: number;
        enrolledAt: Date;
        passed: boolean | null;
        score: number | null;
        startedAt: Date | null;
        attempts: number;
    }>;
    updateProgress(key: string, req: RequestWithUser, dto: UpdateProgressDto): Promise<{
        progress: number;
        completedUnits: number;
        totalUnits: number;
    }>;
    completeCourse(key: string, req: RequestWithUser, dto: CompleteCourseDto): Promise<{
        id: number;
        userId: string;
        completedAt: Date | null;
        courseId: number;
        enrolledAt: Date;
        passed: boolean | null;
        score: number | null;
        startedAt: Date | null;
        attempts: number;
    }>;
    submitKnowledgeCheck(key: string, req: RequestWithUser, dto: SubmitKnowledgeCheckDto): Promise<{
        attemptNumber: number;
        isCorrect: boolean;
        remainingAttempts: number;
    }>;
    adminEnroll(key: string, dto: AdminEnrollDto): Promise<{
        id: number;
        userId: string;
        completedAt: Date | null;
        courseId: number;
        enrolledAt: Date;
        passed: boolean | null;
        score: number | null;
        startedAt: Date | null;
        attempts: number;
    }>;
    adminReEnroll(key: string, userId: string): Promise<{
        id: number;
        userId: string;
        completedAt: Date | null;
        courseId: number;
        enrolledAt: Date;
        passed: boolean | null;
        score: number | null;
        startedAt: Date | null;
        attempts: number;
    }>;
    getPreAssessment(key: string, req: RequestWithUser): Promise<{
        alreadyCompleted: boolean;
        enrollmentId: number;
        courseTitle?: undefined;
        units?: undefined;
    } | {
        alreadyCompleted: boolean;
        enrollmentId: number;
        courseTitle: string | null;
        units: {
            unitCode: string;
            unitTitle: string;
            moduleTitle: string;
            question: string;
        }[];
    }>;
    submitPreAssessment(key: string, req: RequestWithUser, dto: SubmitPreAssessmentDto): Promise<{
        path: import("./adaptive.service").AdaptivePath[];
    }>;
    getPostAssessment(key: string, req: RequestWithUser): Promise<{
        alreadyCompleted: boolean;
        enrollmentId: number;
        units: {
            unitCode: string;
            unitTitle: string;
            moduleTitle: string;
            preScore: number | null;
            question: string;
        }[];
    }>;
    submitPostAssessment(key: string, req: RequestWithUser, dto: SubmitPostAssessmentDto): Promise<{
        comparison: {
            unitCode: string;
            preScore: number;
            postScore: number;
            improvement: number;
        }[];
        avgPreScore: number;
        avgPostScore: number;
        overallImprovement: number;
    }>;
}
export {};
