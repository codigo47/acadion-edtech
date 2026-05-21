'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useProjectUsedColors } from '@/lib/hooks/use-project-colors';

// 8 columns × 5 rows color grid
const BASIC_COLORS = [
  // Row 1 — vivid
  '#FF0000', '#FF8C00', '#FFD700', '#00C853', '#2196F3', '#9F80DA', '#E91E63', '#795548',
  // Row 2 — pastel
  '#FFCDD2', '#FFE0B2', '#FFF9C4', '#C8E6C9', '#BBDEFB', '#E1BEE7', '#F8BBD0', '#D7CCC8',
  // Row 3 — medium
  '#EF5350', '#FF7043', '#FFCA28', '#66BB6A', '#42A5F5', '#AB47BC', '#EC407A', '#8D6E63',
  // Row 4 — dark
  '#B71C1C', '#E65100', '#F57F17', '#1B5E20', '#0D47A1', '#4A148C', '#880E4F', '#3E2723',
  // Row 5 — grayscale
  '#000000', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB', '#F3F4F6', '#FFFFFF',
];

interface ColorPickerProps {
  selectedColor?: string;
  onSelect: (color: string) => void;
  onClose: () => void;
  projectColors?: string[];
  position?: 'top' | 'bottom';
}

function isValidHex(hex: string): boolean {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function normalizeHex(hex: string): string {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return `#${h.toUpperCase()}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace('#', '');
  if (h.length !== 6) return null;
  const num = parseInt(h, 16);
  if (isNaN(num)) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[clamp(r), clamp(g), clamp(b)].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

// Convert HSV to RGB
function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Convert RGB to HSV
function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

export function ColorPicker({
  selectedColor,
  onSelect,
  onClose,
  projectColors,
  position = 'top',
}: ColorPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const usedColors = useProjectUsedColors();
  const [hexInput, setHexInput] = useState(selectedColor?.replace('#', '') || '');
  const [rgb, setRgb] = useState<{ r: string; g: string; b: string }>(() => {
    const parsed = selectedColor ? hexToRgb(selectedColor) : null;
    return parsed
      ? { r: String(parsed.r), g: String(parsed.g), b: String(parsed.b) }
      : { r: '0', g: '0', b: '0' };
  });

  // Close on click outside
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  const selectAndClose = useCallback(
    (color: string) => {
      onSelect(color);
      onClose();
    },
    [onSelect, onClose],
  );

  const applyHex = useCallback(
    (raw: string) => {
      const prefixed = raw.startsWith('#') ? raw : `#${raw}`;
      if (isValidHex(prefixed)) {
        const normalized = normalizeHex(prefixed);
        onSelect(normalized);
        const parsed = hexToRgb(normalized);
        if (parsed) setRgb({ r: String(parsed.r), g: String(parsed.g), b: String(parsed.b) });
      }
    },
    [onSelect],
  );

  const applyRgb = useCallback(
    (r: string, g: string, b: string) => {
      const rn = parseInt(r) || 0;
      const gn = parseInt(g) || 0;
      const bn = parseInt(b) || 0;
      if (rn >= 0 && rn <= 255 && gn >= 0 && gn <= 255 && bn >= 0 && bn <= 255) {
        const hex = rgbToHex(rn, gn, bn);
        onSelect(hex);
        setHexInput(hex.replace('#', ''));
      }
    },
    [onSelect],
  );

  const positionClass = position === 'top'
    ? 'bottom-full mb-2'
    : 'top-full mt-2';

  return (
    <div
      ref={ref}
      className={`absolute ${positionClass} left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] w-[280px]`}
    >
      {/* Basic Colors */}
      <div className="p-3 pb-2">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Colors</span>
        <div className="grid grid-cols-8 gap-1 mt-1.5">
          {BASIC_COLORS.map((color) => (
            <ColorSwatch
              key={color}
              color={color}
              selected={selectedColor?.toUpperCase() === color.toUpperCase()}
              onClick={() => selectAndClose(color)}
            />
          ))}
        </div>
      </div>

      {/* Project Colors */}
      {projectColors && projectColors.length > 0 && (
        <div className="px-3 pb-2">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Project</span>
          <div className="flex gap-1 mt-1.5">
            {projectColors.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                selected={selectedColor?.toUpperCase() === color.toUpperCase()}
                onClick={() => selectAndClose(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* In Use — colors currently used across project components */}
      {usedColors.length > 0 && (
        <div className="px-3 pb-2">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">In Use</span>
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {usedColors.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                selected={selectedColor?.toUpperCase() === color.toUpperCase()}
                onClick={() => selectAndClose(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Rainbow gradient picker */}
      <div className="px-3 pb-2">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Spectrum</span>
        <RainbowPicker
          selectedColor={selectedColor}
          onSelect={selectAndClose}
        />
      </div>

      {/* HEX + RGB inputs */}
      <div className="px-3 pb-3 pt-1 border-t border-gray-100">
        <div className="flex items-center gap-2 mt-2">
          {/* HEX */}
          <div className="flex items-center gap-1 flex-1">
            <span className="text-[10px] text-gray-400 font-medium">#</span>
            <input
              type="text"
              value={hexInput}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
                setHexInput(val);
                if (val.length === 3 || val.length === 6) {
                  applyHex(val);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') applyHex(hexInput);
              }}
              onBlur={() => applyHex(hexInput)}
              onPaste={(e) => {
                e.preventDefault();
                const pasted = e.clipboardData.getData('text').replace('#', '').replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
                setHexInput(pasted);
                if (pasted.length === 3 || pasted.length === 6) applyHex(pasted);
              }}
              className="w-full text-[11px] px-1.5 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#9F80DA]/40 font-mono"
              placeholder="HEX"
            />
          </div>

          {/* RGB */}
          {(['r', 'g', 'b'] as const).map((ch) => (
            <div key={ch} className="flex items-center gap-0.5">
              <span className="text-[10px] text-gray-400 font-medium uppercase">{ch}</span>
              <input
                type="text"
                value={rgb[ch]}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
                  const next = { ...rgb, [ch]: val };
                  setRgb(next);
                  applyRgb(next.r, next.g, next.b);
                }}
                onBlur={() => applyRgb(rgb.r, rgb.g, rgb.b)}
                className="w-8 text-[11px] px-1 py-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-[#9F80DA]/40 font-mono text-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RainbowPicker({
  selectedColor,
  onSelect,
}: {
  selectedColor?: string;
  onSelect: (color: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Compute initial cursor position from selectedColor
  const initialPos = useRef<{ x: number; y: number } | null>(null);
  if (!initialPos.current && selectedColor) {
    const rgb = hexToRgb(selectedColor);
    if (rgb) {
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      initialPos.current = { x: hsv.h / 360, y: 1 - hsv.v };
    }
  }

  // Draw the gradient on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    // Draw hue × brightness gradient (full saturation)
    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const hue = (x / w) * 360;
        const brightness = 1 - y / h;
        const { r, g, b } = hsvToRgb(hue, 1, brightness);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, []);

  const pickColor = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width - 1, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height - 1, e.clientY - rect.top));
      const hue = (x / rect.width) * 360;
      const brightness = 1 - y / rect.height;
      const { r, g, b } = hsvToRgb(hue, 1, brightness);
      onSelect(rgbToHex(r, g, b));
    },
    [onSelect],
  );

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent) => pickColor(e);
    const handleUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging, pickColor]);

  return (
    <div ref={containerRef} className="mt-1.5 relative">
      <canvas
        ref={canvasRef}
        width={252}
        height={32}
        className="w-full h-8 rounded-md cursor-crosshair border border-gray-200"
        onMouseDown={(e) => {
          setIsDragging(true);
          pickColor(e);
        }}
      />
    </div>
  );
}

function ColorSwatch({
  color,
  selected,
  onClick,
}: {
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  const isWhite = color.toUpperCase() === '#FFFFFF' || color.toUpperCase() === '#FFF';
  return (
    <button
      onClick={onClick}
      title={color}
      className={`w-6 h-6 rounded-md border transition-all flex-shrink-0 ${
        selected
          ? 'ring-2 ring-[#9F80DA] ring-offset-1 border-[#9F80DA]'
          : isWhite
            ? 'border-gray-300 hover:scale-110'
            : 'border-transparent hover:scale-110'
      }`}
      style={{ backgroundColor: color }}
    />
  );
}
