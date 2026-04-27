import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAppContext } from '../context/AppContext';

export const ThemeToggle = () => {
  const { getColor, getSpacing } = useTheme();
  const { currentThemeId, setTheme, availableThemes } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleStyles = {
    position: 'relative' as const,
    display: 'inline-block'
  };

  const buttonStyles = {
    padding: `${getSpacing('xs')} ${getSpacing('sm')}`,
    backgroundColor: getColor('surface'),
    border: `1px solid ${getColor('border')}`,
    borderRadius: '6px',
    color: getColor('text'),
    cursor: 'pointer',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: getSpacing('xs'),
    transition: 'all 0.2s ease'
  };

  const dropdownStyles = {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    marginTop: '4px',
    backgroundColor: getColor('background'),
    border: `1px solid ${getColor('border')}`,
    borderRadius: '6px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    minWidth: '140px',
    display: isOpen ? 'block' : 'none'
  };

  const optionStyles = {
    padding: `${getSpacing('xs')} ${getSpacing('sm')}`,
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: getColor('text'),
    borderBottom: `1px solid ${getColor('border')}`,
    transition: 'background-color 0.15s ease'
  };

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  // Get current theme name for display
  const currentTheme = availableThemes.find(t => t.id === currentThemeId);
  const currentThemeName = currentTheme ? currentTheme.name : 'Default';

  return (
    <div ref={dropdownRef} style={toggleStyles} className="theme-toggle">
      <button
        style={buttonStyles}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        title={`Current theme: ${currentThemeName}`}
      >
        <span>Theme</span>
        <span>{currentThemeName}</span>
        <span style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
          transition: 'transform 0.2s ease',
          fontSize: '0.75rem'
        }}>
          ▼
        </span>
      </button>
      
      <div style={dropdownStyles}>
        {availableThemes.map((themeOption, index) => (
          <div
            key={themeOption.id}
            style={{
              ...optionStyles,
              borderBottom: index === availableThemes.length - 1 ? 'none' : optionStyles.borderBottom,
              backgroundColor: themeOption.id === currentThemeId ? getColor('surface') : 'transparent',
              fontWeight: themeOption.id === currentThemeId ? '600' : '400'
            }}
            onClick={() => handleThemeChange(themeOption.id)}
            onMouseEnter={(e) => {
              if (themeOption.id !== currentThemeId) {
                e.currentTarget.style.backgroundColor = getColor('surface');
              }
            }}
            onMouseLeave={(e) => {
              if (themeOption.id !== currentThemeId) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: getSpacing('xs') }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: themeOption.theme.colors.primary
                }}
              />
              {themeOption.name}
              {themeOption.id === currentThemeId && (
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>✓</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};