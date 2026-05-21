'use client';

import { TwoListColumnEditor, type TwoListConfig } from './editable-helpers';

export function isComparisonTwoList(name: string): boolean {
  return ['ComparisonProsConsBlock', 'ComparisonDosDontsBlock', 'ComparisonBeforeAfterBlock'].includes(name);
}

export function EditableTwoListBlock({ content, onDataChange, config }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void; config: TwoListConfig }) {
  const leftItems = (content[config.left.field] as string[]) || [];
  const rightItems = (content[config.right.field] as string[]) || [];

  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TwoListColumnEditor items={leftItems} colConfig={config.left} content={content} onDataChange={onDataChange} variant={config.variant} />
        <TwoListColumnEditor items={rightItems} colConfig={config.right} content={content} onDataChange={onDataChange} variant={config.variant} />
      </div>
    </div>
  );
}
