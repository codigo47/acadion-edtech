import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async findByKey(conversationKey: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationKey },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException(
        `Conversation with key ${conversationKey} not found`,
      );
    }

    // Convert BigInt sequence to string for JSON serialization
    return {
      ...conversation,
      messages: conversation.messages.map((msg) => ({
        ...msg,
        sequence: msg.sequence.toString(),
      })),
    };
  }
}
