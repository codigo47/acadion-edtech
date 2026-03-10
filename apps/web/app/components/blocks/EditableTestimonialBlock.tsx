'use client';

import { useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableTestimonialBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const testimonials = (content.testimonials as Array<Record<string, unknown>>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const n = [...testimonials]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, testimonials: n });
  }, [testimonials, content, onDataChange]);

  const addItem = () => { onDataChange({ ...content, testimonials: [...testimonials, { id: `test-${Date.now()}`, content: '', name: '', role: '', avatar: '' }] }); };
  const removeItem = (idx: number) => { onDataChange({ ...content, testimonials: testimonials.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-6 rounded-lg">
      <div className={`grid gap-6 grid-cols-1 ${testimonials.length === 2 ? 'md:grid-cols-2' : testimonials.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
        {testimonials.map((item, idx) => (
          <div key={String(item.id || idx)} className="relative backdrop-blur-sm p-6 rounded-xl shadow-lg bg-white/90">
            {/* Quote icon matching read-only */}
            <svg className="w-8 h-8 mb-3 opacity-30 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            {/* Title (optional) */}
            <div className="cursor-text mb-1">
              <EditableText value={String(item.title || '')} onChange={(v) => updateItem(idx, 'title', v)} tag="div" className="text-lg font-semibold" style={{ color: 'var(--block-text-color, inherit)' }} placeholder="Title (optional)..." multiline={false} />
            </div>
            <div className="cursor-text mb-4">
              <EditableText value={String(item.content || '')} onChange={(v) => updateItem(idx, 'content', v)} tag="p" style={{ fontSize: '14px', color: 'var(--block-text-color, #4B5563)', lineHeight: '1.5' }} placeholder="Testimonial text..." />
            </div>
            {/* Author section with border-t separator matching read-only */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden cursor-pointer flex-shrink-0" onClick={() => setShowPicker(idx)}>
                {item.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={String(item.avatar)} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">{String(item.name || '?')[0]?.toUpperCase()}</div>
                )}
              </div>
              <div className="flex-1 cursor-text">
                <EditableText value={String(item.name || '')} onChange={(v) => updateItem(idx, 'name', v)} tag="p" className="font-medium text-gray-900" placeholder="Name..." multiline={false} />
                <EditableText value={String(item.role || '')} onChange={(v) => updateItem(idx, 'role', v)} tag="p" className="text-sm text-gray-500" placeholder="Role..." multiline={false} />
              </div>
            </div>
            {/* Delete */}
            {testimonials.length > 1 && (
              <div className="absolute top-2 right-2">
                {deleteConfirmIdx === idx ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-[#9F80DA] transition-colors flex items-center justify-center min-h-[120px]" onClick={addItem}>
          <p className="text-sm text-gray-400">New testimonial...</p>
        </div>
      </div>
      {showPicker !== null && (
        <ImagePickerModal currentUrl={String(testimonials[showPicker]?.avatar || '')} onSelect={(url) => { updateItem(showPicker, 'avatar', url); setShowPicker(null); }} onClose={() => setShowPicker(null)} />
      )}
    </div>
  );
}
