'use client';

import React from 'react';
import Image from './Image';

export interface ImageBlockProps {
  image: string;
  alt?: string;
  zoomable?: boolean;
  dark?: boolean;
}

export default function ImageBlock({
  image,
  alt = 'Image',
  zoomable = false,
  dark = false,
}: ImageBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full h-64">
        <Image src={image} alt={alt} zoomable={zoomable} />
      </div>
    </div>
  );
}
