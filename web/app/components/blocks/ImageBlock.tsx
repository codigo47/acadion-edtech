'use client';

import React from 'react';
import Image from 'next/image';
import { TextStyle, BackgroundStyle } from './types';

export type ImageLayout = 'image-left' | 'image-right' | 'image-top' | 'image-bottom' | 'stretched';

export interface ImageBlockProps {
  image: string;
  text?: string;
  layout?: ImageLayout;
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  alt?: string;
}

export default function ImageBlock({
  image,
  text,
  layout = 'image-top',
  textStyle = {},
  textBackgroundStyle = {},
  alt = 'Image',
}: ImageBlockProps) {
  const layoutClasses = {
    'image-left': 'flex flex-row gap-4',
    'image-right': 'flex flex-row-reverse gap-4',
    'image-top': 'flex flex-col gap-4',
    'image-bottom': 'flex flex-col-reverse gap-4',
    'stretched': 'relative',
  }[layout];

  const imageContainerClass = layout === 'stretched'
    ? 'w-full h-64 relative'
    : layout === 'image-left' || layout === 'image-right'
    ? 'w-1/2 relative h-64'
    : 'w-full h-64 relative';

  const textContainerClass = layout === 'stretched'
    ? 'absolute inset-0 flex items-center justify-center bg-black/40'
    : layout === 'image-left' || layout === 'image-right'
    ? 'w-1/2 flex items-center'
    : 'w-full';

  return (
    <div className={`${layoutClasses} p-4 w-full`}>
      <div className={imageContainerClass}>
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      {text && (
        <div
          className={`${textContainerClass} p-4 rounded-lg`}
          style={{
            backgroundColor: textBackgroundStyle.backgroundColor,
            padding: textBackgroundStyle.padding,
            borderRadius: textBackgroundStyle.borderRadius,
          }}
        >
          <p
            style={{
              fontSize: textStyle.fontSize,
              fontWeight: textStyle.fontWeight,
              color: textStyle.color || (layout === 'stretched' ? 'white' : undefined),
              fontStyle: textStyle.fontStyle,
              textAlign: textStyle.textAlign,
              lineHeight: textStyle.lineHeight,
            }}
          >
            {text}
          </p>
        </div>
      )}
    </div>
  );
}
