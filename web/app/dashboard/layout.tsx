'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCourses } from '../../lib/hooks/use-course';
import { useUser, useLogout } from '../../lib/hooks/use-auth';
import { useOrganizations } from '../../lib/hooks/use-organizations';
import NotificationBell from '../components/NotificationBell';
import ChatLoadingIndicator from '../components/loaders/ChatLoadingIndicator';

const sidebarLinks = [
  {
    label: 'Organizations',
    href: '/dashboard/organizations',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    label: 'Learning Plans',
    href: '/dashboard/learning-plans',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    label: 'Badges',
    href: '/dashboard/badges',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    label: 'Portfolio',
    href: '/dashboard/portfolio',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    label: 'Account',
    href: '/dashboard/account',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTimeout(() => router.replace('/login'), 1500);
    } else {
      setAuthReady(true);
    }
  }, [router]);

  if (!authReady) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <ChatLoadingIndicator loadingText="Authenticating..." />
      </div>
    );
  }

  return <OnboardingGate>{children}</OnboardingGate>;
}

function OnboardingGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: orgs, isLoading } = useOrganizations();

  useEffect(() => {
    if (!isLoading && orgs && orgs.length === 0) {
      router.replace('/onboarding');
    }
  }, [isLoading, orgs, router]);

  if (isLoading || (orgs && orgs.length === 0)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <ChatLoadingIndicator loadingText="Loading..." />
      </div>
    );
  }

  return <DashboardContent>{children}</DashboardContent>;
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: courses } = useCourses();
  const { user } = useUser();
  const logout = useLogout();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-[var(--font-onest)]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          <img
            src="/landing/acadion2.png"
            alt="Acadion Logo"
            className="h-8 object-contain"
            style={{ width: 'auto' }}
          />
        </div>

        <div className="flex items-center gap-4">
          <NotificationBell />

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'Avatar'}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9F80DA] to-[#8A6BC5] flex items-center justify-center text-white text-sm font-bold">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-[#1a1a1a] truncate">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => { setShowUserMenu(false); router.push('/dashboard/account'); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account
                </button>
                <button
                  onClick={() => { setShowUserMenu(false); logout.mutate(); }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0">
          <div className="p-4">
            <nav className="space-y-1 mb-6">
              <button
                onClick={() => router.push('/project')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] hover:from-[#8A6BC5] hover:to-[#7B5BB5] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Project
              </button>
            </nav>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="text-xs font-semibold text-gray-500 mb-3 px-3 uppercase tracking-wide">Projects</h3>
              <div className="space-y-1">
                {courses?.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => router.push(`/project/${course.key}`)}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-200 rounded transition-colors truncate"
                  >
                    {course.title || 'Untitled Course'}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-xs font-semibold text-gray-500 mb-3 px-3 uppercase tracking-wide">Settings</h3>
              <div className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <button
                      key={link.href}
                      onClick={() => router.push(link.href)}
                      className={`w-full px-3 py-2 text-left text-sm rounded transition-colors flex items-center gap-2 ${
                        isActive
                          ? 'bg-[#9F80DA]/10 text-[#9F80DA] font-medium'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <svg className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#9F80DA]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                      </svg>
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
