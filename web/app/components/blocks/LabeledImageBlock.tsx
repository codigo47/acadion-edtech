'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const goToPrevious = () => {
    if (activeIndex === null) return;
    const newIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const goToNext = () => {
    if (activeIndex === null) return;
    const newIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  const activeItemData = activeIndex !== null ? items[activeIndex] : null;

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image src={image} alt={alt} fill className="object-cover" />

        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => toggleItem(index)}
            className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all transform -translate-x-1/2 -translate-y-1/2 ${
              activeIndex === index
                ? 'bg-primary scale-110 shadow-lg'
                : 'bg-white/90 hover:bg-primary hover:scale-105 shadow'
            }`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            aria-label={`Show info for ${item.title}`}
          >
            {activeIndex === index ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Plus
                className={`w-4 h-4 ${
                  activeIndex === index ? 'text-white' : 'text-primary'
                }`}
              />
            )}
          </button>
        ))}

        {/* Popup */}
        {activeItemData && activeIndex !== null && (
          <div
            className={`absolute rounded-lg shadow-xl p-4 max-w-xs z-10 animate-in fade-in duration-200 ${dark ? 'bg-gray-800' : 'bg-white'}`}
            style={{
              left: `${Math.min(activeItemData.x, 70)}%`,
              top: `${Math.min(activeItemData.y + 5, 60)}%`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className={`font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
                {activeItemData.title}
              </h4>
              <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {activeIndex + 1} / {items.length}
              </span>
            </div>
            <p className={`text-sm mb-3 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {activeItemData.content}
            </p>

            {/* Navigation arrows */}
            <div className="flex items-center justify-between border-t pt-3 mt-2 border-gray-200 dark:border-gray-700">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  dark
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="Previous item"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs">Previous</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  dark
                    ? 'hover:bg-gray-700 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="Next item"
              >
                <span className="text-xs">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
