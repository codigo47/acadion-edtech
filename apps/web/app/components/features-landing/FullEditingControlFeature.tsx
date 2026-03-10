'use client';

export default function FullEditingControlFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Document Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-white">
        {/* Document Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4 text-center">Scrum course</h1>

        {/* Placeholder Content with Edit Buttons and AI Prompt */}
        <div className="space-y-2 md:space-y-3">
          {/* Text placeholder with edit button */}
          <div className="relative group">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-4/5"></div>
            <button className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          <div className="relative group">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-2/3"></div>
            <button className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* Image placeholder with edit button */}
          <div className="relative group my-2 md:my-3">
            <div className="h-16 md:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <button className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* Text placeholder with AI prompt bubble */}
          <div className="relative">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>

            {/* Floating AI Prompt Box - Positioned over the text, centered */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border-2 border-gray-200 p-2 md:p-3 flex flex-col gap-2 w-[90%] md:w-72 z-10">
              <textarea
                value="Rewrite in formal style"
                readOnly
                rows={1}
                className="w-full text-[10px] md:text-xs text-gray-700 bg-gray-50 px-2 py-1.5 md:px-3 md:py-2 rounded border border-gray-300 outline-none cursor-default resize-none"
              />
              <button className="w-full px-2 py-1.5 md:px-3 md:py-2 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white text-[10px] md:text-xs rounded font-medium transition-colors flex items-center justify-center gap-1">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Apply
              </button>
            </div>
          </div>

          {/* Video placeholder with edit button */}
          <div className="relative group my-2 md:my-3 mt-10 md:mt-14">
            <div className="h-16 md:h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <button className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* Text placeholder with edit button */}
          <div className="relative group">
            <div className="h-3 md:h-4 bg-gray-200 rounded w-3/5"></div>
            <button className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
              <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
