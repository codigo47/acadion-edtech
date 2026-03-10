'use client';

import { useRef, useEffect, useCallback } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'div' | 'span';
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  multiline?: boolean;
}

export function EditableText({
  value,
  onChange,
  tag: Tag = 'div',
  className = '',
  style,
  placeholder = 'Click to edit...',
  multiline = true,
}: EditableTextProps) {
  const ref = useRef<HTMLElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastValueRef = useRef(value);
  const isMountedRef = useRef(false);

  // Set content on mount
  useEffect(() => {
    if (ref.current && !isMountedRef.current) {
      ref.current.textContent = value || '';
      lastValueRef.current = value;
      isMountedRef.current = true;
    }
  }, [value]);

  // Update content when value changes externally (not during editing)
  useEffect(() => {
    if (ref.current && isMountedRef.current && document.activeElement !== ref.current) {
      if (ref.current.textContent !== value) {
        ref.current.textContent = value || '';
        lastValueRef.current = value;
      }
    }
  }, [value]);

  const save = useCallback(() => {
    if (ref.current) {
      const text = ref.current.textContent || '';
      if (text !== lastValueRef.current) {
        lastValueRef.current = text;
        onChange(text);
      }
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(save, 2000);
  }, [save]);

  const handleBlur = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    save();
  }, [save]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!multiline && e.key === 'Enter') {
        e.preventDefault();
        (e.target as HTMLElement).blur();
      }
    },
    [multiline],
  );

  return (
    <>
      <style>{`
        [data-editable-placeholder]:empty:before {
          content: attr(data-editable-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
      <Tag
        ref={ref as React.RefObject<any>}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`outline-none focus:ring-2 focus:ring-[#9F80DA]/30 focus:rounded-sm transition-shadow ${className}`}
        style={style}
        spellCheck={false}
        data-editable-placeholder={placeholder}
      />
    </>
  );
}
