import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { GuardrailsService } from './guardrails.service';
import { ChatInputField } from './types';

/**
 * Every free-text field a user can type into the course-creation chat box.
 * Anything not listed here is structured input (numbers, enums, colours) and
 * is already covered by class-validator.
 */
const GUARDED_FIELDS: ChatInputField[] = [
  'topic',
  'audience',
  'objective',
  'restrictions',
  'guidelines',
];

type GuardedPayload = Record<string, unknown>;

/**
 * Applies the guardrail chain to the task payload before it reaches the
 * controller.
 *
 * It sits at the edge on purpose: the same `POST /course/tasks` endpoint
 * dispatches every step of the chat flow, so guarding it once covers every
 * field the user can type instead of scattering checks across the service.
 *
 * On `sanitize` the payload is rewritten in place, so downstream code — and
 * the model provider — only ever sees the redacted text.
 */
@Injectable()
export class ChatInputGuardrailPipe implements PipeTransform {
  constructor(private readonly guardrails: GuardrailsService) {}

  async transform(value: GuardedPayload): Promise<GuardedPayload> {
    if (!value || typeof value !== 'object') return value;

    for (const field of GUARDED_FIELDS) {
      const raw = value[field];
      if (typeof raw !== 'string') continue;

      const result = await this.guardrails.check(raw, field);

      if (result.decision === 'block') {
        throw new BadRequestException({
          message: this.guardrails.buildRejectionMessage(result),
          field,
          findings: result.findings.map((f) => f.rule),
        });
      }

      value[field] = result.sanitizedInput;
    }

    return value;
  }
}
