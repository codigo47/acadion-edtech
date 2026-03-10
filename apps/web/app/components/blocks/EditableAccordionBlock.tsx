'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Trash2, Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableAccordionBlock({
  content,
  onDataChange,
}: {
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const items = (content.items as Array<{ id: string; title: string; content: string; image?: string; imagePosition?: string }>) || [];
  const blockStyle = (content.blockStyle as 'A' | 'B' | 'C') || 'A';
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [pendingItem, setPendingItem] = useState(false);
  const [pendingTitle, setPendingTitle] = useState('');
  const pendingInputRef = useRef<HTMLInputElement>(null);
  const [showImagePickerFor, setShowImagePickerFor] = useState<string | null>(null);
  const imagePositions = ['left', 'right', 'top', 'bottom', 'stretched'] as const;

  // Style classes matching read-only AccordionBlock A/B/C
  const styleClasses = {
    A: {
      container: 'border border-gray-200 rounded-lg',
      header: 'bg-white hover:bg-gray-50',
      headerOpen: 'bg-primary/10',
      content: 'bg-white',
      icon: 'text-gray-500',
    },
    B: {
      container: 'border-l-4 border-primary shadow-sm',
      header: 'bg-gray-50 hover:bg-gray-100',
      headerOpen: 'bg-primary/20',
      content: 'bg-white',
      icon: 'text-primary',
    },
    C: {
      container: 'border-2 border-gray-300 rounded-xl',
      header: 'bg-gradient-to-r from-gray-50 to-white hover:from-gray-100',
      headerOpen: 'bg-gradient-to-r from-blue-50 to-white',
      content: 'bg-gray-50',
      icon: 'text-blue-500',
    },
  }[blockStyle];

  useEffect(() => {
    if (pendingItem && pendingInputRef.current) {
      pendingInputRef.current.focus();
    }
  }, [pendingItem]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const isOpen = (id: string) => openItems.includes(id);

  const updateItem = useCallback((id: string, field: string, value: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    onDataChange({ ...content, items: newItems });
  }, [items, content, onDataChange]);

  const confirmPendingItem = () => {
    const title = pendingTitle.trim();
    if (title) {
      const newId = `acc-${Date.now()}`;
      const newItems = [...items, { id: newId, title, content: '' }];
      onDataChange({ ...content, items: newItems });
      setOpenItems((prev) => [...prev, newId]);
    }
    setPendingItem(false);
    setPendingTitle('');
  };

  const removeItem = (id: string) => {
    onDataChange({ ...content, items: items.filter((item) => item.id !== id) });
    setDeleteConfirmId(null);
    setOpenItems((prev) => prev.filter((i) => i !== id));
  };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`${styleClasses.container} overflow-hidden group/acc`}>
            {/* Header: chevron toggles, title is editable */}
            <div
              className={`flex items-center transition-colors ${
                isOpen(item.id) ? styleClasses.headerOpen : styleClasses.header
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="flex-shrink-0 p-4 pr-0"
              >
                <ChevronDown
                  className={`w-5 h-5 ${styleClasses.icon} transition-transform ${
                    isOpen(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div className="flex-1 py-4 px-3 cursor-text">
                <EditableText
                  value={item.title}
                  onChange={(v) => updateItem(item.id, 'title', v)}
                  tag="span"
                  className="font-medium text-left"
                  placeholder="Item title..."
                  multiline={false}
                />
              </div>

              {/* Delete button */}
              {deleteConfirmId === item.id ? (
                <div className="flex items-center gap-2 px-3 py-2 mr-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] whitespace-nowrap">
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
                    className="px-3 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )
              )}
            </div>

            {/* Content — Notion-style editable */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen(item.id) ? 'max-h-[800px]' : 'max-h-0'
              }`}
            >
              <div className={`${styleClasses.content} p-4 border-t border-gray-100`}>
                {/* Image area */}
                {item.image ? (
                  <div className="mb-3">
                    <div className="relative group/img rounded-lg overflow-hidden h-32 w-full sm:w-48">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => setShowImagePickerFor(item.id)} className="px-2 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded">Change</button>
                        <button onClick={() => updateItem(item.id, 'image', '')} className="px-2 py-1 text-xs text-white bg-red-500/60 hover:bg-red-500/80 rounded">Remove</button>
                      </div>
                    </div>
                    {/* Image position selector */}
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-xs text-gray-400 mr-1">Position:</span>
                      {imagePositions.map((pos) => (
                        <button
                          key={pos}
                          onClick={() => updateItem(item.id, 'imagePosition', pos)}
                          className={`px-2 py-0.5 text-xs rounded transition-colors ${
                            (item.imagePosition || 'right') === pos
                              ? 'bg-[#9F80DA] text-white'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowImagePickerFor(item.id)}
                    className="mb-3 flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-[#9F80DA] border border-dashed border-gray-300 hover:border-[#9F80DA] rounded-lg transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Add image
                  </button>
                )}
                <div className="cursor-text">
                  <EditableText
                    value={item.content}
                    onChange={(v) => updateItem(item.id, 'content', v)}
                    tag="p"
                    className="text-gray-600 leading-relaxed min-h-[1.5em]"
                    style={{ lineHeight: '1.5', color: 'var(--block-text-color, #4B5563)' }}
                    placeholder="Enter content..."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {showImagePickerFor && (
          <ImagePickerModal
            currentUrl={items.find((i) => i.id === showImagePickerFor)?.image}
            onSelect={(url) => {
              updateItem(showImagePickerFor, 'image', url);
              setShowImagePickerFor(null);
            }}
            onClose={() => setShowImagePickerFor(null)}
          />
        )}

        {/* "New item" placeholder — always visible */}
        <div className="border border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors">
          <div className="flex items-center bg-white">
            <div className="flex-shrink-0 p-4 pr-0">
              <ChevronDown className="w-5 h-5 text-gray-300" />
            </div>
            <div className="flex-1 py-4 px-3">
              {pendingItem ? (
                <input
                  ref={pendingInputRef}
                  type="text"
                  value={pendingTitle}
                  onChange={(e) => setPendingTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') confirmPendingItem();
                    if (e.key === 'Escape') {
                      setPendingItem(false);
                      setPendingTitle('');
                    }
                  }}
                  onBlur={confirmPendingItem}
                  className="w-full font-medium text-left bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm"
                  placeholder="Item title..."
                />
              ) : (
                <button
                  onClick={() => setPendingItem(true)}
                  className="font-medium text-gray-400 hover:text-gray-500 text-left transition-colors"
                >
                  New item
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
