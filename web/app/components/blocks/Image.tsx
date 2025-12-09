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
  // Handle missing or invalid src
  if (!src) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`} style={{ minHeight: 200 }}>
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }

  // Use placeholder for sample images
  const imageSrc = src === '/sample.jpeg' || src.includes('sample')
    ? 'https://placehold.co/800x600/e2e8f0/64748b?text=Sample+Image'
    : src;

  if (fill) {
    return (
      <NextImage
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        unoptimized={imageSrc.startsWith('http')}
      />
    );
  }

  return (
    <NextImage
      src={imageSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      unoptimized={imageSrc.startsWith('http')}
    />
  );
}
