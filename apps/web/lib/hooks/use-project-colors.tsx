'use client';

import { createContext, useContext, useMemo } from 'react';

const ProjectUsedColorsContext = createContext<string[]>([]);

export const ProjectUsedColorsProvider = ProjectUsedColorsContext.Provider;

export function useProjectUsedColors(): string[] {
  return useContext(ProjectUsedColorsContext);
}

interface ComponentData {
  data?: Record<string, unknown>;
  content?: Record<string, unknown>;
}

/**
 * Extracts all user-chosen colors from project components.
 * Covers: blockStyles (textColor, backgroundColor), bubbleBg,
 * table cellStyles, and tableStyle header/cell colors.
 */
export function extractUsedColors(components: ComponentData[]): string[] {
  const colors = new Set<string>();

  for (const comp of components) {
    const c = comp.data || comp.content;
    if (!c) continue;

    // Block-level styles
    const bs = c.blockStyles as { textColor?: string; backgroundColor?: string } | undefined;
    if (bs?.textColor) colors.add(bs.textColor.toUpperCase());
    if (bs?.backgroundColor) colors.add(bs.backgroundColor.toUpperCase());

    // Scenario bubble
    if (typeof c.bubbleBg === 'string' && c.bubbleBg) {
      colors.add(c.bubbleBg.toUpperCase());
    }

    // Table cell styles
    if (c.cellStyles && typeof c.cellStyles === 'object') {
      const cs = c.cellStyles as Record<string, { bg?: string; color?: string }>;
      for (const style of Object.values(cs)) {
        if (style?.bg) colors.add(style.bg.toUpperCase());
        if (style?.color) colors.add(style.color.toUpperCase());
      }
    }

    // Table preset colors
    if (c.tableStyle && typeof c.tableStyle === 'object') {
      const ts = c.tableStyle as Record<string, string>;
      for (const key of ['headerBg', 'headerTextColor', 'cellTextColor', 'borderColor', 'evenRowBg', 'oddRowBg']) {
        if (ts[key]) colors.add(ts[key].toUpperCase());
      }
    }
  }

  // Remove common defaults that aren't interesting
  colors.delete('#FFFFFF');
  colors.delete('#000000');
  colors.delete('#F3F4F6');
  colors.delete('#D1D5DB');

  return Array.from(colors);
}

/**
 * Hook to compute used colors from components array. Memoized.
 */
export function useComputeProjectColors(components: ComponentData[]): string[] {
  return useMemo(() => extractUsedColors(components), [components]);
}
