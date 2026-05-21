'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useUpdateProfile } from '../../../lib/hooks/use-auth';
import StickyFooter from '../../components/StickyFooter';
import { useToast } from '../../components/ToastProvider';

export default function AccountPage() {
  const router = useRouter();
  const { user } = useUser();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        name: name || undefined,
      });
      showToast('Account updated successfully', 'success');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to update account', 'error');
    }
  };

  const isSaving = updateProfile.isPending;

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Account Settings</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your profile and preferences.</p>
          </div>
          <StickyFooter>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white rounded-lg text-sm font-medium hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          </StickyFooter>
        </div>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'Avatar'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-2xl font-bold">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]">{user?.name || 'No name set'}</p>
              <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#9F80DA] transition-colors"
            />
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
            <p className="mt-1.5 text-xs text-gray-400">Email cannot be changed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
