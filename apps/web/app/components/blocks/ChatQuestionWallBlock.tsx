'use client';

import React from 'react';
import { TextStyle, BackgroundStyle } from './types';

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface ChatQuestionWallBlockProps {
  items: QuestionAnswer[];
  questionBubbleColor?: string;
  answerBubbleColor?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function ChatQuestionWallBlock({
  items,
  questionBubbleColor = '#E5E7EB',
  answerBubbleColor = '#9F80DA',
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: ChatQuestionWallBlockProps) {
  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F9FAFB'),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Questions Column */}
        <div className="space-y-3">
          <h4 className={`text-sm font-semibold mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Questions
          </h4>
          {items.map((item, index) => (
            <div
              key={`q-${index}`}
              className="px-4 py-3 rounded-2xl rounded-bl-sm"
              style={{
                backgroundColor: dark ? '#374151' : questionBubbleColor,
              }}
            >
              <p
                className={dark ? 'text-gray-200' : 'text-gray-800'}
                style={{
                  fontSize: textStyle.fontSize || '14px',
                  lineHeight: textStyle.lineHeight || '1.4',
                }}
              >
                {item.question}
              </p>
            </div>
          ))}
        </div>

        {/* Answers Column */}
        <div className="space-y-3">
          <h4 className={`text-sm font-semibold mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Answers
          </h4>
          {items.map((item, index) => (
            <div
              key={`a-${index}`}
              className="px-4 py-3 rounded-2xl rounded-br-sm"
              style={{
                backgroundColor: answerBubbleColor,
              }}
            >
              <p
                className="text-white"
                style={{
                  fontSize: textStyle.fontSize || '14px',
                  lineHeight: textStyle.lineHeight || '1.4',
                }}
              >
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
