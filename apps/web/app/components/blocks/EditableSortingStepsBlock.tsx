'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableSortingStepsBlock({
  content,
  onDataChange,
}: {
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const rawItems = (content.items as Array<{ id: string; title: string; content?: string; correctOrder: number }>) || [];

  const sortedFromProps = useMemo(
    () => [...rawItems].sort((a, b) => a.correctOrder - b.correctOrder),
    [rawItems],
  );

  const [localItems, setLocalItems] = useState(sortedFromProps);
  const localItemsRef = useRef(localItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const draggedIndexRef = useRef<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [pendingItem, setPendingItem] = useState(false);
  const [pendingTitle, setPendingTitle] = useState('');
  const [pendingDescription, setPendingDescription] = useState('');
  const pendingInputRef = useRef<HTMLInputElement>(null);
  const pendingContainerRef = useRef<HTMLDivElement>(null);

  // Sync from props when not dragging
  useEffect(() => {
    if (draggedIndexRef.current === null) {
      setLocalItems(sortedFromProps);
      localItemsRef.current = sortedFromProps;
    }
  }, [sortedFromProps]);

  useEffect(() => {
    localItemsRef.current = localItems;
  }, [localItems]);

  useEffect(() => {
    if (pendingItem && pendingInputRef.current) {
      pendingInputRef.current.focus();
    }
  }, [pendingItem]);

  const items = localItems;

  const updateItem = useCallback((id: string, field: string, value: string) => {
    const newItems = rawItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    onDataChange({ ...content, items: newItems });
  }, [rawItems, content, onDataChange]);

  const confirmPendingItem = () => {
    const title = pendingTitle.trim();
    if (title) {
      const newId = `sort-${Date.now()}`;
      const maxOrder = rawItems.length > 0 ? Math.max(...rawItems.map(i => i.correctOrder)) : 0;
      const newItems = [...rawItems, { id: newId, title, content: pendingDescription.trim(), correctOrder: maxOrder + 1 }];
      onDataChange({ ...content, items: newItems });
    }
    setPendingItem(false);
    setPendingTitle('');
    setPendingDescription('');
  };

  const handlePendingBlur = useCallback((e: React.FocusEvent) => {
    // Only confirm when focus leaves the entire pending container
    if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget as Node)) {
      confirmPendingItem();
    }
  }, [pendingTitle, pendingDescription, rawItems, content, onDataChange]);

  const removeItem = (id: string) => {
    const filtered = rawItems.filter((item) => item.id !== id);
    const sorted = [...filtered].sort((a, b) => a.correctOrder - b.correctOrder);
    const reindexed = sorted.map((item, idx) => ({ ...item, correctOrder: idx + 1 }));
    onDataChange({ ...content, items: reindexed });
    setDeleteConfirmId(null);
  };

  const handleDragStart = useCallback((index: number) => {
    draggedIndexRef.current = index;
    setDraggedIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const dIdx = draggedIndexRef.current;
    if (dIdx === null || dIdx === targetIndex) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const mouseY = e.clientY;

    // 10% threshold to prevent oscillation
    if (dIdx < targetIndex && mouseY < rect.top + rect.height * 0.1) return;
    if (dIdx > targetIndex && mouseY > rect.top + rect.height * 0.9) return;

    setLocalItems((prev) => {
      const newItems = [...prev];
      const [removed] = newItems.splice(dIdx, 1);
      newItems.splice(targetIndex, 0, removed);
      localItemsRef.current = newItems;
      return newItems;
    });
    draggedIndexRef.current = targetIndex;
    setDraggedIndex(targetIndex);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (draggedIndexRef.current !== null) {
      const current = localItemsRef.current;
      const reindexed = current.map((item, idx) => ({ ...item, correctOrder: idx + 1 }));
      onDataChange({ ...content, items: reindexed });
    }
    draggedIndexRef.current = null;
    setDraggedIndex(null);
  }, [content, onDataChange]);

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-start gap-3 p-4 border-2 rounded-lg transition-all group/step ${
              draggedIndex === index
                ? 'opacity-50 scale-[1.02] border-[#9F80DA] bg-[#9F80DA]/5'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            {/* Drag handle */}
            <div className="flex-shrink-0 cursor-grab active:cursor-grabbing pt-1 text-gray-400 hover:text-gray-600">
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Order number */}
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#9F80DA] text-white text-sm font-semibold flex items-center justify-center">
              {index + 1}
            </span>

            {/* Editable title + content */}
            <div className="flex-1 min-w-0 cursor-text">
              <EditableText
                value={item.title}
                onChange={(v) => updateItem(item.id, 'title', v)}
                tag="p"
                className="font-medium text-gray-900"
                placeholder="Step title..."
                multiline={false}
              />
              <EditableText
                value={item.content || ''}
                onChange={(v) => updateItem(item.id, 'content', v)}
                tag="p"
                className="text-sm text-gray-600 mt-1"
                style={{ lineHeight: '1.5' }}
                placeholder="Description (optional)..."
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
                  className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors pt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )
            )}
          </div>
        ))}

        {/* "New step" placeholder — always visible */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors">
          <div
            ref={pendingContainerRef}
            className="flex items-start gap-3 p-4"
            onBlur={pendingItem ? handlePendingBlur : undefined}
          >
            <div className="flex-shrink-0 text-gray-300 pt-1">
              <GripVertical className="w-5 h-5" />
            </div>
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 text-gray-400 text-sm font-semibold flex items-center justify-center">
              {items.length + 1}
            </span>
            <div className="flex-1">
              {pendingItem ? (
                <div>
                  <input
                    ref={pendingInputRef}
                    type="text"
                    value={pendingTitle}
                    onChange={(e) => setPendingTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setPendingItem(false);
                        setPendingTitle('');
                        setPendingDescription('');
                      }
                    }}
                    className="w-full font-medium text-left bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm"
                    placeholder="Step title..."
                  />
                  <input
                    type="text"
                    value={pendingDescription}
                    onChange={(e) => setPendingDescription(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') confirmPendingItem();
                      if (e.key === 'Escape') {
                        setPendingItem(false);
                        setPendingTitle('');
                        setPendingDescription('');
                      }
                    }}
                    className="w-full text-sm text-left bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm mt-1"
                    placeholder="Description (optional)..."
                  />
                </div>
              ) : (
                <div onClick={() => setPendingItem(true)} className="cursor-pointer">
                  <p className="font-medium text-gray-400 hover:text-gray-500 transition-colors">
                    New step
                  </p>
                  <p className="text-sm text-gray-300 mt-1">Description (optional)...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
