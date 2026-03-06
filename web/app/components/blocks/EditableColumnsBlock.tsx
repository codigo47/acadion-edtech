'use client';

import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableColumnsBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const colCount = (content.columns as number) || 2;
  // Migration: if content.content is a string (old format), split into array
  const columnContent: string[] = Array.isArray(content.columnContent)
    ? (content.columnContent as string[])
    : typeof content.content === 'string'
      ? Array.from({ length: colCount }, (_, i) => i === 0 ? (content.content as string) : '')
      : Array.from({ length: colCount }, () => '');

  // Ensure array length matches column count
  const normalizedContent = Array.from({ length: colCount }, (_, i) => columnContent[i] || '');

  const updateColumn = (idx: number, value: string) => {
    const n = [...normalizedContent];
    n[idx] = value;
    onDataChange({ ...content, columnContent: n, content: n.join('\n\n') });
  };

  const changeColumnCount = (n: number) => {
    const newContent = Array.from({ length: n }, (_, i) => normalizedContent[i] || '');
    onDataChange({ ...content, columns: n, columnContent: newContent, content: newContent.join('\n\n') });
  };

  const gridClass = colCount === 1 ? 'grid-cols-1' : colCount === 2 ? 'grid-cols-1 sm:grid-cols-2' : colCount === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <div className="w-full p-4 rounded-lg space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Columns:</span>
        {[1, 2, 3, 4].map(n => (
          <button key={n} onClick={() => changeColumnCount(n)} className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${colCount === n ? 'bg-[#9F80DA] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{n}</button>
        ))}
      </div>
      <div className={`grid ${gridClass} gap-6`}>
        {normalizedContent.map((col, idx) => (
          <div key={idx} className="cursor-text min-h-[4em]">
            <EditableText value={col} onChange={(v) => updateColumn(idx, v)} tag="div" className="text-sm text-gray-900 leading-relaxed" style={{ lineHeight: '1.6', color: 'var(--block-text-color, inherit)' }} placeholder={`Column ${idx + 1}...`} />
          </div>
        ))}
      </div>
    </div>
  );
}
