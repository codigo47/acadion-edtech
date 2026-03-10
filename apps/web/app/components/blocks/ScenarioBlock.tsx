'use client';

import React, { useState } from 'react';

export interface ScenarioAnswer {
  id: string;
  text: string;
  order: number;
  isCorrect: boolean;
}

export interface ScenarioBlockProps {
  image: string;
  question: string;
  answers: ScenarioAnswer[];
  avatar?: string;
  blur?: number;
  dark?: boolean;
  bubbleBg?: string;
  bubbleFontSize?: string;
  bubbleTextAlign?: string;
  bubbleX?: number;
  bubbleY?: number;
  arrowDirection?: string;
  arrowAlignment?: string;
}

const BUBBLE_FONT_SIZES: Record<string, string> = {
  small: '0.75rem',
  normal: '0.875rem',
  large: '1rem',
  xlarge: '1.125rem',
};

function BubbleArrow({ direction, alignment, color }: { direction: string; alignment: string; color: string }) {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: color,
    transform: 'rotate(45deg)',
  };

  if (direction === 'top') {
    const align: React.CSSProperties =
      alignment === 'center' ? { left: '50%', marginLeft: -8 } :
      alignment === 'right' ? { right: 16 } : { left: 16 };
    return <div style={{ ...base, top: -8, ...align }} />;
  }
  if (direction === 'left') {
    return <div style={{ ...base, left: -8, top: '50%', marginTop: -8 }} />;
  }
  if (direction === 'right') {
    return <div style={{ ...base, right: -8, top: '50%', marginTop: -8 }} />;
  }
  // Default: bottom
  const align: React.CSSProperties =
    alignment === 'center' ? { left: '50%', marginLeft: -8 } :
    alignment === 'right' ? { right: 16 } : { left: 16 };
  return <div style={{ ...base, bottom: -8, ...align }} />;
}

function isLightColor(hex: string): boolean {
  const h = hex.replace('#', '');
  if (h.length !== 6) return true;
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function ScenarioBlock({
  image,
  question,
  answers = [],
  avatar,
  blur = 0,
  dark = false,
  bubbleBg = '#FFFFFF',
  bubbleFontSize = 'normal',
  bubbleTextAlign = 'left',
  bubbleX = 65,
  bubbleY = 75,
  arrowDirection = 'bottom',
  arrowAlignment = 'left',
}: ScenarioBlockProps) {
  const bubbleTextColor = isLightColor(bubbleBg) ? '#1f2937' : '#f9fafb';
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowResult(true);
  };

  const getAnswerStyle = (answer: ScenarioAnswer) => {
    if (!showResult) {
      return 'bg-white hover:bg-gray-50 border-gray-300';
    }
    if (selectedAnswer === answer.id) {
      return answer.isCorrect
        ? 'bg-green-100 border-green-500 text-green-800'
        : 'bg-red-100 border-red-500 text-red-800';
    }
    if (answer.isCorrect) {
      return 'bg-green-50 border-green-300 text-green-700';
    }
    return 'bg-gray-50 border-gray-200 text-gray-500';
  };

  const sortedAnswers = [...answers].sort((a, b) => a.order - b.order);

  const reset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}>
      {/* Background image with avatar and bubble — matches EditableScenarioBlock */}
      <div className="relative w-full min-h-[420px] bg-gray-100 rounded-lg overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          {image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="Background" className="w-full h-full object-cover" style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300" />
          )}
        </div>

        {/* Avatar character */}
        {avatar && (
          <div className="absolute bottom-0 left-4 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt="Character" className="h-40 w-auto object-contain drop-shadow-lg" />
          </div>
        )}

        {/* Speech bubble — absolutely positioned */}
        <div
          className="absolute z-10"
          style={{
            left: `${bubbleX}%`,
            top: `${bubbleY}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="rounded-lg p-3 shadow-lg relative max-w-[240px] min-w-[160px]" style={{ backgroundColor: bubbleBg }}>
            <BubbleArrow direction={arrowDirection} alignment={arrowAlignment} color={bubbleBg} />
            <p
              className="font-medium relative z-10"
              style={{
                color: bubbleTextColor,
                fontSize: BUBBLE_FONT_SIZES[bubbleFontSize] || '0.875rem',
                textAlign: bubbleTextAlign as React.CSSProperties['textAlign'],
              }}
            >
              {question}
            </p>
          </div>
        </div>

        {/* Answers — overlaid at bottom of image */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 z-20 ${avatar ? 'pl-32' : ''}`}>
          <div className="space-y-2">
            {sortedAnswers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => !showResult && handleAnswer(answer.id)}
                disabled={showResult}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all backdrop-blur-sm ${getAnswerStyle(answer)} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span className="font-medium">{answer.text}</span>
                {showResult && selectedAnswer === answer.id && (
                  <span className="ml-2">
                    {answer.isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </button>
            ))}
          </div>

          {showResult && (
            <button
              onClick={reset}
              className="mt-3 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
