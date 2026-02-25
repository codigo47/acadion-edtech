'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useOrganization,
  useInviteMember,
  useUpdateMemberRole,
  useRemoveMember,
  type OrgRole,
  type OrgMember,
} from '../../../../lib/hooks/use-organizations';
import { useUser } from '../../../../lib/hooks/use-auth';

const ROLES: OrgRole[] = ['super_admin', 'org_admin', 'editor', 'commenter', 'viewer', 'student'];

const roleLabels: Record<OrgRole, string> = {
  super_admin: 'Super Admin',
  org_admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
  commenter: 'Commenter',
  student: 'Student',
};

const roleColors: Record<OrgRole, string> = {
  super_admin: 'bg-purple-100 text-purple-700',
  org_admin: 'bg-blue-100 text-blue-700',
  editor: 'bg-green-100 text-green-700',
  viewer: 'bg-gray-100 text-gray-600',
  commenter: 'bg-yellow-100 text-yellow-700',
  student: 'bg-indigo-100 text-indigo-700',
};

function MemberRow({
  member,
  isMe,
  orgKey,
}: {
  member: OrgMember;
  isMe: boolean;
  orgKey: string;
}) {
  const updateRole = useUpdateMemberRole(orgKey);
  const removeMember = useRemoveMember(orgKey);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const initials = (member.user.name || member.user.email).charAt(0).toUpperCase();

  const handleRoleChange = async (role: OrgRole) => {
    await updateRole.mutateAsync({ userId: member.userId, role });
  };

  const handleRemove = async () => {
    if (!confirmRemove) {
      setConfirmRemove(true);
      return;
    }
    await removeMember.mutateAsync(member.userId);
  };

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
            <p className="text-sm font-medium text-[#1a1a1a]">{member.user.name || '—'}</p>
            <p className="text-xs text-gray-500">{member.user.email}</p>
          </div>
          {isMe && (
            <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">You</span>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        {isMe ? (
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleColors[member.role]}`}>
            {roleLabels[member.role]}
          </span>
        ) : (
          <select
            value={member.role}
            onChange={(e) => handleRoleChange(e.target.value as OrgRole)}
            disabled={updateRole.isPending}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer disabled:opacity-50"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>{roleLabels[r]}</option>
            ))}
          </select>
        )}
      </td>
      <td className="py-3 px-4 text-right">
        {!isMe && (
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
        )}
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

export default function OrganizationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orgKey = params.key as string;

  const { data: org, isLoading } = useOrganization(orgKey);
  const { user } = useUser();
  const inviteMember = useInviteMember(orgKey);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<OrgRole>('editor');
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviteError('');
    setInviteSuccess('');
    try {
      await inviteMember.mutateAsync({ email: inviteEmail.trim(), role: inviteRole });
      setInviteSuccess(`Invite sent to ${inviteEmail.trim()}`);
      setInviteEmail('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to invite member.';
      setInviteError(message);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !org ? (
          <div className="text-center py-20 text-gray-500">Organization not found.</div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#1a1a1a]">{org.name}</h1>
              <p className="text-gray-500 text-sm mt-1">{org.members.length} member{org.members.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Members Table */}
            <section className="mb-10">
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Members</h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Member</th>
                      <th className="py-2.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                      <th className="py-2.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {org.members.map((member) => (
                      <MemberRow
                        key={member.userId}
                        member={member}
                        isMe={member.userId === user?.id}
                        orgKey={orgKey}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Invite Form */}
            <section>
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Invite Member</h2>
              <form
                onSubmit={handleInvite}
                className="p-5 border border-gray-200 rounded-xl bg-gray-50 space-y-4"
              >
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Email address"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white"
                    required
                  />
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as OrgRole)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA] bg-white cursor-pointer"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{roleLabels[r]}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={inviteMember.isPending || !inviteEmail.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                  >
                    {inviteMember.isPending ? 'Sending...' : 'Send Invite'}
                  </button>
                </div>
                {inviteError && <p className="text-red-500 text-xs">{inviteError}</p>}
                {inviteSuccess && <p className="text-green-600 text-xs">{inviteSuccess}</p>}
              </form>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
