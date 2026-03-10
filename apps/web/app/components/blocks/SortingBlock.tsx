'use client';

import React, { useState, useCallback } from 'react';
import { Check, GripVertical, ArrowDown } from 'lucide-react';

export interface SortingCard {
  id: string;
  title: string;
  content?: string;
  correctCategory: string;
}

export interface SortingCategory {
  id: string;
  title: string;
}

export interface SortingBlockProps {
  cards: SortingCard[];
  categories: SortingCategory[];
  dark?: boolean;
}

export default function SortingBlock({
  cards: initialCards = [],
  categories = [],
  dark = false,
}: SortingBlockProps) {
  const [deckCards, setDeckCards] = useState<SortingCard[]>(initialCards);
  const [categoryCards, setCategoryCards] = useState<Record<string, SortingCard[]>>(() => {
    const initial: Record<string, SortingCard[]> = {};
    categories.forEach((cat) => {
      initial[cat.id] = [];
    });
    return initial;
  });
  const [draggedCard, setDraggedCard] = useState<SortingCard | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [wrongMatch, setWrongMatch] = useState<{ cardId: string; categoryId: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const totalCards = initialCards.length;

  // Current card is the top card of the deck
  const currentCard = deckCards.length > 0 ? deckCards[0] : null;

  const handleDragStart = (e: React.DragEvent, card: SortingCard) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setHoveredCategory(categoryId);
  };

  const handleDragLeave = () => {
    setHoveredCategory(null);
  };

  const handleDrop = (e: React.DragEvent, categoryId: string) => {
    e.preventDefault();
    setHoveredCategory(null);

    if (!draggedCard) return;

    if (draggedCard.correctCategory === categoryId) {
      // Correct match - remove card from deck and add to category
      setDeckCards((prev) => prev.filter((c) => c.id !== draggedCard.id));
      setCategoryCards((prev) => ({
        ...prev,
        [categoryId]: [...prev[categoryId], draggedCard],
      }));
      setCorrectCount((prev) => prev + 1);
    } else {
      // Wrong match - shake and show red
      setWrongMatch({ cardId: draggedCard.id, categoryId });
      setTimeout(() => setWrongMatch(null), 800);
    }

    setDraggedCard(null);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
    setHoveredCategory(null);
  };

  const reset = useCallback(() => {
    setDeckCards(initialCards);
    setCategoryCards(() => {
      const initial: Record<string, SortingCard[]> = {};
      categories.forEach((cat) => {
        initial[cat.id] = [];
      });
      return initial;
    });
    setCorrectCount(0);
    setWrongMatch(null);
    setDraggedCard(null);
  }, [initialCards, categories]);

  const isCompleted = deckCards.length === 0;

  // Generate random rotation angles for stacked cards (pre-calculated for consistency)
  const getCardRotation = (index: number, total: number) => {
    const baseRotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5];
    return baseRotations[index % baseRotations.length];
  };

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-8px) rotate(-2deg); }
          75% { transform: translateX(8px) rotate(2deg); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>

      {/* Instruction Tag */}
      <div className="flex items-center justify-center mb-6">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            dark
              ? 'bg-primary/20 text-primary border border-primary/30'
              : 'bg-primary/10 text-primary border border-primary/20'
          }`}
        >
          <GripVertical className="w-4 h-4" />
          <span>Drag cards to the correct category</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>

      {/* Counter */}
      <div className={`mb-4 text-sm font-medium text-center ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        Sorted: {correctCount} / {totalCards}
      </div>

      {/* Source Deck - Card Stack */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div
          className="relative w-[120px] h-[168px] sm:w-[160px] sm:h-[224px]"
        >
          {deckCards.length > 0 ? (
            <>
              {/* Background cards (stack effect) - show max 4 behind */}
              {deckCards.slice(1, 5).reverse().map((card, index) => {
                const actualIndex = Math.min(4, deckCards.length - 1) - index - 1;
                const rotation = getCardRotation(actualIndex, deckCards.length);
                const offset = (actualIndex + 1) * 2;
                return (
                  <div
                    key={card.id}
                    className={`absolute inset-0 rounded-xl border-2 ${
                      dark
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-200 shadow-sm'
                    }`}
                    style={{
                      transform: `rotate(${rotation}deg) translateY(${offset}px)`,
                      zIndex: 10 - actualIndex,
                    }}
                  />
                );
              })}

              {/* Top card (draggable) */}
              {currentCard && (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, currentCard)}
                  onDragEnd={handleDragEnd}
                  className={`absolute inset-0 rounded-xl border-2 cursor-grab active:cursor-grabbing transition-all select-none flex flex-col items-center justify-center p-4 text-center ${
                    draggedCard?.id === currentCard.id
                      ? 'opacity-50 scale-95'
                      : wrongMatch?.cardId === currentCard.id
                      ? 'border-red-500 bg-red-50 animate-shake'
                      : dark
                      ? 'bg-gray-700 border-gray-500 hover:border-primary hover:bg-primary/10 text-white hover:shadow-lg hover:scale-[1.02]'
                      : 'bg-white border-gray-300 hover:border-primary hover:bg-primary/5 shadow-md hover:shadow-xl hover:scale-[1.02]'
                  }`}
                  style={{
                    zIndex: 20,
                  }}
                >
                  <p className={`font-semibold text-base ${wrongMatch?.cardId === currentCard.id ? 'text-red-700' : ''}`}>
                    {currentCard.title}
                  </p>
                  {currentCard.content && (
                    <p
                      className={`text-sm mt-2 ${
                        wrongMatch?.cardId === currentCard.id
                          ? 'text-red-600'
                          : dark
                          ? 'text-gray-400'
                          : 'text-gray-500'
                      }`}
                    >
                      {currentCard.content}
                    </p>
                  )}

                  {/* Card count badge */}
                  <div
                    className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      dark
                        ? 'bg-gray-600 text-gray-200 border-2 border-gray-800'
                        : 'bg-gray-100 text-gray-600 border-2 border-white shadow'
                    }`}
                  >
                    {deckCards.length}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              className={`absolute inset-0 rounded-xl border-2 border-dashed flex items-center justify-center ${
                dark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2 text-green-600">
                <Check className="w-8 h-8" />
                <span className="font-medium text-sm">Done!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Decks */}
      <div className={`grid gap-3 sm:gap-6 ${categories.length === 2 ? 'grid-cols-2' : categories.length === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
        {categories.map((category) => {
          const cardsInCategory = categoryCards[category.id] || [];
          const isHovered = hoveredCategory === category.id;
          const isWrong = wrongMatch?.categoryId === category.id;

          return (
            <div key={category.id} className="flex flex-col items-center">
              {/* Category Title */}
              <h3
                className={`font-semibold text-center mb-3 px-4 py-1 rounded-full text-sm ${
                  isHovered
                    ? 'bg-primary text-white'
                    : isWrong
                    ? 'bg-red-500 text-white'
                    : dark
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {category.title}
              </h3>

              {/* Category Deck */}
              <div
                onDragOver={(e) => handleDragOver(e, category.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, category.id)}
                className="relative w-[90px] h-[126px] sm:w-[120px] sm:h-[168px]"
              >
                {/* Base/Empty state */}
                <div
                  className={`absolute inset-0 rounded-xl border-2 transition-all ${
                    isHovered
                      ? 'border-primary border-solid bg-primary/10 scale-105'
                      : isWrong
                      ? 'border-red-500 bg-red-50'
                      : cardsInCategory.length > 0
                      ? 'border-transparent'
                      : dark
                      ? 'border-dashed border-gray-600 bg-gray-800/50'
                      : 'border-dashed border-gray-300 bg-gray-50'
                  }`}
                />

                {/* Stacked cards in category */}
                {cardsInCategory.map((card, index) => {
                  const rotation = getCardRotation(index, cardsInCategory.length);
                  const offset = index * 2;
                  return (
                    <div
                      key={card.id}
                      className={`absolute inset-0 rounded-xl border-2 flex items-center justify-center p-2 ${
                        dark
                          ? 'bg-gray-700 border-gray-500'
                          : 'bg-white border-gray-300 shadow-sm'
                      }`}
                      style={{
                        transform: `rotate(${rotation}deg) translateY(${offset}px)`,
                        zIndex: index + 1,
                      }}
                    >
                      {index === cardsInCategory.length - 1 && (
                        <p className={`text-xs font-medium text-center ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {card.title}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Card count badge for category */}
                {cardsInCategory.length > 0 && (
                  <div
                    className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-50 ${
                      dark
                        ? 'bg-green-600 text-white border-2 border-gray-800'
                        : 'bg-green-500 text-white border-2 border-white shadow'
                    }`}
                  >
                    {cardsInCategory.length}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset Button */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={reset}
          className={`px-6 py-2 rounded-lg transition-colors ${
            dark
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Reset
        </button>
        {isCompleted && (
          <div className="flex items-center gap-2 text-green-600">
            <Check className="w-5 h-5" />
            <span className="font-medium">All cards sorted!</span>
          </div>
        )}
      </div>
    </div>
  );
}
