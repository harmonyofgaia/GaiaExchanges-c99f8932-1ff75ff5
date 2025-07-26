import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Lock, 
  Unlock, 
  Palette, 
  Sun, 
  Moon, 
  Monitor, 
  Binary 
} from 'lucide-react';
import { useTheme, type ThemeOption } from '@/contexts/ThemeContext';

export function VisualDesignControls() {
  const { isLocked, currentTheme, toggleLock, setTheme } = useTheme();

  const themes: { name: ThemeOption; icon: React.ReactNode; description: string; color: string }[] = [
    {
      name: 'Normal',
      icon: <Monitor className="h-4 w-4" />,
      description: 'Default GAIA theme with green accents',
      color: 'from-gray-600 to-green-600'
    },
    {
      name: 'Light',
      icon: <Sun className="h-4 w-4" />,
      description: 'Clean light theme for daytime use',
      color: 'from-gray-100 to-green-100'
    },
    {
      name: 'Dark',
      icon: <Moon className="h-4 w-4" />,
      description: 'Pure dark theme for focused viewing',
      color: 'from-gray-800 to-black'
    },
    {
      name: 'Matrix',
      icon: <Binary className="h-4 w-4" />,
      description: 'Cyberpunk green matrix aesthetic',
      color: 'from-black to-green-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
      {/* Lock Visual Design Control */}
      <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            {isLocked ? <Lock className="h-6 w-6 text-red-400" /> : <Unlock className="h-6 w-6 text-green-400" />}
            Visual Design Lock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {isLocked 
                ? "Visual design is currently locked. Theme changes are disabled across all pages."
                : "Visual design is unlocked. You can change themes and customize the appearance."
              }
            </p>
            
            {isLocked && (
              <Badge variant="destructive" className="mb-4">
                <Lock className="h-3 w-3 mr-1" />
                Design Locked
              </Badge>
            )}
            
            <Button
              onClick={toggleLock}
              className={`w-full ${
                isLocked 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isLocked ? (
                <>
                  <Unlock className="h-4 w-4 mr-2" />
                  Unlock Visual Design
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Lock Visual Design
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Theme Selection Control */}
      <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Palette className="h-6 w-6 text-purple-400" />
            Change Visual Design
            {isLocked && <Lock className="h-4 w-4 text-red-400 ml-auto" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground mb-4">
              {isLocked 
                ? "Theme selection is disabled while design is locked."
                : "Choose from available themes to customize your experience."
              }
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <Button
                  key={theme.name}
                  onClick={() => setTheme(theme.name)}
                  disabled={isLocked}
                  variant={currentTheme === theme.name ? "default" : "outline"}
                  className={`h-auto p-3 flex flex-col items-start gap-2 relative ${
                    currentTheme === theme.name
                      ? `bg-gradient-to-r ${theme.color} text-white border-2 border-white/50`
                      : isLocked
                      ? 'opacity-50 cursor-not-allowed border-gray-600'
                      : 'border-gray-600 hover:border-gray-500 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    {theme.icon}
                    <span className="font-medium">{theme.name}</span>
                    {currentTheme === theme.name && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs opacity-80 text-left">
                    {theme.description}
                  </span>
                </Button>
              ))}
            </div>
            
            {isLocked && (
              <div className="text-center pt-2">
                <Badge variant="outline" className="border-red-500/50 text-red-400">
                  <Lock className="h-3 w-3 mr-1" />
                  Unlock design to change themes
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}