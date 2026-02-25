'use client';

import React from 'react';
import { TextStyle } from './types';

export interface ComparisonMythFactBlockProps {
  myth: string;
  fact: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function ComparisonMythFactBlock({
  myth,
  fact,
  textStyle = {},
  dark = false,
}: ComparisonMythFactBlockProps) {
  return (
    <div className={`w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
        Myth vs. Fact
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Myth */}
        <div>
          <div className="bg-gray-900 text-white text-center py-2 px-4 rounded-lg font-semibold mb-3">
            Myth
          </div>
          <div className={`p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-rose-50'}`}>
            <p
              className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}
              style={{
                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                lineHeight: textStyle.lineHeight || '1.5',
              }}
            >
              {myth}
            </p>
          </div>
        </div>

        {/* Fact */}
        <div>
          <div className="bg-orange-500 text-white text-center py-2 px-4 rounded-lg font-semibold mb-3">
            Fact
          </div>
          <div className={`p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-orange-50'}`}>
            <p
              className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}
              style={{
                color: textStyle.color || (dark ? '#d1d5db' : undefined),
                lineHeight: textStyle.lineHeight || '1.5',
              }}
            >
              {fact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
