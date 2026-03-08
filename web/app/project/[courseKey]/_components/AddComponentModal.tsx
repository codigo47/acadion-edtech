'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { blockMetadata, type BlockMeta } from './block-metadata';

interface AddComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (componentName: string) => void;
  usedComponentNames?: string[];
}

const COMPONENT_CATEGORIES: Record<string, { label: string; keys: string[] }> = {
  paragraph: { label: 'Paragraph', keys: ['ParagraphBlock', 'ParagraphWithHeadingBlock', 'ParagraphWithSubheadingBlock'] },
  heading: { label: 'Heading', keys: ['HeadingBlock', 'SubheadingBlock'] },
  highlight: { label: 'Highlight', keys: ['HighlightBlock', 'HighlightNoteBlock', 'HighlightColumnBlock', 'HighlightCenterLineBlock', 'HighlightLeftLineBlock', 'HighlightBackgroundBlock'] },
  image: { label: 'Image', keys: ['ImageBlock', 'ImageWithTextBlock', 'ImageWithTextLeftBlock', 'ImageWithTextCenterBlock', 'ImageWithTextBottomBlock', 'ImageWithTextTopBlock'] },
  quote: { label: 'Quote', keys: ['QuoteBlock', 'QuoteCenterBorderBlock', 'QuoteCenterLightBlock', 'QuoteLeftLightBlock', 'QuoteLeftBlock', 'QuoteImageBlock'] },
  comparison: { label: 'Comparison', keys: ['ComparisonBlock', 'ComparisonProsConsBlock', 'ComparisonCauseEffectBlock', 'ComparisonDosDontsBlock', 'ComparisonMythFactBlock', 'ComparisonBeforeAfterBlock'] },
  chat: { label: 'Chat', keys: ['ChatBlock', 'ChatFeedbackBlock', 'ChatQABlock', 'ChatQuestionWallBlock', 'ChatDialogBlock'] },
  layout: { label: 'Layout', keys: ['TableBlock', 'ListBlock', 'AccordionBlock', 'TabsBlock', 'ColumnsBlock', 'TimelineBlock', 'SeparatorBlock'] },
  media: { label: 'Media', keys: ['VideoBlock', 'AudioBlock', 'AttachmentBlock', 'EmbedBlock', 'GalleryBlock'] },
  interactive: { label: 'Interactive', keys: ['CarouselBlock', 'CheckboxBlock', 'LabeledImageBlock', 'ScenarioBlock', 'FlashCardBlock', 'SortingBlock', 'SortingStepsBlock', 'ButtonBlock', 'ButtonStackBlock', 'GraphBlock'] },
  other: { label: 'Other', keys: ['BannerBlock', 'TestimonialBlock', 'StoryTellingBlock', 'ReviewsBlock'] },
  evaluation: { label: 'Evaluation', keys: ['MultipleChoiceBlock', 'MultipleResponseBlock', 'FillInTheBlankBlock', 'MatchingPairsBlock'] },
};

interface GridItem {
  componentName: string;
  meta: BlockMeta;
}

function buildGridItems(): GridItem[] {
  const seenGroups = new Set<string>();
  const items: GridItem[] = [];

  for (const [name, meta] of Object.entries(blockMetadata)) {
    if (meta.group) {
      if (seenGroups.has(meta.group)) continue;
      seenGroups.add(meta.group);
    }
    items.push({ componentName: name, meta });
  }

  return items;
}

const ALL_ITEMS = buildGridItems();

export function AddComponentModal({ isOpen, onClose, onAdd, usedComponentNames = [] }: AddComponentModalProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('recent');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  // Auto-focus search input on open
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [isOpen]);

  const usedItems = useMemo(() => {
    if (usedComponentNames.length === 0) return [];
    const seen = new Set<string>();
    const items: GridItem[] = [];
    for (const name of usedComponentNames) {
      if (seen.has(name)) continue;
      seen.add(name);
      const meta = blockMetadata[name];
      if (meta) items.push({ componentName: name, meta });
    }
    return items;
  }, [usedComponentNames]);

  const filteredItems = useMemo(() => {
    let items: GridItem[];

    if (selectedCategory === 'recent') {
      items = usedItems;
    } else {
      items = ALL_ITEMS;
      const cat = COMPONENT_CATEGORIES[selectedCategory];
      if (cat) {
        const catKeys = new Set(cat.keys);
        items = items.filter((item) => catKeys.has(item.componentName));
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((item) =>
        item.meta.label.toLowerCase().includes(q) ||
        item.componentName.toLowerCase().includes(q)
      );
    }

    return items;
  }, [selectedCategory, search, usedItems]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSearch('');
    setSelectedCategory('recent');
    setSelectedComponent(null);
    onClose();
  };

  const handleAdd = () => {
    if (!selectedComponent) return;
    onAdd(selectedComponent);
    setSearch('');
    setSelectedCategory('recent');
    setSelectedComponent(null);
  };

  const categories = [
    { key: 'recent', label: 'Recently Used' },
    ...Object.entries(COMPONENT_CATEGORIES).map(([key, val]) => ({
      key,
      label: val.label,
    })),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-[960px] mx-4 h-[700px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Add Component</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components..."
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#9F80DA] transition-colors"
            />
          </div>
        </div>

        {/* Body: sidebar + grid */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[180px] border-r border-gray-100 overflow-y-auto py-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  selectedCategory === cat.key
                    ? 'bg-[#9F80DA]/10 text-[#9F80DA] font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Search className="w-10 h-10 mb-3" />
                <p className="text-sm">
                  {selectedCategory === 'recent' && !search.trim()
                    ? 'No components used in this project yet'
                    : 'No components found'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-3">
                {filteredItems.map((item) => {
                  const Icon = item.meta.icon;
                  const isSelected = selectedComponent === item.componentName;

                  return (
                    <button
                      key={item.componentName}
                      onClick={() => setSelectedComponent(item.componentName)}
                      className={`flex flex-col items-center justify-center aspect-square rounded-xl border-2 transition-all p-3 ${
                        isSelected
                          ? 'border-[#9F80DA] ring-2 ring-[#9F80DA]/20 bg-[#9F80DA]/5'
                          : 'border-gray-100 hover:border-[#9F80DA]/30 bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${item.meta.color} flex items-center justify-center mb-2`}>
                        <Icon className={`w-5 h-5 ${item.meta.textColor}`} />
                      </div>
                      <span className="text-xs text-gray-700 font-medium text-center leading-tight">
                        {item.meta.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-gray-100 gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedComponent}
            className="px-4 py-2 bg-gradient-to-r from-[#9F80DA] to-[#8A6BC5] text-white text-sm font-medium rounded-lg hover:from-[#8A6BC5] hover:to-[#7B5BB5] disabled:opacity-50 transition-all"
          >
            Add Component
          </button>
        </div>
      </div>
    </div>
  );
}
