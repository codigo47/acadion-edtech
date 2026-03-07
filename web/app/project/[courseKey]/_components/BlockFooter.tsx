'use client';

import { useState, useCallback } from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Paintbrush,
  Palette,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { ColorPicker } from '../../../components/ColorPicker';
import { TableStylePresetsModal, type TablePreset } from '../../../components/blocks/TableStylePresetsModal';

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
  if (styles.fontSize && styles.fontSize !== 'normal') {
    css.fontSize = FONT_SIZE_CSS[styles.fontSize];
    css['--block-font-size'] = FONT_SIZE_CSS[styles.fontSize];
  }
  return css as React.CSSProperties;
}

// Components that don't respond to text color / text alignment
const NO_TEXT_CONTROLS = new Set([
  'SeparatorBlock',
  'ImageBlock',
  'VideoBlock',
  'AudioBlock',
  'AttachmentBlock',
  'EmbedBlock',
  'GalleryBlock',
  'LabeledImageBlock',
  'GraphBlock',
  'ScenarioBlock',
]);

// Components that don't respond to font size (includes NO_TEXT_CONTROLS + fixed-size blocks)
const NO_FONT_SIZE = new Set([
  ...NO_TEXT_CONTROLS,
  'HeadingBlock',
  'SubheadingBlock',
  'TableBlock',
  'CarouselBlock',
  'FlashCardBlock',
  'MultipleChoiceBlock',
  'MultipleResponseBlock',
  'FillInTheBlankBlock',
  'MatchingPairsBlock',
  'ScenarioBlock',
  'SortingBlock',
  'SortingStepsBlock',
  'ButtonBlock',
  'ButtonStackBlock',
  'BannerBlock',
  'TimelineBlock',
  'CheckboxBlock',
]);

interface BlockFooterProps {
  blockStyles: BlockStyles;
  onStyleChange: (styles: BlockStyles) => void;
  courseColors?: string[];
  componentName?: string;
  imageSize?: number;
  onImageSizeChange?: (size: number) => void;
  content?: Record<string, unknown>;
  onDataChange?: (data: Record<string, unknown>) => void;
}

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

const IMAGE_SIZE_PRESETS = [25, 33, 50, 66, 75] as const;
const SIDE_BY_SIDE_COMPONENTS = ['ImageWithTextBlock', 'ImageWithTextLeftBlock'];

