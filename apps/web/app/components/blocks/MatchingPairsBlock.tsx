'use client';

import React, { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { TextStyle, BackgroundStyle } from './types';

export interface MatchingItem {
  id: string;
  text: string;
  matchingNumber: number;
}

export interface MatchingPairsBlockProps {
  itemsA: MatchingItem[];
  itemsB: MatchingItem[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  dark?: boolean;
}

interface Match {
  aId: string;
  bId: string;
  colorIndex: number;
}

const MATCH_COLORS = [
  { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800', badge: 'bg-green-500' },
  { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', badge: 'bg-blue-500' },
  { bg: 'bg-amber-100', border: 'border-amber-500', text: 'text-amber-800', badge: 'bg-amber-500' },
  { bg: 'bg-violet-100', border: 'border-violet-500', text: 'text-violet-800', badge: 'bg-violet-500' },
  { bg: 'bg-pink-100', border: 'border-pink-500', text: 'text-pink-800', badge: 'bg-pink-500' },
  { bg: 'bg-teal-100', border: 'border-teal-500', text: 'text-teal-800', badge: 'bg-teal-500' },
  { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-800', badge: 'bg-orange-500' },
  { bg: 'bg-cyan-100', border: 'border-cyan-500', text: 'text-cyan-800', badge: 'bg-cyan-500' },
];

export default function MatchingPairsBlock({
  itemsA,
  itemsB,
  textStyle = {},
  textBackgroundStyle = {},
  dark = false,
}: MatchingPairsBlockProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState<{ id: string; side: 'A' | 'B' } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ id: string; side: 'A' | 'B' } | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ id: string; side: 'A' | 'B' } | null>(null);
  const [wrongMatch, setWrongMatch] = useState<{ aId: string; bId: string } | null>(null);

  const isMatched = (id: string, side: 'A' | 'B') => {
    return matches.some((m) => (side === 'A' ? m.aId === id : m.bId === id));
  };

  const getMatchForItem = (id: string, side: 'A' | 'B'): Match | undefined => {
    return matches.find((m) => (side === 'A' ? m.aId === id : m.bId === id));
  };

  const getMatchColor = (id: string, side: 'A' | 'B') => {
    const match = getMatchForItem(id, side);
    if (match) {
      return MATCH_COLORS[match.colorIndex % MATCH_COLORS.length];
    }
    return null;
  };

  const getMatchNumber = (id: string, side: 'A' | 'B') => {
    const matchIndex = matches.findIndex((m) => (side === 'A' ? m.aId === id : m.bId === id));
    return matchIndex >= 0 ? matchIndex + 1 : null;
  };

  const handleDragStart = (e: React.DragEvent, id: string, side: 'A' | 'B') => {
    if (isMatched(id, side) || showResults) {
      e.preventDefault();
      return;
    }
    setDraggedItem({ id, side });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, id: string, side: 'A' | 'B') => {
    e.preventDefault();
    // Only highlight if dragging from opposite side and target is not matched
    if (draggedItem && draggedItem.side !== side && !isMatched(id, side)) {
      setDragOverItem({ id, side });
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only clear if leaving the actual element (not entering a child)
    const relatedTarget = e.relatedTarget as Node;
    const currentTarget = e.currentTarget as Node;
    if (!currentTarget.contains(relatedTarget)) {
      setDragOverItem(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string, targetSide: 'A' | 'B') => {
    e.preventDefault();

    if (!draggedItem || draggedItem.side === targetSide || isMatched(targetId, targetSide)) {
      setDraggedItem(null);
      return;
    }

    const aId = draggedItem.side === 'A' ? draggedItem.id : targetId;
    const bId = draggedItem.side === 'B' ? draggedItem.id : targetId;

    const itemA = itemsA.find((i) => i.id === aId);
    const itemB = itemsB.find((i) => i.id === bId);

    if (itemA && itemB) {
      if (itemA.matchingNumber === itemB.matchingNumber) {
        setMatches((prev) => [...prev, { aId, bId, colorIndex: prev.length }]);
      } else {
        setWrongMatch({ aId, bId });
        setTimeout(() => setWrongMatch(null), 800);
      }
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleClick = (id: string, side: 'A' | 'B') => {
    if (isMatched(id, side) || showResults) return;

    if (!selectedItem) {
      setSelectedItem({ id, side });
      return;
    }

    if (selectedItem.id === id && selectedItem.side === side) {
      setSelectedItem(null);
      return;
    }

    if (selectedItem.side === side) {
      setSelectedItem({ id, side });
      return;
    }

    const aId = selectedItem.side === 'A' ? selectedItem.id : id;
    const bId = selectedItem.side === 'B' ? selectedItem.id : id;

    const itemA = itemsA.find((i) => i.id === aId);
    const itemB = itemsB.find((i) => i.id === bId);

    if (itemA && itemB) {
      if (itemA.matchingNumber === itemB.matchingNumber) {
        setMatches((prev) => [...prev, { aId, bId, colorIndex: prev.length }]);
      } else {
        setWrongMatch({ aId, bId });
        setTimeout(() => setWrongMatch(null), 800);
      }
    }

    setSelectedItem(null);
  };

  const getItemStyle = (id: string, side: 'A' | 'B') => {
    const matchColor = getMatchColor(id, side);
    const isDragging = draggedItem?.id === id && draggedItem?.side === side;
    const isDragOver = dragOverItem?.id === id && dragOverItem?.side === side;
    const isSelected = selectedItem?.id === id && selectedItem?.side === side;
    const isWrong = wrongMatch && ((side === 'A' && wrongMatch.aId === id) || (side === 'B' && wrongMatch.bId === id));

    if (isWrong) {
      return 'bg-red-100 border-red-500 text-red-800 animate-shake';
    }
    if (matchColor) {
      return `${matchColor.bg} ${matchColor.border} ${matchColor.text}`;
    }
    if (isDragOver) {
      return dark
        ? 'bg-primary/20 border-primary border-dashed text-gray-200 ring-2 ring-primary ring-offset-2 ring-offset-gray-900 scale-[1.02]'
        : 'bg-primary/10 border-primary border-dashed ring-2 ring-primary ring-offset-2 scale-[1.02]';
    }
    if (isSelected) {
      return 'bg-blue-100 border-blue-500 text-blue-800 ring-2 ring-blue-300 ring-offset-1';
    }
    if (isDragging) {
      return dark
        ? 'bg-gray-700 border-dashed border-gray-500 opacity-60 scale-95'
        : 'bg-gray-100 border-dashed border-gray-400 opacity-60 scale-95';
    }
    return dark
      ? 'bg-gray-800 border-gray-700 hover:border-primary hover:bg-primary/10 text-gray-200 cursor-grab active:cursor-grabbing'
      : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5 cursor-grab active:cursor-grabbing';
  };

  const reset = () => {
    setMatches([]);
    setShowResults(false);
    setWrongMatch(null);
    setSelectedItem(null);
  };

  const checkAllMatches = () => {
    setShowResults(true);
  };

  const allCorrect = matches.length === itemsA.length;

  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {/* Column A */}
        <div className="space-y-3">
          <h4 className={`font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Column A</h4>
          {itemsA.map((item) => {
            const matchNumber = getMatchNumber(item.id, 'A');
            const matchColor = getMatchColor(item.id, 'A');
            return (
              <div
                key={item.id}
                draggable={!isMatched(item.id, 'A') && !showResults}
                onDragStart={(e) => handleDragStart(e, item.id, 'A')}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, item.id, 'A')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item.id, 'A')}
                onDragEnd={handleDragEnd}
                onClick={() => handleClick(item.id, 'A')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all select-none ${getItemStyle(
                  item.id,
                  'A'
                )} ${isMatched(item.id, 'A') || showResults ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontSize: textStyle.fontSize,
                      color: isMatched(item.id, 'A') ? undefined : textStyle.color,
                      lineHeight: textStyle.lineHeight,
                    }}
                  >
                    {item.text}
                  </span>
                  {matchNumber && matchColor && (
                    <span
                      className={`${matchColor.badge} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2 flex-shrink-0`}
                    >
                      {matchNumber}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Column B */}
        <div className="space-y-3">
          <h4 className={`font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Column B</h4>
          {itemsB.map((item) => {
            const matchNumber = getMatchNumber(item.id, 'B');
            const matchColor = getMatchColor(item.id, 'B');
            return (
              <div
                key={item.id}
                draggable={!isMatched(item.id, 'B') && !showResults}
                onDragStart={(e) => handleDragStart(e, item.id, 'B')}
                onDragOver={handleDragOver}
                onDragEnter={(e) => handleDragEnter(e, item.id, 'B')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, item.id, 'B')}
                onDragEnd={handleDragEnd}
                onClick={() => handleClick(item.id, 'B')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all select-none ${getItemStyle(
                  item.id,
                  'B'
                )} ${isMatched(item.id, 'B') || showResults ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontSize: textStyle.fontSize,
                      color: isMatched(item.id, 'B') ? undefined : textStyle.color,
                      lineHeight: textStyle.lineHeight,
                    }}
                  >
                    {item.text}
                  </span>
                  {matchNumber && matchColor && (
                    <span
                      className={`${matchColor.badge} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2 flex-shrink-0`}
                    >
                      {matchNumber}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        <button
          onClick={reset}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${dark ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        {matches.length === itemsA.length && !showResults && (
          <button
            onClick={checkAllMatches}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Check Answers
          </button>
        )}

        {showResults && (
          <div className="flex items-center gap-2">
            {allCorrect ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-600">All matches correct!</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-600">Some matches are incorrect</span>
              </>
            )}
          </div>
        )}
      </div>

      <p className={`text-sm mt-4 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        Matched: {matches.length} / {itemsA.length}
      </p>
    </div>
  );
}
