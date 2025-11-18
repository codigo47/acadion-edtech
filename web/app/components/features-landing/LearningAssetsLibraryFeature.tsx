'use client';

export default function LearningAssetsLibraryFeature() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-2 md:p-4">
      <div className="w-full max-w-sm space-y-1.5 md:space-y-2">
        <label className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" checked readOnly className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-xs md:text-sm font-medium">E-learning modules</span>
        </label>

        <label className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" checked readOnly className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-xs md:text-sm font-medium">Microlearning content</span>
        </label>

        <label className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-xs md:text-sm font-medium">Job aids</span>
        </label>

        <label className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-xs md:text-sm font-medium">QRG</span>
        </label>

        <label className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-xs md:text-sm font-medium">Facilitator guides</span>
        </label>

        <label className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-xs md:text-sm font-medium">Participant workbooks</span>
        </label>

        <label className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-xs md:text-sm font-medium">ILT</span>
        </label>

        <label className="flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-xs md:text-sm font-medium">Assessments</span>
        </label>
      </div>
    </div>
  );
}
