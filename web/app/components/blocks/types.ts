export interface TextStyle {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  fontStyle?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
}

export interface BackgroundStyle {
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
}

export type BlockStyle = 'A' | 'B' | 'C';
