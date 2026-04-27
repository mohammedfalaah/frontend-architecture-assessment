// Core configuration types for the config-driven UI system

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
}

export interface ComponentConfig {
  type: string;
  props?: Record<string, any>;
  children?: ComponentConfig[];
  content?: string;
  style?: Record<string, string>;
}

export interface PageConfig {
  id: string;
  title: string;
  path: string;
  components: ComponentConfig[];
}

export interface AppConfig {
  theme: ThemeConfig;
  pages: PageConfig[];
  navigation: {
    items: Array<{
      label: string;
      path: string;
    }>;
  };
}