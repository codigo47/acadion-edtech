'use client';

import { useState } from 'react';
import { Plus, Trash2, Palette } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { TableStylePresetsModal, type TablePreset } from './TableStylePresetsModal';

export function EditableTableBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const rows = (content.rows as number) || 2;
  const columns = (content.columns as number) || 2;
  const headerRow = content.headerRow !== false; // default true, matching read-only
  const stripedRows = (content.stripedRows as boolean) || false;
  const tableContent = (content.content as string[][]) || Array.from({ length: rows }, () => Array(columns).fill(''));
  const tableStyle = content.tableStyle as TablePreset | undefined;
  const [deleteConfirmRow, setDeleteConfirmRow] = useState<number | null>(null);
  const [showStylePresets, setShowStylePresets] = useState(false);

  const updateCell = (r: number, c: number, value: string) => {
    const n = tableContent.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? value : cell) : [...row]);
    onDataChange({ ...content, content: n });
  };

  const addRow = () => { onDataChange({ ...content, content: [...tableContent, Array(columns).fill('')], rows: rows + 1 }); };
  const addColumn = () => { onDataChange({ ...content, content: tableContent.map(row => [...row, '']), columns: columns + 1 }); };
  const removeRow = (r: number) => { if (rows <= 1) return; onDataChange({ ...content, content: tableContent.filter((_, i) => i !== r), rows: rows - 1 }); setDeleteConfirmRow(null); };
  const removeColumn = (c: number) => { if (columns <= 1) return; onDataChange({ ...content, content: tableContent.map(row => row.filter((_, i) => i !== c)), columns: columns - 1 }); };

  // Derive styles from preset or defaults
  const headerBg = tableStyle?.headerBg || '#F3F4F6';
  const headerTextColor = tableStyle?.headerTextColor || undefined;
  const evenRowBg = tableStyle?.evenRowBg || '#FFFFFF';
  const oddRowBg = tableStyle?.oddRowBg || (stripedRows ? '#F9FAFB' : '#FFFFFF');
  const cellTextColor = tableStyle?.cellTextColor || undefined;
  const borderColor = tableStyle?.borderColor || '#D1D5DB';
  const borderWidth = tableStyle?.borderWidth ?? 1;
  const fontSize = tableStyle?.fontSize || undefined;
  const borderStyle = borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none';

  return (
    <div className="w-full p-4 rounded-lg overflow-x-auto">
      <table className="w-full border-collapse" style={{ color: cellTextColor || 'var(--block-text-color, inherit)', fontSize, border: borderStyle }}>
        {headerRow && tableContent.length > 0 && (
          <thead>
            <tr style={{ backgroundColor: headerBg }}>
              {tableContent[0].map((cell, ci) => (
                <th key={ci} className="px-4 py-2 font-semibold text-left cursor-text" style={{ border: borderStyle, color: headerTextColor }}>
                  <EditableText value={cell} onChange={(v) => updateCell(0, ci, v)} tag="span" className="font-semibold" placeholder="Header..." multiline={false} />
                </th>
              ))}
              <th className="w-8" style={{ border: 'none' }}>
                {rows > 1 && (
                  deleteConfirmRow === 0 ? (
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <button onClick={() => removeRow(0)} className="px-1.5 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                      <button onClick={() => setDeleteConfirmRow(null)} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirmRow(0)} className="text-gray-300 hover:text-red-500 px-1"><Trash2 className="w-3 h-3" /></button>
                  )
                )}
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {tableContent.slice(headerRow ? 1 : 0).map((row, dataIdx) => {
            const ri = headerRow ? dataIdx + 1 : dataIdx;
            const rowBg = dataIdx % 2 === 0 ? evenRowBg : oddRowBg;
            return (
              <tr key={ri} style={{ backgroundColor: rowBg }}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2 cursor-text" style={{ border: borderStyle, color: cellTextColor }}>
                    <EditableText value={cell} onChange={(v) => updateCell(ri, ci, v)} tag="span" placeholder="Cell..." multiline={false} />
                  </td>
                ))}
                <td className="w-8" style={{ border: 'none' }}>
                  {rows > 1 && (
                    deleteConfirmRow === ri ? (
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <button onClick={() => removeRow(ri)} className="px-1.5 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                        <button onClick={() => setDeleteConfirmRow(null)} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirmRow(ri)} className="text-gray-300 hover:text-red-500 px-1"><Trash2 className="w-3 h-3" /></button>
                    )
                  )}
                </td>
              </tr>
            );
          })}
          {/* Placeholder row */}
          <tr>
            {Array.from({ length: columns }).map((_, ci) => (
              <td key={ci} className="px-4 py-2 text-sm text-gray-400 cursor-pointer hover:bg-gray-50" style={{ border: `1px dashed ${borderColor}` }} onClick={addRow}>
                {ci === 0 ? 'New row...' : ''}
              </td>
            ))}
            <td className="w-8" style={{ border: 'none' }} />
          </tr>
        </tbody>
      </table>
      <div className="flex gap-3 mt-2">
        <button onClick={addColumn} className="text-xs text-[#9F80DA] hover:text-[#8A6BC5] font-medium flex items-center gap-1"><Plus className="w-3 h-3" /> Column</button>
        {columns > 1 && <button onClick={() => removeColumn(columns - 1)} className="text-xs text-gray-400 hover:text-red-500 font-medium flex items-center gap-1"><Trash2 className="w-3 h-3" /> Last column</button>}
        <button onClick={() => setShowStylePresets(true)} className="text-xs text-[#9F80DA] hover:text-[#8A6BC5] font-medium flex items-center gap-1 ml-auto"><Palette className="w-3 h-3" /> Style</button>
      </div>
      {showStylePresets && (
        <TableStylePresetsModal
          currentPresetId={tableStyle?.id}
          onSelect={(preset) => onDataChange({ ...content, tableStyle: preset })}
          onClose={() => setShowStylePresets(false)}
        />
      )}
    </div>
  );
}
