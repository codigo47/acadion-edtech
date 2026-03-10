'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableGalleryBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const images = (content.images as Array<{ src: string; alt?: string }>) || [];
  const [showPicker, setShowPicker] = useState<number | null>(null);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  const updateImage = useCallback((idx: number, field: string, value: string) => {
    const n = [...images]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, images: n });
  }, [images, content, onDataChange]);

  const addImage = () => onDataChange({ ...content, images: [...images, { src: '', alt: '' }] });
  const removeImage = (idx: number) => { onDataChange({ ...content, images: images.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, idx) => (
          <div key={idx} className="relative group/gimg">
            <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer" onClick={() => setShowPicker(idx)}>
              {img.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon className="w-8 h-8" /></div>
              )}
            </div>
            {images.length > 1 && (
              deleteConfirmIdx === idx ? (
                <div className="absolute top-1 right-1 flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button onClick={() => removeImage(idx)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                  <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirmIdx(idx)} className="absolute top-1 right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm"><Trash2 className="w-3 h-3" /></button>
              )
            )}
          </div>
        ))}
        <button onClick={addImage} className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-[#9F80DA] hover:text-[#9F80DA] transition-colors">
          <Plus className="w-6 h-6" />
        </button>
      </div>
      {showPicker !== null && (
        <ImagePickerModal currentUrl={images[showPicker]?.src || ''} onSelect={(url) => { updateImage(showPicker, 'src', url); setShowPicker(null); }} onClose={() => setShowPicker(null)} />
      )}
    </div>
  );
}
