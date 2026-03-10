import { Test, TestingModule } from '@nestjs/testing';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';

const mockService = { getQueueStats: jest.fn() };

describe('QueueController', () => {
  let controller: QueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueController],
      providers: [{ provide: QueueService, useValue: mockService }],
    }).compile();
    controller = module.get<QueueController>(QueueController);
    jest.clearAllMocks();
  });

  it('getStats returns queue stats', async () => {
    mockService.getQueueStats.mockResolvedValue({ waiting: 0, active: 1 });
    const result = await controller.getStats();
    expect(result.success).toBe(true);
    expect(result.stats.active).toBe(1);
  });
});
