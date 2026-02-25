'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useLearningPlanDetail,
  useUpdateLearningPlan,
  useAddPlanCourse,
  useRemovePlanCourse,
  useReorderPlanCourses,
  useAssignPlan,
  useAssignPlanToGroup,
  useDeleteLearningPlan,
  type PlanCourse,
} from '../../../../lib/hooks/use-learning-plans';
import {
  useOrgGroups,
} from '../../../../lib/hooks/use-groups';
import {
  useOrganization,
} from '../../../../lib/hooks/use-organizations';
import { useCourses } from '../../../../lib/hooks/use-course';

function CourseItem({
  pc,
  planId,
  index,
  total,
  onMoveUp,
  onMoveDown,
}: {
  pc: PlanCourse;
  planId: number;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const removeCourse = useRemovePlanCourse(planId);

  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
      <div className="flex flex-col gap-0.5">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-0.5 text-gray-400 hover:text-[#9F80DA] disabled:opacity-30 disabled:cursor-default"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="p-0.5 text-gray-400 hover:text-[#9F80DA] disabled:opacity-30 disabled:cursor-default"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      <span className="text-xs text-gray-400 font-mono w-6 text-center">{index + 1}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#1a1a1a] truncate">
          {pc.course.title || 'Untitled Course'}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-gray-400">{pc.course.status}</span>
          {pc.required && (
            <span className="text-xs text-orange-600 font-medium">Required</span>
          )}
        </div>
      </div>
      <button
        onClick={() => removeCourse.mutate(pc.courseId)}
        disabled={removeCourse.isPending}
        className="text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors disabled:opacity-50"
      >
        Remove
      </button>
    </div>
  );
}

export default function LearningPlanDetailPage() {
  const router = useRouter();
  const params = useParams();
  const planId = parseInt(params.planId as string);

  const { data: plan, isLoading } = useLearningPlanDetail(planId);
  const orgKey = plan?.org?.key || '';
  const { data: org } = useOrganization(orgKey);
  const { data: groups } = useOrgGroups(orgKey);
  const { data: courses } = useCourses();
  const updatePlan = useUpdateLearningPlan();
  const addCourse = useAddPlanCourse(planId);
  const reorderCourses = useReorderPlanCourses(planId);
  const assignPlan = useAssignPlan(planId);
  const assignToGroup = useAssignPlanToGroup(planId);
  const deletePlan = useDeleteLearningPlan();

  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDays, setEditDays] = useState('');
  const [editCorrelative, setEditCorrelative] = useState(false);

  const [addCourseId, setAddCourseId] = useState('');
  const [assignUserId, setAssignUserId] = useState('');
  const [assignDeadline, setAssignDeadline] = useState('');
  const [assignGroupId, setAssignGroupId] = useState('');
  const [groupDeadline, setGroupDeadline] = useState('');
  const [assignError, setAssignError] = useState('');
  const [assignSuccess, setAssignSuccess] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const existingCourseIds = new Set(plan?.courses.map((c) => c.courseId) ?? []);
  const availableCourses = courses?.filter((c) => !existingCourseIds.has(c.id)) ?? [];

  const startEdit = () => {
    if (!plan) return;
    setEditName(plan.name);
    setEditDescription(plan.description || '');
    setEditDays(plan.estimatedDays?.toString() || '');
    setEditCorrelative(plan.isCorrelative);
    setEditMode(true);
  };

  const handleSave = async () => {
    await updatePlan.mutateAsync({
      planId,
      name: editName.trim(),
      description: editDescription.trim() || undefined,
      estimatedDays: editDays ? parseInt(editDays) : undefined,
      isCorrelative: editCorrelative,
    });
    setEditMode(false);
  };

  const handleAddCourse = async () => {
    if (!addCourseId) return;
    await addCourse.mutateAsync({
      courseId: parseInt(addCourseId),
      order: (plan?.courses.length ?? 0),
    });
    setAddCourseId('');
  };

  const handleReorder = async (planCourses: PlanCourse[], fromIndex: number, toIndex: number) => {
    const reordered = [...planCourses];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    const items = reordered.map((c, i) => ({
      courseId: c.courseId,
      order: i,
    }));
    await reorderCourses.mutateAsync(items);
  };

  const handleAssignUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignUserId.trim()) return;
    setAssignError('');
    setAssignSuccess('');
    try {
      await assignPlan.mutateAsync({
        userId: assignUserId.trim(),
        deadline: assignDeadline || undefined,
      });
      setAssignSuccess('User assigned successfully.');
      setAssignUserId('');
      setAssignDeadline('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to assign.';
      setAssignError(message);
    }
  };

  const handleAssignGroup = async () => {
    if (!assignGroupId) return;
    setAssignError('');
    setAssignSuccess('');
    try {
      const result = await assignToGroup.mutateAsync({
        groupId: parseInt(assignGroupId),
        deadline: groupDeadline || undefined,
      }) as { assigned: number; total: number };
      setAssignSuccess(`Assigned to ${result.assigned} members.`);
      setAssignGroupId('');
      setGroupDeadline('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to assign group.';
      setAssignError(message);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deletePlan.mutateAsync(planId);
    router.push('/dashboard/learning-plans');
  };

  const orgMembers = org?.members ?? [];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back link */}
        <button
          onClick={() => router.push('/dashboard/learning-plans')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#9F80DA] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Learning Plans
        </button>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !plan ? (
          <div className="text-center py-20 text-gray-500">Plan not found.</div>
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
                  <div className="flex gap-3 items-center">
                    <input
                      type="number"
                      value={editDays}
                      onChange={(e) => setEditDays(e.target.value)}
                      placeholder="Estimated days"
                      min={1}
                      className="w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                    />
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editCorrelative}
                        onChange={(e) => setEditCorrelative(e.target.checked)}
                        className="accent-[#9F80DA]"
                      />
                      Correlative
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={updatePlan.isPending}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      {updatePlan.isPending ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-[#1a1a1a]">{plan.name}</h1>
                    {plan.description && (
                      <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {plan.org && (
                        <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium">
                          {plan.org.name}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {plan.courses.length} course{plan.courses.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-gray-500">
                        {plan._count.enrollments} enrolled
                      </span>
                      {plan.estimatedDays && (
                        <span className="text-xs text-gray-500">
                          {plan.estimatedDays} day{plan.estimatedDays !== 1 ? 's' : ''} est.
                        </span>
                      )}
                      {plan.isCorrelative && (
                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                          Correlative
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={startEdit}
                      className="text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deletePlan.isPending}
                      className={`text-sm px-3 py-1 rounded-lg transition-all ${
                        confirmDelete
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'text-red-400 hover:text-red-600'
                      } disabled:opacity-50`}
                    >
                      {confirmDelete ? 'Confirm Delete' : 'Delete'}
                    </button>
                    {confirmDelete && (
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="text-sm text-gray-400 hover:text-gray-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Courses */}
            <section className="mb-10">
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Courses</h2>
              <div className="space-y-2 mb-4">
                {plan.courses.length === 0 ? (
                  <p className="text-sm text-gray-400 py-4 text-center">No courses added yet.</p>
                ) : (
                  plan.courses.map((pc, i) => (
                    <CourseItem
                      key={pc.courseId}
                      pc={pc}
                      planId={planId}
                      index={i}
                      total={plan.courses.length}
                      onMoveUp={() => handleReorder(plan.courses, i, i - 1)}
                      onMoveDown={() => handleReorder(plan.courses, i, i + 1)}
                    />
                  ))
                )}
              </div>
              {/* Add course */}
              <div className="flex gap-2 items-center">
                <select
                  value={addCourseId}
                  onChange={(e) => setAddCourseId(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                >
                  <option value="">Select a course to add...</option>
                  {availableCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title || 'Untitled'} ({c.status})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddCourse}
                  disabled={addCourse.isPending || !addCourseId}
                  className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                >
                  {addCourse.isPending ? 'Adding...' : 'Add'}
                </button>
              </div>
            </section>

            {/* Assign to User */}
            <section className="mb-10">
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Assign to User</h2>
              <form onSubmit={handleAssignUser} className="p-5 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                <div className="flex gap-3">
                  <select
                    value={assignUserId}
                    onChange={(e) => setAssignUserId(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                  >
                    <option value="">Select a member...</option>
                    {orgMembers.map((m) => (
                      <option key={m.userId} value={m.userId}>
                        {m.user.name || m.user.email} ({m.user.email})
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={assignDeadline}
                    onChange={(e) => setAssignDeadline(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                    placeholder="Deadline (optional)"
                  />
                  <button
                    type="submit"
                    disabled={assignPlan.isPending || !assignUserId}
                    className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                  >
                    {assignPlan.isPending ? 'Assigning...' : 'Assign'}
                  </button>
                </div>
                {assignError && <p className="text-red-500 text-xs">{assignError}</p>}
                {assignSuccess && <p className="text-green-600 text-xs">{assignSuccess}</p>}
              </form>
            </section>

            {/* Assign to Group */}
            {groups && groups.length > 0 && (
              <section className="mb-10">
                <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Assign to Group</h2>
                <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                  <div className="flex gap-3">
                    <select
                      value={assignGroupId}
                      onChange={(e) => setAssignGroupId(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                    >
                      <option value="">Select a group...</option>
                      {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name} ({g._count.members} members)
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={groupDeadline}
                      onChange={(e) => setGroupDeadline(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                    />
                    <button
                      onClick={handleAssignGroup}
                      disabled={assignToGroup.isPending || !assignGroupId}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      {assignToGroup.isPending ? 'Assigning...' : 'Assign Group'}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Enrollments List */}
            <section className="mb-10">
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">
                Enrollments
                <span className="ml-2 text-xs text-gray-400 font-normal">{plan.enrollments.length}</span>
              </h2>
              {plan.enrollments.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No enrollments yet.</p>
              ) : (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Enrolled</th>
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Deadline</th>
                        <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plan.enrollments.map((e) => (
                        <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {e.user.image ? (
                                <img src={e.user.image} alt={e.user.name || ''} className="w-7 h-7 rounded-full object-cover" />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-xs font-bold">
                                  {(e.user.name || e.user.email).charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-[#1a1a1a]">{e.user.name || '---'}</p>
                                <p className="text-xs text-gray-500">{e.user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(e.enrolledAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {e.deadline ? new Date(e.deadline).toLocaleDateString() : '---'}
                          </td>
                          <td className="py-3 px-4">
                            {e.completedAt ? (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Completed</span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">In Progress</span>
                            )}
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
