import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { TESTING_QUEUE } from './constants';

export interface TestingJobData {
  message: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

@Injectable()
export class QueueService {
  constructor(@InjectQueue(TESTING_QUEUE) private testingQueue: Queue) {}

  async addTestingJob(data: TestingJobData) {
    const job = await this.testingQueue.add('test-job', data, {
      removeOnComplete: false,
      removeOnFail: false,
    });

    return {
      jobId: job.id,
      name: job.name,
      data: job.data,
      timestamp: job.timestamp,
    };
  }

  async getJob(jobId: string) {
    const job = await this.testingQueue.getJob(jobId);

    if (!job) {
      return null;
    }

    const state = await job.getState();

    return {
      jobId: job.id,
      name: job.name,
      data: job.data,
      state,
      progress: job.progress,
      returnvalue: job.returnvalue,
      failedReason: job.failedReason,
      timestamp: job.timestamp,
      finishedOn: job.finishedOn,
      processedOn: job.processedOn,
    };
  }

  async deleteJob(jobId: string) {
    const job = await this.testingQueue.getJob(jobId);

    if (!job) {
      return null;
    }

    await job.remove();

    return {
      jobId: job.id,
      deleted: true,
    };
  }

  async getQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.testingQueue.getWaitingCount(),
      this.testingQueue.getActiveCount(),
      this.testingQueue.getCompletedCount(),
      this.testingQueue.getFailedCount(),
      this.testingQueue.getDelayedCount(),
    ]);

    return {
      queue: TESTING_QUEUE,
      waiting,
      active,
      completed,
      failed,
      delayed,
    };
  }
}
