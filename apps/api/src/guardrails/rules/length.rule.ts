import {
  DeterministicRule,
  GuardrailContext,
  RuleOutcome,
  allow,
} from '../types';

/**
 * Rejects empty and oversized input.
 *
 * Oversized input matters beyond UX: every character typed here is
 * concatenated into the generation prompts, so an unbounded field is both a
 * cost problem and a context-stuffing vector.
 */
export class LengthRule implements DeterministicRule {
  readonly name = 'length';

  run(input: string, ctx: GuardrailContext): RuleOutcome {
    const trimmed = input.trim();

    if (trimmed.length === 0) {
      return {
        decision: 'block',
        output: trimmed,
        findings: [
          {
            rule: `${this.name}.empty`,
            severity: 'low',
            message: `Field "${ctx.field}" cannot be empty.`,
          },
        ],
      };
    }

    if (trimmed.length > ctx.maxChars) {
      return {
        decision: 'block',
        output: trimmed,
        findings: [
          {
            rule: `${this.name}.too_long`,
            severity: 'medium',
            message: `Field "${ctx.field}" is ${trimmed.length} characters; the limit is ${ctx.maxChars}.`,
          },
        ],
      };
    }

    return allow(trimmed);
  }
}
