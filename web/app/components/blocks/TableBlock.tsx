'use client';

import React from 'react';
import { TextStyle } from './types';

interface TablePreset {
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

export interface TableBlockProps {
  rows: number;
  columns: number;
  content: string[][];
  textStyle?: TextStyle;
  headerRow?: boolean;
  stripedRows?: boolean;
  dark?: boolean;
  tableStyle?: TablePreset;
}

export default function TableBlock({
  rows,
  columns,
  content,
  textStyle = {},
  headerRow = true,
  stripedRows = false,
  dark = false,
  tableStyle,
}: TableBlockProps) {
  const headers = headerRow && content.length > 0 ? content[0]?.slice(0, columns) : [];
  const dataRows = content.slice(headerRow ? 1 : 0, rows);

  // Derive styles from preset or defaults
  const ts = tableStyle;
  const headerBg = ts?.headerBg || (dark ? '#1f2937' : '#F3F4F6');
  const headerTextColor = ts?.headerTextColor || (dark ? '#ffffff' : undefined);
  const evenRowBg = ts?.evenRowBg || (dark ? undefined : undefined);
  const oddRowBg = ts?.oddRowBg || (stripedRows ? (dark ? 'rgba(31,41,55,0.5)' : '#F9FAFB') : undefined);
  const cellTextColor = ts?.cellTextColor || textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)');
  const borderColor = ts?.borderColor || (dark ? '#374151' : '#D1D5DB');
  const borderWidth = ts?.borderWidth ?? 1;
  const fontSize = ts?.fontSize || textStyle.fontSize;
  const borderStyle = borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none';

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className="w-full border-collapse"
          style={{
            fontSize,
            fontWeight: textStyle.fontWeight,
            color: cellTextColor,
            fontStyle: textStyle.fontStyle,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight,
            border: borderStyle,
          }}
        >
          {headerRow && content.length > 0 && (
            <thead>
              <tr style={{ backgroundColor: headerBg }}>
                {headers.map((cell, cellIndex) => (
                  <th
                    key={cellIndex}
                    className="px-4 py-2 font-semibold text-left"
                    style={{ border: borderStyle, color: headerTextColor }}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? evenRowBg : oddRowBg,
                }}
              >
                {row.slice(0, columns).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-4 py-2"
                    style={{ border: borderStyle, color: cellTextColor }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {dataRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="rounded-lg overflow-hidden"
            style={{
              fontSize,
              color: cellTextColor,
              lineHeight: textStyle.lineHeight,
              border: borderStyle,
            }}
          >
            {row.slice(0, columns).map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className="px-4 py-3"
                style={{
                  backgroundColor: cellIndex % 2 === 0 ? evenRowBg : oddRowBg,
                }}
              >
                {headerRow && headers[cellIndex] && (
                  <span className="font-semibold text-sm block mb-1" style={{ color: headerTextColor || (dark ? '#9ca3af' : '#4B5563') }}>
                    {headers[cellIndex]}
                  </span>
                )}
                <span>{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
