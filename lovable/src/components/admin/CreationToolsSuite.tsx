
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Hammer, Coins, Globe, Gamepad2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export function CreationToolsSuite() {
  const [activeTools, setActiveTools] = useState({
    landscapeBuilder: true,
    coinCrafter: true,
    nftCreator: true,
    weaponsDesigner: false,
    worldBuilder: true,
    artGenerator: true
  })

  const toggleTool = (tool: keyof typeof activeTools) => {
    setActiveTools(prev => ({ ...prev, [tool]: !prev[tool] }))
    
    const toolNames = {
      landscapeBuilder: 'Landscape Builder Master',
      coinCrafter: 'Coin Crafter Pro',
      nftCreator: 'Living NFT Creator',
      weaponsDesigner: '3D Weapons Designer',
      worldBuilder: 'Virtual World Builder',
      artGenerator: 'AI Art Generator'
    }
    
    toast.success(`${toolNames[tool]} ${activeTools[tool] ? 'Disabled' : 'Activated'}!`)
  }

  const tools = [
    {
      key: 'landscapeBuilder',
      name: 'Landscape Builder Master',
      icon: Globe,
      description: 'Ultimate world creation with age groups (0-12, 13-16, 17-22, 23+)',
      color: 'green',
      features: ['Age-based environments', 'Dynamic weather', 'Interactive elements', 'Multiplayer support']
    },
    {
      key: 'coinCrafter',
      name: 'Coin Crafter Pro',
      icon: Coins,
      description: 'Advanced token creation with metallic robot automation',
      color: 'yellow',
      features: ['1000 coins daily', 'Metallic robot system', 'Auto-burn mechanism', 'Market integration']
    },
    {
      key: 'nftCreator',
      name: 'Living NFT Creator',
      icon: Sparkles,
      description: 'Create movie-like NFTs with emotions and personalities',
      color: 'purple',
      features: ['Emotional AI', 'Walkable characters', 'Living animations', 'Personality traits']
    },
    {
      key: 'weaponsDesigner',
      name: '3D Weapons Designer',
      icon: Hammer,
      description: 'Enhanced tools & weapons making system for gaming',
      color: 'red',
      features: ['3D modeling', 'Physics simulation', 'Game integration', 'Combat testing']
    },
    {
      key: 'worldBuilder',
      name: 'Virtual World Builder',
      icon: Gamepad2,
      description: 'Create immersive virtual worlds and experiences',
      color: 'blue',
      features: ['Physics engine', 'Lighting system', 'Terrain tools', 'Asset library']
    },
    {
      key: 'artGenerator',
      name: 'AI Art Generator',
      icon: Palette,
      description: 'Generate impressive visual designs for NFT projects',
      color: 'pink',
      features: ['AI-powered', 'Style transfer', 'Batch generation', 'NFT optimization']
    }
  ]

  return (
    <div className="space-y-6">
      {/* Tools Overview */}
      <Card className="border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-6 w-6" />
            🎨 CREATION TOOLS MASTER SUITE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-purple-400">
              {Object.values(activeTools).filter(Boolean).length} / {Object.keys(activeTools).length}
            </div>
            <div className="text-sm text-muted-foreground">Active Creation Tools</div>
            <Badge className="bg-purple-600 text-white">
              MASTER CREATOR MODE
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = activeTools[tool.key as keyof typeof activeTools]

          return (
            <Card key={tool.key} className={`border-${tool.color}-500/30 bg-gradient-to-br from-${tool.color}-900/20 to-black/50 transition-all duration-300 ${isActive ? 'scale-105 shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 text-${tool.color}-400`}>
                  <Icon className="h-6 w-6" />
                  {tool.name}
                  <Badge className={isActive ? `bg-${tool.color}-600` : 'bg-gray-600'}>
                    {isActive ? 'ACTIVE' : 'INACTIVE'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{tool.description}</p>
                
                <div className="space-y-2">
                  <h4 className={`font-semibold text-${tool.color}-400 text-sm`}>Key Features:</h4>
                  <ul className="space-y-1">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className={`text-${tool.color}-400`}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => toggleTool(tool.key as keyof typeof activeTools)}
                  className={`w-full ${isActive ? 'bg-red-600 hover:bg-red-700' : `bg-${tool.color}-600 hover:bg-${tool.color}-700`}`}
                >
                  {isActive ? 'Disable Tool' : 'Activate Tool'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Master Activation */}
      <Button 
        onClick={() => {
          setActiveTools({
            landscapeBuilder: true,
            coinCrafter: true,
            nftCreator: true,
            weaponsDesigner: true,
            worldBuilder: true,
            artGenerator: true
          })
          toast.success('🎨 ALL CREATION TOOLS ACTIVATED!', {
            description: 'Master Creator Mode - All tools are now active',
            duration: 8000
          })
        }}
        className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-8"
      >
        <Sparkles className="h-6 w-6 mr-3" />
        🎨 ACTIVATE ALL CREATION TOOLS - MASTER CREATOR MODE
      </Button>
    </div>
  )
}
