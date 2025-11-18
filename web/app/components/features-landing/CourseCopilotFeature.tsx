'use client';

export default function CourseCopilotFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Document Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-white">
        {/* Document Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Scrum course</h1>

        {/* Placeholder Content */}
        <div className="space-y-2 md:space-y-3">
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
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
              placeholder="Make any edition..."
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
