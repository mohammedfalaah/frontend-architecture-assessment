# ConfigUI - React Configuration-Driven Application

A React app where the UI is built from configuration objects instead of hardcoded components. This was built as part of a technical assessment to demonstrate config-driven architecture patterns.

## What's This About?

Instead of writing JSX for every page, this app reads from a configuration file to determine what components to render, how they're styled, and what content they show. It's like having a CMS but for your entire application structure.

## Running the App

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## How It Works

The magic happens in `src/config/app-config.ts` - this single file defines:
- All pages and their routes
- What components appear on each page
- Theme colors and spacing
- Navigation structure

When you visit a page, the `PageRenderer` looks up the config for that route and uses `ComponentResolver` to turn the config into actual React components.

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable components (Text, Button, etc.)
│   ├── ComponentResolver.tsx  # Maps config → React components
│   ├── Navigation.tsx         # Dynamic nav from config
│   └── PageRenderer.tsx       # Renders pages from config
├── config/
│   ├── app-config.ts         # Main configuration file
│   └── themes.ts             # Theme definitions
├── context/
│   └── AppContext.tsx        # React Context for config/theme
├── hooks/
│   ├── useConfig.ts          # Config management
│   └── useTheme.ts           # Theme utilities
└── types/
    └── config.ts             # TypeScript definitions
```

## Key Features

**Config-Driven Everything**: Pages, components, styling, and content all come from configuration

**Component Registry**: Clean mapping system that lets you add new component types by just updating the registry

**Theme System**: Colors, spacing, and typography defined in config and used throughout

**Type Safety**: Full TypeScript support with proper type definitions

**Dynamic Routing**: React Router setup that works with any page defined in config

## Adding a New Page

Just edit `src/config/app-config.ts`:

```typescript
// Add to navigation
navigation: {
  items: [
    // existing items...
    { label: 'About', path: '/about' }
  ]
},

// Add to pages
pages: [
  // existing pages...
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
          }
        ]
      }
    ]
  }
]
```

That's it. No new React components needed.

## Architecture Decisions

**Why config-driven?** 
- Makes it easy to A/B test page layouts
- Non-developers can modify content and structure
- Reduces code duplication
- Enables dynamic page generation

**Component Registry Pattern**
- Clean separation between config and implementation
- Easy to add new component types
- Type-safe component resolution

**React Context for Global State**
- Avoids prop drilling for theme/config
- Single source of truth for application state
- Easy to extend with additional global data

## Trade-offs

**Pros:**
- Very flexible - can change entire app structure via config
- Consistent theming system
- Easy to add new pages
- Good separation of concerns

**Cons:**
- Learning curve for the config schema
- Harder to debug than traditional JSX
- Runtime component resolution vs compile-time
- More abstraction layers

## Technical Requirements Met

✅ React with Vite  
✅ TypeScript  
✅ Plain CSS (no UI libraries)  
✅ React Router for routing  
✅ React Context for global state  
✅ Custom hooks (`useConfig`, `useTheme`)  
✅ Reusable components  
✅ Config-driven styling  
✅ Component resolver system  

## Development Notes

- The `ComponentResolver` is the core of the system - it maps config objects to React components
- Theme variables in config use `$colors.primary` syntax and get resolved by `useTheme`
- Error boundaries and loading states are handled in `PageRenderer`
- All components are designed to be generic and reusable

## Future Improvements

- Add config validation at runtime
- Implement theme switching
- Add more component types (forms, tables, etc.)
- Performance optimizations with React.memo
- Better error handling and user feedback

---

Built as a technical assessment demonstrating config-driven React architecture.