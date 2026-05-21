'use client';

import React from 'react';
import HighlightNoteBlock, { HighlightNoteBlockProps } from './HighlightNoteBlock';

export interface HighlightBlockProps extends HighlightNoteBlockProps {}

export default function HighlightBlock(props: HighlightBlockProps) {
  return <HighlightNoteBlock {...props} />;
}
