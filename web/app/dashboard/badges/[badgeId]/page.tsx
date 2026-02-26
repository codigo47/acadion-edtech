'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useBadgeDetail,
  useUpdateBadge,
  useDeleteBadge,
  useAwardBadge,
} from '../../../../lib/hooks/use-badges';
import { useOrganization } from '../../../../lib/hooks/use-organizations';

const CONDITION_LABELS: Record<string, string> = {
  course_completed: 'Complete a course',
  score_above: 'Achieve minimum score',
  plan_completed: 'Complete a learning plan',
  completed_in_time: 'Complete plan within estimated time',
  first_in_org: 'First in organization',
  manual: 'Manual (awarded by admin)',
};

const BADGE_TYPES = [
  { value: 'progress', label: 'Progress' },
  { value: 'level', label: 'Level' },
  { value: 'excellence', label: 'Excellence' },
  { value: 'role', label: 'Role' },
];

export default function BadgeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const badgeId = parseInt(params.badgeId as string);

  const { data: badge, isLoading } = useBadgeDetail(badgeId);
  const orgKey = badge?.org?.key || '';
  const { data: org } = useOrganization(orgKey);
  const updateBadge = useUpdateBadge();
  const deleteBadge = useDeleteBadge();
  const awardBadge = useAwardBadge();

  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editType, setEditType] = useState('');
  const [editIsPublic, setEditIsPublic] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [awardUserId, setAwardUserId] = useState('');
  const [awardError, setAwardError] = useState('');
  const [awardSuccess, setAwardSuccess] = useState('');

  const orgMembers = org?.members ?? [];

  const startEdit = () => {
    if (!badge) return;
    setEditName(badge.name);
    setEditDescription(badge.description || '');
    setEditImage(badge.image || '');
    setEditType(badge.type);
    setEditIsPublic(badge.isPublic);
    setEditMode(true);
  };

  const handleSave = async () => {
    await updateBadge.mutateAsync({
      id: badgeId,
      name: editName.trim(),
      description: editDescription.trim() || undefined,
      image: editImage.trim() || undefined,
      type: editType,
      isPublic: editIsPublic,
    });
    setEditMode(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteBadge.mutateAsync(badgeId);
    router.push('/dashboard/badges');
  };

  const handleAward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardUserId) return;
    setAwardError('');
    setAwardSuccess('');
    try {
      await awardBadge.mutateAsync({ badgeId, userId: awardUserId });
      setAwardSuccess('Badge awarded successfully.');
      setAwardUserId('');
    } catch (err: unknown) {
      setAwardError(err instanceof Error ? err.message : 'Failed to award badge.');
    }
  };

  const conditionSummary = (() => {
    if (!badge) return '';
    const cv = badge.conditionValue || {};
    switch (badge.conditionType) {
      case 'course_completed': {
        let s = `Complete course (ID: ${badge.targetId})`;
        if (cv.minScore) s += ` with score ≥ ${cv.minScore}%`;
        if (cv.requireFullProgress) s += `, 100% progress required`;
        return s;
      }
      case 'score_above':
        return `Score above ${cv.threshold || 80}% in course (ID: ${badge.targetId})`;
      case 'plan_completed': {
        let s = `Complete learning plan (ID: ${badge.targetId})`;
        if (cv.minAvgScore) s += ` with avg score ≥ ${cv.minAvgScore}%`;
        return s;
      }
      case 'completed_in_time':
        return 'Complete a learning plan within its estimated time';
      case 'first_in_org':
        return 'First student to trigger evaluation in the organization';
      case 'manual':
        return 'Awarded manually by an administrator';
      default:
        return badge.conditionType;
    }
  })();

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back link */}
        <button
          onClick={() => router.push('/dashboard/badges')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#9F80DA] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Badges
        </button>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !badge ? (
          <div className="text-center py-20 text-gray-500">Badge not found.</div>
        ) : (
          <>
            {/* Header / Edit */}
            <section className="mb-8">
              {editMode ? (
                <div className="space-y-3 p-5 border border-gray-200 rounded-xl bg-gray-50">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white resize-none"
                  />
                  <input
                    type="text"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    placeholder="Image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                  />
                  <div className="flex gap-4 items-center">
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                    >
                      {BADGE_TYPES.map((bt) => (
                        <option key={bt.value} value={bt.value}>{bt.label}</option>
                      ))}
                    </select>
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editIsPublic}
                        onChange={(e) => setEditIsPublic(e.target.checked)}
                        className="accent-[#9F80DA]"
                      />
                      Visible in portfolio
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={updateBadge.isPending}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      {updateBadge.isPending ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setEditMode(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4">
                  {badge.image ? (
                    <img src={badge.image} alt={badge.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-[#1a1a1a]">{badge.name}</h1>
                    {badge.description && (
                      <p className="text-gray-500 text-sm mt-1">{badge.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {badge.org && (
                        <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                          {badge.org.name}
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">{badge.type}</span>
                      <span className="text-xs text-gray-500">{badge._count?.userBadges ?? 0} awarded</span>
                      {badge.isPublic && (
                        <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">Public</span>
                      )}
                      {!badge.isActive && (
                        <span className="text-xs px-2 py-0.5 bg-red-50 text-red-600 rounded-full font-medium">Inactive</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={startEdit} className="text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium">
                      Edit
                    </button>
                    <button
                      onClick={() => updateBadge.mutate({ id: badgeId, isActive: !badge.isActive })}
                      disabled={updateBadge.isPending}
                      className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      {badge.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleteBadge.isPending}
                      className={`text-sm px-3 py-1 rounded-lg transition-all ${
                        confirmDelete ? 'bg-red-500 text-white hover:bg-red-600' : 'text-red-400 hover:text-red-600'
                      } disabled:opacity-50`}
                    >
                      {confirmDelete ? 'Confirm Delete' : 'Delete'}
                    </button>
                    {confirmDelete && (
                      <button onClick={() => setConfirmDelete(false)} className="text-sm text-gray-400 hover:text-gray-600">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Condition */}
            <section className="mb-10">
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-3">Award Condition</h2>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
                    {CONDITION_LABELS[badge.conditionType] || badge.conditionType}
                  </span>
                </div>
                <p className="text-sm text-blue-800">{conditionSummary}</p>
              </div>
            </section>

            {/* Manual Award */}
            {(badge.conditionType === 'manual' || true) && (
              <section className="mb-10">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-3">Award Manually</h2>
                <form onSubmit={handleAward} className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex gap-3">
                    <select
                      value={awardUserId}
                      onChange={(e) => setAwardUserId(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                    >
                      <option value="">Select a member...</option>
                      {orgMembers.map((m) => (
                        <option key={m.userId} value={m.userId}>
                          {m.user.name || m.user.email} ({m.user.email})
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      disabled={awardBadge.isPending || !awardUserId}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      {awardBadge.isPending ? 'Awarding...' : 'Award'}
                    </button>
                  </div>
                  {awardError && <p className="text-red-500 text-xs mt-2">{awardError}</p>}
                  {awardSuccess && <p className="text-green-600 text-xs mt-2">{awardSuccess}</p>}
                </form>
              </section>
            )}

            {/* Users who earned this badge */}
            <section className="mb-10">
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-3">
                Awarded To
                <span className="ml-2 text-xs text-gray-400 font-normal">{badge.userBadges.length}</span>
              </h2>
              {badge.userBadges.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No one has earned this badge yet.</p>
              ) : (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {badge.userBadges.map((ub) => (
                        <tr key={ub.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {ub.user.image ? (
                                <img src={ub.user.image} alt={ub.user.name || ''} className="w-7 h-7 rounded-full object-cover" />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-xs font-bold">
                                  {(ub.user.name || ub.user.email).charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-[#1a1a1a]">{ub.user.name || '---'}</p>
                                <p className="text-xs text-gray-500">{ub.user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(ub.earnedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
