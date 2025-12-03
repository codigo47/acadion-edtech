'use client';

import React from 'react';
import { TextStyle } from './types';

export interface ComparisonItemData {
  title: string;
  items: string[];
}

export interface ComparisonProps {
  left: ComparisonItemData;
  right: ComparisonItemData;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function Comparison({
  left,
  right,
  textStyle = {},
  dark = false,
}: ComparisonProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left Column */}
      <div className={`p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3
          className={`font-semibold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight || '600',
          }}
        >
          {left.title}
        </h3>
        <ul className="space-y-2">
          {left.items.map((item, index) => (
            <li
              key={index}
              className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}
              style={{
                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                lineHeight: textStyle.lineHeight,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column */}
      <div className={`p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <h3
          className={`font-semibold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight || '600',
          }}
        >
          {right.title}
        </h3>
        <ul className="space-y-2">
          {right.items.map((item, index) => (
            <li
              key={index}
              className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}
              style={{
                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                lineHeight: textStyle.lineHeight,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
