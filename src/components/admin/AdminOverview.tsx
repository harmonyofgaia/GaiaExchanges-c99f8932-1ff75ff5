
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PrehistoricCreaturesManager } from './PrehistoricCreaturesManager'
import { EnhancedSnakeGame } from './EnhancedSnakeGame'
import { AdminDashboard } from '@/components/tracking/AdminDashboard'
import { Badge } from '@/components/ui/badge'
import { 
  Crown,
  Shield,
  Gamepad2,
  BarChart3,
  Zap,
  Users,
  Trophy,
  Target
} from 'lucide-react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'

export function AdminOverview() {
  const { isAdmin } = useSecureAdmin()

  if (!isAdmin) {
    return (
      <Card className="border-2 border-red-500/50">
        <CardContent className="p-8 text-center">
          <Crown className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-400">Admin Access Required</h3>
          <p className="text-muted-foreground">Admin Overview requires admin privileges</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Admin Overview Header */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">
            🌍 HARMONY OF GAIA - ADMIN OVERVIEW
          </CardTitle>
          <p className="text-center text-lg text-muted-foreground">
            Complete system management and creative control center
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
              <Shield className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">∞</div>
              <div className="text-sm text-muted-foreground">Defense Army</div>
            </div>
            <div className="p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <Gamepad2 className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-muted-foreground">Game Features</div>
            </div>
            <div className="p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
              <Users className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">125K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="p-4 bg-yellow-900/30 border border-yellow-500/20 rounded-lg">
              <Trophy className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">100%</div>
              <div className="text-sm text-muted-foreground">Mission Success</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Statement */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-4">🛡️ OUR DEFENSE MISSION</h3>
          <p className="text-lg text-muted-foreground mb-4">
            We are building a formidable army of prehistoric creatures and advanced gaming systems to protect our community against scams, malware, and all threats to user security.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-red-900/30 rounded border border-red-500/20">
              <Target className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-red-400 font-bold">Anti-Scam Protection</div>
            </div>
            <div className="p-3 bg-orange-900/30 rounded border border-orange-500/20">
              <Shield className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-orange-400 font-bold">Wallet Security</div>
            </div>
            <div className="p-3 bg-purple-900/30 rounded border border-purple-500/20">
              <Zap className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-purple-400 font-bold">Malware Defense</div>
            </div>
            <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-blue-400 font-bold">Community Safety</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/20">
            <h4 className="text-lg font-bold text-green-400 mb-2">🚀 TOKEN LAUNCH PREPARATION</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-yellow-400 font-bold">Contract Address:</div>
                <div className="font-mono text-xs bg-black/20 p-2 rounded mt-1">
                  t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump
                </div>
              </div>
              <div>
                <div className="text-blue-400 font-bold">Wallet Address:</div>
                <div className="font-mono text-xs bg-black/20 p-2 rounded mt-1">
                  5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <Badge className="bg-green-600 text-white">Binance Ready</Badge>
              <Badge className="bg-blue-600 text-white">CoinGecko Listed</Badge>
              <Badge className="bg-purple-600 text-white">Multi-Exchange</Badge>
              <Badge className="bg-orange-600 text-white">Mobile Apps</Badge>
              <Badge className="bg-yellow-600 text-white">Legal Compliance</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Overview Tabs */}
      <Tabs defaultValue="creatures" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/50 backdrop-blur-md border border-green-500/20">
          <TabsTrigger value="creatures" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
            🦖 Prehistoric Army
          </TabsTrigger>
          <TabsTrigger value="snake-game" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            🐍 Enhanced Snake Game
          </TabsTrigger>
          <TabsTrigger value="system-stats" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
            📊 System Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creatures" className="space-y-6 mt-6">
          <PrehistoricCreaturesManager />
        </TabsContent>

        <TabsContent value="snake-game" className="space-y-6 mt-6">
          <EnhancedSnakeGame />
        </TabsContent>

        <TabsContent value="system-stats" className="space-y-6 mt-6">
          <AdminDashboard />
        </TabsContent>
      </Tabs>

      {/* Future Development Roadmap */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-center">🚀 FUTURE DEVELOPMENT ROADMAP</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
              <h4 className="text-purple-400 font-bold mb-3">🎮 Gaming Evolution</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Virtual Reality Integration</li>
                <li>• Cross-Platform Gameplay</li>
                <li>• Character Photo Creation</li>
                <li>• Rage & LittleBigPlanet Styles</li>
                <li>• Advanced Character Builder</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/20">
              <h4 className="text-green-400 font-bold mb-3">🌍 Platform Expansion</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Multi-Exchange Listings</li>
                <li>• Mobile App Store Launch</li>
                <li>• Global Investor Network</li>
                <li>• Legal Framework Setup</li>
                <li>• Community Governance</li>
              </ul>
            </div>
            
            <div className="p-4 bg-orange-900/30 rounded-lg border border-orange-500/20">
              <h4 className="text-orange-400 font-bold mb-3">🛡️ Security Enhancement</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• AI Threat Detection</li>
                <li>• Quantum Encryption</li>
                <li>• Behavioral Analysis</li>
                <li>• Real-time Monitoring</li>
                <li>• Community Reporting</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center p-4 bg-gradient-to-r from-green-900/30 to-purple-900/30 rounded-lg border border-green-500/20">
            <h4 className="text-2xl font-bold text-green-400 mb-2">
              🌟 "Seeds Will Form Into Music" 🌟
            </h4>
            <p className="text-lg text-muted-foreground">
              Together we create a new culture until the end of the world - Building the future of secure gaming and environmental protection
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
