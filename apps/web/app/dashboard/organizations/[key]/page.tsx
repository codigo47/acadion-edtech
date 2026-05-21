'use client';

import { useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CustomDropdown from '@/app/components/CustomDropdown';
import IconButton from '@/app/components/IconButton';
import { Trash2 } from 'lucide-react';
import {
  useOrganization,
  useInviteMember,
  useBulkInviteMembers,
  useUpdateMemberRole,
  useRemoveMember,
  type OrgRole,
  type OrgMember,
  type BulkMemberResult,
} from '../../../../lib/hooks/use-organizations';
import { useUser } from '../../../../lib/hooks/use-auth';
import { useToast } from '../../../components/ToastProvider';

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
          <CustomDropdown
            value={member.role}
            onChange={(val) => handleRoleChange(val as OrgRole)}
            options={ROLES.map((r) => ({ value: r, label: roleLabels[r] }))}
            placeholder="Select role..."
          />
        )}
      </td>
      <td className="py-3 px-4 text-right">
        {!isMe && (
          <div className="flex items-center justify-end gap-1">
            {confirmRemove ? (
              <>
                <button
                  onClick={() => removeMember.mutateAsync(member.userId)}
                  disabled={removeMember.isPending}
                  className="text-xs px-2.5 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-all disabled:opacity-50"
                >
                  Confirm
                </button>
                <button onClick={() => setConfirmRemove(false)} className="text-xs text-gray-400 hover:text-gray-600">
                  Cancel
                </button>
              </>
            ) : (
              <IconButton icon={<Trash2 size={16} />} tooltip="Remove" variant="danger" onClick={(e) => setConfirmRemove(true)} />
            )}
          </div>
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
  const bulkInvite = useBulkInviteMembers(orgKey);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<OrgRole>('editor');
  const { showToast } = useToast();

  // Bulk upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    try {
      await inviteMember.mutateAsync({ email: inviteEmail.trim(), role: inviteRole });
      showToast(`Invite sent to ${inviteEmail.trim()}`, 'success');
      setInviteEmail('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to invite member.';
      showToast(message, 'error');
    }
  };

  const handleBulkUpload = async () => {
    if (!csvFile) return;
    const text = await csvFile.text();
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const members: { email: string; name?: string; role: string }[] = [];
    for (const line of lines) {
      const [email, name, role] = line.split(',').map((s) => s.trim());
      if (!email || email.toLowerCase() === 'email') continue;
      members.push({
        email,
        name: name || undefined,
        role: role || 'student',
      });
    }
    if (members.length === 0) {
      showToast('No valid rows found in CSV', 'error');
      return;
    }
    try {
      const results = await bulkInvite.mutateAsync({ members });
      const created = results.filter((r) => r.status === 'created').length;
      const updated = results.filter((r) => r.status === 'updated').length;
      const failed = results.filter((r) => r.status === 'failed').length;
      showToast(`${created} created, ${updated} updated, ${failed} failed`, 'success');

      // Generate and download result CSV
      const csvLines = ['email,name,role,status,message'];
      results.forEach((r, i) => {
        const orig = members[i];
        csvLines.push(`${orig?.email || r.email},${orig?.name || ''},${orig?.role || ''},${r.status},${r.message || ''}`);
      });
      const blob = new Blob([csvLines.join('\n')], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bulk-invite-results-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      setCsvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Bulk upload failed', 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Back link */}
        <button
          onClick={() => router.push('/dashboard/organizations')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#9F80DA] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Organizations
        </button>

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
            <section className="mb-10">
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
                  <CustomDropdown
                    value={inviteRole}
                    onChange={(val) => setInviteRole(val as OrgRole)}
                    options={ROLES.map((r) => ({ value: r, label: roleLabels[r] }))}
                    placeholder="Select role..."
                  />
                  <button
                    type="submit"
                    disabled={inviteMember.isPending || !inviteEmail.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                  >
                    {inviteMember.isPending ? 'Sending...' : 'Send Invite'}
                  </button>
                </div>
              </form>
            </section>

            {/* Bulk Upload */}
            <section>
              <h2 className="text-base font-semibold text-[#1a1a1a] mb-4">Bulk Upload</h2>
              <div className="p-5 border border-gray-200 rounded-xl bg-gray-50 space-y-4">
                <p className="text-xs text-gray-500">
                  CSV format: email, name, role (valid roles: org_admin, editor, commenter, viewer, student)
                </p>
                <div className="flex gap-3 items-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                    className="text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#9F80DA]/10 file:text-[#9F80DA] hover:file:bg-[#9F80DA]/20 file:cursor-pointer"
                  />
                  <button
                    onClick={handleBulkUpload}
                    disabled={!csvFile || bulkInvite.isPending}
                    className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
                  >
                    {bulkInvite.isPending ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
