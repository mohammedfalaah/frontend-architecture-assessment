import { useAppContext } from '../context/AppContext';
import type { CSSProperties } from 'react';

export const useTheme = () => {
  const { theme } = useAppContext();

  const getColor = (colorKey: keyof typeof theme.colors): string => {
    return theme.colors[colorKey];
  };

  const getSpacing = (spacingKey: keyof typeof theme.spacing): string => {
    return theme.spacing[spacingKey];
  };

  const getFontSize = (sizeKey: keyof typeof theme.typography.fontSize): string => {
    return theme.typography.fontSize[sizeKey];
  };

  const createStyles = (styleConfig: Record<string, string>): CSSProperties => {
    const styles: CSSProperties = {};
    
    Object.entries(styleConfig).forEach(([key, value]) => {
      if (value.startsWith('$colors.')) {
        const colorKey = value.replace('$colors.', '') as keyof typeof theme.colors;
        styles[key as keyof CSSProperties] = theme.colors[colorKey] as any;
      } else if (value.startsWith('$spacing.')) {
        const spacingKey = value.replace('$spacing.', '') as keyof typeof theme.spacing;
        styles[key as keyof CSSProperties] = theme.spacing[spacingKey] as any;
      } else if (value.startsWith('$fontSize.')) {
        const sizeKey = value.replace('$fontSize.', '') as keyof typeof theme.typography.fontSize;
        styles[key as keyof CSSProperties] = theme.typography.fontSize[sizeKey] as any;
      } else {
        styles[key as keyof CSSProperties] = value as any;
      }
    });

    return styles;
  };

  return {
    theme,
    getColor,
    getSpacing,
    getFontSize,
    createStyles
  };
};