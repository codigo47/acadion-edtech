'use client';

import React from 'react';
import { TextStyle } from './types';

export interface ComparisonBeforeAfterBlockProps {
  beforeItems: string[];
  afterItems: string[];
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function ComparisonBeforeAfterBlock({
  beforeItems,
  afterItems,
  textStyle = {},
  dark = false,
}: ComparisonBeforeAfterBlockProps) {
  return (
    <div className={`w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
        Before and After
      </h3>
      <div className="grid grid-cols-2 gap-4 rounded-lg overflow-hidden">
        {/* Before Column */}
        <div className="overflow-hidden rounded-lg">
          <div className="bg-orange-500 text-white text-center py-2 font-semibold">
            Before
          </div>
          <div className={`p-4 ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <ul className="space-y-3">
              {beforeItems.map((item, index) => (
                <li
                  key={index}
                  className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}
                  style={{
                    color: textStyle.color || (dark ? '#d1d5db' : undefined),
                    lineHeight: textStyle.lineHeight || '1.5',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* After Column */}
        <div className="overflow-hidden rounded-lg">
          <div className="bg-orange-500 text-white text-center py-2 font-semibold">
            After
          </div>
          <div className={`p-4 ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <ul className="space-y-3">
              {afterItems.map((item, index) => (
                <li
                  key={index}
                  className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}
                  style={{
                    color: textStyle.color || (dark ? '#d1d5db' : undefined),
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
    </div>
  );
}
