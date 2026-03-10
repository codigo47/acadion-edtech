'use client';

import { useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableSortingBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const categories = (content.categories as Array<{ id: string; title: string }>) || [];
  const cards = (content.cards as Array<{ id: string; title: string; content?: string; correctCategory: string }>) || [];
  const [deleteCatConfirmId, setDeleteCatConfirmId] = useState<string | null>(null);
  const [deleteCardConfirmId, setDeleteCardConfirmId] = useState<string | null>(null);

  const updateCategory = useCallback((id: string, value: string) => {
    onDataChange({ ...content, categories: categories.map(c => c.id === id ? { ...c, title: value } : c) });
  }, [categories, content, onDataChange]);

  const updateCard = useCallback((id: string, field: string, value: string) => {
    onDataChange({ ...content, cards: cards.map(c => c.id === id ? { ...c, [field]: value } : c) });
  }, [cards, content, onDataChange]);

  const addCategory = () => { onDataChange({ ...content, categories: [...categories, { id: `cat-${Date.now()}`, title: '' }] }); };
  const addCard = (categoryId: string) => { onDataChange({ ...content, cards: [...cards, { id: `card-${Date.now()}`, title: '', correctCategory: categoryId }] }); };
  const removeCategory = (id: string) => { onDataChange({ ...content, categories: categories.filter(c => c.id !== id), cards: cards.filter(c => c.correctCategory !== id) }); setDeleteCatConfirmId(null); };
  const removeCard = (id: string) => { onDataChange({ ...content, cards: cards.filter(c => c.id !== id) }); setDeleteCardConfirmId(null); };

  return (
    <div className="w-full p-4 rounded-lg space-y-4">
      {categories.map(cat => (
        <div key={cat.id} className="border-2 border-gray-200 rounded-lg p-4 group/cat hover:border-gray-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 cursor-text">
              <EditableText value={cat.title} onChange={(v) => updateCategory(cat.id, v)} tag="h3" className="font-semibold text-gray-900" placeholder="Category name..." multiline={false} />
            </div>
            {categories.length > 1 && (
              deleteCatConfirmId === cat.id ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-red-600">Delete?</span>
                  <button onClick={() => removeCategory(cat.id)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                  <button onClick={() => setDeleteCatConfirmId(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteCatConfirmId(cat.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              )
            )}
          </div>
          <div className="space-y-2 pl-4">
            {cards.filter(c => c.correctCategory === cat.id).map(card => (
              <div key={card.id} className="flex items-start gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex-1 cursor-text">
                  <EditableText value={card.title} onChange={(v) => updateCard(card.id, 'title', v)} tag="p" className="text-sm text-gray-900" placeholder="Card title..." multiline={false} />
                </div>
                {deleteCardConfirmId === card.id ? (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => removeCard(card.id)} className="px-1.5 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                    <button onClick={() => setDeleteCardConfirmId(null)} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteCardConfirmId(card.id)} className="text-gray-300 hover:text-red-500 pt-0.5"><Trash2 className="w-3 h-3" /></button>
                )}
              </div>
            ))}
            <div onClick={() => addCard(cat.id)} className="p-2 border border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-xs text-gray-400 hover:text-[#9F80DA]">New card...</div>
          </div>
        </div>
      ))}
      <div onClick={addCategory} className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New category...</div>
    </div>
  );
}
