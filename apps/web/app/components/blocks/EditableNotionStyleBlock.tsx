'use client';

import { useState, useCallback } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function isParagraphOrHeading(name: string): boolean {
  return [
    'ParagraphBlock', 'ParagraphWithHeadingBlock', 'ParagraphWithSubheadingBlock',
    'HeadingBlock', 'SubheadingBlock',
    'HighlightBlock', 'HighlightNoteBlock', 'HighlightColumnBlock',
    'HighlightCenterLineBlock', 'HighlightLeftLineBlock', 'HighlightBackgroundBlock',
    'QuoteBlock', 'QuoteCenterBorderBlock', 'QuoteCenterLightBlock',
    'QuoteLeftLightBlock', 'QuoteLeftBlock', 'QuoteImageBlock',
  ].includes(name);
}

export function NotionStyleBlock({
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
          style={{ lineHeight: '1.75', color: 'var(--block-text-color, inherit)' }}
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
          style={{ color: 'var(--block-text-color, inherit)' }}
          placeholder="Enter heading..."
          multiline={false}
        />
        <EditableText
          value={String(content.content || '')}
          onChange={(v) => updateField('content', v)}
          tag="p"
          className="text-base leading-relaxed"
          style={{ lineHeight: '1.75', color: 'var(--block-text-color, inherit)' }}
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
          className="mb-3 text-lg font-semibold"
          style={{ color: 'var(--block-text-color, #374151)' }}
          placeholder="Enter subheading..."
          multiline={false}
        />
        <EditableText
          value={String(content.content || '')}
          onChange={(v) => updateField('content', v)}
          tag="p"
          className="text-base leading-relaxed"
          style={{ lineHeight: '1.75', color: 'var(--block-text-color, inherit)' }}
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
          style={{ color: 'var(--block-text-color, inherit)' }}
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
          tag="h3"
          className="text-2xl font-semibold"
          style={{ color: 'var(--block-text-color, #6B7280)' }}
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

// ─── Shared Quote Helpers ────────────────────────────────────────────

function QuoteIcon({ className, color }: { className?: string; color?: string }) {
  return (
    <svg
      className={className || 'w-8 h-8 opacity-30'}
      fill="currentColor"
      viewBox="0 0 24 24"
      style={{ color: color || '#9F80DA' }}
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

function QuoteAvatarField({
  avatar,
  author,
  onAvatarChange,
  size = 'md',
}: {
  avatar?: string;
  author?: string;
  onAvatarChange: (url: string) => void;
  size?: 'sm' | 'md';
}) {
  const [showPicker, setShowPicker] = useState(false);
  const sizeClass = size === 'sm' ? 'w-14 h-14' : 'w-16 h-16';
  const src = avatar && avatar !== '/sample.jpeg' && !avatar.includes('sample')
    ? avatar
    : avatar
      ? 'https://placehold.co/100x100/e2e8f0/64748b?text=Avatar'
      : undefined;

  return (
    <>
      <div
        className={`relative ${sizeClass} cursor-pointer group/avatar flex-shrink-0`}
        onClick={() => setShowPicker(true)}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={author || 'Author'} className="w-full h-full rounded-full object-cover" />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
            <ImageIcon className="w-4 h-4" />
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
          <ImageIcon className="w-4 h-4 text-white" />
        </div>
      </div>
      {showPicker && (
        <ImagePickerModal
          currentUrl={avatar || ''}
          onSelect={(url) => { onAvatarChange(url); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}

// ─── Quote Variant Editor ───────────────────────────────────────────

function QuoteVariantEditor({ componentName, content, updateField, onDataChange }: { componentName: string; content: Record<string, unknown>; updateField: (field: string, value: unknown) => void; onDataChange: (data: Record<string, unknown>) => void }) {
  const [showBgPicker, setShowBgPicker] = useState(false);

  const quoteText = (style?: React.CSSProperties, className?: string) => (
    <EditableText
      value={String(content.content || '')}
      onChange={(v) => updateField('content', v)}
      tag="p"
      className={className || 'text-lg italic'}
      style={{ lineHeight: '1.6', ...style }}
      placeholder="Enter quote text..."
    />
  );

  const authorField = (style?: React.CSSProperties, className?: string) => (
    <EditableText
      value={String(content.author || '')}
      onChange={(v) => updateField('author', v)}
      tag="span"
      className={className || 'text-sm font-medium mt-3 block'}
      style={style}
      placeholder="— Attribution..."
      multiline={false}
    />
  );

  const titleField = (style?: React.CSSProperties) => (
    <EditableText
      value={String(content.title || '')}
      onChange={(v) => updateField('title', v)}
      tag="h3"
      className="text-xl font-semibold mb-3"
      style={style}
      placeholder="Title..."
      multiline={false}
    />
  );

  switch (componentName) {
    case 'QuoteBlock':
      // Matches Quote.tsx: bg-gray-50, rounded-lg, p-8, min-h-[200px], centered, SVG icon, title, avatar
      return (
        <div className="w-full bg-gray-50 rounded-lg p-8 min-h-[200px] flex items-center justify-center cursor-text">
          <div className="max-w-2xl mx-auto text-center">
            <QuoteIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
            {titleField({ color: 'var(--block-text-color, inherit)' })}
            {quoteText({ color: 'var(--block-text-color, inherit)' }, 'text-lg italic mb-4')}
            <div className="flex items-center justify-center gap-3 mt-4">
              <QuoteAvatarField
                avatar={content.avatar as string}
                author={content.author as string}
                onAvatarChange={(url) => updateField('avatar', url)}
              />
              {authorField({ color: 'var(--block-text-color, #6B7280)' })}
            </div>
          </div>
        </div>
      );

    case 'QuoteCenterBorderBlock':
      // Matches QuoteCenterBorderBlock.tsx: border, rounded-2xl, p-8, avatar above, SVG icon
      return (
        <div className="w-full p-8 flex flex-col items-center justify-center border-2 rounded-2xl cursor-text" style={{ borderColor: '#E5E7EB' }}>
          <QuoteAvatarField
            avatar={content.avatar as string}
            author={content.author as string}
            onAvatarChange={(url) => updateField('avatar', url)}
          />
          <QuoteIcon className="w-8 h-8 mb-4 mt-4 opacity-30" />
          {quoteText({ color: 'var(--block-text-color, inherit)', textAlign: 'center' } as React.CSSProperties, 'text-lg italic text-center mb-4 max-w-xl')}
          {authorField({ color: 'var(--block-text-color, #6B7280)' })}
        </div>
      );

    case 'QuoteCenterLightBlock':
      // Matches QuoteCenterLightBlock.tsx: p-8, centered, avatar, SVG icon
      return (
        <div className="w-full p-8 flex flex-col items-center justify-center cursor-text">
          <QuoteAvatarField
            avatar={content.avatar as string}
            author={content.author as string}
            onAvatarChange={(url) => updateField('avatar', url)}
          />
          <QuoteIcon className="w-8 h-8 mb-4 mt-4 opacity-30" />
          {quoteText({ color: 'var(--block-text-color, inherit)', textAlign: 'center' } as React.CSSProperties, 'text-lg italic text-center mb-4 max-w-xl')}
          {authorField({ color: 'var(--block-text-color, #6B7280)' })}
        </div>
      );

    case 'QuoteLeftLightBlock':
      // Matches QuoteLeftLightBlock.tsx: p-6, flex layout, avatar beside quote
      return (
        <div className="w-full p-6 flex gap-4 cursor-text">
          <QuoteAvatarField
            avatar={content.avatar as string}
            author={content.author as string}
            onAvatarChange={(url) => updateField('avatar', url)}
            size="sm"
          />
          <div className="flex-1">
            <QuoteIcon className="w-6 h-6 mb-2 opacity-30" />
            {quoteText({ color: 'var(--block-text-color, inherit)' }, 'text-base italic mb-3')}
            {authorField({ color: 'var(--block-text-color, #6B7280)' }, 'text-sm font-medium block')}
          </div>
        </div>
      );

    case 'QuoteLeftBlock':
      // Matches QuoteLeftBlock.tsx: bg-gray-100, p-6, flex, avatar beside, rounded-lg
      return (
        <div className="w-full p-6 flex gap-4 rounded-lg bg-gray-100 cursor-text">
          <QuoteAvatarField
            avatar={content.avatar as string}
            author={content.author as string}
            onAvatarChange={(url) => updateField('avatar', url)}
            size="sm"
          />
          <div className="flex-1">
            <QuoteIcon className="w-6 h-6 mb-2 opacity-30" />
            {quoteText({ color: 'var(--block-text-color, #374151)' }, 'text-base italic mb-3')}
            {authorField({ color: 'var(--block-text-color, #6B7280)' }, 'text-sm font-medium block')}
          </div>
        </div>
      );

    case 'QuoteImageBlock':
      // Matches QuoteImageBlock.tsx: background image, overlay, min-h-[300px], avatar, SVG icon
      return (
        <>
          <div className="w-full relative rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center cursor-text">
            <div className="absolute inset-0 group/img cursor-pointer" onClick={() => setShowBgPicker(true)}>
              {content.quoteImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={String(content.quoteImage)} alt="Quote background" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 gap-2">
                  <ImageIcon className="w-6 h-6" /> Click to set background image
                </div>
              )}
              <div className="absolute inset-0 bg-transparent group-hover/img:bg-black/10 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover/img:opacity-100 pointer-events-none">
                <span className="px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  Change image
                </span>
              </div>
            </div>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
            <div className="relative z-10 p-8 max-w-2xl mx-auto text-center pointer-events-none">
              <div className="pointer-events-auto">
                <QuoteAvatarField
                  avatar={content.avatar as string}
                  author={content.author as string}
                  onAvatarChange={(url) => updateField('avatar', url)}
                />
                <QuoteIcon className="w-8 h-8 mx-auto mb-4 mt-4 opacity-50" color="#FFFFFF" />
                {quoteText({ color: '#ffffff', fontSize: '20px' }, 'text-lg italic text-white mb-4')}
                {authorField({ color: 'rgba(255,255,255,0.8)' }, 'font-medium block mt-3')}
              </div>
            </div>
          </div>
          {showBgPicker && (
            <ImagePickerModal
              currentUrl={String(content.quoteImage || '')}
              onSelect={(url) => { onDataChange({ ...content, quoteImage: url }); setShowBgPicker(false); }}
              onClose={() => setShowBgPicker(false)}
            />
          )}
        </>
      );

    default:
      return (
        <div className="w-full p-6 border-l-4 border-gray-400 bg-gray-50 rounded-r-lg cursor-text">
          <QuoteIcon className="w-6 h-6 mb-2 opacity-30" />
          {quoteText({ color: 'var(--block-text-color, inherit)' })}
          {authorField({ color: 'var(--block-text-color, #6B7280)' })}
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
