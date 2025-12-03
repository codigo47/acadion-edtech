'use client';

import React from 'react';

export type SeparatorColor = 'gray' | 'red' | 'green' | 'blue' | 'yellow';

export interface SeparatorBlockProps {
  height?: number;
  color?: SeparatorColor;
  showNumber?: boolean;
  showLine?: boolean;
  number?: number;
  dark?: boolean;
}

export default function SeparatorBlock({
  height = 40,
  color = 'gray',
  showNumber = false,
  showLine = true,
  number = 1,
  dark = false,
}: SeparatorBlockProps) {
  const colorClasses = dark ? {
    gray: 'bg-gray-600 text-gray-400 border-gray-600',
    red: 'bg-red-500 text-red-400 border-red-500',
    green: 'bg-green-500 text-green-400 border-green-500',
    blue: 'bg-blue-500 text-blue-400 border-blue-500',
    yellow: 'bg-yellow-500 text-yellow-400 border-yellow-500',
  }[color] : {
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
