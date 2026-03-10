'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableCarouselBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const images = (content.images as Array<{ src: string; alt?: string; caption?: string }>) || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  const updateImage = useCallback((idx: number, field: string, value: string) => {
    const n = [...images]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, images: n });
  }, [images, content, onDataChange]);

  const addImage = () => {
    onDataChange({ ...content, images: [...images, { src: '', alt: '', caption: '' }] });
    setCurrentSlide(images.length);
  };
  const removeImage = (idx: number) => {
    onDataChange({ ...content, images: images.filter((_, i) => i !== idx) });
    setDeleteConfirmIdx(null);
    if (currentSlide >= images.length - 1) setCurrentSlide(Math.max(0, images.length - 2));
  };

  const current = images[currentSlide];

  const goToPrevious = () => setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goToNext = () => setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full p-4 rounded-lg">
      {/* Main slide preview — matching read-only h-80 with arrows */}
      {current && (
        <div className="relative">
          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-100">
            <div className="w-full h-full group/img cursor-pointer relative" onClick={() => setShowPicker(true)}>
              {current.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt={current.alt || ''} className="w-full h-full object-cover transition-opacity duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon className="w-8 h-8" /></div>
              )}
              <div className="absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg z-10">
                <span className="px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  Change image
                </span>
              </div>
            </div>
            {/* Caption overlay matching read-only */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 cursor-text transition-colors ${current.caption ? 'bg-black/50' : 'bg-transparent'}`}>
              <EditableText value={current.caption || ''} onChange={(v) => updateImage(currentSlide, 'caption', v)} tag="p" className="text-center text-white" style={{ color: '#ffffff' }} placeholder="Caption..." multiline={false} />
            </div>
            {/* Delete current slide */}
            {images.length > 1 && (
              <div className="absolute top-2 right-2 z-20">
                {deleteConfirmIdx === currentSlide ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button onClick={() => removeImage(currentSlide)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                    <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmIdx(currentSlide)} className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm"><Trash2 className="w-3 h-3" /></button>
                )}
              </div>
            )}
          </div>
          {/* Prev/Next arrows matching read-only */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors bg-white/80 hover:bg-white text-gray-800 z-20"
                aria-label="Previous image"
              >
                <ChevronDown className="w-6 h-6 rotate-90" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors bg-white/80 hover:bg-white text-gray-800 z-20"
                aria-label="Next image"
              >
                <ChevronDown className="w-6 h-6 -rotate-90" />
              </button>
            </>
          )}
          {/* Navigation dots matching read-only */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {images.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full transition-colors ${idx === currentSlide ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'}`} />
            ))}
            <button onClick={addImage} className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#9F80DA] hover:text-[#9F80DA] transition-colors">
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      {showPicker && current && (
        <ImagePickerModal currentUrl={current.src || ''} onSelect={(url) => { updateImage(currentSlide, 'src', url); setShowPicker(false); }} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}
