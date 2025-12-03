'use client';

import React from 'react';
import Image from 'next/image';
import { TextStyle } from './types';

export interface QuoteCenterLightBlockProps {
  content: string;
  author?: string;
  avatar?: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function QuoteCenterLightBlock({
  content,
  author,
  avatar,
  textStyle = {},
  dark = false,
}: QuoteCenterLightBlockProps) {
  return (
    <div className={`w-full p-8 flex flex-col items-center justify-center ${dark ? 'bg-gray-900' : ''}`}>
      {avatar && (
        <div className="relative w-16 h-16 mb-4">
          <Image
            src={avatar}
            alt={author || 'Author'}
            fill
            className="rounded-full object-cover"
          />
        </div>
      )}

      <svg
        className="w-8 h-8 mb-4 opacity-30"
        fill="currentColor"
        viewBox="0 0 24 24"
        style={{ color: dark ? '#9F80DA' : textStyle.color || '#9F80DA' }}
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <p
        className={`text-lg italic text-center mb-4 max-w-xl ${dark ? 'text-gray-300' : ''}`}
        style={{
          fontSize: textStyle.fontSize || '18px',
          color: dark ? '#d1d5db' : textStyle.color,
          lineHeight: textStyle.lineHeight || '1.6',
        }}
      >
        &ldquo;{content}&rdquo;
      </p>

      {author && (
        <span
          className={`font-medium ${dark ? 'text-gray-400' : 'text-gray-600'}`}
          style={{
            color: textStyle.color || (dark ? '#9ca3af' : '#6B7280'),
          }}
        >
          — {author}
        </span>
      )}
    </div>
  );
}
