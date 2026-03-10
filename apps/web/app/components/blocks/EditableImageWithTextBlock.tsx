'use client';

import { useState, useCallback } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { ImagePickerModal } from '@/app/project/[courseKey]/_components/ImagePickerModal';

export function isImageWithTextBlock(name: string): boolean {
  return [
    'ImageWithTextBlock', 'ImageWithTextLeftBlock', 'ImageWithTextCenterBlock',
    'ImageWithTextBottomBlock', 'ImageWithTextTopBlock',
  ].includes(name);
}

export function ImageOverlay({
  image,
  alt,
  onChangeImage,
  className,
}: {
  image: string;
  alt: string;
  onChangeImage: () => void;
  className?: string;
}) {
  const src = !image ? '' :
    image === '/sample.jpeg' || image.includes('sample')
      ? 'https://placehold.co/800x600/e2e8f0/64748b?text=Sample+Image'
      : image;

  return (
    <div
      className={`relative group/img cursor-pointer h-full ${className || ''}`}
      onClick={onChangeImage}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-lg" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">Image not available</span>
        </div>
      )}
      <div className="absolute inset-0 bg-transparent group-hover/img:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 pointer-events-none rounded-lg">
        <span className="px-3 py-1.5 bg-white/90 text-sm text-gray-600 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4" />
          Change image
        </span>
      </div>
    </div>
  );
}

export function EditableImageWithTextBlock({
  componentName,
  content,
  onDataChange,
}: {
  componentName: string;
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const image = String(content.image || '');
  const alt = String(content.alt || 'Image');
  const imageSize = (content.imageSize as number) || 50;
  const updateText = useCallback(
    (value: string) => onDataChange({ ...content, text: value }),
    [content, onDataChange],
  );

  const textEditor = (
    <EditableText
      value={String(content.text || '')}
      onChange={updateText}
      tag="p"
      className="text-base leading-relaxed"
      style={{ lineHeight: '1.75' }}
      placeholder="Enter text..."
    />
  );

  const imageOverlay = (
    <ImageOverlay
      image={image}
      alt={alt}
      onChangeImage={() => setShowPicker(true)}
    />
  );

  const imgWidthClass = `w-full md:w-[${imageSize}%]`;
  const txtWidthClass = `w-full md:w-[${100 - imageSize}%]`;

  let layout: React.ReactNode;

  if (componentName === 'ImageWithTextCenterBlock') {
    layout = (
      <div className="w-full p-4 space-y-4">
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <ImageOverlay
            image={image}
            alt={alt}
            onChangeImage={() => setShowPicker(true)}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none rounded-lg" />
        </div>
        <div className="p-4 rounded-lg cursor-text text-center">
          <EditableText
            value={String(content.text || '')}
            onChange={updateText}
            tag="p"
            className="text-base leading-relaxed"
            style={{ lineHeight: '1.75' }}
            placeholder="Enter text..."
          />
        </div>
      </div>
    );
  } else if (componentName === 'ImageWithTextTopBlock') {
    layout = (
      <div className="w-full p-4 flex flex-col-reverse gap-4">
        <div className="relative w-full h-64">
          {imageOverlay}
        </div>
        <div className="p-4 rounded-lg cursor-text">
          {textEditor}
        </div>
      </div>
    );
  } else if (componentName === 'ImageWithTextBottomBlock') {
    layout = (
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="relative w-full h-64">
          {imageOverlay}
        </div>
        <div className="p-4 rounded-lg cursor-text">
          {textEditor}
        </div>
      </div>
    );
  } else if (componentName === 'ImageWithTextLeftBlock') {
    layout = (
      <div className="w-full p-4">
        <div className="flex flex-col md:flex-row-reverse gap-4" style={{ alignItems: 'stretch' }}>
          <div className="relative h-48 md:h-64" style={{ width: '100%', flex: `0 0 ${imageSize}%` }}>
            {imageOverlay}
          </div>
          <div className="flex items-center p-4 rounded-lg cursor-text" style={{ flex: 1 }}>
            {textEditor}
          </div>
        </div>
      </div>
    );
  } else {
    // ImageWithTextBlock — image left, text right
    layout = (
      <div className="w-full p-4">
        <div className="flex flex-col md:flex-row gap-4" style={{ alignItems: 'stretch' }}>
          <div className="relative h-48 md:h-64" style={{ width: '100%', flex: `0 0 ${imageSize}%` }}>
            {imageOverlay}
          </div>
          <div className="flex items-center p-4 rounded-lg cursor-text" style={{ flex: 1 }}>
            {textEditor}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {layout}
      {showPicker && (
        <ImagePickerModal
          currentUrl={image}
          onSelect={(url) => onDataChange({ ...content, image: url })}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}
