'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useOrgGroups,
  useGroupDetail,
  useCreateGroup,
  useUpdateGroup,
  useDeleteGroup,
  useAddGroupMember,
  useRemoveGroupMember,
  type Group,
  type GroupMember,
} from '../../../../../lib/hooks/use-groups';
import {
  useOrganization,
} from '../../../../../lib/hooks/use-organizations';

function MemberRow({
  member,
  groupId,
}: {
  member: GroupMember;
  groupId: number;
}) {
  const removeMember = useRemoveGroupMember(groupId);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleRemove = async () => {
    if (!confirmRemove) {
      setConfirmRemove(true);
      return;
    }
    await removeMember.mutateAsync(member.userId);
  };

  const initials = (member.user.name || member.user.email).charAt(0).toUpperCase();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          {member.user.image ? (
            <img src={member.user.image} alt={member.user.name || ''} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-[#1a1a1a]">{member.user.name || '---'}</p>
            <p className="text-xs text-gray-500">{member.user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <button
          onClick={handleRemove}
          disabled={removeMember.isPending}
          className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
            confirmRemove
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'text-red-400 hover:bg-red-50 hover:text-red-600'
          } disabled:opacity-50`}
        >
          {confirmRemove ? 'Confirm Remove' : 'Remove'}
        </button>
        {confirmRemove && (
          <button
            onClick={() => setConfirmRemove(false)}
            className="ml-2 text-xs text-gray-400 hover:text-gray-600"
          >
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
}

function GroupDetail({
  groupId,
  orgKey,
  onBack,
}: {
  groupId: number;
  orgKey: string;
  onBack: () => void;
}) {
  const { data: group, isLoading } = useGroupDetail(groupId);
  const { data: org } = useOrganization(orgKey);
  const addMember = useAddGroupMember(groupId);
  const updateGroup = useUpdateGroup();

  const [addUserId, setAddUserId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [error, setError] = useState('');

  const orgMembers = org?.members ?? [];
  const currentMemberIds = new Set(group?.members.map((m) => m.userId) ?? []);
  const availableMembers = orgMembers.filter((m) => !currentMemberIds.has(m.userId));

  const handleAddMember = async () => {
    if (!addUserId) return;
    setError('');
    try {
      await addMember.mutateAsync({ userId: addUserId });
      setAddUserId('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add member.';
      setError(message);
    }
  };

  const startEdit = () => {
    if (!group) return;
    setEditName(group.name);
    setEditDescription(group.description || '');
    setEditMode(true);
  };

  const handleSave = async () => {
    await updateGroup.mutateAsync({
      groupId,
      name: editName.trim(),
      description: editDescription.trim() || undefined,
    });
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!group) return <p className="text-gray-500 text-center py-10">Group not found.</p>;

  return (
    <>
      <button
        onClick={onBack}
        className="text-sm text-[#9F80DA] hover:text-[#8A6BC5] mb-4 inline-block"
      >
        &larr; Back to Groups
      </button>

      {/* Header */}
      <div className="mb-8">
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
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={updateGroup.isPending}
                className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
              >
                {updateGroup.isPending ? 'Saving...' : 'Save'}
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
              <h2 className="text-xl font-bold text-[#1a1a1a]">{group.name}</h2>
              {group.description && <p className="text-gray-500 text-sm mt-1">{group.description}</p>}
              <p className="text-xs text-gray-400 mt-1">{group.members.length} member{group.members.length !== 1 ? 's' : ''}</p>
            </div>
            <button onClick={startEdit} className="text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium">
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Members */}
      <section className="mb-8">
        <h3 className="text-base font-semibold text-[#1a1a1a] mb-4">Members</h3>
        {group.members.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No members yet.</p>
        ) : (
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Member</th>
                  <th className="py-2.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {group.members.map((member) => (
                  <MemberRow key={member.userId} member={member} groupId={groupId} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add member */}
        <div className="flex gap-2 items-center">
          <select
            value={addUserId}
            onChange={(e) => setAddUserId(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
          >
            <option value="">Select a member to add...</option>
            {availableMembers.map((m) => (
              <option key={m.userId} value={m.userId}>
                {m.user.name || m.user.email} ({m.user.email})
              </option>
            ))}
          </select>
          <button
            onClick={handleAddMember}
            disabled={addMember.isPending || !addUserId}
            className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
          >
            {addMember.isPending ? 'Adding...' : 'Add Member'}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </section>
    </>
  );
}

export default function GroupsPage() {
  const router = useRouter();
  const params = useParams();
  const orgKey = params.key as string;

  const { data: groups, isLoading } = useOrgGroups(orgKey);
  const createGroup = useCreateGroup(orgKey);
  const deleteGroup = useDeleteGroup(orgKey);

  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setError('');
    try {
      await createGroup.mutateAsync({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      setShowCreate(false);
      setName('');
      setDescription('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create group.';
      setError(message);
    }
  };

  const handleDelete = async (groupId: number) => {
    if (confirmDeleteId !== groupId) {
      setConfirmDeleteId(groupId);
      return;
    }
    await deleteGroup.mutateAsync(groupId);
    setConfirmDeleteId(null);
    if (selectedGroupId === groupId) setSelectedGroupId(null);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {selectedGroupId ? (
          <GroupDetail
            groupId={selectedGroupId}
            orgKey={orgKey}
            onBack={() => setSelectedGroupId(null)}
          />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a1a]">Groups</h1>
                <p className="text-gray-500 text-sm mt-1">Organize students into groups for bulk assignment.</p>
              </div>
              <button
                onClick={() => setShowCreate(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
              >
                New Group
              </button>
            </div>

            {/* Create form */}
            {showCreate && (
              <div className="mb-8 p-5 border border-gray-200 rounded-xl bg-gray-50">
                <h2 className="text-base font-semibold mb-4">Create Group</h2>
                <form onSubmit={handleCreate} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Group name"
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
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={createGroup.isPending || !name.trim()}
                      className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                    >
                      {createGroup.isPending ? 'Creating...' : 'Create Group'}
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

            {/* Groups list */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : !groups || groups.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-1">No groups yet.</p>
                <p className="text-gray-400 text-sm">Create your first group to organize students.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#9F80DA]/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="cursor-pointer flex-1"
                        onClick={() => setSelectedGroupId(group.id)}
                      >
                        <h3 className="font-semibold text-[#1a1a1a]">{group.name}</h3>
                        {group.description && (
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{group.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(group.id)}
                        disabled={deleteGroup.isPending}
                        className={`text-xs px-2 py-1 rounded transition-all ${
                          confirmDeleteId === group.id
                            ? 'bg-red-500 text-white'
                            : 'text-red-400 hover:bg-red-50'
                        } disabled:opacity-50`}
                      >
                        {confirmDeleteId === group.id ? 'Confirm' : 'Delete'}
                      </button>
                      {confirmDeleteId === group.id && (
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="ml-1 text-xs text-gray-400 hover:text-gray-600"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                    <div
                      className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer"
                      onClick={() => setSelectedGroupId(group.id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {group._count.members} member{group._count.members !== 1 ? 's' : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
