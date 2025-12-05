'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Plan');

  const addiePhases = [
    { name: 'Analysis', icon: '🔍' },
    { name: 'Design', icon: '✏️' },
    { name: 'Development', icon: '⚙️' },
    { name: 'Implementation', icon: '🚀' },
    { name: 'Evaluation', icon: '📊' }
  ];

  const projects = [
    { name: 'Scrum 101', type: 'course' },
    { name: 'Project Management Fundamentals', type: 'course' },
    { name: 'Leadership Development Program', type: 'course' },
    { name: 'Data Analytics Bootcamp', type: 'course' },
    { name: 'Digital Marketing Strategy', type: 'course' },
    { name: 'Python for Beginners', type: 'course' },
    { name: 'Customer Service Excellence', type: 'course' }
  ];

  const courses = [
    { id: 1, title: 'Scrum 101', image: '/sample.jpeg' },
    { id: 2, title: 'Project Management Fundamentals', image: '/sample.jpeg' },
    { id: 3, title: 'Leadership Development Program', image: '/sample.jpeg' }
  ];

  const milestones = [
    {
      title: 'Create Scrum 101 Course',
      checked: false,
      tasks: [
        { title: 'Analysis - Define learning objectives', assigned: 'Acadion.ai Agent', checked: true },
        { title: 'Design - Create course structure', assigned: 'Acadion.ai Agent', checked: true },
        { title: 'Development - Generate content', assigned: 'Acadion.ai Agent', checked: true },
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

          <div className="flex items-center gap-2">
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
              placeholder="Search..."
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
                  onClick={() => router.push('/new-project')}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded text-left font-medium"
                >
                  <span className="text-sm">+</span>
                  <span className="text-sm">New Project</span>
                </button>
              </nav>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="text-xs font-semibold text-gray-500 mb-3 px-3 uppercase tracking-wide">ADDIE Model</h3>
                <div className="space-y-1">
                  {addiePhases.map((phase, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-200 rounded transition-colors"
                    >
                      <span>{phase.icon}</span>
                      <span>{phase.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 mb-3 px-3 uppercase tracking-wide">Projects</h3>
                <div className="space-y-1">
                  {projects.map((project, idx) => (
                    <button
                      key={idx}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-200 rounded transition-colors"
                    >
                      {project.name}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-[#1a1a1a]">{course.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
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
