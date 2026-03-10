'use client';

import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableTwoFieldBlock({ content, onDataChange, fieldA, fieldB, labelA, labelB, colorA, colorB }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; fieldA: string; fieldB: string; labelA: string; labelB: string; colorA: string; colorB: string }) {
  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className={`flex-1 p-4 rounded-lg ${colorA} cursor-text`}>
          <EditableText value={String(content.labelA || labelA)} onChange={(v) => onDataChange({ ...content, labelA: v })} tag="h3" className="text-xs font-semibold text-gray-500 mb-2" placeholder={labelA} multiline={false} />
          <EditableText value={String(content[fieldA] || '')} onChange={(v) => onDataChange({ ...content, [fieldA]: v })} tag="p" className="text-sm" style={{ color: 'var(--block-text-color, #374151)' }} placeholder={`Enter ${labelA.toLowerCase()}...`} />
        </div>
        <div className={`flex-1 p-4 rounded-lg ${colorB} cursor-text`}>
          <EditableText value={String(content.labelB || labelB)} onChange={(v) => onDataChange({ ...content, labelB: v })} tag="h3" className="text-xs font-semibold text-gray-500 mb-2" placeholder={labelB} multiline={false} />
          <EditableText value={String(content[fieldB] || '')} onChange={(v) => onDataChange({ ...content, [fieldB]: v })} tag="p" className="text-sm" style={{ color: 'var(--block-text-color, #374151)' }} placeholder={`Enter ${labelB.toLowerCase()}...`} />
        </div>
      </div>
    </div>
  );
}
