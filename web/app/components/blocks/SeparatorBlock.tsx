'use client';

import React from 'react';

export interface SeparatorBlockProps {
  height?: number;
  lineColor?: string;
  numberColor?: string;
  showNumber?: boolean;
  showLine?: boolean;
  number?: number;
  thickness?: string;
  dark?: boolean;
}

export default function SeparatorBlock({
  height = 40,
  lineColor,
  numberColor = '#FFFFFF',
  showNumber = false,
  showLine = true,
  number = 1,
  thickness = 'thin',
  dark = false,
}: SeparatorBlockProps) {
  const resolvedLineColor = lineColor || (dark ? '#4B5563' : '#d1d5db');
  const thicknessMap: Record<string, string> = { thin: '1px', medium: '2px', thick: '4px' };
  const lineHeight = thicknessMap[thickness] || '1px';

  return (
    <div
      className="w-full flex items-center justify-center px-4"
      style={{ height: `${height}px` }}
    >
      {showLine && !showNumber && (
        <div className="w-full" style={{ borderTop: `${lineHeight} solid ${resolvedLineColor}` }} />
      )}

      {showNumber && !showLine && (
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold border-2"
          style={{ borderColor: resolvedLineColor, color: numberColor }}
        >
          {number}
        </div>
      )}

      {showLine && showNumber && (
        <div className="w-full flex items-center gap-4">
          <div className="flex-1" style={{ borderTop: `${lineHeight} solid ${resolvedLineColor}` }} />
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
            style={{ backgroundColor: resolvedLineColor, color: numberColor }}
          >
            {number}
          </div>
          <div className="flex-1" style={{ borderTop: `${lineHeight} solid ${resolvedLineColor}` }} />
        </div>
      )}

      {!showLine && !showNumber && (
        <div className="w-full" />
      )}
    </div>
  );
}
