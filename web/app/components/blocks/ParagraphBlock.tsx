'use client';

import React from 'react';
import { TextStyle } from './types';

export interface ParagraphBlockProps {
  heading?: string;
  content: string;
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  headingStyle?: TextStyle;
  contentStyle?: TextStyle;
}

export default function ParagraphBlock({
  heading,
  content,
  columns = 1,
  headingStyle = {},
  contentStyle = {},
}: ParagraphBlockProps) {
  const columnClass = {
    1: 'columns-1',
    2: 'columns-2',
    3: 'columns-3',
    4: 'columns-4',
    5: 'columns-5',
    6: 'columns-6',
    7: 'columns-7',
    8: 'columns-8',
  }[columns];

  return (
    <div className="w-full p-4">
      {heading && (
        <h2
          className="mb-4 text-2xl font-bold"
          style={{
            fontSize: headingStyle.fontSize,
            fontWeight: headingStyle.fontWeight,
            color: headingStyle.color,
            fontStyle: headingStyle.fontStyle,
            textAlign: headingStyle.textAlign,
            lineHeight: headingStyle.lineHeight,
          }}
        >
          {heading}
        </h2>
      )}
      <div
        className={`${columnClass} gap-6`}
        style={{
          fontSize: contentStyle.fontSize,
          fontWeight: contentStyle.fontWeight,
          color: contentStyle.color,
          fontStyle: contentStyle.fontStyle,
          textAlign: contentStyle.textAlign,
          lineHeight: contentStyle.lineHeight,
        }}
      >
        <p className="text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
