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
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: getSpacing('lg'),
    marginTop: getSpacing('lg'),
    width: '100%'
  };

  const productCardStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  };

  const priceStyles = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#059669', // Success green
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
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setLoadingStates(prev => ({ ...prev, [product.id]: false }));
    
    // Show some feedback (in a real app, you'd use a toast or notification)
    console.log(`Added ${product.name} to cart!`);
  };

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply hover effects on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  };

  return (
    <div style={gridStyles} className="product-grid responsive-grid">
      {products.map((product) => (
        <div
          key={product.id}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardLeave}
        >
          <Card style={productCardStyles} padding="lg">
            <div style={{ marginBottom: getSpacing('sm') }}>
              <Text 
                variant="heading" 
                size="lg" 
                style={{ marginBottom: getSpacing('xs') }}
                className="product-title"
              >
                {product.name}
              </Text>
              <Text 
                variant="body" 
                style={{ 
                  marginBottom: getSpacing('md'),
                  lineHeight: '1.6',
                  color: '#64748b'
                }}
                className="product-description"
              >
                {product.description}
              </Text>
            </div>
            
            <div style={{ marginTop: 'auto' }}>
              <Text variant="body" style={priceStyles} className="product-price">
                {product.price}
              </Text>
              
              <div style={buttonGroupStyles} className="btn-group">
                <Button 
                  variant="primary" 
                  size="md"
                  loading={loadingStates[product.id]}
                  onClick={() => handleAddToCart(product)}
                  style={{ flex: 1, minWidth: '120px' }}
                >
                  {loadingStates[product.id] ? 'Adding...' : 'Add to Cart'}
                </Button>
                <Button 
                  variant="outline" 
                  size="md"
                  onClick={() => console.log(`View details for ${product.name}`)}
                  style={{ minWidth: '80px' }}
                >
                  Details
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};