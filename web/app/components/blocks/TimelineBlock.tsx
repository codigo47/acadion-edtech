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
}

export default function TimelineBlock({
  events,
  textStyle = {},
  textBackgroundStyle = {},
}: TimelineBlockProps) {
  return (
    <div
      className="w-full p-4 rounded-lg"
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor,
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
              <div className="absolute left-2.5 top-1.5 w-4 h-4 bg-primary rounded-full border-2 border-white shadow" />

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                {event.date && (
                  <span className="text-sm text-gray-500 mb-1 block">{event.date}</span>
                )}
                <h4
                  className="text-lg font-semibold mb-2"
                  style={{
                    fontSize: textStyle.fontSize,
                    fontWeight: textStyle.fontWeight || '600',
                    color: textStyle.color,
                    fontStyle: textStyle.fontStyle,
                  }}
                >
                  {event.title}
                </h4>
                <p
                  className="text-gray-600"
                  style={{
                    fontSize: textStyle.fontSize,
                    color: textStyle.color || '#4B5563',
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
