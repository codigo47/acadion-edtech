'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Loader2, ArrowRight, FileText } from 'lucide-react';
import { useCreateOrganization, useOrganizations } from '../../lib/hooks/use-organizations';
import { getUser, getToken } from '../../lib/auth';
import ChatLoadingIndicator from '../components/loaders/ChatLoadingIndicator';

export default function OnboardingPage() {
  const router = useRouter();
  const user = getUser();
  const token = getToken();
  const defaultName = user?.name ? `${user.name}'s Organization` : '';

  const [orgName, setOrgName] = useState(defaultName);
  const [description, setDescription] = useState('');
  const createOrg = useCreateOrganization();
  const { data: orgs, isLoading: orgsLoading } = useOrganizations();

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }
    if (!orgsLoading && orgs && orgs.length > 0) {
      router.replace('/dashboard');
    }
  }, [token, orgsLoading, orgs, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;

    createOrg.mutate(
      { name: orgName.trim() },
      { onSuccess: () => router.push('/dashboard') },
    );
  };

  if (!token || orgsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <ChatLoadingIndicator loadingText="Loading..." />
      </div>
    );
  }

  if (orgs && orgs.length > 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/landing/acadion2.png"
            alt="acadion.ai"
            className="h-10 object-contain mx-auto mb-4"
            style={{ width: 'auto' }}
          />
          <h1 className="text-3xl font-bold text-white">Welcome to Acadion!</h1>
          <p className="text-gray-400 mt-2">
            Create your organization to start building courses
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#9F80DA] flex items-center justify-center text-white text-sm font-bold">
            1
          </div>
          <div className="w-12 h-0.5 bg-white/20" />
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-gray-400 text-sm font-bold">
            2
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  autoFocus
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#9F80DA] transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does your organization do?"
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#9F80DA] transition-colors resize-none"
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
              className="w-full bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {createOrg.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create & Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
