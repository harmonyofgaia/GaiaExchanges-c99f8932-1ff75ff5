
import React, { createContext, useContext, useEffect, useState } from 'react'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export const AVAILABLE_THEMES = {
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
} as const

export type ThemeName = keyof typeof AVAILABLE_THEMES

interface LockContextType {
  isLocked: boolean
  toggleLock: () => void
}

const LockContext = createContext<LockContextType | undefined>(undefined)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isLocked, setIsLocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gaia-ui-lock') === 'true'
    }
    return false
  })

  const toggleLock = () => {
    const newLockState = !isLocked
    setIsLocked(newLockState)
    if (typeof window !== 'undefined') {
      localStorage.setItem('gaia-ui-lock', newLockState.toString())
    }
  }

  return (
    <NextThemesProvider {...props}>
      <LockContext.Provider value={{ isLocked, toggleLock }}>
        {children}
      </LockContext.Provider>
    </NextThemesProvider>
  )
}

export const useLock = () => {
  const context = useContext(LockContext)
  if (context === undefined) {
    throw new Error('useLock must be used within a ThemeProvider')
  }
  return context
}
