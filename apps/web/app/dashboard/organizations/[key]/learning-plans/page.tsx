'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useOrgLearningPlans,
  useCreateLearningPlan,
  useDeleteLearningPlan,
  type LearningPlan,
} from '../../../../../lib/hooks/use-learning-plans';

function PlanRow({
  plan,
  orgKey,
  onView,
}: {
  plan: LearningPlan;
  orgKey: string;
  onView: (id: number) => void;
}) {
  const deletePlan = useDeleteLearningPlan(orgKey);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deletePlan.mutateAsync(plan.id);
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {plan.image ? (
            <img
              src={plan.image}
              alt={plan.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#9F80DA]/20 to-[#8A6BC5]/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#9F80DA]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-[#1a1a1a]">{plan.name}</p>
            {plan.description && (
              <p className="text-xs text-gray-500 line-clamp-1">
                {plan.description}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {plan._count.courses}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {plan._count.enrollments}
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          {plan.isCorrelative && (
            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
              Correlative
            </span>
          )}
          {plan.isOptional && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
              Optional
            </span>
          )}
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onView(plan.id)}
            className="text-xs px-3 py-1.5 text-[#9F80DA] hover:bg-[#9F80DA]/10 rounded-lg transition-colors"
          >
            View
          </button>
          <button
            onClick={handleDelete}
            disabled={deletePlan.isPending}
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
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function LearningPlansPage() {
  const router = useRouter();
  const params = useParams();
  const orgKey = params.key as string;

  const { data: plans, isLoading } = useOrgLearningPlans(orgKey);
  const createPlan = useCreateLearningPlan(orgKey);

  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [isCorrelative, setIsCorrelative] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setError('');
    try {
      const plan = await createPlan.mutateAsync({
        name: name.trim(),
        description: description.trim() || undefined,
        estimatedDays: estimatedDays ? parseInt(estimatedDays) : undefined,
        isCorrelative,
      });
      setShowCreate(false);
      setName('');
      setDescription('');
      setEstimatedDays('');
      setIsCorrelative(false);
      router.push(
        `/dashboard/organizations/${orgKey}/learning-plans/${plan.id}`,
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to create plan.';
      setError(message);
    }
  };

  const handleView = (planId: number) => {
    router.push(
      `/dashboard/organizations/${orgKey}/learning-plans/${planId}`,
    );
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">
              Learning Plans
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Create and manage learning paths for your students.
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
          >
            New Plan
          </button>
        </div>

        {/* Create form */}
        {showCreate && (
          <div className="mb-8 p-5 border border-gray-200 rounded-xl bg-gray-50">
            <h2 className="text-base font-semibold mb-4">
              Create Learning Plan
            </h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Plan name"
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
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  value={estimatedDays}
                  onChange={(e) => setEstimatedDays(e.target.value)}
                  placeholder="Estimated days"
                  min={1}
                  className="w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCorrelative}
                    onChange={(e) => setIsCorrelative(e.target.checked)}
                    className="accent-[#9F80DA]"
                  />
                  Correlative (sequential order required)
                </label>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  disabled={createPlan.isPending || !name.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                >
                  {createPlan.isPending ? 'Creating...' : 'Create Plan'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </form>
          </div>
        )}

        {/* Plans table */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !plans || plans.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-gray-500 mb-1">No learning plans yet.</p>
            <p className="text-gray-400 text-sm">
              Create your first learning plan to get started.
            </p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Plan
                  </th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Courses
                  </th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Enrolled
                  </th>
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Tags
                  </th>
                  <th className="py-2.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <PlanRow
                    key={plan.id}
                    plan={plan}
                    orgKey={orgKey}
                    onView={handleView}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
