'use client';

import React from 'react';
import Highlight from './Highlight';
import { TextStyle } from './types';

export interface HighlightBackgroundBlockProps {
  highlight: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function HighlightBackgroundBlock({
  highlight,
  textStyle = {},
  dark = false,
}: HighlightBackgroundBlockProps) {
  return (
    <div
      className={`w-full p-6 rounded-lg ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}
    >
      <Highlight
        text={highlight}
        textStyle={{ ...textStyle, textAlign: 'left' }}
        dark={dark}
      />
    </div>
  );
}
