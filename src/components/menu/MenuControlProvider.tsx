
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { navigationItems } from '@/nav-items'

interface MenuControlContextType {
  isMenuLocked: boolean
  toggleMenuLock: () => void
  visiblePages: string[]
  hiddenPages: string[]
  togglePageVisibility: (path: string) => void
  isPageVisible: (path: string) => boolean
}

const MenuControlContext = createContext<MenuControlContextType | undefined>(undefined)

export function useMenuControl() {
  const context = useContext(MenuControlContext)
  if (!context) {
    throw new Error('useMenuControl must be used within MenuControlProvider')
  }
  return context
}

export function MenuControlProvider({ children }: { children: ReactNode }) {
  const [isMenuLocked, setIsMenuLocked] = useState(false)
  const [visiblePages, setVisiblePages] = useState<string[]>([])

  useEffect(() => {
    // Load saved settings from localStorage
    const savedLock = localStorage.getItem('gaia-menu-lock')
    const savedVisible = localStorage.getItem('gaia-visible-pages')
    
    if (savedLock) {
      setIsMenuLocked(JSON.parse(savedLock))
    }
    
    if (savedVisible) {
      setVisiblePages(JSON.parse(savedVisible))
    } else {
      // Default: show first 8 main pages
      const defaultVisible = navigationItems.slice(0, 8).map(item => item.to)
      setVisiblePages(defaultVisible)
    }
  }, [])

  const toggleMenuLock = () => {
    const newLock = !isMenuLocked
    setIsMenuLocked(newLock)
    localStorage.setItem('gaia-menu-lock', JSON.stringify(newLock))
  }

  const togglePageVisibility = (path: string) => {
    if (isMenuLocked) return // Prevent changes when locked
    
    const newVisible = visiblePages.includes(path)
      ? visiblePages.filter(p => p !== path)
      : [...visiblePages, path]
    
    setVisiblePages(newVisible)
    localStorage.setItem('gaia-visible-pages', JSON.stringify(newVisible))
  }

  const isPageVisible = (path: string) => visiblePages.includes(path)

  const hiddenPages = navigationItems
    .map(item => item.to)
    .filter(path => !visiblePages.includes(path))

  return (
    <MenuControlContext.Provider value={{
      isMenuLocked,
      toggleMenuLock,
      visiblePages,
      hiddenPages,
      togglePageVisibility,
      isPageVisible
    }}>
      {children}
    </MenuControlContext.Provider>
  )
}
