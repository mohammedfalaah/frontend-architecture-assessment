import type { AppConfig } from '../types/config';

// App configuration - controls the entire UI
export const appConfig: AppConfig = {
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
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
      { label: 'Products', path: '/products' },
      { label: 'Profile', path: '/profile' }
    ]
  },
  pages: [
    {
      id: 'home',
      title: 'ConfigUI - Home',
      path: '/',
      components: [
        {
          type: 'Container',
          props: { maxWidth: '1200px', padding: 'lg' },
          children: [
            {
              type: 'Text',
              props: { variant: 'heading', size: 'xl' },
              content: 'Welcome to ConfigUI',
              style: { 
                textAlign: 'center',
                marginBottom: '$spacing.md'
              }
            },
            {
              type: 'Text',
              props: { variant: 'body', size: 'lg' },
              content: 'A React application built with configuration-driven architecture. Change the entire UI by editing config files.',
              style: { 
                textAlign: 'center',
                marginBottom: '$spacing.xl',
                color: '$colors.textSecondary'
              }
            },
            {
              type: 'Card',
              props: { padding: 'lg', shadow: true },
              style: { marginBottom: '$spacing.lg' },
              children: [
                {
                  type: 'Text',
                  props: { variant: 'heading', size: 'lg' },
                  content: 'Features',
                  style: { marginBottom: '$spacing.md' }
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'Config-driven components\nDynamic routing\nTheme system\nTypeScript support\nResponsive design'
                },
                {
                  type: 'Button',
                  props: { variant: 'primary', size: 'md' },
                  content: 'Get Started',
                  style: { marginTop: '$spacing.md' }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'products',
      title: 'Products',
      path: '/products',
      components: [
        {
          type: 'Container',
          props: { padding: 'lg' },
          children: [
            {
              type: 'Text',
              props: { variant: 'heading', size: 'xl' },
              content: 'Products',
              style: { marginBottom: '$spacing.md' }
            },
            {
              type: 'Text',
              props: { variant: 'body', size: 'md' },
              content: 'Check out our developer tools and solutions.',
              style: { 
                marginBottom: '$spacing.lg',
                color: '$colors.textSecondary'
              }
            },
            {
              type: 'ProductGrid',
              props: {
                products: [
                  { 
                    id: 1, 
                    name: 'ConfigUI Framework', 
                    price: '₹2,499/mo', 
                    description: 'Complete config-driven UI framework with theming and components.' 
                  },
                  { 
                    id: 2, 
                    name: 'Design System', 
                    price: '₹1,599/mo', 
                    description: 'Professional design system with 50+ components and documentation.' 
                  },
                  { 
                    id: 3, 
                    name: 'Dev Tools', 
                    price: '₹1,299/mo', 
                    description: 'Essential development tools for linting, testing, and deployment.' 
                  },
                  {
                    id: 4,
                    name: 'Enterprise',
                    price: '₹8,299/mo',
                    description: 'Full enterprise solution with support and custom integrations.'
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 'profile',
      title: 'Profile',
      path: '/profile',
      components: [
        {
          type: 'Container',
          props: { maxWidth: '800px', padding: 'lg' },
          children: [
            {
              type: 'Text',
              props: { variant: 'heading', size: 'xl' },
              content: 'Profile',
              style: { marginBottom: '$spacing.lg' }
            },
            {
              type: 'Card',
              props: { padding: 'lg', shadow: true },
              style: { marginBottom: '$spacing.md' },
              children: [
                {
                  type: 'Text',
                  props: { variant: 'heading', size: 'lg' },
                  content: 'Mohammed Falaah',
                  style: { marginBottom: '$spacing.sm' }
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'Frontend Developer',
                  style: { 
                    color: '$colors.textSecondary',
                    marginBottom: '$spacing.sm'
                  }
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'falahmkba@gmail.com',
                  style: { marginBottom: '$spacing.sm' }
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'Kochi, India',
                  style: { marginBottom: '$spacing.md' }
                }
              ]
            },
            {
              type: 'Card',
              props: { padding: 'lg', shadow: true },
              children: [
                {
                  type: 'Text',
                  props: { variant: 'heading', size: 'lg' },
                  content: 'Actions',
                  style: { marginBottom: '$spacing.md' }
                },
                {
                  type: 'Button',
                  props: { variant: 'primary', size: 'md' },
                  content: 'Edit Profile',
                  style: { marginRight: '$spacing.sm' }
                },
                {
                  type: 'Button',
                  props: { variant: 'outline', size: 'md' },
                  content: 'Settings'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};