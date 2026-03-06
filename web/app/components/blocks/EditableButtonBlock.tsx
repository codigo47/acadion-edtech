'use client';

import { useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { BlurInput } from './editable-helpers';

export function EditableButtonBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ id: string; text: string; url: string; linkType?: 'url' | 'deep' }>) || [];

  const updateItem = useCallback((id: string, field: string, value: string) => {
    onDataChange({ ...content, items: items.map(i => i.id === id ? { ...i, [field]: value } : i) });
  }, [items, content, onDataChange]);

  const toggleLinkType = useCallback((id: string) => {
    onDataChange({ ...content, items: items.map(i => {
      if (i.id !== id) return i;
      const newType = i.linkType === 'deep' ? 'url' : 'deep';
      return { ...i, linkType: newType, url: newType === 'deep' ? '#unit-' : '' };
    })});
  }, [items, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, items: [...items, { id: `btn-${Date.now()}`, text: '', url: '' }] });
  const removeItem = (id: string) => onDataChange({ ...content, items: items.filter(i => i.id !== id) });

  return (
    <div className="w-full p-4 rounded-lg space-y-2">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-3 group/btn">
          <div className="flex-1 space-y-2">
            <div className="inline-block px-6 py-2.5 bg-[#9F80DA] text-white rounded-lg cursor-text">
              <EditableText value={item.text} onChange={(v) => updateItem(item.id, 'text', v)} tag="span" className="text-sm font-medium text-white" style={{ color: '#ffffff' }} placeholder="Button text..." multiline={false} />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleLinkType(item.id)}
                className={`px-2 py-0.5 text-xs rounded transition-colors flex-shrink-0 ${item.linkType === 'deep' ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
              >
                {item.linkType === 'deep' ? 'Deep Link' : 'URL'}
              </button>
              {item.linkType === 'deep' ? (
                <BlurInput value={item.url.replace('#unit-', '')} onSave={(v) => updateItem(item.id, 'url', `#unit-${v}`)} placeholder="Unit code (e.g. 1.1)..." />
              ) : (
                <BlurInput value={item.url} onSave={(v) => updateItem(item.id, 'url', v)} placeholder="URL..." />
              )}
            </div>
          </div>
          {items.length > 1 && <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
        </div>
      ))}
      <div onClick={addItem} className="inline-block px-6 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-sm text-gray-400 hover:text-[#9F80DA]">New button...</div>
    </div>
  );
}
