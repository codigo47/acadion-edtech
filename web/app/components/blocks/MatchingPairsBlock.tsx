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
}

interface Match {
  aId: string;
  bId: string;
}

export default function MatchingPairsBlock({
  itemsA,
  itemsB,
  textStyle = {},
  textBackgroundStyle = {},
}: MatchingPairsBlockProps) {
  const [selectedA, setSelectedA] = useState<string | null>(null);
  const [selectedB, setSelectedB] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSelectA = (id: string) => {
    if (showResults || matches.some((m) => m.aId === id)) return;
    setSelectedA(id);
    if (selectedB) {
      tryMatch(id, selectedB);
    }
  };

  const handleSelectB = (id: string) => {
    if (showResults || matches.some((m) => m.bId === id)) return;
    setSelectedB(id);
    if (selectedA) {
      tryMatch(selectedA, id);
    }
  };

  const tryMatch = (aId: string, bId: string) => {
    const itemA = itemsA.find((i) => i.id === aId);
    const itemB = itemsB.find((i) => i.id === bId);

    if (itemA && itemB) {
      if (itemA.matchingNumber === itemB.matchingNumber) {
        setMatches((prev) => [...prev, { aId, bId }]);
      }
    }
    setSelectedA(null);
    setSelectedB(null);
  };

  const isMatched = (id: string, side: 'A' | 'B') => {
    return matches.some((m) => (side === 'A' ? m.aId === id : m.bId === id));
  };

  const getItemStyle = (id: string, side: 'A' | 'B') => {
    const matched = isMatched(id, side);
    const selected = side === 'A' ? selectedA === id : selectedB === id;

    if (matched) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    if (selected) {
      return 'bg-primary/20 border-primary';
    }
    return 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5 cursor-pointer';
  };

  const checkAllMatches = () => {
    setShowResults(true);
  };

  const reset = () => {
    setMatches([]);
    setSelectedA(null);
    setSelectedB(null);
    setShowResults(false);
  };

  const isCorrectMatch = (match: Match) => {
    const itemA = itemsA.find((i) => i.id === match.aId);
    const itemB = itemsB.find((i) => i.id === match.bId);
    return itemA && itemB && itemA.matchingNumber === itemB.matchingNumber;
  };

  const allCorrect = matches.length === itemsA.length && matches.every(isCorrectMatch);

  return (
    <div
      className="w-full p-4 rounded-lg"
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor,
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      <div className="grid grid-cols-2 gap-8">
        {/* Column A */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 mb-2">Column A</h4>
          {itemsA.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectA(item.id)}
              disabled={isMatched(item.id, 'A') || showResults}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${getItemStyle(
                item.id,
                'A'
              )} ${isMatched(item.id, 'A') || showResults ? 'cursor-default' : ''}`}
            >
              <span
                style={{
                  fontSize: textStyle.fontSize,
                  color: isMatched(item.id, 'A') ? undefined : textStyle.color,
                  lineHeight: textStyle.lineHeight,
                }}
              >
                {item.text}
              </span>
            </button>
          ))}
        </div>

        {/* Column B */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 mb-2">Column B</h4>
          {itemsB.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectB(item.id)}
              disabled={isMatched(item.id, 'B') || showResults}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${getItemStyle(
                item.id,
                'B'
              )} ${isMatched(item.id, 'B') || showResults ? 'cursor-default' : ''}`}
            >
              <span
                style={{
                  fontSize: textStyle.fontSize,
                  color: isMatched(item.id, 'B') ? undefined : textStyle.color,
                  lineHeight: textStyle.lineHeight,
                }}
              >
                {item.text}
              </span>
            </button>
          ))}
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
