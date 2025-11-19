'use client';

export default function CourseCopilotFeature() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-4">
      {/* Left Side - Course Content */}
      <div className="flex-1 bg-white">
        {/* Document Title - Centered */}
        <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 text-center">Scrum Course</h1>

        {/* Content with multimedia blocks */}
        <div className="space-y-3">
          {/* Text placeholder */}
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>

          {/* Image placeholder */}
          <div className="my-3 h-16 md:h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Text placeholder */}
          <div className="h-3 md:h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-full"></div>

          {/* Video placeholder */}
          <div className="my-3 h-16 md:h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Text placeholder */}
          <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

      {/* Right Side - Chat Panel */}
      <div className="w-full md:w-64 lg:w-80 md:flex-shrink-0 flex flex-col bg-gray-50 rounded-2xl border border-gray-200">
        {/* Chat Header */}
        <div className="px-3 py-2 border-b border-gray-200 bg-white rounded-t-2xl">
          <h3 className="text-sm font-semibold text-gray-700">Course Copilot</h3>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-3 space-y-3">
          {/* User Message */}
          <div className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200">
            <p className="text-xs text-gray-700">Change the word <span className="italic font-bold">Scrum</span> to italic and bold throughout the course</p>
          </div>

          {/* AI Response */}
          <div className="bg-[#9F80DA] rounded-lg p-2.5 shadow-sm">
            <p className="text-xs text-white mb-1.5">I detected <span className="font-bold">23 instances</span> of the word "Scrum" in your course.</p>
            <p className="text-xs text-white opacity-90">Apply italic and bold formatting?</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium border border-gray-200 transition-colors">
              Cancel
            </button>
            <button className="flex-1 px-3 py-1.5 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-lg text-xs font-medium transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-2 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask me to edit anything..."
              className="w-full px-3 py-2 pr-9 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA] focus:border-transparent"
            />
            {/* Send Button */}
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white rounded-md flex items-center justify-center transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
