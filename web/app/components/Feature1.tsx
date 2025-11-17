'use client';

import { motion } from 'framer-motion';

export default function Feature1() {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50 rounded-3xl overflow-hidden border-2 border-gray-200 shadow-2xl">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {/* User Message - Aligned Right */}
        <div className="flex justify-end items-start gap-3">
          <div className="bg-[#9F80DA] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[70%] shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-sm">Scrum Docs.pdf</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              You
            </div>
          </div>
        </div>

        {/* AI Message - Aligned Left */}
        <div className="flex justify-start items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              AI
            </div>
          </div>
          <div className="flex flex-col max-w-[70%]">
            <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
              <p className="text-sm">Sure, let me generate the elearning for you</p>
            </div>
            {/* Loading Indicator */}
            <div className="flex items-center gap-2 mt-2 ml-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4"
              >
                <svg className="w-4 h-4 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
              <span className="text-xs text-gray-500 italic">Generating elearning...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input Container */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-2">
          {/* Upload Files Button */}
          <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload files
          </button>

          {/* Chat Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent"
            />
            {/* Send Button */}
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-full flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
