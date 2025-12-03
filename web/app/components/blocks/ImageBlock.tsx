'use client';

import React from 'react';
import Image from './Image';

export interface ImageBlockProps {
  image: string;
  alt?: string;
  dark?: boolean;
}

export default function ImageBlock({
  image,
  alt = 'Image',
  dark = false,
}: ImageBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full h-64">
        <Image src={image} alt={alt} />
      </div>
    </div>
  );
}
