'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Plus, X, Trash2, ChevronDown, ChevronRight, Image as ImageIcon, Check, Circle, ArrowRight, Star, GripVertical, ThumbsUp, ThumbsDown, type LucideIcon } from 'lucide-react';
import { EditableText } from './EditableText';
import { CourseComponent } from './CourseComponent';
import { ImagePickerModal } from './ImagePickerModal';
import type { UnitComponent } from './types';

// Blur-save input: uses local state, saves on blur
function BlurInput({ value, onSave, className, placeholder }: { value: string; onSave: (v: string) => void; className?: string; placeholder?: string }) {
  const [local, setLocal] = useState(value);
  const prevValue = useRef(value);
  useEffect(() => { if (value !== prevValue.current) { setLocal(value); prevValue.current = value; } }, [value]);
  return (
    <input
      type="text"
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      onBlur={() => { if (local !== value) onSave(local); }}
      className={className || 'w-full px-3 py-1 text-xs text-gray-500 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30'}
      placeholder={placeholder}
    />
  );
}

interface EditableCourseComponentProps {
  component: UnitComponent;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function EditableCourseComponent({
  component,
  onDataChange,
}: EditableCourseComponentProps) {
  const { componentName, content } = component;

  // Tabs: real tab UI with add/delete/edit
  if (componentName === 'TabsBlock') {
    return <EditableTabsBlock content={content} onDataChange={onDataChange} />;
  }

  // Accordion: real accordion UI with add/delete/edit
  if (componentName === 'AccordionBlock') {
    return <EditableAccordionBlock content={content} onDataChange={onDataChange} />;
  }

  // Lists: real component + add input at bottom
  if (isListBlock(componentName)) {
    return (
      <EditableListBlock
        component={component}
        componentName={componentName}
        content={content}
        onDataChange={onDataChange}
      />
    );
  }

  // Image+text: editable image + Notion-style text
  if (isImageWithTextBlock(componentName)) {
    return (
      <EditableImageWithTextBlock
        componentName={componentName}
        content={content}
        onDataChange={onDataChange}
      />
    );
  }

  // Image only: click to change image
  if (componentName === 'ImageBlock') {
    return (
      <EditableImageBlock
        component={component}
        content={content}
        onDataChange={onDataChange}
      />
    );
  }

  // SortingSteps
  if (componentName === 'SortingStepsBlock') {
    return <EditableSortingStepsBlock content={content} onDataChange={onDataChange} />;
  }

  // MultipleResponse
  if (componentName === 'MultipleResponseBlock') {
    return <EditableMultipleResponseBlock content={content} onDataChange={onDataChange} />;
  }

  // MultipleChoice
  if (componentName === 'MultipleChoiceBlock') {
    return <EditableMultipleChoiceBlock content={content} onDataChange={onDataChange} />;
  }

  // FillInTheBlank
  if (componentName === 'FillInTheBlankBlock') {
    return <EditableFillInBlankBlock content={content} onDataChange={onDataChange} />;
  }

  // MatchingPairs
  if (componentName === 'MatchingPairsBlock') {
    return <EditableMatchingPairsBlock content={content} onDataChange={onDataChange} />;
  }

  // SortingBlock (categories)
  if (componentName === 'SortingBlock') {
    return <EditableSortingCategoriesBlock content={content} onDataChange={onDataChange} />;
  }

  // Paragraphs, headings, highlights, quotes: Notion-style
  if (isParagraphOrHeading(componentName)) {
    return <NotionStyleBlock componentName={componentName} content={content} onDataChange={onDataChange} />;
  }

  // Comparisons
  if (componentName === 'ComparisonCauseEffectBlock') {
    return <EditableCauseEffectBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ComparisonMythFactBlock') {
    return <EditableTwoFieldBlock content={content} onDataChange={onDataChange} fieldA="myth" fieldB="fact" labelA="Myth" labelB="Fact" colorA="bg-red-100" colorB="bg-green-100" />;
  }
  if (isComparisonTwoList(componentName)) {
    const cfg = twoListConfig[componentName]!;
    return <EditableTwoListBlock content={content} onDataChange={onDataChange} config={cfg} />;
  }
  if (componentName === 'ComparisonBlock') {
    return <EditableComparisonItemsBlock content={content} onDataChange={onDataChange} />;
  }

  // Chat blocks
  if (isChatBlock(componentName)) {
    return <EditableChatBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ChatQuestionWallBlock') {
    return <EditableChatQABlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ChatDialogBlock') {
    return <EditableChatDialogBlock content={content} onDataChange={onDataChange} />;
  }

  // Items-based blocks
  if (componentName === 'TimelineBlock') {
    return <EditableTimelineBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'FlashCardBlock') {
    return <EditableFlashCardBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'TestimonialBlock') {
    return <EditableTestimonialBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ReviewsBlock') {
    return <EditableReviewsBlock content={content} onDataChange={onDataChange} />;
  }

  // Table
  if (componentName === 'TableBlock') {
    return <EditableTableBlock content={content} onDataChange={onDataChange} />;
  }

  // Buttons
  if (componentName === 'ButtonBlock') {
    return <EditableButtonBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'ButtonStackBlock') {
    return <EditableButtonStackBlock content={content} onDataChange={onDataChange} />;
  }

  // Media
  if (componentName === 'VideoBlock' || componentName === 'AudioBlock') {
    return <EditableMediaUrlBlock content={content} onDataChange={onDataChange} label={componentName === 'VideoBlock' ? 'Video' : 'Audio'} />;
  }
  if (componentName === 'EmbedBlock') {
    return <EditableEmbedBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'AttachmentBlock') {
    return <EditableAttachmentBlock content={content} onDataChange={onDataChange} />;
  }

  // Carousel / Gallery
  if (componentName === 'CarouselBlock') {
    return <EditableCarouselBlock content={content} onDataChange={onDataChange} />;
  }
  if (componentName === 'GalleryBlock') {
    return <EditableGalleryBlock content={content} onDataChange={onDataChange} />;
  }

  // StoryTelling
  if (componentName === 'StoryTellingBlock') {
    return <EditableStoryBlock content={content} onDataChange={onDataChange} />;
  }

  // Columns
  if (componentName === 'ColumnsBlock') {
    return <EditableColumnsBlock content={content} onDataChange={onDataChange} />;
  }

  // Scenario
  if (componentName === 'ScenarioBlock') {
    return <EditableScenarioBlock content={content} onDataChange={onDataChange} />;
  }

  // LabeledImage
  if (componentName === 'LabeledImageBlock') {
    return <EditableLabeledImageBlock content={content} onDataChange={onDataChange} />;
  }

  // Separator
  if (componentName === 'SeparatorBlock') {
    return <EditableSeparatorBlock content={content} onDataChange={onDataChange} />;
  }

  // Everything else (Graph, etc.): show as-is
  return <CourseComponent component={component} />;
}

// ─── Category Checks ───────────────────────────────────────────────

function isParagraphOrHeading(name: string): boolean {
  return [
    'ParagraphBlock', 'ParagraphWithHeadingBlock', 'ParagraphWithSubheadingBlock',
    'HeadingBlock', 'SubheadingBlock',
    'HighlightBlock', 'HighlightNoteBlock', 'HighlightColumnBlock',
    'HighlightCenterLineBlock', 'HighlightLeftLineBlock', 'HighlightBackgroundBlock',
    'QuoteBlock', 'QuoteCenterBorderBlock', 'QuoteCenterLightBlock',
    'QuoteLeftLightBlock', 'QuoteLeftBlock', 'QuoteImageBlock',
  ].includes(name);
}

function isListBlock(name: string): boolean {
  return ['ListBlock', 'CheckboxBlock'].includes(name);
}

function isImageWithTextBlock(name: string): boolean {
  return [
    'ImageWithTextBlock', 'ImageWithTextLeftBlock', 'ImageWithTextCenterBlock',
    'ImageWithTextBottomBlock', 'ImageWithTextTopBlock',
  ].includes(name);
}

function isComparisonTwoList(name: string): boolean {
  return ['ComparisonProsConsBlock', 'ComparisonDosDontsBlock', 'ComparisonBeforeAfterBlock'].includes(name);
}

interface TwoListColumnConfig {
  field: string;
  label: string;
  icon?: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  labelColor?: string;
  bg?: string;
  borderColor?: string;
  bulletColor?: string;
  headerBar?: boolean;
  headerBarBg?: string;
}

interface TwoListConfig {
  left: TwoListColumnConfig;
  right: TwoListColumnConfig;
  variant: 'bordered' | 'filled' | 'header-bar';
}

const twoListConfig: Record<string, TwoListConfig> = {
  ComparisonDosDontsBlock: {
    variant: 'bordered',
    left: { field: 'dos', label: "Do's", icon: Check, iconBg: 'bg-green-500', iconColor: 'text-white', labelColor: 'text-green-700', bg: 'bg-white', borderColor: 'border-green-500' },
    right: { field: 'donts', label: "Don'ts", icon: X, iconBg: 'bg-red-500', iconColor: 'text-white', labelColor: 'text-red-700', bg: 'bg-white', borderColor: 'border-red-500' },
  },
  ComparisonProsConsBlock: {
    variant: 'filled',
    left: { field: 'pros', label: 'Pros', icon: ThumbsUp, iconBg: 'bg-green-500', iconColor: 'text-white', labelColor: 'text-green-700', bg: 'bg-green-50', bulletColor: 'text-green-500' },
    right: { field: 'cons', label: 'Cons', icon: ThumbsDown, iconBg: 'bg-red-500', iconColor: 'text-white', labelColor: 'text-red-700', bg: 'bg-red-50', bulletColor: 'text-red-500' },
  },
  ComparisonBeforeAfterBlock: {
    variant: 'header-bar',
    left: { field: 'beforeItems', label: 'Before', headerBar: true, headerBarBg: 'bg-orange-500', bg: 'bg-gray-50' },
    right: { field: 'afterItems', label: 'After', headerBar: true, headerBarBg: 'bg-orange-500', bg: 'bg-gray-50' },
  },
};

function isChatBlock(name: string): boolean {
  return ['ChatBlock', 'ChatFeedbackBlock', 'ChatQABlock'].includes(name);
}

// ─── Notion-style: always editable, no click-to-edit ────────────────

function NotionStyleBlock({
  componentName,
  content,
  onDataChange,
}: {
  componentName: string;
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const updateField = useCallback(
    (field: string, value: unknown) => {
      onDataChange({ ...content, [field]: value });
    },
    [content, onDataChange],
  );

  if (componentName === 'ParagraphBlock') {
    return (
      <div className="w-full p-4 cursor-text">
        <EditableText
          value={String(content.content || '')}
          onChange={(v) => updateField('content', v)}
          tag="p"
          className="text-base leading-relaxed"
          style={{ lineHeight: '1.75' }}
          placeholder="Enter paragraph text..."
        />
      </div>
    );
  }

  if (componentName === 'ParagraphWithHeadingBlock') {
    return (
      <div className="w-full p-4 cursor-text">
        <EditableText
          value={String(content.heading || '')}
          onChange={(v) => updateField('heading', v)}
          tag="h2"
          className="mb-4 text-2xl font-bold"
          placeholder="Enter heading..."
          multiline={false}
        />
        <EditableText
          value={String(content.content || '')}
          onChange={(v) => updateField('content', v)}
          tag="p"
          className="text-base leading-relaxed"
          style={{ lineHeight: '1.75' }}
          placeholder="Enter paragraph text..."
        />
      </div>
    );
  }

  if (componentName === 'ParagraphWithSubheadingBlock') {
    return (
      <div className="w-full p-4 cursor-text">
        <EditableText
          value={String(content.subheading || '')}
          onChange={(v) => updateField('subheading', v)}
          tag="h3"
          className="mb-3 text-lg font-semibold text-gray-700"
          placeholder="Enter subheading..."
          multiline={false}
        />
        <EditableText
          value={String(content.content || '')}
          onChange={(v) => updateField('content', v)}
          tag="p"
          className="text-base leading-relaxed"
          style={{ lineHeight: '1.75' }}
          placeholder="Enter paragraph text..."
        />
      </div>
    );
  }

  if (componentName === 'HeadingBlock') {
    return (
      <div className="w-full p-4 cursor-text">
        <EditableText
          value={String(content.heading || '')}
          onChange={(v) => updateField('heading', v)}
          tag="h1"
          className="text-4xl font-bold"
          placeholder="Enter heading..."
          multiline={false}
        />
      </div>
    );
  }

  if (componentName === 'SubheadingBlock') {
    return (
      <div className="w-full p-4 cursor-text">
        <EditableText
          value={String(content.subheading || '')}
          onChange={(v) => updateField('subheading', v)}
          tag="h2"
          className="text-2xl font-semibold"
          style={{ color: '#6B7280' }}
          placeholder="Enter subheading..."
          multiline={false}
        />
      </div>
    );
  }

  // Quote variants — each with unique visual treatment
  if (componentName.startsWith('Quote')) {
    return <QuoteVariantEditor componentName={componentName} content={content} updateField={updateField} onDataChange={onDataChange} />;
  }

  // Highlight variants — each with unique visual treatment
  return <HighlightVariantEditor componentName={componentName} content={content} updateField={updateField} />;
}

// ─── Quote Variant Editor ───────────────────────────────────────────

function QuoteVariantEditor({ componentName, content, updateField, onDataChange }: { componentName: string; content: Record<string, unknown>; updateField: (field: string, value: unknown) => void; onDataChange: (data: Record<string, unknown>) => void }) {
  const [showPicker, setShowPicker] = useState(false);

  const quoteFields = (
    <>
      <EditableText
        value={String(content.content || '')}
        onChange={(v) => updateField('content', v)}
        tag="p"
        className="text-lg italic"
        style={{ lineHeight: '1.6' }}
        placeholder="Enter quote text..."
      />
      {content.author !== undefined && (
        <EditableText
          value={String(content.author || '')}
          onChange={(v) => updateField('author', v)}
          tag="span"
          className="text-sm mt-2 block"
          placeholder="Attribution..."
          multiline={false}
        />
      )}
    </>
  );

  switch (componentName) {
    case 'QuoteBlock':
      return (
        <div className="w-full bg-gray-50 rounded-xl p-8 text-center cursor-text">
          <span className="text-4xl text-gray-300 block mb-2">&ldquo;</span>
          {quoteFields}
        </div>
      );

    case 'QuoteCenterBorderBlock':
      return (
        <div className="w-full border-2 border-gray-300 rounded-lg p-6 text-center cursor-text">
          {quoteFields}
        </div>
      );

    case 'QuoteCenterLightBlock':
      return (
        <div className="w-full text-center py-6 cursor-text">
          <span className="text-3xl text-gray-300">&ldquo;</span>
          {quoteFields}
          <span className="text-3xl text-gray-300">&rdquo;</span>
        </div>
      );

    case 'QuoteLeftLightBlock':
      return (
        <div className="w-full py-4 border-l-2 border-gray-200 pl-6 cursor-text">
          {quoteFields}
        </div>
      );

    case 'QuoteLeftBlock':
      return (
        <div className="w-full bg-gray-50 border-l-4 border-gray-400 p-6 cursor-text">
          {quoteFields}
        </div>
      );

    case 'QuoteImageBlock':
      return (
        <>
          <div className="w-full relative rounded-lg overflow-hidden cursor-text">
            <div className="w-full h-48 group/img cursor-pointer relative" onClick={() => setShowPicker(true)}>
              {content.quoteImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={String(content.quoteImage)} alt="Quote background" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 gap-2">
                  <ImageIcon className="w-6 h-6" /> Click to set background image
                </div>
              )}
              <div className="absolute inset-0 z-20 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg">
                <span className="px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  Change image
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 pointer-events-none">
              <div className="pointer-events-auto text-center cursor-text">
                <EditableText
                  value={String(content.content || '')}
                  onChange={(v) => updateField('content', v)}
                  tag="p"
                  className="text-lg italic text-white"
                  style={{ lineHeight: '1.6', color: '#ffffff' }}
                  placeholder="Enter quote text..."
                />
                {content.author !== undefined && (
                  <EditableText
                    value={String(content.author || '')}
                    onChange={(v) => updateField('author', v)}
                    tag="span"
                    className="text-sm text-gray-200 mt-2 block"
                    style={{ color: '#e5e7eb' }}
                    placeholder="Attribution..."
                    multiline={false}
                  />
                )}
              </div>
            </div>
          </div>
          {showPicker && (
            <ImagePickerModal
              currentUrl={String(content.quoteImage || '')}
              onSelect={(url) => { onDataChange({ ...content, quoteImage: url }); setShowPicker(false); }}
              onClose={() => setShowPicker(false)}
            />
          )}
        </>
      );

    default:
      // Fallback for any unknown quote variant
      return (
        <div className="w-full p-6 border-l-4 border-gray-400 bg-gray-50 rounded-r-lg cursor-text">
          {quoteFields}
        </div>
      );
  }
}

// ─── Highlight Variant Editor ───────────────────────────────────────

function HighlightVariantEditor({ componentName, content, updateField }: { componentName: string; content: Record<string, unknown>; updateField: (field: string, value: unknown) => void }) {
  const blockStyle = (content.blockStyle as string) || 'A';
  const highlightColors: Record<string, { bg: string; border: string; color: string }> = {
    A: { bg: 'bg-yellow-100', border: 'border-yellow-500', color: '#713f12' },
    B: { bg: 'bg-blue-100', border: 'border-blue-500', color: '#1e40af' },
    C: { bg: 'bg-purple-100', border: 'border-purple-500', color: '#581c87' },
  };
  const hc = highlightColors[blockStyle] || highlightColors.A;

  const highlightField = (
    <EditableText
      value={String(content.highlight || '')}
      onChange={(v) => updateField('highlight', v)}
      tag="p"
      className="text-lg font-medium"
      style={{ lineHeight: '1.6', color: hc.color, fontSize: '18px' }}
      placeholder="Enter highlight text..."
    />
  );

  switch (componentName) {
    case 'HighlightBlock':
    case 'HighlightNoteBlock':
      return (
        <div className={`${hc.bg} border-l-4 ${hc.border} p-6 rounded-r-lg my-4 cursor-text`}>
          {highlightField}
        </div>
      );

    case 'HighlightColumnBlock':
      return (
        <div className={`${hc.bg} max-w-lg mx-auto text-center p-6 rounded-lg my-4 cursor-text`}>
          {highlightField}
        </div>
      );

    case 'HighlightCenterLineBlock':
      return (
        <div className={`border-t-4 ${hc.border} pt-4 text-center my-4 cursor-text`}>
          {highlightField}
        </div>
      );

    case 'HighlightLeftLineBlock':
      return (
        <div className={`border-t-4 ${hc.border} pt-4 text-left my-4 cursor-text`}>
          {highlightField}
        </div>
      );

    case 'HighlightBackgroundBlock':
      return (
        <div className="bg-gray-100 rounded-lg p-6 my-4 cursor-text">
          {highlightField}
        </div>
      );

    default:
      return (
        <div className={`${hc.bg} border-l-4 ${hc.border} p-6 rounded-r-lg my-4 cursor-text`}>
          {highlightField}
        </div>
      );
  }
}

// ─── List Block: real component + add input ────────────────────────

function EditableListBlock({
  component,
  componentName,
  content,
  onDataChange,
}: {
  component: UnitComponent;
  componentName: string;
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const [newItemText, setNewItemText] = useState('');
  const rawItems = (content.items as unknown[]) || [];
  const isCheckbox = componentName === 'CheckboxBlock';
  const listStyle = (content.listStyle as string) || 'default';
  const accentColor = (content.accentColor as string) || '#9F80DA';

  const addItem = () => {
    const text = newItemText.trim();
    if (!text) return;
    if (isCheckbox) {
      onDataChange({
        ...content,
        items: [...rawItems, { id: `cb-${Date.now()}`, text, checked: false }],
      });
    } else {
      onDataChange({ ...content, items: [...rawItems, text] });
    }
    setNewItemText('');
  };

  const renderBullet = () => {
    if (isCheckbox) {
      return (
        <div className="w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded flex-shrink-0" />
      );
    }
    switch (listStyle) {
      case 'check':
        return <Check className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />;
      case 'circle':
        return <Circle className="w-3 h-3 fill-current flex-shrink-0" style={{ color: accentColor }} />;
      case 'arrow':
        return <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />;
      case 'chevron':
        return <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />;
      case 'star':
        return <Star className="w-4 h-4 fill-current flex-shrink-0" style={{ color: accentColor }} />;
      case 'numbered':
        return (
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {rawItems.length + 1}
          </span>
        );
      default:
        return (
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-800" />
        );
    }
  };

  return (
    <div>
      <CourseComponent key={`${componentName}-${rawItems.length}`} component={component} />
      <div className="px-4 pb-4 -mt-1">
        <div className="flex items-center gap-3">
          {renderBullet()}
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem();
              }
            }}
            onBlur={addItem}
            className="flex-1 py-1 text-base text-gray-400 bg-transparent border-none focus:outline-none placeholder-gray-400"
            placeholder="Add a new item..."
          />
        </div>
      </div>
    </div>
  );
}

