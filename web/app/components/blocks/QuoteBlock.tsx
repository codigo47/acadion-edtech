'use client';

import React from 'react';
import Quote, { QuoteProps } from './Quote';

export interface QuoteBlockProps extends QuoteProps {}

export default function QuoteBlock(props: QuoteBlockProps) {
  return <Quote {...props} />;
}
