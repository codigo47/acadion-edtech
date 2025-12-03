'use client';

import React from 'react';
import { TextStyle } from './types';

export interface ListBlockProps {
  items: string[];
  textStyle?: TextStyle;
  ordered?: boolean;
  dark?: boolean;
}

export default function ListBlock({
  items,
  textStyle = {},
  ordered = false,
  dark = false,
}: ListBlockProps) {
  const ListTag = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal' : 'list-disc';

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <ListTag
        className={`${listClass} pl-6 space-y-2 ${dark ? 'text-gray-300' : ''}`}
        style={{
          fontSize: textStyle.fontSize,
          fontWeight: textStyle.fontWeight,
          color: textStyle.color || (dark ? '#d1d5db' : undefined),
          fontStyle: textStyle.fontStyle,
          textAlign: textStyle.textAlign,
          lineHeight: textStyle.lineHeight,
        }}
      >
        {items.map((item, index) => (
          <li key={index} className="text-base">
            {item}
          </li>
        ))}
      </ListTag>
    </div>
  );
}