// ─── Editable Tabs: real tab UI with editing controls ──────────────

function EditableTabsBlock({
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
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-white rounded-full z-[100]"
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
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => updateItem(activeItem.id, 'content', e.currentTarget.textContent || '')}
            className="text-base text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/20 rounded-lg p-1 -m-1 min-h-[2em]"
            style={{ lineHeight: '1.6' }}
          >
            {activeItem.content}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Editable Accordion: Notion-style inline editing ────────────────

function EditableAccordionBlock({
  content,
  onDataChange,
}: {
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const items = (content.items as Array<{ id: string; title: string; content: string }>) || [];
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [pendingItem, setPendingItem] = useState(false);
  const [pendingTitle, setPendingTitle] = useState('');
  const pendingInputRef = useRef<HTMLInputElement>(null);

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
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden group/acc">
            {/* Header: chevron toggles, title is editable */}
            <div
              className={`flex items-center transition-colors ${
                isOpen(item.id) ? 'bg-primary/10' : 'bg-white hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="flex-shrink-0 p-4 pr-0"
              >
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
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
                isOpen(item.id) ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              <div className="bg-white p-4 border-t border-gray-100 cursor-text">
                <EditableText
                  value={item.content}
                  onChange={(v) => updateItem(item.id, 'content', v)}
                  tag="p"
                  className="text-gray-600 leading-relaxed min-h-[1.5em]"
                  style={{ lineHeight: '1.5', color: '#4B5563' }}
                  placeholder="Enter content..."
                />
              </div>
            </div>
          </div>
        ))}

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

// ─── SortingSteps: Notion-style inline editing ──────────────────────

function EditableSortingStepsBlock({
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

// ─── MultipleResponse: Notion-style inline editing ──────────────────

function EditableMultipleResponseBlock({
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
    </div>
  );
}

// ─── CauseEffect: Notion-style inline editing ──────────────────────

function EditableCauseEffectBlock({
  content,
  onDataChange,
}: {
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const updateField = useCallback(
    (field: string, value: string) => {
      onDataChange({ ...content, [field]: value });
    },
    [content, onDataChange],
  );

  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 bg-white">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Cause and Effect</h3>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Cause */}
        <div className="flex-1 p-4 rounded-lg bg-gray-100 cursor-text">
          <EditableText
            value={String(content.cause || '')}
            onChange={(v) => updateField('cause', v)}
            tag="p"
            className="text-sm text-gray-700"
            style={{ lineHeight: '1.5' }}
            placeholder="Enter cause..."
          />
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 self-center">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white rotate-90 sm:rotate-0" />
          </div>
        </div>

        {/* Effect */}
        <div className="flex-1 p-4 rounded-lg bg-orange-500 cursor-text">
          <EditableText
            value={String(content.effect || '')}
            onChange={(v) => updateField('effect', v)}
            tag="p"
            className="text-sm text-white"
            style={{ lineHeight: '1.5', color: '#ffffff' }}
            placeholder="Enter effect..."
          />
        </div>
      </div>
    </div>
  );
}

// ─── Image Block: real component + click to change ─────────────────

function EditableImageBlock({
  component,
  content,
  onDataChange,
}: {
  component: UnitComponent;
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <div
        className="relative group cursor-pointer"
        onClick={() => setShowPicker(true)}
      >
        <CourseComponent component={component} />
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
          <span className="px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4" />
            Change image
          </span>
        </div>
      </div>

      {showPicker && (
        <ImagePickerModal
          currentUrl={String(content.image || '')}
          onSelect={(url) => onDataChange({ ...content, image: url })}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}

// ─── Image+Text Block: clickable image + Notion-style text ──────────

function ImageOverlay({
  image,
  alt,
  onChangeImage,
  className,
}: {
  image: string;
  alt: string;
  onChangeImage: () => void;
  className?: string;
}) {
  const src = !image ? '' :
    image === '/sample.jpeg' || image.includes('sample')
      ? 'https://placehold.co/800x600/e2e8f0/64748b?text=Sample+Image'
      : image;

  return (
    <div
      className={`relative group/img cursor-pointer h-full ${className || ''}`}
      onClick={onChangeImage}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">Image not available</span>
        </div>
      )}
      <div className="absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg">
        <span className="px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4" />
          Change image
        </span>
      </div>
    </div>
  );
}

function EditableImageWithTextBlock({
  componentName,
  content,
  onDataChange,
}: {
  componentName: string;
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const image = String(content.image || '');
  const alt = String(content.alt || 'Image');

  const updateText = useCallback(
    (value: string) => onDataChange({ ...content, text: value }),
    [content, onDataChange],
  );

  const textEditor = (
    <EditableText
      value={String(content.text || '')}
      onChange={updateText}
      tag="p"
      className="text-base leading-relaxed"
      style={{ lineHeight: '1.75' }}
      placeholder="Enter text..."
    />
  );

  const imageOverlay = (
    <ImageOverlay
      image={image}
      alt={alt}
      onChangeImage={() => setShowPicker(true)}
    />
  );

  let layout: React.ReactNode;

  if (componentName === 'ImageWithTextCenterBlock') {
    // Image with text below, dark overlay on image for visual effect
    layout = (
      <div className="w-full p-4 space-y-4">
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <ImageOverlay
            image={image}
            alt={alt}
            onChangeImage={() => setShowPicker(true)}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none rounded-lg" />
        </div>
        <div className="p-4 rounded-lg cursor-text text-center">
          <EditableText
            value={String(content.text || '')}
            onChange={updateText}
            tag="p"
            className="text-base leading-relaxed"
            style={{ lineHeight: '1.75' }}
            placeholder="Enter text..."
          />
        </div>
      </div>
    );
  } else if (componentName === 'ImageWithTextTopBlock') {
    // Text on top, image below
    layout = (
      <div className="w-full p-4 flex flex-col-reverse gap-4">
        <div className="relative w-full h-64">
          {imageOverlay}
        </div>
        <div className="p-4 rounded-lg cursor-text">
          {textEditor}
        </div>
      </div>
    );
  } else if (componentName === 'ImageWithTextBottomBlock') {
    // Image on top, text below
    layout = (
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="relative w-full h-64">
          {imageOverlay}
        </div>
        <div className="p-4 rounded-lg cursor-text">
          {textEditor}
        </div>
      </div>
    );
  } else if (componentName === 'ImageWithTextLeftBlock') {
    // Text left, image right
    layout = (
      <div className="w-full p-4 flex flex-col md:flex-row-reverse gap-4">
        <div className="relative w-full md:w-1/2 h-48 md:h-64">
          {imageOverlay}
        </div>
        <div className="w-full md:w-1/2 flex items-center p-4 rounded-lg cursor-text">
          {textEditor}
        </div>
      </div>
    );
  } else {
    // ImageWithTextBlock — image left, text right
    layout = (
      <div className="w-full p-4 flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-1/2 h-48 md:h-64">
          {imageOverlay}
        </div>
        <div className="w-full md:w-1/2 flex items-center p-4 rounded-lg cursor-text">
          {textEditor}
        </div>
      </div>
    );
  }

  return (
    <>
      {layout}
      {showPicker && (
        <ImagePickerModal
          currentUrl={image}
          onSelect={(url) => onDataChange({ ...content, image: url })}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}

// ─── MultipleChoice: Notion-style inline editing ────────────────────

function EditableMultipleChoiceBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ id: string; text: string; isCorrect: boolean }>) || [];
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [pendingItem, setPendingItem] = useState(false);
  const [pendingText, setPendingText] = useState('');
  const pendingInputRef = useRef<HTMLInputElement>(null);
  const pendingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (pendingItem && pendingInputRef.current) pendingInputRef.current.focus(); }, [pendingItem]);

  const updateItemField = useCallback((id: string, field: string, value: unknown) => {
    let newItems = items.map(item => item.id === id ? { ...item, [field]: value } : item);
    if (field === 'isCorrect' && value === true) {
      newItems = newItems.map(item => item.id === id ? item : { ...item, isCorrect: false });
    }
    onDataChange({ ...content, items: newItems });
  }, [items, content, onDataChange]);

  const confirmPendingItem = () => {
    const text = pendingText.trim();
    if (text) onDataChange({ ...content, items: [...items, { id: `mc-${Date.now()}`, text, isCorrect: false }] });
    setPendingItem(false);
    setPendingText('');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePendingBlur = useCallback((e: React.FocusEvent) => {
    if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget as Node)) confirmPendingItem();
  }, [pendingText, items, content, onDataChange]);

  const removeItem = (id: string) => { onDataChange({ ...content, items: items.filter(item => item.id !== id) }); setDeleteConfirmId(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="mb-4 cursor-text">
        <EditableText value={String(content.question || '')} onChange={(v) => onDataChange({ ...content, question: v })} tag="h3" className="text-lg font-semibold" placeholder="Enter question..." multiline={false} />
      </div>
      <p className="text-sm text-gray-500 mb-3">Select one correct answer</p>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 p-4 border-2 rounded-lg transition-all group/opt border-gray-200 hover:border-gray-300 bg-white">
            <button onClick={() => updateItemField(item.id, 'isCorrect', !item.isCorrect)} className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${item.isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-[#9F80DA]'}`}>
              {item.isCorrect && <Circle className="w-2 h-2 fill-white" />}
            </button>
            <div className="flex-1 min-w-0 cursor-text">
              <EditableText value={item.text} onChange={(v) => updateItemField(item.id, 'text', v)} tag="span" className="text-gray-900" placeholder="Option text..." multiline={false} />
            </div>
            {deleteConfirmId === item.id ? (
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => removeItem(item.id)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                <button onClick={() => setDeleteConfirmId(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
              </div>
            ) : items.length > 1 && (
              <button onClick={() => setDeleteConfirmId(item.id)} className="flex-shrink-0 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            )}
          </div>
        ))}
        <div className="border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors">
          <div ref={pendingContainerRef} className="flex items-center gap-3 p-4" onBlur={pendingItem ? handlePendingBlur : undefined}>
            <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-200" />
            <div className="flex-1">
              {pendingItem ? (
                <input ref={pendingInputRef} type="text" value={pendingText} onChange={(e) => setPendingText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') confirmPendingItem(); if (e.key === 'Escape') { setPendingItem(false); setPendingText(''); } }} className="w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 rounded-sm" placeholder="Option text..." />
              ) : (
                <button onClick={() => setPendingItem(true)} className="text-gray-400 hover:text-gray-500 transition-colors">New option</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FillInTheBlank: Notion-style inline editing ────────────────────

function EditableFillInBlankBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ id: string; text: string; answers: string[] }>) || [];
  const [deleteItemConfirmId, setDeleteItemConfirmId] = useState<string | null>(null);
  const [deleteAnswerKey, setDeleteAnswerKey] = useState<string | null>(null);

  const updateItem = useCallback((id: string, field: string, value: unknown) => {
    onDataChange({ ...content, items: items.map(item => item.id === id ? { ...item, [field]: value } : item) });
  }, [items, content, onDataChange]);

  const updateAnswer = useCallback((itemId: string, ansIdx: number, value: string) => {
    const newItems = items.map(item => {
      if (item.id !== itemId) return item;
      const newAnswers = [...item.answers]; newAnswers[ansIdx] = value;
      return { ...item, answers: newAnswers };
    });
    onDataChange({ ...content, items: newItems });
  }, [items, content, onDataChange]);

  const addItem = () => { onDataChange({ ...content, items: [...items, { id: `fib-${Date.now()}`, text: '', answers: [''] }] }); };
  const addAnswer = (itemId: string) => { onDataChange({ ...content, items: items.map(item => item.id === itemId ? { ...item, answers: [...item.answers, ''] } : item) }); };
  const removeItem = (id: string) => { onDataChange({ ...content, items: items.filter(item => item.id !== id) }); setDeleteItemConfirmId(null); };
  const removeAnswer = (itemId: string, ansIdx: number) => { onDataChange({ ...content, items: items.map(item => item.id === itemId ? { ...item, answers: item.answers.filter((_, i) => i !== ansIdx) } : item) }); setDeleteAnswerKey(null); };

  return (
    <div className="w-full p-4 rounded-lg space-y-4">
      {items.map((item, idx) => (
        <div key={item.id} className="p-4 border-2 border-gray-200 rounded-lg group/fib hover:border-gray-300">
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-gray-400 pt-1">{idx + 1}.</span>
            <div className="flex-1 cursor-text">
              <EditableText value={item.text} onChange={(v) => updateItem(item.id, 'text', v)} tag="p" className="text-gray-900" placeholder="Text with ___ for blanks..." />
            </div>
            {deleteItemConfirmId === item.id ? (
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => removeItem(item.id)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                <button onClick={() => setDeleteItemConfirmId(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
              </div>
            ) : (
              <button onClick={() => setDeleteItemConfirmId(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            )}
          </div>
          <div className="mt-3 pl-6 space-y-1">
            <p className="text-xs font-medium text-gray-500 mb-1">Correct answers:</p>
            {item.answers.map((ans, ansIdx) => {
              const ansKey = `${item.id}-${ansIdx}`;
              return (
                <div key={ansIdx} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <BlurInput value={ans} onSave={(v) => updateAnswer(item.id, ansIdx, v)} className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="Answer..." />
                  {item.answers.length > 1 && (
                    deleteAnswerKey === ansKey ? (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => removeAnswer(item.id, ansIdx)} className="px-1.5 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                        <button onClick={() => setDeleteAnswerKey(null)} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteAnswerKey(ansKey)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                    )
                  )}
                </div>
              );
            })}
            <div onClick={() => addAnswer(item.id)} className="px-3 py-1.5 border border-dashed border-gray-300 rounded hover:border-[#9F80DA] transition-colors cursor-pointer text-xs text-gray-400 hover:text-[#9F80DA]">New answer...</div>
          </div>
        </div>
      ))}
      <div onClick={addItem} className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New blank item...</div>
    </div>
  );
}

// ─── MatchingPairs: Notion-style inline editing ─────────────────────

function EditableMatchingPairsBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const itemsA = (content.itemsA as Array<{ id: string; text: string; matchingNumber: number }>) || [];
  const itemsB = (content.itemsB as Array<{ id: string; text: string; matchingNumber: number }>) || [];
  const [pendingActive, setPendingActive] = useState(false);
  const [pendingLeft, setPendingLeft] = useState('');
  const [pendingRight, setPendingRight] = useState('');
  const pendingLeftRef = useRef<HTMLInputElement>(null);
  const pendingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (pendingActive && pendingLeftRef.current) pendingLeftRef.current.focus(); }, [pendingActive]);

  const updateA = useCallback((id: string, value: string) => {
    onDataChange({ ...content, itemsA: itemsA.map(i => i.id === id ? { ...i, text: value } : i) });
  }, [itemsA, content, onDataChange]);

  const updateB = useCallback((id: string, value: string) => {
    onDataChange({ ...content, itemsB: itemsB.map(i => i.id === id ? { ...i, text: value } : i) });
  }, [itemsB, content, onDataChange]);

  const confirmPending = () => {
    const left = pendingLeft.trim();
    const right = pendingRight.trim();
    if (left || right) {
      const num = Math.max(0, ...itemsA.map(i => i.matchingNumber), ...itemsB.map(i => i.matchingNumber)) + 1;
      const ts = Date.now();
      onDataChange({ ...content, itemsA: [...itemsA, { id: `a-${ts}`, text: left, matchingNumber: num }], itemsB: [...itemsB, { id: `b-${ts}`, text: right, matchingNumber: num }] });
    }
    setPendingActive(false);
    setPendingLeft('');
    setPendingRight('');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePendingBlur = useCallback((e: React.FocusEvent) => {
    if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget as Node)) confirmPending();
  }, [pendingLeft, pendingRight, itemsA, itemsB, content, onDataChange]);

  const removePair = (matchNum: number) => {
    onDataChange({ ...content, itemsA: itemsA.filter(i => i.matchingNumber !== matchNum), itemsB: itemsB.filter(i => i.matchingNumber !== matchNum) });
  };

  const pairs = itemsA.map(a => ({ a, b: itemsB.find(b => b.matchingNumber === a.matchingNumber) }));

  return (
    <div className="w-full p-4 rounded-lg space-y-2">
      <div className="flex gap-4 text-sm font-medium text-gray-500 px-2">
        <span className="flex-1">Column A</span><span className="w-6" /><span className="flex-1">Column B</span><span className="w-6" />
      </div>
      {pairs.map(({ a, b }) => (
        <div key={a.id} className="flex items-center gap-4 group/pair">
          <div className="flex-1 cursor-text">
            <EditableText value={a.text} onChange={(v) => updateA(a.id, v)} tag="div" className="p-3 border-2 border-gray-200 rounded-lg text-sm hover:border-gray-300" placeholder="Left item..." multiline={false} />
          </div>
          <span className="text-gray-400 flex-shrink-0">↔</span>
          <div className="flex-1 cursor-text">
            {b && <EditableText value={b.text} onChange={(v) => updateB(b.id, v)} tag="div" className="p-3 border-2 border-gray-200 rounded-lg text-sm hover:border-gray-300" placeholder="Right item..." multiline={false} />}
          </div>
          <button onClick={() => removePair(a.matchingNumber)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      {/* New pair placeholder */}
      <div ref={pendingContainerRef} className="flex items-center gap-4" onBlur={pendingActive ? handlePendingBlur : undefined}>
        <div className="flex-1">
          {pendingActive ? (
            <input ref={pendingLeftRef} type="text" value={pendingLeft} onChange={(e) => setPendingLeft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') { setPendingActive(false); setPendingLeft(''); setPendingRight(''); } }} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]" placeholder="Left item..." />
          ) : (
            <div onClick={() => setPendingActive(true)} className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer hover:border-[#9F80DA] transition-colors">Left item...</div>
          )}
        </div>
        <span className="text-gray-300 flex-shrink-0">↔</span>
        <div className="flex-1">
          {pendingActive ? (
            <input type="text" value={pendingRight} onChange={(e) => setPendingRight(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') confirmPending(); if (e.key === 'Escape') { setPendingActive(false); setPendingLeft(''); setPendingRight(''); } }} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]" placeholder="Right item..." />
          ) : (
            <div onClick={() => setPendingActive(true)} className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer hover:border-[#9F80DA] transition-colors">Right item...</div>
          )}
        </div>
        <div className="w-6" />
      </div>
    </div>
  );
}

// ─── SortingCategories: Notion-style inline editing ─────────────────

function EditableSortingCategoriesBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
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

// ─── TwoField: Generic two-field comparison ─────────────────────────

function EditableTwoFieldBlock({ content, onDataChange, fieldA, fieldB, labelA, labelB, colorA, colorB }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; fieldA: string; fieldB: string; labelA: string; labelB: string; colorA: string; colorB: string }) {
  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className={`flex-1 p-4 rounded-lg ${colorA} cursor-text`}>
          <p className="text-xs font-semibold text-gray-500 mb-2">{labelA}</p>
          <EditableText value={String(content[fieldA] || '')} onChange={(v) => onDataChange({ ...content, [fieldA]: v })} tag="p" className="text-sm text-gray-700" placeholder={`Enter ${labelA.toLowerCase()}...`} />
        </div>
        <div className={`flex-1 p-4 rounded-lg ${colorB} cursor-text`}>
          <p className="text-xs font-semibold text-gray-500 mb-2">{labelB}</p>
          <EditableText value={String(content[fieldB] || '')} onChange={(v) => onDataChange({ ...content, [fieldB]: v })} tag="p" className="text-sm text-gray-700" placeholder={`Enter ${labelB.toLowerCase()}...`} />
        </div>
      </div>
    </div>
  );
}

// ─── TwoList: Generic two-list comparison ───────────────────────────

function TwoListColumnEditor({ items, colConfig, content, onDataChange, variant }: { items: string[]; colConfig: TwoListColumnConfig; content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; variant: 'bordered' | 'filled' | 'header-bar' }) {
  const [pendingActive, setPendingActive] = useState(false);
  const [pendingText, setPendingText] = useState('');
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const pendingRef = useRef<HTMLInputElement>(null);
  const { field, label, icon: Icon, iconBg, iconColor, labelColor, bg, borderColor, bulletColor, headerBar, headerBarBg } = colConfig;

  useEffect(() => { if (pendingActive && pendingRef.current) pendingRef.current.focus(); }, [pendingActive]);

  const update = (idx: number, value: string) => { const n = [...items]; n[idx] = value; onDataChange({ ...content, [field]: n }); };
  const remove = (idx: number) => onDataChange({ ...content, [field]: items.filter((_, i) => i !== idx) });
  const confirmPending = () => {
    const text = pendingText.trim();
    if (text) onDataChange({ ...content, [field]: [...items, text] });
    setPendingActive(false);
    setPendingText('');
  };

  // Header-bar variant (BeforeAfter)
  if (variant === 'header-bar') {
    return (
      <div className="flex-1 overflow-hidden rounded-lg">
        <div className={`${headerBarBg} text-white text-center py-2 font-semibold`}>{label}</div>
        <div className={`p-4 ${bg}`}>
          <ul className="space-y-3">
            {items.map((item, idx) => (
              <li key={idx} className="relative flex items-start gap-2 group/li">
                <div className="flex-1 cursor-text">
                  <EditableText value={item} onChange={(v) => update(idx, v)} tag="p" className="text-sm text-gray-600" placeholder="New item..." multiline={false} />
                </div>
                {deleteConfirmIdx === idx ? (
                  <div className="absolute right-0 top-0 flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 whitespace-nowrap">
                    <span className="text-xs text-red-600 font-medium">Delete?</span>
                    <button onClick={() => { remove(idx); setDeleteConfirmIdx(null); }} className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors">Yes</button>
                    <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-400 hover:text-red-500 mt-0.5"><Trash2 className="w-3 h-3" /></button>
                )}
              </li>
            ))}
          </ul>
          {pendingActive ? (
            <input ref={pendingRef} type="text" value={pendingText} onChange={(e) => setPendingText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') confirmPending(); if (e.key === 'Escape') { setPendingActive(false); setPendingText(''); } }} onBlur={confirmPending} className="w-full mt-3 px-3 py-1.5 text-sm bg-white/50 border border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]" placeholder="New item..." />
          ) : (
            <div onClick={() => setPendingActive(true)} className="mt-3 px-3 py-1.5 text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors">New item...</div>
          )}
        </div>
      </div>
    );
  }

  // Bordered variant (DosDonts) or filled variant (ProsCons)
  const wrapperClass = variant === 'bordered'
    ? `flex-1 p-4 rounded-lg border-2 ${borderColor} ${bg}`
    : `flex-1 p-4 rounded-lg ${bg}`;

  return (
    <div className={wrapperClass}>
      <div className="flex items-center gap-2 mb-3">
        {Icon && (
          <div className={`w-6 h-6 ${variant === 'filled' ? 'w-8 h-8 rounded-full' : 'rounded'} ${iconBg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
        )}
        <span className={`font-semibold ${labelColor || 'text-gray-700'}`}>{label}</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="relative flex items-start gap-2 group/li">
            {bulletColor && <span className={`${bulletColor} mt-0.5`}>&#8226;</span>}
            <div className="flex-1 cursor-text">
              <EditableText value={item} onChange={(v) => update(idx, v)} tag="p" className="text-sm text-gray-600" placeholder="New item..." multiline={false} />
            </div>
            {deleteConfirmIdx === idx ? (
              <div className="absolute right-0 top-0 flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 whitespace-nowrap">
                <span className="text-xs text-red-600 font-medium">Delete?</span>
                <button onClick={() => { remove(idx); setDeleteConfirmIdx(null); }} className="px-2 py-0.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors">Yes</button>
                <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors">No</button>
              </div>
            ) : (
              <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-400 hover:text-red-500 mt-0.5"><Trash2 className="w-3 h-3" /></button>
            )}
          </li>
        ))}
      </ul>
      {pendingActive ? (
        <input ref={pendingRef} type="text" value={pendingText} onChange={(e) => setPendingText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') confirmPending(); if (e.key === 'Escape') { setPendingActive(false); setPendingText(''); } }} onBlur={confirmPending} className="w-full mt-2 px-3 py-1.5 text-sm bg-white/50 border border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]" placeholder="New item..." />
      ) : (
        <div onClick={() => setPendingActive(true)} className="mt-2 px-3 py-1.5 text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors">New item...</div>
      )}
    </div>
  );
}

function EditableTwoListBlock({ content, onDataChange, config }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; config: TwoListConfig }) {
  const leftItems = (content[config.left.field] as string[]) || [];
  const rightItems = (content[config.right.field] as string[]) || [];

  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TwoListColumnEditor items={leftItems} colConfig={config.left} content={content} onDataChange={onDataChange} variant={config.variant} />
        <TwoListColumnEditor items={rightItems} colConfig={config.right} content={content} onDataChange={onDataChange} variant={config.variant} />
      </div>
    </div>
  );
}

// ─── ComparisonItems: items with title/content ──────────────────────

function EditableComparisonItemsBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ title: string; content: string }>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const headerColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const newItems = [...items]; newItems[idx] = { ...newItems[idx], [field]: value };
    onDataChange({ ...content, items: newItems });
  }, [items, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, items: [...items, { title: '', content: '' }] });
  const removeItem = (idx: number) => { onDataChange({ ...content, items: items.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden group/ci hover:border-gray-300">
            {/* Colored header */}
            <div className={`${headerColors[idx % headerColors.length]} px-4 py-3 flex items-center gap-2`}>
              <div className="flex-1 cursor-text">
                <EditableText value={item.title} onChange={(v) => updateItem(idx, 'title', v)} tag="h3" className="font-semibold text-white" style={{ color: '#ffffff' }} placeholder="Title..." multiline={false} />
              </div>
              {items.length > 1 && (
                deleteConfirmIdx === idx ? (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => removeItem(idx)} className="px-2 py-0.5 text-xs text-white bg-red-700 rounded">Yes</button>
                    <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-white bg-white/30 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmIdx(idx)} className="text-white/60 hover:text-white flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                )
              )}
            </div>
            {/* Content */}
            <div className="p-4 cursor-text">
              <EditableText value={item.content} onChange={(v) => updateItem(idx, 'content', v)} tag="p" className="text-sm text-gray-600" placeholder="Content..." />
            </div>
          </div>
        ))}
        {/* Placeholder card */}
        <div onClick={addItem} className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-[#9F80DA] transition-colors cursor-pointer flex items-center justify-center min-h-[120px]">
          <div className="text-center text-gray-400">
            <Plus className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">New item</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Chat: messages with sender/receiver ────────────────────────────

function EditableChatBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const messages = (content.messages as Array<{ participantId: string; text: string }>) || [];
  const sender = (content.sender as { name: string }) || { name: '' };
  const receiver = (content.receiver as { name: string }) || { name: '' };

  const updateMessage = useCallback((idx: number, field: string, value: string) => {
    const n = [...messages]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, messages: n });
  }, [messages, content, onDataChange]);

  const toggleParticipant = (idx: number) => {
    const n = [...messages]; n[idx] = { ...n[idx], participantId: messages[idx].participantId === 'sender' ? 'receiver' : 'sender' };
    onDataChange({ ...content, messages: n });
  };

  const addMessage = () => {
    const last = messages.length > 0 ? messages[messages.length - 1].participantId : 'sender';
    onDataChange({ ...content, messages: [...messages, { participantId: last === 'sender' ? 'receiver' : 'sender', text: '' }] });
  };

  const removeMessage = (idx: number) => { onDataChange({ ...content, messages: messages.filter((_, i) => i !== idx) }); };

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-500">Sender</label>
          <div className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg">
            <EditableText value={sender.name} onChange={(v) => onDataChange({ ...content, sender: { ...sender, name: v } })} tag="span" className="text-sm" placeholder="Sender name..." multiline={false} />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-500">Receiver</label>
          <div className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg">
            <EditableText value={receiver.name} onChange={(v) => onDataChange({ ...content, receiver: { ...receiver, name: v } })} tag="span" className="text-sm" placeholder="Receiver name..." multiline={false} />
          </div>
        </div>
      </div>
      {messages.map((msg, idx) => {
        const isSender = msg.participantId === 'sender';
        return (
          <div key={idx} className={`flex ${isSender ? 'justify-start' : 'justify-end'} group/msg`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${isSender ? 'bg-blue-100' : 'bg-green-100'}`}>
              <button onClick={() => toggleParticipant(idx)} className="text-xs font-medium text-gray-500 mb-1 hover:text-[#9F80DA]">{isSender ? sender.name || 'Sender' : receiver.name || 'Receiver'} ↔</button>
              <div className="cursor-text">
                <EditableText value={msg.text} onChange={(v) => updateMessage(idx, 'text', v)} tag="p" className="text-sm text-gray-900" placeholder="Message text..." />
              </div>
              <button onClick={() => removeMessage(idx)} className="text-xs text-gray-400 hover:text-red-500 mt-1">Remove</button>
            </div>
          </div>
        );
      })}
      <div onClick={addMessage} className="max-w-[80%] p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New message...</div>
    </div>
  );
}

// ─── ChatQA: question/answer pairs (ChatQuestionWallBlock) ──────────

function EditableChatQABlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ question: string; answer: string }>) || [];

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const n = [...items]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, items: n });
  }, [items, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, items: [...items, { question: '', answer: '' }] });
  const removeItem = (idx: number) => onDataChange({ ...content, items: items.filter((_, i) => i !== idx) });

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="space-y-2 group/qa">
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-purple-100 cursor-text">
              <p className="text-xs font-medium text-purple-600 mb-1">Question</p>
              <EditableText value={item.question} onChange={(v) => updateItem(idx, 'question', v)} tag="p" className="text-sm text-gray-900" placeholder="Question..." />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] p-3 rounded-lg bg-green-100 cursor-text">
              <p className="text-xs font-medium text-green-600 mb-1">Answer</p>
              <EditableText value={item.answer} onChange={(v) => updateItem(idx, 'answer', v)} tag="p" className="text-sm text-gray-900" placeholder="Answer..." />
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={() => removeItem(idx)} className="text-xs text-gray-400 hover:text-red-500">Remove pair</button>
          </div>
        </div>
      ))}
      <div onClick={addItem} className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New Q&A pair...</div>
    </div>
  );
}

