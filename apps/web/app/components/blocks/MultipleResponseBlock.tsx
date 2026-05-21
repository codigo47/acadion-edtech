'use client';

import React, { useState } from 'react';
import { Check, X, Square, CheckSquare } from 'lucide-react';
import { TextStyle, BackgroundStyle } from './types';

export interface MultipleResponseOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface MultipleResponseBlockProps {
  items: MultipleResponseOption[];
  question?: string;
  correctFeedback?: string;
  incorrectFeedback?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function MultipleResponseBlock({
  items,
  question,
  correctFeedback,
  incorrectFeedback,
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: MultipleResponseBlockProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggleOption = (id: string) => {
    if (showResult) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const checkAnswers = () => {
    setShowResult(true);
  };

  const reset = () => {
    setSelectedIds([]);
    setShowResult(false);
  };

  const getOptionStyle = (option: MultipleResponseOption) => {
    const isSelected = selectedIds.includes(option.id);

    if (!showResult) {
      return isSelected
        ? 'bg-primary/10 border-primary'
        : dark
          ? 'bg-gray-800 border-gray-700 hover:border-primary hover:bg-primary/10'
          : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5';
    }

    if (isSelected && option.isCorrect) {
      return 'bg-green-50 border-green-500';
    }
    if (isSelected && !option.isCorrect) {
      return 'bg-red-50 border-red-500';
    }
    if (!isSelected && option.isCorrect) {
      return 'bg-yellow-50 border-yellow-500';
    }
    return dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200';
  };

  const isAllCorrect = showResult &&
    items.every((item) =>
      (item.isCorrect && selectedIds.includes(item.id)) ||
      (!item.isCorrect && !selectedIds.includes(item.id))
    );

  const feedbackToShow = showResult
    ? isAllCorrect
      ? correctFeedback
      : incorrectFeedback
    : null;

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
          className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : ''}`}
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight || '600',
            color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)'),
          }}
        >
          {question}
        </h3>
      )}

      <p className={`text-sm mb-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Select all that apply</p>

      <div className="space-y-3">
        {items.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              disabled={showResult}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${getOptionStyle(
                option
              )} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {!showResult ? (
                isSelected ? (
                  <CheckSquare className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )
              ) : (
                <div className="w-5 h-5 flex-shrink-0">
                  {isSelected && option.isCorrect && <Check className="w-5 h-5 text-green-600" />}
                  {isSelected && !option.isCorrect && <X className="w-5 h-5 text-red-600" />}
                  {!isSelected && option.isCorrect && <Check className="w-5 h-5 text-yellow-600" />}
                </div>
              )}
              <span
                style={{
                  fontSize: textStyle.fontSize,
                  color: showResult ? undefined : (textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)')),
                  lineHeight: textStyle.lineHeight,
                }}
              >
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mt-4">
        {!showResult ? (
          <button
            onClick={checkAnswers}
            disabled={selectedIds.length === 0}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answers
          </button>
        ) : (
          <>
            <button
              onClick={reset}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
            {feedbackToShow ? (
              <div
                className={`flex-1 p-3 rounded-lg ${
                  isAllCorrect
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                <p className="text-sm">{feedbackToShow}</p>
              </div>
            ) : (
              <span className={`font-medium py-2 ${isAllCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isAllCorrect ? 'All correct!' : 'Some answers are incorrect'}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
