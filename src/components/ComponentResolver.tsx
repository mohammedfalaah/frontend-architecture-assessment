import type { ComponentConfig } from '../types/config';
import { useTheme } from '../hooks/useTheme';

// Import all available UI components
import { Text } from './ui/Text';
import { Container } from './ui/Container';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProductGrid } from './ui/ProductGrid';

/**
 * Component registry - maps config type strings to actual React components
 * 
 * TODO: Maybe move this to a separate file if it gets too big
 * TODO: Add lazy loading for better performance?
 */
const componentRegistry = {
  Text,
  Container,
  Card,
  Button,
  ProductGrid,
} as const;

// Type for valid component names
type ComponentType = keyof typeof componentRegistry;

interface ComponentResolverProps {
  config: ComponentConfig;
}

/**
 * ComponentResolver - Dynamically renders components based on configuration
 * 
 * This component takes a config object and:
 * 1. Looks up the component in our registry
 * 2. Applies props and styling from config
 * 3. Recursively renders any children
 * 4. Handles theme variable substitution
 */
export const ComponentResolver = ({ config }: ComponentResolverProps) => {
  const { createStyles } = useTheme();
  
  const Component = componentRegistry[config.type as ComponentType];
  
  if (!Component) {
    console.warn(`Component type "${config.type}" not found`);
    
    // Show error in dev mode
    if (process.env.NODE_ENV === 'development') {
      return (
        <div style={{
          padding: '1rem',
          border: '2px dashed #ef4444',
          borderRadius: '8px',
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          margin: '0.5rem 0'
        }}>
          <strong>Unknown Component:</strong> "{config.type}"
          <br />
          <small>Available: {Object.keys(componentRegistry).join(', ')}</small>
        </div>
      );
    }
    
    return null;
  }

  // Build props - probably could be cleaner but works
  const props: any = {
    ...config.props,
    ...(config.style && { style: createStyles(config.style) })
  };

  // Quick hack for button clicks - TODO: make this more generic
  if (config.type === 'Button' && !props.onClick) {
    props.onClick = () => {
      console.log(`Button clicked: "${config.content || 'Button'}"`);
      // Add specific handlers later
      if (config.content === 'Get Started') {
        console.log('Getting started...');
      } else if (config.content === 'Edit Profile') {
        console.log('Opening profile editor...');
      }
    };
  }

  // Handle content prop for text-based components
  if (config.content) {
    props.children = config.content;
  }

  // Recursively render children if they exist
  if (config.children && config.children.length > 0) {
    const childElements = config.children.map((childConfig, index) => (
      <ComponentResolver 
        key={`${config.type}-child-${index}`} 
        config={childConfig} 
      />
    ));
    
    // Combine content and children if both exist
    if (config.content) {
      props.children = (
        <>
          {config.content}
          {childElements}
        </>
      );
    } else {
      props.children = childElements;
    }
  }

  // Render the component with all props
  return <Component {...props} />;
};