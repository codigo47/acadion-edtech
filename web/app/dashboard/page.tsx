'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCourses } from '../../lib/hooks/use-course';
import StarLoader from '../components/loaders/StarLoader';

export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Plan');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: courses, isLoading, error } = useCourses();

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    if (!searchQuery.trim()) return courses;

    const query = searchQuery.toLowerCase();
    return courses.filter(course =>
      course.title?.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const milestones = [
    {
      title: 'Create Scrum 101 Course',
      checked: false,
      tasks: [
        { title: 'Analysis - Define learning objectives', assigned: 'acadion.ai Agent', checked: true },
        { title: 'Design - Create course structure', assigned: 'acadion.ai Agent', checked: true },
        { title: 'Development - Generate content', assigned: 'acadion.ai Agent', checked: true },
        { title: 'Content QA', assigned: 'John Doe', checked: false },
        { title: 'Branding QA', assigned: 'John Doe', checked: false },
        { title: 'SME', assigned: 'writer', checked: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-[var(--font-onest)]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

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
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 gap-2 border border-gray-200">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-64 text-gray-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <img
              src="/landing/avatars/1.jpg"
              alt="User Avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Left Sidebar */}
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto"
          >
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

              <div className="border-t border-gray-200 pt-4">
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
            </div>
          </motion.aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex h-full">
            {/* Center Content - Course Cards Grid */}
            <div className="flex-1 p-6 bg-white">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-[#1a1a1a]">My Courses</h1>

                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <StarLoader
                      texts={['Loading your courses...']}
                      textPosition="bottom"
                      size={1.5}
                    />
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <p className="text-red-500">Failed to load courses. Please try again.</p>
                  </div>
                ) : filteredCourses.length === 0 ? (
                  <div className="text-center py-20">
                    {searchQuery ? (
                      <p className="text-gray-500">No courses found matching "{searchQuery}"</p>
                    ) : (
                      <div>
                        <p className="text-gray-500 mb-4">You don't have any courses yet.</p>
                        <button
                          onClick={() => router.push('/project')}
                          className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] transition-all"
                        >
                          Create your first course
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => router.push(`/project/${course.key}`)}
                        className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                      >
                        <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-[#9F80DA]/20 to-[#8A6BC5]/20 flex items-center justify-center">
                          <svg className="w-16 h-16 text-[#9F80DA]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-[#1a1a1a] truncate">
                            {course.title || 'Untitled Course'}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              course.status === 'completed' ? 'bg-green-100 text-green-700' :
                              course.status === 'generating' ? 'bg-yellow-100 text-yellow-700' :
                              course.status === 'failed' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Plan Panel */}
            <aside className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('Plan')}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      activeTab === 'Plan'
                        ? 'bg-white text-[#1a1a1a] border-b-2 border-[#9F80DA]'
                        : 'text-gray-500 hover:text-[#1a1a1a]'
                    }`}
                  >
                    Plan
                  </button>
                  <button
                    onClick={() => setActiveTab('Users')}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      activeTab === 'Users'
                        ? 'bg-white text-[#1a1a1a] border-b-2 border-[#9F80DA]'
                        : 'text-gray-500 hover:text-[#1a1a1a]'
                    }`}
                  >
                    Users
                  </button>
                  <button
                    onClick={() => setActiveTab('Files')}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      activeTab === 'Files'
                        ? 'bg-white text-[#1a1a1a] border-b-2 border-[#9F80DA]'
                        : 'text-gray-500 hover:text-[#1a1a1a]'
                    }`}
                  >
                    Files
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-3 text-gray-700">Milestones</h3>

                  {milestones.map((milestone, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="flex items-start gap-2 mb-3">
                        <input
                          type="checkbox"
                          checked={milestone.checked}
                          className="mt-1 accent-[#9F80DA]"
                          readOnly
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-[#1a1a1a]">{milestone.title}</span>
                          {milestone.tasks.map((task, taskIdx) => (
                            <div key={taskIdx} className="ml-4 mt-3 flex items-start gap-2">
                              <input
                                type="checkbox"
                                checked={task.checked}
                                className="mt-1 accent-[#9F80DA]"
                                readOnly
                              />
                              <div>
                                <p className={`text-sm ${task.checked ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                                  {task.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">Assigned to {task.assigned}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="text-sm text-[#9F80DA] hover:text-[#8A6BC5] flex items-center gap-1 font-medium">
                    <span>+</span>
                    <span>Add task</span>
                  </button>
                </div>

                <button className="text-sm text-[#9F80DA] hover:text-[#8A6BC5] flex items-center gap-1 font-medium">
                  <span>+</span>
                  <span>Add milestone</span>
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
