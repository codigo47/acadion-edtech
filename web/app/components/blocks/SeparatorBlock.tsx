'use client';

import React from 'react';

export type SeparatorColor = 'gray' | 'red' | 'green' | 'blue' | 'yellow';

export interface SeparatorBlockProps {
  height?: number;
  color?: SeparatorColor;
  showNumber?: boolean;
  showLine?: boolean;
  number?: number;
}

export default function SeparatorBlock({
  height = 40,
  color = 'gray',
  showNumber = false,
  showLine = true,
  number = 1,
}: SeparatorBlockProps) {
  const colorClasses = {
    gray: 'bg-gray-300 text-gray-600 border-gray-300',
    red: 'bg-red-400 text-red-600 border-red-400',
    green: 'bg-green-400 text-green-600 border-green-400',
    blue: 'bg-blue-400 text-blue-600 border-blue-400',
    yellow: 'bg-yellow-400 text-yellow-600 border-yellow-400',
  }[color];

  const bgColor = colorClasses.split(' ')[0];
  const textColor = colorClasses.split(' ')[1];
  const borderColor = colorClasses.split(' ')[2];

  return (
    <div
      className="w-full flex items-center justify-center px-4"
      style={{ height: `${height}px` }}
    >
      {showLine && !showNumber && (
        <div className={`w-full h-0.5 ${bgColor}`} />
      )}

      {showNumber && !showLine && (
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${textColor} border-2 ${borderColor}`}
        >
          {number}
        </div>
      )}

      {showLine && showNumber && (
        <div className="w-full flex items-center gap-4">
          <div className={`flex-1 h-0.5 ${bgColor}`} />
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${textColor} border-2 ${borderColor}`}
          >
            {number}
          </div>
          <div className={`flex-1 h-0.5 ${bgColor}`} />
        </div>
      )}

      {!showLine && !showNumber && (
        <div className="w-full" />
      )}
    </div>
  );
}
