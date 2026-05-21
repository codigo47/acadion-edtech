'use client';

import { useState } from 'react';
import { Check, Circle, ArrowRight, ChevronRight, Star } from 'lucide-react';
import { CourseComponent } from '@/app/project/[courseKey]/_components/CourseComponent';
import type { UnitComponent } from '@/app/project/[courseKey]/_components/types';

export function isListBlock(name: string): boolean {
  return ['ListBlock', 'CheckboxBlock'].includes(name);
}

export function EditableListBlock({
  component,
  componentName,
  content,
  onDataChange,
}: {
  component: UnitComponent;
  componentName: string;
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const [newItemText, setNewItemText] = useState('');
  const rawItems = (content.items as unknown[]) || [];
  const isCheckbox = componentName === 'CheckboxBlock';
  const listStyle = (content.listStyle as string) || 'default';
  const accentColor = (content.accentColor as string) || '#9F80DA';

  const addItem = () => {
    const text = newItemText.trim();
    if (!text) return;
    if (isCheckbox) {
      onDataChange({
        ...content,
        items: [...rawItems, { id: `cb-${Date.now()}`, text, checked: false }],
      });
    } else {
      onDataChange({ ...content, items: [...rawItems, text] });
    }
    setNewItemText('');
  };

  const renderBullet = () => {
    if (isCheckbox) {
      return (
        <div className="w-6 h-6 flex items-center justify-center border-2 border-gray-300 rounded flex-shrink-0" />
      );
    }
    switch (listStyle) {
      case 'check':
        return <Check className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />;
      case 'circle':
        return <Circle className="w-3 h-3 fill-current flex-shrink-0" style={{ color: accentColor }} />;
      case 'arrow':
        return <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: accentColor }} />;
      case 'chevron':
        return <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />;
      case 'star':
        return <Star className="w-4 h-4 fill-current flex-shrink-0" style={{ color: accentColor }} />;
      case 'numbered':
        return (
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {rawItems.length + 1}
          </span>
        );
      default:
        return (
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-800" />
        );
    }
  };

  return (
    <div>
      <CourseComponent key={`${componentName}-${rawItems.length}`} component={component} />
      <div className="px-4 pb-4 -mt-1">
        <div className="flex items-center gap-3">
          {renderBullet()}
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addItem();
              }
            }}
            onBlur={addItem}
            className="flex-1 py-1 text-base text-gray-400 bg-transparent border-none focus:outline-none placeholder-gray-400"
            placeholder="Add a new item..."
          />
        </div>
      </div>
    </div>
  );
}
