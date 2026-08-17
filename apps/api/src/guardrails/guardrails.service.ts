import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DETERMINISTIC_RULES } from './rules';
import { DeepseekJudgeService } from './judge/deepseek-judge.service';
import {
  ChatInputField,
  DeterministicRule,
  GuardrailFinding,
  GuardrailResult,
  GuardrailDecision,
} from './types';

const DEFAULT_MAX_CHARS = 2000;

@Injectable()
export class GuardrailsService {
  private readonly logger = new Logger(GuardrailsService.name);

  private readonly rules: DeterministicRule[] = DETERMINISTIC_RULES;

  constructor(
    private readonly config: ConfigService,
    private readonly judge: DeepseekJudgeService,
  ) {}

  /**
   * Runs the full guardrail chain over one chat-box field.
   *
   * @param useJudge overrides the env flag — the eval harness uses this to run
   *        the deterministic layer in isolation and measure it on its own.
   */
  async check(
    input: string,
    field: ChatInputField,
    useJudge = this.isJudgeEnabled(),
  ): Promise<GuardrailResult> {
    const startedAt = Date.now();

    if (!this.isEnabled()) {
      return {
        decision: 'allow',
        sanitizedInput: input,
        findings: [],
        latencyMs: Date.now() - startedAt,
      };
    }

    const ctx = { field, maxChars: this.maxChars() };
    const findings: GuardrailFinding[] = [];
    let decision: GuardrailDecision = 'allow';
    let current = input;

    // Stage 1 — deterministic. Stops at the first block so a blocked input is
    // never rewritten by later rules (and so the failing rule stays legible in
    // the findings, which is what the evals assert on).
    for (const rule of this.rules) {
      const outcome = rule.run(current, ctx);
      findings.push(...outcome.findings);
      current = outcome.output;

      if (outcome.decision === 'block') {
        // Log the rule, never the input: the blocked text may itself be PII.
        this.logger.warn(
          `Blocked "${field}" on rule ${outcome.findings[0]?.rule ?? rule.name}`,
        );
        return {
          decision: 'block',
          sanitizedInput: current,
          findings,
          latencyMs: Date.now() - startedAt,
        };
      }
      if (outcome.decision === 'sanitize') {
        decision = 'sanitize';
      }
    }

    // Stage 2 — semantic. Only reached by input the cheap layer accepted.
    if (!useJudge) {
      return {
        decision,
        sanitizedInput: current,
        findings,
        latencyMs: Date.now() - startedAt,
      };
    }

    const verdict = await this.judge.judge(current, field);
    if (verdict.decision === 'block') {
      findings.push({
        rule: `judge.${verdict.category}`,
        severity: 'high',
        message: verdict.reason,
      });
      decision = 'block';
    }

    return {
      decision,
      sanitizedInput: current,
      findings,
      judge: verdict,
      latencyMs: Date.now() - startedAt,
    };
  }

  /** Human-readable rejection text, surfaced to the chat UI on a block. */
  buildRejectionMessage(result: GuardrailResult): string {
    const reason = result.findings.at(-1)?.message ?? 'Input rejected.';
    return `That input could not be used for course generation. ${reason}`;
  }

  isEnabled(): boolean {
    return this.config.get<string>('GUARDRAILS_ENABLED', 'true') !== 'false';
  }

  isJudgeEnabled(): boolean {
    return (
      this.config.get<string>('GUARDRAILS_JUDGE_ENABLED', 'false') === 'true' &&
      this.judge.isConfigured()
    );
  }

  private maxChars(): number {
    const raw = this.config.get<string>('GUARDRAILS_MAX_INPUT_CHARS');
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_CHARS;
  }
}
