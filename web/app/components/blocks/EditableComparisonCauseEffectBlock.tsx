'use client';

import { useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableComparisonCauseEffectBlock({
  content,
  onDataChange,
}: {
  content: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}) {
  const updateField = useCallback(
    (field: string, value: string) => {
      onDataChange({ ...content, [field]: value });
    },
    [content, onDataChange],
  );

  return (
    <div className="w-full p-6 rounded-lg border border-gray-200 bg-white">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Cause and Effect</h3>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Cause */}
        <div className="flex-1 p-4 rounded-lg bg-gray-100 cursor-text">
          <EditableText
            value={String(content.cause || '')}
            onChange={(v) => updateField('cause', v)}
            tag="p"
            className="text-sm"
            style={{ lineHeight: '1.5', color: 'var(--block-text-color, #374151)' }}
            placeholder="Enter cause..."
          />
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 self-center">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white rotate-90 sm:rotate-0" />
          </div>
        </div>

        {/* Effect */}
        <div className="flex-1 p-4 rounded-lg bg-orange-500 cursor-text">
          <EditableText
            value={String(content.effect || '')}
            onChange={(v) => updateField('effect', v)}
            tag="p"
            className="text-sm text-white"
            style={{ lineHeight: '1.5', color: '#ffffff' }}
            placeholder="Enter effect..."
          />
        </div>
      </div>
    </div>
  );
}
