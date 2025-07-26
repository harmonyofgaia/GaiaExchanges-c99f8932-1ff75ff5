import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge'
import { Palette, Lock, Unlock, Check } from 'lucide-react'
import { AVAILABLE_THEMES, type ThemeName, useLock } from '@/components/providers/ThemeProvider'
import { toast } from 'sonner'

export function ThemeSelector() {
  const { theme: currentTheme, setTheme } = useTheme()
  const { isLocked, toggleLock } = useLock()
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = (themeName: string) => {
    if (isLocked) {
      toast.error('UI is locked. Unlock to change themes.', {
        description: 'Click the lock button to enable theme changes.',
        duration: 3000
      })
      return
    }
    
    setTheme(themeName)
    setIsOpen(false)
    toast.success(`Theme changed to ${AVAILABLE_THEMES[themeName as ThemeName]?.name || themeName}`, {
      description: AVAILABLE_THEMES[themeName as ThemeName]?.description || 'Theme applied successfully',
      duration: 2000
    })
  }

  const handleLockToggle = () => {
    toggleLock()
    toast.success(isLocked ? 'UI unlocked' : 'UI locked', {
      description: isLocked 
        ? 'Theme and layout changes are now allowed' 
        : 'Theme and layout changes are now protected',
      duration: 2000
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg border-2 border-green-400/30 backdrop-blur-sm"
            title="Theme Settings"
          >
            <Palette className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          align="end" 
          side="top"
          className="w-72 bg-background/95 border-primary/30 backdrop-blur-sm"
        >
          <DropdownMenuLabel className="text-primary font-semibold">
            🎨 Theme Settings
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator className="bg-primary/30" />
          
          {/* Lock Toggle */}
          <DropdownMenuItem 
            onClick={handleLockToggle}
            className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                <span>{isLocked ? 'UI Locked' : 'UI Unlocked'}</span>
              </div>
              <Badge variant={isLocked ? 'destructive' : 'secondary'} className="text-xs">
                {isLocked ? 'Protected' : 'Editable'}
              </Badge>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-[var(--separator-color)]" />
          
          <DropdownMenuLabel className="text-gray-400 text-sm">
            Available Themes
          </DropdownMenuLabel>
          
          {/* Theme Options */}
          {Object.entries(AVAILABLE_THEMES).map(([key, themeInfo]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleThemeChange(key)}
              className={`text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer ${
                isLocked ? 'opacity-60' : ''
              }`}
              disabled={isLocked}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{themeInfo.icon}</span>
                  <div>
                    <div className="font-medium">{themeInfo.name}</div>
                    <div className="text-xs text-gray-400">{themeInfo.description}</div>
                  </div>
                </div>
                {currentTheme === key && (
                  <Check className="h-4 w-4 text-green-400" />
                )}
              </div>
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator className="bg-green-500/30" />
          
          <div className="px-2 py-1 text-xs text-gray-500">
            Current: {AVAILABLE_THEMES[currentTheme as ThemeName]?.name || currentTheme}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}