import { DeterministicRule } from '../types';
import { LengthRule } from './length.rule';
import { PromptInjectionRule } from './prompt-injection.rule';
import { PiiRule } from './pii.rule';

export { LengthRule } from './length.rule';
export { PromptInjectionRule } from './prompt-injection.rule';
export { PiiRule } from './pii.rule';

/**
 * Execution order matters: cheap structural checks first, then adversarial
 * detection, then redaction. Redaction runs last so it only ever rewrites
 * input we have already decided to accept.
 */
export const DETERMINISTIC_RULES: DeterministicRule[] = [
  new LengthRule(),
  new PromptInjectionRule(),
  new PiiRule(),
];
