'use client';

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableBannerBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const [showPicker, setShowPicker] = useState(false);
  const overlayOpacity = (content.overlayOpacity as number) ?? 40;
  const height = (content.height as string) || 'medium';
  const overlayColor = (content.overlayColor as string) || '#000000';

  const heightClasses: Record<string, string> = {
    small: 'min-h-[200px]',
    medium: 'min-h-[300px]',
    large: 'min-h-[400px]',
  };

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      {/* Live preview */}
      <div className={`relative ${heightClasses[height] || heightClasses.medium} rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center`}>
        {String(content.image || '') && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={String(content.image)} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlayOpacity / 100 }} />
        {/* Background change button */}
        <button onClick={() => setShowPicker(true)} className="absolute top-2 right-2 z-20 px-2 py-1 text-xs text-white bg-black/40 hover:bg-black/60 rounded backdrop-blur-sm">
          <ImageIcon className="w-3 h-3 inline mr-1" />Image
        </button>
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <div className="cursor-text">
            <EditableText value={String(content.title || '')} onChange={(v) => onDataChange({ ...content, title: v })} tag="h1" className="text-3xl font-bold text-white drop-shadow-lg" style={{ color: '#ffffff' }} placeholder="Banner Title" multiline={false} />
          </div>
          <div className="cursor-text mt-2">
            <EditableText value={String(content.subtitle || '')} onChange={(v) => onDataChange({ ...content, subtitle: v })} tag="p" className="text-lg text-white/90 drop-shadow-md" style={{ color: 'rgba(255,255,255,0.9)' }} placeholder="Subtitle text..." />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Height:</span>
          {(['small', 'medium', 'large'] as const).map((h) => (
            <button key={h} onClick={() => onDataChange({ ...content, height: h })} className={`px-2 py-0.5 text-xs rounded transition-colors ${height === h ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {h}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Overlay:</span>
          <input type="range" min="0" max="80" value={overlayOpacity} onChange={(e) => onDataChange({ ...content, overlayOpacity: parseInt(e.target.value) })} className="w-20 h-1 accent-[#9F80DA]" />
          <span className="text-xs text-gray-400">{overlayOpacity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">Color:</span>
          {[{ label: 'Black', value: '#000000' }, { label: 'Purple', value: '#4c1d95' }, { label: 'Blue', value: '#1e3a5f' }, { label: 'Green', value: '#14532d' }].map(c => (
            <button key={c.value} onClick={() => onDataChange({ ...content, overlayColor: c.value })} className={`w-5 h-5 rounded-full border-2 transition-all ${overlayColor === c.value ? 'border-gray-800 scale-110' : 'border-gray-200'}`} style={{ backgroundColor: c.value }} title={c.label} />
          ))}
        </div>
      </div>

      {showPicker && (
        <ImagePickerModal currentUrl={String(content.image || '')} onSelect={(url) => { onDataChange({ ...content, image: url }); setShowPicker(false); }} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}
