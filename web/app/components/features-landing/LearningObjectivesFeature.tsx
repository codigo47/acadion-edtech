'use client';

export default function LearningObjectivesFeature() {
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
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Check Learning Objectives Button */}
        <div className="mt-4 md:mt-6 flex justify-center">
          <button className="px-3 py-2 md:px-4 md:py-2.5 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-lg text-sm md:text-base font-medium transition-colors flex items-center gap-1.5 md:gap-2">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Check learning objectives
          </button>
        </div>
      </div>
    </div>
  );
}
