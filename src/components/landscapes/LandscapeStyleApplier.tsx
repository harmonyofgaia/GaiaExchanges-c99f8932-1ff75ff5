import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Palette, 
  Wand2, 
  Sparkles, 
  Eye, 
  Settings,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'
import { useGlobalBackground } from '@/hooks/useGlobalBackground'

interface LandscapeStyle {
  id: string
  name: string
  description: string
  color: string
  cssVars: Record<string, string>
  effects: string[]
  difficulty: string
}

interface StyleApplierProps {
  onStyleApplied?: (style: LandscapeStyle) => void
}

export function LandscapeStyleApplier({ onStyleApplied }: StyleApplierProps) {
  const { backgroundStyle, changeBackground } = useGlobalBackground()
  const [applyToInterface, setApplyToInterface] = useState(false)
  const [applyToTools, setApplyToTools] = useState(false)
  const [applyToDesigns, setApplyToDesigns] = useState(false)

  const landscapeStyles: LandscapeStyle[] = [
    {
      id: 'underwater-dream',
      name: '🌊 Underwater Dream',
      description: 'Deep ocean blues with flowing currents and bioluminescent accents',
      color: 'from-blue-900 to-cyan-600',
      cssVars: {
        '--primary': '220 100% 50%',
        '--secondary': '190 100% 60%',
        '--accent': '180 100% 70%',
        '--background': '220 50% 5%'
      },
      effects: ['Fluid Animation', 'Wave Distortion', 'Bubble Particles'],
      difficulty: 'Expert'
    },
    {
      id: 'mountain-majesty',
      name: '🏔️ Mountain Majesty',
      description: 'Rocky grays and pristine whites with crystalline clarity',
      color: 'from-gray-800 to-blue-200',
      cssVars: {
        '--primary': '220 20% 60%',
        '--secondary': '210 30% 80%',
        '--accent': '200 50% 90%',
        '--background': '220 10% 10%'
      },
      effects: ['Snow Particle', 'Wind Animation', 'Echo Effects'],
      difficulty: 'Hard'
    },
    {
      id: 'forest-mystique',
      name: '🌲 Forest Mystique', 
      description: 'Deep emerald greens with golden sunlight filtering through',
      color: 'from-green-900 to-yellow-400',
      cssVars: {
        '--primary': '120 60% 40%',
        '--secondary': '60 80% 60%',
        '--accent': '45 100% 70%',
        '--background': '120 40% 8%'
      },
      effects: ['Leaf Fall', 'Light Rays', 'Growth Animation'],
      difficulty: 'Medium'
    },
    {
      id: 'space-odyssey',
      name: '🚀 Space Odyssey',
      description: 'Cosmic purples and stellar whites with nebula effects',
      color: 'from-purple-900 to-indigo-400',
      cssVars: {
        '--primary': '260 80% 60%',
        '--secondary': '280 60% 70%',
        '--accent': '300 80% 80%',
        '--background': '260 50% 5%'
      },
      effects: ['Star Field', 'Nebula Glow', 'Zero-G Float'],
      difficulty: 'Legendary'
    },
    {
      id: 'volcanic-intensity',
      name: '🌋 Volcanic Intensity',
      description: 'Fiery reds and molten oranges with heat distortion',
      color: 'from-red-900 to-orange-500',
      cssVars: {
        '--primary': '15 100% 50%',
        '--secondary': '30 100% 60%',
        '--accent': '45 100% 70%',
        '--background': '15 80% 5%'
      },
      effects: ['Lava Flow', 'Heat Shimmer', 'Ember Particles'],
      difficulty: 'Insane'
    },
    {
      id: 'quantum-realm',
      name: '⚡ Quantum Realm',
      description: 'Reality-bending colors that shift and phase through dimensions',
      color: 'from-purple-600 to-cyan-400',
      cssVars: {
        '--primary': '280 100% 60%',
        '--secondary': '180 100% 50%',
        '--accent': '320 80% 70%',
        '--background': '260 60% 8%'
      },
      effects: ['Reality Distortion', 'Quantum Tunneling', 'Phase Shift'],
      difficulty: 'Impossible'
    }
  ]

  const applyLandscapeStyle = (style: LandscapeStyle) => {
    if (applyToInterface) {
      // Apply to global background
      changeBackground(style.id.split('-')[0] as any)
      
      // Apply CSS variables to document
      Object.entries(style.cssVars).forEach(([property, value]) => {
        document.documentElement.style.setProperty(property, value)
      })
    }

    if (applyToTools || applyToDesigns) {
      // Trigger custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('landscapeStyleApplied', {
        detail: {
          style,
          applyToTools,
          applyToDesigns
        }
      }))
    }

    onStyleApplied?.(style)

    toast.success(`🎨 ${style.name} Applied!`, {
      description: `Style applied to ${[
        applyToInterface && 'interface',
        applyToTools && 'tools',
        applyToDesigns && 'designs'
      ].filter(Boolean).join(', ')}`,
      duration: 4000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-6 w-6" />
            🎨 Landscape Style Applier
          </CardTitle>
          <p className="text-purple-300">
            Apply generated landscape styles to your entire interface, tools, and designs
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div>
                <Label className="text-blue-400 font-medium">Interface Theme</Label>
                <p className="text-xs text-muted-foreground">Colors, backgrounds, UI elements</p>
              </div>
              <Switch 
                checked={applyToInterface}
                onCheckedChange={setApplyToInterface}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div>
                <Label className="text-green-400 font-medium">Building Tools</Label>
                <p className="text-xs text-muted-foreground">Brushes, effects, physics</p>
              </div>
              <Switch 
                checked={applyToTools}
                onCheckedChange={setApplyToTools}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div>
                <Label className="text-orange-400 font-medium">Created Designs</Label>
                <p className="text-xs text-muted-foreground">All environments, projects</p>
              </div>
              <Switch 
                checked={applyToDesigns}
                onCheckedChange={setApplyToDesigns}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {landscapeStyles.map((style) => (
          <Card 
            key={style.id}
            className={`bg-gradient-to-br ${style.color}/20 border-2 border-opacity-50 hover:scale-105 transition-all cursor-pointer`}
          >
            <CardHeader>
              <CardTitle className="text-white text-lg">{style.name}</CardTitle>
              <Badge className={`
                ${style.difficulty === 'Medium' ? 'bg-yellow-600' : 
                  style.difficulty === 'Hard' ? 'bg-orange-600' :
                  style.difficulty === 'Expert' ? 'bg-red-600' :
                  style.difficulty === 'Insane' ? 'bg-red-800' :
                  style.difficulty === 'Legendary' ? 'bg-purple-600' :
                  style.difficulty === 'Impossible' ? 'bg-black' : 'bg-gray-600'}
              `}>
                {style.difficulty}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3 text-sm">{style.description}</p>
              
              <div className="mb-4">
                <h4 className="text-xs font-bold text-white mb-2">Visual Effects:</h4>
                <div className="flex flex-wrap gap-1">
                  {style.effects.map((effect, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => applyLandscapeStyle(style)}
                disabled={!applyToInterface && !applyToTools && !applyToDesigns}
                className={`w-full bg-gradient-to-r ${style.color} hover:opacity-90 text-white font-bold`}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Apply Style
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
        <h4 className="font-medium text-indigo-400 mb-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          🎨 Style Application System
        </h4>
        <div className="text-sm text-indigo-300 space-y-1">
          <div>✅ Real-time visual transformation</div>
          <div>✅ CSS variable injection for interface themes</div>
          <div>✅ Tool behavior modification based on style</div>
          <div>✅ Automatic design template updating</div>
          <div>✅ Cross-component style synchronization</div>
          <div>✅ Persistent style preferences</div>
        </div>
      </div>
    </div>
  )
}