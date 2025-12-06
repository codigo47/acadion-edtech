import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { TESTING_QUEUE } from './constants';
import { TestingJobData } from './queue.service';

@Processor(TESTING_QUEUE)
export class TestingProcessor extends WorkerHost {
  private readonly logger = new Logger(TestingProcessor.name);

  async process(job: Job<TestingJobData>): Promise<any> {
    this.logger.log(`Processing job ${job.id} with data: ${JSON.stringify(job.data)}`);

    // Simulate some work
    await this.delay(1000);

    const result = {
      processed: true,
      jobId: job.id,
      originalData: job.data,
      processedAt: new Date().toISOString(),
      result: `Processed message: "${job.data.message}"`,
    };

    this.logger.log(`Job ${job.id} completed with result: ${JSON.stringify(result)}`);

    return result;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
