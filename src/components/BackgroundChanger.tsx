
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Sparkles } from 'lucide-react'
import { useGlobalBackground } from '@/hooks/useGlobalBackground'

type BackgroundStyle = 'classic' | 'plasma' | 'galaxy' | 'forest' | 'ocean' | 'fire' | 'ice' | 'void' | 'rainbow' | 'matrix'

export function BackgroundChanger() {
  const { backgroundStyle, changeBackground } = useGlobalBackground()
  const [isOpen, setIsOpen] = useState(false)

  const backgrounds: { key: BackgroundStyle; name: string; emoji: string; colors: string }[] = [
    { key: 'classic', name: 'Classic', emoji: '🌟', colors: 'from-blue-900/20 to-purple-900/20' },
    { key: 'plasma', name: 'Plasma', emoji: '🌈', colors: 'from-pink-500/20 via-purple-500/20 to-cyan-500/20' },
    { key: 'galaxy', name: 'Galaxy', emoji: '🌌', colors: 'from-indigo-900/30 via-purple-900/30 to-pink-900/30' },
    { key: 'forest', name: 'Forest', emoji: '🌲', colors: 'from-green-900/20 to-emerald-900/20' },
    { key: 'ocean', name: 'Ocean', emoji: '🌊', colors: 'from-cyan-900/20 to-blue-900/20' },
    { key: 'fire', name: 'Fire', emoji: '🔥', colors: 'from-red-900/20 via-orange-900/20 to-yellow-900/20' },
    { key: 'ice', name: 'Ice', emoji: '❄️', colors: 'from-cyan-200/10 to-blue-200/10' },
    { key: 'void', name: 'Void', emoji: '🕳️', colors: 'from-gray-900/30 to-black/30' },
    { key: 'rainbow', name: 'Rainbow', emoji: '🌈', colors: 'from-red-500/10 via-yellow-500/10 via-green-500/10 via-blue-500/10 to-purple-500/10' },
    { key: 'matrix', name: 'Matrix', emoji: '💚', colors: 'from-green-900/20 to-black/20' }
  ]

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Palette className="h-5 w-5" />
          🎨 Background Changer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Current: <span className="font-bold text-primary">{backgrounds.find(b => b.key === backgroundStyle)?.name || 'Classic'}</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {backgrounds.map((bg) => (
              <Button
                key={bg.key}
                variant={backgroundStyle === bg.key ? "default" : "outline"}
                size="sm"
                onClick={() => changeBackground(bg.key)}
                className={`flex flex-col items-center gap-1 h-auto py-3 ${
                  backgroundStyle === bg.key ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-lg">{bg.emoji}</div>
                <div className="text-xs">{bg.name}</div>
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Changes apply globally across all pages</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
