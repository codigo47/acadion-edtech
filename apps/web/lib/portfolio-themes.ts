export interface PortfolioTheme {
  key: string;
  name: string;
  colors: [string, string, string];
  neutral: { gray: string; white: string; black: string };
}

export const PORTFOLIO_THEMES: PortfolioTheme[] = [
  {
    key: 'corporate_professional',
    name: 'Corporate Professional',
    colors: ['#1F3A5F', '#2E5EAA', '#4F8CC9'],
    neutral: { gray: '#6B7280', white: '#FFFFFF', black: '#111827' },
  },
  {
    key: 'minimal_tech',
    name: 'Minimal Tech',
    colors: ['#0F172A', '#1E293B', '#3B82F6'],
    neutral: { gray: '#64748B', white: '#F8FAFC', black: '#0F172A' },
  },
  {
    key: 'creative_modern',
    name: 'Creative Modern',
    colors: ['#7C3AED', '#EC4899', '#F59E0B'],
    neutral: { gray: '#6B7280', white: '#FFFFFF', black: '#1F2937' },
  },
  {
    key: 'elegant_dark',
    name: 'Elegant Dark',
    colors: ['#1C1C1C', '#3A3A3A', '#C6A75E'],
    neutral: { gray: '#9CA3AF', white: '#F9FAFB', black: '#0A0A0A' },
  },
  {
    key: 'vibrant_startup',
    name: 'Vibrant Startup',
    colors: ['#2563EB', '#14B8A6', '#F97316'],
    neutral: { gray: '#6B7280', white: '#FFFFFF', black: '#111827' },
  },
  {
    key: 'natural_organic',
    name: 'Natural Organic',
    colors: ['#2F5D50', '#6B8E23', '#D4A373'],
    neutral: { gray: '#78716C', white: '#FAFAF9', black: '#1C1917' },
  },
  {
    key: 'casual_creative',
    name: 'Casual Creative',
    colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
    neutral: { gray: '#6B7280', white: '#FFFFFF', black: '#1F2937' },
  },
  {
    key: 'sophisticated_premium',
    name: 'Sophisticated Premium',
    colors: ['#2B2D42', '#8D99AE', '#D4AF37'],
    neutral: { gray: '#9CA3AF', white: '#F9FAFB', black: '#111827' },
  },
  {
    key: 'futuristic_ai',
    name: 'Futuristic AI',
    colors: ['#0EA5E9', '#22D3EE', '#A78BFA'],
    neutral: { gray: '#64748B', white: '#F0F9FF', black: '#0C4A6E' },
  },
  {
    key: 'editorial_blue_white',
    name: 'Editorial Blue & White',
    colors: ['#1D4ED8', '#60A5FA', '#93C5FD'],
    neutral: { gray: '#6B7280', white: '#FFFFFF', black: '#1E3A5F' },
  },
];

export function getThemeByKey(key: string): PortfolioTheme {
  return (
    PORTFOLIO_THEMES.find((t) => t.key === key) || PORTFOLIO_THEMES[0]
  );
}
