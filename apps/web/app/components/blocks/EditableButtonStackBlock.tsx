'use client';

import { useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { BlurInput } from './editable-helpers';

export function EditableButtonStackBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ text: string; description?: string; url: string; linkType?: 'url' | 'deep' }>) || [];

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const n = [...items]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, items: n });
  }, [items, content, onDataChange]);

  const toggleLinkType = useCallback((idx: number) => {
    const n = [...items];
    const newType = n[idx].linkType === 'deep' ? 'url' : 'deep';
    n[idx] = { ...n[idx], linkType: newType, url: newType === 'deep' ? '#unit-' : '' };
    onDataChange({ ...content, items: n });
  }, [items, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, items: [...items, { text: '', description: '', url: '' }] });
  const removeItem = (idx: number) => onDataChange({ ...content, items: items.filter((_, i) => i !== idx) });

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <div className="cursor-text mb-2">
        <EditableText value={String(content.title || '')} onChange={(v) => onDataChange({ ...content, title: v })} tag="h3" className="font-semibold text-gray-900" placeholder="Stack title..." multiline={false} />
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="p-3 border-2 border-gray-200 rounded-lg group/bs hover:border-gray-300">
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-1">
              <div className="px-3 py-1.5 border border-gray-200 rounded cursor-text">
                <EditableText value={item.text} onChange={(v) => updateItem(idx, 'text', v)} tag="span" className="text-sm font-medium" placeholder="Button text..." multiline={false} />
              </div>
              <div className="px-3 py-1 border border-gray-200 rounded cursor-text">
                <EditableText value={item.description || ''} onChange={(v) => updateItem(idx, 'description', v)} tag="span" className="text-xs text-gray-500" placeholder="Description..." multiline={false} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLinkType(idx)}
                  className={`px-2 py-0.5 text-xs rounded transition-colors flex-shrink-0 ${item.linkType === 'deep' ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                >
                  {item.linkType === 'deep' ? 'Deep Link' : 'URL'}
                </button>
                {item.linkType === 'deep' ? (
                  <BlurInput value={item.url.replace('#unit-', '')} onSave={(v) => updateItem(idx, 'url', `#unit-${v}`)} className="w-full px-3 py-1 text-xs text-gray-400 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="Unit code (e.g. 1.1)..." />
                ) : (
                  <BlurInput value={item.url} onSave={(v) => updateItem(idx, 'url', v)} className="w-full px-3 py-1 text-xs text-gray-400 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="URL..." />
                )}
              </div>
            </div>
            {items.length > 1 && <button onClick={() => removeItem(idx)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
          </div>
        </div>
      ))}
      <div onClick={addItem} className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New button...</div>
    </div>
  );
}
