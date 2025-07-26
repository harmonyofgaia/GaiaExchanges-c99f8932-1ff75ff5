import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeOption = 'Normal' | 'Light' | 'Dark' | 'Matrix';

interface ThemeContextType {
  isLocked: boolean;
  currentTheme: ThemeOption;
  toggleLock: () => void;
  setTheme: (theme: ThemeOption) => void;
  getThemeClasses: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>('Normal');

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedLockState = localStorage.getItem('gaia-design-lock');
    const savedTheme = localStorage.getItem('gaia-theme');
    
    if (savedLockState !== null) {
      setIsLocked(JSON.parse(savedLockState));
    }
    
    if (savedTheme && ['Normal', 'Light', 'Dark', 'Matrix'].includes(savedTheme)) {
      setCurrentTheme(savedTheme as ThemeOption);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gaia-design-lock', JSON.stringify(isLocked));
  }, [isLocked]);

  useEffect(() => {
    localStorage.setItem('gaia-theme', currentTheme);
  }, [currentTheme]);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const setTheme = (theme: ThemeOption) => {
    if (!isLocked) {
      setCurrentTheme(theme);
    }
  };

  const getThemeClasses = (): string => {
    switch (currentTheme) {
      case 'Light':
        return 'min-h-screen bg-gradient-to-br from-white via-gray-100 to-green-100 text-gray-900';
      case 'Dark':
        return 'min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white';
      case 'Matrix':
        return 'min-h-screen bg-gradient-to-br from-black via-green-900 to-black text-green-400';
      case 'Normal':
      default:
        return 'min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white';
    }
  };

  return (
    <ThemeContext.Provider value={{
      isLocked,
      currentTheme,
      toggleLock,
      setTheme,
      getThemeClasses
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}