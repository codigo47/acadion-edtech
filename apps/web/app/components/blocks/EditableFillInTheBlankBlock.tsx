'use client';

import { useState, useCallback } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { BlurInput } from './editable-helpers';

export function EditableFillInTheBlankBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ id: string; text: string; answers: string[] }>) || [];
  const [deleteItemConfirmId, setDeleteItemConfirmId] = useState<string | null>(null);
  const [deleteAnswerKey, setDeleteAnswerKey] = useState<string | null>(null);

  const updateItem = useCallback((id: string, field: string, value: unknown) => {
    onDataChange({ ...content, items: items.map(item => item.id === id ? { ...item, [field]: value } : item) });
  }, [items, content, onDataChange]);

  const updateAnswer = useCallback((itemId: string, ansIdx: number, value: string) => {
    const newItems = items.map(item => {
      if (item.id !== itemId) return item;
      const newAnswers = [...item.answers]; newAnswers[ansIdx] = value;
      return { ...item, answers: newAnswers };
    });
    onDataChange({ ...content, items: newItems });
  }, [items, content, onDataChange]);

  const addItem = () => { onDataChange({ ...content, items: [...items, { id: `fib-${Date.now()}`, text: '', answers: [''] }] }); };
  const addAnswer = (itemId: string) => { onDataChange({ ...content, items: items.map(item => item.id === itemId ? { ...item, answers: [...item.answers, ''] } : item) }); };
  const removeItem = (id: string) => { onDataChange({ ...content, items: items.filter(item => item.id !== id) }); setDeleteItemConfirmId(null); };
  const removeAnswer = (itemId: string, ansIdx: number) => { onDataChange({ ...content, items: items.map(item => item.id === itemId ? { ...item, answers: item.answers.filter((_, i) => i !== ansIdx) } : item) }); setDeleteAnswerKey(null); };

  return (
    <div className="w-full p-4 rounded-lg space-y-4">
      {items.map((item, idx) => (
        <div key={item.id} className="p-4 border-2 border-gray-200 rounded-lg group/fib hover:border-gray-300">
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-gray-400 pt-1">{idx + 1}.</span>
            <div className="flex-1 cursor-text">
              <EditableText value={item.text} onChange={(v) => updateItem(item.id, 'text', v)} tag="p" className="text-gray-900" placeholder="Text with ___ for blanks..." />
            </div>
            {deleteItemConfirmId === item.id ? (
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => removeItem(item.id)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                <button onClick={() => setDeleteItemConfirmId(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
              </div>
            ) : (
              <button onClick={() => setDeleteItemConfirmId(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            )}
          </div>
          <div className="mt-3 pl-6 space-y-1">
            <p className="text-xs font-medium text-gray-500 mb-1">Correct answers:</p>
            {item.answers.map((ans, ansIdx) => {
              const ansKey = `${item.id}-${ansIdx}`;
              return (
                <div key={ansIdx} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <BlurInput value={ans} onSave={(v) => updateAnswer(item.id, ansIdx, v)} className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="Answer..." />
                  {item.answers.length > 1 && (
                    deleteAnswerKey === ansKey ? (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => removeAnswer(item.id, ansIdx)} className="px-1.5 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                        <button onClick={() => setDeleteAnswerKey(null)} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteAnswerKey(ansKey)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                    )
                  )}
                </div>
              );
            })}
            <div onClick={() => addAnswer(item.id)} className="px-3 py-1.5 border border-dashed border-gray-300 rounded hover:border-[#9F80DA] transition-colors cursor-pointer text-xs text-gray-400 hover:text-[#9F80DA]">New answer...</div>
          </div>
        </div>
      ))}
      <div onClick={addItem} className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New blank item...</div>
    </div>
  );
}
