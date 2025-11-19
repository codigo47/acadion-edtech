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
          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
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
