'use client';

import { useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableChatQuestionWallBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ question: string; answer: string }>) || [];

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const n = [...items]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, items: n });
  }, [items, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, items: [...items, { question: '', answer: '' }] });
  const removeItem = (idx: number) => onDataChange({ ...content, items: items.filter((_, i) => i !== idx) });

  return (
    <div className="w-full p-4 rounded-lg" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="grid grid-cols-2 gap-4">
        {/* Questions Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold mb-2 text-gray-500">Questions</h4>
          {items.map((item, idx) => (
            <div key={`q-${idx}`} className="relative group/q">
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm cursor-text" style={{ backgroundColor: '#E5E7EB' }}>
                <EditableText value={item.question} onChange={(v) => updateItem(idx, 'question', v)} tag="p" className="text-sm" style={{ color: '#1F2937', lineHeight: '1.4' }} placeholder="Question..." />
              </div>
              {items.length > 1 && (
                <button onClick={() => removeItem(idx)} className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 shadow-sm border border-gray-200"><Trash2 className="w-3 h-3" /></button>
              )}
            </div>
          ))}
        </div>
        {/* Answers Column */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold mb-2 text-gray-500">Answers</h4>
          {items.map((item, idx) => (
            <div key={`a-${idx}`} className="px-4 py-3 rounded-2xl rounded-br-sm cursor-text" style={{ backgroundColor: '#9F80DA' }}>
              <EditableText value={item.answer} onChange={(v) => updateItem(idx, 'answer', v)} tag="p" className="text-sm" style={{ color: '#ffffff', lineHeight: '1.4' }} placeholder="Answer..." />
            </div>
          ))}
        </div>
      </div>
      <div onClick={addItem} className="mt-4 p-3 border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New Q&A pair...</div>
    </div>
  );
}
