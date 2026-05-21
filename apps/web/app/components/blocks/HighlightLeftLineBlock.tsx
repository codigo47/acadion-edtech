'use client';

import React from 'react';
import Highlight from './Highlight';
import { TextStyle } from './types';

export interface HighlightLeftLineBlockProps {
  highlight: string;
  lineColor?: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function HighlightLeftLineBlock({
  highlight,
  lineColor = '#9F80DA',
  textStyle = {},
  dark = false,
}: HighlightLeftLineBlockProps) {
  return (
    <div className={`w-full py-6 px-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="flex flex-col items-start">
        <div
          className="w-[10%] h-1 rounded-full mb-4"
          style={{ backgroundColor: lineColor }}
        />
        <Highlight
          text={highlight}
          textStyle={{ ...textStyle, textAlign: 'left' }}
          dark={dark}
        />
      </div>
    </div>
  );
}
