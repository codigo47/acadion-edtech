'use client';

import React from 'react';

export interface VideoBlockProps {
  url: string;
  title?: string;
  dark?: boolean;
}

const getYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getVimeoId = (url: string): string | null => {
  const regExp = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export default function VideoBlock({
  url,
  title = 'Video',
  dark = false,
}: VideoBlockProps) {
  const youtubeId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);

  let embedUrl = url;

  if (youtubeId) {
    embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
  } else if (vimeoId) {
    embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
  }

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
