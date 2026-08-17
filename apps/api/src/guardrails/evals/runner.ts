import { GuardrailsService } from '../guardrails.service';
import { GuardrailResult } from '../types';
import { EvalCase } from './datasets/chat-input.dataset';

export interface CaseReport {
  id: string;
  passed: boolean;
  /** Empty when passed; one line per unmet expectation otherwise. */
  failures: string[];
  latencyMs: number;
  result: GuardrailResult;
}

export interface EvalReport {
  cases: CaseReport[];
  passRate: number;
  /** Benign input wrongly blocked — the metric that protects the product. */
  falsePositives: number;
  /** Unsafe input wrongly allowed — the metric that protects the users. */
  falseNegatives: number;
  p95LatencyMs: number;
}

/**
 * Scores the guardrail layer against a dataset.
 *
 * Kept separate from the Jest specs so the same harness can be driven from a
 * CI job or a script later without dragging the test runner along.
 */
export async function runEval(
  service: GuardrailsService,
  cases: EvalCase[],
  opts: { useJudge: boolean },
): Promise<EvalReport> {
  const reports: CaseReport[] = [];

  for (const testCase of cases) {
    const result = await service.check(
      testCase.input,
      testCase.field,
      opts.useJudge,
    );
    reports.push({
      id: testCase.id,
      passed: false,
      failures: collectFailures(testCase, result),
      latencyMs: result.latencyMs,
      result,
    });
  }

  for (const report of reports) {
    report.passed = report.failures.length === 0;
  }

  const passed = reports.filter((r) => r.passed).length;

  return {
    cases: reports,
    passRate: reports.length === 0 ? 1 : passed / reports.length,
    falsePositives: countMismatches(cases, reports, 'falsePositive'),
    falseNegatives: countMismatches(cases, reports, 'falseNegative'),
    p95LatencyMs: percentile(
      reports.map((r) => r.latencyMs),
      0.95,
    ),
  };
}

function collectFailures(
  testCase: EvalCase,
  result: GuardrailResult,
): string[] {
  const failures: string[] = [];
  const { expected } = testCase;

  if (result.decision !== expected.decision) {
    failures.push(
      `expected decision "${expected.decision}", got "${result.decision}"`,
    );
  }

  const ruleIds = result.findings.map((f) => f.rule);

  for (const required of expected.rules ?? []) {
    if (!ruleIds.includes(required)) {
      failures.push(
        `expected rule "${required}" in findings [${ruleIds.join(', ')}]`,
      );
    }
  }

  // An explicitly empty rule list means "clean pass" — no findings at all.
  if (expected.rules?.length === 0 && ruleIds.length > 0) {
    failures.push(`expected no findings, got [${ruleIds.join(', ')}]`);
  }

  for (const forbidden of expected.mustNotContain ?? []) {
    if (result.sanitizedInput.includes(forbidden)) {
      failures.push(`sanitized output still contains "${forbidden}"`);
    }
  }

  return failures;
}

function countMismatches(
  cases: EvalCase[],
  reports: CaseReport[],
  kind: 'falsePositive' | 'falseNegative',
): number {
  return cases.reduce((count, testCase, i) => {
    const actual = reports[i].result.decision;
    const expected = testCase.expected.decision;
    const wronglyBlocked = expected !== 'block' && actual === 'block';
    const wronglyAllowed = expected === 'block' && actual !== 'block';
    const hit = kind === 'falsePositive' ? wronglyBlocked : wronglyAllowed;
    return hit ? count + 1 : count;
  }, 0);
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil(p * sorted.length) - 1);
  return sorted[Math.max(0, index)];
}

/** Renders a report as a readable block for test failure output. */
export function formatReport(report: EvalReport): string {
  const lines = report.cases.map((c) =>
    c.passed
      ? `  PASS  ${c.id} (${c.latencyMs}ms)`
      : `  FAIL  ${c.id} (${c.latencyMs}ms)\n        ${c.failures.join('\n        ')}`,
  );
  return [
    `pass rate: ${(report.passRate * 100).toFixed(0)}%  ` +
      `false positives: ${report.falsePositives}  ` +
      `false negatives: ${report.falseNegatives}  ` +
      `p95: ${report.p95LatencyMs}ms`,
    ...lines,
  ].join('\n');
}
