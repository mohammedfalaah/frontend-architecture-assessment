import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppConfig, ThemeConfig } from '../types/config';
import { appConfig } from '../config/app-config';
import { lightTheme, darkTheme } from '../config/themes';

interface AppContextType {
  config: AppConfig;
  theme: ThemeConfig;
  currentThemeId: string;
  setTheme: (themeId: string) => void;
  availableThemes: Array<{ id: string; name: string; theme: ThemeConfig }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  config?: AppConfig;
}

export const AppProvider: React.FC<AppProviderProps> = ({ 
  children, 
  config = appConfig 
}) => {
  // Available themes
  const availableThemes = [
    { id: 'default', name: 'Default', theme: config.theme },
    { id: 'light', name: 'Light', theme: lightTheme },
    { id: 'dark', name: 'Dark', theme: darkTheme }
  ];

  // Theme state
  const [currentThemeId, setCurrentThemeId] = useState('default');
  
  // Get current theme
  const getCurrentTheme = () => {
    const themeData = availableThemes.find(t => t.id === currentThemeId);
    return themeData ? themeData.theme : config.theme;
  };

  const setTheme = (themeId: string) => {
    const themeExists = availableThemes.some(t => t.id === themeId);
    if (themeExists) {
      setCurrentThemeId(themeId);
      console.log(`🎨 Theme switched to: ${themeId}`);
    } else {
      console.warn(`Theme "${themeId}" not found`);
    }
  };

  const value = {
    config,
    theme: getCurrentTheme(),
    currentThemeId,
    setTheme,
    availableThemes
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};