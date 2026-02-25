'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, useLogout } from '../../lib/hooks/use-auth';
import NotificationBell from '../components/NotificationBell';

const sidebarPages = ['/lms', '/lms/achievements', '/lms/analytics'];

const sidebarLinks = [
  {
    label: 'My Courses',
    href: '/lms',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    label: 'Achievements',
    href: '/lms/achievements',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    label: 'Analytics',
    href: '/lms/analytics',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
];

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authReady, setAuthReady] = useState(false);
  const { user } = useUser();
  const logout = useLogout();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const showSidebar = sidebarPages.includes(pathname);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setAuthReady(true);
    }
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!authReady) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#9F80DA] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] font-[var(--font-onest)]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-3 md:px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          {/* Hamburger - mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded transition-colors text-gray-600"
            aria-label="Open navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/lms')}>
            <img
              src="/landing/acadion2.png"
              alt="Acadion Logo"
              className="h-8 object-contain"
              style={{ width: 'auto' }}
            />
            <span className="hidden sm:inline text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Student</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="hidden sm:inline text-xs text-gray-500 hover:text-[#9F80DA] transition-colors"
          >
            Creator Dashboard →
          </button>
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
        {/* Left Sidebar - desktop */}
        <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
          <div className="p-4">
            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => router.push(link.href)}
                    className={`w-full px-3 py-2.5 text-left text-sm rounded-lg transition-colors flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-[#9F80DA]/10 text-[#9F80DA] font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <svg className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#9F80DA]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                    </svg>
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Left Sidebar - mobile slide-over */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-56 max-w-[80vw] bg-white shadow-xl overflow-y-auto animate-slide-in-left">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="text-sm font-semibold text-[#1a1a1a]">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <nav className="space-y-1">
                  {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <button
                        key={link.href}
                        onClick={() => {
                          router.push(link.href);
                          setSidebarOpen(false);
                        }}
                        className={`w-full px-3 py-2.5 text-left text-sm rounded-lg transition-colors flex items-center gap-2.5 ${
                          isActive
                            ? 'bg-[#9F80DA]/10 text-[#9F80DA] font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <svg className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#9F80DA]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                        </svg>
                        {link.label}
                      </button>
                    );
                  })}
                </nav>
                <div className="mt-4 pt-4 border-t border-gray-200 sm:hidden">
                  <button
                    onClick={() => { setSidebarOpen(false); router.push('/dashboard'); }}
                    className="w-full px-3 py-2.5 text-left text-sm text-gray-500 hover:text-[#9F80DA] transition-colors"
                  >
                    Creator Dashboard →
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
