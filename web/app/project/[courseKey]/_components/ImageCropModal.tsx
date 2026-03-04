'use client';

import { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

interface ImageCropModalProps {
  imageUrl: string;
  aspectRatio?: number;
  onCropComplete: (croppedArea: Area) => void;
  onClose: () => void;
}

const ASPECT_PRESETS = [
  { label: 'Free', value: undefined },
  { label: '16:9', value: 16 / 9 },
  { label: '4:3', value: 4 / 3 },
  { label: '1:1', value: 1 },
  { label: '3:4', value: 3 / 4 },
] as const;

const ROTATION_STEPS = [0, 90, 180, 270] as const;

export function ImageCropModal({ imageUrl, aspectRatio: initialAspect, onCropComplete, onClose }: ImageCropModalProps) {
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

  const handleApply = useCallback(() => {
    if (croppedAreaPixels) {
      onCropComplete(croppedAreaPixels);
    }
  }, [croppedAreaPixels, onCropComplete]);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-gray-900/95" />

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-3 border-b border-white/10">
        <h3 className="text-base font-semibold text-white">Crop Image</h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Cropper area */}
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

      {/* Controls bar */}
      <div className="relative bg-gray-800 border-t border-white/10 px-6 py-4 space-y-3">
        {/* Zoom control */}
        <div className="flex items-center gap-3">
          <ZoomOut className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9F80DA]
              [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-[#9F80DA] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
          />
          <ZoomIn className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-400 w-10 text-right tabular-nums">{zoom.toFixed(1)}x</span>
        </div>

        {/* Rotation + Aspect ratio */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Rotation */}
          <button
            onClick={handleRotate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors text-sm"
          >
            <RotateCw className="w-4 h-4" />
            {rotation}°
          </button>

          {/* Aspect presets */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-500 mr-1">Ratio:</span>
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
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 pt-1">
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
