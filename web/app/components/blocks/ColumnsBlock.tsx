'use client';

import React from 'react';
import Paragraph from './Paragraph';
import { TextStyle } from './types';

export interface ColumnsBlockProps {
  content: string;
  columns?: 1 | 2 | 3 | 4;
  contentStyle?: TextStyle;
  dark?: boolean;
}

export default function ColumnsBlock({
  content,
  columns = 2,
  contentStyle = {},
  dark = false,
}: ColumnsBlockProps) {
  const columnClass = {
    1: 'columns-1',
    2: 'columns-2',
    3: 'columns-3',
    4: 'columns-4',
  }[columns];

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className={`${columnClass} gap-6`}>
        <Paragraph content={content} contentStyle={contentStyle} dark={dark} />
      </div>
    </div>
  );
}
