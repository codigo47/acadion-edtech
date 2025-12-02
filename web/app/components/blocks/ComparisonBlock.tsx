'use client';

import React from 'react';
import { TextStyle, BackgroundStyle, BlockStyle } from './types';

export interface ComparisonItem {
  title: string;
  content: string;
}

export interface ComparisonBlockProps {
  items: ComparisonItem[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  blockStyle?: BlockStyle;
}

export default function ComparisonBlock({
  items,
  textStyle = {},
  textBackgroundStyle = {},
  blockStyle = 'A',
}: ComparisonBlockProps) {
  const styleClasses = {
    A: {
      container: 'bg-white border border-gray-200',
      header: 'bg-primary text-white',
      content: 'bg-white',
    },
    B: {
      container: 'bg-gradient-to-b from-blue-50 to-white border border-blue-200',
      header: 'bg-blue-600 text-white',
      content: 'bg-transparent',
    },
    C: {
      container: 'bg-gray-50 border-2 border-gray-300',
      header: 'bg-gray-800 text-white',
      content: 'bg-white',
    },
  }[blockStyle];

  const getGridCols = () => {
    const count = items.length;
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  return (
    <div
      className="w-full p-4 rounded-lg"
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor,
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <div className={`grid gap-4 ${getGridCols()}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styleClasses.container} rounded-lg overflow-hidden shadow-sm`}
          >
            <div className={`${styleClasses.header} p-4`}>
              <h3
                className="text-lg font-semibold text-center"
                style={{
                  fontSize: textStyle.fontSize,
                  fontWeight: textStyle.fontWeight || '600',
                  fontStyle: textStyle.fontStyle,
                }}
              >
                {item.title}
              </h3>
            </div>
            <div className={`${styleClasses.content} p-4`}>
              <p
                className="text-center"
                style={{
                  fontSize: textStyle.fontSize,
                  color: textStyle.color,
                  lineHeight: textStyle.lineHeight,
                }}
              >
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
