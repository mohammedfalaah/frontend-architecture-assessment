// Example: How to add a new "About" page by only editing configuration

import { AppConfig } from '../src/types/config';

// This shows how you would modify app-config.ts to add a new page
export const configWithNewPage: Partial<AppConfig> = {
  // 1. Add to navigation
  navigation: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/products' },
      { label: 'Profile', path: '/profile' },
      { label: 'About', path: '/about' } // <- New navigation item
    ]
  },

  // 2. Add to pages array
  pages: [
    // ... existing pages would be here
    {
      id: 'about',
      title: 'About Us',
      path: '/about',
      components: [
        {
          type: 'Container',
          children: [
            {
              type: 'Text',
              props: { variant: 'heading', size: 'xl' },
              content: 'About Our Company'
            },
            {
              type: 'Text',
              props: { variant: 'body', size: 'md' },
              content: 'We are a technology company focused on building innovative config-driven applications.'
            },
            {
              type: 'Card',
              props: { padding: 'lg' },
              children: [
                {
                  type: 'Text',
                  props: { variant: 'heading', size: 'lg' },
                  content: 'Our Mission'
                },
                {
                  type: 'Text',
                  props: { variant: 'body' },
                  content: 'To demonstrate how configuration-driven architecture can create flexible, maintainable applications.'
                },
                {
                  type: 'Button',
                  props: { variant: 'primary' },
                  content: 'Contact Us'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// That's it! No code changes needed - the new page will automatically:
// - Appear in the navigation menu
// - Be routable at /about
// - Render using the ComponentResolver system
// - Use the same theme and styling as other pages