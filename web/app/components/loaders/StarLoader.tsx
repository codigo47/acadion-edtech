'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface StarLoaderProps {
  dark?: boolean;
  texts?: string[];
  rotationInterval?: number;
  size?: number;
}

const defaultTexts = [
  'Processing...',
  'Loading...',
  'Please wait...',
];

// Acadion brand color
const ACADION_PURPLE = '#9f80da';

export default function StarLoader({
  dark = false,
  texts = defaultTexts,
  rotationInterval = 2000,
  size = 1,
}: StarLoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const baseSize = 45 * size;
  const smallSize = 10 * size;
  const mediumSize = 15 * size;
  const largeSize = 18 * size;

  return (
    <div className="flex items-center justify-start gap-4">
      <div
        className="star-container"
        style={{
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          position: 'relative',
        }}
      >
        <div
          className="star s1"
          style={{
            position: 'absolute',
            width: `${smallSize}px`,
            height: `${smallSize}px`,
          }}
        />
        <div
          className="star s2"
          style={{
            position: 'absolute',
            width: `${mediumSize}px`,
            height: `${mediumSize}px`,
          }}
        />
        <div
          className="star s3"
          style={{
            position: 'absolute',
            width: `${largeSize}px`,
            height: `${largeSize}px`,
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>

      <style jsx>{`
        .star {
          top: 50%;
          left: 50%;
          background: ${ACADION_PURPLE};
          clip-path: polygon(
            50% 0%,
            61% 35%,
            100% 50%,
            61% 65%,
            50% 100%,
            39% 65%,
            0% 50%,
            39% 35%
          );
        }

        .s1 {
          animation: star1 1.8s infinite ease-in-out;
        }
        .s2 {
          animation: star2 1.8s infinite ease-in-out;
        }
        .s3 {
          animation: star3 1.8s infinite ease-in-out;
        }

        @keyframes star1 {
          0% {
            transform: translate(-50%, -50%) translate(-8px, 9px) scale(1) rotate(0deg);
            opacity: 1;
          }
          40% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1) rotate(90deg);
            opacity: 0;
          }
          60% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1) rotate(270deg);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) translate(-8px, 9px) scale(1) rotate(360deg);
            opacity: 1;
          }
        }

        @keyframes star2 {
          0% {
            transform: translate(-50%, -50%) translate(-7px, -10px) scale(1) rotate(0deg);
          }
          40% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1.3) rotate(90deg);
          }
          60% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1.3) rotate(270deg);
          }
          100% {
            transform: translate(-50%, -50%) translate(-7px, -10px) scale(1) rotate(360deg);
          }
        }

        @keyframes star3 {
          0% {
            transform: translate(-50%, -50%) translate(11px, 0px) scale(1) rotate(0deg);
            opacity: 1;
          }
          40% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1) rotate(90deg);
            opacity: 0;
          }
          60% {
            transform: translate(-50%, -50%) translate(0, 0) scale(1) rotate(270deg);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) translate(11px, 0px) scale(1) rotate(360deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
