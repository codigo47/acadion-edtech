'use client';

import React from 'react';
import NextImage from 'next/image';

export interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function Image({
  src,
  alt = 'Image',
  className = 'object-cover rounded-lg',
  fill = true,
  width,
  height,
}: ImageProps) {
  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        className={className}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
    />
  );
}
