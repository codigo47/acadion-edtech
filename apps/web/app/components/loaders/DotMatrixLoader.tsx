'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DotMatrixLoaderProps {
  dark?: boolean;
  texts?: string[];
  rotationInterval?: number;
}

// Acadion brand color
const ACADION_PURPLE = '#9F80DA';

const defaultTexts = [
  'Processing...',
  'Loading...',
  'Please wait...',
];

export default function DotMatrixLoader({
  dark = false,
  texts = defaultTexts,
  rotationInterval = 2000,
}: DotMatrixLoaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <div className="flex items-center justify-start gap-6">
      <div className="flex items-center justify-center" style={{ width: '40px' }}>
        <div
          className="dot-matrix-loader"
          style={{
            width: '2px',
            aspectRatio: '1',
            borderRadius: '50%',
            color: ACADION_PURPLE,
            boxShadow: `
              10px -10px 0 0px, 19px -10px 0 0px, 29px -10px 0 0px,
              10px 0     0 2.5px, 19px 0     0 2.5px, 29px 0     0 2.5px,
              10px 10px  0 0px, 19px 10px  0 0px, 29px 10px  0 0px
            `,
            transform: 'translateX(-19px)',
            animation: 'dotMatrixAnimation 2s infinite linear',
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
        @keyframes dotMatrixAnimation {
          12.5% {
            box-shadow:
              10px -10px 0 0px, 19px -10px 0 0px, 29px -10px 0 2.5px,
              10px 0     0 2.5px, 19px 0     0 0px, 29px 0     0 2.5px,
              10px 10px  0 0px, 19px 10px  0 0px, 29px 10px  0 0px;
          }
          25% {
            box-shadow:
              10px -10px 0 2.5px, 19px -10px 0 0px, 29px -10px 0 2.5px,
              10px 0     0 0px, 19px 0     0 0px, 29px 0     0 0px,
              10px 10px  0 0px, 19px 10px  0 2.5px, 29px 10px  0 0px;
          }
          50% {
            box-shadow:
              10px -10px 0 2.5px, 19px -10px 0 2.5px, 29px -10px 0 0px,
              10px 0     0 0px, 19px 0     0 0px, 29px 0     0 0px,
              10px 10px  0 0px, 19px 10px  0 0px, 29px 10px  0 2.5px;
          }
          62.5% {
            box-shadow:
              10px -10px 0 0px, 19px -10px 0 0px, 29px -10px 0 0px,
              10px 0     0 2.5px, 19px 0     0 0px, 29px 0     0 0px,
              10px 10px  0 0px, 19px 10px  0 2.5px, 29px 10px  0 2.5px;
          }
          75% {
            box-shadow:
              10px -10px 0 0px, 19px -10px 0 2.5px, 29px -10px 0 0px,
              10px 0     0 0px, 19px 0     0 0px, 29px 0     0 2.5px,
              10px 10px  0 0px, 19px 10px  0 0px, 29px 10px  0 2.5px;
          }
          87.5% {
            box-shadow:
              10px -10px 0 0px, 19px -10px 0 2.5px, 29px -10px 0 0px,
              10px 0     0 0px, 19px 0     0 2.5px, 29px 0     0 0px,
              10px 10px  0 2.5px, 19px 10px  0 0px, 29px 10px  0 0px;
          }
        }
      `}</style>
    </div>
  );
}
