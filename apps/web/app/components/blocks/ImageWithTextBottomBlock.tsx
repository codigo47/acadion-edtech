'use client';

import React from 'react';
import Image from './Image';
import Paragraph from './Paragraph';
import { TextStyle, BackgroundStyle } from './types';

export interface ImageWithTextBottomBlockProps {
  image: string;
  text: string;
  alt?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  zoomable?: boolean;
  dark?: boolean;
}

export default function ImageWithTextBottomBlock({
  image,
  text,
  alt = 'Image',
  textStyle = {},
  textBackgroundStyle = {},
  zoomable = false,
  dark = false,
}: ImageWithTextBottomBlockProps) {
  return (
    <div className={`w-full p-4 flex flex-col gap-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full h-64">
        <Image src={image} alt={alt} zoomable={zoomable} />
      </div>
      <div
        className={`p-4 rounded-lg ${dark ? 'bg-gray-800' : ''}`}
        style={{
          backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#1f2937' : undefined),
          padding: textBackgroundStyle.padding,
          borderRadius: textBackgroundStyle.borderRadius,
        }}
      >
        <Paragraph content={text} contentStyle={textStyle} dark={dark} />
      </div>
    </div>
  );
}
