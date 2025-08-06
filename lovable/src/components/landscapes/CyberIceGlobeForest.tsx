
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Mountain, 
  Snowflake, 
  TreePine, 
  Zap, 
  Eye, 
  Crown,
  Rocket,
  Shield
} from 'lucide-react'
import { toast } from 'sonner'

export function CyberIceGlobeForest() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const landscapeSpecs = {
    name: '❄️ Cyber Ice Globe Forest Realm',
    capacity: '1000 TB',
    style: 'Halo × Rage × Cyberpunk Fusion',
    environment: 'Ice Globes + Dense Forests',
    resolution: '8K Ultra HD with 4K Character Support',
    biomes: [
      'Frozen Cyberpunk Cities',
      'Halo-style Floating Platforms',
      'Rage Wasteland Ice Fields',
      'Mystical Forest Sanctuaries',
      'Crystal Ice Globe Chambers'
    ]
  }

  const enterLandscape = async () => {
    setIsLoading(true)
    setLoadingProgress(0)
    
    console.log('🌍 LOADING CYBER ICE GLOBE FOREST REALM')
    console.log('💾 CAPACITY: 1000 TB Ultra-High Quality Data')
    console.log('🎨 STYLE: Halo × Rage × Cyberpunk Fusion')
    console.log('❄️ ENVIRONMENT: Ice Globes + Dense Forests')
    
    // Simulate massive landscape loading
    for (let i = 0; i <= 100; i += 2) {
      setLoadingProgress(i)
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    setIsLoading(false)
    
    toast.success('🌍 Cyber Ice Globe Forest Loaded!', {
      description: '1000 TB landscape with Halo × Rage × Cyberpunk aesthetics',
      duration: 5000
    })
  }

  return (
    <Card className="bg-gradient-to-br from-cyan-900/30 via-blue-900/30 to-purple-900/30 border-2 border-cyan-500/50 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-cyan-400 flex items-center gap-2 text-2xl">
          <Snowflake className="h-8 w-8 animate-spin" />
          {landscapeSpecs.name}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-cyan-600 text-white">
            💾 {landscapeSpecs.capacity}
          </Badge>
          <Badge className="bg-purple-600 text-white">
            🎨 {landscapeSpecs.style}
          </Badge>
          <Badge className="bg-blue-600 text-white">
            ❄️ {landscapeSpecs.environment}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              Landscape Features
            </h3>
            <div className="space-y-2">
              {landscapeSpecs.biomes.map((biome, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-black/30 rounded">
                  <TreePine className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-muted-foreground">{biome}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Technical Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-cyan-900/40 rounded border border-cyan-500/30">
                <div className="text-2xl font-bold text-cyan-400">1000 TB</div>
                <div className="text-xs text-muted-foreground">Max Capacity</div>
              </div>
              <div className="text-center p-3 bg-purple-900/40 rounded border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-400">8K</div>
                <div className="text-xs text-muted-foreground">Ultra HD</div>
              </div>
              <div className="text-center p-3 bg-blue-900/40 rounded border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-400">∞</div>
                <div className="text-xs text-muted-foreground">Possibilities</div>
              </div>
              <div className="text-center p-3 bg-green-900/40 rounded border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-xs text-muted-foreground">Immersion</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Progress */}
        {isLoading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyan-300">Loading Cyber Ice Globe Forest...</span>
              <span className="text-cyan-400">{loadingProgress}%</span>
            </div>
            <Progress value={loadingProgress} className="h-3" />
            <div className="text-xs text-muted-foreground text-center">
              Processing {landscapeSpecs.capacity} of ultra-high quality landscape data...
            </div>
          </div>
        )}

        {/* Enter Landscape Button */}
        <Button 
          onClick={enterLandscape}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-lg py-6"
        >
          {isLoading ? (
            <>
              <Zap className="h-5 w-5 mr-2 animate-spin" />
              Loading Landscape...
            </>
          ) : (
            <>
              <Rocket className="h-5 w-5 mr-2" />
              🌍 ENTER CYBER ICE GLOBE FOREST
            </>
          )}
        </Button>

        {/* Preview Area */}
        <div className="relative h-64 bg-gradient-to-br from-cyan-900/50 to-purple-900/50 rounded-lg overflow-hidden border border-cyan-500/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">❄️🌲🏙️</div>
              <div className="text-2xl font-bold text-cyan-400 mb-2">
                CYBER ICE GLOBE FOREST
              </div>
              <div className="text-lg text-purple-400 animate-pulse">
                Halo × Rage × Cyberpunk • 1000 TB Capacity
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
