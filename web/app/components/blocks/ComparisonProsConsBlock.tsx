'use client';

import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { TextStyle } from './types';

export interface ComparisonProsConsBlockProps {
  pros: string[];
  cons: string[];
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function ComparisonProsConsBlock({
  pros,
  cons,
  textStyle = {},
  dark = false,
}: ComparisonProsConsBlockProps) {
  return (
    <div className={`w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
        Pros and Cons
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Pros Column */}
        <div className={`p-4 rounded-lg ${dark ? 'bg-green-900/30' : 'bg-green-50'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <ThumbsUp className="w-4 h-4 text-white" />
            </div>
            <span className={`font-semibold ${dark ? 'text-green-400' : 'text-green-700'}`}>
              Pros
            </span>
          </div>
          <ul className="space-y-2">
            {pros.map((item, index) => (
              <li
                key={index}
                className={`text-sm flex items-start gap-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`}
                style={{
                  color: textStyle.color || (dark ? '#d1d5db' : undefined),
                  lineHeight: textStyle.lineHeight || '1.5',
                }}
              >
                <span className="text-green-500 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Cons Column */}
        <div className={`p-4 rounded-lg ${dark ? 'bg-red-900/30' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <ThumbsDown className="w-4 h-4 text-white" />
            </div>
            <span className={`font-semibold ${dark ? 'text-red-400' : 'text-red-700'}`}>
              Cons
            </span>
          </div>
          <ul className="space-y-2">
            {cons.map((item, index) => (
              <li
                key={index}
                className={`text-sm flex items-start gap-2 ${dark ? 'text-gray-300' : 'text-gray-600'}`}
                style={{
                  color: textStyle.color || (dark ? '#d1d5db' : undefined),
                  lineHeight: textStyle.lineHeight || '1.5',
                }}
              >
                <span className="text-red-500 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
