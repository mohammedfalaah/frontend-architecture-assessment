import type { ComponentConfig } from '../types/config';
import { useTheme } from '../hooks/useTheme';

import { Text } from './ui/Text';
import { Container } from './ui/Container';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProductGrid } from './ui/ProductGrid';

const componentRegistry = {
  Text,
  Container,
  Card,
  Button,
  ProductGrid,
} as const;

type ComponentType = keyof typeof componentRegistry;

interface ComponentResolverProps {
  config: ComponentConfig;
}

export const ComponentResolver = ({ config }: ComponentResolverProps) => {
  const { createStyles } = useTheme();
  
  const Component = componentRegistry[config.type as ComponentType];
  
  if (!Component) {
    console.warn(`Component type "${config.type}" not found`);
    
    if (import.meta.env.DEV) {
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

  const props: any = {
    ...config.props,
    ...(config.style && { style: createStyles(config.style) })
  };

  if (config.type === 'Button' && !props.onClick) {
    props.onClick = () => {
      console.log(`Button clicked: "${config.content || 'Button'}"`);
      if (config.content === 'Get Started') {
        console.log('Getting started...');
      } else if (config.content === 'Edit Profile') {
        console.log('Opening profile editor...');
      }
    };
  }

  if (config.content) {
    props.children = config.content;
  }

  if (config.children && config.children.length > 0) {
    const childElements = config.children.map((childConfig, index) => (
      <ComponentResolver 
        key={`${config.type}-child-${index}`} 
        config={childConfig} 
      />
    ));
    
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

  return <Component {...props} />;
};