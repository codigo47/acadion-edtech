'use client';

export default function WCAGComplianceFeature() {
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

          {/* Text with Magnifying Glass - Centered */}
          <div className="flex justify-center">
            <div className="relative p-2 md:p-4 bg-blue-50 border-2 border-blue-200 rounded-lg w-3/4">
              <div className="flex items-center gap-2 md:gap-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="flex-1 space-y-1 md:space-y-2">
                  <div className="h-2 md:h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 md:h-3 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-2 md:h-3 bg-gray-300 rounded w-3/5"></div>
                </div>
              </div>
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
