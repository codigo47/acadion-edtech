'use client';

import { useState } from 'react';

export default function MultiLanguageFeature() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full h-full bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-3 md:p-6 flex justify-center">
      <div className="mt-[10%]">
        <div className="relative inline-block">
          {/* Language Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-2 py-1 md:px-3 md:py-1.5 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-lg text-xs md:text-sm font-medium transition-colors flex items-center gap-1 md:gap-1.5"
          >
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Language
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full mt-2 left-0 w-32 md:w-40 bg-white rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden z-10">
            <button className="w-full px-2 py-1.5 md:px-3 md:py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="text-xs md:text-sm font-medium text-gray-800">Spanish</div>
            </button>
            <button className="w-full px-2 py-1.5 md:px-3 md:py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="text-xs md:text-sm font-medium text-gray-800">English</div>
            </button>
            <button className="w-full px-2 py-1.5 md:px-3 md:py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="text-xs md:text-sm font-medium text-gray-800">French</div>
            </button>
            <button className="w-full px-2 py-1.5 md:px-3 md:py-2 text-left hover:bg-gray-50 transition-colors">
              <div className="text-xs md:text-sm font-medium text-gray-800">German</div>
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
