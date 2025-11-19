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

          {/* Selected placeholder with branding error */}
          <div className="relative p-2 md:p-3 bg-red-50 border-2 border-red-300 rounded-lg">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>

            {/* Error bubble */}
            <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 px-2 py-1 md:px-3 md:py-2 bg-red-500 text-white text-[10px] md:text-xs rounded-lg font-medium shadow-lg whitespace-nowrap">
              Wrong company color
              <div className="absolute -bottom-0.5 md:-bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rotate-45"></div>
            </div>
          </div>

          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
