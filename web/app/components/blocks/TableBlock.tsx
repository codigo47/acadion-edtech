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
  return (
    <div className="w-full p-4 overflow-x-auto">
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
              {content[0]?.slice(0, columns).map((cell, cellIndex) => (
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
          {content.slice(headerRow ? 1 : 0, rows).map((row, rowIndex) => (
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
  );
}
