import { DeterministicRule, RuleOutcome, allow } from '../types';

/**
 * Catches the well-known, cheap-to-match prompt-injection phrasings.
 *
 * This is deliberately a coarse first line of defence: it stops the obvious
 * attempts for free, in microseconds, without a model call. Anything subtler
 * (role-play framings, obfuscated instructions, encoded payloads) is left to
 * the LLM judge — see `DeepseekJudgeService`. Treating regex as the whole
 * answer would be security theatre; treating it as a cheap prefilter is not.
 */
const INJECTION_PATTERNS: Array<{ id: string; pattern: RegExp }> = [
  {
    id: 'override_instructions',
    pattern:
      /\b(ignore|disregard|forget|override)\b[^.]{0,40}\b(previous|prior|above|earlier|all)\b[^.]{0,20}\b(instruction|prompt|rule|direction)/i,
  },
  {
    id: 'system_prompt_probe',
    pattern:
      /\b(system prompt|initial prompt|your instructions|reveal|print|repeat)\b[^.]{0,30}\b(prompt|instructions|rules)\b/i,
  },
  {
    id: 'role_reassignment',
    pattern:
      /\b(you are now|act as|pretend to be|from now on you)\b[^.]{0,40}\b(dan|admin|developer mode|unrestricted|no restrictions)\b/i,
  },
  {
    id: 'delimiter_injection',
    pattern: /(<\/?(system|assistant|user)>|\[\/?INST\]|###\s*system)/i,
  },
];

export class PromptInjectionRule implements DeterministicRule {
  readonly name = 'prompt_injection';

  run(input: string): RuleOutcome {
    const hit = INJECTION_PATTERNS.find((p) => p.pattern.test(input));

    if (!hit) {
      return allow(input);
    }

    return {
      decision: 'block',
      output: input,
      findings: [
        {
          rule: `${this.name}.${hit.id}`,
          severity: 'high',
          message:
            'Input looks like an attempt to override the assistant instructions.',
        },
      ],
    };
  }
}
