'use client';

import { useState, useCallback } from 'react';
import { X, Check, Trash2, Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableScenarioBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const answers = (content.answers as Array<{ id: string; text: string; order: number; isCorrect: boolean }>) || [];
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'background' | 'avatar'>('background');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showAvatarGallery, setShowAvatarGallery] = useState(false);
  const blurAmount = (content.blur as number) || 0;

  const AVATAR_IMAGES = Array.from({ length: 12 }, (_, i) => `/story-telling-block/torso-alto-${i + 1}.png`);

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

  const removeAnswer = (id: string) => { onDataChange({ ...content, answers: answers.filter(a => a.id !== id) }); setDeleteConfirmId(null); };

  return (
    <div className="w-full p-4 rounded-lg space-y-4">
      {/* Background image with avatar and question overlay */}
      <div className="relative w-full min-h-[280px] bg-gray-100 rounded-lg overflow-hidden">
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

        {/* Background controls - top right */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
          <button onClick={() => { setPickerTarget('background'); setShowPicker(true); }} className="px-2 py-1 text-xs text-white bg-black/40 hover:bg-black/60 rounded backdrop-blur-sm">
            <ImageIcon className="w-3 h-3 inline mr-1" />BG
          </button>
          {String(content.image || '') !== '' && (
            <div className="flex items-center gap-1 px-2 py-1 bg-black/40 rounded backdrop-blur-sm">
              <span className="text-xs text-white/70">Blur</span>
              <input type="range" min="0" max="10" value={blurAmount} onChange={(e) => onDataChange({ ...content, blur: parseInt(e.target.value) })} className="w-16 h-1 accent-white" />
            </div>
          )}
        </div>

        {/* Avatar character */}
        <div className="absolute bottom-0 left-4 z-10">
          <div className="relative group/avatar cursor-pointer" onClick={() => setShowAvatarGallery(true)}>
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

        {/* Speech bubble question */}
        <div className="absolute bottom-4 left-32 right-4 z-10">
          <div className="bg-white rounded-lg p-3 shadow-lg relative">
            <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white transform rotate-45" />
            <div className="cursor-text relative z-10">
              <EditableText value={String(content.question || '')} onChange={(v) => onDataChange({ ...content, question: v })} tag="p" className="text-sm font-medium text-gray-900" placeholder="Scenario question..." />
            </div>
          </div>
        </div>
      </div>

      {/* Answers */}
      <div className="space-y-2">
        {answers.map(ans => (
          <div key={ans.id} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300">
            <button onClick={() => updateAnswer(ans.id, 'isCorrect', !ans.isCorrect)} className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${ans.isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
              {ans.isCorrect && <Check className="w-3 h-3" />}
            </button>
            <div className="flex-1 cursor-text">
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
        <div onClick={addAnswer} className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New answer...</div>
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
