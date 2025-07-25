import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/ThemeProvider'
import { 
  Sun, 
  Moon, 
  Monitor, 
  Clock,
  Palette
} from 'lucide-react'

const themeIcons = {
  light: Sun,
  dark: Moon,
  matrix: Monitor,
  old: Clock,
}

const themeLabels = {
  light: 'Light',
  dark: 'Dark', 
  matrix: 'Matrix',
  old: 'Classic',
}

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const CurrentIcon = themeIcons[theme]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="border-white/20 hover:bg-white/10 text-white"
        >
          <CurrentIcon className="h-4 w-4 mr-2" />
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-black/90 backdrop-blur-sm border-gray-700/50"
      >
        {themes.map((themeOption) => {
          const Icon = themeIcons[themeOption]
          return (
            <DropdownMenuItem
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className="text-white hover:bg-white/10 cursor-pointer flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {themeLabels[themeOption]}
              {theme === themeOption && (
                <span className="ml-auto text-green-400">✓</span>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}