'use client';

import React from 'react';
import Image from 'next/image';
import { TextStyle } from './types';

export interface QuoteImageBlockProps {
  content: string;
  author?: string;
  avatar?: string;
  backgroundImage: string;
  textStyle?: TextStyle;
  overlayOpacity?: number;
  dark?: boolean;
}

export default function QuoteImageBlock({
  content,
  author,
  avatar,
  backgroundImage,
  textStyle = {},
  overlayOpacity = 0.5,
  dark = false,
}: QuoteImageBlockProps) {
  return (
    <div className="w-full relative overflow-hidden rounded-lg min-h-[300px] flex items-center justify-center">
      <div className="absolute inset-0">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        />
      </div>

      <div className="relative z-10 p-8 max-w-2xl mx-auto text-center">
        {avatar && (
          <div className="relative w-16 h-16 mx-auto mb-4">
            <Image
              src={avatar}
              alt={author || 'Author'}
              fill
              className="rounded-full object-cover border-2 border-white/50"
            />
          </div>
        )}

        <svg
          className="w-8 h-8 mx-auto mb-4 opacity-50"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{ color: '#FFFFFF' }}
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <p
          className="text-lg italic mb-4 text-white"
          style={{
            fontSize: textStyle.fontSize || '20px',
            lineHeight: textStyle.lineHeight || '1.6',
          }}
        >
          &ldquo;{content}&rdquo;
        </p>

        {author && (
          <span className="font-medium text-white/80">
            — {author}
          </span>
        )}
      </div>
    </div>
  );
}
