import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getCourseAnalytics(courseKey: string): Promise<{
        courseTitle: string | null;
        totalEnrollments: number;
        activeStudents: number;
        completedStudents: number;
        averageScore: number;
        passRate: number;
        averageTimeSpent: number;
        averageFocusLoss: number;
        unitBreakdown: {
            unitCode: string;
            title: string;
            completionRate: number;
            averageTime: number;
            averageFocusLoss: number;
        }[];
        completionOverTime: {
            week: string;
            count: number;
        }[];
    }>;
    getCourseUserProgress(courseKey: string): Promise<{
        user: {
            name: string | null;
            id: string;
            email: string;
        };
        enrolledAt: Date;
        startedAt: Date | null;
        completedAt: Date | null;
        progress: number;
        completedUnits: number;
        totalUnits: number;
        unitProgress: {
            id: number;
            completedAt: Date | null;
            unitCode: string;
            timeSpentSeconds: number;
            focusLossCount: number;
            enrollmentId: number;
        }[];
        score: number | null;
        passed: boolean | null;
    }[]>;
    getOrgAnalytics(orgKey: string): Promise<{
        orgName: string;
        totalCourses: number;
        totalStudents: number;
        averageCompletion: number;
        topCourses: {
            courseKey: string;
            title: string;
            enrollmentCount: number;
        }[];
        recentCompletions: {
            courseTitle: string;
            courseKey: string;
            user: {
                name: string | null;
                id: string;
                email: string;
            };
            completedAt: Date | null;
            score: number | null;
            passed: boolean | null;
        }[];
    }>;
    getStudentAnalytics(userId: string): Promise<{
        totalEnrolled: number;
        totalCompleted: number;
        averageScore: number;
        totalTimeSpent: number;
        courseBreakdown: {
            courseKey: string;
            courseTitle: string;
            progress: number;
            score: number | null;
            timeSpent: number;
            completedAt: Date | null;
            passed: boolean | null;
        }[];
        recentActivity: {
            unitCode: string;
            timeSpentSeconds: number;
            completedAt: Date | null;
            courseTitle: string;
            courseKey: string | undefined;
        }[];
    }>;
}
