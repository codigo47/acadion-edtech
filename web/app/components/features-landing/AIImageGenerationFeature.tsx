'use client';

export default function AIImageGenerationFeature() {
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
      {/* Document Container */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-white">
        {/* Document Title */}
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4 text-center">Scrum course</h1>

        {/* Placeholder Content with Image */}
        <div className="space-y-2 md:space-y-3">
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>

          {/* AI Generated Image Placeholder with Prompt Box */}
          <div className="relative my-2 md:my-4">
            <div className="h-24 md:h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-[#9F80DA]/30">
              <svg className="w-8 h-8 md:w-12 md:h-12 text-[#9F80DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            {/* Floating Prompt Box */}
            <div className="absolute -bottom-8 md:-bottom-12 right-1 md:right-2 bg-white rounded-lg shadow-lg border-2 border-gray-200 p-2 md:p-3 flex flex-col gap-2 w-[90%] md:w-80">
              <textarea
                value="Add a corporate style image of a meeting in black and white"
                readOnly
                rows={2}
                className="w-full text-[10px] md:text-xs text-gray-700 bg-gray-50 px-2 py-1.5 md:px-3 md:py-2 rounded border border-gray-300 outline-none cursor-default resize-none"
              />
              <button className="w-full px-2 py-1.5 md:px-3 md:py-2 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white text-[10px] md:text-xs rounded font-medium transition-colors flex items-center justify-center gap-1">
                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Apply
              </button>
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
