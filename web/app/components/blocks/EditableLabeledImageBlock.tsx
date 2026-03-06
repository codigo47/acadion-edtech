'use client';

import { useState, useCallback, useRef } from 'react';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableLabeledImageBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const labels = (content.labels as Array<{ id: string; text: string; description: string; x: number; y: number }>) || [];
  const [showPicker, setShowPicker] = useState(false);
  const [editingPinId, setEditingPinId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const updateLabel = useCallback((id: string, field: string, value: unknown) => {
    onDataChange({ ...content, labels: labels.map(l => l.id === id ? { ...l, [field]: value } : l) });
  }, [labels, content, onDataChange]);

  const addPin = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    const newId = `pin-${Date.now()}`;
    onDataChange({ ...content, labels: [...labels, { id: newId, text: '', description: '', x, y }] });
    setEditingPinId(newId);
  };

  const removeLabel = (id: string) => {
    onDataChange({ ...content, labels: labels.filter(l => l.id !== id) });
    setDeleteConfirmId(null);
    if (editingPinId === id) setEditingPinId(null);
  };

  const image = String(content.image || '');
  const src = !image ? '' :
    image === '/sample.jpeg' || image.includes('sample')
      ? 'https://placehold.co/800x600/e2e8f0/64748b?text=Sample+Image'
      : image;

  return (
    <div className="w-full p-4 rounded-lg space-y-2">
      <div ref={imageRef} className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden cursor-crosshair" onClick={addPin}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Labeled" className="w-full h-full object-cover pointer-events-none" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 pointer-events-none">Click to add pins</div>
        )}
        {/* Pins */}
        {labels.map(label => (
          <div
            key={label.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${label.x}%`, top: `${label.y}%` }}
            onClick={(e) => { e.stopPropagation(); setEditingPinId(editingPinId === label.id ? null : label.id); }}
          >
            <div className="w-6 h-6 rounded-full bg-[#9F80DA] border-2 border-white shadow-md flex items-center justify-center cursor-pointer">
              <span className="text-[10px] text-white font-bold">{labels.indexOf(label) + 1}</span>
            </div>
            {/* Popover */}
            {editingPinId === label.id && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50" onClick={(e) => e.stopPropagation()}>
                <div className="cursor-text mb-1">
                  <EditableText value={label.text} onChange={(v) => updateLabel(label.id, 'text', v)} tag="p" className="text-sm text-gray-900" placeholder="Label text..." />
                </div>
                <div className="cursor-text mb-2">
                  <EditableText value={label.description || ''} onChange={(v) => updateLabel(label.id, 'description', v)} tag="p" className="text-xs text-gray-500 mt-1" placeholder="Description..." />
                </div>
                {deleteConfirmId === label.id ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-red-600">Delete?</span>
                    <button onClick={() => removeLabel(label.id)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                    <button onClick={() => setDeleteConfirmId(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmId(label.id)} className="text-xs text-gray-400 hover:text-red-500">Remove pin</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setShowPicker(true)} className="text-xs text-[#9F80DA] hover:text-[#8A6BC5] font-medium flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Change image</button>
        <span className="text-xs text-gray-400">Click on image to add pins</span>
      </div>
      {showPicker && (
        <ImagePickerModal currentUrl={image} onSelect={(url) => { onDataChange({ ...content, image: url }); setShowPicker(false); }} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}
