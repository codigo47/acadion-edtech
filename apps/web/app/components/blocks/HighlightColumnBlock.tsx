'use client';

import React from 'react';
import Highlight from './Highlight';
import { TextStyle } from './types';

export interface HighlightColumnBlockProps {
  highlight: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function HighlightColumnBlock({
  highlight,
  textStyle = {},
  dark = false,
}: HighlightColumnBlockProps) {
  return (
    <div className={`w-full py-8 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="max-w-xl mx-auto px-12">
        <Highlight
          text={highlight}
          textStyle={{ ...textStyle, textAlign: 'center' }}
          dark={dark}
        />
      </div>
    </div>
  );
}
