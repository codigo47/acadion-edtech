'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { TextStyle, BackgroundStyle, BlockStyle } from './types';

export type ImagePosition = 'left' | 'right' | 'top' | 'bottom' | 'stretched';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  image?: string;
  imagePosition?: ImagePosition;
}

export interface AccordionBlockProps {
  items: AccordionItem[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  blockStyle?: BlockStyle;
  allowMultiple?: boolean;
  dark?: boolean;
}

export default function AccordionBlock({
  items = [],
  textStyle = {},
  textBackgroundStyle = {},
  blockStyle = 'A',
  allowMultiple = false,
  dark = false,
}: AccordionBlockProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  // Handle empty or missing items
  if (!items || items.length === 0) {
    return (
      <div className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
        <p>No accordion items available</p>
      </div>
    );
  }

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const isOpen = (id: string) => openItems.includes(id);

  const styleClasses = dark ? {
    A: {
      container: 'border border-gray-700 rounded-lg',
      header: 'bg-gray-800 hover:bg-gray-700',
      headerOpen: 'bg-primary/20',
      content: 'bg-gray-800',
      icon: 'text-gray-400',
    },
    B: {
      container: 'border-l-4 border-primary shadow-sm',
      header: 'bg-gray-800 hover:bg-gray-700',
      headerOpen: 'bg-primary/30',
      content: 'bg-gray-800',
      icon: 'text-primary',
    },
    C: {
      container: 'border-2 border-gray-600 rounded-xl',
      header: 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700',
      headerOpen: 'bg-gradient-to-r from-blue-900/50 to-gray-900',
      content: 'bg-gray-800',
      icon: 'text-blue-400',
    },
  }[blockStyle] : {
    A: {
      container: 'border border-gray-200 rounded-lg',
      header: 'bg-white hover:bg-gray-50',
      headerOpen: 'bg-primary/10',
      content: 'bg-white',
      icon: 'text-gray-500',
    },
    B: {
      container: 'border-l-4 border-primary shadow-sm',
      header: 'bg-gray-50 hover:bg-gray-100',
      headerOpen: 'bg-primary/20',
      content: 'bg-white',
      icon: 'text-primary',
    },
    C: {
      container: 'border-2 border-gray-300 rounded-xl',
      header: 'bg-gradient-to-r from-gray-50 to-white hover:from-gray-100',
      headerOpen: 'bg-gradient-to-r from-blue-50 to-white',
      content: 'bg-gray-50',
      icon: 'text-blue-500',
    },
  }[blockStyle];

  const renderContent = (item: AccordionItem) => {
    const imagePosition = item.imagePosition || 'right';
    const hasImage = !!item.image;

    if (!hasImage) {
      return (
        <p
          style={{
            fontSize: textStyle.fontSize,
            color: textStyle.color || (dark ? '#d1d5db' : '#4B5563'),
            lineHeight: textStyle.lineHeight || '1.5',
          }}
        >
          {item.content}
        </p>
      );
    }

    if (imagePosition === 'stretched') {
      return (
        <div className="relative">
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={item.image!}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
              <p
                className="text-white text-center"
                style={{
                  fontSize: textStyle.fontSize,
                  lineHeight: textStyle.lineHeight || '1.5',
                }}
              >
                {item.content}
              </p>
            </div>
          </div>
        </div>
      );
    }

    const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
    const isReversed = imagePosition === 'right' || imagePosition === 'bottom';

    const containerClass = isHorizontal
      ? `flex ${isReversed ? 'flex-row' : 'flex-row-reverse'} gap-4`
      : `flex ${isReversed ? 'flex-col-reverse' : 'flex-col'} gap-4`;

    const imageContainerClass = isHorizontal
      ? 'relative w-1/3 h-32 flex-shrink-0'
      : 'relative w-full h-40';

    return (
      <div className={containerClass}>
        <div className="flex-1">
          <p
            style={{
              fontSize: textStyle.fontSize,
              color: textStyle.color || (dark ? '#d1d5db' : '#4B5563'),
              lineHeight: textStyle.lineHeight || '1.5',
            }}
          >
            {item.content}
          </p>
        </div>
        <div className={imageContainerClass}>
          <Image
            src={item.image!}
            alt={item.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={`${styleClasses.container} overflow-hidden`}>
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                isOpen(item.id) ? styleClasses.headerOpen : styleClasses.header
              }`}
              aria-expanded={isOpen(item.id)}
            >
              <span
                className={`font-medium text-left ${dark ? 'text-white' : ''}`}
                style={{
                  fontSize: textStyle.fontSize,
                  fontWeight: textStyle.fontWeight || '500',
                  color: textStyle.color || (dark ? '#ffffff' : undefined),
                  fontStyle: textStyle.fontStyle,
                }}
              >
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${styleClasses.icon} ${
                  isOpen(item.id) ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen(item.id) ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              <div className={`${styleClasses.content} p-4 border-t ${dark ? 'border-gray-700' : 'border-gray-100'}`}>
                {renderContent(item)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
