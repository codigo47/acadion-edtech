'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Loader2, ArrowRight } from 'lucide-react';
import { useCreateOrganization } from '../../lib/hooks/use-organizations';
import { getUser } from '../../lib/auth';

export default function OnboardingPage() {
  const router = useRouter();
  const user = getUser();
  const defaultName = user?.name ? `${user.name}'s Organization` : '';

  const [orgName, setOrgName] = useState(defaultName);
  const createOrg = useCreateOrganization();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;

    createOrg.mutate(
      { name: orgName.trim() },
      { onSuccess: () => router.push('/dashboard') },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome to Acadion!</h1>
          <p className="text-gray-400 mt-2">Let's set up your workspace</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="orgName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Organization name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="orgName"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="My Organization"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {createOrg.error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                {createOrg.error.message}
              </div>
            )}

            <button
              type="submit"
              disabled={createOrg.isPending || !orgName.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {createOrg.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full mt-4 text-gray-400 hover:text-gray-300 text-sm font-medium transition-colors py-2"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
