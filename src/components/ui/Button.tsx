import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  loading = false,
  style = {},
  className = ''
}: ButtonProps) => {
  const { theme, getColor, getSpacing, getFontSize } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const getVariantStyles = () => {
    const baseStyles = {
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.15s ease',
      position: 'relative' as const,
      overflow: 'hidden' as const
    };

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: getColor('secondary'),
          color: getColor('background'),
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: getColor('primary'),
          border: `1px solid ${getColor('primary')}`,
          boxShadow: 'none'
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: getColor('text'),
          border: 'none',
          boxShadow: 'none'
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: getColor('primary'),
          color: getColor('background'),
          boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: `${getSpacing('xs')} ${getSpacing('sm')}`,
          fontSize: getFontSize('sm'),
          borderRadius: '4px'
        };
      case 'lg':
        return {
          padding: `${getSpacing('md')} ${getSpacing('lg')}`,
          fontSize: getFontSize('lg'),
          borderRadius: '8px'
        };
      default:
        return {
          padding: `${getSpacing('sm')} ${getSpacing('md')}`,
          fontSize: getFontSize('md'),
          borderRadius: '6px'
        };
    }
  };

  const getHoverStyles = () => {
    if (disabled || loading) return {};
    
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: getColor('primary'),
          color: getColor('background')
        };
      case 'ghost':
        return {
          backgroundColor: getColor('surface')
        };
      default:
        return {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(37, 99, 235, 0.3)'
        };
    }
  };

  const buttonStyles = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: getSpacing('xs'),
    opacity: disabled ? 0.6 : 1,
    transform: isPressed ? 'translateY(0)' : undefined,
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
    ...(isPressed ? {} : getHoverStyles())
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <button
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      aria-disabled={disabled || loading}
    >
      {loading && (
        <span style={{ 
          width: '16px', 
          height: '16px', 
          border: '2px solid currentColor',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {children}
    </button>
  );
};