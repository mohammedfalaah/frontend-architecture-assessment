import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { AppConfig, ThemeConfig } from '../types/config';
import { appConfig } from '../config/app-config';

interface AppContextType {
  config: AppConfig;
  theme: ThemeConfig;
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
  const value = {
    config,
    theme: config.theme
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