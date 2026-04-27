import type { AppConfig } from '../types/config';

// Main app configuration - drives the entire UI structure
// TODO: Consider moving this to a JSON file or external API later
export const appConfig: AppConfig = {
  theme: {
    colors: {
      primary: '#2563eb', // Changed to a more professional blue
      secondary: '#64748b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      accent: '#059669' // Green for success states
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
        xl: '1.875rem' // Bigger heading size
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
      title: 'Dashboard - Welcome',
      path: '/',
      components: [
        {
          type: 'Container',
          props: { maxWidth: '1200px', padding: 'lg' },
          children: [
            {
              type: 'Text',
              props: { variant: 'heading', size: 'xl' },
              content: 'Welcome to ConfigUI Pro'
            },
            {
              type: 'Text',
              props: { variant: 'body', size: 'md' },
              content: 'A modern, configuration-driven React application that adapts to your needs. Built with performance and flexibility in mind.',
              style: { marginBottom: '$spacing.lg' }
            },
            {
              type: 'Card',
              props: { padding: 'lg', shadow: true },
              children: [
                {
                  type: 'Text',
                  props: { variant: 'heading', size: 'lg' },
                  content: '🚀 Key Features'
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: '• Dynamic component rendering from configuration\n• Responsive design system with consistent theming\n• Type-safe development with full TypeScript support\n• Modular architecture for easy maintenance\n• Performance optimized with React best practices'
                },
                {
                  type: 'Button',
                  props: { variant: 'primary', size: 'md' },
                  content: 'Get Started →'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'products',
      title: 'Product Catalog',
      path: '/products',
      components: [
        {
          type: 'Container',
          props: { padding: 'lg' },
          children: [
            {
              type: 'Text',
              props: { variant: 'heading', size: 'xl' },
              content: 'Our Products'
            },
            {
              type: 'Text',
              props: { variant: 'body', size: 'md' },
              content: 'Discover our range of developer tools and solutions designed to boost your productivity.',
              style: { marginBottom: '$spacing.md' }
            },
            {
              type: 'ProductGrid',
              props: {
                products: [
                  { 
                    id: 1, 
                    name: 'ConfigUI Framework', 
                    price: '$299/year', 
                    description: 'Complete configuration-driven UI framework with advanced theming and component system.' 
                  },
                  { 
                    id: 2, 
                    name: 'Design System Pro', 
                    price: '$199/year', 
                    description: 'Professional design system with 100+ components and comprehensive documentation.' 
                  },
                  { 
                    id: 3, 
                    name: 'Developer Tools Suite', 
                    price: '$149/year', 
                    description: 'Essential development tools including linting, testing, and deployment automation.' 
                  },
                  {
                    id: 4,
                    name: 'Enterprise Support',
                    price: '$999/year',
                    description: 'Priority support, custom integrations, and dedicated account management for teams.'
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
      title: 'User Profile',
      path: '/profile',
      components: [
        {
          type: 'Container',
          props: { maxWidth: '800px', padding: 'lg' },
          children: [
            {
              type: 'Text',
              props: { variant: 'heading', size: 'xl' },
              content: 'Profile Settings'
            },
            {
              type: 'Card',
              props: { padding: 'lg' },
              children: [
                {
                  type: 'Text',
                  props: { variant: 'heading', size: 'lg' },
                  content: 'Falah K'
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'Senior Frontend Developer',
                  style: { color: '$colors.textSecondary', marginBottom: '$spacing.sm' }
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'falahmkba@gmail.com'
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'Engineering Team Lead'
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'Kochi',
                  style: { marginBottom: '$spacing.md' }
                }
              ]
            },
            {
              type: 'Card',
              props: { padding: 'lg' },
              children: [
                {
                  type: 'Text',
                  props: { variant: 'heading', size: 'lg' },
                  content: 'Account Actions'
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
                  content: 'Change Password'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};