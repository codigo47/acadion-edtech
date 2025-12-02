'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { TextStyle, BackgroundStyle } from './types';

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MultipleChoiceBlockProps {
  items: MultipleChoiceOption[];
  question?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
}

export default function MultipleChoiceBlock({
  items,
  question,
  textStyle = {},
  textBackgroundStyle = {},
}: MultipleChoiceBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (id: string) => {
    if (showResult) return;
    setSelectedId(id);
    setShowResult(true);
  };

  const reset = () => {
    setSelectedId(null);
    setShowResult(false);
  };

  const getOptionStyle = (option: MultipleChoiceOption) => {
    if (!showResult) {
      return 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5';
    }
    if (selectedId === option.id) {
      return option.isCorrect
        ? 'bg-green-50 border-green-500'
        : 'bg-red-50 border-red-500';
    }
    if (option.isCorrect) {
      return 'bg-green-50 border-green-300';
    }
    return 'bg-gray-50 border-gray-200';
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
      {question && (
        <h3
          className="text-lg font-semibold mb-4"
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight || '600',
            color: textStyle.color,
          }}
        >
          {question}
        </h3>
      )}

      <div className="space-y-3">
        {items.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            disabled={showResult}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between ${getOptionStyle(
              option
            )} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <span
              style={{
                fontSize: textStyle.fontSize,
                color: textStyle.color,
                lineHeight: textStyle.lineHeight,
              }}
            >
              {option.text}
            </span>
            {showResult && selectedId === option.id && (
              option.isCorrect ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-red-600" />
              )
            )}
            {showResult && option.isCorrect && selectedId !== option.id && (
              <Check className="w-5 h-5 text-green-400" />
            )}
          </button>
        ))}
      </div>

      {showResult && (
        <button
          onClick={reset}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
