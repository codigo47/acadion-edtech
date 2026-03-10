'use client';

import React from 'react';
import { ArrowRight, BookOpen, Mail, ExternalLink, Download, Play, Check, LucideIcon } from 'lucide-react';
import { TextStyle } from './types';

export type ButtonStyle = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonTarget = '_blank' | '_self';
export type IconPosition = 'left' | 'right';
export type IconSize = 'small' | 'medium' | 'large';
export type ButtonLayout = 'button-left' | 'button-right' | 'button-center';

const iconMap: Record<string, LucideIcon> = {
  ArrowRight,
  BookOpen,
  Mail,
  ExternalLink,
  Download,
  Play,
  Check,
};

export interface ButtonItem {
  id: string;
  text: string;
  url: string;
  style?: ButtonStyle;
  size?: ButtonSize;
  target?: ButtonTarget;
  rel?: string;
  icon?: string;
  iconPosition?: IconPosition;
  iconSize?: IconSize;
  label?: string;
  layout?: ButtonLayout;
}

export interface ButtonBlockProps {
  items: ButtonItem[];
  textStyle?: TextStyle;
  dark?: boolean;
}

export default function ButtonBlock({
  items,
  textStyle = {},
  dark = false,
}: ButtonBlockProps) {
  const getButtonClasses = (style: ButtonStyle = 'primary', size: ButtonSize = 'medium') => {
    const styleClasses = {
      primary: 'bg-primary text-white hover:bg-primary-dark',
      secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary/10',
      tertiary: 'bg-transparent text-primary hover:underline',
    }[style];

    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-5 py-2.5 text-base',
      large: 'px-7 py-3.5 text-lg',
    }[size];

    return `${styleClasses} ${sizeClasses} rounded-lg font-medium transition-all inline-flex items-center gap-2`;
  };

  const getIconSize = (size: IconSize = 'medium') => {
    return {
      small: 'w-4 h-4',
      medium: 'w-5 h-5',
      large: 'w-6 h-6',
    }[size];
  };

  const renderIcon = (iconName: string, size: IconSize = 'medium') => {
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return null;
    return <IconComponent className={getIconSize(size)} />;
  };

  const getLayoutClasses = (layout: ButtonLayout = 'button-center') => {
    return {
      'button-left': 'flex-row',
      'button-right': 'flex-row-reverse',
      'button-center': 'flex-col items-center',
    }[layout];
  };

  return (
    <div className={`w-full p-4 ${dark ? 'bg-gray-900' : ''}`}>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 ${getLayoutClasses(item.layout)}`}
          >
            {item.label && (
              <span
                className={dark ? 'text-gray-400' : 'text-gray-600'}
                style={{
                  fontSize: textStyle.fontSize,
                  color: textStyle.color || (dark ? '#9ca3af' : 'var(--block-text-color, inherit)'),
                }}
              >
                {item.label}
              </span>
            )}
            <a
              href={item.url}
              target={item.target || '_self'}
              rel={item.rel || (item.target === '_blank' ? 'noopener noreferrer' : undefined)}
              className={getButtonClasses(item.style, item.size)}
            >
              {item.icon && item.iconPosition === 'left' && renderIcon(item.icon, item.iconSize)}
              <span>{item.text}</span>
              {item.icon && item.iconPosition !== 'left' && renderIcon(item.icon, item.iconSize)}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
