'use client';

import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { BlurInput } from './editable-helpers';

export function EditableMediaUrlBlock({ content, onDataChange, label }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; label: string }) {
  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
      <div className="px-3 py-2 border border-gray-200 rounded-lg cursor-text">
        <EditableText value={String(content.title || '')} onChange={(v) => onDataChange({ ...content, title: v })} tag="span" className="text-sm" placeholder="Title..." multiline={false} />
      </div>
      <BlurInput value={String(content.url || '')} onSave={(v) => onDataChange({ ...content, url: v })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder={`${label} URL...`} />
    </div>
  );
}
