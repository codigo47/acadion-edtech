'use client';

import React from 'react';
import Image from './Image';
import Paragraph from './Paragraph';
import { TextStyle, BackgroundStyle } from './types';

export interface ImageWithTextTopBlockProps {
  image: string;
  text: string;
  alt?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function ImageWithTextTopBlock({
  image,
  text,
  alt = 'Image',
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: ImageWithTextTopBlockProps) {
  return (
    <div className={`w-full p-4 flex flex-col-reverse gap-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full h-64">
        <Image src={image} alt={alt} />
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
