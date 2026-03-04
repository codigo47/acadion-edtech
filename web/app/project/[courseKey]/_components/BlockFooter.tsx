'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Paintbrush,
} from 'lucide-react';

export interface BlockStyles {
  marginTop?: string;
  marginBottom?: string;
  backgroundColor?: string;
  textColor?: string;
  textAlign?: string;
  fontSize?: string;
}

const MARGIN_CSS: Record<string, string> = { none: '0', small: '0.5rem', medium: '1rem', large: '2rem' };
const FONT_SIZE_CSS: Record<string, string> = { small: '0.875rem', normal: '1rem', large: '1.125rem', xlarge: '1.25rem' };

export function blockStylesToCss(styles?: BlockStyles): React.CSSProperties {
  if (!styles) return {};
  const css: Record<string, unknown> = {};
  if (styles.marginTop && styles.marginTop !== 'none') css.marginTop = MARGIN_CSS[styles.marginTop] || '0';
  if (styles.marginBottom && styles.marginBottom !== 'none') css.marginBottom = MARGIN_CSS[styles.marginBottom] || '0';
  if (styles.backgroundColor && styles.backgroundColor !== '#FFFFFF') css.backgroundColor = styles.backgroundColor;
  if (styles.textColor) {
    css.color = styles.textColor;
    css['--block-text-color'] = styles.textColor;
  }
  if (styles.textAlign) css.textAlign = styles.textAlign;
  if (styles.fontSize && styles.fontSize !== 'normal') css.fontSize = FONT_SIZE_CSS[styles.fontSize];
  return css as React.CSSProperties;
}

interface BlockFooterProps {
  blockStyles: BlockStyles;
  onStyleChange: (styles: BlockStyles) => void;
  courseColors?: string[];
  componentName?: string;
  imageSize?: number;
  onImageSizeChange?: (size: number) => void;
}

const PRESET_COLORS = [
  '#000000',
  '#374151',
  '#6B7280',
  '#9F80DA',
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
];

const BG_PRESETS = [
  { color: '#FFFFFF', label: 'White' },
  { color: '#F3F4F6', label: 'Light gray' },
  { color: '#D1D5DB', label: 'Medium gray' },
  { color: '#1F2937', label: 'Dark' },
];

const FONT_SIZES = ['normal', 'large', 'xlarge', 'small'] as const;
const FONT_SIZE_LABELS: Record<string, string> = {
  small: 'S',
  normal: 'M',
  large: 'L',
  xlarge: 'XL',
};

const MARGIN_OPTIONS = ['none', 'small', 'medium', 'large'] as const;

function MarginButton({
  value,
  active,
  onClick,
  direction,
}: {
  value: string;
  active: boolean;
  onClick: () => void;
  direction: 'top' | 'bottom';
}) {
  const heights: Record<string, string> = {
    none: 'h-[1px]',
    small: 'h-[3px]',
    medium: 'h-[5px]',
    large: 'h-[8px]',
  };

  return (
    <button
      onClick={onClick}
      title={`${direction === 'top' ? 'Top' : 'Bottom'} margin: ${value}`}
      className={`w-5 h-6 flex flex-col items-center justify-center rounded transition-all ${
        active
          ? 'bg-[#9F80DA]/15 ring-1 ring-[#9F80DA]/40'
          : 'hover:bg-gray-200/70 opacity-50 hover:opacity-100'
      }`}
    >
      {direction === 'top' && (
        <div className={`w-3 ${heights[value]} bg-gray-400 rounded-full mb-auto mt-1`} />
      )}
      {direction === 'bottom' && (
        <div className={`w-3 ${heights[value]} bg-gray-400 rounded-full mt-auto mb-1`} />
      )}
    </button>
  );
}

