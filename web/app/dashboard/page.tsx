'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCourses } from '../../lib/hooks/use-course';
import StarLoader from '../components/loaders/StarLoader';

export default function Dashboard() {
  const router = useRouter();
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

  return (
    <div className="flex-1 p-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">My Courses</h1>
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
        </div>

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
              <p className="text-gray-500">No courses found matching &quot;{searchQuery}&quot;</p>
            ) : (
              <div>
                <p className="text-gray-500 mb-4">You don&apos;t have any courses yet.</p>
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
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      course.status === 'completed' ? 'bg-green-100 text-green-700' :
                      course.status === 'generating' ? 'bg-yellow-100 text-yellow-700' :
                      course.status === 'failed' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(course.createdAt).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
