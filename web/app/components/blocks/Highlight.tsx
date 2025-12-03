'use client';

import React from 'react';
import { TextStyle } from './types';

export interface HighlightProps {
  text: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function Highlight({
  text,
  textStyle = {},
  dark = false,
}: HighlightProps) {
  return (
    <p
      className={`text-lg font-medium ${dark ? 'text-gray-200' : ''}`}
      style={{
        fontSize: textStyle.fontSize || '18px',
        fontWeight: textStyle.fontWeight || '500',
        color: textStyle.color || (dark ? '#e5e7eb' : undefined),
        fontStyle: textStyle.fontStyle,
        textAlign: textStyle.textAlign,
        lineHeight: textStyle.lineHeight || '1.6',
      }}
    >
      {text}
    </p>
  );
}
