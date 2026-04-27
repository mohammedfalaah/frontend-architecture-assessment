import { useAppContext } from '../context/AppContext';
import type { PageConfig } from '../types/config';

export const useConfig = () => {
  const { config } = useAppContext();

  const getPageByPath = (path: string): PageConfig | undefined => {
    return config.pages.find(page => page.path === path);
  };

  const getPageById = (id: string): PageConfig | undefined => {
    return config.pages.find(page => page.id === id);
  };

  const getAllPages = (): PageConfig[] => {
    return config.pages;
  };

  const getNavigationItems = () => {
    return config.navigation.items;
  };

  return {
    config,
    getPageByPath,
    getPageById,
    getAllPages,
    getNavigationItems
  };
};