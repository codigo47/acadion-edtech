'use client';

import React from 'react';
import Image from './Image';
import Paragraph from './Paragraph';
import { TextStyle } from './types';

export interface ImageWithTextCenterBlockProps {
  image: string;
  text: string;
  alt?: string;
  textStyle?: TextStyle;
  zoomable?: boolean;
  dark?: boolean;
}

export default function ImageWithTextCenterBlock({
  image,
  text,
  alt = 'Image',
  textStyle = {},
  zoomable = false,
  dark = false,
}: ImageWithTextCenterBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Image src={image} alt={alt} zoomable={zoomable} />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6">
          <Paragraph
            content={text}
            contentStyle={{ ...textStyle, textAlign: 'center', color: '#ffffff' }}
            dark={false}
          />
        </div>
      </div>
    </div>
  );
}
