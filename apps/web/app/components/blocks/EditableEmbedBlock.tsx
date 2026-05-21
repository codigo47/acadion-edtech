'use client';

import { useState, useRef, useEffect } from 'react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { BlurInput } from './editable-helpers';

export function EditableEmbedBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const [localHtml, setLocalHtml] = useState(String(content.html || ''));
  const prevHtml = useRef(String(content.html || ''));
  useEffect(() => { const v = String(content.html || ''); if (v !== prevHtml.current) { setLocalHtml(v); prevHtml.current = v; } }, [content.html]);
  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <h3 className="text-sm font-semibold text-gray-500">Embed</h3>
      <div className="px-3 py-2 border border-gray-200 rounded-lg cursor-text">
        <EditableText value={String(content.title || '')} onChange={(v) => onDataChange({ ...content, title: v })} tag="span" className="text-sm" placeholder="Title..." multiline={false} />
      </div>
      <BlurInput value={String(content.url || '')} onSave={(v) => onDataChange({ ...content, url: v })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="URL..." />
      <textarea value={localHtml} onChange={(e) => setLocalHtml(e.target.value)} onBlur={() => { if (localHtml !== String(content.html || '')) onDataChange({ ...content, html: localHtml }); }} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 font-mono" rows={4} placeholder="Embed HTML..." />
    </div>
  );
}
