'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ChatLoadingIndicatorProps {
  loadingText?: string | null;
  dark?: boolean;
}

export default function ChatLoadingIndicator({
  loadingText = null,
  dark = false
}: ChatLoadingIndicatorProps) {
  const displayText = loadingText || 'Processing...';

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2">
          {/* Animated dots */}
          <div className="flex gap-1">
            <span
              className={`w-2 h-2 rounded-full animate-bounce ${dark ? 'bg-gray-500' : 'bg-gray-400'}`}
              style={{ animationDelay: '0ms' }}
            />
            <span
              className={`w-2 h-2 rounded-full animate-bounce ${dark ? 'bg-gray-500' : 'bg-gray-400'}`}
              style={{ animationDelay: '150ms' }}
            />
            <span
              className={`w-2 h-2 rounded-full animate-bounce ${dark ? 'bg-gray-500' : 'bg-gray-400'}`}
              style={{ animationDelay: '300ms' }}
            />
          </div>
          {/* Loading message */}
          <AnimatePresence mode="wait">
            <motion.span
              key={displayText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {displayText}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
