'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TextStyle, BackgroundStyle } from './types';

export interface TabItem {
  id: string;
  title: string;
  content: string;
  image?: string;
}

export interface TabsBlockProps {
  items: TabItem[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

export default function TabsBlock({
  items = [],
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: TabsBlockProps) {
  const [activeTab, setActiveTab] = useState(items?.[0]?.id || '');

  // Handle empty or missing items
  if (!items || items.length === 0) {
    return (
      <div className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
        <p>No tabs available</p>
      </div>
    );
  }

  const activeItem = items.find((item) => item.id === activeTab) || items[0];

  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      {/* Tab headers */}
      <div className={`flex flex-wrap border-b ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 sm:px-6 py-2.5 sm:py-3 font-medium transition-colors border-b-2 -mb-px text-sm sm:text-base ${
              activeTab === item.id
                ? `border-primary text-primary ${dark ? 'bg-primary/10' : 'bg-primary/5'}`
                : `border-transparent ${dark ? 'text-gray-400 hover:text-gray-200 hover:border-gray-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
            }`}
            style={{
              fontSize: textStyle.fontSize,
              fontWeight: textStyle.fontWeight || '500',
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeItem && (
        <div className="p-3 sm:p-6">
          {activeItem.image && (
            <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p
            style={{
              fontSize: textStyle.fontSize,
              color: textStyle.color || (dark ? '#d1d5db' : '#374151'),
              lineHeight: textStyle.lineHeight || '1.6',
            }}
          >
            {activeItem.content}
          </p>
        </div>
      )}
    </div>
  );
}
