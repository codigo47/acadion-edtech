'use client';

import React from 'react';
import Heading from './Heading';
import { TextStyle } from './types';

export interface HeadingBlockProps {
  heading: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function HeadingBlock({
  heading,
  level = 1,
  textStyle = {},
  dark = false,
}: HeadingBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <Heading text={heading} level={level} textStyle={textStyle} dark={dark} />
    </div>
  );
}
