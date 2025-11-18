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
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-400"></div>
                <span className="text-xs md:text-sm text-gray-800">Jane Donalson</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
