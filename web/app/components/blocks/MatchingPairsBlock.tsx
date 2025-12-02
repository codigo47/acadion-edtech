'use client';

import React, { useState, useRef, useEffect } from 'react';
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
}

interface Match {
  aId: string;
  bId: string;
  colorIndex: number;
}

const MATCH_COLORS = [
  { stroke: '#22c55e', bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800', badge: 'bg-green-500' },
  { stroke: '#3b82f6', bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800', badge: 'bg-blue-500' },
  { stroke: '#f59e0b', bg: 'bg-amber-100', border: 'border-amber-500', text: 'text-amber-800', badge: 'bg-amber-500' },
  { stroke: '#8b5cf6', bg: 'bg-violet-100', border: 'border-violet-500', text: 'text-violet-800', badge: 'bg-violet-500' },
  { stroke: '#ec4899', bg: 'bg-pink-100', border: 'border-pink-500', text: 'text-pink-800', badge: 'bg-pink-500' },
  { stroke: '#14b8a6', bg: 'bg-teal-100', border: 'border-teal-500', text: 'text-teal-800', badge: 'bg-teal-500' },
  { stroke: '#f97316', bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-800', badge: 'bg-orange-500' },
  { stroke: '#06b6d4', bg: 'bg-cyan-100', border: 'border-cyan-500', text: 'text-cyan-800', badge: 'bg-cyan-500' },
];

export default function MatchingPairsBlock({
  itemsA,
  itemsB,
  textStyle = {},
  textBackgroundStyle = {},
}: MatchingPairsBlockProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [draggedItem, setDraggedItem] = useState<{ id: string; side: 'A' | 'B' } | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ id: string; side: 'A' | 'B' } | null>(null);
  const [wrongMatch, setWrongMatch] = useState<{ aId: string; bId: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefsA = useRef<Map<string, HTMLDivElement>>(new Map());
  const itemRefsB = useRef<Map<string, HTMLDivElement>>(new Map());

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

    // Create a custom drag image
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clone = target.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.top = '-1000px';
    clone.style.left = '-1000px';
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.backgroundColor = '#3b82f6';
    clone.style.borderColor = '#2563eb';
    clone.style.color = 'white';
    clone.style.transform = 'rotate(3deg) scale(1.05)';
    clone.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    clone.style.opacity = '1';
    clone.style.borderRadius = '8px';
    clone.style.padding = '16px';
    clone.style.boxSizing = 'border-box';
    document.body.appendChild(clone);
    e.dataTransfer.setDragImage(clone, rect.width / 2, rect.height / 2);

    // Clean up clone after drag starts
    setTimeout(() => {
      document.body.removeChild(clone);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
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
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleClick = (id: string, side: 'A' | 'B') => {
    if (isMatched(id, side) || showResults) return;

    // If no item is selected, select this one
    if (!selectedItem) {
      setSelectedItem({ id, side });
      return;
    }

    // If clicking the same item, deselect it
    if (selectedItem.id === id && selectedItem.side === side) {
      setSelectedItem(null);
      return;
    }

    // If clicking an item from the same side, switch selection
    if (selectedItem.side === side) {
      setSelectedItem({ id, side });
      return;
    }

    // Attempt to match items from different sides
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
    const isSelected = selectedItem?.id === id && selectedItem?.side === side;
    const isWrong = wrongMatch && ((side === 'A' && wrongMatch.aId === id) || (side === 'B' && wrongMatch.bId === id));

    if (isWrong) {
      return 'bg-red-100 border-red-500 text-red-800 animate-shake';
    }
    if (matchColor) {
      return `${matchColor.bg} ${matchColor.border} ${matchColor.text}`;
    }
    if (isSelected) {
      return 'bg-blue-100 border-blue-500 text-blue-800 ring-2 ring-blue-300 ring-offset-1';
    }
    if (isDragging) {
      return 'bg-gray-100 border-dashed border-gray-400 opacity-60 scale-95';
    }
    return 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5 cursor-grab active:cursor-grabbing';
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

  // Calculate SVG paths for curved arrows
  const [paths, setPaths] = useState<{ aId: string; bId: string; path: string; color: string; number: number }[]>([]);

  useEffect(() => {
    const calculatePaths = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newPaths: { aId: string; bId: string; path: string; color: string; number: number }[] = [];

      matches.forEach((match, index) => {
        const elA = itemRefsA.current.get(match.aId);
        const elB = itemRefsB.current.get(match.bId);

        if (elA && elB) {
          const rectA = elA.getBoundingClientRect();
          const rectB = elB.getBoundingClientRect();

          const startX = rectA.right - containerRect.left;
          const startY = rectA.top + rectA.height / 2 - containerRect.top;
          const endX = rectB.left - containerRect.left;
          const endY = rectB.top + rectB.height / 2 - containerRect.top;

          const midX = (startX + endX) / 2;
          const controlOffset = Math.abs(endY - startY) * 0.3 + 30;

          const path = `M ${startX} ${startY} C ${midX + controlOffset} ${startY}, ${midX - controlOffset} ${endY}, ${endX} ${endY}`;
          const color = MATCH_COLORS[match.colorIndex % MATCH_COLORS.length].stroke;

          newPaths.push({ aId: match.aId, bId: match.bId, path, color, number: index + 1 });
        }
      });

      setPaths(newPaths);
    };

    calculatePaths();
    window.addEventListener('resize', calculatePaths);
    return () => window.removeEventListener('resize', calculatePaths);
  }, [matches, itemsA]);

  return (
    <div
      className="w-full p-4 rounded-lg"
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor,
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

      <div ref={containerRef} className="relative grid grid-cols-2 gap-8">
        {/* SVG for curved arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            {MATCH_COLORS.map((color, index) => (
              <marker
                key={`arrowhead-${index}`}
                id={`arrowhead-${index}`}
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill={color.stroke} />
              </marker>
            ))}
          </defs>
          {paths.map((p, index) => {
            const match = matches.find(m => m.aId === p.aId && m.bId === p.bId);
            const colorIndex = match?.colorIndex ?? 0;
            return (
              <path
                key={`${p.aId}-${p.bId}`}
                d={p.path}
                fill="none"
                stroke={p.color}
                strokeWidth="3"
                markerEnd={`url(#arrowhead-${colorIndex % MATCH_COLORS.length})`}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Column A */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 mb-2">Column A</h4>
          {itemsA.map((item) => {
            const matchNumber = getMatchNumber(item.id, 'A');
            const matchColor = getMatchColor(item.id, 'A');
            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefsA.current.set(item.id, el);
                }}
                draggable={!isMatched(item.id, 'A') && !showResults}
                onDragStart={(e) => handleDragStart(e, item.id, 'A')}
                onDragOver={handleDragOver}
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
          <h4 className="font-semibold text-gray-700 mb-2">Column B</h4>
          {itemsB.map((item) => {
            const matchNumber = getMatchNumber(item.id, 'B');
            const matchColor = getMatchColor(item.id, 'B');
            return (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefsB.current.set(item.id, el);
                }}
                draggable={!isMatched(item.id, 'B') && !showResults}
                onDragStart={(e) => handleDragStart(e, item.id, 'B')}
                onDragOver={handleDragOver}
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

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
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

      <p className="text-sm text-gray-500 mt-4">
        Matched: {matches.length} / {itemsA.length}
      </p>
    </div>
  );
}
