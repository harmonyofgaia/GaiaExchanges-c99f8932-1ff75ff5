
import { createContext, useContext, useState, ReactNode } from 'react'

export interface ThemeInfo {
  name: string
  description: string
  icon: string
}

export type ThemeName = 'dark' | 'light' | 'mellow-colorful' | 'space' | 'forest' | 'ocean'

export const AVAILABLE_THEMES: Record<ThemeName, ThemeInfo> = {
  dark: {
    name: 'Dark',
    description: 'Classic dark theme with matrix aesthetics',
    icon: '🌙'
  },
  light: {
    name: 'Light',
    description: 'Clean light theme for daytime use',
    icon: '☀️'
  },
  'mellow-colorful': {
    name: 'Mellow Colorful',
    description: 'Soft, warm colors with earth tones',
    icon: '🌈'
  },
  space: {
    name: 'Space',
    description: 'Deep space theme with cosmic colors',
    icon: '🚀'
  },
  forest: {
    name: 'Forest',
    description: 'Natural forest theme with green harmony',
    icon: '🌲'
  },
  ocean: {
    name: 'Ocean',
    description: 'Deep ocean blues and aqua tones',
    icon: '🌊'
  }
}

interface LockContextType {
  isLocked: boolean
  toggleLock: () => void
}

const LockContext = createContext<LockContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isLocked, setIsLocked] = useState(true)

  const toggleLock = () => {
    setIsLocked(!isLocked)
  }

  return (
    <LockContext.Provider value={{ isLocked, toggleLock }}>
      {children}
    </LockContext.Provider>
  )
}

export function useLock() {
  const context = useContext(LockContext)
  if (context === undefined) {
    throw new Error('useLock must be used within a ThemeProvider')
  }
  return context
}
