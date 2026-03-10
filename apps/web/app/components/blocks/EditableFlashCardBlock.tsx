'use client';

import { useState, useCallback } from 'react';
import { X, Trash2, Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableFlashCardBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<Record<string, unknown>>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const [showImagePicker, setShowImagePicker] = useState<{ idx: number; side: 'front' | 'back' } | null>(null);

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const n = [...items]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, items: n });
  }, [items, content, onDataChange]);

  const addItem = () => { onDataChange({ ...content, items: [...items, { id: `fc-${Date.now()}`, question: '', answer: '' }] }); };
  const removeItem = (idx: number) => { onDataChange({ ...content, items: items.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="max-w-xl mx-auto space-y-4">
        {items.map((item, idx) => (
          <div key={String(item.id || idx)} className="rounded-xl shadow-lg overflow-hidden group/fc">
            {/* Front (question) — gradient matching read-only */}
            <div className="p-6 cursor-text bg-gradient-to-br from-primary to-primary-dark">
              <span className="text-sm text-white/70 mb-2 block">Question</span>
              {/* Front image */}
              {item.frontImage ? (
                <div className="relative h-24 w-full rounded-lg overflow-hidden mb-3 group/img cursor-pointer" onClick={() => setShowImagePicker({ idx, side: 'front' })}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={String(item.frontImage)} alt="Front" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg">
                    <span className="px-2 py-1 bg-white/90 text-xs text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Change image
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); updateItem(idx, 'frontImage', ''); }}
                    className="absolute top-1 right-1 p-0.5 bg-white/80 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors pointer-events-auto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div
                  className="h-12 w-full border-2 border-dashed border-white/30 rounded-lg mb-3 flex items-center justify-center gap-1.5 cursor-pointer hover:border-white/50 text-white/50 hover:text-white/70 transition-colors"
                  onClick={() => setShowImagePicker({ idx, side: 'front' })}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="text-xs">Add image</span>
                </div>
              )}
              <EditableText value={String(item.question || '')} onChange={(v) => updateItem(idx, 'question', v)} tag="p" className="text-xl font-medium text-white" style={{ color: '#ffffff', fontSize: '20px', lineHeight: '1.5' }} placeholder="Question..." />
            </div>
            {/* Back (answer) — white with primary border matching read-only */}
            <div className="p-6 bg-white border-t-2 border-primary cursor-text">
              <span className="text-sm text-gray-500 mb-2 block">Answer</span>
              {/* Back image */}
              {item.backImage ? (
                <div className="relative h-24 w-full rounded-lg overflow-hidden mb-3 group/img cursor-pointer" onClick={() => setShowImagePicker({ idx, side: 'back' })}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={String(item.backImage)} alt="Back" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg">
                    <span className="px-2 py-1 bg-white/90 text-xs text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />
                      Change image
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); updateItem(idx, 'backImage', ''); }}
                    className="absolute top-1 right-1 p-0.5 bg-white/80 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors pointer-events-auto"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div
                  className="h-12 w-full border-2 border-dashed border-gray-200 rounded-lg mb-3 flex items-center justify-center gap-1.5 cursor-pointer hover:border-[#9F80DA] hover:text-[#9F80DA] text-gray-400 transition-colors"
                  onClick={() => setShowImagePicker({ idx, side: 'back' })}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span className="text-xs">Add image</span>
                </div>
              )}
              <EditableText value={String(item.answer || '')} onChange={(v) => updateItem(idx, 'answer', v)} tag="p" className="text-xl font-medium" style={{ color: 'var(--block-text-color, #1F2937)', fontSize: '20px', lineHeight: '1.5' }} placeholder="Answer..." />
            </div>
            {/* Delete */}
            {items.length > 1 && (
              <div className="flex justify-end px-3 py-1.5 bg-white border-t border-gray-100">
                {deleteConfirmIdx === idx ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-red-600">Delete?</span>
                    <button onClick={() => removeItem(idx)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                    <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        ))}
        {/* Placeholder card */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#9F80DA] transition-colors" onClick={addItem}>
          <p className="text-sm text-gray-400 text-center">New card...</p>
        </div>
      </div>
      {showImagePicker && (
        <ImagePickerModal
          currentUrl={String(items[showImagePicker.idx]?.[showImagePicker.side === 'front' ? 'frontImage' : 'backImage'] || '')}
          onSelect={(url) => {
            updateItem(showImagePicker.idx, showImagePicker.side === 'front' ? 'frontImage' : 'backImage', url);
            setShowImagePicker(null);
          }}
          onClose={() => setShowImagePicker(null)}
        />
      )}
    </div>
  );
}
