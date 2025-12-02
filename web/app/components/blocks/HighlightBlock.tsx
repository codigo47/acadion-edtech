'use client';

import React from 'react';
import { TextStyle, BlockStyle } from './types';

export interface HighlightBlockProps {
  highlight: string;
  textStyle?: TextStyle;
  blockStyle?: BlockStyle;
}

export default function HighlightBlock({
  highlight,
  textStyle = {},
  blockStyle = 'A',
}: HighlightBlockProps) {
  const styleClasses = {
    A: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900',
    B: 'bg-blue-100 border-l-4 border-blue-500 text-blue-900',
    C: 'bg-purple-100 border-l-4 border-purple-500 text-purple-900',
  }[blockStyle];

  return (
    <div
      className={`${styleClasses} p-6 rounded-r-lg my-4`}
      style={{
        fontSize: textStyle.fontSize,
        fontWeight: textStyle.fontWeight,
        color: textStyle.color || undefined,
        fontStyle: textStyle.fontStyle,
        textAlign: textStyle.textAlign,
        lineHeight: textStyle.lineHeight,
      }}
    >
      <p className="text-lg font-medium">{highlight}</p>
    </div>
  );
}
