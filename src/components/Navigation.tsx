import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useConfig } from '../hooks/useConfig';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';

export const Navigation = () => {
  const { getNavigationItems } = useConfig();
  const { getColor, getSpacing } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navItems = getNavigationItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyles = {
    backgroundColor: getColor('surface'),
    borderBottom: `1px solid ${getColor('border')}`,
    padding: `${getSpacing('sm')} 0`,
    marginBottom: getSpacing('lg'),
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
    transition: 'all 0.2s ease',
    boxShadow: isScrolled ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
    width: '100%'
  };

  const navContainerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${getSpacing('md')}`,
    flexWrap: 'wrap' as const,
    gap: getSpacing('sm')
  };

  const logoStyles = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: getColor('primary'),
    textDecoration: 'none',
    flexShrink: 0
  };

  const navListStyles = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: getSpacing('sm'),
    flexWrap: 'nowrap' as const,
    alignItems: 'center'
  };

  const getLinkStyles = (isActive: boolean) => ({
    textDecoration: 'none',
    color: isActive ? getColor('primary') : getColor('text'),
    fontWeight: isActive ? '600' : '500',
    padding: `${getSpacing('xs')} ${getSpacing('sm')}`,
    borderRadius: '6px',
    transition: 'all 0.15s ease',
    fontSize: '0.95rem',
    position: 'relative' as const,
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80px',
    textAlign: 'center' as const
  });

  const userStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: getSpacing('xs'),
    color: getColor('textSecondary'),
    fontSize: '0.9rem',
    flexShrink: 0
  };

  return (
    <nav style={navStyles} className="main-navigation">
      <div style={navContainerStyles} className="nav-container">
        <Link to="/" style={logoStyles} className="nav-logo">
          ConfigUI
        </Link>
        
        <ul style={navListStyles} className="nav-menu">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  style={getLinkStyles(isActive)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div style={userStyles} className="nav-user">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};