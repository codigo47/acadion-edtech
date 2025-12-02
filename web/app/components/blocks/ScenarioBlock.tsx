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
}

export default function ScenarioBlock({
  image,
  question,
  answers,
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
    <div className="w-full p-4">
      <div className="relative w-full h-80 rounded-lg overflow-hidden mb-6">
        <Image src={image} alt="Scenario" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Speech bubble */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white rounded-lg p-4 shadow-lg relative">
            <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45" />
            <p className="text-lg font-medium text-gray-900 relative z-10">
              {question}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sortedAnswers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => !showResult && handleAnswer(answer.id)}
            disabled={showResult}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${getAnswerStyle(
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
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
