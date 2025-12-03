'use client';

import React from 'react';
import Paragraph from './Paragraph';
import { TextStyle } from './types';

export interface ParagraphWithSubheadingBlockProps {
  subheading: string;
  content: string;
  subheadingStyle?: TextStyle;
  contentStyle?: TextStyle;
  dark?: boolean;
}

export default function ParagraphWithSubheadingBlock({
  subheading,
  content,
  subheadingStyle = {},
  contentStyle = {},
  dark = false,
}: ParagraphWithSubheadingBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <h3
        className={`mb-3 text-lg font-semibold ${dark ? 'text-gray-300' : 'text-gray-700'}`}
        style={{
          fontSize: subheadingStyle.fontSize || '1.125rem',
          fontWeight: subheadingStyle.fontWeight || '600',
          color: subheadingStyle.color || (dark ? '#d1d5db' : '#374151'),
          fontStyle: subheadingStyle.fontStyle,
          textAlign: subheadingStyle.textAlign,
          lineHeight: subheadingStyle.lineHeight,
        }}
      >
        {subheading}
      </h3>
      <Paragraph content={content} contentStyle={contentStyle} dark={dark} />
    </div>
  );
}
