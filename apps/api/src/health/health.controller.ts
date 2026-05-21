import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';
import { HealthService } from './health.service';
import { QueueService } from '../queue/queue.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly queueService: QueueService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async check() {
    return this.healthService.check();
  }

  @Get('create-job')
  async createJob() {
    const job = await this.queueService.addTestingJob({
      message: 'Health check test job',
      timestamp: Date.now(),
      data: {
        source: 'health-endpoint',
        environment: process.env.NODE_ENV || 'development',
        randomId: Math.random().toString(36).substring(7),
        testArray: [1, 2, 3, 4, 5],
        nested: {
          foo: 'bar',
          count: 42,
        },
      },
    });

    return {
      success: true,
      message: 'Job created successfully',
      job,
    };
  }

  @Get('read-job')
  async readJob(@Query('jobId') jobId: string) {
    if (!jobId) {
      throw new NotFoundException('jobId query parameter is required');
    }

    const job = await this.queueService.getJob(jobId);

    if (!job) {
      throw new NotFoundException(`Job with id ${jobId} not found`);
    }

    return {
      success: true,
      job,
    };
  }

  @Get('delete-job')
  async deleteJob(@Query('jobId') jobId: string) {
    if (!jobId) {
      throw new NotFoundException('jobId query parameter is required');
    }

    const result = await this.queueService.deleteJob(jobId);

    if (!result) {
      throw new NotFoundException(`Job with id ${jobId} not found`);
    }

    return {
      success: true,
      message: 'Job deleted successfully',
      ...result,
    };
  }

  @Get('queue/:queueName')
  async getActiveJobs(@Param('queueName') queueName: string) {
    const queue = new Queue(queueName, {
      connection: {
        host: this.configService.get<string>('REDIS_HOST', 'localhost'),
        port: this.configService.get<number>('REDIS_PORT', 6379),
      },
    });

    try {
      const activeJobs = await queue.getActive();

      const jobs = activeJobs.map((job) => ({
        jobId: job.id,
        name: job.name,
        data: job.data as Record<string, unknown>,
        progress: job.progress,
        timestamp: job.timestamp,
        processedOn: job.processedOn,
      }));

      return {
        queue: queueName,
        count: jobs.length,
        jobs,
      };
    } finally {
      await queue.close();
    }
  }

  @Get('queue/:queueName/empty')
  async emptyQueue(@Param('queueName') queueName: string) {
    const queue = new Queue(queueName, {
      connection: {
        host: this.configService.get<string>('REDIS_HOST', 'localhost'),
        port: this.configService.get<number>('REDIS_PORT', 6379),
      },
    });

    try {
      await queue.obliterate({ force: true });

      return {
        success: true,
        queue: queueName,
        message: 'Queue emptied successfully',
      };
    } finally {
      await queue.close();
    }
  }
}
