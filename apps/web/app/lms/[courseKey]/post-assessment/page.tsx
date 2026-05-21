'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../../../lib/api-client';

interface PostAssessmentUnit {
  unitCode: string;
  unitTitle: string;
  moduleTitle: string;
  preScore: number | null;
  question: string;
}

interface PostAssessmentData {
  alreadyCompleted: boolean;
  enrollmentId: number;
  units: PostAssessmentUnit[];
}

interface ComparisonResult {
  comparison: Array<{
    unitCode: string;
    preScore: number;
    postScore: number;
    improvement: number;
  }>;
  avgPreScore: number;
  avgPostScore: number;
  overallImprovement: number;
}

const confidenceLabels: Record<number, string> = {
  1: 'Not confident at all',
  2: 'Slightly confident',
  3: 'Moderately confident',
  4: 'Very confident',
  5: 'Expert level',
};

export default function PostAssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const courseKey = params.courseKey as string;

  const { data, isLoading } = useQuery({
    queryKey: ['post-assessment', courseKey],
    queryFn: () => api.get<PostAssessmentData>(`/lms/courses/${courseKey}/post-assessment`),
  });

  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const submit = useMutation({
    mutationFn: (answers: Array<{ unitCode: string; confidenceScore: number }>) =>
      api.post<ComparisonResult>(`/lms/courses/${courseKey}/post-assessment`, {
        enrollmentId: data?.enrollmentId,
        answers,
      }),
    onSuccess: (res) => {
      setResult(res);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show results
  if (result) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] font-[var(--font-onest)]">
        <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
          <button onClick={() => router.push('/lms')} className="p-2 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-sm font-semibold text-[#1a1a1a]">Learning Results</h1>
        </nav>

        <div className="max-w-2xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Your Progress</h1>
          <p className="text-gray-500 text-sm mb-8">Compare your confidence before and after the course.</p>

          {/* Overall stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Pre Score</p>
              <p className="text-2xl font-bold text-gray-400">{result.avgPreScore}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Post Score</p>
              <p className="text-2xl font-bold text-[#9F80DA]">{result.avgPostScore}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Improvement</p>
              <p className={`text-2xl font-bold ${result.overallImprovement > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                {result.overallImprovement > 0 ? '+' : ''}{result.overallImprovement}%
              </p>
            </div>
          </div>

          {/* Per-unit comparison */}
          <div className="space-y-3">
            {result.comparison.map((c) => {
              const unit = data?.units.find((u) => u.unitCode === c.unitCode);
              return (
                <div key={c.unitCode} className="bg-white border border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-[#1a1a1a] mb-3">{unit?.unitTitle ?? c.unitCode}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Before</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-300 rounded-full" style={{ width: `${(c.preScore / 5) * 100}%` }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{c.preScore}/5</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[#9F80DA] mb-1">After</p>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#9F80DA] rounded-full" style={{ width: `${(c.postScore / 5) * 100}%` }} />
                      </div>
                      <p className="text-xs text-[#9F80DA] mt-1">{c.postScore}/5</p>
                    </div>
                    <div className="w-16 text-center">
                      <span className={`text-sm font-bold ${c.improvement > 0 ? 'text-green-600' : c.improvement < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                        {c.improvement > 0 ? '+' : ''}{c.improvement}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => router.push('/lms')}
              className="px-6 py-3 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white font-semibold rounded-xl shadow hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
            >
              Back to My Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.units) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Could not load assessment.</p>
        <button onClick={() => router.push('/lms')} className="text-sm text-[#9F80DA] hover:underline">
          Back to courses
        </button>
      </div>
    );
  }

  const allAnswered = data.units.every((u) => scores[u.unitCode] !== undefined);

  const handleSubmit = () => {
    const answers = data.units.map((u) => ({
      unitCode: u.unitCode,
      confidenceScore: scores[u.unitCode] ?? 3,
    }));
    submit.mutate(answers);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-[var(--font-onest)]">
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <button onClick={() => router.push(`/lms/${courseKey}`)} className="p-2 hover:bg-gray-100 rounded transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-sm font-semibold text-[#1a1a1a]">Post-Assessment</h1>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Post-Course Assessment</h1>
          <p className="text-gray-500 text-sm mt-2">
            Rate your confidence again to see how much you have improved.
          </p>
        </div>

        <div className="space-y-4">
          {data.units.map((unit) => (
            <div key={unit.unitCode} className="bg-white border border-gray-200 rounded-xl p-5">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{unit.moduleTitle}</p>
              <p className="text-sm font-semibold text-[#1a1a1a] mb-1">{unit.unitTitle}</p>
              {unit.preScore !== null && (
                <p className="text-xs text-gray-400 mb-3">Your initial confidence: {unit.preScore}/5</p>
              )}

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => setScores((prev) => ({ ...prev, [unit.unitCode]: score }))}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-all border ${
                      scores[unit.unitCode] === score
                        ? 'bg-[#9F80DA] text-white border-[#9F80DA]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#9F80DA]/40'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              {scores[unit.unitCode] && (
                <p className="text-xs text-[#9F80DA] mt-2 text-center">
                  {confidenceLabels[scores[unit.unitCode]]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submit.isPending}
            className="px-6 py-3 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white font-semibold rounded-xl shadow hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
          >
            {submit.isPending ? 'Submitting...' : 'See My Results'}
          </button>
        </div>
      </div>
    </div>
  );
}
