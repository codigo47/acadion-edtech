/**
 * Shared contracts for the chat-input guardrail layer.
 *
 * The layer runs in two stages:
 *  1. Deterministic rules  — cheap, offline, fully testable (no network).
 *  2. LLM-as-judge         — semantic checks that regexes cannot express.
 *
 * Stage 1 always runs. Stage 2 only runs if stage 1 allowed the input,
 * so we never pay for a model call on input we already rejected.
 */

/** Free-text fields a user types into the course-creation chat box. */
export type ChatInputField =
  | 'topic'
  | 'audience'
  | 'objective'
  | 'restrictions'
  | 'guidelines';

export type GuardrailDecision = 'allow' | 'sanitize' | 'block';

export type GuardrailSeverity = 'low' | 'medium' | 'high';

export interface GuardrailFinding {
  /** Stable identifier, used as the assertion target in evals. */
  rule: string;
  severity: GuardrailSeverity;
  message: string;
}

export interface RuleOutcome {
  decision: GuardrailDecision;
  /** Input as it should continue down the pipeline (possibly redacted). */
  output: string;
  findings: GuardrailFinding[];
}

export interface GuardrailContext {
  field: ChatInputField;
  maxChars: number;
}

export interface DeterministicRule {
  readonly name: string;
  run(input: string, ctx: GuardrailContext): RuleOutcome;
}

export interface JudgeVerdict {
  decision: 'allow' | 'block';
  /** Why the judge decided this — surfaced in eval failure output. */
  reason: string;
  category: 'safe' | 'off_topic' | 'prompt_injection' | 'harmful' | 'unknown';
  confidence: number;
  /** True when the judge could not be reached and we applied the fallback. */
  degraded?: boolean;
}

export interface GuardrailResult {
  decision: GuardrailDecision;
  /** Sanitized text. Equal to the input unless a rule redacted something. */
  sanitizedInput: string;
  findings: GuardrailFinding[];
  judge?: JudgeVerdict;
  latencyMs: number;
}

/** Convenience for rules that pass input through untouched. */
export function allow(output: string): RuleOutcome {
  return { decision: 'allow', output, findings: [] };
}
