'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  useAllBadges,
  useCreateBadge,
  useDeleteBadge,
  useDuplicateBadge,
  useUpdateBadge,
  type Badge,
} from '../../../lib/hooks/use-badges';
import { useOrganizations } from '../../../lib/hooks/use-organizations';
import { useCourses } from '../../../lib/hooks/use-course';
import { useMyLearningPlans } from '../../../lib/hooks/use-learning-plans';

const CONDITION_TYPES = [
  { value: 'course_completed', label: 'Complete a course' },
  { value: 'score_above', label: 'Achieve minimum score' },
  { value: 'plan_completed', label: 'Complete a learning plan' },
  { value: 'completed_in_time', label: 'Complete plan within estimated time' },
  { value: 'first_in_org', label: 'First in organization' },
  { value: 'manual', label: 'Manual (awarded by admin)' },
];

const BADGE_TYPES = [
  { value: 'progress', label: 'Progress' },
  { value: 'level', label: 'Level' },
  { value: 'excellence', label: 'Excellence' },
  { value: 'role', label: 'Role' },
];

function buildPreviewText(
  conditionType: string,
  targetName: string | null,
  conditionValue: Record<string, any>,
) {
  switch (conditionType) {
    case 'course_completed':
      if (conditionValue.minScore && conditionValue.requireFullProgress) {
        return `This badge will be awarded when the student completes "${targetName || '...'}" with 100% progress and a score of at least ${conditionValue.minScore}%.`;
      }
      if (conditionValue.minScore) {
        return `This badge will be awarded when the student completes "${targetName || '...'}" with a score of at least ${conditionValue.minScore}%.`;
      }
      if (conditionValue.requireFullProgress) {
        return `This badge will be awarded when the student completes "${targetName || '...'}" with 100% progress.`;
      }
      return `This badge will be awarded when the student completes "${targetName || '...'}".`;
    case 'score_above':
      return `This badge will be awarded when the student achieves a score above ${conditionValue.threshold || 80}% in "${targetName || '...'}".`;
    case 'plan_completed':
      if (conditionValue.minAvgScore) {
        return `This badge will be awarded when the student completes the learning plan "${targetName || '...'}" with an average score of at least ${conditionValue.minAvgScore}%.`;
      }
      return `This badge will be awarded when the student completes the learning plan "${targetName || '...'}".`;
    case 'completed_in_time':
      return `This badge will be awarded when the student completes a learning plan within its estimated time.`;
    case 'first_in_org':
      return `This badge will be awarded to the first student who earns it in the organization.`;
    case 'manual':
      return `This badge will be awarded manually by an administrator.`;
    default:
      return 'Configure a condition to see the preview.';
  }
}

