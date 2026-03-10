'use client';

import React from 'react';
import { TextStyle, BackgroundStyle } from './types';

export interface DialogMessage {
  text: string;
  isLeft?: boolean;
}

export interface ChatDialogBlockProps {
  messages: DialogMessage[];
  leftBubbleColor?: string;
  rightBubbleColor?: string;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function ChatDialogBlock({
  messages,
  leftBubbleColor = '#E5E7EB',
  rightBubbleColor = '#9F80DA',
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: ChatDialogBlockProps) {
  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : '#F9FAFB'),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <div className="space-y-3 max-w-xl mx-auto">
        {messages.map((message, index) => {
          const isLeft = message.isLeft ?? index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  isLeft ? 'rounded-bl-sm' : 'rounded-br-sm'
                }`}
                style={{
                  backgroundColor: isLeft
                    ? (dark ? '#374151' : leftBubbleColor)
                    : rightBubbleColor,
                  color: isLeft
                    ? (dark ? '#e5e7eb' : '#1F2937')
                    : '#FFFFFF',
                }}
              >
                <p
                  style={{
                    fontSize: textStyle.fontSize || '14px',
                    lineHeight: textStyle.lineHeight || '1.4',
                  }}
                >
                  {message.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
