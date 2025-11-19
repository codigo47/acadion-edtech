'use client';

export default function VersionControlFeature() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-3 md:p-6">
      <div className="w-full max-w-md">
        {/* Today's versions */}
        <div className="mb-4 md:mb-6">
          <h3 className="text-xs md:text-sm font-semibold text-gray-500 mb-2 md:mb-3">{getDayName(today)}</h3>
          <div className="space-y-2 md:space-y-3">
            <div className="p-2 md:p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
              <div className="text-xs md:text-sm text-gray-600 mb-1">{formatDate(today)}</div>
              <div className="text-[10px] md:text-xs text-green-600 font-medium mb-1.5 md:mb-2">Current version</div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#A8D5A3]"></div>
                <span className="text-xs md:text-sm text-gray-800 font-medium">John Doe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Yesterday's versions */}
        <div>
          <h3 className="text-xs md:text-sm font-semibold text-gray-500 mb-2 md:mb-3">{getDayName(yesterday)}</h3>
          <div className="space-y-2 md:space-y-3">
            <div className="p-2 md:p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
              <div className="text-xs md:text-sm text-gray-600 mb-1.5 md:mb-2">{formatDate(yesterday)}, 3:45 PM</div>
              <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-400"></div>
                <span className="text-xs md:text-sm text-gray-800">Jane Donalson</span>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-1.5 md:gap-2">
                <button className="flex-1 px-2 py-1 md:px-3 md:py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[10px] md:text-xs rounded font-medium transition-colors">
                  View
                </button>
                <button className="flex-1 px-2 py-1 md:px-3 md:py-1.5 bg-[#9F80DA] hover:bg-[#8A6BC5] text-white text-[10px] md:text-xs rounded font-medium transition-colors">
                  Recover
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
