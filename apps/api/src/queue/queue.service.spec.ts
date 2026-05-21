import { Test, TestingModule } from '@nestjs/testing';
import { getQueueToken } from '@nestjs/bullmq';
import { QueueService } from './queue.service';
import { TESTING_QUEUE } from './constants';

const mockQueue = {
  add: jest.fn(),
  getJob: jest.fn(),
  getWaitingCount: jest.fn(),
  getActiveCount: jest.fn(),
  getCompletedCount: jest.fn(),
  getFailedCount: jest.fn(),
  getDelayedCount: jest.fn(),
};

describe('QueueService', () => {
  let service: QueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueService,
        { provide: getQueueToken(TESTING_QUEUE), useValue: mockQueue },
      ],
    }).compile();
    service = module.get<QueueService>(QueueService);
    jest.clearAllMocks();
  });

  describe('addTestingJob', () => {
    it('adds job to queue and returns job info', async () => {
      mockQueue.add.mockResolvedValue({
        id: 'job-1',
        name: 'test-job',
        data: { message: 'hello', timestamp: 123 },
        timestamp: 123,
      });

      const result = await service.addTestingJob({ message: 'hello', timestamp: 123 });
      expect(result.jobId).toBe('job-1');
      expect(result.name).toBe('test-job');
      expect(mockQueue.add).toHaveBeenCalledWith('test-job', { message: 'hello', timestamp: 123 }, {
        removeOnComplete: false,
        removeOnFail: false,
      });
    });
  });

  describe('getJob', () => {
    it('returns job details when found', async () => {
      const mockJob = {
        id: 'job-1',
        name: 'test-job',
        data: { message: 'hi' },
        progress: 50,
        returnvalue: null,
        failedReason: undefined,
        timestamp: 100,
        finishedOn: null,
        processedOn: 100,
        getState: jest.fn().mockResolvedValue('active'),
      };
      mockQueue.getJob.mockResolvedValue(mockJob);

      const result = await service.getJob('job-1');
      expect(result).not.toBeNull();
      expect(result!.jobId).toBe('job-1');
      expect(result!.state).toBe('active');
    });

    it('returns null when job not found', async () => {
      mockQueue.getJob.mockResolvedValue(null);
      const result = await service.getJob('missing');
      expect(result).toBeNull();
    });
  });

  describe('deleteJob', () => {
    it('removes job and returns confirmation', async () => {
      const mockJob = { id: 'job-1', remove: jest.fn() };
      mockQueue.getJob.mockResolvedValue(mockJob);

      const result = await service.deleteJob('job-1');
      expect(result).not.toBeNull();
      expect(result!.deleted).toBe(true);
      expect(mockJob.remove).toHaveBeenCalled();
    });

    it('returns null when job not found', async () => {
      mockQueue.getJob.mockResolvedValue(null);
      const result = await service.deleteJob('missing');
      expect(result).toBeNull();
    });
  });

  describe('getQueueStats', () => {
    it('returns all queue counts', async () => {
      mockQueue.getWaitingCount.mockResolvedValue(2);
      mockQueue.getActiveCount.mockResolvedValue(1);
      mockQueue.getCompletedCount.mockResolvedValue(10);
      mockQueue.getFailedCount.mockResolvedValue(0);
      mockQueue.getDelayedCount.mockResolvedValue(3);

      const result = await service.getQueueStats();
      expect(result.queue).toBe(TESTING_QUEUE);
      expect(result.waiting).toBe(2);
      expect(result.active).toBe(1);
      expect(result.completed).toBe(10);
      expect(result.failed).toBe(0);
      expect(result.delayed).toBe(3);
    });
  });
});
