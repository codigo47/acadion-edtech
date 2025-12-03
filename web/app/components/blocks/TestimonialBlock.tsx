'use client';

import React from 'react';
import Image from 'next/image';
import { TextStyle, BackgroundStyle } from './types';

export interface Testimonial {
  title?: string;
  content: string;
  name?: string;
  avatar?: string;
  role?: string;
}

export interface TestimonialBlockProps {
  testimonials: Testimonial[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  backgroundImage?: string;
  dark?: boolean;
}

export default function TestimonialBlock({
  testimonials,
  textStyle = {},
  textBackgroundStyle = {},
  backgroundImage,
  dark = false,
}: TestimonialBlockProps) {
  return (
    <div
      className={`w-full p-6 rounded-lg relative overflow-hidden ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div
        className={`relative z-10 grid gap-6 grid-cols-1 ${
          testimonials.length === 2
            ? 'md:grid-cols-2'
            : testimonials.length >= 3
              ? 'md:grid-cols-2 lg:grid-cols-3'
              : ''
        }`}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`backdrop-blur-sm p-6 rounded-xl shadow-lg ${dark ? 'bg-gray-800/90' : 'bg-white/90'}`}
          >
            <svg
              className="w-8 h-8 mb-3 opacity-30 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {testimonial.title && (
              <h4
                className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : ''}`}
                style={{
                  fontSize: textStyle.fontSize,
                  fontWeight: textStyle.fontWeight || '600',
                  color: textStyle.color || (dark ? '#ffffff' : undefined),
                  fontStyle: textStyle.fontStyle,
                }}
              >
                {testimonial.title}
              </h4>
            )}

            <p
              className={dark ? 'text-gray-300 mb-4' : 'text-gray-600 mb-4'}
              style={{
                fontSize: textStyle.fontSize || '14px',
                color: textStyle.color || (dark ? '#d1d5db' : '#4B5563'),
                lineHeight: textStyle.lineHeight || '1.5',
              }}
            >
              {testimonial.content}
            </p>

            {(testimonial.name || testimonial.avatar) && (
              <div className={`flex items-center gap-3 pt-4 border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
                {testimonial.avatar && (
                  <div className="relative w-10 h-10">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name || 'Author'}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  {testimonial.name && (
                    <p className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</p>
                  )}
                  {testimonial.role && (
                    <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
