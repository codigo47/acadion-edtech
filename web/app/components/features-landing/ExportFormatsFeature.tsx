'use client';

import { useState } from 'react';

export default function ExportFormatsFeature() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-3 md:p-6 relative">
      <div className="absolute top-3 md:top-6 left-3 md:left-6">
        {/* Export Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-1 md:px-3 md:py-1.5 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center gap-1 md:gap-1.5"
        >
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full mt-1 left-0 w-32 md:w-40 bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden z-10">
            <button className="w-full px-2 py-1.5 md:px-3 md:py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="text-xs md:text-sm font-medium text-gray-800">SCORM 1.2</div>
            </button>
            <button className="w-full px-2 py-1.5 md:px-3 md:py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="text-xs md:text-sm font-medium text-gray-800">xAPI</div>
            </button>
            <button className="w-full px-2 py-1.5 md:px-3 md:py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="text-xs md:text-sm font-medium text-gray-800">PDF</div>
            </button>
            <button className="w-full px-2 py-1.5 md:px-3 md:py-2 text-left hover:bg-gray-50 transition-colors">
              <div className="text-xs md:text-sm font-medium text-gray-800">HTML</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
