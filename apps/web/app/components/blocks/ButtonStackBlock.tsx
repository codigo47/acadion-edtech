'use client';

import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Mail,
  ExternalLink,
  Download,
  Play,
  Check,
  ChevronRight,
  LucideIcon,
} from 'lucide-react';
import { TextStyle } from './types';

export type ButtonStackStyle = 'cards' | 'minimal' | 'bordered' | 'gradient';

const iconMap: Record<string, LucideIcon> = {
  ArrowRight,
  BookOpen,
  Mail,
  ExternalLink,
  Download,
  Play,
  Check,
  ChevronRight,
};

export interface ButtonStackItem {
  id: string;
  text: string;
  description?: string;
  url: string;
  target?: '_blank' | '_self';
  icon?: string;
}

export interface ButtonStackBlockProps {
  items: ButtonStackItem[];
  title?: string;
  stackStyle?: ButtonStackStyle;
  accentColor?: string;
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function ButtonStackBlock({
  items,
  title,
  stackStyle = 'cards',
  accentColor = '#9F80DA',
  textStyle = {},
  dark = false,
}: ButtonStackBlockProps) {
  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return null;
    return <IconComponent className="w-5 h-5" />;
  };

  if (stackStyle === 'cards') {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        {title && (
          <h3
            className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}
            style={{ color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)') }}
          >
            {title}
          </h3>
        )}
        <div className="space-y-3">
          {items.map((item, index) => (
            <a
              key={item.id || index}
              href={item.url}
              target={item.target || '_self'}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md group ${
                dark
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {item.icon && (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  {renderIcon(item.icon)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}
                  style={{
                    fontSize: textStyle.fontSize,
                    color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)'),
                  }}
                >
                  {item.text}
                </p>
                {item.description && (
                  <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                )}
              </div>
              <ChevronRight
                className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${
                  dark ? 'text-gray-500' : 'text-gray-400'
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (stackStyle === 'minimal') {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        {title && (
          <h3
            className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}
            style={{ color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)') }}
          >
            {title}
          </h3>
        )}
        <div className="space-y-2">
          {items.map((item, index) => (
            <a
              key={item.id || index}
              href={item.url}
              target={item.target || '_self'}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-3 py-2 transition-colors group ${
                dark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {item.icon ? (
                <span style={{ color: accentColor }}>{renderIcon(item.icon)}</span>
              ) : (
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  style={{ color: accentColor }}
                />
              )}
              <span
                className="font-medium"
                style={{
                  fontSize: textStyle.fontSize,
                  color: textStyle.color || 'var(--block-text-color, inherit)',
                }}
              >
                {item.text}
              </span>
              {item.description && (
                <span className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                  — {item.description}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (stackStyle === 'bordered') {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        {title && (
          <h3
            className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}
            style={{ color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)') }}
          >
            {title}
          </h3>
        )}
        <div className="space-y-2">
          {items.map((item, index) => (
            <a
              key={item.id || index}
              href={item.url}
              target={item.target || '_self'}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all group ${
                dark ? 'border-gray-700 hover:border-primary' : 'border-gray-200 hover:border-primary'
              }`}
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: accentColor,
              }}
            >
              {item.icon && (
                <span style={{ color: accentColor }}>{renderIcon(item.icon)}</span>
              )}
              <div className="flex-1">
                <p
                  className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}
                  style={{
                    fontSize: textStyle.fontSize,
                    color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)'),
                  }}
                >
                  {item.text}
                </p>
                {item.description && (
                  <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                )}
              </div>
              <ExternalLink
                className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                  dark ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    );
  }

  if (stackStyle === 'gradient') {
    return (
      <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
        {title && (
          <h3
            className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}
            style={{ color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)') }}
          >
            {title}
          </h3>
        )}
        <div className="space-y-3">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={item.url}
              target={item.target || '_self'}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 p-4 rounded-lg transition-all hover:translate-x-1 group"
              style={{
                background: dark
                  ? `linear-gradient(90deg, ${accentColor}30 0%, transparent 100%)`
                  : `linear-gradient(90deg, ${accentColor}15 0%, transparent 100%)`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm"
                style={{ backgroundColor: accentColor }}
              >
                {item.icon ? renderIcon(item.icon) : index + 1}
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${dark ? 'text-white' : 'text-gray-900'}`}
                  style={{
                    fontSize: textStyle.fontSize,
                    color: textStyle.color || (dark ? '#ffffff' : 'var(--block-text-color, inherit)'),
                  }}
                >
                  {item.text}
                </p>
                {item.description && (
                  <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.description}
                  </p>
                )}
              </div>
              <ArrowRight
                className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 ${
                  dark ? 'text-gray-400' : 'text-gray-500'
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