// ─── ChatDialog: left/right messages ────────────────────────────────

function EditableChatDialogBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const messages = (content.messages as Array<{ text: string; isLeft?: boolean }>) || [];

  const updateMessage = useCallback((idx: number, value: string) => {
    const n = [...messages]; n[idx] = { ...n[idx], text: value };
    onDataChange({ ...content, messages: n });
  }, [messages, content, onDataChange]);

  const toggleSide = (idx: number) => {
    const n = [...messages]; n[idx] = { ...n[idx], isLeft: !n[idx].isLeft };
    onDataChange({ ...content, messages: n });
  };

  const addMessage = () => {
    const lastIsLeft = messages.length > 0 ? messages[messages.length - 1].isLeft : true;
    onDataChange({ ...content, messages: [...messages, { text: '', isLeft: !lastIsLeft }] });
  };

  const removeMessage = (idx: number) => { onDataChange({ ...content, messages: messages.filter((_, i) => i !== idx) }); };

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.isLeft ? 'justify-start' : 'justify-end'} group/dlg`}>
          <div className={`max-w-[80%] p-3 rounded-lg ${msg.isLeft ? 'bg-gray-100' : 'bg-blue-100'}`}>
            <button onClick={() => toggleSide(idx)} className="text-xs text-gray-500 hover:text-[#9F80DA] mb-1">{msg.isLeft ? 'Left' : 'Right'} ↔</button>
            <div className="cursor-text">
              <EditableText value={msg.text} onChange={(v) => updateMessage(idx, v)} tag="p" className="text-sm text-gray-900" placeholder="Message..." />
            </div>
            <button onClick={() => removeMessage(idx)} className="text-xs text-gray-400 hover:text-red-500 mt-1">Remove</button>
          </div>
        </div>
      ))}
      <div onClick={addMessage} className="max-w-[80%] p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New message...</div>
    </div>
  );
}

// ─── Timeline: vertical timeline with line + dots ───────────────────

function EditableTimelineBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const events = (content.events as Array<Record<string, unknown>>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  const updateEvent = useCallback((idx: number, field: string, value: string) => {
    const n = [...events]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, events: n });
  }, [events, content, onDataChange]);

  const addEvent = () => { onDataChange({ ...content, events: [...events, { id: `ev-${Date.now()}`, title: '', description: '', date: '' }] }); };
  const removeEvent = (idx: number) => { onDataChange({ ...content, events: events.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="relative ml-4 pl-6 border-l-2 border-gray-300 space-y-6">
        {events.map((event, idx) => (
          <div key={String(event.id || idx)} className="relative group/ev">
            {/* Dot on the line */}
            <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#9F80DA] border-2 border-white" />
            <div className="flex items-start gap-2">
              <div className="flex-1 cursor-text space-y-1">
                <EditableText value={String(event.date || '')} onChange={(v) => updateEvent(idx, 'date', v)} tag="span" className="text-xs text-gray-500" placeholder="Date..." multiline={false} />
                <EditableText value={String(event.title || '')} onChange={(v) => updateEvent(idx, 'title', v)} tag="p" className="font-medium text-gray-900" placeholder="Event title..." multiline={false} />
                <EditableText value={String(event.description || '')} onChange={(v) => updateEvent(idx, 'description', v)} tag="p" className="text-sm text-gray-600" placeholder="Description..." />
              </div>
              {deleteConfirmIdx === idx ? (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => removeEvent(idx)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                  <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                </div>
              ) : events.length > 1 && (
                <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-300 hover:text-red-500 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
              )}
            </div>
          </div>
        ))}
        {/* Placeholder event */}
        <div className="relative cursor-pointer" onClick={addEvent}>
          <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
          <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors">
            <p className="text-sm text-gray-400">New event...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FlashCard: card-like UI ────────────────────────────────────────

function EditableFlashCardBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<Record<string, unknown>>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const n = [...items]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, items: n });
  }, [items, content, onDataChange]);

  const addItem = () => { onDataChange({ ...content, items: [...items, { id: `fc-${Date.now()}`, question: '', answer: '' }] }); };
  const removeItem = (idx: number) => { onDataChange({ ...content, items: items.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      {items.map((item, idx) => (
        <div key={String(item.id || idx)} className="border-2 border-gray-200 rounded-lg overflow-hidden group/fc hover:border-gray-300">
          {/* Front (question) */}
          <div className="p-4 bg-white cursor-text">
            <p className="text-xs font-medium text-[#9F80DA] mb-1">Front</p>
            <EditableText value={String(item.question || '')} onChange={(v) => updateItem(idx, 'question', v)} tag="p" className="font-medium text-gray-900" placeholder="Question..." />
          </div>
          {/* Back (answer) */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 cursor-text">
            <p className="text-xs font-medium text-gray-400 mb-1">Back</p>
            <EditableText value={String(item.answer || '')} onChange={(v) => updateItem(idx, 'answer', v)} tag="p" className="text-sm text-gray-600" placeholder="Answer..." />
          </div>
          {/* Delete */}
          {items.length > 1 && (
            <div className="flex justify-end px-3 py-1.5 bg-gray-50 border-t border-gray-100">
              {deleteConfirmIdx === idx ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-red-600">Delete?</span>
                  <button onClick={() => removeItem(idx)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                  <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              )}
            </div>
          )}
        </div>
      ))}
      {/* Placeholder card */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[#9F80DA] transition-colors" onClick={addItem}>
        <p className="text-sm text-gray-400 text-center">New card...</p>
      </div>
    </div>
  );
}

// ─── Testimonial: card grid ─────────────────────────────────────────

function EditableTestimonialBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const testimonials = (content.testimonials as Array<Record<string, unknown>>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const n = [...testimonials]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, testimonials: n });
  }, [testimonials, content, onDataChange]);

  const addItem = () => { onDataChange({ ...content, testimonials: [...testimonials, { id: `test-${Date.now()}`, content: '', name: '', role: '', avatar: '' }] }); };
  const removeItem = (idx: number) => { onDataChange({ ...content, testimonials: testimonials.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {testimonials.map((item, idx) => (
          <div key={String(item.id || idx)} className="relative border border-gray-200 rounded-lg p-4 group/test hover:border-gray-300">
            <span className="text-2xl text-gray-200 block mb-2">&ldquo;</span>
            <div className="cursor-text mb-3">
              <EditableText value={String(item.content || '')} onChange={(v) => updateItem(idx, 'content', v)} tag="p" className="text-sm text-gray-700 italic" placeholder="Testimonial text..." />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden cursor-pointer flex-shrink-0" onClick={() => setShowPicker(idx)}>
                {item.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={String(item.avatar)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Av</div>
                )}
              </div>
              <div className="flex-1 cursor-text">
                <EditableText value={String(item.name || '')} onChange={(v) => updateItem(idx, 'name', v)} tag="p" className="text-sm font-medium text-gray-900" placeholder="Name..." multiline={false} />
                <EditableText value={String(item.role || '')} onChange={(v) => updateItem(idx, 'role', v)} tag="p" className="text-xs text-gray-500" placeholder="Role..." multiline={false} />
              </div>
            </div>
            {/* Delete */}
            {testimonials.length > 1 && (
              <div className="absolute top-2 right-2">
                {deleteConfirmIdx === idx ? (
                  <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <button onClick={() => removeItem(idx)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                    <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmIdx(idx)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                )}
              </div>
            )}
          </div>
        ))}
        {/* Placeholder card */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[#9F80DA] transition-colors flex items-center justify-center min-h-[120px]" onClick={addItem}>
          <p className="text-sm text-gray-400">New testimonial...</p>
        </div>
      </div>
      {showPicker !== null && (
        <ImagePickerModal currentUrl={String(testimonials[showPicker]?.avatar || '')} onSelect={(url) => { updateItem(showPicker, 'avatar', url); setShowPicker(null); }} onClose={() => setShowPicker(null)} />
      )}
    </div>
  );
}

// ─── ItemsBlock: Generic configurable items ─────────────────────────

function EditableItemsBlock({ content, onDataChange, field, fieldA, fieldB, fieldC, labelA, labelB, labelC, title, placeholderLabel }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; field: string; fieldA: string; fieldB: string; fieldC?: string; labelA: string; labelB: string; labelC?: string; title: string; placeholderLabel: string }) {
  const items = (content[field] as Array<Record<string, unknown>>) || [];

  const updateItem = useCallback((idx: number, key: string, value: string) => {
    const n = [...items]; n[idx] = { ...n[idx], [key]: value };
    onDataChange({ ...content, [field]: n });
  }, [items, content, onDataChange, field]);

  const addItem = () => {
    const newItem: Record<string, unknown> = { id: `item-${Date.now()}`, [fieldA]: '', [fieldB]: '' };
    if (fieldC) newItem[fieldC] = '';
    onDataChange({ ...content, [field]: [...items, newItem] });
  };

  const removeItem = (idx: number) => { onDataChange({ ...content, [field]: items.filter((_, i) => i !== idx) }); };

  return (
    <div className="w-full p-4 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-500 mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={String(item.id || idx)} className="p-4 border-2 border-gray-200 rounded-lg group/gi hover:border-gray-300">
            <div className="flex items-start gap-2">
              <div className="flex-1 cursor-text space-y-1">
                <EditableText value={String(item[fieldA] || '')} onChange={(v) => updateItem(idx, fieldA, v)} tag="p" className="font-medium text-gray-900" placeholder={labelA} multiline={false} />
                <EditableText value={String(item[fieldB] || '')} onChange={(v) => updateItem(idx, fieldB, v)} tag="p" className="text-sm text-gray-600" placeholder={labelB} />
                {fieldC && labelC && <EditableText value={String(item[fieldC] || '')} onChange={(v) => updateItem(idx, fieldC, v)} tag="p" className="text-xs text-gray-500" placeholder={labelC} multiline={false} />}
              </div>
              {items.length > 1 && <button onClick={() => removeItem(idx)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
            </div>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="flex items-center gap-1 text-sm text-[#9F80DA] hover:text-[#8A6BC5] font-medium mt-3"><Plus className="w-4 h-4" /> {placeholderLabel}</button>
    </div>
  );
}

// ─── Reviews: star-rated reviews ────────────────────────────────────

function EditableReviewsBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const reviews = (content.reviews as Array<{ name: string; rating: number; comment: string; avatar?: string }>) || [];
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const updateReview = useCallback((idx: number, field: string, value: unknown) => {
    const n = [...reviews]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, reviews: n });
  }, [reviews, content, onDataChange]);

  const addReview = () => { onDataChange({ ...content, reviews: [...reviews, { name: '', rating: 5, comment: '', avatar: '' }] }); };
  const removeReview = (idx: number) => { onDataChange({ ...content, reviews: reviews.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      {reviews.map((review, idx) => (
        <div key={idx} className="p-4 border-2 border-gray-200 rounded-lg group/rev hover:border-gray-300">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden cursor-pointer flex-shrink-0" onClick={() => setShowPicker(idx)}>
              {review.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={review.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Av</div>
              )}
            </div>
            <div className="flex-1 cursor-text space-y-2">
              <EditableText value={review.name} onChange={(v) => updateReview(idx, 'name', v)} tag="p" className="font-medium text-gray-900" placeholder="Reviewer name..." multiline={false} />
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => updateReview(idx, 'rating', n)}>
                    <Star className={`w-4 h-4 ${n <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
              <EditableText value={review.comment} onChange={(v) => updateReview(idx, 'comment', v)} tag="p" className="text-sm text-gray-600" placeholder="Review text..." />
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
      {/* Placeholder review */}
      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#9F80DA] transition-colors" onClick={addReview}>
        <p className="text-sm text-gray-400 text-center">New review...</p>
      </div>
      {showPicker !== null && (
        <ImagePickerModal currentUrl={reviews[showPicker]?.avatar || ''} onSelect={(url) => { updateReview(showPicker, 'avatar', url); setShowPicker(null); }} onClose={() => setShowPicker(null)} />
      )}
    </div>
  );
}

