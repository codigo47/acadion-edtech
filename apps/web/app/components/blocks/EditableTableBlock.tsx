'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash2, AlignLeft, AlignCenter, AlignRight, AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd, X } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';
import { type TablePreset } from './TableStylePresetsModal';
import { ColorPicker } from '@/app/components/ColorPicker';

interface CellStyle {
  bg?: string;
  color?: string;
  fontSize?: string;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

const CELL_FONT_SIZES = [
  { label: 'S', value: '12px' },
  { label: 'M', value: '14px' },
  { label: 'L', value: '16px' },
  { label: 'XL', value: '18px' },
] as const;

export function EditableTableBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const rows = (content.rows as number) || 2;
  const columns = (content.columns as number) || 2;
  const headerRow = content.headerRow !== false;
  const stripedRows = (content.stripedRows as boolean) || false;
  const tableContent = (content.content as string[][]) || Array.from({ length: rows }, () => Array(columns).fill(''));
  const tableStyle = content.tableStyle as TablePreset | undefined;
  const cellStyles = (content.cellStyles as Record<string, CellStyle>) || {};
  const [deleteConfirmRow, setDeleteConfirmRow] = useState<number | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [showCellBgPicker, setShowCellBgPicker] = useState(false);
  const [showCellTextPicker, setShowCellTextPicker] = useState(false);
  const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateCell = (r: number, c: number, value: string) => {
    const n = tableContent.map((row, ri) => ri === r ? row.map((cell, ci) => ci === c ? value : cell) : [...row]);
    onDataChange({ ...content, content: n });
  };

  const addRow = () => { onDataChange({ ...content, content: [...tableContent, Array(columns).fill('')], rows: rows + 1 }); };
  const addColumn = () => { onDataChange({ ...content, content: tableContent.map(row => [...row, '']), columns: columns + 1 }); };
  const removeRow = (r: number) => {
    if (rows <= 1) return;
    const newCellStyles: Record<string, CellStyle> = {};
    Object.entries(cellStyles).forEach(([key, style]) => {
      const [rowStr, colStr] = key.split('-');
      const row = parseInt(rowStr);
      const col = parseInt(colStr);
      if (row < r) newCellStyles[key] = style;
      else if (row > r) newCellStyles[`${row - 1}-${col}`] = style;
    });
    onDataChange({ ...content, content: tableContent.filter((_, i) => i !== r), rows: rows - 1, cellStyles: newCellStyles });
    setDeleteConfirmRow(null);
    setSelectedCell(null);
  };
  const removeColumn = (c: number) => {
    if (columns <= 1) return;
    const newCellStyles: Record<string, CellStyle> = {};
    Object.entries(cellStyles).forEach(([key, style]) => {
      const [rowStr, colStr] = key.split('-');
      const row = parseInt(rowStr);
      const col = parseInt(colStr);
      if (col < c) newCellStyles[key] = style;
      else if (col > c) newCellStyles[`${row}-${col - 1}`] = style;
    });
    onDataChange({ ...content, content: tableContent.map(row => row.filter((_, i) => i !== c)), columns: columns - 1, cellStyles: newCellStyles });
    setSelectedCell(null);
  };

  const updateCellStyle = useCallback((r: number, c: number, partial: Partial<CellStyle>) => {
    const key = `${r}-${c}`;
    const existing = cellStyles[key] || {};
    const updated = { ...existing, ...partial };
    if (!updated.bg) delete updated.bg;
    if (!updated.color) delete updated.color;
    if (!updated.fontSize) delete updated.fontSize;
    if (!updated.textAlign) delete updated.textAlign;
    if (!updated.verticalAlign) delete updated.verticalAlign;
    const newCellStyles = { ...cellStyles };
    if (Object.keys(updated).length > 0) {
      newCellStyles[key] = updated;
    } else {
      delete newCellStyles[key];
    }
    onDataChange({ ...content, cellStyles: newCellStyles });
  }, [cellStyles, content, onDataChange]);

  // Position toolbar near selected cell — using viewport coords for portal
  useEffect(() => {
    if (!selectedCell || !containerRef.current) {
      setToolbarPos(null);
      return;
    }
    const cellEl = containerRef.current.querySelector(`[data-cell="${selectedCell.r}-${selectedCell.c}"]`) as HTMLElement | null;
    if (!cellEl) { setToolbarPos(null); return; }
    const cellRect = cellEl.getBoundingClientRect();
    setToolbarPos({
      top: cellRect.top - 36,
      left: cellRect.left,
    });
  }, [selectedCell]);

  // Reposition toolbar on scroll
  useEffect(() => {
    if (!selectedCell) return;
    const reposition = () => {
      if (!containerRef.current) return;
      const cellEl = containerRef.current.querySelector(`[data-cell="${selectedCell.r}-${selectedCell.c}"]`) as HTMLElement | null;
      if (!cellEl) return;
      const cellRect = cellEl.getBoundingClientRect();
      setToolbarPos({ top: cellRect.top - 36, left: cellRect.left });
    };
    window.addEventListener('scroll', reposition, true);
    return () => window.removeEventListener('scroll', reposition, true);
  }, [selectedCell]);

