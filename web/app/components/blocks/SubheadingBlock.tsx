'use client';

import React from 'react';
import Heading from './Heading';
import { TextStyle } from './types';

export interface SubheadingBlockProps {
  subheading: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function SubheadingBlock({
  subheading,
  textStyle = {},
  dark = false,
}: SubheadingBlockProps) {
  const defaultStyle: TextStyle = {
    ...textStyle,
    color: textStyle.color || (dark ? '#9ca3af' : 'var(--block-text-color, #6B7280)'),
  };

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <Heading text={subheading} level={3} textStyle={defaultStyle} dark={dark} />
    </div>
  );
}
