'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImageCropModalProps {
  imageUrl: string;
  aspectRatio?: number;
  onCropComplete: (croppedArea: Area, croppedDataUrl?: string) => void;
  onClose: () => void;
  onSkipCrop?: () => void;
}

const ASPECT_PRESETS = [
  { label: 'Free', value: undefined },
  { label: '16:9', value: 16 / 9 },
  { label: '4:3', value: 4 / 3 },
  { label: '1:1', value: 1 },
  { label: '3:4', value: 3 / 4 },
] as const;

const ROTATION_STEPS = [0, 90, 180, 270] as const;

async function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0): Promise<string> {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
    image.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No canvas context');

  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const bBoxWidth = image.width * cos + image.height * sin;
  const bBoxHeight = image.width * sin + image.height * cos;

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(radians);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');
  if (!croppedCtx) throw new Error('No canvas context');

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return croppedCanvas.toDataURL('image/jpeg', 0.9);
}

export function ImageCropModal({ imageUrl, aspectRatio: initialAspect, onCropComplete, onClose, onSkipCrop }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(initialAspect);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const onCropChange = useCallback((location: Point) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((z: number) => {
    setZoom(z);
  }, []);

  const onCropAreaComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleRotate = useCallback(() => {
    setRotation((prev) => {
      const currentIndex = ROTATION_STEPS.indexOf(prev as typeof ROTATION_STEPS[number]);
      const nextIndex = (currentIndex + 1) % ROTATION_STEPS.length;
      return ROTATION_STEPS[nextIndex];
    });
  }, []);

  const handleApply = useCallback(async () => {
    if (croppedAreaPixels) {
      try {
        const dataUrl = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
        onCropComplete(croppedAreaPixels, dataUrl);
      } catch {
        onCropComplete(croppedAreaPixels);
      }
    }
  }, [croppedAreaPixels, imageUrl, rotation, onCropComplete]);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-gray-900/95" />

      {/* Cropper area — takes all available space */}
      <div className="relative flex-1 min-h-0">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropAreaComplete}
        />
      </div>

      {/* Bottom controls bar — all buttons together */}
      <div className="relative bg-gray-800 border-t border-white/10 px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Zoom */}
          <div className="flex items-center gap-2">
            <ZoomOut className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-24 h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9F80DA]
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#9F80DA] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
            />
            <ZoomIn className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-xs text-gray-400 w-8 tabular-nums">{zoom.toFixed(1)}x</span>
          </div>

          <div className="w-px h-6 bg-white/10" />

          {/* Rotation */}
          <button
            onClick={handleRotate}
            title={`Rotation: ${rotation}°`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors text-sm"
          >
            <RotateCw className="w-4 h-4" />
            {rotation}°
          </button>

          <div className="w-px h-6 bg-white/10" />

          {/* Aspect presets */}
          <div className="flex items-center gap-1">
            {ASPECT_PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setAspect(preset.value)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  aspect === preset.value
                    ? 'bg-[#9F80DA] text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action buttons */}
          {onSkipCrop && (
            <button
              onClick={onSkipCrop}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Use as is
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!croppedAreaPixels}
            className="px-5 py-2 text-sm font-medium text-white bg-[#9F80DA] hover:bg-[#8A6BC5] rounded-lg transition-colors disabled:opacity-50"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
