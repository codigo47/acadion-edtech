'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { BlurInput } from './editable-helpers';

export function EditableAttachmentBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const attachments = (content.attachments as Array<{ id: string; name: string; url: string }>) || [];

  const updateItem = useCallback((id: string, field: string, value: string) => {
    onDataChange({ ...content, attachments: attachments.map(a => a.id === id ? { ...a, [field]: value } : a) });
  }, [attachments, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, attachments: [...attachments, { id: `att-${Date.now()}`, name: '', url: '' }] });
  const removeItem = (id: string) => onDataChange({ ...content, attachments: attachments.filter(a => a.id !== id) });

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const colors: Record<string, string> = { pdf: 'text-red-500', doc: 'text-blue-500', docx: 'text-blue-500', xls: 'text-green-600', xlsx: 'text-green-600', ppt: 'text-orange-500', pptx: 'text-orange-500' };
    return colors[ext] || 'text-gray-400';
  };

  return (
    <div className="w-full p-4 rounded-lg space-y-2">
      {attachments.map(att => (
        <div key={att.id} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg group/att hover:border-gray-300">
          <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 ${getFileIcon(att.name)}`}>
            <span className="text-xs font-bold uppercase">{att.name.split('.').pop() || '?'}</span>
          </div>
          <div className="flex-1 space-y-1">
            <div className="px-3 py-1.5 border border-gray-200 rounded cursor-text">
              <EditableText value={att.name} onChange={(v) => updateItem(att.id, 'name', v)} tag="span" className="text-sm" placeholder="File name..." multiline={false} />
            </div>
            <BlurInput value={att.url} onSave={(v) => updateItem(att.id, 'url', v)} className="w-full px-3 py-1 text-xs text-gray-500 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="File URL..." />
          </div>
          {attachments.length > 1 && <button onClick={() => removeItem(att.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
        </div>
      ))}
      <div onClick={addItem} className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-sm text-gray-400 hover:text-[#9F80DA]">
        <div className="w-10 h-10 rounded-lg border border-dashed border-gray-300 flex items-center justify-center"><Plus className="w-4 h-4" /></div>
        New attachment...
      </div>
    </div>
  );
}
