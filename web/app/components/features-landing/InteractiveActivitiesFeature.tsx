'use client';

import { useEffect, useState } from 'react';

export default function InteractiveActivitiesFeature() {
  const [matchedIndex, setMatchedIndex] = useState(-1);
  const [showLine, setShowLine] = useState(false);

  const leftItems = [
    'Sprint Planning',
    'Daily Scrum',
    'Sprint Review',
    'Sprint Retrospective'
  ];

  const rightItems = [
    '15-minute standup',
    'Define Sprint Goal',
    'Team improvement',
    'Demo to stakeholders'
  ];

  const matches = [
    { leftIndex: 0, rightIndex: 1 }, // Sprint Planning → Define Sprint Goal
    { leftIndex: 1, rightIndex: 0 }, // Daily Scrum → 15-minute standup
    { leftIndex: 2, rightIndex: 3 }, // Sprint Review → Demo to stakeholders
    { leftIndex: 3, rightIndex: 2 }  // Sprint Retrospective → Team improvement
  ];

  useEffect(() => {
    let currentIndex = 0;

    const animate = () => {
      // Reset
      setMatchedIndex(-1);
      setShowLine(false);

      setTimeout(() => {
        // Show current match
        setMatchedIndex(currentIndex);
        setShowLine(true);

        // Move to next pair
        currentIndex = (currentIndex + 1) % matches.length;

        // Schedule next animation
        setTimeout(animate, 2000);
      }, 500);
    };

    animate();
  }, []);

  const isLeftMatched = (index: number) => {
    return matchedIndex !== -1 && matches[matchedIndex].leftIndex === index;
  };

  const isRightMatched = (index: number) => {
    return matchedIndex !== -1 && matches[matchedIndex].rightIndex === index;
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-gray-200 p-3 md:p-6">
      <div className="w-full max-w-md">
        {/* Title */}
        <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-3 md:mb-4 text-center">
          Match Scrum Events
        </h3>

        {/* Matching Pairs Layout */}
        <div className="relative flex gap-3 md:gap-4">
          {/* Left Column */}
          <div className="flex-1 space-y-2 md:space-y-2.5">
            {leftItems.map((item, index) => (
              <div
                key={index}
                className={`p-1.5 md:p-2 rounded-lg text-xs md:text-sm font-medium text-center transition-all duration-500 border-2 ${
                  isLeftMatched(index)
                    ? 'bg-green-100 border-green-400 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-2 md:space-y-2.5">
            {rightItems.map((item, index) => (
              <div
                key={index}
                className={`p-1.5 md:p-2 rounded-lg text-xs md:text-sm font-medium text-center transition-all duration-500 border-2 ${
                  isRightMatched(index)
                    ? 'bg-green-100 border-green-400 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Connecting Arrow SVG */}
          {matchedIndex !== -1 && showLine && (
            <svg
              className="absolute inset-0 pointer-events-none z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ width: '100%', height: '100%' }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 8 4, 0 8" fill="#22c55e" />
                </marker>
              </defs>
              <path
                d={`M 48 ${(matches[matchedIndex].leftIndex * 25) + 12.5} L 52 ${(matches[matchedIndex].rightIndex * 25) + 12.5}`}
                stroke="#22c55e"
                strokeWidth="0.8"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
