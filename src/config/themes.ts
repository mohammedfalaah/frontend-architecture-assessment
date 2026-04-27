import type { ThemeConfig } from '../types/config';

export const lightTheme: ThemeConfig = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    accent: '#10b981'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem'
    }
  }
};

export const darkTheme: ThemeConfig = {
  colors: {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    accent: '#34d399'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem'
    }
  }
};