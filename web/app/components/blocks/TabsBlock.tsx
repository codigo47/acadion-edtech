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
}

export default function TabsBlock({
  items,
  textStyle = {},
  textBackgroundStyle = {},
}: TabsBlockProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.id || '');

  const activeItem = items.find((item) => item.id === activeTab);

  return (
    <div
      className="w-full p-4 rounded-lg"
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor,
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      {/* Tab headers */}
      <div className="flex border-b border-gray-200">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-6 py-3 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === item.id
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
        <div className="p-6">
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
              color: textStyle.color || '#374151',
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
