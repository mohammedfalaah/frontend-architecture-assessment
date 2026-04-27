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
 * This is the heart of our config-driven system
 * 
 * To add a new component:
 * 1. Import it above
 * 2. Add it to this registry with a string key
 * 3. Use that key in your config files
 */
const componentRegistry = {
  Text,
  Container,
  Card,
  Button,
  ProductGrid,
  // Add more components here as needed
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
  
  // Get the component from registry
  const Component = componentRegistry[config.type as ComponentType];
  
  // Handle unknown components gracefully
  if (!Component) {
    console.warn(`⚠️ Component type "${config.type}" not found in registry`);
    
    // In development, show a helpful error component
    const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    if (isDevelopment) {
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
          <small>Available components: {Object.keys(componentRegistry).join(', ')}</small>
        </div>
      );
    }
    
    // In production, fail silently
    return null;
  }

  // Build props object
  const props: any = {
    ...config.props,
    // Apply custom styles if provided (with theme variable support)
    ...(config.style && { style: createStyles(config.style) })
  };

  // Add default onClick handlers for buttons if not provided
  if (config.type === 'Button' && !props.onClick) {
    props.onClick = () => {
      console.log(`Button clicked: "${config.content || 'Button'}"`);
      // You can add more default behavior here
      if (config.content === 'Get Started →') {
        console.log('🚀 Getting started with ConfigUI!');
      } else if (config.content === 'Edit Profile') {
        console.log('✏️ Opening profile editor...');
      } else if (config.content === 'Change Password') {
        console.log('🔒 Opening password change form...');
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