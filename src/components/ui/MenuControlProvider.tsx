
import React, { createContext, useContext, useState } from 'react';

interface MenuControlContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;
}

const MenuControlContext = createContext<MenuControlContextType | undefined>(undefined);

export function MenuControlProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const value = {
    isMenuOpen,
    setIsMenuOpen,
    toggleMenu,
  };

  return (
    <MenuControlContext.Provider value={value}>
      {children}
    </MenuControlContext.Provider>
  );
}

export function useMenuControl() {
  const context = useContext(MenuControlContext);
  if (context === undefined) {
    throw new Error('useMenuControl must be used within a MenuControlProvider');
  }
  return context;
}
