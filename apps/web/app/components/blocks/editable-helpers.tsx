'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Plus, X, Check, ThumbsUp, ThumbsDown, Trash2, type LucideIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

// Blur-save input: uses local state, saves on blur
export function BlurInput({ value, onSave, className, placeholder }: { value: string; onSave: (v: string) => void; className?: string; placeholder?: string }) {
  const [local, setLocal] = useState(value);
  const prevValue = useRef(value);
  useEffect(() => { if (value !== prevValue.current) { setLocal(value); prevValue.current = value; } }, [value]);
  return (
    <input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      onBlur={() => { if (local !== value) onSave(local); }}
      className={className || 'w-full px-3 py-1 text-xs text-gray-500 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30'}
      placeholder={placeholder}
    />
  );
}

export interface TwoListColumnConfig {
  field: string;
  label: string;
  icon?: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  labelColor?: string;
  bg?: string;
  borderColor?: string;
  bulletColor?: string;
  headerBar?: boolean;
  headerBarBg?: string;
}

export interface TwoListConfig {
  left: TwoListColumnConfig;
  right: TwoListColumnConfig;
  variant: 'bordered' | 'filled' | 'header-bar';
}

export const twoListConfig: Record<string, TwoListConfig> = {
  ComparisonDosDontsBlock: {
    variant: 'bordered',
    left: { field: 'dos', label: "Do's", icon: Check, iconBg: 'bg-green-500', iconColor: 'text-white', labelColor: 'text-green-700', bg: 'bg-white', borderColor: 'border-green-500' },
    right: { field: 'donts', label: "Don'ts", icon: X, iconBg: 'bg-red-500', iconColor: 'text-white', labelColor: 'text-red-700', bg: 'bg-white', borderColor: 'border-red-500' },
  },
  ComparisonProsConsBlock: {
    variant: 'filled',
    left: { field: 'pros', label: 'Pros', icon: ThumbsUp, iconBg: 'bg-green-500', iconColor: 'text-white', labelColor: 'text-green-700', bg: 'bg-green-50', bulletColor: 'text-green-500' },
    right: { field: 'cons', label: 'Cons', icon: ThumbsDown, iconBg: 'bg-red-500', iconColor: 'text-white', labelColor: 'text-red-700', bg: 'bg-red-50', bulletColor: 'text-red-500' },
  },
  ComparisonBeforeAfterBlock: {
    variant: 'header-bar',
    left: { field: 'beforeItems', label: 'Before', headerBar: true, headerBarBg: 'bg-orange-500', bg: 'bg-gray-50' },
    right: { field: 'afterItems', label: 'After', headerBar: true, headerBarBg: 'bg-orange-500', bg: 'bg-gray-50' },
  },
};

