'use client';

import React from 'react';
import NextImage from 'next/image';
import { Star } from 'lucide-react';
import { TextStyle } from './types';

export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  review: string;
}

export interface ReviewsBlockProps {
  reviews: Review[];
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function ReviewsBlock({
  reviews,
  textStyle = {},
  dark = false,
}: ReviewsBlockProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : dark
                ? 'text-gray-600'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`p-4 rounded-lg border ${
              dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {review.avatar ? (
                  <div className="relative w-12 h-12">
                    <NextImage
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      dark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`text-lg font-semibold ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className={`font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}
                    style={{ fontSize: textStyle.fontSize }}
                  >
                    {review.name}
                  </h4>
                  {renderStars(review.rating)}
                </div>
                <p
                  className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}
                  style={{
                    color: textStyle.color || (dark ? '#d1d5db' : undefined),
                    lineHeight: textStyle.lineHeight || '1.5',
                  }}
                >
                  {review.review}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
