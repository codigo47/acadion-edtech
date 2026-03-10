'use client';

import React from 'react';
import Paragraph from './Paragraph';
import { TextStyle } from './types';

export interface ColumnsBlockProps {
  content: string;
  columns?: 1 | 2 | 3 | 4;
  columnContent?: string[];
  contentStyle?: TextStyle;
  dark?: boolean;
}

export default function ColumnsBlock({
  content,
  columns = 2,
  columnContent,
  contentStyle = {},
  dark = false,
}: ColumnsBlockProps) {
  // If columnContent array is provided, render each column separately in a grid
  if (Array.isArray(columnContent) && columnContent.length > 0) {
    const gridClass = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    }[columns] || 'grid-cols-2';

    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        <div className={`grid ${gridClass} gap-6`}>
          {columnContent.map((col, idx) => (
            <Paragraph key={idx} content={col} contentStyle={contentStyle} dark={dark} />
          ))}
        </div>
      </div>
    );
  }

  // Fallback: CSS columns with a single content string
  const columnClass = {
    1: 'columns-1',
    2: 'columns-1 sm:columns-2',
    3: 'columns-1 sm:columns-2 lg:columns-3',
    4: 'columns-1 sm:columns-2 lg:columns-4',
  }[columns];

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className={`${columnClass} gap-6`}>
        <Paragraph content={content} contentStyle={contentStyle} dark={dark} />
      </div>
    </div>
  );
}
