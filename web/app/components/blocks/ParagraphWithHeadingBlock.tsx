'use client';

import React from 'react';
import Paragraph from './Paragraph';
import { TextStyle } from './types';

export interface ParagraphWithHeadingBlockProps {
  heading: string;
  content: string;
  headingStyle?: TextStyle;
  contentStyle?: TextStyle;
  dark?: boolean;
}

export default function ParagraphWithHeadingBlock({
  heading,
  content,
  headingStyle = {},
  contentStyle = {},
  dark = false,
}: ParagraphWithHeadingBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <h2
        className={`mb-4 text-2xl font-bold ${dark ? 'text-white' : ''}`}
        style={{
          fontSize: headingStyle.fontSize || '1.5rem',
          fontWeight: headingStyle.fontWeight || '700',
          color: headingStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)'),
          fontStyle: headingStyle.fontStyle,
          textAlign: headingStyle.textAlign,
          lineHeight: headingStyle.lineHeight,
        }}
      >
        {heading}
      </h2>
      <Paragraph content={content} contentStyle={contentStyle} dark={dark} />
    </div>
  );
}
