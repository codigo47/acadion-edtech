import { PrismaService } from '../prisma/prisma.service';
import { BadgeService } from '../badge/badge.service';
import { NotificationService } from '../notification/notification.service';
import { UpdateProgressDto, CompleteCourseDto, SubmitKnowledgeCheckDto, AdminEnrollDto } from './dto/lms.dto';
export interface ProposedUnit {
    code: string;
    title: string;
    bloomObjectives?: string;
}
export interface ProposedModule {
    number: number;
    title: string;
    units: ProposedUnit[];
}
export interface ProposedIndex {
    title: string;
    modules: ProposedModule[];
}
export declare class LmsService {
    private prisma;
    private badgeService;
    private notificationService;
    constructor(prisma: PrismaService, badgeService: BadgeService, notificationService: NotificationService);
    getStudentDashboard(userId: string): Promise<{
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
    getCourseContent(courseKey: string, userId: string): Promise<{
        courseKey: string;
        courseTitle: string | null;
        isAdaptive: boolean;
        proposedIndex: ProposedIndex | null;
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
    updateProgress(courseKey: string, userId: string, dto: UpdateProgressDto): Promise<{
        progress: number;
        completedUnits: number;
        totalUnits: number;
    }>;
    completeCourse(courseKey: string, userId: string, dto: CompleteCourseDto): Promise<{
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
    selfEnroll(courseKey: string, userId: string): Promise<{
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
    adminEnroll(courseKey: string, dto: AdminEnrollDto): Promise<{
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
    adminReEnroll(courseKey: string, userId: string): Promise<{
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
    submitKnowledgeCheck(courseKey: string, userId: string, dto: SubmitKnowledgeCheckDto): Promise<{
        attemptNumber: number;
        isCorrect: boolean;
        remainingAttempts: number;
    }>;
    private computeLockedUnits;
    private checkLearningPlanCompletion;
    private confidenceToMode;
}
