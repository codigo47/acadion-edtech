'use client';

import React from 'react';
import NextImage from 'next/image';
import { TextStyle, BackgroundStyle, BlockStyle } from './types';

export interface ComparisonItem {
  title: string;
  content: string;
  image?: string;
}

export interface ComparisonBlockProps {
  items: ComparisonItem[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  blockStyle?: BlockStyle;
  dark?: boolean;
}

export default function ComparisonBlock({
  items,
  textStyle = {},
  textBackgroundStyle = {},
  blockStyle = 'A',
  dark = false,
}: ComparisonBlockProps) {
  const styleClasses = dark ? {
    A: {
      container: 'bg-gray-800 border border-gray-700',
      header: 'bg-primary text-white',
      content: 'bg-gray-800',
    },
    B: {
      container: 'bg-gradient-to-b from-blue-900/50 to-gray-800 border border-blue-700',
      header: 'bg-blue-600 text-white',
      content: 'bg-transparent',
    },
    C: {
      container: 'bg-gray-800 border-2 border-gray-600',
      header: 'bg-gray-700 text-white',
      content: 'bg-gray-800',
    },
  }[blockStyle] : {
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
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
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
            {item.image && (
              <div className="relative h-32 w-full">
                <NextImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized={item.image.startsWith('http')}
                />
              </div>
            )}
            <div className={`${styleClasses.content} p-4`}>
              <p
                className={`text-center ${dark ? 'text-gray-300' : ''}`}
                style={{
                  fontSize: textStyle.fontSize,
                  color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
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
