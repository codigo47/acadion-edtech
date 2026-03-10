'use client';

import React from 'react';
import NextImage from 'next/image';
import { TextStyle } from './types';
import styles from './StoryTellingBlock.module.css';

// Enum para los tipos de avatar
export enum AvatarType {
  TorsoGrande = 'torso-grande',
  TorsoAlto = 'torso-alto',
  SinPiernas = 'sin-piernas',
}

// Enum para las formas predefinidas de la burbuja
export enum BubbleShape {
  Classic = 'classic',
  Rounded = 'rounded',
  Cloud = 'cloud',
  Square = 'square',
  Thought = 'thought',
}

export interface BubbleStyle {
  backgroundColor?: string;
  shape?: BubbleShape;
  borderWidth?: string;
  borderColor?: string;
}

export interface StoryTellingBlockProps {
  avatarImage: string;
  avatarName?: string;
  text: string;
  bubbleStyle?: BubbleStyle;
  textStyle?: TextStyle;
  avatarPosition?: 'left' | 'right';
  dark?: boolean;
}

export default function StoryTellingBlock({
  avatarImage,
  avatarName,
  text,
  bubbleStyle = {},
  textStyle = {},
  avatarPosition = 'left',
  dark = false,
}: StoryTellingBlockProps) {
  const displayText = text.slice(0, 1000);

  const {
    backgroundColor = dark ? '#374151' : '#FFFFFF',
    shape = BubbleShape.Classic,
    borderWidth = '2px',
    borderColor = dark ? '#4B5563' : '#D1D5DB',
  } = bubbleStyle;

  const {
    fontSize = '16px',
    fontWeight = '400',
    color = dark ? '#F3F4F6' : '#1F2937',
    fontStyle = 'normal',
    lineHeight = '1.6',
    textAlign = 'left',
  } = textStyle;

  const isLeft = avatarPosition === 'left';
  const isThought = shape === BubbleShape.Thought || shape === BubbleShape.Cloud;

  // Obtener el border-radius según la forma
  const getBorderRadius = () => {
    switch (shape) {
      case BubbleShape.Classic:
        return '15px';
      case BubbleShape.Rounded:
        return '25px';
      case BubbleShape.Cloud:
        return '30px';
      case BubbleShape.Square:
        return '8px';
      case BubbleShape.Thought:
        return '20px';
      default:
        return '15px';
    }
  };

  // Clases CSS para la burbuja
  const bubbleClasses = [
    styles.bubble,
    isLeft ? styles.left : styles.right,
    isThought ? styles.thought : styles.speech,
  ].join(' ');

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div
        className={`flex items-start gap-4 max-w-2xl mx-auto ${
          isLeft ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-32 md:w-32 md:h-40">
            {avatarImage ? (
              <NextImage
                src={avatarImage}
                alt={avatarName || 'Avatar'}
                fill
                className="object-contain object-top"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">Avatar</div>
            )}
          </div>
          {avatarName && (
            <p
              className={`text-center text-sm mt-1 font-medium ${
                dark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {avatarName}
            </p>
          )}
        </div>

        {/* Burbuja de diálogo */}
        <div className="flex-1">
          <div
            className={bubbleClasses}
            style={{
              '--bubble-bg': backgroundColor,
              '--bubble-border': borderColor,
              '--bubble-border-width': borderWidth,
              '--bubble-radius': getBorderRadius(),
            } as React.CSSProperties}
          >
            <p
              style={{
                fontSize,
                fontWeight,
                color,
                fontStyle,
                lineHeight,
                textAlign,
                margin: 0,
              }}
            >
              {displayText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
