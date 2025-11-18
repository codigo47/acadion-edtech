'use client';

export default function ProjectManagementFeature() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-3 md:p-6">
      <div className="w-full max-w-md space-y-2 md:space-y-3">
        {/* Task 1 - Completed */}
        <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-green-50 rounded-lg border-2 border-green-200">
          <input type="checkbox" checked readOnly className="w-4 h-4 md:w-5 md:h-5 text-green-600 rounded" />
          <span className="text-gray-700 text-sm md:text-base font-medium line-through">Review content</span>
        </label>

        {/* Task 2 - Completed */}
        <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-green-50 rounded-lg border-2 border-green-200">
          <input type="checkbox" checked readOnly className="w-4 h-4 md:w-5 md:h-5 text-green-600 rounded" />
          <span className="text-gray-700 text-sm md:text-base font-medium line-through">Branding QA</span>
        </label>

        {/* Task 3 - Pending */}
        <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-sm md:text-base font-medium">Content review QA</span>
        </label>

        {/* Task 4 - Pending */}
        <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
          <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-sm md:text-base font-medium">Learning Objectives</span>
        </label>
      </div>
    </div>
  );
}
