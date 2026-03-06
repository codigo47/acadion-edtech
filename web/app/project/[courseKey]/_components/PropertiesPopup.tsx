'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface PropertyDefinition {
  key: string;
  label: string;
  type: 'toggle' | 'select' | 'number';
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

interface PropertiesPopupProps {
  componentName: string;
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
  onClose: () => void;
}

function getComponentProperties(componentName: string): PropertyDefinition[] {
  const properties: PropertyDefinition[] = [];

  // Image blocks
  if (
    componentName === 'ImageBlock' ||
    componentName.startsWith('ImageWithText')
  ) {
    properties.push({ key: 'zoomable', label: 'Zoomable', type: 'toggle' });
  }

  // GalleryBlock
  if (componentName === 'GalleryBlock') {
    properties.push({ key: 'zoomable', label: 'Zoomable', type: 'toggle' });
  }

  // CarouselBlock
  if (componentName === 'CarouselBlock') {
    properties.push({ key: 'autoPlay', label: 'Auto Play', type: 'toggle' });
    properties.push({
      key: 'autoPlayInterval',
      label: 'Interval (seconds)',
      type: 'number',
      min: 3,
      max: 10,
      step: 1,
    });
  }

  // TableBlock
  if (componentName === 'TableBlock') {
    properties.push({ key: 'headerRow', label: 'Header Row', type: 'toggle' });
    properties.push({
      key: 'stripedRows',
      label: 'Striped Rows',
      type: 'toggle',
    });
  }

  // SeparatorBlock
  if (componentName === 'SeparatorBlock') {
    properties.push({ key: 'showLine', label: 'Show Line', type: 'toggle' });
    properties.push({ key: 'showNumber', label: 'Show Number', type: 'toggle' });
    properties.push({
      key: 'thickness',
      label: 'Thickness',
      type: 'select',
      options: [
        { value: 'thin', label: 'Thin' },
        { value: 'medium', label: 'Medium' },
        { value: 'thick', label: 'Thick' },
      ],
    });
    properties.push({
      key: 'lineColor',
      label: 'Line Color',
      type: 'select',
      options: [
        { value: '#d1d5db', label: 'Gray' },
        { value: '#9F80DA', label: 'Purple' },
        { value: '#3b82f6', label: 'Blue' },
        { value: '#22c55e', label: 'Green' },
        { value: '#f97316', label: 'Orange' },
      ],
    });
  }

  // AccordionBlock
  if (componentName === 'AccordionBlock') {
    properties.push({
      key: 'openFirst',
      label: 'Open First Item',
      type: 'toggle',
    });
  }

  // TabsBlock
  if (componentName === 'TabsBlock') {
    properties.push({
      key: 'openFirst',
      label: 'Open First Tab',
      type: 'toggle',
    });
  }

  return properties;
}

const DEFAULTS: Record<string, unknown> = {
  zoomable: false,
  autoPlay: false,
  autoPlayInterval: 5,
  headerRow: true,
  stripedRows: false,
  openFirst: true,
  showLine: true,
  showNumber: false,
  thickness: 'thin',
  lineColor: '#d1d5db',
};

export function PropertiesPopup({
  componentName,
  content,
  onDataChange,
  onClose,
}: PropertiesPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const properties = getComponentProperties(componentName);

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  function getValue(key: string): unknown {
    return content[key] !== undefined ? content[key] : DEFAULTS[key];
  }

  function handleChange(key: string, value: unknown) {
    onDataChange({ ...content, [key]: value });
  }

  if (properties.length === 0) {
    return (
      <div
        ref={popupRef}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">
            Properties
          </span>
          <button
            onClick={onClose}
            className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-4 py-6 text-center text-sm text-gray-400">
          No properties available for this block.
        </div>
      </div>
    );
  }

  return (
    <div
      ref={popupRef}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-semibold text-gray-800">Properties</span>
        <button
          onClick={onClose}
          className="p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Properties list */}
      <div className="p-3 space-y-3">
        {properties.map((prop) => (
          <div key={prop.key}>
            {prop.type === 'toggle' && (
              <ToggleProperty
                label={prop.label}
                value={getValue(prop.key) as boolean}
                onChange={(val) => handleChange(prop.key, val)}
              />
            )}
            {prop.type === 'select' && prop.options && (
              <SelectProperty
                label={prop.label}
                value={getValue(prop.key) as string}
                options={prop.options}
                onChange={(val) => handleChange(prop.key, val)}
              />
            )}
            {prop.type === 'number' && (
              <NumberProperty
                label={prop.label}
                value={getValue(prop.key) as number}
                min={prop.min ?? 0}
                max={prop.max ?? 100}
                step={prop.step ?? 1}
                onChange={(val) => handleChange(prop.key, val)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToggleProperty({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-9 h-5 rounded-full transition-colors ${
          value ? 'bg-[#9F80DA]' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

function SelectProperty({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1">
      <span className="text-sm text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#9F80DA] focus:border-[#9F80DA]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function NumberProperty({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  function decrement() {
    const next = value - step;
    if (next >= min) onChange(next);
  }

  function increment() {
    const next = value + step;
    if (next <= max) onChange(next);
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={decrement}
          disabled={value <= min}
          className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center text-sm font-medium text-gray-700">
          {value}
        </span>
        <button
          onClick={increment}
          disabled={value >= max}
          className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
