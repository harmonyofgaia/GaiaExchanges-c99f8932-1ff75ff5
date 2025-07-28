
import React, { createContext, useContext, useEffect, useState } from 'react'
import { type ThemeProviderProps, type Theme } from 'next-themes/dist/types'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

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
