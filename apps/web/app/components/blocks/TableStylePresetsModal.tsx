'use client';

import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export interface TablePreset {
  id: string;
  name: string;
  headerBg: string;
  headerTextColor: string;
  evenRowBg: string;
  oddRowBg: string;
  cellTextColor: string;
  borderColor: string;
  borderWidth: number;
  fontSize: string;
}

export const TABLE_PRESETS: TablePreset[] = [
  {
    id: 'classic',
    name: 'Classic',
    headerBg: '#F3F4F6',
    headerTextColor: '#111827',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#F9FAFB',
    cellTextColor: '#374151',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    fontSize: '14px',
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    headerBg: '#1F2937',
    headerTextColor: '#F9FAFB',
    evenRowBg: '#111827',
    oddRowBg: '#1F2937',
    cellTextColor: '#D1D5DB',
    borderColor: '#374151',
    borderWidth: 1,
    fontSize: '14px',
  },
  {
    id: 'purple-brand',
    name: 'Purple Brand',
    headerBg: '#9F80DA',
    headerTextColor: '#FFFFFF',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#F5F3FF',
    cellTextColor: '#374151',
    borderColor: '#DDD6FE',
    borderWidth: 1,
    fontSize: '14px',
  },
  {
    id: 'blue-professional',
    name: 'Blue Pro',
    headerBg: '#2563EB',
    headerTextColor: '#FFFFFF',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#EFF6FF',
    cellTextColor: '#1E3A5F',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    fontSize: '14px',
  },
  {
    id: 'green-nature',
    name: 'Green Nature',
    headerBg: '#16A34A',
    headerTextColor: '#FFFFFF',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#F0FDF4',
    cellTextColor: '#166534',
    borderColor: '#BBF7D0',
    borderWidth: 1,
    fontSize: '14px',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    headerBg: '#FFFFFF',
    headerTextColor: '#374151',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#FFFFFF',
    cellTextColor: '#374151',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    fontSize: '14px',
  },
  {
    id: 'striped-gray',
    name: 'Striped Gray',
    headerBg: '#E5E7EB',
    headerTextColor: '#111827',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#F3F4F6',
    cellTextColor: '#374151',
    borderColor: 'transparent',
    borderWidth: 0,
    fontSize: '14px',
  },
  {
    id: 'bold-borders',
    name: 'Bold Borders',
    headerBg: '#F3F4F6',
    headerTextColor: '#111827',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#FFFFFF',
    cellTextColor: '#374151',
    borderColor: '#9CA3AF',
    borderWidth: 2,
    fontSize: '14px',
  },
  {
    id: 'warm',
    name: 'Warm',
    headerBg: '#FEF3C7',
    headerTextColor: '#92400E',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#FFFBEB',
    cellTextColor: '#78350F',
    borderColor: '#FDE68A',
    borderWidth: 1,
    fontSize: '14px',
  },
  {
    id: 'compact',
    name: 'Compact',
    headerBg: '#F9FAFB',
    headerTextColor: '#374151',
    evenRowBg: '#FFFFFF',
    oddRowBg: '#F9FAFB',
    cellTextColor: '#4B5563',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    fontSize: '12px',
  },
];

// Mini table preview for preset selection
function PresetPreview({ preset, selected, onClick }: { preset: TablePreset; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border-2 p-2 transition-all hover:shadow-md ${
        selected ? 'border-[#9F80DA] ring-2 ring-[#9F80DA]/20' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <table className="w-full border-collapse" style={{ fontSize: '8px' }}>
        <thead>
          <tr>
            {['A', 'B', 'C'].map((h) => (
              <th
                key={h}
                className="px-1 py-0.5 text-center font-semibold"
                style={{
                  backgroundColor: preset.headerBg,
                  color: preset.headerTextColor,
                  border: preset.borderWidth > 0 ? `${preset.borderWidth}px solid ${preset.borderColor}` : 'none',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1].map((row) => (
            <tr key={row}>
              {['1', '2', '3'].map((cell) => (
                <td
                  key={cell}
                  className="px-1 py-0.5 text-center"
                  style={{
                    backgroundColor: row % 2 === 0 ? preset.evenRowBg : preset.oddRowBg,
                    color: preset.cellTextColor,
                    border: preset.borderWidth > 0 ? `${preset.borderWidth}px solid ${preset.borderColor}` : 'none',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[9px] text-gray-500 text-center mt-1 font-medium">{preset.name}</p>
    </button>
  );
}

interface TableStylePresetsModalProps {
  currentPresetId?: string;
  onSelect: (preset: TablePreset) => void;
  onClose: () => void;
}

export function TableStylePresetsModal({ currentPresetId, onSelect, onClose }: TableStylePresetsModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div ref={ref} className="bg-white rounded-xl shadow-2xl border border-gray-200 w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">Table Style Presets</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {TABLE_PRESETS.map((preset) => (
            <PresetPreview
              key={preset.id}
              preset={preset}
              selected={currentPresetId === preset.id}
              onClick={() => {
                onSelect(preset);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
