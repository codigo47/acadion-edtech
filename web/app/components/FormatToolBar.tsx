'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  ChevronDown,
  Minus,
  ArrowUpFromLine,
  ArrowDownFromLine,
  SeparatorHorizontal,
} from 'lucide-react';
import { ColorPicker } from './ColorPicker';

export interface FormatState {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  textColor?: string;
  bgColor?: string;
  lineColor?: string;
  hAlign?: 'left' | 'center' | 'right';
  vAlign?: 'top' | 'middle' | 'bottom';
  marginTop?: 'none' | 'small' | 'medium' | 'large';
  marginBottom?: 'none' | 'small' | 'medium' | 'large';
  fontSize?: number;
}

interface FormatToolBarProps {
  format: FormatState;
  onChange: (format: FormatState) => void;
  onClose?: () => void;
  projectColors?: string[];
}

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

export function FormatToolBar({
  format,
  onChange,
  onClose,
  projectColors,
}: FormatToolBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (openMenu) {
          setOpenMenu(null);
        } else {
          onClose?.();
        }
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose, openMenu]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openMenu) {
          setOpenMenu(null);
        } else {
          onClose?.();
        }
      }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose, openMenu]);

  const toggle = (key: keyof FormatState) => {
    onChange({ ...format, [key]: !format[key] });
  };

  const set = (key: keyof FormatState, value: unknown) => {
    onChange({ ...format, [key]: value });
    setOpenMenu(null);
  };

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div
      ref={ref}
      className="inline-flex items-center bg-white rounded-xl shadow-xl border border-gray-200 p-1.5 gap-0.5"
    >
      <ToolBtn active={format.bold} onClick={() => toggle('bold')} tooltip="Bold">
        <Bold className="w-5 h-5" />
      </ToolBtn>

      <ToolBtn active={format.italic} onClick={() => toggle('italic')} tooltip="Italic">
        <Italic className="w-5 h-5" />
      </ToolBtn>

      <ToolBtn active={format.underline} onClick={() => toggle('underline')} tooltip="Underline">
        <Underline className="w-5 h-5" />
      </ToolBtn>

      <ToolBtn active={format.strikethrough} onClick={() => toggle('strikethrough')} tooltip="Strikethrough">
        <Strikethrough className="w-5 h-5" />
      </ToolBtn>

      <Sep />

      <ToolBtn
        active={format.superscript}
        onClick={() => onChange({ ...format, superscript: !format.superscript, subscript: false })}
        tooltip="Superscript"
      >
        <Superscript className="w-5 h-5" />
      </ToolBtn>

      <ToolBtn
        active={format.subscript}
        onClick={() => onChange({ ...format, subscript: !format.subscript, superscript: false })}
        tooltip="Subscript"
      >
        <Subscript className="w-5 h-5" />
      </ToolBtn>

      <Sep />

      {/* Font size */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('fontSize')}
          title="Font size"
          className={`h-10 px-3 flex items-center gap-1 rounded-lg transition-colors text-sm font-medium tabular-nums ${
            openMenu === 'fontSize'
              ? 'bg-[#9F80DA]/10 text-[#9F80DA]'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {format.fontSize || 14}
          <ChevronDown className="w-4 h-4" />
        </button>
        {openMenu === 'fontSize' && (
          <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 w-20 max-h-64 overflow-y-auto">
            {FONT_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => set('fontSize', size)}
                className={`w-full text-left px-3 py-1.5 text-sm tabular-nums transition-colors ${
                  format.fontSize === size
                    ? 'bg-[#9F80DA]/10 text-[#9F80DA] font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <Sep />

      {/* Text color */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('textColor')}
          title="Text color"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            openMenu === 'textColor' ? 'bg-[#9F80DA]/10' : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-sm font-bold leading-none" style={{ color: format.textColor || '#000000' }}>A</span>
            <div className="w-5 h-1 rounded-full" style={{ backgroundColor: format.textColor || '#000000' }} />
          </div>
        </button>
        {openMenu === 'textColor' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50">
            <ColorPicker
              selectedColor={format.textColor}
              onSelect={(color) => set('textColor', color)}
              onClose={() => setOpenMenu(null)}
              projectColors={projectColors}
            />
          </div>
        )}
      </div>

      {/* Background color */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('bgColor')}
          title="Background color"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            openMenu === 'bgColor' ? 'bg-[#9F80DA]/10' : 'hover:bg-gray-100'
          }`}
        >
          <div className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center" style={{ backgroundColor: format.bgColor || '#FFFFFF' }}>
            <span className="text-[10px] font-bold leading-none" style={{ color: format.bgColor && format.bgColor !== '#FFFFFF' ? '#FFFFFF' : '#000000' }}>A</span>
          </div>
        </button>
        {openMenu === 'bgColor' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50">
            <ColorPicker
              selectedColor={format.bgColor}
              onSelect={(color) => set('bgColor', color)}
              onClose={() => setOpenMenu(null)}
              projectColors={projectColors}
            />
          </div>
        )}
      </div>

      {/* Line color */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('lineColor')}
          title="Line color"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            openMenu === 'lineColor' ? 'bg-[#9F80DA]/10' : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <Minus className="w-5 h-5" style={{ color: format.lineColor || '#000000' }} />
            <div className="w-5 h-1 rounded-full" style={{ backgroundColor: format.lineColor || '#000000' }} />
          </div>
        </button>
        {openMenu === 'lineColor' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 z-50">
            <ColorPicker
              selectedColor={format.lineColor}
              onSelect={(color) => set('lineColor', color)}
              onClose={() => setOpenMenu(null)}
              projectColors={projectColors}
            />
          </div>
        )}
      </div>

      <Sep />

      {/* Horizontal alignment */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('hAlign')}
          title="Horizontal align"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            openMenu === 'hAlign'
              ? 'bg-[#9F80DA]/10 text-[#9F80DA]'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {format.hAlign === 'center' ? (
            <AlignCenter className="w-5 h-5" />
          ) : format.hAlign === 'right' ? (
            <AlignRight className="w-5 h-5" />
          ) : (
            <AlignLeft className="w-5 h-5" />
          )}
        </button>
        {openMenu === 'hAlign' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-50 flex gap-0.5">
            {([
              { v: 'left', Icon: AlignLeft },
              { v: 'center', Icon: AlignCenter },
              { v: 'right', Icon: AlignRight },
            ] as const).map(({ v, Icon }) => (
              <ToolBtn key={v} active={format.hAlign === v} onClick={() => set('hAlign', v)} tooltip={v}>
                <Icon className="w-5 h-5" />
              </ToolBtn>
            ))}
          </div>
        )}
      </div>

      {/* Vertical alignment */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('vAlign')}
          title="Vertical align"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            openMenu === 'vAlign'
              ? 'bg-[#9F80DA]/10 text-[#9F80DA]'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {format.vAlign === 'bottom' ? (
            <AlignVerticalJustifyEnd className="w-5 h-5" />
          ) : format.vAlign === 'middle' ? (
            <AlignVerticalJustifyCenter className="w-5 h-5" />
          ) : (
            <AlignVerticalJustifyStart className="w-5 h-5" />
          )}
        </button>
        {openMenu === 'vAlign' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-50 flex gap-0.5">
            {([
              { v: 'top', Icon: AlignVerticalJustifyStart },
              { v: 'middle', Icon: AlignVerticalJustifyCenter },
              { v: 'bottom', Icon: AlignVerticalJustifyEnd },
            ] as const).map(({ v, Icon }) => (
              <ToolBtn key={v} active={format.vAlign === v} onClick={() => set('vAlign', v)} tooltip={v}>
                <Icon className="w-5 h-5" />
              </ToolBtn>
            ))}
          </div>
        )}
      </div>

      {/* Margins */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('margins')}
          title="Margins"
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            openMenu === 'margins'
              ? 'bg-[#9F80DA]/10 text-[#9F80DA]'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <SeparatorHorizontal className="w-5 h-5" />
        </button>
        {openMenu === 'margins' && (
          <div className="absolute top-full right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 w-44 space-y-3">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <ArrowUpFromLine className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Top</span>
              </div>
              <div className="flex gap-1">
                {(['none', 'small', 'medium', 'large'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => onChange({ ...format, marginTop: v })}
                    className={`flex-1 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                      (format.marginTop || 'none') === v
                        ? 'bg-[#9F80DA]/15 text-[#9F80DA]'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {v === 'none' ? '0' : v[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <ArrowDownFromLine className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">Bottom</span>
              </div>
              <div className="flex gap-1">
                {(['none', 'small', 'medium', 'large'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => onChange({ ...format, marginBottom: v })}
                    className={`flex-1 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                      (format.marginBottom || 'none') === v
                        ? 'bg-[#9F80DA]/15 text-[#9F80DA]'
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {v === 'none' ? '0' : v[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ToolBtn({
  active,
  onClick,
  tooltip,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group/tip">
      <button
        onClick={onClick}
        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
          active
            ? 'bg-[#9F80DA]/15 text-[#9F80DA]'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        }`}
      >
        {children}
      </button>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover/tip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 capitalize">
        {tooltip}
      </span>
    </div>
  );
}

function Sep() {
  return <div className="w-px h-8 bg-gray-200 mx-1" />;
}
