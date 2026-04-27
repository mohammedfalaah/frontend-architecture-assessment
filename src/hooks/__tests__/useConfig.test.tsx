import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useConfig } from '../useConfig';
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
  navigation: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' }
    ]
  },
  pages: [
    {
      id: 'home',
      title: 'Home',
      path: '/',
      components: [
        {
          type: 'Text',
          content: 'Welcome'
        }
      ]
    },
    {
      id: 'about',
      title: 'About',
      path: '/about',
      components: [
        {
          type: 'Text',
          content: 'About us'
        }
      ]
    }
  ]
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider config={mockConfig}>{children}</AppProvider>
);

describe('useConfig', () => {
  it('should return config object', () => {
    const { result } = renderHook(() => useConfig(), { wrapper });
    
    expect(result.current.config).toBeDefined();
    expect(result.current.config.pages).toHaveLength(2);
  });

  it('should get page by path', () => {
    const { result } = renderHook(() => useConfig(), { wrapper });
    
    const homePage = result.current.getPageByPath('/');
    expect(homePage).toBeDefined();
    expect(homePage?.id).toBe('home');
    expect(homePage?.title).toBe('Home');
  });

  it('should get page by id', () => {
    const { result } = renderHook(() => useConfig(), { wrapper });
    
    const aboutPage = result.current.getPageById('about');
    expect(aboutPage).toBeDefined();
    expect(aboutPage?.path).toBe('/about');
    expect(aboutPage?.title).toBe('About');
  });

  it('should return undefined for non-existent page', () => {
    const { result } = renderHook(() => useConfig(), { wrapper });
    
    const nonExistentPage = result.current.getPageByPath('/non-existent');
    expect(nonExistentPage).toBeUndefined();
  });

  it('should get all pages', () => {
    const { result } = renderHook(() => useConfig(), { wrapper });
    
    const allPages = result.current.getAllPages();
    expect(allPages).toHaveLength(2);
    expect(allPages[0].id).toBe('home');
    expect(allPages[1].id).toBe('about');
  });

  it('should get navigation items', () => {
    const { result } = renderHook(() => useConfig(), { wrapper });
    
    const navItems = result.current.getNavigationItems();
    expect(navItems).toHaveLength(2);
    expect(navItems[0]).toEqual({ label: 'Home', path: '/' });
    expect(navItems[1]).toEqual({ label: 'About', path: '/about' });
  });
});