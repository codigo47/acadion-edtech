'use client';

export default function ProfessionalPortfolioFeature() {
  const courses = [
    'Scrum course',
    'Marketing 101',
    'Sales training',
    'Product design'
  ];

  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-2 md:p-4">
      <div className="flex flex-col items-center w-full max-w-2xl">
        {/* Portfolio Header with Avatar */}
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs md:text-sm">
            JD
          </div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800">My portfolio</h1>
        </div>

        {/* Portfolio Layout - Bio column + Grid */}
        <div className="flex gap-4 md:gap-6 w-full justify-center items-start">
          {/* Bio Column */}
          <div className="flex flex-col gap-1 md:gap-1.5">
            <div className="text-xs md:text-sm font-bold text-gray-700 text-center mb-1">Bio</div>
            <div className="w-12 h-3 md:w-16 md:h-4 bg-gray-200 rounded"></div>
            <div className="w-12 h-3 md:w-16 md:h-4 bg-gray-200 rounded"></div>
            <div className="w-12 h-3 md:w-16 md:h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Portfolio Grid - 2 columns x 2 rows */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex gap-2 md:gap-3">
              {courses.slice(0, 2).map((course, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-14 md:w-28 md:h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded mb-1.5 flex items-center justify-center border-2 border-gray-200">
                    <svg className="w-5 h-5 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-[10px] md:text-sm font-medium text-gray-700 text-center">{course}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 md:gap-3">
              {courses.slice(2, 4).map((course, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-14 md:w-28 md:h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded mb-1.5 flex items-center justify-center border-2 border-gray-200">
                    <svg className="w-5 h-5 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-[10px] md:text-sm font-medium text-gray-700 text-center">{course}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
