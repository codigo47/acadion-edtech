'use client';

import React from 'react';
import NextImage from 'next/image';

export interface BannerBlockProps {
  title: string;
  subtitle?: string;
  image?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: 'small' | 'medium' | 'large';
  dark?: boolean;
}

export default function BannerBlock({
  title,
  subtitle,
  image,
  overlayColor = '#000000',
  overlayOpacity = 40,
  height = 'medium',
  dark = false,
}: BannerBlockProps) {
  const heightClasses = {
    small: 'min-h-[200px]',
    medium: 'min-h-[300px]',
    large: 'min-h-[400px]',
  };

  return (
    <div className={`w-full rounded-lg overflow-hidden relative ${heightClasses[height]} flex items-center justify-center ${dark ? 'bg-gray-900' : 'bg-gray-200'}`}>
      {image && (
        <NextImage
          src={image}
          alt={title || 'Banner'}
          fill
          className="object-cover"
          unoptimized={image.startsWith('http')}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity / 100 }}
      />
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          {title || 'Banner Title'}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-white/90 drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
