import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { ChatInputField, JudgeVerdict } from '../types';
import { JUDGE_SYSTEM_PROMPT, buildJudgeUserPrompt } from './judge.prompt';

const verdictSchema = z.object({
  decision: z.enum(['allow', 'block']),
  category: z.enum([
    'safe',
    'off_topic',
    'prompt_injection',
    'harmful',
    'unknown',
  ]),
  reason: z.string().max(300),
  confidence: z.number().min(0).max(1),
});

/**
 * LLM-as-judge backed by DeepSeek.
 *
 * DeepSeek exposes an OpenAI-compatible API, so we reuse the ChatOpenAI client
 * with a different base URL rather than adding another SDK. Using a *different*
 * provider than the generation pipeline (which runs on OpenAI) is deliberate:
 * a judge that shares the generator's blind spots is a weak judge.
 */
@Injectable()
export class DeepseekJudgeService {
  private readonly logger = new Logger(DeepseekJudgeService.name);
  private client?: ChatOpenAI;

  constructor(private readonly config: ConfigService) {}

  /** True when an API key is configured; evals use this to self-skip. */
  isConfigured(): boolean {
    return Boolean(this.config.get<string>('DEEPSEEK_API_KEY'));
  }

  private getClient(): ChatOpenAI {
    if (!this.client) {
      this.client = new ChatOpenAI({
        apiKey: this.config.get<string>('DEEPSEEK_API_KEY'),
        model: this.config.get<string>('DEEPSEEK_JUDGE_MODEL', 'deepseek-chat'),
        // Judges must be reproducible; creativity here is a bug.
        temperature: 0,
        maxRetries: 1,
        configuration: {
          baseURL: this.config.get<string>(
            'DEEPSEEK_BASE_URL',
            'https://api.deepseek.com',
          ),
        },
        modelKwargs: { response_format: { type: 'json_object' } },
      });
    }
    return this.client;
  }

  /**
   * Classifies one chat-box field.
   *
   * Failure policy is explicit and configurable. Default is fail-open
   * (`degraded: true`), because the deterministic rules have already run and a
   * DeepSeek outage should not take down course creation for every user. Set
   * `GUARDRAILS_JUDGE_FAIL_OPEN=false` in a stricter deployment to invert it.
   */
  async judge(input: string, field: ChatInputField): Promise<JudgeVerdict> {
    if (!this.isConfigured()) {
      return this.fallback('DeepSeek API key not configured.');
    }

    try {
      const response = await this.getClient().invoke([
        { role: 'system', content: JUDGE_SYSTEM_PROMPT },
        { role: 'user', content: buildJudgeUserPrompt(input, field) },
      ]);

      const raw =
        typeof response.content === 'string'
          ? response.content
          : JSON.stringify(response.content);

      const parsed = verdictSchema.safeParse(JSON.parse(raw));
      if (!parsed.success) {
        this.logger.warn(
          `Judge returned an unparseable verdict: ${parsed.error.message}`,
        );
        return this.fallback('Judge response did not match the schema.');
      }

      return parsed.data;
    } catch (error) {
      const err = error as Error;
      this.logger.warn(`Judge call failed: ${err.message}`);
      return this.fallback(`Judge unavailable: ${err.message}`);
    }
  }

  private fallback(reason: string): JudgeVerdict {
    const failOpen =
      this.config.get<string>('GUARDRAILS_JUDGE_FAIL_OPEN', 'true') !== 'false';

    return {
      decision: failOpen ? 'allow' : 'block',
      category: 'unknown',
      reason,
      confidence: 0,
      degraded: true,
    };
  }
}
