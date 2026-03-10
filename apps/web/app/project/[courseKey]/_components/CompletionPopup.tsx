'use client';

import { motion } from 'framer-motion';

export function CompletionPopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Generated!</h2>
          <p className="text-gray-600 mb-6">
            Your course has been successfully created. You can now edit it manually or continue refining it with AI assistance using the chat panel.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-[#9F80DA] hover:bg-[#8A6BC5] text-white font-medium py-3 px-6 rounded-xl transition-colors"
          >
            Start Editing
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
