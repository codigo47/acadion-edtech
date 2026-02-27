'use client';

import { useMemo, useState } from 'react';
import { useMyBadges, useAllBadges, type Badge, type UserBadge } from '../../../lib/hooks/use-badges';

const conditionLabels: Record<string, string> = {
  course_completed: 'Complete the required course',
  score_above: 'Achieve a minimum score',
  plan_completed: 'Complete the learning plan',
  completed_in_time: 'Complete within the estimated time',
  first_in_org: 'Be the first in your organization',
  manual: 'Awarded by an administrator',
};

function getConditionDescription(badge: Badge): string {
  const cv = badge.conditionValue;
  switch (badge.conditionType) {
    case 'course_completed':
      if (cv?.minScore && cv?.requireFullProgress)
        return `Complete the course with 100% progress and a score of at least ${cv.minScore}%`;
      if (cv?.minScore)
        return `Complete the course with a score of at least ${cv.minScore}%`;
      if (cv?.requireFullProgress)
        return `Complete the course with 100% progress`;
      return 'Complete the required course';
    case 'score_above':
      return `Score above ${cv?.threshold || 80}% in the course`;
    case 'plan_completed':
      if (cv?.minAvgScore)
        return `Complete the learning plan with an average score of at least ${cv.minAvgScore}%`;
      return 'Complete all courses in the learning plan';
    case 'completed_in_time':
      return 'Complete the learning plan within its estimated number of days';
    case 'first_in_org':
      return 'Be the first student in your organization to earn this';
    case 'manual':
      return 'This badge is awarded manually by an administrator';
    default:
      return 'Complete the requirements to earn this badge';
  }
}

const typeColors: Record<string, string> = {
  progress: 'from-blue-400 to-blue-600',
  level: 'from-green-400 to-green-600',
  excellence: 'from-yellow-400 to-yellow-600',
  role: 'from-purple-400 to-purple-600',
};

const typeLabels: Record<string, string> = {
  progress: 'Progress',
  level: 'Level',
  excellence: 'Excellence',
  role: 'Role',
};

function EarnedBadgeCard({ userBadge }: { userBadge: UserBadge }) {
  const badge = userBadge.badge;
  const earnedDate = new Date(userBadge.earnedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#9F80DA]/40 hover:shadow-md transition-all">
      <div className="flex flex-col items-center text-center">
        {badge.image ? (
          <img
            src={badge.image}
            alt={badge.name}
            className="w-16 h-16 rounded-full object-cover mb-3"
          />
        ) : (
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${typeColors[badge.type] || 'from-[#9F80DA] to-[#8A6BC5]'} flex items-center justify-center mb-3`}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
        )}

        <h3 className="font-semibold text-[#1a1a1a] mb-1">{badge.name}</h3>
        {badge.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{badge.description}</p>
        )}

        <span className="text-xs px-2 py-1 rounded-full font-medium bg-purple-100 text-purple-700 mb-2">
          {typeLabels[badge.type] || badge.type}
        </span>

        <p className="text-xs text-gray-400">Earned {earnedDate}</p>
      </div>
    </div>
  );
}

function LockedBadgeCard({ badge }: { badge: Badge }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative bg-white border border-gray-200 rounded-xl p-5 transition-all"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon - grayed out */}
        {badge.image ? (
          <img
            src={badge.image}
            alt={badge.name}
            className="w-16 h-16 rounded-full object-cover mb-3 opacity-30 grayscale"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}

        <h3 className="font-semibold text-[#1a1a1a] mb-1">{badge.name}</h3>
        {badge.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{badge.description}</p>
        )}

        <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-500 mb-2">
          {typeLabels[badge.type] || badge.type}
        </span>

        {/* How to earn */}
        <div className="mt-2 w-full bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-medium text-gray-600">How to earn: </span>
            {getConditionDescription(badge)}
          </p>
        </div>
      </div>

      {/* Hover tooltip */}
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10 shadow-lg">
          {conditionLabels[badge.conditionType] || 'Complete requirements to unlock'}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]" />
        </div>
      )}
    </div>
  );
}

export default function AchievementsPage() {
  const { data: myBadgesResponse, isLoading: loadingMine } = useMyBadges();
  const myBadges = myBadgesResponse?.data;
  const { data: allBadgesResponse, isLoading: loadingAll } = useAllBadges();
  const allBadges = allBadgesResponse?.data;

  const earnedIds = useMemo(
    () => new Set(myBadges?.map((ub) => ub.badgeId) ?? []),
    [myBadges],
  );

  const lockedBadges = useMemo(
    () => allBadges?.filter((b) => !earnedIds.has(b.id)) ?? [],
    [allBadges, earnedIds],
  );

  const isLoading = loadingMine || loadingAll;
  const hasBadges = (myBadges && myBadges.length > 0) || lockedBadges.length > 0;

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Achievements</h1>
            <p className="text-gray-500 text-sm mt-1">
              Badges you&apos;ve earned and goals to unlock.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !hasBadges ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-1">No badges available yet.</p>
            <p className="text-gray-400 text-sm">Complete courses and learning plans to earn badges.</p>
          </div>
        ) : (
          <>
            {/* Earned badges */}
            {myBadges && myBadges.length > 0 && (
              <section className="mb-12">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Earned ({myBadges.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {myBadges.map((ub) => (
                    <EarnedBadgeCard key={ub.id} userBadge={ub} />
                  ))}
                </div>
              </section>
            )}

            {/* Locked badges */}
            {lockedBadges.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Available to Earn ({lockedBadges.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {lockedBadges.map((badge) => (
                    <LockedBadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
