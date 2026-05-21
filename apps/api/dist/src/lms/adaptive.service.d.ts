import { PrismaService } from '../prisma/prisma.service';
export interface AdaptivePath {
    unitCode: string;
    unitTitle: string;
    confidenceScore: number;
    mode: 'skip' | 'check_only' | 'full' | 'extended' | 'deep';
}
export declare class AdaptiveService {
    private prisma;
    constructor(prisma: PrismaService);
    getPreAssessment(courseKey: string, userId: string): Promise<{
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
    submitPreAssessment(enrollmentId: number, userId: string, answers: Array<{
        unitCode: string;
        confidenceScore: number;
    }>): Promise<{
        path: AdaptivePath[];
    }>;
    getAdaptivePath(enrollmentId: number, userId: string): Promise<AdaptivePath[]>;
    getPostAssessment(courseKey: string, userId: string): Promise<{
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
    submitPostAssessment(enrollmentId: number, userId: string, answers: Array<{
        unitCode: string;
        confidenceScore: number;
    }>): Promise<{
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
    private computeAdaptivePath;
    private confidenceToMode;
}
