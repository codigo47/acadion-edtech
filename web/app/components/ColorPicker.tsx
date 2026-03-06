'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Star, X } from 'lucide-react';
import { useFavoriteColors } from '@/lib/hooks/use-favorite-colors';

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

export function ColorPicker({
  selectedColor,
  onSelect,
  onClose,
  projectColors,
  position = 'top',
}: ColorPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { favorites, addFavorite, removeFavorite } = useFavoriteColors();
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

  const isFavorite = selectedColor
    ? favorites.some((c) => c.toUpperCase() === selectedColor.toUpperCase())
    : false;

  const positionClass = position === 'top'
    ? 'bottom-full mb-2'
    : 'top-full mt-2';

  return (
    <div
      ref={ref}
      className={`absolute ${positionClass} left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 w-[280px]`}
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
              onClick={() => {
                onSelect(color);
                setHexInput(color.replace('#', ''));
                const parsed = hexToRgb(color);
                if (parsed) setRgb({ r: String(parsed.r), g: String(parsed.g), b: String(parsed.b) });
              }}
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
                onClick={() => {
                  onSelect(color);
                  setHexInput(color.replace('#', ''));
                  const parsed = hexToRgb(color);
                  if (parsed) setRgb({ r: String(parsed.r), g: String(parsed.g), b: String(parsed.b) });
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Favorites */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Favorites</span>
          {selectedColor && (
            <button
              onClick={() => (isFavorite ? removeFavorite(selectedColor) : addFavorite(selectedColor))}
              className={`p-0.5 rounded transition-colors ${isFavorite ? 'text-amber-500' : 'text-gray-300 hover:text-amber-400'}`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className="w-3 h-3" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
        {favorites.length > 0 ? (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {favorites.map((color) => (
              <div key={color} className="relative group/fav">
                <ColorSwatch
                  color={color}
                  selected={selectedColor?.toUpperCase() === color.toUpperCase()}
                  onClick={() => {
                    onSelect(color);
                    setHexInput(color.replace('#', ''));
                    const parsed = hexToRgb(color);
                    if (parsed) setRgb({ r: String(parsed.r), g: String(parsed.g), b: String(parsed.b) });
                  }}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); removeFavorite(color); }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-300 rounded-full flex items-center justify-center opacity-0 group-hover/fav:opacity-100 transition-opacity"
                >
                  <X className="w-2 h-2 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-gray-300 mt-1">Click the star to save colors</p>
        )}
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
