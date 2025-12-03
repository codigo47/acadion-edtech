'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { TextStyle, BackgroundStyle } from './types';

export interface FlashCard {
  id: string;
  question: string;
  answer: string;
}

export interface FlashCardBlockProps {
  items: FlashCard[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function FlashCardBlock({
  items,
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: FlashCardBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = items[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setIsFlipped(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <div className="max-w-xl mx-auto">
        {/* Card */}
        <div
          onClick={flipCard}
          className="relative h-64 cursor-pointer perspective-1000"
        >
          <div
            className={`absolute inset-0 transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front - Question */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg flex items-center justify-center p-8 backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <span className="text-sm text-white/70 mb-2 block">Question</span>
                <p
                  className="text-xl text-white font-medium"
                  style={{
                    fontSize: textStyle.fontSize || '20px',
                    lineHeight: textStyle.lineHeight || '1.5',
                  }}
                >
                  {currentCard.question}
                </p>
                <span className="text-sm text-white/50 mt-4 block">Click to reveal answer</span>
              </div>
            </div>

            {/* Back - Answer */}
            <div
              className={`absolute inset-0 border-2 border-primary rounded-xl shadow-lg flex items-center justify-center p-8 ${dark ? 'bg-gray-800' : 'bg-white'}`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-center">
                <span className={`text-sm mb-2 block ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Answer</span>
                <p
                  className={`text-xl font-medium ${dark ? 'text-white' : 'text-gray-800'}`}
                  style={{
                    fontSize: textStyle.fontSize || '20px',
                    color: textStyle.color || (dark ? '#ffffff' : undefined),
                    lineHeight: textStyle.lineHeight || '1.5',
                  }}
                >
                  {currentCard.answer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goToPrevious}
            className={`p-3 rounded-full transition-colors ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            aria-label="Previous card"
          >
            <ChevronLeft className={`w-5 h-5 ${dark ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>

          <div className="flex items-center gap-4">
            <span className={dark ? 'text-gray-400' : 'text-gray-500'}>
              {currentIndex + 1} / {items.length}
            </span>
            <button
              onClick={() => setIsFlipped(false)}
              className={`p-2 rounded-full transition-colors ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              aria-label="Reset card"
            >
              <RotateCcw className={`w-4 h-4 ${dark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>

          <button
            onClick={goToNext}
            className={`p-3 rounded-full transition-colors ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            aria-label="Next card"
          >
            <ChevronRight className={`w-5 h-5 ${dark ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
