'use client';

import { motion } from 'framer-motion';

export default function AIGeneratedCourseFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-2 md:space-y-4 bg-white">
        {/* User Message - Aligned Right */}
        <div className="flex justify-end items-start gap-2 md:gap-3">
          <div className="bg-[#9F80DA] text-white rounded-2xl rounded-tr-sm px-3 py-2 md:px-4 md:py-3 max-w-[70%]">
            <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-xs md:text-sm">Scrum Docs.pdf</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs md:text-sm">
              You
            </div>
          </div>
        </div>

        {/* AI Message - Aligned Left */}
        <div className="flex justify-start items-start gap-2 md:gap-3">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs md:text-sm">
              AI
            </div>
          </div>
          <div className="flex flex-col max-w-[70%]">
            <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 md:px-4 md:py-3">
              <p className="text-xs md:text-sm">Sure, let me generate the elearning for you</p>
            </div>
            {/* Status Indicators */}
            <div className="flex flex-col gap-0.5 md:gap-1 mt-1.5 md:mt-2 ml-3 md:ml-4">
              {/* Processing Files - Completed */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-[#A8D5A3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] md:text-xs text-gray-500 italic">Processing files...</span>
              </div>
              {/* Generating Elearning - In Progress */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 md:w-4 md:h-4"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </motion.div>
                <span className="text-[10px] md:text-xs text-gray-500 italic">Generating elearning...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input Container */}
      <div className="border-t border-gray-200 bg-white p-2 md:p-4">
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Upload Files Button */}
          <button className="px-2 py-1.5 md:px-4 md:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs md:text-base font-medium transition-colors flex items-center gap-1 md:gap-2">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="hidden sm:inline">Upload files</span>
          </button>

          {/* Chat Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-1.5 md:px-4 md:py-2.5 pr-10 md:pr-12 text-xs md:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent"
            />
            {/* Send Button */}
            <button className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-full flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
