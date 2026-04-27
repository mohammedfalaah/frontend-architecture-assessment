import { useTheme } from '../../hooks/useTheme';

interface TextProps {
  variant?: 'heading' | 'body' | 'caption';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export const Text = ({
  variant = 'body',
  size = 'md',
  color,
  children,
  style = {},
  className = ''
}: TextProps) => {
  const { theme, getFontSize, getColor } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'heading':
        return {
          fontWeight: '600',
          lineHeight: '1.2',
          marginBottom: theme.spacing.sm
        };
      case 'caption':
        return {
          fontSize: getFontSize('sm'),
          color: getColor('textSecondary'),
          lineHeight: '1.4'
        };
      default:
        return {
          lineHeight: '1.6'
        };
    }
  };

  // Get base font size
  const getBaseFontSize = () => {
    return getFontSize(size);
  };

  const textStyles: React.CSSProperties = {
    fontFamily: theme.typography.fontFamily,
    fontSize: getBaseFontSize(),
    color: color || getColor('text'),
    margin: 0,
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
    ...getVariantStyles(),
    ...style
  };

  // Add responsive class names
  const responsiveClassName = `responsive-text ${variant === 'heading' ? `heading-${size}` : ''} ${className}`;

  const Component = variant === 'heading' ? 'h2' : 'p';

  return (
    <Component style={textStyles} className={responsiveClassName}>
      {children}
    </Component>
  );
};