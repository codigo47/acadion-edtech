'use client';

import React from 'react';
import Highlight from './Highlight';
import { TextStyle } from './types';

export interface HighlightCenterLineBlockProps {
  highlight: string;
  lineColor?: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function HighlightCenterLineBlock({
  highlight,
  lineColor = '#9F80DA',
  textStyle = {},
  dark = false,
}: HighlightCenterLineBlockProps) {
  return (
    <div className={`w-full py-6 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="flex flex-col items-center">
        <div
          className="w-[10%] h-1 rounded-full mb-4"
          style={{ backgroundColor: lineColor }}
        />
        <Highlight
          text={highlight}
          textStyle={{ ...textStyle, textAlign: 'center' }}
          dark={dark}
        />
      </div>
    </div>
  );
}
