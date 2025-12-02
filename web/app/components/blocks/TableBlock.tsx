'use client';

import React from 'react';
import { TextStyle } from './types';

export interface TableBlockProps {
  rows: number;
  columns: number;
  content: string[][];
  textStyle?: TextStyle;
  headerRow?: boolean;
}

export default function TableBlock({
  rows,
  columns,
  content,
  textStyle = {},
  headerRow = true,
}: TableBlockProps) {
  const headers = headerRow && content.length > 0 ? content[0]?.slice(0, columns) : [];
  const dataRows = content.slice(headerRow ? 1 : 0, rows);

  return (
    <div className="w-full p-4">
      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className="w-full border-collapse border border-gray-300"
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight,
            color: textStyle.color,
            fontStyle: textStyle.fontStyle,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight,
          }}
        >
          {headerRow && content.length > 0 && (
            <thead>
              <tr className="bg-gray-100">
                {headers.map((cell, cellIndex) => (
                  <th
                    key={cellIndex}
                    className="border border-gray-300 px-4 py-2 font-semibold text-left"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.slice(0, columns).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 px-4 py-2"
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
            className="border border-gray-300 rounded-lg overflow-hidden"
            style={{
              fontSize: textStyle.fontSize,
              color: textStyle.color,
              lineHeight: textStyle.lineHeight,
            }}
          >
            {row.slice(0, columns).map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`px-4 py-3 ${cellIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                {headerRow && headers[cellIndex] && (
                  <span className="font-semibold text-gray-600 text-sm block mb-1">
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
