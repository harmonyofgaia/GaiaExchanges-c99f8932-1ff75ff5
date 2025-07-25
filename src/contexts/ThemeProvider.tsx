import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

type Theme = 'light' | 'dark' | 'matrix' | 'old'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark')
  const themes: Theme[] = ['light', 'dark', 'matrix', 'old']

  useEffect(() => {
    // Get theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem('gaia-theme') as Theme
    if (savedTheme && themes.includes(savedTheme)) {
      setCurrentTheme(savedTheme)
    }
    
    // Apply theme to document
    applyTheme(currentTheme)
  }, [])

  const applyTheme = (theme: Theme) => {
    // Remove all theme classes from body
    document.body.classList.remove('light', 'dark', 'matrix', 'old')
    
    // Add current theme class to body
    document.body.classList.add(theme)
    
    // Set data-theme attribute for additional styling hooks
    document.body.setAttribute('data-theme', theme)
    
    // Update document root class for Tailwind dark mode
    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const handleSetTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    localStorage.setItem('gaia-theme', theme)
    applyTheme(theme)
  }

  // Apply theme whenever currentTheme changes
  useEffect(() => {
    applyTheme(currentTheme)
  }, [currentTheme])

  const value = {
    theme: currentTheme,
    setTheme: handleSetTheme,
    themes
  }

  return (
    <ThemeContext.Provider value={value}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        themes={themes}
        value={{
          light: 'light',
          dark: 'dark',
          matrix: 'matrix',
          old: 'old'
        }}
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}