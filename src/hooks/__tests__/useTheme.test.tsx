import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTheme } from '../useTheme';
import { AppProvider } from '../../context/AppContext';
import type { AppConfig } from '../../types/config';

// Mock config for testing
const mockConfig: AppConfig = {
  theme: {
    colors: {
      primary: '#4f46e5',
      secondary: '#6b7280',
      background: '#ffffff',
      surface: '#f9fafb',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      accent: '#059669'
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    },
    typography: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: {
        sm: '0.875rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.875rem'
      }
    }
  },
  navigation: { items: [] },
  pages: []
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider config={mockConfig}>{children}</AppProvider>
);

describe('useTheme', () => {
  it('should return theme object', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    expect(result.current.theme).toBeDefined();
    expect(result.current.theme.colors.primary).toBe('#4f46e5');
  });

  it('should get color by key', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    const primaryColor = result.current.getColor('primary');
    expect(primaryColor).toBe('#4f46e5');
    
    const backgroundColor = result.current.getColor('background');
    expect(backgroundColor).toBe('#ffffff');
  });

  it('should get spacing by key', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    const smallSpacing = result.current.getSpacing('sm');
    expect(smallSpacing).toBe('1rem');
    
    const largeSpacing = result.current.getSpacing('lg');
    expect(largeSpacing).toBe('2rem');
  });

  it('should get font size by key', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    const mediumFont = result.current.getFontSize('md');
    expect(mediumFont).toBe('1rem');
    
    const largeFont = result.current.getFontSize('lg');
    expect(largeFont).toBe('1.25rem');
  });

  it('should create styles with theme variables', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    const styleConfig = {
      color: '$colors.primary',
      margin: '$spacing.md',
      fontSize: '$fontSize.lg'
    };
    
    const styles = result.current.createStyles(styleConfig);
    
    expect(styles.color).toBe('#4f46e5');
    expect(styles.margin).toBe('1.5rem');
    expect(styles.fontSize).toBe('1.25rem');
  });

  it('should handle non-theme variables in createStyles', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    
    const styleConfig = {
      color: '$colors.primary',
      textAlign: 'center',
      fontWeight: 'bold'
    };
    
    const styles = result.current.createStyles(styleConfig);
    
    expect(styles.color).toBe('#4f46e5');
    expect(styles.textAlign).toBe('center');
    expect(styles.fontWeight).toBe('bold');
  });
});