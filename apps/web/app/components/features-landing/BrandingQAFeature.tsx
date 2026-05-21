'use client';

export default function BrandingQAFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Document Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-white">
        {/* Document Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4 text-center">Scrum course</h1>

        {/* Placeholder Content */}
        <div className="space-y-2 md:space-y-3">
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>

          {/* Selected placeholder with color branding error */}
          <div className="relative p-2 md:p-3 bg-red-50 border-2 border-red-300 rounded-lg">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>

            {/* Error bubble */}
            <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 px-2 py-1 md:px-3 md:py-2 bg-red-500 text-white text-[10px] md:text-xs rounded-lg font-medium shadow-lg whitespace-nowrap">
              Color not brand compliant
              <div className="absolute -bottom-0.5 md:-bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rotate-45"></div>
            </div>

            {/* Fix with AI Button */}
            <button className="absolute -bottom-2 md:-bottom-3 right-1 md:right-2 px-2 py-1 md:px-3 md:py-1.5 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white text-[10px] md:text-xs rounded-lg font-medium transition-colors flex items-center gap-1 md:gap-1.5 shadow-lg">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fix with AI
            </button>
          </div>

          {/* Image placeholder */}
          <div className="my-2 md:my-3 h-16 md:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>

          {/* Selected placeholder with typography branding error */}
          <div className="relative p-2 md:p-3 bg-red-50 border-2 border-red-300 rounded-lg">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-3/5"></div>

            {/* Error bubble */}
            <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 px-2 py-1 md:px-3 md:py-2 bg-red-500 text-white text-[10px] md:text-xs rounded-lg font-medium shadow-lg whitespace-nowrap">
              Typography not brand compliant
              <div className="absolute -bottom-0.5 md:-bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rotate-45"></div>
            </div>

            {/* Fix with AI Button */}
            <button className="absolute -bottom-2 md:-bottom-3 right-1 md:right-2 px-2 py-1 md:px-3 md:py-1.5 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white text-[10px] md:text-xs rounded-lg font-medium transition-colors flex items-center gap-1 md:gap-1.5 shadow-lg">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fix with AI
            </button>
          </div>

          {/* Video placeholder */}
          <div className="my-2 md:my-3 h-16 md:h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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
