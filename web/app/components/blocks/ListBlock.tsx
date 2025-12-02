'use client';

import React from 'react';
import { TextStyle } from './types';

export interface ListBlockProps {
  items: string[];
  textStyle?: TextStyle;
  ordered?: boolean;
}

export default function ListBlock({
  items,
  textStyle = {},
  ordered = false,
}: ListBlockProps) {
  const ListTag = ordered ? 'ol' : 'ul';
  const listClass = ordered ? 'list-decimal' : 'list-disc';

  return (
    <div className="w-full p-4">
      <ListTag
        className={`${listClass} pl-6 space-y-2`}
        style={{
          fontSize: textStyle.fontSize,
          fontWeight: textStyle.fontWeight,
          color: textStyle.color,
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
