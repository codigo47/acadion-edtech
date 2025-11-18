'use client';

import { motion } from 'framer-motion';

export default function RealTimeCollaborationFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Document Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-white">
        {/* Document Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Scrum course</h1>

        {/* Placeholder Content with Cursors */}
        <div className="space-y-2 md:space-y-3">
          {/* First cursor position */}
          <div className="relative">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-2/3 top-0 flex items-start gap-0.5 md:gap-1"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              </svg>
              <div className="flex items-center gap-0.5 md:gap-1 bg-blue-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-300 flex items-center justify-center text-[8px] md:text-[10px] font-bold">
                  J
                </div>
                <span className="hidden sm:inline">John</span>
              </div>
            </motion.div>
          </div>

          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>

          {/* Second cursor position */}
          <div className="relative">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="absolute left-1/3 top-0 flex items-start gap-0.5 md:gap-1"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              </svg>
              <div className="flex items-center gap-0.5 md:gap-1 bg-purple-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-purple-300 flex items-center justify-center text-[8px] md:text-[10px] font-bold">
                  S
                </div>
                <span className="hidden sm:inline">Sarah</span>
              </div>
            </motion.div>
          </div>

          <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
