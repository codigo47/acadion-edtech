'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableComparisonBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ title: string; content: string; image?: string }>) || [];
  const blockStyle = (content.blockStyle as 'A' | 'B' | 'C') || 'A';
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const [showCompImagePicker, setShowCompImagePicker] = useState<number | null>(null);

  // Style classes matching read-only ComparisonBlock A/B/C
  const compStyles = {
    A: { container: 'bg-white border border-gray-200', header: 'bg-primary text-white', content: 'bg-white' },
    B: { container: 'bg-gradient-to-b from-blue-50 to-white border border-blue-200', header: 'bg-blue-600 text-white', content: 'bg-transparent' },
    C: { container: 'bg-gray-50 border-2 border-gray-300', header: 'bg-gray-800 text-white', content: 'bg-white' },
  }[blockStyle];

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const newItems = [...items]; newItems[idx] = { ...newItems[idx], [field]: value };
    onDataChange({ ...content, items: newItems });
  }, [items, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, items: [...items, { title: '', content: '' }] });
  const removeItem = (idx: number) => { onDataChange({ ...content, items: items.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  const getGridCols = () => {
    const count = items.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className={`grid ${getGridCols()} gap-4`}>
        {items.map((item, idx) => (
          <div key={idx} className={`${compStyles.container} rounded-lg overflow-hidden shadow-sm group/ci`}>
            {/* Header matching read-only blockStyle */}
            <div className={`${compStyles.header} p-4 flex items-center gap-2`}>
              <div className="flex-1 cursor-text">
                <EditableText value={item.title} onChange={(v) => updateItem(idx, 'title', v)} tag="h3" className="text-lg font-semibold text-center text-white" style={{ color: '#ffffff' }} placeholder="Title..." multiline={false} />
              </div>
              {items.length > 1 && (
                deleteConfirmIdx === idx ? (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => removeItem(idx)} className="px-2 py-0.5 text-xs text-white bg-red-700 rounded">Yes</button>
                    <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-white bg-white/30 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmIdx(idx)} className="text-white/60 hover:text-white flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                )
              )}
            </div>
            {/* Image area */}
            {item.image ? (
              <div className="relative group/img h-28 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => setShowCompImagePicker(idx)} className="px-2 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded">Change</button>
                  <button onClick={() => updateItem(idx, 'image', '')} className="px-2 py-1 text-xs text-white bg-red-500/60 hover:bg-red-500/80 rounded">Remove</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCompImagePicker(idx)}
                className="w-full py-2 flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-[#9F80DA] border-b border-dashed border-gray-200 hover:border-[#9F80DA] transition-colors"
              >
                <ImageIcon className="w-3 h-3" />
                Add image
              </button>
            )}
            {/* Content */}
            <div className={`${compStyles.content} p-4 cursor-text`}>
              <EditableText value={item.content} onChange={(v) => updateItem(idx, 'content', v)} tag="p" className="text-center" style={{ color: 'var(--block-text-color, inherit)' }} placeholder="Content..." />
            </div>
          </div>
        ))}
        {/* Placeholder card */}
        <div onClick={addItem} className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors cursor-pointer flex items-center justify-center min-h-[120px]">
          <div className="text-center text-gray-400">
            <Plus className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">New item</span>
          </div>
        </div>
      </div>

      {showCompImagePicker !== null && (
        <ImagePickerModal
          currentUrl={items[showCompImagePicker]?.image}
          onSelect={(url) => {
            updateItem(showCompImagePicker, 'image', url);
            setShowCompImagePicker(null);
          }}
          onClose={() => setShowCompImagePicker(null)}
        />
      )}
    </div>
  );
}
