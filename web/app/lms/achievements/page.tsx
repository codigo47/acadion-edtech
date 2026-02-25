'use client';

import { useRouter } from 'next/navigation';
import { useMyBadges, type UserBadge } from '../../../lib/hooks/use-badges';

function BadgeCard({ userBadge }: { userBadge: UserBadge }) {
  const badge = userBadge.badge;
  const earnedDate = new Date(userBadge.earnedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

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

export default function AchievementsPage() {
  const router = useRouter();
  const { data: badges, isLoading } = useMyBadges();

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
            <h1 className="text-2xl font-bold text-[#1a1a1a]">My Achievements</h1>
          </div>
          <p className="text-gray-500 text-sm mt-1 ml-9">Badges you have earned across all your courses.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !badges || badges.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-1">No badges earned yet.</p>
            <p className="text-gray-400 text-sm">Complete courses and learning plans to earn badges.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((ub) => (
              <BadgeCard key={ub.id} userBadge={ub} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
