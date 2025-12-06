import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { HealthService } from './health.service';
import { QueueService } from '../queue/queue.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly queueService: QueueService,
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
}
