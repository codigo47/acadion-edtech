'use client';

import { useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableTimelineBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const events = (content.events as Array<Record<string, unknown>>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  const updateEvent = useCallback((idx: number, field: string, value: string) => {
    const n = [...events]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, events: n });
  }, [events, content, onDataChange]);

  const addEvent = () => { onDataChange({ ...content, events: [...events, { id: `ev-${Date.now()}`, title: '', description: '', date: '' }] }); };
  const removeEvent = (idx: number) => { onDataChange({ ...content, events: events.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="relative ml-4 pl-6 border-l-2 border-gray-300 space-y-6">
        {events.map((event, idx) => (
          <div key={String(event.id || idx)} className="relative group/ev">
            {/* Dot on the line */}
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#9F80DA] border-2 border-white" />
            <div className="flex items-start gap-2">
              <div className="flex-1 cursor-text space-y-1">
                <EditableText value={String(event.date || '')} onChange={(v) => updateEvent(idx, 'date', v)} tag="span" className="text-xs text-gray-500" placeholder="Date..." multiline={false} />
                <EditableText value={String(event.title || '')} onChange={(v) => updateEvent(idx, 'title', v)} tag="p" className="font-medium text-gray-900" placeholder="Event title..." multiline={false} />
                <EditableText value={String(event.description || '')} onChange={(v) => updateEvent(idx, 'description', v)} tag="p" className="text-sm" style={{ color: 'var(--block-text-color, #4B5563)' }} placeholder="Description..." />
              </div>
              {deleteConfirmIdx === idx ? (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => removeEvent(idx)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                  <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                </div>
              ) : events.length > 1 && (
                <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-300 hover:text-red-500 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
              )}
            </div>
          </div>
        ))}
        {/* Placeholder event */}
        <div className="relative cursor-pointer" onClick={addEvent}>
          <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
          <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors">
            <p className="text-sm text-gray-400">New event...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
