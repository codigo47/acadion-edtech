'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganizations } from '../../../lib/hooks/use-organizations';
import { useOrgAnalytics } from '../../../lib/hooks/use-analytics';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function AnalyticsDashboardPage() {
  const router = useRouter();
  const { data: orgs, isLoading: orgsLoading } = useOrganizations();
  const [selectedOrgKey, setSelectedOrgKey] = useState('');

  const { data: analytics, isLoading: analyticsLoading } = useOrgAnalytics(selectedOrgKey);

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">View organization and course performance metrics.</p>
        </div>

        {/* Org Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
          {orgsLoading ? (
            <div className="w-64 h-10 bg-gray-100 rounded-lg animate-pulse" />
          ) : (
            <select
              value={selectedOrgKey}
              onChange={(e) => setSelectedOrgKey(e.target.value)}
              className="w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA]"
            >
              <option value="">Select an organization</option>
              {orgs?.map((org) => (
                <option key={org.key} value={org.key}>
                  {org.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Analytics Content */}
        {selectedOrgKey && analyticsLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {analytics && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 border border-gray-200 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Courses</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{analytics.totalCourses}</p>
              </div>
              <div className="p-5 border border-gray-200 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Students</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{analytics.totalStudents}</p>
              </div>
              <div className="p-5 border border-gray-200 rounded-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Avg. Completion</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">{analytics.averageCompletion}%</p>
              </div>
            </div>

            {/* Top Courses */}
            {analytics.topCourses.length > 0 && (
              <section className="mb-8">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Top Courses</h2>
                <div className="space-y-3">
                  {analytics.topCourses.map((course, i) => (
                    <div
                      key={course.courseKey}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#9F80DA]/40 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => router.push(`/dashboard/analytics/${course.courseKey}`)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="font-medium text-sm">{course.title}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{course.enrollmentCount} enrolled</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Recent Completions */}
            {analytics.recentCompletions.length > 0 && (
              <section>
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Recent Completions</h2>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Student</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Course</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Score</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                        <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {analytics.recentCompletions.map((completion, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-medium">{completion.user.name || completion.user.email}</p>
                            {completion.user.name && (
                              <p className="text-xs text-gray-400">{completion.user.email}</p>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{completion.courseTitle}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {completion.score !== null ? `${Math.round(completion.score)}%` : '-'}
                          </td>
                          <td className="px-4 py-3">
                            {completion.passed !== null && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  completion.passed
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {completion.passed ? 'Passed' : 'Failed'}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">
                            {completion.completedAt ? formatDate(completion.completedAt) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Empty state for no data */}
            {analytics.totalCourses === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-1">No courses in this organization yet.</p>
                <p className="text-gray-400 text-sm">Create courses and enroll students to see analytics.</p>
              </div>
            )}
          </>
        )}

        {/* No org selected state */}
        {!selectedOrgKey && !orgsLoading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-500">Select an organization to view analytics.</p>
          </div>
        )}
      </div>
    </div>
  );
}
