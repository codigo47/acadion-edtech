import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TestingJobData } from './queue.service';
export declare class TestingProcessor extends WorkerHost {
    private readonly logger;
    process(job: Job<TestingJobData>): Promise<Record<string, unknown>>;
    private delay;
}
