'use client';

import { useState } from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Minus,
  Palette,
  Columns2,
} from 'lucide-react';
import { ToolBtn, Sep } from '@/app/components/FormatToolBar';
import { ColorPicker } from '@/app/components/ColorPicker';
import { TableStylePresetsModal, type TablePreset } from '@/app/components/blocks/TableStylePresetsModal';

/* ------------------------------------------------------------------ */
/*  Separator                                                         */
/* ------------------------------------------------------------------ */

const FONT_SIZES = ['normal', 'large', 'xlarge', 'small'] as const;
const FONT_SIZE_LABELS: Record<string, string> = { small: 'S', normal: 'M', large: 'L', xlarge: 'XL' };

interface SecondRowProps {
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
  projectColors?: string[];
}

export function SeparatorSecondRow({ content, onDataChange, projectColors }: SecondRowProps) {
  const [showLineColorPicker, setShowLineColorPicker] = useState(false);
  const [showNumberColorPicker, setShowNumberColorPicker] = useState(false);

  const showLine = content.showLine !== false;
  const showNumber = content.showNumber === true;
  const lineColor = (content.lineColor as string) || '#d1d5db';
  const numberColor = (content.numberColor as string) || '#FFFFFF';
  const thickness = (content.thickness as string) || 'thin';
  const update = (partial: Record<string, unknown>) => onDataChange({ ...content, ...partial });

  return (
    <div className="flex items-center gap-1">
      {/* Show Line toggle */}
      <ToolBtn active={showLine} onClick={() => update({ showLine: !showLine })} tooltip={showLine ? 'Hide line' : 'Show line'}>
        <Minus className="w-5 h-5" />
      </ToolBtn>

      {/* Show Number toggle */}
      <ToolBtn active={showNumber} onClick={() => update({ showNumber: !showNumber })} tooltip={showNumber ? 'Hide number' : 'Show number'}>
        <span className="text-sm font-bold">#</span>
      </ToolBtn>

      {/* Thickness */}
      <Sep />
      {([
        { value: 'thin', h: '1px' },
        { value: 'medium', h: '2px' },
        { value: 'thick', h: '4px' },
      ] as const).map((opt) => (
        <ToolBtn
          key={opt.value}
          active={thickness === opt.value}
          onClick={() => update({ thickness: opt.value })}
          tooltip={opt.value}
          disabled={!showLine}
        >
          <div className="w-5 rounded-full" style={{ height: opt.h, backgroundColor: !showLine ? '#d1d5db' : lineColor }} />
        </ToolBtn>
      ))}

      {/* Line color — same icon style as toolbar lineColor */}
      <Sep />
      <div className="relative">
        <ToolBtn
          active={showLineColorPicker}
          onClick={() => { setShowLineColorPicker(!showLineColorPicker); setShowNumberColorPicker(false); }}
          tooltip={`Line color: ${lineColor}`}
          disabled={!showLine}
        >
          <div className="flex flex-col items-center gap-1">
            <Minus className="w-5 h-5" style={{ color: !showLine ? '#d1d5db' : lineColor }} />
            <div className="w-5 h-1 rounded-full" style={{ backgroundColor: !showLine ? '#d1d5db' : lineColor }} />
          </div>
        </ToolBtn>
        {showLineColorPicker && showLine && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50">
            <ColorPicker
              selectedColor={lineColor}
              onSelect={(color) => update({ lineColor: color })}
              onClose={() => setShowLineColorPicker(false)}
              projectColors={projectColors}
            />
          </div>
        )}
      </div>

      {/* Number text color — same icon style as toolbar textColor */}
      <div className="relative">
        <ToolBtn
          active={showNumberColorPicker}
          onClick={() => { setShowNumberColorPicker(!showNumberColorPicker); setShowLineColorPicker(false); }}
          tooltip={`Number color: ${numberColor}`}
          disabled={!showNumber}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-bold leading-none" style={{ color: !showNumber ? '#d1d5db' : numberColor }}>1</span>
            <div className="w-5 h-1 rounded-full" style={{ backgroundColor: !showNumber ? '#d1d5db' : numberColor }} />
          </div>
        </ToolBtn>
        {showNumberColorPicker && showNumber && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50">
            <ColorPicker
              selectedColor={numberColor}
              onSelect={(color) => update({ numberColor: color })}
              onClose={() => setShowNumberColorPicker(false)}
              projectColors={projectColors}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scenario                                                          */
/* ------------------------------------------------------------------ */

export function ScenarioSecondRow({ content, onDataChange, projectColors }: SecondRowProps) {
  const [showBubbleBgPicker, setShowBubbleBgPicker] = useState(false);

  const bubbleBg = (content.bubbleBg as string) || '#FFFFFF';
  const bubbleTextAlign = (content.bubbleTextAlign as string) || 'left';
  const bubbleFontSize = (content.bubbleFontSize as string) || 'normal';
  const arrowDir = (content.arrowDirection as string) || 'bottom';
  const arrowAlign = (content.arrowAlignment as string) || 'left';
  const blurVal = (content.blur as number) || 0;
  const update = (partial: Record<string, unknown>) => onDataChange({ ...content, ...partial });

  const bubbleFontIdx = FONT_SIZES.indexOf(bubbleFontSize as typeof FONT_SIZES[number]);
  const cycleBubbleFont = () => {
    const nextIdx = (bubbleFontIdx + 1) % FONT_SIZES.length;
    update({ bubbleFontSize: FONT_SIZES[nextIdx] });
  };

  return (
    <div className="flex items-center gap-1">
      {/* Bubble BG color */}
      <div className="relative">
        <ToolBtn
          active={showBubbleBgPicker}
          onClick={() => setShowBubbleBgPicker(!showBubbleBgPicker)}
          tooltip={`Bubble color: ${bubbleBg}`}
        >
          <div className="w-5 h-5 rounded-full border border-gray-300" style={{ backgroundColor: bubbleBg }} />
        </ToolBtn>
        {showBubbleBgPicker && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50">
            <ColorPicker
              selectedColor={bubbleBg}
              onSelect={(color) => update({ bubbleBg: color })}
              onClose={() => setShowBubbleBgPicker(false)}
              projectColors={projectColors}
            />
          </div>
        )}
      </div>

      <Sep />

      {/* Bubble text alignment */}
      {(['left', 'center', 'right'] as const).map((align) => {
        const icons = { left: AlignLeft, center: AlignCenter, right: AlignRight };
        const AlignIcon = icons[align];
        return (
          <ToolBtn key={align} active={bubbleTextAlign === align} onClick={() => update({ bubbleTextAlign: align })} tooltip={`Bubble align ${align}`}>
            <AlignIcon className="w-5 h-5" />
          </ToolBtn>
        );
      })}

      {/* Bubble font size */}
      <ToolBtn active={false} onClick={cycleBubbleFont} tooltip={`Bubble font: ${bubbleFontSize}`}>
        <div className="flex items-center gap-0.5">
          <Type className="w-4 h-4" />
          <span className="text-[10px] font-semibold leading-none">{FONT_SIZE_LABELS[bubbleFontSize]}</span>
        </div>
      </ToolBtn>

      <Sep />

      {/* Arrow direction */}
      {([
        { d: 'top', Icon: ArrowUp },
        { d: 'bottom', Icon: ArrowDown },
        { d: 'left', Icon: ArrowLeft },
        { d: 'right', Icon: ArrowRight },
      ] as const).map(({ d, Icon }) => (
        <ToolBtn key={d} active={arrowDir === d} onClick={() => update({ arrowDirection: d })} tooltip={`Arrow ${d}`}>
          <Icon className="w-5 h-5" />
        </ToolBtn>
      ))}

      {/* Arrow alignment (disabled when arrow is left/right) */}
      <Sep />
      {(['left', 'center', 'right'] as const).map((a) => (
        <ToolBtn
          key={a}
          active={arrowAlign === a}
          onClick={() => update({ arrowAlignment: a })}
          tooltip={`Arrow align ${a}`}
          disabled={arrowDir === 'left' || arrowDir === 'right'}
        >
          <span className="text-xs font-semibold">{a[0].toUpperCase()}</span>
        </ToolBtn>
      ))}

      <Sep />

      {/* Blur */}
      <span className="text-[10px] text-gray-400 font-medium select-none">Blur</span>
      <input
        type="range"
        min={0}
        max={10}
        value={blurVal}
        onChange={(e) => update({ blur: parseInt(e.target.value) })}
        className="w-14 h-1 accent-[#9F80DA] cursor-pointer"
      />
      <span className="text-[10px] text-gray-400 tabular-nums w-3">{blurVal}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table (inline — renders inside main toolbar row via extraControls)*/
/* ------------------------------------------------------------------ */

export function TablePresetControl({ content, onDataChange }: Omit<SecondRowProps, 'projectColors'>) {
  const [showTablePresets, setShowTablePresets] = useState(false);

  return (
    <div className="relative flex items-center">
      <ToolBtn active={showTablePresets} onClick={() => setShowTablePresets(!showTablePresets)} tooltip="Table style presets">
        <Palette className="w-5 h-5" />
      </ToolBtn>
      {showTablePresets && (
        <TableStylePresetsModal
          currentPresetId={(content.tableStyle as TablePreset | undefined)?.id}
          onSelect={(preset) => onDataChange({ ...content, tableStyle: preset })}
          onClose={() => setShowTablePresets(false)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image Size                                                        */
/* ------------------------------------------------------------------ */

const IMAGE_SIZE_PRESETS = [25, 33, 50, 66, 75] as const;

export function ImageSizeSecondRow({ content, onDataChange }: Omit<SecondRowProps, 'projectColors'>) {
  const currentSize = (content.imageSize as number) || 50;

  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] text-gray-400 font-medium mr-0.5 select-none">IMG</span>
      {IMAGE_SIZE_PRESETS.map((size) => (
        <button
          key={size}
          onClick={() => onDataChange({ ...content, imageSize: size })}
          className={`px-1.5 py-0.5 text-[10px] font-medium rounded transition-colors ${
            currentSize === size
              ? 'bg-[#9F80DA] text-white'
              : 'bg-gray-200/70 text-gray-500 hover:bg-gray-300'
          }`}
        >
          {size}%
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Columns                                                           */
/* ------------------------------------------------------------------ */

export function ColumnsControl({ content, onDataChange }: Omit<SecondRowProps, 'projectColors'>) {
  const colCount = (content.columns as number) || 2;

  const changeColumnCount = (n: number) => {
    const columnContent: string[] = Array.isArray(content.columnContent)
      ? (content.columnContent as string[])
      : typeof content.content === 'string'
        ? Array.from({ length: colCount }, (_, i) => i === 0 ? (content.content as string) : '')
        : Array.from({ length: colCount }, () => '');
    const newContent = Array.from({ length: n }, (_, i) => columnContent[i] || '');
    onDataChange({ ...content, columns: n, columnContent: newContent, content: newContent.join('\n\n') });
  };

  return (
    <div className="flex items-center gap-1">
      <Columns2 className="w-4 h-4 text-gray-400" />
      {[1, 2, 3, 4].map((n) => (
        <ToolBtn key={n} active={colCount === n} onClick={() => changeColumnCount(n)} tooltip={`${n} column${n > 1 ? 's' : ''}`}>
          <span className="text-xs font-semibold">{n}</span>
        </ToolBtn>
      ))}
    </div>
  );
}
