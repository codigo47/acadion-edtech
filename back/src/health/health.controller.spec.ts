import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { QueueService } from '../queue/queue.service';

const mockHealthService = { check: jest.fn() };
const mockQueueService = {
  addTestingJob: jest.fn(),
  getJob: jest.fn(),
  deleteJob: jest.fn(),
};
const mockConfigService = { get: jest.fn().mockReturnValue('localhost') };

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthService, useValue: mockHealthService },
        { provide: QueueService, useValue: mockQueueService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();
    controller = module.get<HealthController>(HealthController);
    jest.clearAllMocks();
  });

  describe('check', () => {
    it('returns health status', async () => {
      mockHealthService.check.mockResolvedValue({ status: 'ok' });
      const result = await controller.check();
      expect(result.status).toBe('ok');
    });
  });

  describe('createJob', () => {
    it('creates a test job', async () => {
      mockQueueService.addTestingJob.mockResolvedValue({ jobId: '1', name: 'test-job' });
      const result = await controller.createJob();
      expect(result.success).toBe(true);
    });
  });

  describe('readJob', () => {
    it('returns job data', async () => {
      mockQueueService.getJob.mockResolvedValue({ jobId: '1', state: 'completed' });
      const result = await controller.readJob('1');
      expect(result.success).toBe(true);
    });

    it('throws NotFoundException when jobId is missing', async () => {
      await expect(controller.readJob('')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when job not found', async () => {
      mockQueueService.getJob.mockResolvedValue(null);
      await expect(controller.readJob('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteJob', () => {
    it('deletes a job', async () => {
      mockQueueService.deleteJob.mockResolvedValue({ jobId: '1', deleted: true });
      const result = await controller.deleteJob('1');
      expect(result.success).toBe(true);
    });

    it('throws NotFoundException when jobId is missing', async () => {
      await expect(controller.deleteJob('')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when job not found', async () => {
      mockQueueService.deleteJob.mockResolvedValue(null);
      await expect(controller.deleteJob('999')).rejects.toThrow(NotFoundException);
    });
  });
});