  // Close cell selection on click outside
  useEffect(() => {
    if (!selectedCell) return;
    const handle = (e: MouseEvent) => {
      const target = e.target as Node;
      if (tableRef.current && !tableRef.current.contains(target) && toolbarRef.current && !toolbarRef.current.contains(target)) {
        setSelectedCell(null);
        setShowCellBgPicker(false);
        setShowCellTextPicker(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [selectedCell]);

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

  const getCellStyle = (r: number, c: number): CellStyle => cellStyles[`${r}-${c}`] || {};

  // Render toolbar via portal so it escapes overflow-x-auto
  const toolbar = selectedCell && toolbarPos ? createPortal(
    <div
      ref={toolbarRef}
      className="fixed flex items-center gap-0.5 px-1.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg"
      style={{ top: Math.max(0, toolbarPos.top), left: Math.max(0, toolbarPos.left), zIndex: 9999 }}
    >
      {/* Cell background color */}
      <div className="relative">
        <button
          onClick={() => { setShowCellBgPicker(!showCellBgPicker); setShowCellTextPicker(false); }}
          title="Cell background"
          className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <div className="w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: getCellStyle(selectedCell.r, selectedCell.c).bg || 'transparent' }} />
        </button>
        {showCellBgPicker && (
          <ColorPicker
            selectedColor={getCellStyle(selectedCell.r, selectedCell.c).bg}
            onSelect={(color) => { updateCellStyle(selectedCell.r, selectedCell.c, { bg: color }); setShowCellBgPicker(false); }}
            onClose={() => setShowCellBgPicker(false)}
            position="bottom"
          />
        )}
      </div>
      {/* Cell text color */}
      <div className="relative">
        <button
          onClick={() => { setShowCellTextPicker(!showCellTextPicker); setShowCellBgPicker(false); }}
          title="Cell text color"
          className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: getCellStyle(selectedCell.r, selectedCell.c).color || '#000' }} />
        </button>
        {showCellTextPicker && (
          <ColorPicker
            selectedColor={getCellStyle(selectedCell.r, selectedCell.c).color}
            onSelect={(color) => { updateCellStyle(selectedCell.r, selectedCell.c, { color }); setShowCellTextPicker(false); }}
            onClose={() => setShowCellTextPicker(false)}
            position="bottom"
          />
        )}
      </div>
      <div className="w-px h-4 bg-gray-200 mx-0.5" />
      {/* Font size */}
      {CELL_FONT_SIZES.map(fs => {
        const isActive = getCellStyle(selectedCell.r, selectedCell.c).fontSize === fs.value;
        return (
          <button
            key={fs.value}
            onClick={() => updateCellStyle(selectedCell.r, selectedCell.c, { fontSize: isActive ? undefined : fs.value })}
            title={`Font size ${fs.label}`}
            className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-semibold transition-colors ${isActive ? 'bg-[#9F80DA]/15 text-[#9F80DA]' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            {fs.label}
          </button>
        );
      })}
      <div className="w-px h-4 bg-gray-200 mx-0.5" />
      {/* Horizontal alignment */}
      {([
        { align: 'left' as const, Icon: AlignLeft },
        { align: 'center' as const, Icon: AlignCenter },
        { align: 'right' as const, Icon: AlignRight },
      ]).map(({ align, Icon }) => {
        const isActive = (getCellStyle(selectedCell.r, selectedCell.c).textAlign || 'left') === align;
        return (
          <button
            key={align}
            onClick={() => updateCellStyle(selectedCell.r, selectedCell.c, { textAlign: align })}
            title={`Align ${align}`}
            className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isActive ? 'bg-[#9F80DA]/15 text-[#9F80DA]' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            <Icon className="w-3 h-3" />
          </button>
        );
      })}
      <div className="w-px h-4 bg-gray-200 mx-0.5" />
      {/* Vertical alignment */}
      {([
        { align: 'top' as const, Icon: AlignVerticalJustifyStart, label: 'Top' },
        { align: 'middle' as const, Icon: AlignVerticalJustifyCenter, label: 'Middle' },
        { align: 'bottom' as const, Icon: AlignVerticalJustifyEnd, label: 'Bottom' },
      ]).map(({ align, Icon, label }) => {
        const isActive = (getCellStyle(selectedCell.r, selectedCell.c).verticalAlign || 'top') === align;
        return (
          <button
            key={align}
            onClick={() => updateCellStyle(selectedCell.r, selectedCell.c, { verticalAlign: align })}
            title={`Vertical align ${label}`}
            className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${isActive ? 'bg-[#9F80DA]/15 text-[#9F80DA]' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            <Icon className="w-3 h-3" />
          </button>
        );
      })}
      <div className="w-px h-4 bg-gray-200 mx-0.5" />
      {/* Clear */}
      {Object.keys(getCellStyle(selectedCell.r, selectedCell.c)).length > 0 && (
        <button
          onClick={() => {
            const key = `${selectedCell.r}-${selectedCell.c}`;
            const newCellStyles = { ...cellStyles };
            delete newCellStyles[key];
            onDataChange({ ...content, cellStyles: newCellStyles });
          }}
          title="Clear cell styles"
          className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>,
    document.body,
  ) : null;

  return (
    <div ref={containerRef} className="w-full p-4 rounded-lg overflow-x-auto relative">
      {toolbar}
      <table ref={tableRef} className="w-full border-collapse" style={{ color: cellTextColor || 'var(--block-text-color, inherit)', fontSize, border: borderStyle }}>
        {headerRow && tableContent.length > 0 && (
          <thead>
            <tr>
              {tableContent[0].map((cell, ci) => {
                const cs = getCellStyle(0, ci);
                const isSelected = selectedCell?.r === 0 && selectedCell?.c === ci;
                return (
                  <th
                    key={ci}
                    data-cell={`0-${ci}`}
                    onClick={() => { setSelectedCell({ r: 0, c: ci }); setShowCellBgPicker(false); setShowCellTextPicker(false); }}
                    className={`px-4 py-2 font-semibold text-left cursor-text transition-shadow ${isSelected ? 'ring-2 ring-[#9F80DA] ring-inset' : ''}`}
                    style={{ border: borderStyle, backgroundColor: cs.bg || headerBg, color: cs.color || headerTextColor, fontSize: cs.fontSize, textAlign: cs.textAlign, verticalAlign: cs.verticalAlign }}
                  >
                    <EditableText value={cell} onChange={(v) => updateCell(0, ci, v)} tag="span" className="font-semibold" placeholder="Header..." multiline={false} />
                  </th>
                );
              })}
              {/* +Column header */}
              <th className="w-8 px-1 align-middle" style={{ border: 'none', background: 'none' }}>
                <button onClick={addColumn} title="Add column" className="text-gray-300 hover:text-[#9F80DA] transition-colors p-0.5">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </th>
              {/* Delete row */}
              <th className="w-8 px-1 align-middle" style={{ border: 'none', background: 'none' }}>
                {rows > 1 && (
                  deleteConfirmRow === 0 ? (
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <button onClick={() => removeRow(0)} className="px-1.5 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                      <button onClick={() => setDeleteConfirmRow(null)} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirmRow(0)} title="Delete row" className="text-gray-300 hover:text-red-500 px-1"><Trash2 className="w-3 h-3" /></button>
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
              <tr key={ri}>
                {row.map((cell, ci) => {
                  const cs = getCellStyle(ri, ci);
                  const isSelected = selectedCell?.r === ri && selectedCell?.c === ci;
                  return (
                    <td
                      key={ci}
                      data-cell={`${ri}-${ci}`}
                      onClick={() => { setSelectedCell({ r: ri, c: ci }); setShowCellBgPicker(false); setShowCellTextPicker(false); }}
                      className={`px-4 py-2 cursor-text transition-shadow ${isSelected ? 'ring-2 ring-[#9F80DA] ring-inset' : ''}`}
                      style={{ border: borderStyle, backgroundColor: cs.bg || rowBg, color: cs.color || cellTextColor, fontSize: cs.fontSize, textAlign: cs.textAlign, verticalAlign: cs.verticalAlign }}
                    >
                      <EditableText value={cell} onChange={(v) => updateCell(ri, ci, v)} tag="span" placeholder="Cell..." multiline={false} />
                    </td>
                  );
                })}
                <td className="w-8" style={{ border: 'none', background: 'none' }} />
                <td className="w-8" style={{ border: 'none', background: 'none' }}>
                  {rows > 1 && (
                    deleteConfirmRow === ri ? (
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <button onClick={() => removeRow(ri)} className="px-1.5 py-0.5 text-xs text-white bg-red-500 rounded">Yes</button>
                        <button onClick={() => setDeleteConfirmRow(null)} className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-200 rounded">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirmRow(ri)} title="Delete row" className="text-gray-300 hover:text-red-500 px-1"><Trash2 className="w-3 h-3" /></button>
                    )
                  )}
                </td>
              </tr>
            );
          })}
          {/* Add row */}
          <tr>
            {Array.from({ length: columns }).map((_, ci) => (
              <td key={ci} className="px-4 py-2 text-sm text-gray-400 cursor-pointer hover:bg-gray-50" style={{ border: `1px dashed ${borderColor}` }} onClick={addRow}>
                {ci === 0 ? 'New row...' : ''}
              </td>
            ))}
            <td className="w-8" style={{ border: 'none', background: 'none' }} />
            <td className="w-8" style={{ border: 'none', background: 'none' }} />
          </tr>
          {/* Delete column row */}
          {columns > 1 && (
            <tr>
              {Array.from({ length: columns }).map((_, ci) => (
                <td key={ci} className="text-center py-1" style={{ border: 'none', background: 'none' }}>
                  <button onClick={() => removeColumn(ci)} title={`Remove column ${ci + 1}`} className="text-gray-300 hover:text-red-500 transition-colors mx-auto inline-flex">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </td>
              ))}
              <td style={{ border: 'none', background: 'none' }} />
              <td style={{ border: 'none', background: 'none' }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
