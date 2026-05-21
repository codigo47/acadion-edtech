import { ConfigService } from '@nestjs/config';
import { HealthService } from './health.service';
import { QueueService } from '../queue/queue.service';
export declare class HealthController {
    private readonly healthService;
    private readonly queueService;
    private readonly configService;
    constructor(healthService: HealthService, queueService: QueueService, configService: ConfigService);
    check(): Promise<{
        status: string;
        postgres: {
            connected: boolean;
            version: string;
            error?: undefined;
        };
    } | {
        status: string;
        postgres: {
            connected: boolean;
            error: string;
            version?: undefined;
        };
    }>;
    createJob(): Promise<{
        success: boolean;
        message: string;
        job: {
            jobId: string | undefined;
            name: string;
            data: Record<string, unknown>;
            timestamp: number;
        };
    }>;
    readJob(jobId: string): Promise<{
        success: boolean;
        job: {
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
        };
    }>;
    deleteJob(jobId: string): Promise<{
        jobId: string | undefined;
        deleted: boolean;
        success: boolean;
        message: string;
    }>;
    getActiveJobs(queueName: string): Promise<{
        queue: string;
        count: number;
        jobs: {
            jobId: string | undefined;
            name: string;
            data: Record<string, unknown>;
            progress: import("bullmq").JobProgress;
            timestamp: number;
            processedOn: number | undefined;
        }[];
    }>;
    emptyQueue(queueName: string): Promise<{
        success: boolean;
        queue: string;
        message: string;
    }>;
}
