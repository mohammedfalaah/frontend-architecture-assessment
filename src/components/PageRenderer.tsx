import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useConfig } from '../hooks/useConfig';
import { ComponentResolver } from './ComponentResolver';
import { Text } from './ui/Text';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

export const PageRenderer = () => {
  const { page } = useParams<{ page?: string }>();
  const { getPageByPath } = useConfig();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Determine the current path
  const currentPath = page ? `/${page}` : '/';
  
  // Get page configuration
  const pageConfig = getPageByPath(currentPath);

  // Simulate loading state (in real app, this might be API calls)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!pageConfig) {
        setError(`Page "${currentPath}" not found in configuration`);
      }
    }, 300); // Short delay to show loading state

    return () => clearTimeout(timer);
  }, [pageConfig, currentPath]);

  // Loading state - responsive
  if (isLoading) {
    return (
      <Container padding="xl">
        <div className="loading-container">
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e2e8f0',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <Text variant="body" style={{ color: '#64748b' }}>
            Loading page...
          </Text>
        </div>
      </Container>
    );
  }

  // Error state - 404 page (responsive)
  if (error || !pageConfig) {
    return (
      <Container padding="xl">
        <div className="error-container">
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem'
          }}>
            🔍
          </div>
          <Text variant="heading" size="xl" style={{ marginBottom: '1rem' }}>
            Page Not Found
          </Text>
          <Text 
            variant="body" 
            style={{ 
              marginBottom: '2rem', 
              color: '#64748b',
              textAlign: 'center'
            }}
          >
            Sorry, we couldn't find the page you're looking for. The page "{currentPath}" 
            doesn't exist in our configuration or may have been moved.
          </Text>
          
          <div className="btn-group" style={{ justifyContent: 'center' }}>
            <Button 
              variant="primary"
              onClick={() => window.history.back()}
            >
              ← Go Back
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/'}
            >
              🏠 Home
            </Button>
          </div>

          {/* Debug info in development - responsive */}
          {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
            <div style={{ 
              marginTop: '3rem',
              padding: '1rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              textAlign: 'left',
              fontSize: '0.875rem',
              color: '#64748b',
              maxWidth: '100%',
              overflow: 'auto'
            }}>
              <strong>Debug Info:</strong><br />
              Requested path: {currentPath}<br />
              Error: {error}
            </div>
          )}
        </div>
      </Container>
    );
  }

  // Success state - render the page (responsive)
  return (
    <div className="page-content fade-in">
      {/* Set page title */}
      {typeof document !== 'undefined' && pageConfig.title && (
        <title>{pageConfig.title}</title>
      )}
      
      {pageConfig.components.map((componentConfig, index) => (
        <ComponentResolver key={`${pageConfig.id}-${index}`} config={componentConfig} />
      ))}
    </div>
  );
};