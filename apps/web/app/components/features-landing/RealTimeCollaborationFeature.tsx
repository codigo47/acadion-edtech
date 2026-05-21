'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function RealTimeCollaborationFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Document Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-white">
        {/* Document Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4 text-center">Scrum course</h1>

        {/* Multimedia Content Placeholders */}
        <div className="space-y-2 md:space-y-3">
          {/* Text placeholder */}
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>

          {/* First cursor position */}
          <div className="relative">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-2/3 top-0 flex items-start gap-0.5 md:gap-1"
            >
              <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
              </svg>
              <div className="flex items-center gap-0.5 md:gap-1 bg-blue-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded">
                <Image
                  src="/landing/avatars/3.jpg"
                  alt="John"
                  width={16}
                  height={16}
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-blue-300"
                />
                <span className="hidden sm:inline">John</span>
              </div>
            </motion.div>
          </div>

          {/* Image placeholder */}
          <div className="my-2 md:my-3 h-16 md:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Text placeholder */}
          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>

          {/* Video placeholder */}
          <div className="my-2 md:my-3 h-16 md:h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

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
                <Image
                  src="/landing/avatars/4.jpg"
                  alt="Sarah"
                  width={16}
                  height={16}
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-purple-300"
                />
                <span className="hidden sm:inline">Sarah</span>
              </div>
            </motion.div>
          </div>

          {/* Audio placeholder */}
          <div className="my-2 md:my-3 h-12 md:h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
