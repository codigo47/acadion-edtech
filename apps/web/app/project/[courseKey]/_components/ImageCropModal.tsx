'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Crop as CropIcon, RotateCw } from 'lucide-react';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropModalProps {
  imageUrl: string;
  aspectRatio?: number;
  onCropComplete: (croppedArea: CropArea, croppedDataUrl?: string) => void;
  onClose: () => void;
  onSkipCrop?: () => void;
  isUploading?: boolean;
}

const ASPECT_PRESETS = [
  { label: 'Free', value: 0 },
  { label: '16:9', value: 16 / 9 },
  { label: '4:3', value: 4 / 3 },
  { label: '1:1', value: 1 },
  { label: '3:4', value: 3 / 4 },
] as const;

function getCroppedImg(image: HTMLImageElement, pixelCrop: PixelCrop, rotation = 0): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No canvas context');

  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const bBoxWidth = image.naturalWidth * cos + image.naturalHeight * sin;
  const bBoxHeight = image.naturalWidth * sin + image.naturalHeight * cos;

  // Draw rotated full image onto temp canvas
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) throw new Error('No canvas context');
  tempCanvas.width = bBoxWidth;
  tempCanvas.height = bBoxHeight;
  tempCtx.translate(bBoxWidth / 2, bBoxHeight / 2);
  tempCtx.rotate(radians);
  tempCtx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2);
  tempCtx.drawImage(image, 0, 0);

  // Scale pixel crop from displayed size to natural size
  const scaleX = (rotation % 180 === 0 ? image.naturalWidth : bBoxWidth) / image.width;
  const scaleY = (rotation % 180 === 0 ? image.naturalHeight : bBoxHeight) / image.height;
  const sx = pixelCrop.x * scaleX;
  const sy = pixelCrop.y * scaleY;
  const sw = pixelCrop.width * scaleX;
  const sh = pixelCrop.height * scaleY;

  canvas.width = sw;
  canvas.height = sh;

  if (rotation === 0) {
    ctx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
  } else {
    ctx.drawImage(tempCanvas, sx, sy, sw, sh, 0, 0, sw, sh);
  }

  return canvas.toDataURL('image/jpeg', 0.9);
}

export function ImageCropModal({ imageUrl, aspectRatio: initialAspect, onCropComplete, onClose, onSkipCrop, isUploading }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotation, setRotation] = useState(0);
  const [activeAspect, setActiveAspect] = useState(initialAspect || 0);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const aspect = activeAspect || undefined;

    const initialCrop = centerCrop(
      makeAspectCrop(
        { unit: '%', width: 80 },
        aspect || width / height,
        width,
        height,
      ),
      width,
      height,
    );
    setCrop(initialCrop);
  }, [activeAspect]);

  const handleAspectChange = useCallback((value: number) => {
    setActiveAspect(value);
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const aspect = value || undefined;
      const newCrop = centerCrop(
        makeAspectCrop(
          { unit: '%', width: 80 },
          aspect || width / height,
          width,
          height,
        ),
        width,
        height,
      );
      setCrop(newCrop);
    }
  }, []);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleApply = useCallback(() => {
    if (completedCrop && imgRef.current) {
      try {
        const dataUrl = getCroppedImg(imgRef.current, completedCrop, rotation);
        const area: CropArea = {
          x: completedCrop.x,
          y: completedCrop.y,
          width: completedCrop.width,
          height: completedCrop.height,
        };
        onCropComplete(area, dataUrl);
      } catch {
        if (completedCrop) {
          onCropComplete({
            x: completedCrop.x,
            y: completedCrop.y,
            width: completedCrop.width,
            height: completedCrop.height,
          });
        }
      }
    }
  }, [completedCrop, imgRef, rotation, onCropComplete]);

  const cropAspect = activeAspect === 0 ? undefined : activeAspect;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <CropIcon className="w-5 h-5 text-[#9F80DA]" />
            <h3 className="text-lg font-semibold text-gray-900">Crop Image</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cropper area */}
        <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100 p-4" style={{ maxHeight: 450 }}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={cropAspect}
            className="max-h-full"
          >
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Crop"
              onLoad={onImageLoad}
              crossOrigin="anonymous"
              style={{
                maxHeight: 420,
                transform: rotation ? `rotate(${rotation}deg)` : undefined,
              }}
            />
          </ReactCrop>
        </div>

        {/* Controls */}
        <div className="px-6 py-3 border-t border-gray-200">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Rotation */}
            <button
              onClick={handleRotate}
              title={`Rotation: ${rotation}°`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              <RotateCw className="w-4 h-4" />
              {rotation}°
            </button>

            <div className="w-px h-5 bg-gray-200" />

            {/* Aspect presets */}
            <div className="flex items-center gap-1">
              {ASPECT_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handleAspectChange(preset.value)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    activeAspect === preset.value
                      ? 'bg-[#9F80DA] text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          {onSkipCrop && (
            <button
              onClick={onSkipCrop}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Use as is
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!completedCrop || isUploading}
            className="px-5 py-2 text-sm font-medium text-white bg-[#9F80DA] hover:bg-[#8A6BC5] rounded-lg transition-colors disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Apply Crop'}
          </button>
        </div>
      </div>
    </div>
  );
}