export function TwoListColumnEditor({ items, colConfig, content, onDataChange, variant }: { items: string[]; colConfig: TwoListColumnConfig; content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; variant: 'bordered' | 'filled' | 'header-bar' }) {
  const [pendingActive, setPendingActive] = useState(false);
  const [pendingText, setPendingText] = useState('');
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const pendingRef = useRef<HTMLInputElement>(null);
  const { field, label, icon: Icon, iconBg, iconColor, labelColor, bg, borderColor, bulletColor, headerBar, headerBarBg } = colConfig;
  const customLabelKey = `customLabel_${field}`;
  const displayLabel = String(content[customLabelKey] || label);
  const updateLabel = (v: string) => onDataChange({ ...content, [customLabelKey]: v });

  useEffect(() => { if (pendingActive && pendingRef.current) pendingRef.current.focus(); }, [pendingActive]);

  const update = (idx: number, value: string) => { const n = [...items]; n[idx] = value; onDataChange({ ...content, [field]: n }); };
  const remove = (idx: number) => onDataChange({ ...content, [field]: items.filter((_, i) => i !== idx) });
  const confirmPending = () => {
    const text = pendingText.trim();
    if (text) onDataChange({ ...content, [field]: [...items, text] });
    setPendingActive(false);
    setPendingText('');
  };

  // Header-bar variant (BeforeAfter)
  if (variant === 'header-bar') {
    return (
      <div className="flex-1 overflow-hidden rounded-lg">
        <div className={`${headerBarBg} text-white text-center py-2 font-semibold`}>
          <EditableText value={displayLabel} onChange={updateLabel} tag="span" className="text-white font-semibold" placeholder={label} multiline={false} />
        </div>
        <div className={`p-4 ${bg}`}>
          <ul className="space-y-3">
            {items.map((item, idx) => (
              <li key={idx} className="relative flex items-start gap-2 group/li">
                <div className="flex-1 cursor-text">
                  <EditableText value={item} onChange={(v) => update(idx, v)} tag="p" className="text-sm" style={{ color: 'var(--block-text-color, #4B5563)' }} placeholder="New item..." multiline={false} />
                </div>
                {deleteConfirmIdx === idx ? (
                  <div className="absolute right-0 top-0 flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 whitespace-nowrap">
                    <span className="text-xs text-red-600 font-medium">Delete?</span>
                    <button onClick={() => { remove(idx); setDeleteConfirmIdx(null); }} className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors">Yes</button>
                    <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-400 hover:text-red-500 mt-0.5"><Trash2 className="w-3 h-3" /></button>
                )}
              </li>
            ))}
          </ul>
          {pendingActive ? (
            <input ref={pendingRef} type="text" value={pendingText} onChange={(e) => setPendingText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') confirmPending(); if (e.key === 'Escape') { setPendingActive(false); setPendingText(''); } }} onBlur={confirmPending} className="w-full mt-3 px-3 py-1.5 text-sm bg-white/50 border border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]" placeholder="New item..." />
          ) : (
            <div onClick={() => setPendingActive(true)} className="mt-3 px-3 py-1.5 text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors">New item...</div>
          )}
        </div>
      </div>
    );
  }

  // Bordered variant (DosDonts) or filled variant (ProsCons)
  const wrapperClass = variant === 'bordered'
    ? `flex-1 p-4 rounded-lg border-2 ${borderColor} ${bg}`
    : `flex-1 p-4 rounded-lg ${bg}`;

  return (
    <div className={wrapperClass}>
      <div className="flex items-center gap-2 mb-3">
        {Icon && (
          <div className={`w-6 h-6 ${variant === 'filled' ? 'w-8 h-8 rounded-full' : 'rounded'} ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
        )}
        <EditableText value={displayLabel} onChange={updateLabel} tag="span" className={`font-semibold ${labelColor || 'text-gray-700'}`} placeholder={label} multiline={false} />
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="relative flex items-start gap-2 group/li">
            {bulletColor && <span className={`${bulletColor} mt-0.5`}>&#8226;</span>}
            <div className="flex-1 cursor-text">
              <EditableText value={item} onChange={(v) => update(idx, v)} tag="p" className="text-sm" style={{ color: 'var(--block-text-color, #4B5563)' }} placeholder="New item..." multiline={false} />
            </div>
            {deleteConfirmIdx === idx ? (
              <div className="absolute right-0 top-0 flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 whitespace-nowrap">
                <span className="text-xs text-red-600 font-medium">Delete?</span>
                <button onClick={() => { remove(idx); setDeleteConfirmIdx(null); }} className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors">Yes</button>
                <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors">No</button>
              </div>
            ) : (
              <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-400 hover:text-red-500 mt-0.5"><Trash2 className="w-3 h-3" /></button>
            )}
          </li>
        ))}
      </ul>
      {pendingActive ? (
        <input ref={pendingRef} type="text" value={pendingText} onChange={(e) => setPendingText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') confirmPending(); if (e.key === 'Escape') { setPendingActive(false); setPendingText(''); } }} onBlur={confirmPending} className="w-full mt-2 px-3 py-1.5 text-sm bg-white/50 border border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]" placeholder="New item..." />
      ) : (
        <div onClick={() => setPendingActive(true)} className="mt-2 px-3 py-1.5 text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors">New item...</div>
      )}
    </div>
  );
}

export function EditableItemsBlock({ content, onDataChange, field, fieldA, fieldB, fieldC, labelA, labelB, labelC, title, placeholderLabel }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; field: string; fieldA: string; fieldB: string; fieldC?: string; labelA: string; labelB: string; labelC?: string; title: string; placeholderLabel: string }) {
  const items = (content[field] as Array<Record<string, unknown>>) || [];

  const updateItem = useCallback((idx: number, key: string, value: string) => {
    const n = [...items]; n[idx] = { ...n[idx], [key]: value };
    onDataChange({ ...content, [field]: n });
  }, [items, content, onDataChange, field]);

  const addItem = () => {
    const newItem: Record<string, unknown> = { id: `item-${Date.now()}`, [fieldA]: '', [fieldB]: '' };
    if (fieldC) newItem[fieldC] = '';
    onDataChange({ ...content, [field]: [...items, newItem] });
  };

  const removeItem = (idx: number) => { onDataChange({ ...content, [field]: items.filter((_, i) => i !== idx) }); };

  return (
    <div className="w-full p-4 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-500 mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={String(item.id || idx)} className="p-4 border-2 border-gray-200 rounded-lg group/gi hover:border-gray-300">
            <div className="flex items-start gap-2">
              <div className="flex-1 cursor-text space-y-1">
                <EditableText value={String(item[fieldA] || '')} onChange={(v) => updateItem(idx, fieldA, v)} tag="p" className="font-medium text-gray-900" placeholder={labelA} multiline={false} />
                <EditableText value={String(item[fieldB] || '')} onChange={(v) => updateItem(idx, fieldB, v)} tag="p" className="text-sm" style={{ color: 'var(--block-text-color, #4B5563)' }} placeholder={labelB} />
                {fieldC && labelC && <EditableText value={String(item[fieldC] || '')} onChange={(v) => updateItem(idx, fieldC, v)} tag="p" className="text-xs text-gray-500" placeholder={labelC} multiline={false} />}
              </div>
              {items.length > 1 && <button onClick={() => removeItem(idx)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
            </div>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="flex items-center gap-1 text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium mt-3"><Plus className="w-4 h-4" /> {placeholderLabel}</button>
    </div>
  );
}
