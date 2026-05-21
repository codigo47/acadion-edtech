'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableStoryTellingBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="flex items-start gap-4 max-w-2xl mx-auto">
        {/* Avatar matching read-only sizing */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-32 md:w-32 md:h-40 cursor-pointer group/avatar" onClick={() => setShowPicker(true)}>
            {content.avatarImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={String(content.avatarImage)} alt={String(content.avatarName || '')} className="w-full h-full object-contain object-top" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Change</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"><ImageIcon className="w-6 h-6" /></div>
            )}
          </div>
          <div className="cursor-text text-center mt-1">
            <EditableText value={String(content.avatarName || '')} onChange={(v) => onDataChange({ ...content, avatarName: v })} tag="p" className="text-sm font-medium" style={{ color: 'var(--block-text-color, #4B5563)' }} placeholder="Name..." multiline={false} />
          </div>
        </div>
        {/* Speech bubble */}
        <div className="flex-1">
          <div className="p-4 bg-white rounded-2xl border-2 border-gray-200 cursor-text relative" style={{ borderRadius: '15px' }}>
            <div className="absolute left-0 top-4 -ml-2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-gray-200 border-b-[8px] border-b-transparent" />
            <div className="absolute left-0 top-4 -ml-[6px] w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-white border-b-[8px] border-b-transparent" />
            <EditableText value={String(content.text || '')} onChange={(v) => onDataChange({ ...content, text: v })} tag="p" className="text-base" style={{ color: 'var(--block-text-color, #1F2937)', lineHeight: '1.6' }} placeholder="Story text..." />
          </div>
        </div>
      </div>
      {showPicker && (
        <ImagePickerModal currentUrl={String(content.avatarImage || '')} onSelect={(url) => { onDataChange({ ...content, avatarImage: url }); setShowPicker(false); }} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}
