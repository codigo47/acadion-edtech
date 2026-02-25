'use client';

import React, { useState, useCallback } from 'react';
import { GripVertical, Check, X } from 'lucide-react';

export interface SortingItem {
  id: string;
  title: string;
  content?: string;
  correctOrder: number;
}

export interface SortingStepsBlockProps {
  items: SortingItem[];
  dark?: boolean;
}

export default function SortingStepsBlock({ items: initialItems = [], dark = false }: SortingStepsBlockProps) {
  const [items, setItems] = useState(initialItems || []);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Handle empty or missing items
  if (!items || items.length === 0) {
    return (
      <div className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
        <p>No items to sort</p>
      </div>
    );
  }

  const isCorrectOrder = () => {
    return items.every((item, index) => item.correctOrder === index + 1);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const checkOrder = () => {
    setShowResult(true);
  };

  const reset = () => {
    setItems(initialItems || []);
    setShowResult(false);
  };

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-move transition-all ${
              draggedIndex === index ? 'opacity-50 scale-105' : ''
            } ${
              showResult
                ? item.correctOrder === index + 1
                  ? 'border-green-500 bg-green-50'
                  : 'border-red-500 bg-red-50'
                : dark
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <GripVertical className={`w-5 h-5 flex-shrink-0 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
            <div className="flex-1">
              <p className={`font-medium ${showResult ? 'text-gray-900' : (dark ? 'text-white' : 'text-gray-900')}`}>{item.title}</p>
              {item.content && (
                <p className={`text-sm mt-1 ${showResult ? 'text-gray-600' : (dark ? 'text-gray-400' : 'text-gray-600')}`}>{item.content}</p>
              )}
            </div>
            {showResult && (
              <div className="flex-shrink-0">
                {item.correctOrder === index + 1 ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        <button
          onClick={checkOrder}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Check Order
        </button>
        <button
          onClick={reset}
          className={`px-6 py-2 rounded-lg transition-colors ${dark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Reset
        </button>
        {showResult && (
          <div className="flex items-center gap-2">
            {isCorrectOrder() ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">Correct!</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-medium">Try again!</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
