'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Trash2, Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function EditableTabsBlock({
  content,
  onDataChange,
}: {
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const items = (content.items as Array<{ id: string; title: string; content: string; image?: string }>) || [];
  const [activeTab, setActiveTab] = useState(items[0]?.id || '');
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingTabValue, setEditingTabValue] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [placeholderEditing, setPlaceholderEditing] = useState(false);
  const [placeholderName, setPlaceholderName] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);
  const placeholderInputRef = useRef<HTMLInputElement>(null);
  const [showTabImagePicker, setShowTabImagePicker] = useState(false);

  const activeItem = items.find((item) => item.id === activeTab) || items[0];

  useEffect(() => {
    if (editingTabId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingTabId]);

  useEffect(() => {
    if (placeholderEditing && placeholderInputRef.current) {
      placeholderInputRef.current.focus();
      placeholderInputRef.current.select();
    }
  }, [placeholderEditing]);

  const updateItem = (id: string, field: string, value: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    onDataChange({ ...content, items: newItems });
  };

  const confirmPlaceholder = () => {
    const name = placeholderName.trim();
    if (name) {
      const newId = `tab-${Date.now()}`;
      const newItems = [...items, { id: newId, title: name, content: '' }];
      onDataChange({ ...content, items: newItems });
      setActiveTab(newId);
    }
    setPlaceholderEditing(false);
    setPlaceholderName('');
  };

  const removeTab = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    onDataChange({ ...content, items: newItems });
    setDeleteConfirmId(null);
    if (activeTab === id && newItems.length > 0) {
      setActiveTab(newItems[0].id);
    }
  };

  return (
    <div className="w-full p-4 rounded-lg">
      {/* Tab headers */}
      <div className="flex flex-wrap border-b border-gray-200">
        {items.map((item) => (
          <div key={item.id} className="relative group/tab flex items-center -mb-px">
            {editingTabId === item.id ? (
              <input
                ref={editInputRef}
                type="text"
                value={editingTabValue}
                onChange={(e) => setEditingTabValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const v = editingTabValue.trim();
                    if (v) updateItem(item.id, 'title', v);
                    setEditingTabId(null);
                  }
                  if (e.key === 'Escape') setEditingTabId(null);
                }}
                onBlur={() => {
                  const v = editingTabValue.trim();
                  if (v) updateItem(item.id, 'title', v);
                  setEditingTabId(null);
                }}
                className="px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border-b-2 border-primary text-primary bg-primary/5 focus:outline-none min-w-[80px]"
              />
            ) : (
              <button
                onClick={() => {
                  if (activeTab === item.id) {
                    setEditingTabId(item.id);
                    setEditingTabValue(item.title);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`px-3 sm:px-6 py-2.5 sm:py-3 font-medium transition-colors border-b-2 text-sm sm:text-base ${
                  activeTab === item.id
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.title}
              </button>
            )}

            {/* Delete button */}
            {deleteConfirmId === item.id ? (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] whitespace-nowrap">
                <span className="text-sm text-red-600 font-medium">Delete?</span>
                <button
                  onClick={() => removeTab(item.id)}
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
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-white rounded-full z-[100] transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )
            )}
          </div>
        ))}

        {/* "New tab" placeholder — always visible */}
        <div className="flex items-center -mb-px">
          {placeholderEditing ? (
            <input
              ref={placeholderInputRef}
              type="text"
              value={placeholderName}
              onChange={(e) => setPlaceholderName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmPlaceholder();
                if (e.key === 'Escape') {
                  setPlaceholderEditing(false);
                  setPlaceholderName('');
                }
              }}
              onBlur={confirmPlaceholder}
              className="px-3 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium border-b-2 border-primary text-primary bg-primary/5 focus:outline-none min-w-[80px]"
              placeholder="Tab name..."
            />
          ) : (
            <button
              onClick={() => setPlaceholderEditing(true)}
              className="px-3 sm:px-6 py-2.5 sm:py-3 font-medium text-sm sm:text-base text-gray-400 hover:text-gray-500 border-b-2 border-transparent border-dashed transition-colors"
            >
              New tab
            </button>
          )}
        </div>
      </div>

      {/* Tab content — editable */}
      {activeItem && (
        <div className="p-3 sm:p-6">
          {/* Tab image */}
          {activeItem.image ? (
            <div className="mb-4">
              <div className="relative group/img rounded-lg overflow-hidden h-40 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => setShowTabImagePicker(true)} className="px-2 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded">Change</button>
                  <button onClick={() => updateItem(activeItem.id, 'image', '')} className="px-2 py-1 text-xs text-white bg-red-500/60 hover:bg-red-500/80 rounded">Remove</button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowTabImagePicker(true)}
              className="mb-3 flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-[#9F80DA] border border-dashed border-gray-300 hover:border-[#9F80DA] rounded-lg transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Add image to tab
            </button>
          )}
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateItem(activeItem.id, 'content', e.currentTarget.textContent || '')}
            className="text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/20 rounded-lg p-1 -m-1 min-h-[2em]"
            style={{ lineHeight: '1.6', color: 'var(--block-text-color, #374151)' }}
          >
            {activeItem.content}
          </div>
        </div>
      )}

      {showTabImagePicker && activeItem && (
        <ImagePickerModal
          currentUrl={activeItem.image}
          onSelect={(url) => {
            updateItem(activeItem.id, 'image', url);
            setShowTabImagePicker(false);
          }}
          onClose={() => setShowTabImagePicker(false)}
        />
      )}
    </div>
  );
}
