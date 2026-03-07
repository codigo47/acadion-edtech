'use client';

import React, { useState, useCallback, useRef } from 'react';
import { X, Check, Trash2, Image as ImageIcon, GripVertical } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

const BUBBLE_FONT_SIZES: Record<string, string> = {
  small: '0.75rem',
  normal: '0.875rem',
  large: '1rem',
  xlarge: '1.125rem',
};

function BubbleArrow({ direction, alignment, color }: { direction: string; alignment: string; color: string }) {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: color,
    transform: 'rotate(45deg)',
  };

  if (direction === 'top') {
    const align: React.CSSProperties =
      alignment === 'center' ? { left: '50%', marginLeft: -8 } :
      alignment === 'right' ? { right: 16 } : { left: 16 };
    return <div style={{ ...base, top: -8, ...align }} />;
  }
  if (direction === 'left') {
    return <div style={{ ...base, left: -8, top: '50%', marginTop: -8 }} />;
  }
  if (direction === 'right') {
    return <div style={{ ...base, right: -8, top: '50%', marginTop: -8 }} />;
  }
  // Default: bottom
  const align: React.CSSProperties =
    alignment === 'center' ? { left: '50%', marginLeft: -8 } :
    alignment === 'right' ? { right: 16 } : { left: 16 };
  return <div style={{ ...base, bottom: -8, ...align }} />;
}

