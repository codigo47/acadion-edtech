'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { TextStyle } from './types';

export interface ComparisonDosDontsBlockProps {
  dos: string[];
  donts: string[];
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function ComparisonDosDontsBlock({
  dos = [],
  donts = [],
  textStyle = {},
  dark = false,
}: ComparisonDosDontsBlockProps) {
  // Handle empty data
  if ((!dos || dos.length === 0) && (!donts || donts.length === 0)) {
    return (
      <div className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
        <p>No comparison data available</p>
      </div>
    );
  }

  const safeDs = dos || [];
  const safeDonts = donts || [];

  return (
    <div className={`w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
        Do&apos;s and Don&apos;ts
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Do's Column */}
        <div className={`p-4 rounded-lg border-2 ${dark ? 'bg-gray-800 border-green-600' : 'bg-white border-green-500'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className={`font-semibold ${dark ? 'text-green-400' : 'text-green-700'}`}>
              Do&apos;s
            </span>
          </div>
          <ul className="space-y-3">
            {safeDs.map((item, index) => (
              <li
                key={index}
                className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}
                style={{
                  color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
                  lineHeight: textStyle.lineHeight || '1.5',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Don'ts Column */}
        <div className={`p-4 rounded-lg border-2 ${dark ? 'bg-gray-800 border-red-600' : 'bg-white border-red-500'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </div>
            <span className={`font-semibold ${dark ? 'text-red-400' : 'text-red-700'}`}>
              Don&apos;ts
            </span>
          </div>
          <ul className="space-y-3">
            {safeDonts.map((item, index) => (
              <li
                key={index}
                className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}
                style={{
                  color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
                  lineHeight: textStyle.lineHeight || '1.5',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
