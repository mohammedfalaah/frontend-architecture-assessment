import { useTheme } from '../../hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Card = ({
  children,
  padding = 'md',
  shadow = true,
  style = {},
  className = ''
}: CardProps) => {
  const { theme, getSpacing, getColor } = useTheme();

  const cardStyles: React.CSSProperties = {
    backgroundColor: getColor('surface'),
    border: `1px solid ${getColor('border')}`,
    borderRadius: '8px',
    padding: getSpacing(padding),
    boxShadow: shadow ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
    marginBottom: theme.spacing.md,
    width: '100%',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    // Better touch interaction on mobile
    WebkitTapHighlightColor: 'transparent',
    ...style
  };

  return (
    <div 
      style={cardStyles} 
      className={`responsive-card ${className}`}
    >
      {children}
    </div>
  );
};