'use client';

export default function LearningObjectivesFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Document Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-white relative">
        {/* Document Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4 text-center">Scrum course</h1>

        {/* Placeholder Content */}
        <div className="space-y-2 md:space-y-3">
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>

          {/* Image placeholder */}
          <div className="my-2 md:my-3 h-16 md:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>

          {/* Video placeholder */}
          <div className="my-2 md:my-3 h-16 md:h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>

          {/* Audio placeholder */}
          <div className="my-2 md:my-3 h-12 md:h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>

          <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Learning Objectives Checklist Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl border-2 border-gray-200 p-3 md:p-4 w-[85%] md:w-72 z-10">
          <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-2 md:mb-3">Learning Objectives QA</h3>

          <div className="space-y-1.5 md:space-y-2">
            {/* Objective 1 - Checked */}
            <div className="flex items-start gap-2 p-1.5 md:p-2 bg-green-50 border border-green-200 rounded">
              <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 bg-green-100 border-2 border-green-400 rounded flex items-center justify-center mt-0.5">
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[10px] md:text-xs text-green-800 font-medium leading-tight">
                Understand Scrum framework basics
              </span>
            </div>

            {/* Objective 2 - Checked */}
            <div className="flex items-start gap-2 p-1.5 md:p-2 bg-green-50 border border-green-200 rounded">
              <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 bg-green-100 border-2 border-green-400 rounded flex items-center justify-center mt-0.5">
                <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[10px] md:text-xs text-green-800 font-medium leading-tight">
                Identify key Scrum roles and responsibilities
              </span>
            </div>

            {/* Objective 3 - Not Checked (Orange) */}
            <div className="flex items-start gap-2 p-1.5 md:p-2 bg-orange-50 border border-orange-200 rounded">
              <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 bg-white border-2 border-orange-400 rounded mt-0.5"></div>
              <span className="text-[10px] md:text-xs text-orange-800 font-medium leading-tight">
                Apply Scrum ceremonies in practice
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