// ─── Table: editable grid ───────────────────────────────────────────

function EditableTableBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const rows = (content.rows as number) || 2;
  const columns = (content.columns as number) || 2;
  const tableContent = (content.content as string[][]) || Array.from({ length: rows }, () => Array(columns).fill(''));
  const [deleteConfirmRow, setDeleteConfirmRow] = useState<number | null>(null);

  const updateCell = (r: number, c: number, value: string) => {
    const n = tableContent.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? value : cell) : [...row]);
    onDataChange({ ...content, content: n });
  };

  const addRow = () => { onDataChange({ ...content, content: [...tableContent, Array(columns).fill('')], rows: rows + 1 }); };
  const addColumn = () => { onDataChange({ ...content, content: tableContent.map(row => [...row, '']), columns: columns + 1 }); };
  const removeRow = (r: number) => { if (rows <= 1) return; onDataChange({ ...content, content: tableContent.filter((_, i) => i !== r), rows: rows - 1 }); setDeleteConfirmRow(null); };
  const removeColumn = (c: number) => { if (columns <= 1) return; onDataChange({ ...content, content: tableContent.map(row => row.filter((_, i) => i !== c)), columns: columns - 1 }); };

  return (
    <div className="w-full p-4 rounded-lg overflow-x-auto">
      <table className="w-full border-collapse">
        <tbody>
          {tableContent.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className={`border border-gray-200 px-3 py-2 cursor-text ${ri === 0 ? 'font-semibold bg-gray-50' : 'bg-white'}`}>
                  <EditableText value={cell} onChange={(v) => updateCell(ri, ci, v)} tag="span" className={`text-sm ${ri === 0 ? 'font-semibold' : ''}`} placeholder={ri === 0 ? 'Header...' : 'Cell...'} multiline={false} />
                </td>
              ))}
              <td className="border-0 w-8">
                {rows > 1 && (
                  deleteConfirmRow === ri ? (
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <button onClick={() => removeRow(ri)} className="px-1.5 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                      <button onClick={() => setDeleteConfirmRow(null)} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirmRow(ri)} className="text-gray-300 hover:text-red-500 px-1"><Trash2 className="w-3 h-3" /></button>
                  )
                )}
              </td>
            </tr>
          ))}
          {/* Placeholder row */}
          <tr>
            {Array.from({ length: columns }).map((_, ci) => (
              <td key={ci} className="border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-400 cursor-pointer hover:bg-gray-50" onClick={addRow}>
                {ci === 0 ? 'New row...' : ''}
              </td>
            ))}
            <td className="border-0 w-8" />
          </tr>
        </tbody>
      </table>
      <div className="flex gap-3 mt-2">
        <button onClick={addColumn} className="text-xs text-[#9F80DA] hover:text-[#8A6BC5] font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Column</button>
        {columns > 1 && <button onClick={() => removeColumn(columns - 1)} className="text-xs text-gray-400 hover:text-red-500 font-medium flex items-center gap-1"><Trash2 className="w-3 h-3" /> Last column</button>}
      </div>
    </div>
  );
}

