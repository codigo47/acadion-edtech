'use client';

import React from 'react';
import Highlight from './Highlight';
import { TextStyle, BlockStyle } from './types';

export interface HighlightNoteBlockProps {
  highlight: string;
  textStyle?: TextStyle;
  blockStyle?: BlockStyle;
  dark?: boolean;
}

export default function HighlightNoteBlock({
  highlight,
  textStyle = {},
  blockStyle = 'A',
  dark = false,
}: HighlightNoteBlockProps) {
  const styleClasses = dark ? {
    A: 'bg-yellow-900/50 border-l-4 border-yellow-500',
    B: 'bg-blue-900/50 border-l-4 border-blue-500',
    C: 'bg-purple-900/50 border-l-4 border-purple-500',
  }[blockStyle] : {
    A: 'bg-yellow-100 border-l-4 border-yellow-500',
    B: 'bg-blue-100 border-l-4 border-blue-500',
    C: 'bg-purple-100 border-l-4 border-purple-500',
  }[blockStyle];

  const textColors = dark ? {
    A: '#fde68a',
    B: '#93c5fd',
    C: '#d8b4fe',
  }[blockStyle] : {
    A: '#713f12',
    B: '#1e40af',
    C: '#581c87',
  }[blockStyle];

  return (
    <div className={`${styleClasses} p-6 rounded-r-lg my-4`}>
      <Highlight
        text={highlight}
        textStyle={{ ...textStyle, color: textStyle.color || textColors }}
        dark={dark}
      />
    </div>
  );
}
