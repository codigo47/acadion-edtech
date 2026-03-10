import { Controller, Get, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get(':conversationKey')
  async findOne(@Param('conversationKey') conversationKey: string) {
    return this.conversationService.findByKey(conversationKey);
  }
}
