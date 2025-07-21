
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
import { ComprehensiveInnovationHub } from '@/components/system/ComprehensiveInnovationHub'

export default function Admin() {
  const [activeSection, setActiveSection] = useState('overview')

  const adminSections = [
    { id: 'overview', label: 'Control Center', icon: '🏠' },
    { id: 'ia-engine', label: 'IA Engine', icon: '🔥', special: true },
    { id: 'defense-creatures', label: 'Defense Creatures', icon: '👻', special: true },
    { id: 'innovation-hub', label: 'Innovation Hub', icon: '🌍', special: true },
    { id: 'tasks', label: 'Task Manager', icon: '📋' },
    { id: 'earning', label: 'Token Earning', icon: '🌍' },
    { id: 'defense', label: 'Defense Systems', icon: '🛡️' },
    { id: 'intelligence', label: 'Intelligence Hub', icon: '🧠' },
    { id: 'media', label: 'Media Library', icon: '📸' },
    { id: 'wallets', label: 'Wallet Engine', icon: '💰' },
    { id: 'tokens', label: 'Token Control', icon: '🔥' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'github', label: 'GitHub Suite', icon: '📱' },
    { id: 'psycho', label: 'Psychohistory', icon: '🔮' },
    { id: 'phoenix', label: 'Phoenix Guardian', icon: '🦅' },
    { id: 'koala', label: 'Koala AI', icon: '🐨' },
    { id: 'dragon', label: 'Dragon AI', icon: '🐉' }
  ]

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview': return <UltimateAdminSuite />
      case 'ia-engine': return <IAEngineInterfacialArt />
      case 'defense-creatures': return <InvisibleDefenseCreatures />
      case 'innovation-hub': return <ComprehensiveInnovationHub />
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
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-green-900/40 border-2 border-purple-500/50">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
              🚀 GAiA ADMIN CONTROL CENTER
            </CardTitle>
            <div className="text-xl text-purple-300 font-bold mb-4">
              🔥 IA ENGINE • 👻 INVISIBLE DEFENSE • 🌍 INNOVATION HUB • 🛡️ SUPREME CONTROL
            </div>
            <div className="flex justify-center gap-2 flex-wrap mt-4">
              <Badge className="bg-red-600 animate-pulse">MAXIMUM SECURITY</Badge>
              <Badge className="bg-blue-600 animate-pulse">QUANTUM ACTIVE</Badge>
              <Badge className="bg-green-600 animate-pulse">DRAGON PROTECTION</Badge>
              <Badge className="bg-purple-600 animate-pulse">AI ENGINE SUPREME</Badge>
              <Badge className="bg-orange-600 animate-pulse">INVISIBLE OPERATION</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced Navigation with Special Sections */}
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-17 gap-2">
              {adminSections.map((section) => (
                <Button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  variant={activeSection === section.id ? "default" : "outline"}
                  className={`h-20 flex flex-col gap-1 text-xs transition-all ${
                    activeSection === section.id
                      ? 'bg-purple-600 text-white border-purple-400'
                      : section.special
                        ? 'bg-red-800/70 hover:bg-red-700/70 text-red-200 border-red-500/50 animate-pulse'
                        : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border-gray-600/30'
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium leading-tight">{section.label}</span>
                  {section.special && (
                    <Badge className="bg-red-600 text-xs px-1 py-0">NEW</Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Special Features Alert */}
        {(activeSection === 'ia-engine' || activeSection === 'defense-creatures' || activeSection === 'innovation-hub') && (
          <Card className="border-red-500/50 bg-gradient-to-r from-red-900/40 to-orange-900/40 animate-pulse">
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-red-400 mb-2">
                ⚠️ SUPREME ADMIN FEATURE ACTIVATED ⚠️
              </div>
              <div className="text-red-300">
                🔥 Invisible operation • 👻 Untraceable forever • 🛡️ Maximum security • 👑 Admin only access
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Section Content */}
        <div className="space-y-6">
          {renderActiveSection()}
        </div>

        {/* Enhanced System Status Footer */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              <div className="p-3 bg-green-900/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">100%</div>
                <div className="text-xs text-muted-foreground">System Health</div>
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">∞</div>
                <div className="text-xs text-muted-foreground">Processing Power</div>
              </div>
              <div className="p-3 bg-purple-900/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">SUPREME</div>
                <div className="text-xs text-muted-foreground">Defense Level</div>
              </div>
              <div className="p-3 bg-yellow-900/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">GALAXY</div>
                <div className="text-xs text-muted-foreground">Coverage Active</div>
              </div>
              <div className="p-3 bg-pink-900/30 rounded-lg">
                <div className="text-2xl font-bold text-pink-400">GODFATHER</div>
                <div className="text-xs text-muted-foreground">AI Engine Mode</div>
              </div>
              <div className="p-3 bg-red-900/30 rounded-lg">
                <div className="text-2xl font-bold text-red-400">INVISIBLE</div>
                <div className="text-xs text-muted-foreground">Operation Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