// ─── Buttons ────────────────────────────────────────────────────────

function EditableButtonBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ id: string; text: string; url: string }>) || [];

  const updateItem = useCallback((id: string, field: string, value: string) => {
    onDataChange({ ...content, items: items.map(i => i.id === id ? { ...i, [field]: value } : i) });
  }, [items, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, items: [...items, { id: `btn-${Date.now()}`, text: '', url: '' }] });
  const removeItem = (id: string) => onDataChange({ ...content, items: items.filter(i => i.id !== id) });

  return (
    <div className="w-full p-4 rounded-lg space-y-2">
      {items.map(item => (
        <div key={item.id} className="flex items-center gap-3 group/btn">
          <div className="flex-1 space-y-2">
            <div className="inline-block px-6 py-2.5 bg-[#9F80DA] text-white rounded-full cursor-text">
              <EditableText value={item.text} onChange={(v) => updateItem(item.id, 'text', v)} tag="span" className="text-sm font-medium text-white" style={{ color: '#ffffff' }} placeholder="Button text..." multiline={false} />
            </div>
            <BlurInput value={item.url} onSave={(v) => updateItem(item.id, 'url', v)} placeholder="URL..." />
          </div>
          {items.length > 1 && <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
        </div>
      ))}
      <div onClick={addItem} className="inline-block px-6 py-2.5 border-2 border-dashed border-gray-300 rounded-full hover:border-[#9F80DA] transition-colors cursor-pointer text-sm text-gray-400 hover:text-[#9F80DA]">New button...</div>
    </div>
  );
}

function EditableButtonStackBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ text: string; description?: string; url: string }>) || [];

  const updateItem = useCallback((idx: number, field: string, value: string) => {
    const n = [...items]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, items: n });
  }, [items, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, items: [...items, { text: '', description: '', url: '' }] });
  const removeItem = (idx: number) => onDataChange({ ...content, items: items.filter((_, i) => i !== idx) });

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <div className="cursor-text mb-2">
        <EditableText value={String(content.title || '')} onChange={(v) => onDataChange({ ...content, title: v })} tag="h3" className="font-semibold text-gray-900" placeholder="Stack title..." multiline={false} />
      </div>
      {items.map((item, idx) => (
        <div key={idx} className="p-3 border-2 border-gray-200 rounded-lg group/bs hover:border-gray-300">
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-1">
              <div className="px-3 py-1.5 border border-gray-200 rounded cursor-text">
                <EditableText value={item.text} onChange={(v) => updateItem(idx, 'text', v)} tag="span" className="text-sm font-medium" placeholder="Button text..." multiline={false} />
              </div>
              <div className="px-3 py-1 border border-gray-200 rounded cursor-text">
                <EditableText value={item.description || ''} onChange={(v) => updateItem(idx, 'description', v)} tag="span" className="text-xs text-gray-500" placeholder="Description..." multiline={false} />
              </div>
              <BlurInput value={item.url} onSave={(v) => updateItem(idx, 'url', v)} className="w-full px-3 py-1 text-xs text-gray-400 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="URL..." />
            </div>
            {items.length > 1 && <button onClick={() => removeItem(idx)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
          </div>
        </div>
      ))}
      <div onClick={addItem} className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-center text-sm text-gray-400 hover:text-[#9F80DA]">New button...</div>
    </div>
  );
}

// ─── Media ──────────────────────────────────────────────────────────

function EditableMediaUrlBlock({ content, onDataChange, label }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; label: string }) {
  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
      <div className="px-3 py-2 border border-gray-200 rounded-lg cursor-text">
        <EditableText value={String(content.title || '')} onChange={(v) => onDataChange({ ...content, title: v })} tag="span" className="text-sm" placeholder="Title..." multiline={false} />
      </div>
      <BlurInput value={String(content.url || '')} onSave={(v) => onDataChange({ ...content, url: v })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder={`${label} URL...`} />
    </div>
  );
}

function EditableEmbedBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <h3 className="text-sm font-semibold text-gray-500">Embed</h3>
      <div className="px-3 py-2 border border-gray-200 rounded-lg cursor-text">
        <EditableText value={String(content.title || '')} onChange={(v) => onDataChange({ ...content, title: v })} tag="span" className="text-sm" placeholder="Title..." multiline={false} />
      </div>
      <BlurInput value={String(content.url || '')} onSave={(v) => onDataChange({ ...content, url: v })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="URL..." />
      <textarea value={String(content.html || '')} onChange={(e) => onDataChange({ ...content, html: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 font-mono" rows={4} placeholder="Embed HTML..." />
    </div>
  );
}

function EditableAttachmentBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const attachments = (content.attachments as Array<{ id: string; name: string; url: string }>) || [];

  const updateItem = useCallback((id: string, field: string, value: string) => {
    onDataChange({ ...content, attachments: attachments.map(a => a.id === id ? { ...a, [field]: value } : a) });
  }, [attachments, content, onDataChange]);

  const addItem = () => onDataChange({ ...content, attachments: [...attachments, { id: `att-${Date.now()}`, name: '', url: '' }] });
  const removeItem = (id: string) => onDataChange({ ...content, attachments: attachments.filter(a => a.id !== id) });

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase() || '';
    const colors: Record<string, string> = { pdf: 'text-red-500', doc: 'text-blue-500', docx: 'text-blue-500', xls: 'text-green-600', xlsx: 'text-green-600', ppt: 'text-orange-500', pptx: 'text-orange-500' };
    return colors[ext] || 'text-gray-400';
  };

  return (
    <div className="w-full p-4 rounded-lg space-y-2">
      {attachments.map(att => (
        <div key={att.id} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg group/att hover:border-gray-300">
          <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 ${getFileIcon(att.name)}`}>
            <span className="text-xs font-bold uppercase">{att.name.split('.').pop() || '?'}</span>
          </div>
          <div className="flex-1 space-y-1">
            <div className="px-3 py-1.5 border border-gray-200 rounded cursor-text">
              <EditableText value={att.name} onChange={(v) => updateItem(att.id, 'name', v)} tag="span" className="text-sm" placeholder="File name..." multiline={false} />
            </div>
            <BlurInput value={att.url} onSave={(v) => updateItem(att.id, 'url', v)} className="w-full px-3 py-1 text-xs text-gray-500 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30" placeholder="File URL..." />
          </div>
          {attachments.length > 1 && <button onClick={() => removeItem(att.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
        </div>
      ))}
      <div onClick={addItem} className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#9F80DA] transition-colors cursor-pointer text-sm text-gray-400 hover:text-[#9F80DA]">
        <div className="w-10 h-10 rounded-lg border border-dashed border-gray-300 flex items-center justify-center"><Plus className="w-4 h-4" /></div>
        New attachment...
      </div>
    </div>
  );
}

// ─── Carousel / Gallery ─────────────────────────────────────────────

function EditableCarouselBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const images = (content.images as Array<{ src: string; alt?: string; caption?: string }>) || [];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  const updateImage = useCallback((idx: number, field: string, value: string) => {
    const n = [...images]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, images: n });
  }, [images, content, onDataChange]);

  const addImage = () => {
    onDataChange({ ...content, images: [...images, { src: '', alt: '', caption: '' }] });
    setCurrentSlide(images.length);
  };
  const removeImage = (idx: number) => {
    onDataChange({ ...content, images: images.filter((_, i) => i !== idx) });
    setDeleteConfirmIdx(null);
    if (currentSlide >= images.length - 1) setCurrentSlide(Math.max(0, images.length - 2));
  };

  const current = images[currentSlide];

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      {/* Main slide preview */}
      {current && (
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <div className="w-full h-full cursor-pointer" onClick={() => setShowPicker(true)}>
            {current.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={current.src} alt={current.alt || ''} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon className="w-8 h-8" /></div>
            )}
          </div>
          {/* Caption overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-black/40 p-3 cursor-text">
            <EditableText value={current.caption || ''} onChange={(v) => updateImage(currentSlide, 'caption', v)} tag="span" className="text-sm text-white" style={{ color: '#ffffff' }} placeholder="Caption..." multiline={false} />
          </div>
          {/* Delete current slide */}
          {images.length > 1 && (
            <div className="absolute top-2 right-2">
              {deleteConfirmIdx === currentSlide ? (
                <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button onClick={() => removeImage(currentSlide)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                  <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirmIdx(currentSlide)} className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm"><Trash2 className="w-3 h-3" /></button>
              )}
            </div>
          )}
        </div>
      )}
      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2">
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentSlide ? 'bg-[#9F80DA]' : 'bg-gray-300 hover:bg-gray-400'}`} />
        ))}
        <button onClick={addImage} className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-[#9F80DA] hover:text-[#9F80DA] transition-colors">
          <Plus className="w-3 h-3" />
        </button>
      </div>
      {showPicker && current && (
        <ImagePickerModal currentUrl={current.src || ''} onSelect={(url) => { updateImage(currentSlide, 'src', url); setShowPicker(false); }} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}

function EditableGalleryBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const images = (content.images as Array<{ src: string; alt?: string }>) || [];
  const [showPicker, setShowPicker] = useState<number | null>(null);
  const [deleteConfirmIdx, setDeleteConfirmIdx] = useState<number | null>(null);

  const updateImage = useCallback((idx: number, field: string, value: string) => {
    const n = [...images]; n[idx] = { ...n[idx], [field]: value };
    onDataChange({ ...content, images: n });
  }, [images, content, onDataChange]);

  const addImage = () => onDataChange({ ...content, images: [...images, { src: '', alt: '' }] });
  const removeImage = (idx: number) => { onDataChange({ ...content, images: images.filter((_, i) => i !== idx) }); setDeleteConfirmIdx(null); };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, idx) => (
          <div key={idx} className="relative group/gimg">
            <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer" onClick={() => setShowPicker(idx)}>
              {img.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img.src} alt={img.alt || ''} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon className="w-8 h-8" /></div>
              )}
            </div>
            {images.length > 1 && (
              deleteConfirmIdx === idx ? (
                <div className="absolute top-1 right-1 flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button onClick={() => removeImage(idx)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                  <button onClick={() => setDeleteConfirmIdx(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirmIdx(idx)} className="absolute top-1 right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm"><Trash2 className="w-3 h-3" /></button>
              )
            )}
          </div>
        ))}
        <button onClick={addImage} className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-[#9F80DA] hover:text-[#9F80DA] transition-colors">
          <Plus className="w-6 h-6" />
        </button>
      </div>
      {showPicker !== null && (
        <ImagePickerModal currentUrl={images[showPicker]?.src || ''} onSelect={(url) => { updateImage(showPicker, 'src', url); setShowPicker(null); }} onClose={() => setShowPicker(null)} />
      )}
    </div>
  );
}

