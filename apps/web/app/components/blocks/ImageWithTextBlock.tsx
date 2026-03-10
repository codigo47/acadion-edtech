'use client';

import React from 'react';
import Image from './Image';
import Paragraph from './Paragraph';
import { TextStyle, BackgroundStyle } from './types';

export interface ImageWithTextBlockProps {
  image: string;
  text: string;
  alt?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  zoomable?: boolean;
  dark?: boolean;
  imageSize?: number;
}

export default function ImageWithTextBlock({
  image,
  text,
  alt = 'Image',
  textStyle = {},
  textBackgroundStyle = {},
  zoomable = false,
  dark = false,
  imageSize,
}: ImageWithTextBlockProps) {
  return (
    <div className={`w-full p-4 flex flex-col md:flex-row gap-4 ${dark ? 'bg-gray-900' : ''}`} style={{ alignItems: 'stretch' }}>
      <div className="relative h-48 md:h-64" style={{ width: '100%', flex: `0 0 ${imageSize || 50}%` }}>
        <Image src={image} alt={alt} zoomable={zoomable} />
      </div>
      <div
        className={`flex items-center p-4 rounded-lg ${dark ? 'bg-gray-800' : ''}`}
        style={{
          flex: 1,
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
