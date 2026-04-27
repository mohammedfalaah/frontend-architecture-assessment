import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Card } from './Card';
import { Text } from './Text';
import { Button } from './Button';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  const { getSpacing } = useTheme();
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: getSpacing('lg'),
    marginTop: getSpacing('lg')
  };

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
  };

  const priceStyles = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#059669',
    marginTop: 'auto',
    paddingTop: getSpacing('sm')
  };

  const buttonGroupStyles = {
    display: 'flex',
    gap: getSpacing('sm'),
    marginTop: getSpacing('md'),
    flexWrap: 'wrap' as const
  };

  const handleAddToCart = async (product: Product) => {
    setLoadingStates(prev => ({ ...prev, [product.id]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoadingStates(prev => ({ ...prev, [product.id]: false }));
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div style={gridStyles} className="product-grid">
      {products.map((product) => (
        <Card key={product.id} style={cardStyles} padding="lg">
          <Text 
            variant="heading" 
            size="lg" 
            style={{ marginBottom: getSpacing('sm') }}
          >
            {product.name}
          </Text>
          
          <Text 
            variant="body" 
            style={{ 
              marginBottom: getSpacing('md'),
              color: '#6b7280',
              lineHeight: '1.5'
            }}
          >
            {product.description}
          </Text>
          
          <Text variant="body" style={priceStyles}>
            {product.price}
          </Text>
          
          <div style={buttonGroupStyles} className="btn-group">
            <Button 
              variant="primary" 
              size="md"
              loading={loadingStates[product.id]}
              onClick={() => handleAddToCart(product)}
              style={{ flex: 1 }}
            >
              {loadingStates[product.id] ? 'Adding...' : 'Add to Cart'}
            </Button>
            <Button 
              variant="outline" 
              size="md"
              onClick={() => console.log(`View ${product.name} details`)}
            >
              Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};