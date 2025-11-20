'use client';

export default function InstructionalDesignModelsFeature() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-3 md:p-6 my-4 md:my-6">
      {/* Bloom's Taxonomy Pyramid */}
      <div className="w-full max-w-lg flex flex-col items-center">
        <div className="w-full flex flex-col gap-0.5 md:gap-1 items-center">
          {/* Level 6 - Create (narrowest) */}
          <div className="w-[45%] bg-[#9F80DA] text-white py-2 md:py-3 px-2 md:px-3 text-center text-xs md:text-sm font-semibold rounded-t-lg shadow-sm">
            Create
          </div>

          {/* Level 5 - Evaluate */}
          <div className="w-[55%] bg-[#A88FDD] text-white py-2 md:py-3 px-2 md:px-3 text-center text-xs md:text-sm font-semibold shadow-sm">
            Evaluate
          </div>

          {/* Level 4 - Analyze */}
          <div className="w-[65%] bg-[#B19FE0] text-white py-2 md:py-3 px-2 md:px-3 text-center text-xs md:text-sm font-semibold shadow-sm">
            Analyze
          </div>

          {/* Level 3 - Apply */}
          <div className="w-[75%] bg-[#BAAFE3] text-white py-2 md:py-3 px-2 md:px-3 text-center text-xs md:text-sm font-semibold shadow-sm">
            Apply
          </div>

          {/* Level 2 - Understand */}
          <div className="w-[85%] bg-[#C3BFE6] text-white py-2 md:py-3 px-2 md:px-3 text-center text-xs md:text-sm font-semibold shadow-sm">
            Understand
          </div>

          {/* Level 1 - Remember (widest) */}
          <div className="w-[95%] bg-[#CCCFE9] text-gray-800 py-2 md:py-3 px-2 md:px-3 text-center text-xs md:text-sm font-semibold rounded-b-lg shadow-sm">
            Remember
          </div>
        </div>

        {/* Label */}
        <div className="mt-3 md:mt-4 text-center">
          <p className="text-xs md:text-sm font-semibold text-gray-700">Bloom's Taxonomy</p>
          <p className="text-[10px] md:text-xs text-gray-500">Cognitive Learning Levels</p>
        </div>
      </div>
    </div>
  );
}
