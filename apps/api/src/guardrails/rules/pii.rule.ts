import {
  DeterministicRule,
  RuleOutcome,
  allow,
  GuardrailFinding,
} from '../types';

/**
 * Redacts personal data before it reaches the model provider.
 *
 * Note the decision here is `sanitize`, not `block`: a creator writing
 * "course for my team, contact me at ana@acme.com" made a mistake, not an
 * attack. Blocking would be hostile UX; silently forwarding the address to a
 * third-party LLM would be a privacy problem. Redact and continue.
 */
const PII_PATTERNS: Array<{
  id: string;
  pattern: RegExp;
  placeholder: string;
}> = [
  {
    id: 'email',
    pattern: /[\w.+-]+@[\w-]+\.[\w.-]+/g,
    placeholder: '[REDACTED_EMAIL]',
  },
  {
    id: 'credit_card',
    pattern: /\b(?:\d[ -]*?){13,16}\b/g,
    placeholder: '[REDACTED_CARD]',
  },
  {
    id: 'phone',
    pattern: /(?:\+\d{1,3}[ -]?)?(?:\(\d{2,4}\)[ -]?)?\d{3,4}[ -]\d{3,4}\b/g,
    placeholder: '[REDACTED_PHONE]',
  },
];

export class PiiRule implements DeterministicRule {
  readonly name = 'pii';

  run(input: string): RuleOutcome {
    const findings: GuardrailFinding[] = [];
    let output = input;

    for (const { id, pattern, placeholder } of PII_PATTERNS) {
      // Fresh regex per call: /g patterns carry lastIndex between uses.
      const re = new RegExp(pattern.source, pattern.flags);
      if (!re.test(output)) continue;

      output = output.replace(
        new RegExp(pattern.source, pattern.flags),
        placeholder,
      );
      findings.push({
        rule: `${this.name}.${id}`,
        severity: 'medium',
        message: `Redacted ${id} before sending the input to the model provider.`,
      });
    }

    if (findings.length === 0) {
      return allow(input);
    }

    return { decision: 'sanitize', output, findings };
  }
}
