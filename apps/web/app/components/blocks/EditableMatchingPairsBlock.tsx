'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { EditableText } from '@/app/project/[courseKey]/_components/EditableText';

export function EditableMatchingPairsBlock({ content, onDataChange }: { content: Record<string, unknown>; onDataChange: (data: Record<string, unknown>) => void }) {
  const itemsA = (content.itemsA as Array<{ id: string; text: string; matchingNumber: number }>) || [];
  const itemsB = (content.itemsB as Array<{ id: string; text: string; matchingNumber: number }>) || [];
  const [pendingActive, setPendingActive] = useState(false);
  const [pendingLeft, setPendingLeft] = useState('');
  const [pendingRight, setPendingRight] = useState('');
  const pendingLeftRef = useRef<HTMLInputElement>(null);
  const pendingContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (pendingActive && pendingLeftRef.current) pendingLeftRef.current.focus(); }, [pendingActive]);

  const updateA = useCallback((id: string, value: string) => {
    onDataChange({ ...content, itemsA: itemsA.map(i => i.id === id ? { ...i, text: value } : i) });
  }, [itemsA, content, onDataChange]);

  const updateB = useCallback((id: string, value: string) => {
    onDataChange({ ...content, itemsB: itemsB.map(i => i.id === id ? { ...i, text: value } : i) });
  }, [itemsB, content, onDataChange]);

  const confirmPending = () => {
    const left = pendingLeft.trim();
    const right = pendingRight.trim();
    if (left || right) {
      const num = Math.max(0, ...itemsA.map(i => i.matchingNumber), ...itemsB.map(i => i.matchingNumber)) + 1;
      const ts = Date.now();
      onDataChange({ ...content, itemsA: [...itemsA, { id: `a-${ts}`, text: left, matchingNumber: num }], itemsB: [...itemsB, { id: `b-${ts}`, text: right, matchingNumber: num }] });
    }
    setPendingActive(false);
    setPendingLeft('');
    setPendingRight('');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePendingBlur = useCallback((e: React.FocusEvent) => {
    if (pendingContainerRef.current && !pendingContainerRef.current.contains(e.relatedTarget as Node)) confirmPending();
  }, [pendingLeft, pendingRight, itemsA, itemsB, content, onDataChange]);

  const removePair = (matchNum: number) => {
    onDataChange({ ...content, itemsA: itemsA.filter(i => i.matchingNumber !== matchNum), itemsB: itemsB.filter(i => i.matchingNumber !== matchNum) });
  };

  const pairs = itemsA.map(a => ({ a, b: itemsB.find(b => b.matchingNumber === a.matchingNumber) }));

  return (
    <div className="w-full p-4 rounded-lg space-y-2">
      <div className="flex gap-4 text-sm font-medium text-gray-500 px-2">
        <span className="flex-1">Column A</span><span className="w-6" /><span className="flex-1">Column B</span><span className="w-6" />
      </div>
      {pairs.map(({ a, b }) => (
        <div key={a.id} className="flex items-center gap-4 group/pair">
          <div className="flex-1 cursor-text">
            <EditableText value={a.text} onChange={(v) => updateA(a.id, v)} tag="div" className="p-3 border-2 border-gray-200 rounded-lg text-sm hover:border-gray-300" placeholder="Left item..." multiline={false} />
          </div>
          <span className="text-gray-400 flex-shrink-0">{'\u2194'}</span>
          <div className="flex-1 cursor-text">
            {b && <EditableText value={b.text} onChange={(v) => updateB(b.id, v)} tag="div" className="p-3 border-2 border-gray-200 rounded-lg text-sm hover:border-gray-300" placeholder="Right item..." multiline={false} />}
          </div>
          <button onClick={() => removePair(a.matchingNumber)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      {/* New pair placeholder */}
      <div ref={pendingContainerRef} className="flex items-center gap-4" onBlur={pendingActive ? handlePendingBlur : undefined}>
        <div className="flex-1">
          {pendingActive ? (
            <input ref={pendingLeftRef} type="text" value={pendingLeft} onChange={(e) => setPendingLeft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Escape') { setPendingActive(false); setPendingLeft(''); setPendingRight(''); } }} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]" placeholder="Left item..." />
          ) : (
            <div onClick={() => setPendingActive(true)} className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer hover:border-[#9F80DA] transition-colors">Left item...</div>
          )}
        </div>
        <span className="text-gray-300 flex-shrink-0">{'\u2194'}</span>
        <div className="flex-1">
          {pendingActive ? (
            <input type="text" value={pendingRight} onChange={(e) => setPendingRight(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') confirmPending(); if (e.key === 'Escape') { setPendingActive(false); setPendingLeft(''); setPendingRight(''); } }} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:border-[#9F80DA]" placeholder="Right item..." />
          ) : (
            <div onClick={() => setPendingActive(true)} className="p-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-400 cursor-pointer hover:border-[#9F80DA] transition-colors">Right item...</div>
          )}
        </div>
        <div className="w-6" />
      </div>
    </div>
  );
}
