'use client';

import React from 'react';
import Image from 'next/image';
import { TextStyle, BackgroundStyle } from './types';

export interface QuoteProps {
  content: string;
  author?: string;
  avatar?: string;
  title?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  backgroundImage?: string;
  dark?: boolean;
}

export default function Quote({
  content,
  author,
  avatar,
  title,
  textStyle = {},
  textBackgroundStyle = {},
  backgroundImage,
  dark = false,
}: QuoteProps) {
  return (
    <div
      className={`w-full p-8 rounded-lg relative overflow-hidden min-h-[200px] flex items-center justify-center ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F3F4F6'),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <svg
          className="w-12 h-12 mx-auto mb-4 opacity-30"
          fill="currentColor"
          viewBox="0 0 24 24"
          style={{ color: backgroundImage ? '#FFFFFF' : (dark ? '#9F80DA' : textStyle.color || '#9F80DA') }}
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        {title && (
          <h3
            className={`text-xl font-semibold mb-3 ${dark && !backgroundImage ? 'text-white' : ''}`}
            style={{
              fontSize: textStyle.fontSize,
              fontWeight: textStyle.fontWeight || '600',
              color: backgroundImage ? '#FFFFFF' : (dark ? '#ffffff' : textStyle.color),
              fontStyle: textStyle.fontStyle,
            }}
          >
            {title}
          </h3>
        )}

        <p
          className={`text-lg italic mb-4 ${dark && !backgroundImage ? 'text-gray-300' : ''}`}
          style={{
            fontSize: textStyle.fontSize || '18px',
            color: backgroundImage ? '#FFFFFF' : (dark ? '#d1d5db' : textStyle.color),
            lineHeight: textStyle.lineHeight || '1.6',
          }}
        >
          &ldquo;{content}&rdquo;
        </p>

        {(author || avatar) && (
          <div className="flex items-center justify-center gap-3 mt-4">
            {avatar && (
              <div className="relative w-10 h-10">
                <Image
                  src={avatar}
                  alt={author || 'Author'}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            {author && (
              <span
                className={`font-medium ${dark && !backgroundImage ? 'text-gray-400' : ''}`}
                style={{
                  color: backgroundImage ? '#FFFFFF' : (dark ? '#9ca3af' : textStyle.color || 'var(--block-text-color, #6B7280)'),
                }}
              >
                — {author}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
