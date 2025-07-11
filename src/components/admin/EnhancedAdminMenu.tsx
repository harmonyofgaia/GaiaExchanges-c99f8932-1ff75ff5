
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Crown, 
  Zap, 
  Search, 
  Eye, 
  Palette, 
  Vault,
  Gamepad2,
  Users,
  Coins,
  Network,
  Bot,
  Target,
  Gift,
  Truck,
  Music
} from 'lucide-react'

export function EnhancedAdminMenu() {
  const [activeSection, setActiveSection] = useState('overview')

  const adminSections = [
    { id: 'overview', label: '🌟 System Overview', icon: Crown },
    { id: 'blockchain', label: '⛓️ Private Blockchain', icon: Network },
    { id: 'creatures', label: '🦖 Defense Army', icon: Shield },
    { id: 'monkeys', label: '🐒 Training Monkeys', icon: Bot },
    { id: 'avatars', label: '👤 Avatar System', icon: Users },
    { id: 'search', label: '🔍 Search Engines', icon: Search },
    { id: 'tracking', label: '📊 Track & Trace', icon: Eye },
    { id: 'shows', label: '🎬 Artist Shows', icon: Music },
    { id: 'vault', label: '🏦 Community Vault', icon: Vault },
    { id: 'fees', label: '💰 Fee Management', icon: Coins },
    { id: 'ai-engine', label: '🤖 AI Engine', icon: Zap },
    { id: 'rewards', label: '🎁 Reward System', icon: Gift }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
            🌍 GAIA MASTER ADMIN CONTROL CENTER
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-purple-400 font-bold">
              🛡️ PRIVATE BLOCKCHAIN • 🐒 AI CREATURES • ⚡ QUANTUM POWER
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-green-600 animate-pulse">BLOCKCHAIN ACTIVE</Badge>
              <Badge className="bg-blue-600 animate-pulse">DEFENSE ARMY READY</Badge>
              <Badge className="bg-purple-600 animate-pulse">AI ENHANCED</Badge>
              <Badge className="bg-orange-600 animate-pulse">FULL CONTROL</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Grid */}
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="text-blue-400">🎛️ System Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {adminSections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              
              return (
                <Button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`h-20 flex flex-col gap-2 ${
                    isActive
                      ? 'bg-purple-600 text-white border-2 border-purple-400'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:border-purple-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium text-center">{section.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* System Status Overview */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">📊 Live System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-green-900/30 rounded-lg border border-green-500/20">
              <Network className="h-6 w-6 text-green-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-green-400">ACTIVE</div>
              <div className="text-xs text-muted-foreground">Blockchain</div>
            </div>
            
            <div className="text-center p-3 bg-blue-900/30 rounded-lg border border-blue-500/20">
              <Shield className="h-6 w-6 text-blue-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-400">247</div>
              <div className="text-xs text-muted-foreground">Defenders</div>
            </div>
            
            <div className="text-center p-3 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <Bot className="h-6 w-6 text-purple-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-purple-400">7/7</div>
              <div className="text-xs text-muted-foreground">AI Monkeys</div>
            </div>
            
            <div className="text-center p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/20">
              <Users className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-yellow-400">∞</div>
              <div className="text-xs text-muted-foreground">Avatars</div>
            </div>
            
            <div className="text-center p-3 bg-orange-900/30 rounded-lg border border-orange-500/20">
              <Search className="h-6 w-6 text-orange-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-orange-400">12</div>
              <div className="text-xs text-muted-foreground">Search Engines</div>
            </div>
            
            <div className="text-center p-3 bg-red-900/30 rounded-lg border border-red-500/20">
              <Vault className="h-6 w-6 text-red-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-red-400">$2.4M</div>
              <div className="text-xs text-muted-foreground">Vault Balance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Area - This will show different content based on activeSection */}
      <Card className="border-cyan-500/30 bg-cyan-900/20">
        <CardHeader>
          <CardTitle className="text-cyan-400">
            {adminSections.find(s => s.id === activeSection)?.label} Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[400px]">
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/20">
                  <h3 className="text-lg font-bold text-green-400 mb-2">🔗 Private Blockchain Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Network:</span>
                      <Badge className="bg-green-600">OPERATIONAL</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Nodes:</span>
                      <span className="text-green-400">247 Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TPS:</span>
                      <span className="text-blue-400">50,000+</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg border border-purple-500/20">
                  <h3 className="text-lg font-bold text-purple-400 mb-2">🤖 AI Enhancement Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>AI Engine:</span>
                      <Badge className="bg-purple-600">ENHANCED</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Learning Rate:</span>
                      <span className="text-purple-400">MAXIMUM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Sources:</span>
                      <span className="text-pink-400">GLOBAL</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  🌟 GAIA MASTER SYSTEM ACTIVE
                </h3>
                <p className="text-muted-foreground">
                  All systems operational • Private blockchain running • AI enhanced • Full admin control active
                </p>
              </div>
            </div>
          )}
          
          {activeSection !== 'overview' && (
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                {adminSections.find(s => s.id === activeSection)?.label} Module
              </h3>
              <p className="text-muted-foreground mb-4">
                This advanced control panel is being loaded...
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Initialize {adminSections.find(s => s.id === activeSection)?.label}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-yellow-500/30 bg-yellow-900/20">
        <CardHeader>
          <CardTitle className="text-yellow-400">⚡ Quick Admin Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-green-600 hover:bg-green-700 h-16 flex flex-col gap-1">
              <Shield className="h-5 w-5" />
              <span className="text-xs">Deploy Defense</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex flex-col gap-1">
              <Bot className="h-5 w-5" />
              <span className="text-xs">Train Monkeys</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex flex-col gap-1">
              <Vault className="h-5 w-5" />
              <span className="text-xs">Manage Vault</span>
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 h-16 flex flex-col gap-1">
              <Zap className="h-5 w-5" />
              <span className="text-xs">AI Boost</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