function isLightColor(hex: string): boolean {
  const h = hex.replace('#', '');
  if (h.length !== 6) return true;
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export function EditableScenarioBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const answers = (content.answers as Array<{ id: string; text: string; order: number; isCorrect: boolean }>) || [];
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'background' | 'avatar'>('background');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showAvatarGallery, setShowAvatarGallery] = useState(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number; containerW: number; containerH: number } | null>(null);
  const currentDragPosRef = useRef<{ x: number; y: number } | null>(null);
  const contentRef = useRef(content);
  contentRef.current = content;

  const blurAmount = (content.blur as number) || 0;
  const bubbleX = (content.bubbleX as number) ?? 65;
  const bubbleY = (content.bubbleY as number) ?? 75;
  const arrowDirection = (content.arrowDirection as string) || 'bottom';
  const arrowAlignment = (content.arrowAlignment as string) || 'left';
  const bubbleBg = (content.bubbleBg as string) || '#FFFFFF';
  const bubbleFontSize = (content.bubbleFontSize as string) || 'normal';
  const bubbleTextAlign = (content.bubbleTextAlign as string) || 'left';

  const displayX = dragPos?.x ?? bubbleX;
  const displayY = dragPos?.y ?? bubbleY;
  const bubbleTextColor = isLightColor(bubbleBg) ? '#1f2937' : '#f9fafb';

  const AVATAR_IMAGES = Array.from({ length: 12 }, (_, i) => `/story-telling-block/torso-alto-${i + 1}.png`);

  const handleBubbleMouseDown = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute('contenteditable') === 'true' || target.closest('[contenteditable="true"]')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: (contentRef.current.bubbleX as number) ?? 65,
      startY: (contentRef.current.bubbleY as number) ?? 75,
      containerW: rect.width,
      containerH: rect.height,
    };

    const handleMouseMove = (ev: MouseEvent) => {
      const start = dragStartRef.current;
      if (!start) return;
      const dx = ev.clientX - start.mouseX;
      const dy = ev.clientY - start.mouseY;
      const newX = Math.max(10, Math.min(90, start.startX + (dx / start.containerW) * 100));
      const newY = Math.max(10, Math.min(90, start.startY + (dy / start.containerH) * 100));
      const pos = { x: Math.round(newX), y: Math.round(newY) };
      currentDragPosRef.current = pos;
      setDragPos(pos);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      const finalPos = currentDragPosRef.current;
      if (finalPos) {
        onDataChange({ ...contentRef.current, bubbleX: finalPos.x, bubbleY: finalPos.y });
      }
      dragStartRef.current = null;
      currentDragPosRef.current = null;
      setDragPos(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onDataChange]);

  const updateAnswer = useCallback((id: string, field: string, value: unknown) => {
    let n = answers.map(a => a.id === id ? { ...a, [field]: value } : a);
    if (field === 'isCorrect' && value === true) {
      n = n.map(a => a.id === id ? a : { ...a, isCorrect: false });
    }
    onDataChange({ ...content, answers: n });
  }, [answers, content, onDataChange]);

  const addAnswer = () => {
    const maxOrder = answers.length > 0 ? Math.max(...answers.map(a => a.order)) : 0;
    onDataChange({ ...content, answers: [...answers, { id: `sa-${Date.now()}`, text: '', order: maxOrder + 1, isCorrect: false }] });
  };

  const removeAnswer = (id: string) => {
    onDataChange({ ...content, answers: answers.filter(a => a.id !== id) });
    setDeleteConfirmId(null);
  };

  return (
    <div className="w-full p-4 rounded-lg space-y-4">
      {/* Background image with avatar and bubble */}
      <div ref={containerRef} className="relative w-full min-h-[280px] bg-gray-100 rounded-lg overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {content.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={String(content.image)} alt="Background" className="w-full h-full object-cover" style={{ filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300" />
          )}
        </div>

        {/* BG overlay — click uncovered area to change image */}
        <div
          className="absolute inset-0 z-[5] cursor-pointer group/bg"
          onClick={() => { setPickerTarget('background'); setShowPicker(true); }}
        >
          <div className="absolute inset-0 bg-transparent group-hover/bg:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/bg:opacity-100 transition-opacity pointer-events-none">
            <span className="px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" />
              Change BG
            </span>
          </div>
        </div>

        {/* Avatar character */}
        <div className="absolute bottom-0 left-4 z-10">
          <div className="relative group/avatar cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowAvatarGallery(true); }}>
            {content.avatar ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={String(content.avatar)} alt="Character" className="h-40 w-auto object-contain drop-shadow-lg" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Change</span>
                </div>
              </>
            ) : (
              <div className="h-40 w-24 border-2 border-dashed border-white/40 rounded-lg flex flex-col items-center justify-center text-white/60 hover:border-white/70 hover:text-white/80 transition-colors">
                <ImageIcon className="w-6 h-6 mb-1" />
                <span className="text-xs">Avatar</span>
              </div>
            )}
          </div>
        </div>

        {/* Draggable speech bubble */}
        <div
          className="absolute z-10"
          style={{
            left: `${displayX}%`,
            top: `${displayY}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onMouseDown={handleBubbleMouseDown}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="rounded-lg p-3 shadow-lg relative max-w-[240px] min-w-[160px]"
            style={{ backgroundColor: bubbleBg, cursor: dragPos ? 'grabbing' : 'grab' }}
          >
            <BubbleArrow direction={arrowDirection} alignment={arrowAlignment} color={bubbleBg} />

            {/* Drag indicator */}
            <div className="absolute top-1 right-1 opacity-30 pointer-events-none">
              <GripVertical className="w-3 h-3" style={{ color: bubbleTextColor }} />
            </div>

            {/* Question text */}
            <div className="cursor-text relative z-10" onMouseDown={(e) => e.stopPropagation()}>
              <EditableText
                value={String(content.question || '')}
                onChange={(v) => onDataChange({ ...content, question: v })}
                tag="p"
                className="font-medium"
                style={{
                  color: bubbleTextColor,
                  fontSize: BUBBLE_FONT_SIZES[bubbleFontSize] || '0.875rem',
                  textAlign: bubbleTextAlign as React.CSSProperties['textAlign'],
                }}
                placeholder="Scenario question..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Answers — always left-aligned */}
      <div className="space-y-2">
        {answers.map(ans => (
          <div key={ans.id} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300">
            <button onClick={() => updateAnswer(ans.id, 'isCorrect', !ans.isCorrect)} className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${ans.isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
              {ans.isCorrect && <Check className="w-3 h-3" />}
            </button>
            <div className="flex-1 cursor-text text-left">
              <EditableText value={ans.text} onChange={(v) => updateAnswer(ans.id, 'text', v)} tag="span" className="text-sm text-gray-900" placeholder="Answer text..." multiline={false} />
            </div>
            {answers.length > 1 && (
              deleteConfirmId === ans.id ? (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => removeAnswer(ans.id)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                  <button onClick={() => setDeleteConfirmId(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirmId(ans.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              )
            )}
          </div>
        ))}
        <div key="add-answer" onClick={addAnswer} className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New answer...</div>
      </div>

      {/* Feedback */}
      <div className="space-y-2 border-t border-gray-100 pt-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Feedback</p>
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
          <div className="flex-1 cursor-text">
            <EditableText value={String(content.feedbackCorrect || '')} onChange={(v) => onDataChange({ ...content, feedbackCorrect: v })} tag="p" className="text-sm text-green-700" placeholder="Correct answer feedback..." />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
          <div className="flex-1 cursor-text">
            <EditableText value={String(content.feedbackIncorrect || '')} onChange={(v) => onDataChange({ ...content, feedbackIncorrect: v })} tag="p" className="text-sm text-red-700" placeholder="Wrong answer feedback..." />
          </div>
        </div>
      </div>

      {/* Avatar gallery modal */}
      {showAvatarGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAvatarGallery(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Select Character</h3>
              <button onClick={() => setShowAvatarGallery(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 grid grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto">
              {AVATAR_IMAGES.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => { onDataChange({ ...content, avatar: src }); setShowAvatarGallery(false); }}
                  className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all hover:shadow-md bg-gray-50 ${content.avatar === src ? 'border-[#9F80DA] ring-2 ring-[#9F80DA]/20' : 'border-gray-200 hover:border-[#9F80DA]'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Character ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-gray-200 flex justify-between">
              <button onClick={() => { setShowAvatarGallery(false); setPickerTarget('avatar'); setShowPicker(true); }} className="text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium">Use custom image...</button>
              {String(content.avatar || '') !== '' && (
                <button onClick={() => { onDataChange({ ...content, avatar: '' }); setShowAvatarGallery(false); }} className="text-sm text-red-400 hover:text-red-500">Remove avatar</button>
              )}
            </div>
          </div>
        </div>
      )}

      {showPicker && (
        <ImagePickerModal
          currentUrl={String(pickerTarget === 'avatar' ? (content.avatar || '') : (content.image || ''))}
          onSelect={(url) => {
            onDataChange({ ...content, [pickerTarget === 'avatar' ? 'avatar' : 'image']: url });
            setShowPicker(false);
          }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
