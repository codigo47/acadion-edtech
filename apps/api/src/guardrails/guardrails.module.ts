import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuardrailsService } from './guardrails.service';
import { DeepseekJudgeService } from './judge/deepseek-judge.service';
import { ChatInputGuardrailPipe } from './chat-input-guardrail.pipe';

@Module({
  imports: [ConfigModule],
  providers: [GuardrailsService, DeepseekJudgeService, ChatInputGuardrailPipe],
  exports: [GuardrailsService, DeepseekJudgeService, ChatInputGuardrailPipe],
})
export class GuardrailsModule {}
