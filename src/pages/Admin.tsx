
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UltimateAdminSuite } from '@/components/admin/UltimateAdminSuite'
import { DragonAIDefense } from '@/components/admin/DragonAIDefense'
import { KoalaAIEngine } from '@/components/admin/KoalaAIEngine'
import { UltimateIntelligenceHub } from '@/components/admin/UltimateIntelligenceHub'
import { AdminMediaLibrary } from '@/components/admin/AdminMediaLibrary'
import { WalletEngineAdmin } from '@/components/admin/WalletEngineAdmin'
import { TokenBurnController } from '@/components/admin/TokenBurnController'
import { GitHubIntegrationSuite } from '@/components/system/GitHubIntegrationSuite'
import { NotificationController } from '@/components/admin/NotificationController'
import { PsychohistoricalEngine } from '@/components/admin/PsychohistoricalEngine'
import { PhoenixGuardian } from '@/components/admin/PhoenixGuardian'
import { InvisibleDefenseSystem } from '@/components/admin/InvisibleDefenseSystem'
import { GaiaTokenEarningHub } from '@/components/admin/GaiaTokenEarningHub'
import { ComprehensiveTaskManager } from '@/components/admin/ComprehensiveTaskManager'
import { IAEngineInterfacialArt } from '@/components/admin/IAEngineInterfacialArt'
import { InvisibleDefenseCreatures } from '@/components/admin/InvisibleDefenseCreatures'

export default function Admin() {
  const [activeSection, setActiveSection] = useState('overview')

  const adminSections = [
    { id: 'overview', label: 'Control Center', icon: '🏠', color: 'from-blue-500 to-cyan-500' },
    { id: 'ia-engine', label: 'IA Engine', icon: '🧠', color: 'from-purple-500 to-blue-500' },
    { id: 'invisible-creatures', label: 'Defense Creatures', icon: '👻', color: 'from-gray-500 to-purple-500' },
    { id: 'tasks', label: 'Task Manager', icon: '📋', color: 'from-green-500 to-emerald-500' },
    { id: 'earning', label: 'Token Earning', icon: '🌍', color: 'from-yellow-500 to-orange-500' },
    { id: 'defense', label: 'Defense Systems', icon: '🛡️', color: 'from-red-500 to-pink-500' },
    { id: 'intelligence', label: 'Intelligence Hub', icon: '🧠', color: 'from-indigo-500 to-purple-500' },
    { id: 'media', label: 'Media Library', icon: '📸', color: 'from-teal-500 to-cyan-500' },
    { id: 'wallets', label: 'Wallet Engine', icon: '💰', color: 'from-amber-500 to-yellow-500' },
    { id: 'tokens', label: 'Token Control', icon: '🔥', color: 'from-orange-500 to-red-500' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', color: 'from-blue-500 to-indigo-500' },
    { id: 'github', label: 'GitHub Suite', icon: '📱', color: 'from-gray-500 to-slate-500' },
    { id: 'psycho', label: 'Psychohistory', icon: '🔮', color: 'from-violet-500 to-purple-500' },
    { id: 'phoenix', label: 'Phoenix Guardian', icon: '🦅', color: 'from-rose-500 to-pink-500' },
    { id: 'koala', label: 'Koala AI', icon: '🐨', color: 'from-green-500 to-teal-500' },
    { id: 'dragon', label: 'Dragon AI', icon: '🐉', color: 'from-red-500 to-orange-500' }
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview': return <UltimateAdminSuite />
      case 'ia-engine': return <IAEngineInterfacialArt />
      case 'invisible-creatures': return <InvisibleDefenseCreatures />
      case 'tasks': return <ComprehensiveTaskManager />
      case 'earning': return <GaiaTokenEarningHub />
      case 'defense': return <InvisibleDefenseSystem />
      case 'intelligence': return <UltimateIntelligenceHub />
      case 'media': return <AdminMediaLibrary />
      case 'wallets': return <WalletEngineAdmin />
      case 'tokens': return <TokenBurnController />
      case 'notifications': return <NotificationController />
      case 'github': return <GitHubIntegrationSuite />
      case 'psycho': return <PsychohistoricalEngine />
      case 'phoenix': return <PhoenixGuardian />
      case 'koala': return <KoalaAIEngine />
      case 'dragon': return <DragonAIDefense />
      default: return <UltimateAdminSuite />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-black">
      <div className="container mx-auto p-4 space-y-6 max-w-full overflow-x-hidden">
        {/* Master Header */}
        <Card className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-green-900/40 border-4 border-purple-500/50 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
              👑 GAiA SUPREME ADMIN CONTROL CENTER
            </CardTitle>
            <div className="flex justify-center gap-2 flex-wrap mt-4">
              <Badge className="bg-purple-600 animate-pulse text-lg px-4 py-2">IA ENGINE SUPREME</Badge>
              <Badge className="bg-red-600 animate-pulse text-lg px-4 py-2">INVISIBLE DEFENSE</Badge>
              <Badge className="bg-blue-600 animate-pulse text-lg px-4 py-2">QUANTUM MATRIX</Badge>
              <Badge className="bg-green-600 animate-pulse text-lg px-4 py-2">GLOBAL DOMINANCE</Badge>
            </div>
            <div className="text-xl text-purple-400 font-bold mt-2">
              🧠 AI Engine Control • 👻 Invisible Creatures • 🕷️ Matrix Traps • 🛡️ Quantum Defense
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced Top Navigation Menu */}
        <Card className="border-blue-500/30 bg-blue-900/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-400 text-center text-2xl">
              🎛️ MASTER ADMIN NAVIGATION CONSOLE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {adminSections.map((section) => {
                const isActive = activeSection === section.id
                
                return (
                  <Button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`h-20 flex flex-col gap-1 text-xs transition-all transform hover:scale-105 ${
                      isActive
                        ? `bg-gradient-to-r ${section.color} text-white border-2 border-white/50 shadow-lg`
                        : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-600/30'
                    }`}
                  >
                    <span className="text-2xl">{section.icon}</span>
                    <span className="font-medium leading-tight text-center">{section.label}</span>
                    {isActive && (
                      <div className="w-full h-1 bg-white/50 rounded-full mt-1"></div>
                    )}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Active Section Content */}
        <div className="space-y-6">
          {renderActiveSection()}
        </div>

        {/* Enhanced System Status Footer */}
        <Card className="border-green-500/30 bg-green-900/20 shadow-xl">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              <div className="p-4 bg-green-900/30 rounded-lg">
                <div className="text-3xl font-bold text-green-400">100%</div>
                <div className="text-xs text-muted-foreground">System Health</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <div className="text-3xl font-bold text-blue-400">∞</div>
                <div className="text-xs text-muted-foreground">IA Engine Power</div>
              </div>
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <div className="text-3xl font-bold text-purple-400">SUPREME</div>
                <div className="text-xs text-muted-foreground">Defense Level</div>
              </div>
              <div className="p-4 bg-gray-900/30 rounded-lg">
                <div className="text-3xl font-bold text-gray-400">INVISIBLE</div>
                <div className="text-xs text-muted-foreground">Stealth Mode</div>
              </div>
              <div className="p-4 bg-yellow-900/30 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400">GALAXY</div>
                <div className="text-xs text-muted-foreground">Coverage Active</div>
              </div>
              <div className="p-4 bg-pink-900/30 rounded-lg">
                <div className="text-3xl font-bold text-pink-400">GODFATHER</div>
                <div className="text-xs text-muted-foreground">Admin Authority</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
