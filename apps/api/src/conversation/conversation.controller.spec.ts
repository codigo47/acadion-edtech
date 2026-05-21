import { Test, TestingModule } from '@nestjs/testing';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';

const mockService = { findByKey: jest.fn() };

describe('ConversationController', () => {
  let controller: ConversationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConversationController],
      providers: [{ provide: ConversationService, useValue: mockService }],
    }).compile();
    controller = module.get<ConversationController>(ConversationController);
    jest.clearAllMocks();
  });

  it('findOne delegates to service', async () => {
    mockService.findByKey.mockResolvedValue({ id: 'conv-1', messages: [] });
    const result = await controller.findOne('conv-1');
    expect(result.id).toBe('conv-1');
  });
});
