'use client';

import React from 'react';
import { TextStyle, BackgroundStyle } from './types';

export interface TimelineEvent {
  title: string;
  description: string;
  date?: string;
}

export interface TimelineBlockProps {
  events: TimelineEvent[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function TimelineBlock({
  events,
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: TimelineBlockProps) {
  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary" />

        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="relative pl-12">
              {/* Dot on the line */}
              <div className={`absolute left-2.5 top-1.5 w-4 h-4 bg-primary rounded-full border-2 shadow ${dark ? 'border-gray-800' : 'border-white'}`} />

              <div className={`p-4 rounded-lg shadow-sm border ${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                {event.date && (
                  <span className={`text-sm mb-1 block ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{event.date}</span>
                )}
                <h4
                  className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : ''}`}
                  style={{
                    fontSize: textStyle.fontSize,
                    fontWeight: textStyle.fontWeight || '600',
                    color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)'),
                    fontStyle: textStyle.fontStyle,
                  }}
                >
                  {event.title}
                </h4>
                <p
                  className={dark ? 'text-gray-300' : 'text-gray-600'}
                  style={{
                    fontSize: textStyle.fontSize,
                    color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, #4B5563)'),
                    lineHeight: textStyle.lineHeight,
                  }}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
