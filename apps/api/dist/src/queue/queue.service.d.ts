import { Queue } from 'bullmq';
export interface TestingJobData {
    message: string;
    timestamp: number;
    data?: Record<string, unknown>;
}
export declare class QueueService {
    private testingQueue;
    constructor(testingQueue: Queue);
    addTestingJob(data: TestingJobData): Promise<{
        jobId: string | undefined;
        name: string;
        data: Record<string, unknown>;
        timestamp: number;
    }>;
    getJob(jobId: string): Promise<{
        jobId: string | undefined;
        name: string;
        data: Record<string, unknown>;
        state: "unknown" | import("bullmq").JobState;
        progress: import("bullmq").JobProgress;
        returnvalue: Record<string, unknown>;
        failedReason: string;
        timestamp: number;
        finishedOn: number | undefined;
        processedOn: number | undefined;
    } | null>;
    deleteJob(jobId: string): Promise<{
        jobId: string | undefined;
        deleted: boolean;
    } | null>;
    getQueueStats(): Promise<{
        queue: string;
        waiting: number;
        active: number;
        completed: number;
        failed: number;
        delayed: number;
    }>;
}
