'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MockDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Plan');
  const [selectedProject, setSelectedProject] = useState(0);

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
              src="/landing/acadion.png"
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
                <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-200 rounded text-left font-medium">
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
                      onClick={() => setSelectedProject(idx)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-200 rounded transition-colors ${
                        idx === selectedProject ? 'bg-[#9F80DA] text-white hover:bg-[#8A6BC5]' : ''
                      }`}
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
            {/* Center Content */}
            <div className="flex-1 p-6 bg-white">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-[#1a1a1a]">{projects[selectedProject].name}</h1>

                {/* Render Course Content for Scrum 101 */}
                {selectedProject === 0 ? (
                  <div className="space-y-8">
                    {/* Course Header */}
                    <div className="bg-gradient-to-r from-[#9F80DA] to-[#B8A0E8] rounded-lg p-8 text-white shadow-lg">
                      <h2 className="text-3xl font-bold mb-3">Scrum 101: Agile Framework Fundamentals</h2>
                      <p className="text-lg opacity-90 mb-4">
                        Master the essential principles and practices of Scrum to lead high-performing agile teams
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                          </svg>
                          <span>12,450 enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>6 weeks • 3-5 hours/week</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>4.8 (2,341 reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Module 1: Introduction to Scrum */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#9F80DA] rounded-lg p-4 flex-shrink-0">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-[#1a1a1a]">Module 1: Introduction to Scrum</h3>
                          <p className="text-gray-600 mb-4">
                            Discover the foundational concepts of Scrum, understanding its origins in agile methodology
                            and how it revolutionized software development and project management across industries.
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <div className="w-6 h-6 rounded-full bg-[#9F80DA] flex items-center justify-center text-white text-xs">
                                ✓
                              </div>
                              <span>What is Scrum? Origins and Philosophy</span>
                              <span className="ml-auto text-gray-400">8 min</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
                                2
                              </div>
                              <span>The Agile Manifesto and Scrum Values</span>
                              <span className="ml-auto text-gray-400">12 min</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
                                3
                              </div>
                              <span>Scrum vs Traditional Project Management</span>
                              <span className="ml-auto text-gray-400">10 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Module 2: Scrum Roles */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#8A6BC5] rounded-lg p-4 flex-shrink-0">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-[#1a1a1a]">Module 2: Scrum Roles and Responsibilities</h3>
                          <p className="text-gray-600 mb-4">
                            Learn about the three core roles in Scrum: Product Owner, Scrum Master, and Development Team.
                            Understand each role's responsibilities and how they collaborate to deliver value.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 rounded p-4 border border-gray-200">
                              <div className="text-[#9F80DA] font-bold mb-2">Product Owner</div>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Defines product vision</li>
                                <li>• Manages backlog</li>
                                <li>• Prioritizes features</li>
                              </ul>
                            </div>
                            <div className="bg-gray-50 rounded p-4 border border-gray-200">
                              <div className="text-[#9F80DA] font-bold mb-2">Scrum Master</div>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Facilitates ceremonies</li>
                                <li>• Removes impediments</li>
                                <li>• Coaches the team</li>
                              </ul>
                            </div>
                            <div className="bg-gray-50 rounded p-4 border border-gray-200">
                              <div className="text-[#9F80DA] font-bold mb-2">Development Team</div>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Self-organizing</li>
                                <li>• Cross-functional</li>
                                <li>• Delivers increments</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Module 3: Scrum Events */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#7A5BB5] rounded-lg p-4 flex-shrink-0">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-[#1a1a1a]">Module 3: Scrum Events (Ceremonies)</h3>
                          <p className="text-gray-600 mb-4">
                            Master the five key Scrum events that create regularity and minimize the need for meetings
                            not defined in Scrum. Each event is time-boxed and serves a specific purpose.
                          </p>
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-semibold text-[#9F80DA]">The Sprint Cycle</span>
                              <span className="text-xs text-gray-500">2-4 weeks</span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-[#9F80DA]"></div>
                                <span><strong>Sprint Planning:</strong> Define sprint goal and select backlog items</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-[#9F80DA]"></div>
                                <span><strong>Daily Scrum:</strong> 15-minute sync to inspect progress</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-[#9F80DA]"></div>
                                <span><strong>Sprint Review:</strong> Demonstrate completed work to stakeholders</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <div className="w-2 h-2 rounded-full bg-[#9F80DA]"></div>
                                <span><strong>Sprint Retrospective:</strong> Reflect and plan improvements</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Module 4: Scrum Artifacts */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="bg-[#6A4BA5] rounded-lg p-4 flex-shrink-0">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-[#1a1a1a]">Module 4: Scrum Artifacts</h3>
                          <p className="text-gray-600 mb-4">
                            Explore the three artifacts that provide transparency and opportunities for inspection
                            and adaptation: Product Backlog, Sprint Backlog, and Increment.
                          </p>
                          <div className="space-y-3">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h4 className="font-semibold text-[#9F80DA] mb-2">Product Backlog</h4>
                              <p className="text-sm text-gray-600">
                                An ordered list of everything needed in the product. The single source of requirements
                                for any changes to be made to the product.
                              </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h4 className="font-semibold text-[#9F80DA] mb-2">Sprint Backlog</h4>
                              <p className="text-sm text-gray-600">
                                The set of Product Backlog items selected for the Sprint, plus a plan for delivering
                                the product Increment and realizing the Sprint Goal.
                              </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <h4 className="font-semibold text-[#9F80DA] mb-2">Increment</h4>
                              <p className="text-sm text-gray-600">
                                The sum of all Product Backlog items completed during a Sprint combined with all
                                previous Sprints. Must be in usable condition regardless of whether the Product Owner decides to release it.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Takeaways */}
                    <div className="bg-gradient-to-br from-[#9F80DA]/10 to-[#B8A0E8]/10 rounded-lg p-6 border border-[#9F80DA]/30">
                      <h3 className="text-xl font-bold mb-4 text-[#1a1a1a] flex items-center gap-2">
                        <svg className="w-6 h-6 text-[#9F80DA]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Key Takeaways
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-[#9F80DA] mt-1">✓</span>
                          <span>Scrum is an iterative, incremental framework for managing complex work</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#9F80DA] mt-1">✓</span>
                          <span>Three roles, five events, and three artifacts form the foundation of Scrum</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#9F80DA] mt-1">✓</span>
                          <span>Transparency, inspection, and adaptation are the three pillars of Scrum</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#9F80DA] mt-1">✓</span>
                          <span>Scrum promotes self-organizing, cross-functional teams that deliver value iteratively</span>
                        </li>
                      </ul>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-[#9F80DA] to-[#B8A0E8] rounded-lg p-6 text-center text-white shadow-lg">
                      <h3 className="text-2xl font-bold mb-2">Ready to Master Scrum?</h3>
                      <p className="mb-4 opacity-90">Join thousands of professionals who have transformed their teams with Scrum</p>
                      <button className="bg-white text-[#9F80DA] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
                        Start Learning Now
                      </button>
                    </div>
                  </div>
                ) : (
                  // Other courses placeholder
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-bold mb-2">{projects[selectedProject].name}</h3>
                      <p className="text-gray-600">Course content coming soon...</p>
                    </div>
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
