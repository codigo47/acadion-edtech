'use client';

export default function InteractiveActivitiesFeature() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-2 md:p-4">
      <div className="w-full max-w-sm">
        {/* Question */}
        <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-2 md:mb-3">
          What is the recommended duration for a Sprint in Scrum?
        </h3>

        {/* Multiple Choice Options */}
        <div className="space-y-1.5 md:space-y-2">
          <label className="flex items-center p-1.5 md:p-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border-2 border-gray-200">
            <input type="radio" name="scrum-question" className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#9F80DA]" />
            <span className="ml-1.5 md:ml-2 text-xs md:text-sm text-gray-700">1 week</span>
          </label>

          <label className="flex items-center p-1.5 md:p-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border-2 border-gray-200">
            <input type="radio" name="scrum-question" className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#9F80DA]" />
            <span className="ml-1.5 md:ml-2 text-xs md:text-sm text-gray-700">2-4 weeks</span>
          </label>

          <label className="flex items-center p-1.5 md:p-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border-2 border-gray-200">
            <input type="radio" name="scrum-question" className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#9F80DA]" />
            <span className="ml-1.5 md:ml-2 text-xs md:text-sm text-gray-700">6 weeks</span>
          </label>

          <label className="flex items-center p-1.5 md:p-2 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border-2 border-gray-200">
            <input type="radio" name="scrum-question" className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#9F80DA]" />
            <span className="ml-1.5 md:ml-2 text-xs md:text-sm text-gray-700">No time limit</span>
          </label>
        </div>
      </div>
    </div>
  );
}
