import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  conversation: { findUnique: jest.fn() },
};

describe('ConversationService', () => {
  let service: ConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<ConversationService>(ConversationService);
    jest.clearAllMocks();
  });

  describe('findByKey', () => {
    it('returns conversation with messages (BigInt converted)', async () => {
      mockPrisma.conversation.findUnique.mockResolvedValue({
        id: 'conv-1',
        title: 'Test',
        messages: [
          { id: 1, role: 'user', content: 'Hello', sequence: BigInt(1), createdAt: new Date() },
          { id: 2, role: 'assistant', content: 'Hi', sequence: BigInt(2), createdAt: new Date() },
        ],
      });

      const result = await service.findByKey('conv-1');
      expect(result.id).toBe('conv-1');
      expect(result.messages).toHaveLength(2);
      expect(result.messages[0].sequence).toBe('1');
      expect(result.messages[1].sequence).toBe('2');
    });

    it('throws NotFoundException when conversation not found', async () => {
      mockPrisma.conversation.findUnique.mockResolvedValue(null);
      await expect(service.findByKey('invalid')).rejects.toThrow(NotFoundException);
    });
  });
});
