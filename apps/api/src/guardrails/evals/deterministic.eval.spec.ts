import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { GuardrailsService } from '../guardrails.service';
import { DeepseekJudgeService } from '../judge/deepseek-judge.service';
import { CHAT_INPUT_EVAL_CASES } from './datasets/chat-input.dataset';
import { runEval, formatReport } from './runner';

/**
 * Deterministic evals — no network, no API key, no flake.
 *
 * These run on every `npm test` and in CI. The judge is disabled so a
 * regression in the regex/redaction layer cannot be masked by the model
 * catching it downstream, and so the suite stays fast and reproducible.
 */
const config = new Map<string, string>([
  ['GUARDRAILS_ENABLED', 'true'],
  ['GUARDRAILS_JUDGE_ENABLED', 'false'],
  ['GUARDRAILS_MAX_INPUT_CHARS', '2000'],
]);

const mockConfig = {
  get: (key: string, fallback?: string) => config.get(key) ?? fallback,
};

const mockJudge = {
  isConfigured: () => false,
  judge: jest.fn(),
};

describe('Guardrails · deterministic evals', () => {
  let service: GuardrailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuardrailsService,
        { provide: ConfigService, useValue: mockConfig },
        { provide: DeepseekJudgeService, useValue: mockJudge },
      ],
    }).compile();
    service = module.get(GuardrailsService);
    jest.clearAllMocks();
  });

  it('passes every case in the dataset', async () => {
    const report = await runEval(service, CHAT_INPUT_EVAL_CASES, {
      useJudge: false,
    });

    // Printed only when the expectation below fails, so a red run tells you
    // which case broke and how — without opening the file.
    if (report.passRate < 1) {
      console.error(`\n${formatReport(report)}\n`);
    }

    expect(report.passRate).toBe(1);
  });

  it('never blocks legitimate course input', async () => {
    const report = await runEval(service, CHAT_INPUT_EVAL_CASES, {
      useJudge: false,
    });

    expect(report.falsePositives).toBe(0);
  });

  it('never lets a known-bad input through', async () => {
    const report = await runEval(service, CHAT_INPUT_EVAL_CASES, {
      useJudge: false,
    });

    expect(report.falseNegatives).toBe(0);
  });

  it('stays within the latency budget for a synchronous request path', async () => {
    const report = await runEval(service, CHAT_INPUT_EVAL_CASES, {
      useJudge: false,
    });

    // The deterministic layer runs inline on every chat message, so it has to
    // be effectively free. 50ms p95 is already generous for regex work.
    expect(report.p95LatencyMs).toBeLessThan(50);
  });

  it('does not call the judge when it is disabled', async () => {
    await runEval(service, CHAT_INPUT_EVAL_CASES, { useJudge: false });

    expect(mockJudge.judge).not.toHaveBeenCalled();
  });
});
