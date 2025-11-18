'use client';

export default function FullEditingControlFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Document Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-white">
        {/* Document Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">Scrum course</h1>

        {/* Placeholder Content with Edit Button */}
        <div className="space-y-2 md:space-y-3">
          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-2/3"></div>

          {/* Placeholder with Edit Button */}
          <div className="relative group">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-1/2"></div>
            <button className="absolute left-[55%] top-1/2 -translate-y-1/2 w-5 h-5 md:w-7 md:h-7 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded flex items-center justify-center transition-colors">
              <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-3/5"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
}
