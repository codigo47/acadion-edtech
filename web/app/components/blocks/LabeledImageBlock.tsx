'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';

export interface LabeledImageItem {
  id: string;
  title: string;
  content: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface LabeledImageBlockProps {
  image: string;
  items: LabeledImageItem[];
  alt?: string;
  dark?: boolean;
}

export default function LabeledImageBlock({
  image,
  items,
  alt = 'Labeled image',
  dark = false,
}: LabeledImageBlockProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setActiveItem((prev) => (prev === id ? null : id));
  };

  const activeItemData = items.find((item) => item.id === activeItem);

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image src={image} alt={alt} fill className="object-cover" />

        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all transform -translate-x-1/2 -translate-y-1/2 ${
              activeItem === item.id
                ? 'bg-primary scale-110 shadow-lg'
                : 'bg-white/90 hover:bg-primary hover:scale-105 shadow'
            }`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            aria-label={`Show info for ${item.title}`}
          >
            {activeItem === item.id ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Plus
                className={`w-4 h-4 ${
                  activeItem === item.id ? 'text-white' : 'text-primary'
                }`}
              />
            )}
          </button>
        ))}

        {/* Popup */}
        {activeItemData && (
          <div
            className={`absolute rounded-lg shadow-xl p-4 max-w-xs z-10 animate-in fade-in duration-200 ${dark ? 'bg-gray-800' : 'bg-white'}`}
            style={{
              left: `${Math.min(activeItemData.x, 70)}%`,
              top: `${Math.min(activeItemData.y + 5, 60)}%`,
            }}
          >
            <h4 className={`font-semibold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
              {activeItemData.title}
            </h4>
            <p className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{activeItemData.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
