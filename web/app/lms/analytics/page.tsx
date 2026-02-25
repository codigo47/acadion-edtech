'use client';

import { useRouter } from 'next/navigation';
import { useStudentAnalytics } from '../../../lib/hooks/use-analytics';

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function StudentAnalyticsPage() {
  const router = useRouter();
  const { data: analytics, isLoading } = useStudentAnalytics();

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={() => router.push('/lms')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">My Analytics</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1 ml-9">Track your learning progress and performance.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : analytics ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 border border-gray-200 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Enrolled</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{analytics.totalEnrolled}</p>
              </div>
              <div className="bg-white p-5 border border-gray-200 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-600">{analytics.totalCompleted}</p>
              </div>
              <div className="bg-white p-5 border border-gray-200 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Avg. Score</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{analytics.averageScore}%</p>
              </div>
              <div className="bg-white p-5 border border-gray-200 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Time</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{formatTime(analytics.totalTimeSpent)}</p>
              </div>
            </div>

            {/* Course Breakdown */}
            {analytics.courseBreakdown.length > 0 && (
              <section className="mb-8">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Course Breakdown</h2>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Course</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Progress</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Score</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Time Spent</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {analytics.courseBreakdown.map((course) => (
                        <tr key={course.courseKey} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium">{course.courseTitle}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                                <div
                                  className="h-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-600">{course.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {course.score !== null ? `${Math.round(course.score)}%` : '-'}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{formatTime(course.timeSpent)}</td>
                          <td className="px-4 py-3">
                            {course.completedAt ? (
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  course.passed
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {course.passed ? 'Passed' : 'Failed'}
                              </span>
                            ) : course.progress > 0 ? (
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

            {/* Recent Activity */}
            {analytics.recentActivity.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {analytics.recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      className="bg-white flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9F80DA]/20 to-[#8A6BC5]/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.courseTitle}</p>
                          <p className="text-xs text-gray-500">
                            Unit: {activity.unitCode} &middot; {formatTime(activity.timeSpentSeconds)} spent
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {activity.completedAt ? (
                          <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                            Completed
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">In progress</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empty state */}
            {analytics.totalEnrolled === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-1">No course data yet.</p>
                <p className="text-gray-400 text-sm">Complete some courses to see your analytics.</p>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
