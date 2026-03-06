'use client';

import { useState, useCallback } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableReviewsBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const reviews = (content.reviews as Array<{ name: string; rating: number; review?: string; comment?: string; avatar?: string }>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const updateReview = useCallback((idx: number, field: string, value: unknown) => {
    const n = [...reviews]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, reviews: n });
  }, [reviews, content, onDataChange]);

  const addReview = () => { onDataChange({ ...content, reviews: [...reviews, { name: '', rating: 5, review: '', avatar: '' }] }); };
  const removeReview = (idx: number) => { onDataChange({ ...content, reviews: reviews.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="p-4 rounded-lg border border-gray-200 bg-white group/rev hover:border-gray-300">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden cursor-pointer flex-shrink-0" onClick={() => setShowPicker(idx)}>
                {review.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={review.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-gray-600">{(review.name || 'R').charAt(0).toUpperCase()}</div>
                )}
              </div>
              <div className="flex-1 cursor-text">
                <div className="flex items-center justify-between mb-2">
                  <EditableText value={review.name} onChange={(v) => updateReview(idx, 'name', v)} tag="p" className="font-semibold text-gray-900" placeholder="Reviewer name..." multiline={false} />
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => updateReview(idx, 'rating', n)}>
                        <Star className={`w-4 h-4 ${n <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <EditableText value={review.review || review.comment || ''} onChange={(v) => updateReview(idx, 'review', v)} tag="p" className="text-sm" style={{ color: 'var(--block-text-color, inherit)', lineHeight: '1.5' }} placeholder="Review text..." />
              </div>
              {reviews.length > 1 && (
                deleteConfirmIdx === idx ? (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => removeReview(idx)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                    <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-300 hover:text-red-500 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Placeholder review */}
      <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors" onClick={addReview}>
        <p className="text-sm text-gray-400 text-center">New review...</p>
      </div>
      {showPicker !== null && (
        <ImagePickerModal currentUrl={reviews[showPicker]?.avatar || ''} onSelect={(url) => { updateReview(showPicker, 'avatar', url); setShowPicker(null); }} onClose={() => setShowPicker(null)} />
      )}
    </div>
  );
}