function ColorPickerDropdown({
  selectedColor,
  onSelect,
  onClose,
  courseColors,
}: {
  selectedColor?: string;
  onSelect: (color: string) => void;
  onClose: () => void;
  courseColors?: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  const allColors = [
    ...PRESET_COLORS,
    ...(courseColors || []).filter((c) => !PRESET_COLORS.includes(c)),
  ];

  return (
    <div
      ref={ref}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50"
    >
      <div className="flex flex-wrap gap-1.5 max-w-[180px]">
        {allColors.map((color) => (
          <button
            key={color}
            onClick={() => {
              onSelect(color);
              onClose();
            }}
            title={color}
            className={`w-5 h-5 rounded-full border transition-all flex-shrink-0 ${
              selectedColor === color
                ? 'ring-2 ring-[#9F80DA] ring-offset-1 border-[#9F80DA]'
                : 'border-gray-300 hover:scale-110'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

const IMAGE_SIZE_PRESETS = [25, 33, 50, 66, 75] as const;
const SIDE_BY_SIDE_COMPONENTS = ['ImageWithTextBlock', 'ImageWithTextLeftBlock'];

export function BlockFooter({
  blockStyles,
  onStyleChange,
  courseColors,
  componentName,
  imageSize,
  onImageSizeChange,
}: BlockFooterProps) {
  const showImageSize = componentName && SIDE_BY_SIDE_COMPONENTS.includes(componentName) && onImageSizeChange;
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [customBgInput, setCustomBgInput] = useState('');

  const update = useCallback(
    (partial: Partial<BlockStyles>) => {
      onStyleChange({ ...blockStyles, ...partial });
    },
    [blockStyles, onStyleChange],
  );

  // Font size cycling
  const currentFontSize = blockStyles.fontSize || 'normal';
  const currentIdx = FONT_SIZES.indexOf(currentFontSize as typeof FONT_SIZES[number]);
  const cycleFontSize = () => {
    const nextIdx = (currentIdx + 1) % FONT_SIZES.length;
    update({ fontSize: FONT_SIZES[nextIdx] });
  };

  // Text alignment
  const currentAlign = blockStyles.textAlign || 'left';

  // Margins
  const currentMarginTop = blockStyles.marginTop || 'none';
  const currentMarginBottom = blockStyles.marginBottom || 'none';

  // Background
  const currentBg = blockStyles.backgroundColor || '#FFFFFF';

  return (
    <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 rounded-b-xl flex items-center justify-between gap-4">
      {/* Left group - Typography */}
      <div className="flex items-center gap-1">
        {/* Font size cycle */}
        <button
          onClick={cycleFontSize}
          title={`Font size: ${currentFontSize}`}
          className="h-6 px-1.5 flex items-center gap-0.5 rounded transition-all text-gray-400 hover:text-gray-700 hover:bg-gray-200/70"
        >
          <Type className="w-3 h-3" />
          <span className="text-[10px] font-semibold leading-none">
            {FONT_SIZE_LABELS[currentFontSize]}
          </span>
        </button>

        {/* Separator */}
        <div className="w-px h-4 bg-gray-200 mx-0.5" />

        {/* Text alignment */}
        {(['left', 'center', 'right'] as const).map((align) => {
          const icons = { left: AlignLeft, center: AlignCenter, right: AlignRight };
          const AlignIcon = icons[align];
          const isActive = currentAlign === align;
          return (
            <button
              key={align}
              onClick={() => update({ textAlign: align })}
              title={`Align ${align}`}
              className={`w-6 h-6 flex items-center justify-center rounded transition-all ${
                isActive
                  ? 'text-[#9F80DA] bg-[#9F80DA]/10'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200/70'
              }`}
            >
              <AlignIcon className="w-3.5 h-3.5" />
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-4 bg-gray-200 mx-0.5" />

        {/* Text color */}
        <div className="relative">
          <button
            onClick={() => {
              setShowTextColorPicker(!showTextColorPicker);
              setShowBgColorPicker(false);
            }}
            title={`Text color: ${blockStyles.textColor || 'default'}`}
            className="w-6 h-6 flex items-center justify-center rounded transition-all text-gray-400 hover:text-gray-700 hover:bg-gray-200/70"
          >
            <div
              className="w-3.5 h-3.5 rounded-full border border-gray-300"
              style={{ backgroundColor: blockStyles.textColor || '#000000' }}
            />
          </button>
          {showTextColorPicker && (
            <ColorPickerDropdown
              selectedColor={blockStyles.textColor}
              onSelect={(color) => update({ textColor: color })}
              onClose={() => setShowTextColorPicker(false)}
              courseColors={courseColors}
            />
          )}
        </div>
      </div>

      {/* Image size presets (side-by-side image+text only) */}
      {showImageSize && (
        <div className="flex items-center gap-1">
          <span className="text-[9px] text-gray-400 font-medium mr-0.5 select-none">IMG</span>
          {IMAGE_SIZE_PRESETS.map((size) => (
            <button
              key={size}
              onClick={() => onImageSizeChange(size)}
              className={`px-1.5 py-0.5 text-[10px] font-medium rounded transition-colors ${
                (imageSize || 50) === size
                  ? 'bg-[#9F80DA] text-white'
                  : 'bg-gray-200/70 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {size}%
            </button>
          ))}
        </div>
      )}

      {/* Center group - Spacing */}
      <div className="flex items-center gap-2">
        {/* Margin top */}
        <div className="flex items-center gap-0.5">
          <span className="text-[9px] text-gray-400 font-medium mr-0.5 select-none">T</span>
          {MARGIN_OPTIONS.map((m) => (
            <MarginButton
              key={m}
              value={m}
              active={currentMarginTop === m}
              onClick={() => update({ marginTop: m })}
              direction="top"
            />
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-gray-200" />

        {/* Margin bottom */}
        <div className="flex items-center gap-0.5">
          <span className="text-[9px] text-gray-400 font-medium mr-0.5 select-none">B</span>
          {MARGIN_OPTIONS.map((m) => (
            <MarginButton
              key={m}
              value={m}
              active={currentMarginBottom === m}
              onClick={() => update({ marginBottom: m })}
              direction="bottom"
            />
          ))}
        </div>
      </div>

      {/* Right group - Background */}
      <div className="flex items-center gap-1">
        <Paintbrush className="w-3 h-3 text-gray-400 mr-0.5" />
        {BG_PRESETS.map((preset) => (
          <button
            key={preset.color}
            onClick={() => update({ backgroundColor: preset.color })}
            title={preset.label}
            className={`w-5 h-5 rounded-full border transition-all flex-shrink-0 ${
              currentBg === preset.color
                ? 'ring-2 ring-[#9F80DA] ring-offset-1 border-[#9F80DA]'
                : 'border-gray-300 hover:scale-110 opacity-60 hover:opacity-100'
            }`}
            style={{ backgroundColor: preset.color }}
          />
        ))}

        {/* Course brand colors */}
        {courseColors &&
          courseColors
            .filter((c) => !BG_PRESETS.some((p) => p.color === c))
            .map((color) => (
              <button
                key={color}
                onClick={() => update({ backgroundColor: color })}
                title={`Brand: ${color}`}
                className={`w-5 h-5 rounded-full border transition-all flex-shrink-0 ${
                  currentBg === color
                    ? 'ring-2 ring-[#9F80DA] ring-offset-1 border-[#9F80DA]'
                    : 'border-gray-300 hover:scale-110 opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}

        {/* Custom background color */}
        <div className="relative">
          <button
            onClick={() => {
              setShowBgColorPicker(!showBgColorPicker);
              setShowTextColorPicker(false);
            }}
            title="Custom background color"
            className={`w-5 h-5 rounded-full border transition-all flex-shrink-0 flex items-center justify-center ${
              !BG_PRESETS.some((p) => p.color === currentBg) &&
              !(courseColors || []).includes(currentBg)
                ? 'ring-2 ring-[#9F80DA] ring-offset-1 border-[#9F80DA]'
                : 'border-gray-300 border-dashed hover:scale-110 opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor:
                !BG_PRESETS.some((p) => p.color === currentBg) &&
                !(courseColors || []).includes(currentBg)
                  ? currentBg
                  : undefined,
            }}
          >
            <span className="text-[8px] text-gray-400 leading-none">+</span>
          </button>
          {showBgColorPicker && (
            <div className="absolute bottom-full right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
              <div className="flex flex-wrap gap-1.5 max-w-[180px]">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      update({ backgroundColor: color });
                      setShowBgColorPicker(false);
                    }}
                    title={color}
                    className={`w-5 h-5 rounded-full border transition-all flex-shrink-0 ${
                      currentBg === color
                        ? 'ring-2 ring-[#9F80DA] ring-offset-1 border-[#9F80DA]'
                        : 'border-gray-300 hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                {courseColors &&
                  courseColors
                    .filter((c) => !PRESET_COLORS.includes(c))
                    .map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          update({ backgroundColor: color });
                          setShowBgColorPicker(false);
                        }}
                        title={color}
                        className={`w-5 h-5 rounded-full border transition-all flex-shrink-0 ${
                          currentBg === color
                            ? 'ring-2 ring-[#9F80DA] ring-offset-1 border-[#9F80DA]'
                            : 'border-gray-300 hover:scale-110'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
              </div>
              {/* Custom hex input */}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400">#</span>
                  <input
                    type="text"
                    value={customBgInput}
                    onChange={(e) => setCustomBgInput(e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && customBgInput.length >= 3) {
                        update({ backgroundColor: `#${customBgInput}` });
                        setShowBgColorPicker(false);
                        setCustomBgInput('');
                      }
                    }}
                    placeholder="hex"
                    className="w-16 text-[10px] px-1 py-0.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#9F80DA]/40"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
