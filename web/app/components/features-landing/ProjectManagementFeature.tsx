'use client';

import Image from 'next/image';

export default function ProjectManagementFeature() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-3 md:p-6">
      <div className="w-full max-w-md space-y-2 md:space-y-3">
        {/* Task 1 - Completed */}
        <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-green-50 rounded-lg border-2 border-green-200">
          <Image
            src="/landing/avatars/1.jpg"
            alt="Avatar"
            width={28}
            height={28}
            className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-green-300"
          />
          <input type="checkbox" checked readOnly className="w-4 h-4 md:w-5 md:h-5 text-green-600 rounded" />
          <span className="text-gray-700 text-sm md:text-base font-medium line-through flex-1">Review content</span>
        </label>

        {/* Task 2 - Completed */}
        <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-green-50 rounded-lg border-2 border-green-200">
          <Image
            src="/landing/avatars/2.jpg"
            alt="Avatar"
            width={28}
            height={28}
            className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-green-300"
          />
          <input type="checkbox" checked readOnly className="w-4 h-4 md:w-5 md:h-5 text-green-600 rounded" />
          <span className="text-gray-700 text-sm md:text-base font-medium line-through flex-1">Branding QA</span>
        </label>

        {/* Task 3 - Pending */}
        <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
          <Image
            src="/landing/avatars/3.jpg"
            alt="Avatar"
            width={28}
            height={28}
            className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-gray-300"
          />
          <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-sm md:text-base font-medium flex-1">Content review QA</span>
        </label>

        {/* Task 4 - Pending */}
        <label className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
          <Image
            src="/landing/avatars/4.jpg"
            alt="Avatar"
            width={28}
            height={28}
            className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-gray-300"
          />
          <input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 text-[#9F80DA] rounded" />
          <span className="text-gray-700 text-sm md:text-base font-medium flex-1">Define Learning Objectives</span>
        </label>
      </div>
    </div>
  );
}
