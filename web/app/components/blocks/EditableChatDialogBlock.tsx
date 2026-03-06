'use client';

import { useCallback } from 'react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableChatDialogBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const messages = (content.messages as Array<{ text: string; isLeft?: boolean }>) || [];

  const updateMessage = useCallback((idx: number, value: string) => {
    const n = [...messages]; n[idx] = { ...n[idx], text: value };
    onDataChange({ ...content, messages: n });
  }, [messages, content, onDataChange]);

  const toggleSide = (idx: number) => {
    const n = [...messages]; n[idx] = { ...n[idx], isLeft: !n[idx].isLeft };
    onDataChange({ ...content, messages: n });
  };

  const addMessage = () => {
    const lastIsLeft = messages.length > 0 ? messages[messages.length - 1].isLeft : true;
    onDataChange({ ...content, messages: [...messages, { text: '', isLeft: !lastIsLeft }] });
  };

  const removeMessage = (idx: number) => { onDataChange({ ...content, messages: messages.filter((_, i) => i !== idx) }); };

  return (
    <div className="w-full p-4 rounded-lg space-y-3" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="space-y-3 max-w-xl mx-auto">
        {messages.map((msg, idx) => {
          const isLeft = msg.isLeft ?? idx % 2 === 0;
          return (
            <div key={idx} className={`flex ${isLeft ? 'justify-start' : 'justify-end'} group/dlg`}>
              <div className={`flex flex-col ${isLeft ? 'items-start' : 'items-end'}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${isLeft ? 'rounded-bl-sm' : 'rounded-br-sm'} cursor-text`}
                  style={{ backgroundColor: isLeft ? '#E5E7EB' : '#9F80DA', color: isLeft ? '#1F2937' : '#FFFFFF' }}
                >
                  <button onClick={() => toggleSide(idx)} className="text-xs mb-1 hover:opacity-70" style={{ color: isLeft ? '#6B7280' : '#E5E7EB' }}>{isLeft ? 'Left' : 'Right'} ↔</button>
                  <div className="cursor-text">
                    <EditableText value={msg.text} onChange={(v) => updateMessage(idx, v)} tag="p" className="text-sm" style={{ color: isLeft ? '#1F2937' : '#ffffff', lineHeight: '1.4' }} placeholder="Message..." />
                  </div>
                </div>
                <button onClick={() => removeMessage(idx)} className="text-xs text-gray-400 hover:text-red-500 mt-1 px-2">Remove</button>
              </div>
            </div>
          );
        })}
      </div>
      <div onClick={addMessage} className="max-w-xs mx-auto p-3 border-2 border-dashed border-gray-300 rounded-2xl hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New message...</div>
    </div>
  );
}