export function BlockFooter({
  blockStyles,
  onStyleChange,
  courseColors,
  componentName,
  imageSize,
  onImageSizeChange,
  content,
  onDataChange,
}: BlockFooterProps) {
  const showImageSize = componentName && SIDE_BY_SIDE_COMPONENTS.includes(componentName) && onImageSizeChange;
  const showTextControls = !componentName || !NO_TEXT_CONTROLS.has(componentName);
  const showFontSize = !componentName || !NO_FONT_SIZE.has(componentName);
  const isTable = componentName === 'TableBlock';
  const isScenario = componentName === 'ScenarioBlock';
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showTablePresets, setShowTablePresets] = useState(false);
  const [showBubbleBgPicker, setShowBubbleBgPicker] = useState(false);

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
      {/* Left group - Typography (only for text-supporting components) */}
      <div className="flex items-center gap-1">
        {showTextControls && (
          <>
            {/* Font size cycle — only for blocks that support it */}
            {showFontSize && (
              <>
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
              </>
            )}

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
                <ColorPicker
                  selectedColor={blockStyles.textColor}
                  onSelect={(color) => update({ textColor: color })}
                  onClose={() => setShowTextColorPicker(false)}
                  projectColors={courseColors}
                />
              )}
            </div>
          </>
        )}

        {/* Table style presets button */}
        {isTable && content && onDataChange && (
          <div className="relative">
            {showTextControls && <div className="w-px h-4 bg-gray-200 mx-1" />}
            <button
              onClick={() => setShowTablePresets(!showTablePresets)}
              title="Table style presets"
              className="h-6 px-1.5 flex items-center gap-1 rounded transition-all text-gray-400 hover:text-gray-700 hover:bg-gray-200/70"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold leading-none">Style</span>
            </button>
            {showTablePresets && (
              <TableStylePresetsModal
                currentPresetId={(content.tableStyle as TablePreset | undefined)?.id}
                onSelect={(preset) => onDataChange({ ...content, tableStyle: preset })}
                onClose={() => setShowTablePresets(false)}
              />
            )}
          </div>
        )}

        {/* Scenario controls */}
        {isScenario && content && onDataChange && (() => {
          const bubbleBg = (content.bubbleBg as string) || '#FFFFFF';
          const bubbleTextAlign = (content.bubbleTextAlign as string) || 'left';
          const bubbleFontSize = (content.bubbleFontSize as string) || 'normal';
          const arrowDir = (content.arrowDirection as string) || 'bottom';
          const arrowAlign = (content.arrowAlignment as string) || 'left';
          const blurVal = (content.blur as number) || 0;
          const bubbleFontIdx = FONT_SIZES.indexOf(bubbleFontSize as typeof FONT_SIZES[number]);
          const cycleBubbleFont = () => {
            const nextIdx = (bubbleFontIdx + 1) % FONT_SIZES.length;
            onDataChange({ ...content, bubbleFontSize: FONT_SIZES[nextIdx] });
          };
          const updateContent = (partial: Record<string, unknown>) => onDataChange({ ...content, ...partial });

          return (
            <div className="flex items-center gap-1">
              {/* Bubble BG color */}
              <div className="relative">
                <button
                  onClick={() => setShowBubbleBgPicker(!showBubbleBgPicker)}
                  title={`Bubble color: ${bubbleBg}`}
                  className="w-6 h-6 flex items-center justify-center rounded transition-all text-gray-400 hover:text-gray-700 hover:bg-gray-200/70"
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-gray-300"
                    style={{ backgroundColor: bubbleBg }}
                  />
                </button>
                {showBubbleBgPicker && (
                  <ColorPicker
                    selectedColor={bubbleBg}
                    onSelect={(color) => updateContent({ bubbleBg: color })}
                    onClose={() => setShowBubbleBgPicker(false)}
                    projectColors={courseColors}
                  />
                )}
              </div>

              <div className="w-px h-4 bg-gray-200 mx-0.5" />

              {/* Bubble text alignment */}
              {(['left', 'center', 'right'] as const).map((align) => {
                const icons = { left: AlignLeft, center: AlignCenter, right: AlignRight };
                const AlignIcon = icons[align];
                return (
                  <button
                    key={align}
                    onClick={() => updateContent({ bubbleTextAlign: align })}
                    title={`Bubble align ${align}`}
                    className={`w-5 h-5 flex items-center justify-center rounded transition-all ${
                      bubbleTextAlign === align
                        ? 'text-[#9F80DA] bg-[#9F80DA]/10'
                        : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200/70'
                    }`}
                  >
                    <AlignIcon className="w-3 h-3" />
                  </button>
                );
              })}

              {/* Bubble font size */}
              <button
                onClick={cycleBubbleFont}
                title={`Bubble font: ${bubbleFontSize}`}
                className="h-5 px-1 flex items-center gap-0.5 rounded transition-all text-gray-400 hover:text-gray-700 hover:bg-gray-200/70"
              >
                <Type className="w-2.5 h-2.5" />
                <span className="text-[9px] font-semibold leading-none">{FONT_SIZE_LABELS[bubbleFontSize]}</span>
              </button>

              <div className="w-px h-4 bg-gray-200 mx-0.5" />

              {/* Arrow direction */}
              {([
                { d: 'top', Icon: ArrowUp },
                { d: 'bottom', Icon: ArrowDown },
                { d: 'left', Icon: ArrowLeft },
                { d: 'right', Icon: ArrowRight },
              ] as const).map(({ d, Icon }) => (
                <button
                  key={d}
                  onClick={() => updateContent({ arrowDirection: d })}
                  title={`Arrow ${d}`}
                  className={`w-5 h-5 flex items-center justify-center rounded transition-all ${
                    arrowDir === d
                      ? 'text-[#9F80DA] bg-[#9F80DA]/10'
                      : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200/70'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                </button>
              ))}

              {/* Arrow alignment (only for top/bottom) */}
              {(arrowDir === 'top' || arrowDir === 'bottom') && (
                <>
                  <div className="w-px h-4 bg-gray-200 mx-0.5" />
                  {(['left', 'center', 'right'] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => updateContent({ arrowAlignment: a })}
                      title={`Arrow align ${a}`}
                      className={`w-5 h-5 flex items-center justify-center rounded text-[9px] font-semibold transition-all ${
                        arrowAlign === a
                          ? 'text-[#9F80DA] bg-[#9F80DA]/10'
                          : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200/70'
                      }`}
                    >
                      {a[0].toUpperCase()}
                    </button>
                  ))}
                </>
              )}

              <div className="w-px h-4 bg-gray-200 mx-0.5" />

              {/* Blur */}
              <span className="text-[9px] text-gray-400 font-medium select-none">Blur</span>
              <input
                type="range"
                min={0}
                max={10}
                value={blurVal}
                onChange={(e) => updateContent({ blur: parseInt(e.target.value) })}
                className="w-14 h-1 accent-[#9F80DA] cursor-pointer"
              />
              <span className="text-[9px] text-gray-400 tabular-nums w-3">{blurVal}</span>
            </div>
          );
        })()}
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
            <ColorPicker
              selectedColor={currentBg}
              onSelect={(color) => update({ backgroundColor: color })}
              onClose={() => setShowBgColorPicker(false)}
              projectColors={courseColors}
            />
          )}
        </div>
      </div>
    </div>
  );
}
