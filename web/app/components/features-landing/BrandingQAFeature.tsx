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

          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