// ─── StoryTelling ───────────────────────────────────────────────────

function EditableStoryBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden cursor-pointer flex-shrink-0" onClick={() => setShowPicker(true)}>
          {content.avatarImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={String(content.avatarImage)} alt={String(content.avatarName || '')} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon className="w-6 h-6" /></div>
          )}
        </div>
        <div className="flex-1 space-y-1">
          <div className="cursor-text">
            <EditableText value={String(content.avatarName || '')} onChange={(v) => onDataChange({ ...content, avatarName: v })} tag="p" className="font-medium text-sm text-gray-700" placeholder="Character name..." multiline={false} />
          </div>
          {/* Speech bubble with pointer */}
          <div className="relative">
            <div className="absolute left-0 top-3 -ml-2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-gray-200 border-b-[6px] border-b-transparent" />
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-text ml-1">
              <EditableText value={String(content.text || '')} onChange={(v) => onDataChange({ ...content, text: v })} tag="p" className="text-sm text-gray-900" placeholder="Story text..." />
            </div>
          </div>
        </div>
      </div>
      {showPicker && (
        <ImagePickerModal currentUrl={String(content.avatarImage || '')} onSelect={(url) => { onDataChange({ ...content, avatarImage: url }); setShowPicker(false); }} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}

// ─── Columns ────────────────────────────────────────────────────────

function EditableColumnsBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const colCount = (content.columns as number) || 2;
  // Migration: if content.content is a string (old format), split into array
  const columnContent: string[] = Array.isArray(content.columnContent)
    ? (content.columnContent as string[])
    : typeof content.content === 'string'
      ? Array.from({ length: colCount }, (_, i) => i === 0 ? (content.content as string) : '')
      : Array.from({ length: colCount }, () => '');

  // Ensure array length matches column count
  const normalizedContent = Array.from({ length: colCount }, (_, i) => columnContent[i] || '');

  const updateColumn = (idx: number, value: string) => {
    const n = [...normalizedContent];
    n[idx] = value;
    onDataChange({ ...content, columnContent: n, content: n.join('\n\n') });
  };

  const changeColumnCount = (n: number) => {
    const newContent = Array.from({ length: n }, (_, i) => normalizedContent[i] || '');
    onDataChange({ ...content, columns: n, columnContent: newContent, content: newContent.join('\n\n') });
  };

  const gridClass = colCount === 1 ? 'grid-cols-1' : colCount === 2 ? 'grid-cols-2' : colCount === 3 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Columns:</span>
        {[1, 2, 3, 4].map(n => (
          <button key={n} onClick={() => changeColumnCount(n)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${colCount === n ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{n}</button>
        ))}
      </div>
      <div className={`grid ${gridClass} gap-4`}>
        {normalizedContent.map((col, idx) => (
          <div key={idx} className="p-3 border border-gray-200 rounded-lg cursor-text min-h-[4em]">
            <EditableText value={col} onChange={(v) => updateColumn(idx, v)} tag="div" className="text-sm text-gray-900 leading-relaxed" style={{ lineHeight: '1.6' }} placeholder={`Column ${idx + 1}...`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Scenario ───────────────────────────────────────────────────────

function EditableScenarioBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const answers = (content.answers as Array<{ id: string; text: string; order: number; isCorrect: boolean }>) || [];
  const [showPicker, setShowPicker] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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
      {/* Image with question overlay */}
      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
        <div className="w-full h-full cursor-pointer" onClick={() => setShowPicker(true)}>
          {content.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={String(content.image)} alt="Scenario" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 gap-2"><ImageIcon className="w-8 h-8" /> Click to set image</div>
          )}
        </div>
        {/* Question overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-black/50 p-4 cursor-text">
          <EditableText value={String(content.question || '')} onChange={(v) => onDataChange({ ...content, question: v })} tag="h3" className="text-lg font-semibold text-white" style={{ color: '#ffffff' }} placeholder="Scenario question..." />
        </div>
      </div>
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
      {showPicker && (
        <ImagePickerModal currentUrl={String(content.image || '')} onSelect={(url) => { onDataChange({ ...content, image: url }); setShowPicker(false); }} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}

// ─── LabeledImage: image with positioned pin labels ─────────────────

function EditableLabeledImageBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const labels = (content.labels as Array<{ id: string; text: string; x: number; y: number }>) || [];
  const [showPicker, setShowPicker] = useState(false);
  const [editingPinId, setEditingPinId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const updateLabel = useCallback((id: string, field: string, value: unknown) => {
    onDataChange({ ...content, labels: labels.map(l => l.id === id ? { ...l, [field]: value } : l) });
  }, [labels, content, onDataChange]);

  const addPin = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    const newId = `pin-${Date.now()}`;
    onDataChange({ ...content, labels: [...labels, { id: newId, text: '', x, y }] });
    setEditingPinId(newId);
  };

  const removeLabel = (id: string) => {
    onDataChange({ ...content, labels: labels.filter(l => l.id !== id) });
    setDeleteConfirmId(null);
    if (editingPinId === id) setEditingPinId(null);
  };

  const image = String(content.image || '');
  const src = !image ? '' :
    image === '/sample.jpeg' || image.includes('sample')
      ? 'https://placehold.co/800x600/e2e8f0/64748b?text=Sample+Image'
      : image;

  return (
    <div className="w-full p-4 rounded-lg space-y-2">
      <div ref={imageRef} className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden cursor-crosshair" onClick={addPin}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Labeled" className="w-full h-full object-cover pointer-events-none" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 pointer-events-none">Click to add pins</div>
        )}
        {/* Pins */}
        {labels.map(label => (
          <div
            key={label.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${label.x}%`, top: `${label.y}%` }}
            onClick={(e) => { e.stopPropagation(); setEditingPinId(editingPinId === label.id ? null : label.id); }}
          >
            <div className="w-6 h-6 rounded-full bg-[#9F80DA] border-2 border-white shadow-md flex items-center justify-center cursor-pointer">
              <span className="text-[10px] text-white font-bold">{labels.indexOf(label) + 1}</span>
            </div>
            {/* Popover */}
            {editingPinId === label.id && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20" onClick={(e) => e.stopPropagation()}>
                <div className="cursor-text mb-2">
                  <EditableText value={label.text} onChange={(v) => updateLabel(label.id, 'text', v)} tag="p" className="text-sm text-gray-900" placeholder="Label text..." />
                </div>
                {deleteConfirmId === label.id ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-red-600">Delete?</span>
                    <button onClick={() => removeLabel(label.id)} className="px-2 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                    <button onClick={() => setDeleteConfirmId(null)} className="px-2 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirmId(label.id)} className="text-xs text-gray-400 hover:text-red-500">Remove pin</button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setShowPicker(true)} className="text-xs text-[#9F80DA] hover:text-[#8A6BC5] font-medium flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Change image</button>
        <span className="text-xs text-gray-400">Click on image to add pins</span>
      </div>
      {showPicker && (
        <ImagePickerModal currentUrl={image} onSelect={(url) => { onDataChange({ ...content, image: url }); setShowPicker(false); }} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}

// ─── Separator: editable separator controls ─────────────────────────

function EditableSeparatorBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const showLine = content.showLine !== false;
  const showNumber = content.showNumber === true;
  const lineColor = (content.lineColor as string) || '#d1d5db';
  const thickness = (content.thickness as string) || 'thin';

  const colorPresets = [
    { label: 'Gray', value: '#d1d5db' },
    { label: 'Purple', value: '#9F80DA' },
    { label: 'Blue', value: '#3b82f6' },
    { label: 'Green', value: '#22c55e' },
    { label: 'Orange', value: '#f97316' },
  ];

  const thicknessMap: Record<string, string> = { thin: '1px', medium: '2px', thick: '4px' };

  return (
    <div className="w-full p-4 rounded-lg space-y-4">
      {/* Preview */}
      <div className="py-4">
        {showLine ? (
          <div className="flex items-center gap-3">
            <div className="flex-1" style={{ borderTop: `${thicknessMap[thickness]} solid ${lineColor}` }} />
            {showNumber && (
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ backgroundColor: lineColor }}>1</span>
            )}
            {showNumber && <div className="flex-1" style={{ borderTop: `${thicknessMap[thickness]} solid ${lineColor}` }} />}
          </div>
        ) : (
          <div className="h-8" />
        )}
      </div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showLine} onChange={(e) => onDataChange({ ...content, showLine: e.target.checked })} className="accent-[#9F80DA]" />
          <span className="text-gray-600">Show line</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={showNumber} onChange={(e) => onDataChange({ ...content, showNumber: e.target.checked })} className="accent-[#9F80DA]" />
          <span className="text-gray-600">Show number</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Height:</span>
          {(['thin', 'medium', 'thick'] as const).map(t => (
            <button key={t} onClick={() => onDataChange({ ...content, thickness: t })} className={`px-2 py-0.5 text-xs rounded transition-colors ${thickness === t ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Color:</span>
          {colorPresets.map(c => (
            <button key={c.value} onClick={() => onDataChange({ ...content, lineColor: c.value })} className={`w-5 h-5 rounded-full border-2 transition-all ${lineColor === c.value ? 'border-gray-800 scale-110' : 'border-gray-200'}`} style={{ backgroundColor: c.value }} title={c.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
