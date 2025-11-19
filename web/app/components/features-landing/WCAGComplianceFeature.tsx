'use client';

import { useState } from 'react';

export default function WCAGComplianceFeature() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="w-full h-full flex flex-col rounded-3xl overflow-hidden border-2 border-gray-200 relative">
      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-2 right-2 md:top-3 md:right-3 z-10 px-2 py-1 md:px-3 md:py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center gap-1 md:gap-1.5"
      >
        {isDarkMode ? (
          <>
            <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
            <span className="text-[10px] md:text-xs font-medium text-gray-700">Light mode</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span className="text-[10px] md:text-xs font-medium text-gray-700">Dark mode</span>
          </>
        )}
      </button>

      {/* Document Container */}
      <div className={`flex-1 overflow-y-auto p-3 md:p-6 transition-colors ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Document Title */}
        <h1 className={`text-lg md:text-2xl font-bold mb-2 md:mb-4 text-center transition-colors ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Scrum course
        </h1>

        {/* Placeholder Content */}
        <div className="space-y-2 md:space-y-3">
          <div className={`h-3 md:h-4 rounded w-full transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
          <div className={`h-3 md:h-4 rounded w-5/6 transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>

          {/* Image with Alt Text Indicator */}
          <div className="relative my-2 md:my-3">
            <div className={`h-20 md:h-28 rounded-lg flex items-center justify-center border-2 transition-colors ${
              isDarkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600'
                : 'bg-gradient-to-br from-purple-100 to-blue-100 border-gray-200'
            }`}>
              <svg className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Alt Text Badge */}
            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 px-1.5 py-0.5 md:px-2 md:py-1 bg-green-500 text-white text-[8px] md:text-[10px] rounded font-medium shadow-lg flex items-center gap-0.5 md:gap-1">
              <svg className="w-2 h-2 md:w-2.5 md:h-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Alt text
            </div>
          </div>

          <div className={`h-3 md:h-4 rounded w-full transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>

          {/* Text with Magnifying Glass - Centered */}
          <div className="flex justify-center">
            <div className={`relative p-2 md:p-4 border-2 rounded-lg w-3/4 transition-colors ${
              isDarkMode
                ? 'bg-blue-900 border-blue-700'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-2 md:gap-3">
                <svg className={`w-6 h-6 md:w-8 md:h-8 flex-shrink-0 transition-colors ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-500'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="flex-1 space-y-1 md:space-y-2">
                  <div className={`h-2 md:h-3 rounded w-full transition-colors ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}></div>
                  <div className={`h-2 md:h-3 rounded w-4/5 transition-colors ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}></div>
                  <div className={`h-2 md:h-3 rounded w-3/5 transition-colors ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`h-3 md:h-4 rounded w-3/4 transition-colors ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}></div>
        </div>
      </div>
    </div>
  );
}
