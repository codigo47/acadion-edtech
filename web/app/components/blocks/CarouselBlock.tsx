'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ZoomableImage from './ZoomableImage';

export interface CarouselImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface CarouselBlockProps {
  images: CarouselImage[];
  zoomable?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  dark?: boolean;
}

export default function CarouselBlock({ images, zoomable = false, autoPlay = false, autoPlayInterval = 5, dark = false }: CarouselBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  React.useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, autoPlayInterval * 1000);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="relative">
        <div className="relative h-80 w-full overflow-hidden rounded-lg">
          {currentImage.src ? (
            zoomable ? (
              <ZoomableImage
                src={currentImage.src}
                alt={currentImage.alt || `Slide ${currentIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
              />
            ) : (
              <Image
                src={currentImage.src}
                alt={currentImage.alt || `Slide ${currentIndex + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
              />
            )
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No image</div>
          )}
          {currentImage.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
              <p className="text-center">{currentImage.caption}</p>
            </div>
          )}
        </div>

        <button
          onClick={goToPrevious}
          className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors ${dark ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'}`}
          aria-label="Previous image"
        >
          <ChevronLeft className={`w-6 h-6 ${dark ? 'text-white' : 'text-gray-800'}`} />
        </button>

        <button
          onClick={goToNext}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-colors ${dark ? 'bg-gray-700/80 hover:bg-gray-600' : 'bg-white/80 hover:bg-white'}`}
          aria-label="Next image"
        >
          <ChevronRight className={`w-6 h-6 ${dark ? 'text-white' : 'text-gray-800'}`} />
        </button>

        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : (dark ? 'bg-gray-600' : 'bg-gray-300')
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
