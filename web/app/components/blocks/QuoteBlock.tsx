'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TextStyle, BackgroundStyle } from './types';

export interface Quote {
  title?: string;
  content: string;
  author?: string;
  avatar?: string;
}

export interface QuoteBlockProps {
  quotes: Quote[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  backgroundImage?: string;
  dark?: boolean;
}

export default function QuoteBlock({
  quotes,
  textStyle = {},
  textBackgroundStyle = {},
  backgroundImage,
  dark = false,
}: QuoteBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleQuotes = quotes.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  const currentQuote = quotes[currentIndex];

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

        {currentQuote.title && (
          <h3
            className={`text-xl font-semibold mb-3 ${dark && !backgroundImage ? 'text-white' : ''}`}
            style={{
              fontSize: textStyle.fontSize,
              fontWeight: textStyle.fontWeight || '600',
              color: backgroundImage ? '#FFFFFF' : (dark ? '#ffffff' : textStyle.color),
              fontStyle: textStyle.fontStyle,
            }}
          >
            {currentQuote.title}
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
          &ldquo;{currentQuote.content}&rdquo;
        </p>

        {(currentQuote.author || currentQuote.avatar) && (
          <div className="flex items-center justify-center gap-3 mt-4">
            {currentQuote.avatar && (
              <div className="relative w-10 h-10">
                <Image
                  src={currentQuote.avatar}
                  alt={currentQuote.author || 'Author'}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            {currentQuote.author && (
              <span
                className={`font-medium ${dark && !backgroundImage ? 'text-gray-400' : ''}`}
                style={{
                  color: backgroundImage ? '#FFFFFF' : (dark ? '#9ca3af' : textStyle.color || '#6B7280'),
                }}
              >
                — {currentQuote.author}
              </span>
            )}
          </div>
        )}

        {hasMultipleQuotes && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={goToPrevious}
              className={`p-2 rounded-full transition-colors ${dark && !backgroundImage ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/20 hover:bg-white/30'}`}
              aria-label="Previous quote"
            >
              <ChevronLeft
                className="w-5 h-5"
                style={{ color: backgroundImage ? '#FFFFFF' : (dark ? '#9ca3af' : '#6B7280') }}
              />
            </button>
            <span
              className="text-sm"
              style={{ color: backgroundImage ? '#FFFFFF' : (dark ? '#9ca3af' : '#6B7280') }}
            >
              {currentIndex + 1} / {quotes.length}
            </span>
            <button
              onClick={goToNext}
              className={`p-2 rounded-full transition-colors ${dark && !backgroundImage ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/20 hover:bg-white/30'}`}
              aria-label="Next quote"
            >
              <ChevronRight
                className="w-5 h-5"
                style={{ color: backgroundImage ? '#FFFFFF' : (dark ? '#9ca3af' : '#6B7280') }}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
