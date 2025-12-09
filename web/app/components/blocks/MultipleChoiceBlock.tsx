'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { TextStyle, BackgroundStyle } from './types';

export interface MultipleChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface MultipleChoiceBlockProps {
  items: MultipleChoiceOption[];
  question?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function MultipleChoiceBlock({
  items = [],
  question,
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: MultipleChoiceBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Handle empty or missing items
  if (!items || items.length === 0) {
    return (
      <div className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
        <p>No options available</p>
      </div>
    );
  }

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
      return dark
        ? 'bg-gray-800 border-gray-700 hover:border-primary hover:bg-primary/10'
        : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5';
    }
    if (selectedId === option.id) {
      return option.isCorrect
        ? 'bg-green-50 border-green-500'
        : 'bg-red-50 border-red-500';
    }
    if (option.isCorrect) {
      return 'bg-green-50 border-green-300';
    }
    return dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200';
  };

  const selectedOption = items.find((item) => item.id === selectedId);

  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      {question && (
        <h3
          className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : ''}`}
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight || '600',
            color: textStyle.color || (dark ? '#ffffff' : undefined),
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
                color: showResult ? undefined : (textStyle.color || (dark ? '#d1d5db' : undefined)),
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
        <div className="mt-4 flex items-start gap-4">
          <button
            onClick={reset}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
          {selectedOption?.feedback && (
            <div
              className={`flex-1 p-3 rounded-lg ${
                selectedOption.isCorrect
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              <p className="text-sm">{selectedOption.feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
