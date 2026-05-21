'use client';

import React from 'react';
import Paragraph from './Paragraph';
import { TextStyle } from './types';

export interface ParagraphBlockProps {
  content: string;
  contentStyle?: TextStyle;
  dark?: boolean;
}

export default function ParagraphBlock({
  content,
  contentStyle = {},
  dark = false,
}: ParagraphBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <Paragraph content={content} contentStyle={contentStyle} dark={dark} />
    </div>
  );
}
