import { useTheme } from '../../hooks/useTheme';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
  className?: string;
}

export const Container = ({
  children,
  maxWidth = '1200px',
  padding = 'md',
  style = {},
  className = ''
}: ContainerProps) => {
  const { getSpacing } = useTheme();

  // Responsive padding based on screen size
  const getResponsivePadding = () => {
    const basePadding = getSpacing(padding);
    return {
      padding: basePadding,
      paddingLeft: `max(${basePadding}, env(safe-area-inset-left))`,
      paddingRight: `max(${basePadding}, env(safe-area-inset-right))`
    };
  };

  const containerStyles: React.CSSProperties = {
    maxWidth,
    margin: '0 auto',
    width: '100%',
    ...getResponsivePadding(),
    ...style
  };

  return (
    <div 
      style={containerStyles} 
      className={`responsive-container ${className}`}
    >
      {children}
    </div>
  );
};