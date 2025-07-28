
import { createContext, useContext, useState, ReactNode } from 'react'

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
