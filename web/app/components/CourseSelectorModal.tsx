'use client';

import { useState, useEffect } from 'react';

interface Course {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface CourseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (courseIds: string[]) => void;
  courses: Course[];
}

export default function CourseSelectorModal({ isOpen, onClose, onSelect, courses }: CourseSelectorModalProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = courses.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelect = () => {
    if (selected.size === 0) return;
    onSelect(Array.from(selected));
    setSelected(new Set());
    setSearch('');
  };

  const handleClose = () => {
    setSelected(new Set());
    setSearch('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Select Courses</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-100">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#9F80DA] transition-colors"
          />
        </div>

        {/* Course grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">No courses found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filtered.map((course) => {
                const isChecked = selected.has(course.id);
                return (
                  <label
                    key={course.id}
                    className={`border rounded-xl overflow-hidden cursor-pointer transition-colors ${
                      isChecked ? 'border-[#9F80DA] bg-[#9F80DA]/5' : 'border-gray-100 hover:border-[#9F80DA]/30'
                    }`}
                  >
                    <div className="h-28 bg-gradient-to-br from-[#9F80DA]/10 to-[#9F80DA]/5 flex items-center justify-center relative">
                      {course.image ? (
                        <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-8 h-8 text-[#9F80DA]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      )}
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(course.id)}
                        className="absolute top-2 right-2 w-4 h-4 accent-[#9F80DA] cursor-pointer"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-[#1a1a1a] truncate">{course.name}</h3>
                      {course.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {selected.size > 0 ? `${selected.size} selected` : 'No courses selected'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSelect}
              disabled={selected.size === 0}
              className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
            >
              {selected.size > 1 ? 'Select All' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