function BadgeRow({
  badge,
  onView,
}: {
  badge: Badge;
  onView: (id: number) => void;
}) {
  const deleteBadge = useDeleteBadge();
  const duplicateBadge = useDuplicateBadge();
  const updateBadge = useUpdateBadge();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {badge.image ? (
            <img src={badge.image} alt={badge.name} className="w-10 h-10 rounded-lg object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-[#1a1a1a]">{badge.name}</p>
            {badge.description && (
              <p className="text-xs text-gray-500 line-clamp-1">{badge.description}</p>
            )}
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">{badge.org?.name || '—'}</td>
      <td className="py-3 px-4 text-sm text-gray-600">{badge._count?.userBadges ?? 0}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium capitalize">
            {badge.type}
          </span>
          <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">
            {CONDITION_TYPES.find((c) => c.value === badge.conditionType)?.label || badge.conditionType}
          </span>
          {badge.isPublic && (
            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">Public</span>
          )}
          {!badge.isActive && (
            <span className="text-xs px-2 py-0.5 bg-red-50 text-red-600 rounded-full font-medium">Inactive</span>
          )}
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onView(badge.id)}
            className="text-xs px-2.5 py-1.5 text-[#9F80DA] hover:bg-[#9F80DA]/10 rounded-lg transition-colors"
          >
            View
          </button>
          <button
            onClick={() => duplicateBadge.mutate(badge.id)}
            disabled={duplicateBadge.isPending}
            className="text-xs px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            Duplicate
          </button>
          <button
            onClick={() => updateBadge.mutate({ id: badge.id, isActive: !badge.isActive })}
            disabled={updateBadge.isPending}
            className="text-xs px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            {badge.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={() => {
              if (!confirmDelete) { setConfirmDelete(true); return; }
              deleteBadge.mutate(badge.id);
            }}
            disabled={deleteBadge.isPending}
            className={`text-xs px-2.5 py-1.5 rounded-lg transition-all ${
              confirmDelete ? 'bg-red-500 text-white hover:bg-red-600' : 'text-red-400 hover:bg-red-50 hover:text-red-600'
            } disabled:opacity-50`}
          >
            {confirmDelete ? 'Confirm' : 'Delete'}
          </button>
          {confirmDelete && (
            <button onClick={() => setConfirmDelete(false)} className="text-xs text-gray-400 hover:text-gray-600">
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function BadgesPage() {
  const router = useRouter();
  const { data: badges, isLoading } = useAllBadges();
  const { data: orgs } = useOrganizations();
  const { data: courses } = useCourses();
  const { data: plans } = useMyLearningPlans();

  // Wizard state
  const [showWizard, setShowWizard] = useState(false);
  const [step, setStep] = useState(1);

  // Step 1 - Basic info
  const [selectedOrgKey, setSelectedOrgKey] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [badgeType, setBadgeType] = useState('progress');
  const [isPublic, setIsPublic] = useState(false);

  // Step 2 - Condition
  const [conditionType, setConditionType] = useState('course_completed');
  const [targetId, setTargetId] = useState('');
  const [minScore, setMinScore] = useState('');
  const [requireFullProgress, setRequireFullProgress] = useState(false);
  const [minAvgScore, setMinAvgScore] = useState('');
  const [scoreThreshold, setScoreThreshold] = useState('80');

  const [error, setError] = useState('');

  const createBadge = useCreateBadge(selectedOrgKey);

  const targetName = useMemo(() => {
    if (!targetId) return null;
    const id = parseInt(targetId);
    if (conditionType === 'plan_completed' || conditionType === 'completed_in_time') {
      return plans?.find((p) => p.id === id)?.name || null;
    }
    return courses?.find((c) => c.id === id)?.title || null;
  }, [targetId, conditionType, courses, plans]);

  const conditionValue = useMemo(() => {
    const cv: Record<string, any> = {};
    if (conditionType === 'course_completed') {
      if (minScore) cv.minScore = parseInt(minScore);
      if (requireFullProgress) cv.requireFullProgress = true;
    } else if (conditionType === 'score_above') {
      cv.threshold = parseInt(scoreThreshold) || 80;
    } else if (conditionType === 'plan_completed') {
      if (minAvgScore) cv.minAvgScore = parseInt(minAvgScore);
    }
    return cv;
  }, [conditionType, minScore, requireFullProgress, scoreThreshold, minAvgScore]);

  const previewText = useMemo(
    () => buildPreviewText(conditionType, targetName, conditionValue),
    [conditionType, targetName, conditionValue],
  );

  const resetWizard = () => {
    setStep(1);
    setSelectedOrgKey('');
    setName('');
    setDescription('');
    setImage('');
    setBadgeType('progress');
    setIsPublic(false);
    setConditionType('course_completed');
    setTargetId('');
    setMinScore('');
    setRequireFullProgress(false);
    setMinAvgScore('');
    setScoreThreshold('80');
    setError('');
    setShowWizard(false);
  };

  const handleCreate = async () => {
    setError('');
    try {
      const data: any = {
        name: name.trim(),
        description: description.trim() || undefined,
        image: image.trim() || undefined,
        type: badgeType,
        conditionType,
        isPublic,
      };
      if (Object.keys(conditionValue).length > 0) {
        data.conditionValue = conditionValue;
      }
      if (targetId) {
        data.targetId = parseInt(targetId);
      }
      const badge = await createBadge.mutateAsync(data);
      resetWizard();
      router.push(`/dashboard/badges/${badge.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create badge.');
    }
  };

  const canProceedStep1 = name.trim() && selectedOrgKey && badgeType;
  const canProceedStep2 = (() => {
    if (conditionType === 'manual' || conditionType === 'first_in_org') return true;
    if (conditionType === 'completed_in_time') return true;
    if (conditionType === 'score_above') return !!targetId && !!scoreThreshold;
    return !!targetId;
  })();

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Badges</h1>
            <p className="text-gray-500 text-sm mt-1">
              Create and manage achievement badges for your students.
            </p>
          </div>
          <button
            onClick={() => setShowWizard(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
          >
            New Badge
          </button>
        </div>

        {/* Wizard */}
        {showWizard && (
          <div className="mb-8 border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
            {/* Steps indicator */}
            <div className="flex border-b border-gray-200 bg-white">
              {['Basic Info', 'Condition', 'Preview'].map((label, i) => {
                const stepNum = i + 1;
                const isActive = step === stepNum;
                const isDone = step > stepNum;
                return (
                  <button
                    key={label}
                    onClick={() => { if (isDone) setStep(stepNum); }}
                    className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
                      isActive
                        ? 'border-[#9F80DA] text-[#9F80DA]'
                        : isDone
                          ? 'border-green-400 text-green-600 cursor-pointer'
                          : 'border-transparent text-gray-400'
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs mr-2 ${
                      isActive ? 'bg-[#9F80DA] text-white' : isDone ? 'bg-green-400 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isDone ? '✓' : stepNum}
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="p-5">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-3">
                  <select
                    value={selectedOrgKey}
                    onChange={(e) => setSelectedOrgKey(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                    required
                  >
                    <option value="">Select organization...</option>
                    {orgs?.map((org) => (
                      <option key={org.key} value={org.key}>{org.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Badge name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                    required
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white resize-none"
                  />
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Image URL (optional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                  />
                  <div className="flex gap-4 items-center">
                    <select
                      value={badgeType}
                      onChange={(e) => setBadgeType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                    >
                      {BADGE_TYPES.map((bt) => (
                        <option key={bt.value} value={bt.value}>{bt.label}</option>
                      ))}
                    </select>
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                        className="accent-[#9F80DA]"
                      />
                      Visible in portfolio
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      Next
                    </button>
                    <button onClick={resetWizard} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Award when:</label>
                    <select
                      value={conditionType}
                      onChange={(e) => { setConditionType(e.target.value); setTargetId(''); setMinScore(''); setMinAvgScore(''); }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                    >
                      {CONDITION_TYPES.map((ct) => (
                        <option key={ct.value} value={ct.value}>{ct.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Course selector */}
                  {(conditionType === 'course_completed' || conditionType === 'score_above') && (
                    <div className="space-y-3">
                      <select
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                      >
                        <option value="">Select course...</option>
                        {courses?.map((c) => (
                          <option key={c.id} value={c.id}>{c.title || 'Untitled'} ({c.status})</option>
                        ))}
                      </select>
                      {conditionType === 'course_completed' && (
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={minScore}
                              onChange={(e) => setMinScore(e.target.value)}
                              placeholder="Min score %"
                              min={0}
                              max={100}
                              className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                            />
                            <span className="text-xs text-gray-400">(optional)</span>
                          </div>
                          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={requireFullProgress}
                              onChange={(e) => setRequireFullProgress(e.target.checked)}
                              className="accent-[#9F80DA]"
                            />
                            Require 100% progress
                          </label>
                        </div>
                      )}
                      {conditionType === 'score_above' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={scoreThreshold}
                            onChange={(e) => setScoreThreshold(e.target.value)}
                            placeholder="Score threshold"
                            min={0}
                            max={100}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                          />
                          <span className="text-sm text-gray-500">% minimum score</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Plan selector */}
                  {(conditionType === 'plan_completed') && (
                    <div className="space-y-3">
                      <select
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                      >
                        <option value="">Select learning plan...</option>
                        {plans?.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={minAvgScore}
                          onChange={(e) => setMinAvgScore(e.target.value)}
                          placeholder="Min avg score %"
                          min={0}
                          max={100}
                          className="w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                        />
                        <span className="text-xs text-gray-400">(optional)</span>
                      </div>
                    </div>
                  )}

                  {/* Manual / first_in_org / completed_in_time info */}
                  {conditionType === 'manual' && (
                    <p className="text-sm text-gray-500 bg-white rounded-lg p-3 border border-gray-200">
                      This badge will only be awarded manually by an administrator from the badge detail page.
                    </p>
                  )}
                  {conditionType === 'first_in_org' && (
                    <p className="text-sm text-gray-500 bg-white rounded-lg p-3 border border-gray-200">
                      This badge will be awarded to the first student who triggers any badge evaluation in the organization.
                    </p>
                  )}
                  {conditionType === 'completed_in_time' && (
                    <p className="text-sm text-gray-500 bg-white rounded-lg p-3 border border-gray-200">
                      This badge will be awarded when a student completes a learning plan within its estimated number of days.
                    </p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button onClick={() => setStep(1)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 - Preview */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start gap-4">
                      {image ? (
                        <img src={image} alt={name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0">
                          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#1a1a1a]">{name || 'Badge Name'}</h3>
                        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">{badgeType}</span>
                          {isPublic && (
                            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full">Public</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Rule: </span>
                        {previewText}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button onClick={() => setStep(2)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                      Back
                    </button>
                    <button
                      onClick={handleCreate}
                      disabled={createBadge.isPending}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      {createBadge.isPending ? 'Creating...' : 'Create Badge'}
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Badges table */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !badges || badges.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-1">No badges yet.</p>
            <p className="text-gray-400 text-sm">Create your first badge to recognize student achievements.</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Badge</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Organization</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Awarded</th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Tags</th>
                  <th className="py-2.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {badges.map((badge) => (
                  <BadgeRow key={badge.id} badge={badge} onView={(id) => router.push(`/dashboard/badges/${id}`)} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
