
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Crown, 
  Shield, 
  Zap, 
  Brain,
  Globe, 
  Cpu,
  Target,
  Sparkles,
  Lock,
  Activity
} from 'lucide-react'

export function EnhancedAdminMenu() {
  const [activeSection, setActiveSection] = useState('overview')

  const adminSections = [
    { id: 'overview', label: '🌟 System Overview', icon: Crown, color: 'from-purple-600 to-blue-600' },
    { id: 'blockchain', label: '⛓️ Private Blockchain', icon: Shield, color: 'from-blue-600 to-cyan-600' },
    { id: 'defense', label: '🐉 Defense Army', icon: Target, color: 'from-red-600 to-orange-600' },
    { id: 'search', label: '🔍 Search & Track', icon: Globe, color: 'from-green-600 to-emerald-600' },
    { id: 'entertainment', label: '🎭 Shows & Rewards', icon: Sparkles, color: 'from-yellow-600 to-orange-600' },
    { id: 'ai-engine', label: '🧠 AI Engine', icon: Brain, color: 'from-purple-600 to-pink-600' }
  ]

  return (
    <div className="space-y-6">
      {/* Main Control Center Header */}
      <Card className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-green-900/40 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
            🌌 GAIA ENHANCED ADMIN CONTROL CENTER
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-purple-400 font-bold">
              🛡️ PRIVATE BLOCKCHAIN • 🐉 DEFENSE ARMY • 🧠 EXCLUSIVE AI ENGINE
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-red-600 animate-pulse">QUANTUM SECURE</Badge>
              <Badge className="bg-blue-600 animate-pulse">BLOCKCHAIN ACTIVE</Badge>
              <Badge className="bg-green-600 animate-pulse">CREATURES DEFENDING</Badge>
              <Badge className="bg-purple-600 animate-pulse">AI ENGINE ONLINE</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Section Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {adminSections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          
          return (
            <Button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`h-24 flex flex-col gap-2 transition-all duration-300 ${
                isActive 
                  ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-105`
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:scale-102'
              }`}
            >
              <Icon className="h-8 w-8" />
              <span className="text-sm font-bold">{section.label}</span>
            </Button>
          )
        })}
      </div>

      {/* System Status Dashboard */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center">
            ⚡ GAIA SYSTEM STATUS - ALL SYSTEMS ENHANCED
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">247</div>
              <div className="text-xs text-muted-foreground">Blockchain Nodes</div>
            </div>
            <div className="p-3 bg-red-900/30 rounded-lg border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">1,847</div>
              <div className="text-xs text-muted-foreground">Defense Creatures</div>
            </div>
            <div className="p-3 bg-green-900/30 rounded-lg border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">12</div>
              <div className="text-xs text-muted-foreground">Search Engines</div>
            </div>
            <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-xs text-muted-foreground">AI Processing Power</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Engine Spotlight */}
      <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-pink-900/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-400">
            <Brain className="h-8 w-8 animate-pulse" />
            🧠 EXCLUSIVE AI ENGINE - ADMIN ONLY ACCESS
            <Badge className="bg-purple-600 animate-pulse">IP LOCKED</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Cpu className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="font-bold text-purple-400">Parabolic AI</div>
              <div className="text-xs text-muted-foreground">Quantum Thinking</div>
            </div>
            <div className="text-center p-4 bg-pink-900/30 rounded-lg border border-pink-500/30">
              <Activity className="h-8 w-8 mx-auto text-pink-400 mb-2" />
              <div className="font-bold text-pink-400">Autonomous</div>
              <div className="text-xs text-muted-foreground">Self-Improving</div>
            </div>
            <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <Lock className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="font-bold text-red-400">Godfather Mode</div>
              <div className="text-xs text-muted-foreground">Ultimate Control</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
