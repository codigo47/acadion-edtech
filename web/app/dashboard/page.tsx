'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCourses } from '../../lib/hooks/use-course';
import { useMyBadges, useAllBadges } from '../../lib/hooks/use-badges';
import type { Badge } from '../../lib/hooks/use-badges';
import StarLoader from '../components/loaders/StarLoader';
import Pagination from '../components/Pagination';

const conditionHints: Record<string, string> = {
  course_completed: 'Complete the required course to unlock',
  score_above: 'Score above the required threshold to unlock',
  plan_completed: 'Complete the learning plan to unlock',
  completed_in_time: 'Complete within the time limit to unlock',
  first_in_org: 'Be the first to complete in your org to unlock',
  manual: 'Awarded by an administrator',
};

function getConditionHint(badge: Badge): string {
  if (badge.conditionType === 'score_above' && badge.conditionValue?.score) {
    return `Score above ${badge.conditionValue.score}% to unlock`;
  }
  return conditionHints[badge.conditionType] || 'Complete the requirements to unlock';
}

export default function Dashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBadgeId, setHoveredBadgeId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data: coursesResponse, isLoading, error } = useCourses(page, limit);
  const courses = coursesResponse?.data;
  const { data: myBadgesResponse } = useMyBadges();
  const myBadges = myBadgesResponse?.data;
  const { data: allBadgesResponse } = useAllBadges();
  const allBadges = allBadgesResponse?.data;

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    if (!searchQuery.trim()) return courses;

    const query = searchQuery.toLowerCase();
    return courses.filter(course =>
      course.title?.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const earnedBadgeIds = useMemo(
    () => new Set(myBadges?.map((ub) => ub.badgeId) ?? []),
    [myBadges],
  );

  const lockedBadges = useMemo(
    () => allBadges?.filter((b) => !earnedBadgeIds.has(b.id)) ?? [],
    [allBadges, earnedBadgeIds],
  );

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">My Courses</h1>
            <p className="text-gray-500 text-sm mt-1">View and manage your course projects.</p>
          </div>
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 gap-2 border border-gray-200">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-64 text-gray-600"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <StarLoader
              texts={['Loading your courses...']}
              textPosition="bottom"
              size={1.5}
            />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">Failed to load courses. Please try again.</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            {searchQuery ? (
              <p className="text-gray-500">No courses found matching &quot;{searchQuery}&quot;</p>
            ) : (
              <div>
                <p className="text-gray-500 mb-4">You don&apos;t have any courses yet.</p>
                <button
                  onClick={() => router.push('/project')}
                  className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
                >
                  Create your first course
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => router.push(`/project/${course.key}?from=dashboard`)}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                >
                  <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-[#9F80DA]/20 to-[#8A6BC5]/20 flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#9F80DA]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#1a1a1a] truncate">
                      {course.title || 'Untitled Course'}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        course.status === 'completed' ? 'bg-green-100 text-green-700' :
                        course.status === 'generating' ? 'bg-yellow-100 text-yellow-700' :
                        course.status === 'failed' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(course.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={(e) => { e.stopPropagation(); router.push(`/project/${course.key}?from=dashboard`); }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#9F80DA] hover:bg-[#9F80DA]/5 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); router.push(`/preview/${course.key}?from=dashboard`); }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#9F80DA] hover:bg-[#9F80DA]/5 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {coursesResponse && (
              <Pagination
                page={coursesResponse.page}
                limit={coursesResponse.limit}
                total={coursesResponse.total}
                onPageChange={setPage}
              />
            )}
          </>
        )}

        {/* Achievements */}
        {(myBadges || allBadges) && (
          <div className="mt-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Achievements</h2>
              <p className="text-gray-500 text-sm mt-1">Badges you&apos;ve earned and goals to unlock.</p>
            </div>

            {(!myBadges || myBadges.length === 0) && lockedBadges.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <p className="text-gray-500">No badges available yet.</p>
              </div>
            ) : (
              <>
                {/* Earned badges */}
                {myBadges && myBadges.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Earned ({myBadges.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {myBadges.map((ub) => (
                        <div
                          key={ub.id}
                          className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
                        >
                          {ub.badge.image ? (
                            <img
                              src={ub.badge.image}
                              alt={ub.badge.name}
                              className="w-14 h-14 rounded-xl object-cover mx-auto mb-3"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mx-auto mb-3">
                              <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </div>
                          )}
                          <p className="text-sm font-medium text-[#1a1a1a] truncate">{ub.badge.name}</p>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize mt-1 inline-block">
                            {ub.badge.type}
                          </span>
                          <p className="text-xs text-gray-400 mt-2">
                            Earned on {new Date(ub.earnedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Locked badges */}
                {lockedBadges.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                      Locked ({lockedBadges.length})
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {lockedBadges.map((badge) => (
                        <div
                          key={badge.id}
                          className="relative bg-white rounded-xl border border-gray-200 p-4 text-center opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all cursor-default"
                          onMouseEnter={() => setHoveredBadgeId(badge.id)}
                          onMouseLeave={() => setHoveredBadgeId(null)}
                        >
                          {badge.image ? (
                            <img
                              src={badge.image}
                              alt={badge.name}
                              className="w-14 h-14 rounded-xl object-cover mx-auto mb-3"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-3">
                              <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                          )}
                          <p className="text-sm font-medium text-[#1a1a1a] truncate">{badge.name}</p>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize mt-1 inline-block">
                            {badge.type}
                          </span>

                          {/* Tooltip */}
                          {hoveredBadgeId === badge.id && (
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10 shadow-lg">
                              {getConditionHint(badge)}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
