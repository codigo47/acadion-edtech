'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCourseAnalytics, useCourseUserProgress } from '../../../../lib/hooks/use-analytics';

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

export default function CourseAnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const courseKey = params.courseKey as string;

  const { data: analytics, isLoading } = useCourseAnalytics(courseKey);
  const { data: users } = useCourseUserProgress(courseKey);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const maxCompletions = Math.max(...analytics.completionOverTime.map((w) => w.count), 1);

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">
            {analytics.courseTitle || 'Untitled Course'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Course analytics and student performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="p-4 border border-gray-200 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Enrolled</p>
            <p className="text-xl font-bold">{analytics.totalEnrollments}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Active</p>
            <p className="text-xl font-bold text-blue-600">{analytics.activeStudents}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Completed</p>
            <p className="text-xl font-bold text-green-600">{analytics.completedStudents}</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Avg. Score</p>
            <p className="text-xl font-bold">{analytics.averageScore}%</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Pass Rate</p>
            <p className="text-xl font-bold">{analytics.passRate}%</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Avg. Time</p>
            <p className="text-xl font-bold">{formatTime(analytics.averageTimeSpent)}</p>
          </div>
        </div>

        {/* Completions Over Time Chart */}
        {analytics.completionOverTime.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Completions Over Time</h2>
            <div className="p-5 border border-gray-200 rounded-xl">
              <div className="flex items-end gap-2" style={{ height: '120px' }}>
                {analytics.completionOverTime.map((week) => {
                  const height = maxCompletions > 0 ? (week.count / maxCompletions) * 100 : 0;
                  return (
                    <div key={week.week} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-gray-500">{week.count}</span>
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-[#9F80DA] to-[#8A6BC5] transition-all"
                        style={{ height: `${Math.max(height, 2)}%` }}
                      />
                      <span className="text-[9px] text-gray-400">
                        {new Date(week.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Unit Breakdown Table */}
        {analytics.unitBreakdown.length > 0 && (
          <section className="mb-8">
            <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Unit Breakdown</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Unit</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Completion</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Avg. Time</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Avg. Focus Loss</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {analytics.unitBreakdown.map((unit) => (
                    <tr key={unit.unitCode} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{unit.unitCode}</td>
                      <td className="px-4 py-3 font-medium">{unit.title}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[80px]">
                            <div
                              className="h-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] rounded-full"
                              style={{ width: `${unit.completionRate}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{unit.completionRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{formatTime(unit.averageTime)}</td>
                      <td className="px-4 py-3 text-gray-600">{unit.averageFocusLoss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Student Progress Table */}
        {users && users.length > 0 && (
          <section>
            <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Student Progress</h2>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Student</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Progress</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Score</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((entry) => (
                    <tr key={entry.user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium">{entry.user.name || entry.user.email}</p>
                        {entry.user.name && (
                          <p className="text-xs text-gray-400">{entry.user.email}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                            <div
                              className="h-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] rounded-full transition-all"
                              style={{ width: `${entry.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{entry.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {entry.score !== null ? `${Math.round(entry.score)}%` : '-'}
                      </td>
                      <td className="px-4 py-3">
                        {entry.completedAt ? (
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              entry.passed
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {entry.passed ? 'Passed' : 'Failed'}
                          </span>
                        ) : entry.startedAt ? (
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-blue-100 text-blue-700">
                            In Progress
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
                            Not Started
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
