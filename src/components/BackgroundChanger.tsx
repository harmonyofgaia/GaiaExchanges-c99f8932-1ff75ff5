
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Palette, Sparkles, Zap, Eye } from 'lucide-react'
import { updateBackgroundConfig } from '@/components/backgrounds/EnhancedBackgroundManager'

export function BackgroundChanger() {
  const [activeBackground, setActiveBackground] = useState('neural')
  
  const backgroundOptions = [
    {
      id: 'neural',
      name: 'Neural Networks',
      description: 'Electric brain pathways',
      icon: Zap,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/20'
    },
    {
      id: 'matrix',
      name: 'Matrix Rain',
      description: 'Classic digital rain',
      icon: Eye,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    },
    {
      id: 'creative',
      name: 'Creative Flow',
      description: 'Artistic energy waves',
      icon: Sparkles,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20'
    }
  ]

  const handleBackgroundChange = (backgroundId: string) => {
    setActiveBackground(backgroundId)
    
    // Update the background configuration
    const config = {
      type: backgroundId as any,
      intensity: 'medium' as const,
      color: backgroundId === 'neural' ? '#00ffff' : backgroundId === 'matrix' ? '#00ff00' : '#ff00ff',
      speed: 1.5,
      autoGenerate: false
    }
    
    updateBackgroundConfig(config)
    console.log(`🎨 Background changed to: ${backgroundId}`)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="bg-black/80 backdrop-blur-sm border-purple-500/30 w-64">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-400 text-sm">
            <Palette className="h-4 w-4" />
            Background Changer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {backgroundOptions.map((option) => {
            const Icon = option.icon
            const isActive = activeBackground === option.id
            
            return (
              <Button
                key={option.id}
                onClick={() => handleBackgroundChange(option.id)}
                className={`w-full justify-start h-auto p-3 ${
                  isActive 
                    ? `${option.bgColor} border-2 border-current` 
                    : 'bg-gray-900/50 hover:bg-gray-800/50'
                }`}
                variant="ghost"
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon className={`h-5 w-5 ${option.color}`} />
                  <div className="text-left flex-1">
                    <div className={`font-medium text-sm ${option.color}`}>
                      {option.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                  {isActive && (
                    <Badge className="bg-green-600 text-white text-xs">
                      ACTIVE
                    </Badge>
                  )}
                </div>
              </Button>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
