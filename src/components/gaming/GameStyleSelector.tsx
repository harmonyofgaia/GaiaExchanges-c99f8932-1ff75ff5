
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Star, Sparkles } from 'lucide-react'

export function GameStyleSelector() {
  const styles = [
    {
      name: 'Classic',
      description: 'Traditional gaming experience',
      color: 'from-blue-600 to-cyan-600',
      popularity: '4.8/5'
    },
    {
      name: 'Neon',
      description: 'Futuristic cyberpunk aesthetic',
      color: 'from-purple-600 to-pink-600',
      popularity: '4.9/5'
    },
    {
      name: 'Nature',
      description: 'Environmental and organic themes',
      color: 'from-green-600 to-teal-600',
      popularity: '4.7/5'
    },
    {
      name: 'Retro',
      description: 'Nostalgic pixel art style',
      color: 'from-yellow-600 to-orange-600',
      popularity: '4.6/5'
    }
  ]

  return (
    <Card className="border-green-500/30 bg-green-900/20">
      <CardHeader>
        <CardTitle className="text-green-400">🎨 Game Style Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {styles.map((style, index) => (
            <div key={index} className={`p-4 bg-gradient-to-br ${style.color}/20 rounded-lg border border-opacity-50`}>
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                {style.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">{style.description}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">{style.popularity}</span>
                </div>
                <Badge className={`bg-gradient-to-r ${style.color}`}>
                  Popular
                </Badge>
              </div>
              <Button className={`w-full bg-gradient-to-r ${style.color} hover:opacity-90 text-white font-bold`}>
                <Sparkles className="h-4 w-4 mr-2" />
                Apply Style
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
