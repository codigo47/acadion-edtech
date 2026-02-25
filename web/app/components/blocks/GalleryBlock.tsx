'use client';

import React from 'react';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt?: string;
}

export interface GalleryBlockProps {
  images: GalleryImage[];
  dark?: boolean;
}

export default function GalleryBlock({ images, dark = false }: GalleryBlockProps) {
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div
        className="flex flex-row gap-4 overflow-x-auto"
        style={{
          gridTemplateColumns: `repeat(${images.length}, minmax(200px, 1fr))`
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 relative h-36 sm:h-48 min-w-[140px] sm:min-w-[200px] flex-1"
          >
            <Image
              src={image.src}
              alt={image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
