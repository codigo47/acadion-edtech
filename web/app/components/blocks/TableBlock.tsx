'use client';

import React from 'react';
import { TextStyle } from './types';

export interface TableBlockProps {
  rows: number;
  columns: number;
  content: string[][];
  textStyle?: TextStyle;
  headerRow?: boolean;
  stripedRows?: boolean;
  dark?: boolean;
}

export default function TableBlock({
  rows,
  columns,
  content,
  textStyle = {},
  headerRow = true,
  stripedRows = false,
  dark = false,
}: TableBlockProps) {
  const headers = headerRow && content.length > 0 ? content[0]?.slice(0, columns) : [];
  const dataRows = content.slice(headerRow ? 1 : 0, rows);

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className={`w-full border-collapse ${dark ? 'border-gray-700' : 'border border-gray-300'}`}
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight,
            color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
            fontStyle: textStyle.fontStyle,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight,
          }}
        >
          {headerRow && content.length > 0 && (
            <thead>
              <tr className={dark ? 'bg-gray-800' : 'bg-gray-100'}>
                {headers.map((cell, cellIndex) => (
                  <th
                    key={cellIndex}
                    className={`border px-4 py-2 font-semibold text-left ${dark ? 'border-gray-700 text-white' : 'border-gray-300'}`}
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${
                stripedRows && rowIndex % 2 === 1
                  ? (dark ? 'bg-gray-800/50' : 'bg-gray-50')
                  : ''
              } ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                {row.slice(0, columns).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border px-4 py-2 ${dark ? 'border-gray-700 text-gray-300' : 'border-gray-300'}`}
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
            className={`border rounded-lg overflow-hidden ${dark ? 'border-gray-700' : 'border-gray-300'}`}
            style={{
              fontSize: textStyle.fontSize,
              color: textStyle.color || (dark ? '#d1d5db' : 'var(--block-text-color, inherit)'),
              lineHeight: textStyle.lineHeight,
            }}
          >
            {row.slice(0, columns).map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`px-4 py-3 ${dark ? (cellIndex % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900') : (cellIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white')}`}
              >
                {headerRow && headers[cellIndex] && (
                  <span className={`font-semibold text-sm block mb-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {headers[cellIndex]}
                  </span>
                )}
                <span className={dark ? 'text-gray-300' : ''}>{cell}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
