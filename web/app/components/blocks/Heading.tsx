'use client';

import React from 'react';
import { TextStyle } from './types';

export interface HeadingProps {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function Heading({
  text,
  level = 1,
  textStyle = {},
  dark = false,
}: HeadingProps) {
  const sizeClasses = {
    1: 'text-4xl font-bold',
    2: 'text-3xl font-bold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-semibold',
    5: 'text-lg font-medium',
    6: 'text-base font-medium',
  }[level];

  const commonProps = {
    className: `${sizeClasses} ${dark ? 'text-white' : ''}`,
    style: {
      fontSize: textStyle.fontSize,
      fontWeight: textStyle.fontWeight,
      color: textStyle.color || (dark ? '#ffffff' : undefined),
      fontStyle: textStyle.fontStyle,
      textAlign: textStyle.textAlign,
      lineHeight: textStyle.lineHeight,
    },
  };

  switch (level) {
    case 1:
      return <h1 {...commonProps}>{text}</h1>;
    case 2:
      return <h2 {...commonProps}>{text}</h2>;
    case 3:
      return <h3 {...commonProps}>{text}</h3>;
    case 4:
      return <h4 {...commonProps}>{text}</h4>;
    case 5:
      return <h5 {...commonProps}>{text}</h5>;
    case 6:
      return <h6 {...commonProps}>{text}</h6>;
    default:
      return <h1 {...commonProps}>{text}</h1>;
  }
}
