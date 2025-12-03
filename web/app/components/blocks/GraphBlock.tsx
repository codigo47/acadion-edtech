'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TextStyle, BackgroundStyle } from './types';

export type GraphType = 'line' | 'bar' | 'pie' | 'donut';

export interface GraphDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface GraphBlockProps {
  graphType: GraphType;
  data: GraphDataPoint[];
  textStyle?: TextStyle;
  textBackgroundStyle?: BackgroundStyle;
  title?: string;
  colors?: string[];
  dark?: boolean;
}

const COLORS = ['#9F80DA', '#8A6BC5', '#B8A0E8', '#6B4FA0', '#D4C4F0', '#4A3570'];

export default function GraphBlock({
  graphType,
  data,
  textStyle = {},
  textBackgroundStyle = {},
  title,
  colors = COLORS,
  dark = false,
}: GraphBlockProps) {
  const renderChart = () => {
    switch (graphType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={colors[0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'donut':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full p-4 rounded-lg ${dark ? 'bg-gray-900' : ''}`}
      style={{
        backgroundColor: textBackgroundStyle.backgroundColor || (dark ? '#111827' : undefined),
        padding: textBackgroundStyle.padding,
        borderRadius: textBackgroundStyle.borderRadius,
      }}
    >
      {title && (
        <h3
          className={`text-xl font-semibold mb-4 text-center ${dark ? 'text-white' : ''}`}
          style={{
            fontSize: textStyle.fontSize,
            fontWeight: textStyle.fontWeight,
            color: textStyle.color || (dark ? '#ffffff' : undefined),
            fontStyle: textStyle.fontStyle,
            textAlign: textStyle.textAlign,
            lineHeight: textStyle.lineHeight,
          }}
        >
          {title}
        </h3>
      )}
      {renderChart()}
    </div>
  );
}
