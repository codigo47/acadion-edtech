import type { FormatState } from '@/app/components/FormatToolBar';

export interface BlockStyles {
  marginTop?: string;
  marginBottom?: string;
  backgroundColor?: string;
  textColor?: string;
  textAlign?: string;
  fontSize?: string | number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  borderRadius?: number;
}

const MARGIN_CSS: Record<string, string> = { none: '0', small: '0.5rem', medium: '1rem', large: '2rem' };
const FONT_SIZE_CSS: Record<string, string> = { small: '0.875rem', normal: '1rem', large: '1.125rem', xlarge: '1.25rem' };

/** Legacy token → numeric px mapping */
const LEGACY_SIZE_TO_PX: Record<string, number> = { small: 14, normal: 16, large: 18, xlarge: 20 };

export function blockStylesToCss(styles?: BlockStyles): React.CSSProperties {
  if (!styles) return {};
  const css: Record<string, unknown> = {};

  if (styles.marginTop && styles.marginTop !== 'none') css.marginTop = MARGIN_CSS[styles.marginTop] || '0';
  if (styles.marginBottom && styles.marginBottom !== 'none') css.marginBottom = MARGIN_CSS[styles.marginBottom] || '0';
  if (styles.backgroundColor && styles.backgroundColor !== '#FFFFFF') css.backgroundColor = styles.backgroundColor;
  if (styles.textColor) {
    css.color = styles.textColor;
    css['--block-text-color'] = styles.textColor;
  }
  if (styles.textAlign) css.textAlign = styles.textAlign;

  // fontSize: numeric (px) or legacy string token
  if (styles.fontSize != null) {
    if (typeof styles.fontSize === 'number') {
      css.fontSize = `${styles.fontSize}px`;
      css['--block-font-size'] = `${styles.fontSize}px`;
    } else if (styles.fontSize !== 'normal') {
      css.fontSize = FONT_SIZE_CSS[styles.fontSize];
      css['--block-font-size'] = FONT_SIZE_CSS[styles.fontSize];
    }
  }

  if (styles.bold) css.fontWeight = 'bold';
  if (styles.italic) css.fontStyle = 'italic';

  const decorations: string[] = [];
  if (styles.underline) decorations.push('underline');
  if (styles.strikethrough) decorations.push('line-through');
  if (decorations.length) css.textDecoration = decorations.join(' ');

  if (styles.borderRadius) css.borderRadius = `${styles.borderRadius}px`;

  return css as React.CSSProperties;
}

/** Convert BlockStyles → FormatState for FormatToolBar */
export function blockStylesToFormat(bs: BlockStyles): FormatState {
  let fontSize: number | undefined;
  if (bs.fontSize != null) {
    if (typeof bs.fontSize === 'number') {
      fontSize = bs.fontSize;
    } else {
      fontSize = LEGACY_SIZE_TO_PX[bs.fontSize] ?? 16;
    }
  }

  return {
    bold: bs.bold,
    italic: bs.italic,
    underline: bs.underline,
    strikethrough: bs.strikethrough,
    textColor: bs.textColor,
    bgColor: bs.backgroundColor,
    hAlign: bs.textAlign as FormatState['hAlign'],
    marginTop: bs.marginTop as FormatState['marginTop'],
    marginBottom: bs.marginBottom as FormatState['marginBottom'],
    fontSize,
    borderRadius: bs.borderRadius,
  };
}

/** Convert FormatState → BlockStyles for persistence */
export function formatToBlockStyles(fs: FormatState): BlockStyles {
  return {
    bold: fs.bold,
    italic: fs.italic,
    underline: fs.underline,
    strikethrough: fs.strikethrough,
    textColor: fs.textColor,
    backgroundColor: fs.bgColor,
    textAlign: fs.hAlign,
    marginTop: fs.marginTop,
    marginBottom: fs.marginBottom,
    fontSize: fs.fontSize,
    borderRadius: fs.borderRadius,
  };
}
