'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Link, Image as ImageIcon, Crop } from 'lucide-react';
import { ImageCropModal } from './ImageCropModal';
import { useUploadImage } from '@/lib/hooks/use-upload';
import { useToast } from '@/app/components/ToastProvider';

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bytes = atob(base64);
  const array = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    array[i] = bytes.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
];

interface ImagePickerModalProps {
  currentUrl?: string;
  onSelect: (url: string, crop?: { x: number; y: number; width: number; height: number }) => void;
  onClose: () => void;
}

export function ImagePickerModal({ currentUrl, onSelect, onClose }: ImagePickerModalProps) {
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const uploadImage = useUploadImage();
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (cropImage) {
          setCropImage(null);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, cropImage]);

  const handleImageSelected = useCallback((url: string) => {
    setCropImage(url);
  }, []);

  const handleCropComplete = useCallback(async (
    croppedArea: { x: number; y: number; width: number; height: number },
    croppedDataUrl?: string,
  ) => {
    if (!cropImage) return;

    const imageToUse = croppedDataUrl || cropImage;

    if (imageToUse.startsWith('data:')) {
      setIsUploading(true);
      try {
        const blob = dataUrlToBlob(imageToUse);
        const { url } = await uploadImage.mutateAsync(blob);
        onSelect(url, {
          x: croppedArea.x,
          y: croppedArea.y,
          width: croppedArea.width,
          height: croppedArea.height,
        });
        onClose();
      } catch {
        showToast('Failed to upload image', 'error');
      } finally {
        setIsUploading(false);
      }
      return;
    }

    onSelect(imageToUse, {
      x: croppedArea.x,
      y: croppedArea.y,
      width: croppedArea.width,
      height: croppedArea.height,
    });
    onClose();
  }, [cropImage, onSelect, onClose, uploadImage, showToast]);

  const handleSkipCrop = useCallback(() => {
    if (cropImage) {
      onSelect(cropImage);
      onClose();
    }
  }, [cropImage, onSelect, onClose]);

  // Show crop modal when an image is selected
  if (cropImage) {
    return (
      <ImageCropModal
        imageUrl={cropImage}
        onCropComplete={handleCropComplete}
        onClose={() => setCropImage(null)}
        onSkipCrop={handleSkipCrop}
        isUploading={isUploading}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#9F80DA]" />
            <h3 className="text-lg font-semibold text-gray-900">Select Image</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* URL Input */}
        <div className="px-6 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#9F80DA]">
              <Link className="w-4 h-4 text-gray-400 ml-3" />
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 text-sm focus:outline-none"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <button
              onClick={() => {
                if (urlInput.trim()) {
                  handleImageSelected(urlInput.trim());
                }
              }}
              disabled={!urlInput.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-[#9F80DA] hover:bg-[#8A6BC5] rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <Crop className="w-3.5 h-3.5" />
              Use URL
            </button>
          </div>
        </div>

        {/* Placeholder Images */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm text-gray-500 mb-3">Or select a placeholder image:</p>
          <div className="grid grid-cols-4 gap-3">
            {PLACEHOLDER_IMAGES.map((url, idx) => (
              <button
                key={idx}
                onClick={() => handleImageSelected(url)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${
                  currentUrl === url
                    ? 'border-[#9F80DA] ring-2 ring-[#9F80DA]/20'
                    : 'border-gray-200 hover:border-[#9F80DA]'
                }`}
              >
                <img
                  src={url}
                  alt={`Placeholder ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
