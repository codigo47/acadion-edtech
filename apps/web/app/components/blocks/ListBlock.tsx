'use client';

import React from 'react';
import { Check, Circle, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { TextStyle } from './types';

export type ListStyle = 'default' | 'check' | 'circle' | 'arrow' | 'chevron' | 'star' | 'numbered' | 'gradient' | 'bordered' | 'cards';

export interface ListBlockProps {
  items: string[];
  textStyle?: TextStyle;
  ordered?: boolean;
  listStyle?: ListStyle;
  accentColor?: string;
  dark?: boolean;
}

export default function ListBlock({
  items,
  textStyle = {},
  ordered = false,
  listStyle = 'default',
  accentColor = '#9F80DA',
  dark = false,
}: ListBlockProps) {
  const getIcon = (index: number) => {
    switch (listStyle) {
      case 'check':
        return <Check className="w-5 h-5" style={{ color: accentColor }} />;
      case 'circle':
        return <Circle className="w-3 h-3 fill-current" style={{ color: accentColor }} />;
      case 'arrow':
        return <ArrowRight className="w-4 h-4" style={{ color: accentColor }} />;
      case 'chevron':
        return <ChevronRight className="w-5 h-5" style={{ color: accentColor }} />;
      case 'star':
        return <Star className="w-4 h-4 fill-current" style={{ color: accentColor }} />;
      case 'numbered':
        return (
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: accentColor }}
          >
            {index + 1}
          </span>
        );
      default:
        return null;
    }
  };

  if (listStyle === 'gradient') {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-3 rounded-lg transition-all hover:translate-x-1"
              style={{
                background: dark
                  ? `linear-gradient(90deg, ${accentColor}20 0%, transparent 100%)`
                  : `linear-gradient(90deg, ${accentColor}15 0%, transparent 100%)`,
                borderLeft: `3px solid ${accentColor}`,
              }}
            >
              <span
                style={{
                  fontSize: textStyle.fontSize,
                  fontWeight: textStyle.fontWeight,
                  color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
                  lineHeight: textStyle.lineHeight,
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (listStyle === 'bordered') {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg border-2 transition-all hover:border-opacity-100 ${
                dark ? 'bg-gray-800 border-gray-700 hover:border-primary' : 'bg-white border-gray-200 hover:border-primary'
              }`}
              style={{ borderColor: dark ? undefined : `${accentColor}40` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <span
                  style={{
                    fontSize: textStyle.fontSize,
                    fontWeight: textStyle.fontWeight,
                    color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
                    lineHeight: textStyle.lineHeight,
                  }}
                >
                  {item}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (listStyle === 'cards') {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        <div className="grid grid-cols-2 gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-sm transition-all hover:shadow-md ${
                dark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <span className="font-semibold text-sm" style={{ color: accentColor }}>
                    {index + 1}
                  </span>
                </div>
                <span
                  className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}
                  style={{
                    fontSize: textStyle.fontSize,
                    fontWeight: textStyle.fontWeight,
                    color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
                    lineHeight: textStyle.lineHeight || '1.5',
                  }}
                >
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default styles with icons
  if (listStyle !== 'default' && !ordered) {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0">
                {getIcon(index)}
              </div>
              <span
                style={{
                  fontSize: textStyle.fontSize,
                  fontWeight: textStyle.fontWeight,
                  color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
                  lineHeight: textStyle.lineHeight,
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Standard ordered/unordered list
  const ListTag = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal' : 'list-disc';

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <ListTag
        className={`${listClass} pl-6 space-y-2 ${dark ? 'text-gray-300' : ''}`}
        style={{
          fontSize: textStyle.fontSize,
          fontWeight: textStyle.fontWeight,
          color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
          fontStyle: textStyle.fontStyle,
          textAlign: textStyle.textAlign,
          lineHeight: textStyle.lineHeight,
        }}
      >
        {items.map((item, index) => (
          <li key={index} className="text-base">
            {item}
          </li>
        ))}
      </ListTag>
    </div>
  );
}
