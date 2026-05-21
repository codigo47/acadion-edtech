'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableMultipleResponseBlock({
  content,
  onDataChange,
}: {
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const items = (content.items as Array<{ id: string; text: string; isCorrect: boolean }>) || [];
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [pendingItem, setPendingItem] = useState(false);
  const [pendingText, setPendingText] = useState('');
  const pendingInputRef = useRef<HTMLInputElement>(null);
  const pendingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pendingItem && pendingInputRef.current) {
      pendingInputRef.current.focus();
    }
  }, [pendingItem]);

  const updateQuestion = useCallback((value: string) => {
    onDataChange({ ...content, question: value });
  }, [content, onDataChange]);

  const updateItemText = useCallback((id: string, value: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, text: value } : item,
    );
    onDataChange({ ...content, items: newItems });
  }, [items, content, onDataChange]);

  const toggleCorrect = useCallback((id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, isCorrect: !item.isCorrect } : item,
    );
    onDataChange({ ...content, items: newItems });
  }, [items, content, onDataChange]);

  const confirmPendingItem = () => {
    const text = pendingText.trim();
    if (text) {
      const newId = `mr-${Date.now()}`;
      const newItems = [...items, { id: newId, text, isCorrect: false }];
      onDataChange({ ...content, items: newItems });
    }
    setPendingItem(false);
    setPendingText('');
  };

  const handlePendingBlur = useCallback((e: React.FocusEvent) => {
    if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget as Node)) {
      confirmPendingItem();
    }
  }, [pendingText, items, content, onDataChange]);

  const removeItem = (id: string) => {
    onDataChange({ ...content, items: items.filter((item) => item.id !== id) });
    setDeleteConfirmId(null);
  };

  return (
    <div className="w-full p-4 rounded-lg">
      {/* Question */}
      <div className="mb-4 cursor-text">
        <EditableText
          value={String(content.question || '')}
          onChange={updateQuestion}
          tag="h3"
          className="text-lg font-semibold"
          placeholder="Enter question..."
          multiline={false}
        />
      </div>

      <p className="text-sm text-gray-500 mb-3">Select all that apply</p>

      {/* Options */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-4 border-2 rounded-lg transition-all group/opt border-gray-200 hover:border-gray-300 bg-white"
          >
            {/* Checkbox for isCorrect */}
            <button
              onClick={() => toggleCorrect(item.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                item.isCorrect
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-[#9F80DA]'
              }`}
              title={item.isCorrect ? 'Marked as correct' : 'Mark as correct'}
            >
              {item.isCorrect && <Check className="w-3 h-3" />}
            </button>

            {/* Editable text */}
            <div className="flex-1 min-w-0 cursor-text">
              <EditableText
                value={item.text}
                onChange={(v) => updateItemText(item.id, v)}
                tag="span"
                className="text-gray-900"
                placeholder="Option text..."
                multiline={false}
              />
            </div>

            {/* Delete button */}
            {deleteConfirmId === item.id ? (
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm text-red-600 font-medium">Delete?</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                  No
                </button>
              </div>
            ) : (
              items.length > 1 && (
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )
            )}
          </div>
        ))}

        {/* "New option" placeholder — always visible */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors">
          <div
            ref={pendingContainerRef}
            className="flex items-center gap-3 p-4"
            onBlur={pendingItem ? handlePendingBlur : undefined}
          >
            <div className="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-200" />
            <div className="flex-1">
              {pendingItem ? (
                <input
                  ref={pendingInputRef}
                  type="text"
                  value={pendingText}
                  onChange={(e) => setPendingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') confirmPendingItem();
                    if (e.key === 'Escape') {
                      setPendingItem(false);
                      setPendingText('');
                    }
                  }}
                  className="w-full text-left bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm"
                  placeholder="Option text..."
                />
              ) : (
                <button
                  onClick={() => setPendingItem(true)}
                  className="text-gray-400 hover:text-gray-500 text-left transition-colors"
                >
                  New option
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Feedback */}
      <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Feedback (shown after answering)</p>
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
          <div className="flex-1 cursor-text">
            <EditableText value={String(content.feedbackCorrect || '')} onChange={(v) => onDataChange({ ...content, feedbackCorrect: v })} tag="p" className="text-sm text-green-700" placeholder="All correct! Great job..." />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
          <div className="flex-1 cursor-text">
            <EditableText value={String(content.feedbackIncorrect || '')} onChange={(v) => onDataChange({ ...content, feedbackIncorrect: v })} tag="p" className="text-sm text-red-700" placeholder="Some answers are incorrect..." />
          </div>
        </div>
      </div>
    </div>
  );
}
