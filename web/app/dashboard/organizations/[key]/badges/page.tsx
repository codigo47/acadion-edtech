'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useOrgBadges,
  useCreateBadge,
  useUpdateBadge,
  useDeleteBadge,
  type Badge,
} from '../../../../../lib/hooks/use-badges';

const BADGE_TYPES = [
  { value: 'progress', label: 'Progress' },
  { value: 'level', label: 'Level' },
  { value: 'excellence', label: 'Excellence' },
  { value: 'role', label: 'Role' },
];

const CONDITION_TYPES = [
  { value: 'course_completed', label: 'Course Completed' },
  { value: 'score_above', label: 'Score Above Threshold' },
  { value: 'completed_in_time', label: 'Completed In Time' },
  { value: 'first_in_org', label: 'First In Organization' },
  { value: 'plan_completed', label: 'Learning Plan Completed' },
];

function BadgeRow({
  badge,
  onEdit,
  orgKey,
}: {
  badge: Badge;
  onEdit: (badge: Badge) => void;
  orgKey: string;
}) {
  const deleteBadge = useDeleteBadge();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteBadge.mutateAsync(badge.id);
    setConfirmDelete(false);
  };

  const typeLabel = BADGE_TYPES.find((t) => t.value === badge.type)?.label || badge.type;
  const conditionLabel = CONDITION_TYPES.find((c) => c.value === badge.conditionType)?.label || badge.conditionType;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {badge.image ? (
            <img src={badge.image} alt={badge.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-xs font-bold">
              {badge.name.charAt(0).toUpperCase()}
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
      <td className="py-3 px-4">
        <span className="text-xs px-2 py-1 rounded-full font-medium bg-purple-100 text-purple-700">
          {typeLabel}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="text-xs text-gray-600">{conditionLabel}</span>
      </td>
      <td className="py-3 px-4 text-center">
        <span className="text-xs text-gray-500">{badge._count?.userBadges ?? 0}</span>
      </td>
      <td className="py-3 px-4 text-right">
        <button
          onClick={() => onEdit(badge)}
          className="text-xs px-3 py-1.5 rounded-lg text-[#9F80DA] hover:bg-purple-50 transition-all mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleteBadge.isPending}
          className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
            confirmDelete
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'text-red-400 hover:bg-red-50 hover:text-red-600'
          } disabled:opacity-50`}
        >
          {confirmDelete ? 'Confirm' : 'Delete'}
        </button>
        {confirmDelete && (
          <button
            onClick={() => setConfirmDelete(false)}
            className="ml-2 text-xs text-gray-400 hover:text-gray-600"
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
}

export default function OrgBadgesPage() {
  const router = useRouter();
  const params = useParams();
  const orgKey = params.key as string;

  const { data: badges, isLoading } = useOrgBadges(orgKey);
  const createBadge = useCreateBadge(orgKey);
  const updateBadge = useUpdateBadge();

  const [showForm, setShowForm] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);

  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formType, setFormType] = useState('progress');
  const [formConditionType, setFormConditionType] = useState('course_completed');
  const [formConditionValue, setFormConditionValue] = useState('');
  const [formTargetId, setFormTargetId] = useState('');
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setFormName('');
    setFormDescription('');
    setFormImage('');
    setFormType('progress');
    setFormConditionType('course_completed');
    setFormConditionValue('');
    setFormTargetId('');
    setFormError('');
    setEditingBadge(null);
    setShowForm(false);
  };

  const openEdit = (badge: Badge) => {
    setEditingBadge(badge);
    setFormName(badge.name);
    setFormDescription(badge.description || '');
    setFormImage(badge.image || '');
    setFormType(badge.type);
    setFormConditionType(badge.conditionType);
    setFormConditionValue(badge.conditionValue ? JSON.stringify(badge.conditionValue) : '');
    setFormTargetId(badge.targetId != null ? String(badge.targetId) : '');
    setFormError('');
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Name is required.');
      return;
    }

    let conditionValue: Record<string, any> | undefined;
    if (formConditionValue.trim()) {
      try {
        conditionValue = JSON.parse(formConditionValue);
      } catch {
        setFormError('Condition value must be valid JSON.');
        return;
      }
    }

    const payload = {
      name: formName.trim(),
      description: formDescription.trim() || undefined,
      image: formImage.trim() || undefined,
      type: formType,
      conditionType: formConditionType,
      conditionValue,
      targetId: formTargetId ? parseInt(formTargetId, 10) : undefined,
    };

    try {
      if (editingBadge) {
        await updateBadge.mutateAsync({ id: editingBadge.id, ...payload });
      } else {
        await createBadge.mutateAsync(payload);
      }
      resetForm();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save badge.';
      setFormError(message);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a1a]">Badges</h1>
                <p className="text-gray-500 text-sm mt-1">
                  {badges?.length ?? 0} badge{(badges?.length ?? 0) !== 1 ? 's' : ''} configured
                </p>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
              >
                Create Badge
              </button>
            </div>

            {/* Create / Edit Form */}
            {showForm && (
              <section className="mb-8">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">
                  {editingBadge ? 'Edit Badge' : 'New Badge'}
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="p-5 border border-gray-200 rounded-xl bg-gray-50 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Badge name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                    <input
                      type="text"
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Brief description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                      >
                        {BADGE_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Condition Type</label>
                      <select
                        value={formConditionType}
                        onChange={(e) => setFormConditionType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                      >
                        {CONDITION_TYPES.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Condition Value (JSON)</label>
                      <input
                        type="text"
                        value={formConditionValue}
                        onChange={(e) => setFormConditionValue(e.target.value)}
                        placeholder='{"threshold": 80}'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Target ID</label>
                      <input
                        type="number"
                        value={formTargetId}
                        onChange={(e) => setFormTargetId(e.target.value)}
                        placeholder="Course or Plan ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={createBadge.isPending || updateBadge.isPending}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      {(createBadge.isPending || updateBadge.isPending)
                        ? 'Saving...'
                        : editingBadge
                          ? 'Update Badge'
                          : 'Create Badge'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                  {formError && <p className="text-red-500 text-xs">{formError}</p>}
                </form>
              </section>
            )}

            {/* Badges Table */}
            {badges && badges.length > 0 ? (
              <section>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Badge</th>
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Condition</th>
                        <th className="py-2.5 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Earned</th>
                        <th className="py-2.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {badges.map((badge) => (
                        <BadgeRow key={badge.id} badge={badge} onEdit={openEdit} orgKey={orgKey} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : (
              !showForm && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-1">No badges configured yet.</p>
                  <p className="text-gray-400 text-sm">Create badges to reward your learners.</p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
