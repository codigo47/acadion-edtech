'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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
}

export default function ScenarioBlock({
  image,
  question,
  answers,
  avatar,
  blur = 0,
  dark = false,
}: ScenarioBlockProps) {
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
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full min-h-[350px] sm:min-h-[500px] rounded-lg overflow-hidden">
        <Image src={image} alt="Scenario" fill className="object-cover" style={blur > 0 ? { filter: `blur(${blur}px)` } : undefined} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Avatar character */}
        {avatar && (
          <div className="absolute bottom-0 left-3 sm:left-6 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt="Character" className="h-48 sm:h-64 w-auto object-contain drop-shadow-lg" />
          </div>
        )}

        {/* Content overlay */}
        <div className={`absolute inset-0 flex flex-col justify-end p-3 sm:p-6 ${avatar ? 'pl-28 sm:pl-40' : ''}`}>
          {/* Speech bubble */}
          <div className="mb-3 sm:mb-4">
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-lg relative inline-block max-w-lg">
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45" />
              <p className="text-sm sm:text-lg font-medium text-gray-900 relative z-10">
                {question}
              </p>
            </div>
          </div>

          {/* Answers */}
          <div className="space-y-2">
            {sortedAnswers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => !showResult && handleAnswer(answer.id)}
                disabled={showResult}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all backdrop-blur-sm ${getAnswerStyle(
                  answer
                )} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
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
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors self-start"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
