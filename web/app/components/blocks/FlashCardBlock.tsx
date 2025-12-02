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
}

export default function FlashCardBlock({
  items,
  textStyle = {},
  textBackgroundStyle = {},
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
      className="w-full p-4 rounded-lg"
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor,
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
              className="absolute inset-0 bg-white border-2 border-primary rounded-xl shadow-lg flex items-center justify-center p-8"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-center">
                <span className="text-sm text-gray-500 mb-2 block">Answer</span>
                <p
                  className="text-xl text-gray-800 font-medium"
                  style={{
                    fontSize: textStyle.fontSize || '20px',
                    color: textStyle.color,
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
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-4">
            <span className="text-gray-500">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              onClick={() => setIsFlipped(false)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Reset card"
            >
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button
            onClick={goToNext}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
