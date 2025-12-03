'use client';

import React from 'react';
import Image from './Image';
import Paragraph from './Paragraph';
import { TextStyle, BackgroundStyle } from './types';

export interface ImageWithTextLeftBlockProps {
  image: string;
  text: string;
  alt?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function ImageWithTextLeftBlock({
  image,
  text,
  alt = 'Image',
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: ImageWithTextLeftBlockProps) {
  return (
    <div className={`w-full p-4 flex flex-row-reverse gap-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-1/2 h-64">
        <Image src={image} alt={alt} />
      </div>
      <div
        className={`w-1/2 flex items-center p-4 rounded-lg ${dark ? 'bg-gray-800' : ''}`}
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
