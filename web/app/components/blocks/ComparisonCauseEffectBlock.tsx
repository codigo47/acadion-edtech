'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TextStyle } from './types';

export interface ComparisonCauseEffectBlockProps {
  cause: string;
  effect: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function ComparisonCauseEffectBlock({
  cause,
  effect,
  textStyle = {},
  dark = false,
}: ComparisonCauseEffectBlockProps) {
  return (
    <div className={`w-full p-6 rounded-lg border ${dark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
        Cause and Effect
      </h3>
      <div className="flex items-center gap-4">
        {/* Cause */}
        <div className={`flex-1 p-4 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p
            className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}
            style={{
              color: textStyle.color || (dark ? '#d1d5db' : undefined),
              lineHeight: textStyle.lineHeight || '1.5',
            }}
          >
            {cause}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Effect */}
        <div className="flex-1 p-4 rounded-lg bg-orange-500 text-white">
          <p
            className="text-sm"
            style={{
              lineHeight: textStyle.lineHeight || '1.5',
            }}
          >
            {effect}
          </p>
        </div>
      </div>
    </div>
  );
}
