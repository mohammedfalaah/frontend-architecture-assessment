import React from 'react';
import { Button } from './ui/Button';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      style={{ marginLeft: 'auto' }}
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </Button>
  );
};