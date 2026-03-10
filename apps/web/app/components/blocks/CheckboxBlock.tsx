'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { TextStyle, BackgroundStyle, BlockStyle } from './types';

export interface CheckboxItem {
  id: string;
  text: string;
  checked?: boolean;
}

export interface CheckboxBlockProps {
  items: CheckboxItem[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  blockStyle?: BlockStyle;
  dark?: boolean;
}

export default function CheckboxBlock({
  items: initialItems,
  textStyle = {},
  textBackgroundStyle = {},
  blockStyle = 'A',
  dark = false,
}: CheckboxBlockProps) {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const styleClasses = dark ? {
    A: {
      checkbox: 'border-2 border-gray-600 rounded',
      checkedCheckbox: 'bg-green-600 border-green-600',
      text: 'text-gray-300',
      checkedText: 'text-green-400 line-through',
    },
    B: {
      checkbox: 'border-2 border-primary rounded-full',
      checkedCheckbox: 'bg-primary border-primary',
      text: 'text-gray-300',
      checkedText: 'text-gray-500 line-through',
    },
    C: {
      checkbox: 'border-2 border-blue-500 rounded-md',
      checkedCheckbox: 'bg-blue-600 border-blue-600',
      text: 'text-gray-200',
      checkedText: 'text-blue-400 line-through opacity-70',
    },
  }[blockStyle] : {
    A: {
      checkbox: 'border-2 border-gray-300 rounded',
      checkedCheckbox: 'bg-green-500 border-green-500',
      text: 'text-gray-700',
      checkedText: 'text-green-600 line-through',
    },
    B: {
      checkbox: 'border-2 border-primary rounded-full',
      checkedCheckbox: 'bg-primary border-primary',
      text: 'text-gray-700',
      checkedText: 'text-gray-400 line-through',
    },
    C: {
      checkbox: 'border-2 border-blue-400 rounded-md',
      checkedCheckbox: 'bg-blue-500 border-blue-500',
      text: 'text-gray-800',
      checkedText: 'text-blue-400 line-through opacity-70',
    },
  }[blockStyle];

  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-6 h-6 flex items-center justify-center transition-all ${
                item.checked
                  ? styleClasses.checkedCheckbox
                  : styleClasses.checkbox
              }`}
              aria-label={item.checked ? 'Uncheck item' : 'Check item'}
            >
              {item.checked && <Check className="w-4 h-4 text-white" />}
            </button>
            <span
              className={`transition-all ${
                item.checked ? styleClasses.checkedText : styleClasses.text
              }`}
              style={{
                fontSize: textStyle.fontSize,
                fontWeight: textStyle.fontWeight,
                fontStyle: textStyle.fontStyle,
                lineHeight: textStyle.lineHeight,
              }}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
