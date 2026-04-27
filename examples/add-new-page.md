# Adding a New Page - Example

This example shows how to add a new "About" page by only editing the configuration file.

## Step 1: Add Navigation Item

In `src/config/app-config.ts`, add the navigation item:

```typescript
navigation: {
  items: [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Profile', path: '/profile' },
    { label: 'About', path: '/about' }  // ← Add this line
  ]
}
```

## Step 2: Add Page Configuration

In the same file, add the page to the `pages` array:

```typescript
{
  id: 'about',
  title: 'About Us',
  path: '/about',
  components: [
    {
      type: 'Container',
      props: { maxWidth: '800px', padding: 'lg' },
      children: [
        {
          type: 'Text',
          props: { variant: 'heading', size: 'xl' },
          content: 'About Our Company',
          style: { marginBottom: '$spacing.lg' }
        },
        {
          type: 'Card',
          props: { padding: 'lg', shadow: true },
          children: [
            {
              type: 'Text',
              props: { variant: 'body' },
              content: 'We are a technology company focused on building innovative solutions for modern web development. Our config-driven approach allows for rapid prototyping and easy maintenance.',
              style: { marginBottom: '$spacing.md' }
            },
            {
              type: 'Text',
              props: { variant: 'heading', size: 'lg' },
              content: 'Our Mission',
              style: { marginBottom: '$spacing.sm' }
            },
            {
              type: 'Text',
              props: { variant: 'body' },
              content: 'To make web development more accessible and maintainable through configuration-driven architectures.'
            }
          ]
        }
      ]
    }
  ]
}
```

## Result

That's it! No code changes needed. The new "About" page will automatically:
- Appear in the navigation
- Be accessible at `/about`
- Render the configured components
- Work with all existing features (routing, theming, etc.)

This demonstrates the power of the config-driven architecture - entire pages can be added without touching any React components or routing code.