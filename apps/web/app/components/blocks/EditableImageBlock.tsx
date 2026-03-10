'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';
import { CourseComponent } from '@/app/project/[courseKey]/_components/CourseComponent';
import type { UnitComponent } from '@/app/project/[courseKey]/_components/types';

export function EditableImageBlock({
  component,
  content,
  onDataChange,
}: {
  component: UnitComponent;
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <div
        className="relative group cursor-pointer"
        onClick={() => setShowPicker(true)}
      >
        <CourseComponent component={component} />
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
          <span className="px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4" />
            Change image
          </span>
        </div>
      </div>

      {showPicker && (
        <ImagePickerModal
          currentUrl={String(content.image || '')}
          onSelect={(url) => onDataChange({ ...content, image: url })}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}
