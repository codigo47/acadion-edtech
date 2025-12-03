'use client';

import React from 'react';
import { TextStyle } from './types';

export interface ParagraphProps {
  content: string;
  contentStyle?: TextStyle;
  dark?: boolean;
}

export default function Paragraph({
  content,
  contentStyle = {},
  dark = false,
}: ParagraphProps) {
  return (
    <p
      className={`text-base leading-relaxed ${dark ? 'text-gray-300' : ''}`}
      style={{
        fontSize: contentStyle.fontSize,
        fontWeight: contentStyle.fontWeight,
        color: contentStyle.color || (dark ? '#d1d5db' : undefined),
        fontStyle: contentStyle.fontStyle,
        textAlign: contentStyle.textAlign,
        lineHeight: contentStyle.lineHeight || '1.75',
      }}
    >
      {content}
    </p>
  );
}
