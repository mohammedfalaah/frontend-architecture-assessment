import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ComponentResolver } from '../ComponentResolver';
import { AppProvider } from '../../context/AppContext';
import type { ComponentConfig, AppConfig } from '../../types/config';

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

describe('ComponentResolver', () => {
  it('should render Text component from config', () => {
    const config: ComponentConfig = {
      type: 'Text',
      content: 'Hello World',
      props: { variant: 'body' }
    };

    render(
      <ComponentResolver config={config} />,
      { wrapper }
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should render Container with children', () => {
    const config: ComponentConfig = {
      type: 'Container',
      children: [
        {
          type: 'Text',
          content: 'Child Text'
        }
      ]
    };

    render(
      <ComponentResolver config={config} />,
      { wrapper }
    );

    expect(screen.getByText('Child Text')).toBeInTheDocument();
  });

  it('should render Button with default onClick', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    const config: ComponentConfig = {
      type: 'Button',
      content: 'Click Me',
      props: { variant: 'primary' }
    };

    render(
      <ComponentResolver config={config} />,
      { wrapper }
    );

    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
    
    button.click();
    expect(consoleSpy).toHaveBeenCalledWith('Button clicked: "Click Me"');
    
    consoleSpy.mockRestore();
  });

  it('should handle unknown component type gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const config: ComponentConfig = {
      type: 'UnknownComponent' as any,
      content: 'This should not render'
    };

    render(
      <ComponentResolver config={config} />,
      { wrapper }
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      '⚠️ Component type "UnknownComponent" not found in registry'
    );
    
    consoleSpy.mockRestore();
  });

  it('should apply custom styles with theme variables', () => {
    const config: ComponentConfig = {
      type: 'Text',
      content: 'Styled Text',
      style: {
        color: '$colors.primary',
        fontSize: '$fontSize.lg'
      }
    };

    render(
      <ComponentResolver config={config} />,
      { wrapper }
    );

    const textElement = screen.getByText('Styled Text');
    expect(textElement).toHaveStyle({
      color: '#4f46e5',
      fontSize: '1.25rem'
    });
  });
});