'use client';

import React, { useState } from 'react';
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

export interface EmbedBlockProps {
  html?: string;
  url?: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16' | 'auto';
  maxHeight?: number;
  allowFullscreen?: boolean;
  dark?: boolean;
}

export default function EmbedBlock({
  html,
  url,
  title = 'Embedded content',
  aspectRatio = '16:9',
  maxHeight,
  allowFullscreen = true,
  dark = false,
}: EmbedBlockProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square';
      case '9:16':
        return 'aspect-[9/16]';
      case 'auto':
        return '';
      default:
        return 'aspect-video';
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // If HTML is provided, render it directly
  if (html) {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        <div
          className={`relative w-full rounded-lg overflow-hidden ${
            dark ? 'bg-gray-800' : 'bg-gray-100'
          } ${getAspectRatioClass()}`}
          style={maxHeight && aspectRatio === 'auto' ? { maxHeight } : undefined}
        >
          <div
            className="absolute inset-0 w-full h-full"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }

  // If URL is provided, render an iframe
  if (url) {
    if (isFullscreen) {
      return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between p-4 bg-gray-900">
            <span className="text-white font-medium">{title}</span>
            <div className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <iframe
            src={url}
            title={title}
            className="flex-1 w-full"
            allowFullScreen={allowFullscreen}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      );
    }

    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        <div
          className={`relative w-full rounded-lg overflow-hidden shadow-lg ${getAspectRatioClass()}`}
          style={maxHeight && aspectRatio === 'auto' ? { maxHeight } : undefined}
        >
          <iframe
            src={url}
            title={title}
            className="absolute inset-0 w-full h-full"
            allowFullScreen={allowFullscreen}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />

          {/* Controls overlay */}
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            {allowFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Placeholder if neither html nor url is provided
  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div
        className={`flex items-center justify-center rounded-lg ${getAspectRatioClass()} ${
          dark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'
        }`}
      >
        <p>No content to embed</p>
      </div>
    </div>
  );
}
