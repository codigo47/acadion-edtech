'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { TextStyle, BackgroundStyle } from './types';

export interface FillInTheBlankItem {
  id: string;
  text: string; // Use ___ or similar placeholder for the blank
  answer: string;
}

export interface FillInTheBlankBlockProps {
  items: FillInTheBlankItem[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  placeholder?: string;
}

export default function FillInTheBlankBlock({
  items,
  textStyle = {},
  textBackgroundStyle = {},
  placeholder = '___',
}: FillInTheBlankBlockProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleInputChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setShowResults((prev) => ({ ...prev, [id]: false }));
  };

  const checkAnswer = (id: string) => {
    setShowResults((prev) => ({ ...prev, [id]: true }));
  };

  const isCorrect = (item: FillInTheBlankItem) => {
    const userAnswer = answers[item.id]?.toLowerCase().trim();
    const correctAnswer = item.answer.toLowerCase().trim();
    return userAnswer === correctAnswer;
  };

  const renderTextWithBlank = (item: FillInTheBlankItem) => {
    const parts = item.text.split(placeholder);
    const showResult = showResults[item.id];
    const correct = isCorrect(item);

    return (
      <div className="flex flex-wrap items-center gap-2">
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span
              style={{
                fontSize: textStyle.fontSize,
                color: textStyle.color,
                lineHeight: textStyle.lineHeight,
              }}
            >
              {part}
            </span>
            {index < parts.length - 1 && (
              <div className="inline-flex items-center gap-2">
                <input
                  type="text"
                  value={answers[item.id] || ''}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer(item.id)}
                  className={`w-32 px-3 py-1 border-2 rounded-lg outline-none transition-colors ${
                    showResult
                      ? correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-300 focus:border-primary'
                  }`}
                  placeholder="Type answer"
                  disabled={showResult && correct}
                />
                {!showResult && answers[item.id] && (
                  <button
                    onClick={() => checkAnswer(item.id)}
                    className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Check
                  </button>
                )}
                {showResult && (
                  correct ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <div className="flex items-center gap-1">
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-gray-500">
                        Correct: <strong>{item.answer}</strong>
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
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
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-lg border border-gray-200">
            {renderTextWithBlank(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
