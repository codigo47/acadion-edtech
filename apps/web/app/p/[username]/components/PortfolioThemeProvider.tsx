'use client';

import { useEffect } from 'react';
import { getThemeByKey } from '../../../../lib/portfolio-themes';

export default function PortfolioThemeProvider({
  themeKey,
  children,
}: {
  themeKey: string;
  children: React.ReactNode;
}) {
  const theme = getThemeByKey(themeKey);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--portfolio-primary', theme.colors[0]);
    root.style.setProperty('--portfolio-secondary', theme.colors[1]);
    root.style.setProperty('--portfolio-accent', theme.colors[2]);
    root.style.setProperty('--portfolio-bg', theme.neutral.white);
    root.style.setProperty('--portfolio-text', theme.neutral.black);
    root.style.setProperty('--portfolio-gray', theme.neutral.gray);

    return () => {
      root.style.removeProperty('--portfolio-primary');
      root.style.removeProperty('--portfolio-secondary');
      root.style.removeProperty('--portfolio-accent');
      root.style.removeProperty('--portfolio-bg');
      root.style.removeProperty('--portfolio-text');
      root.style.removeProperty('--portfolio-gray');
    };
  }, [theme]);

  return <>{children}</>;
}
