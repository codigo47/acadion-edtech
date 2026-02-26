'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganizations, useCreateOrganization, type OrgRole } from '../../../lib/hooks/use-organizations';

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

export default function OrganizationsPage() {
  const router = useRouter();
  const { data: orgs, isLoading } = useOrganizations();
  const createOrg = useCreateOrganization();

  const [showForm, setShowForm] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;
    setError('');
    try {
      await createOrg.mutateAsync({ name: orgName.trim() });
      setOrgName('');
      setShowForm(false);
    } catch {
      setError('Failed to create organization. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Organizations</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your organizations and team members.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-semibold rounded-lg shadow hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Organization
          </button>
        </div>

        {/* Create Form */}
        {showForm && (
          <form
            onSubmit={handleCreate}
            className="mb-8 p-5 border border-[#9F80DA]/30 rounded-xl bg-purple-50"
          >
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Create New Organization</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="Organization name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#9F80DA]/40 focus:border-[#9F80DA]"
                autoFocus
              />
              <button
                type="submit"
                disabled={createOrg.isPending || !orgName.trim()}
                className="px-4 py-2 bg-[#9F80DA] text-white text-sm font-medium rounded-lg hover:bg-[#8A6BC5] disabled:opacity-50 transition-colors"
              >
                {createOrg.isPending ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setOrgName(''); setError(''); }}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
        )}

        {/* List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !orgs || orgs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-2">You&apos;re not part of any organization yet.</p>
            <p className="text-gray-400 text-sm">Create one to start collaborating.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orgs.map((org) => (
              <div
                key={org.key}
                className="flex items-center justify-between p-5 border border-gray-200 rounded-xl hover:border-[#9F80DA]/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white font-bold text-sm">
                    {(org.name || 'O').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1a1a1a]">{org.name}</p>
                    <p className="text-xs text-gray-500">{org.memberCount} member{org.memberCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleColors[org.myRole]}`}>
                    {roleLabels[org.myRole]}
                  </span>
                  <button
                    onClick={() => router.push(`/dashboard/organizations/${org.key}`)}
                    className="flex items-center gap-1 text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium transition-colors"
                  >
                    Manage
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
