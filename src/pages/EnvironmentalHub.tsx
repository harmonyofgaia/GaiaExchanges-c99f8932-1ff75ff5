/**
 * Environmental Hub - Central hub for all environmental features
 * Showcases GAiA token's environmental impact and user engagement features
 */

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EnvironmentalImpactGamification } from '@/components/EnvironmentalImpactGamification'
import { RealTimeEnvironmentalData } from '@/components/RealTimeEnvironmentalData'
import { 
  Leaf, 
  Globe, 
  TrendingUp, 
  Users, 
  Target,
  Heart,
  Sparkles,
  TreePine,
  Zap
} from 'lucide-react'

export default function EnvironmentalHub() {
  const [totalImpact] = useState({
    gaiaHolders: 15847,
    co2Reduced: 2847.5,
    treesPlanted: 12456,
    oceanCleaned: 847.2,
    renewableProjects: 234,
    communityMembers: 8934
  })

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-full overflow-x-hidden">
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
          🌍 Environmental Impact Hub
        </h1>
        <p className="text-xl lg:text-2xl text-muted-foreground mb-6">
          Where GAiA token holders make real environmental impact while earning rewards
        </p>
        
        {/* Global Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <div className="text-lg font-bold text-green-400">{totalImpact.gaiaHolders.toLocaleString()}</div>
              <div className="text-xs text-green-200">GAiA Holders</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Globe className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <div className="text-lg font-bold text-blue-400">{totalImpact.co2Reduced}t</div>
              <div className="text-xs text-blue-200">CO2 Reduced</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
            <CardContent className="p-4 text-center">
              <TreePine className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
              <div className="text-lg font-bold text-emerald-400">{totalImpact.treesPlanted.toLocaleString()}</div>
              <div className="text-xs text-emerald-200">Trees Planted</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 border-teal-500/30">
            <CardContent className="p-4 text-center">
              <Heart className="h-6 w-6 mx-auto mb-2 text-teal-400" />
              <div className="text-lg font-bold text-teal-400">{totalImpact.oceanCleaned}km²</div>
              <div className="text-xs text-teal-200">Ocean Cleaned</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
              <div className="text-lg font-bold text-yellow-400">{totalImpact.renewableProjects}</div>
              <div className="text-xs text-yellow-200">Renewable Projects</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Sparkles className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <div className="text-lg font-bold text-purple-400">{totalImpact.communityMembers.toLocaleString()}</div>
              <div className="text-xs text-purple-200">Community Members</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Badge className="bg-green-600 text-white text-sm px-3 py-1">
            🏆 #1 Environmental Crypto Project
          </Badge>
          <Badge className="bg-blue-600 text-white text-sm px-3 py-1">
            🌟 Real Environmental Impact
          </Badge>
          <Badge className="bg-purple-600 text-white text-sm px-3 py-1">
            💰 Earn While Helping Planet
          </Badge>
          <Badge className="bg-orange-600 text-white text-sm px-3 py-1">
            🚀 Innovative Gamification
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="gamification" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
          <TabsTrigger value="gamification" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Earn GAiA</span>
            <span className="sm:hidden">Earn</span>
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Live Data</span>
            <span className="sm:hidden">Data</span>
          </TabsTrigger>
          <TabsTrigger value="impact" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            <span className="hidden sm:inline">Impact</span>
            <span className="sm:hidden">Impact</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Community</span>
            <span className="sm:hidden">Community</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gamification" className="mt-0">
          <EnvironmentalImpactGamification />
        </TabsContent>

        <TabsContent value="realtime" className="mt-0">
          <RealTimeEnvironmentalData />
        </TabsContent>

        <TabsContent value="impact" className="mt-0">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Leaf className="h-6 w-6" />
                  Environmental Impact Methodology
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">How GAiA Creates Impact</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <TreePine className="h-4 w-4 text-green-400" />
                        Every transaction funds reforestation projects
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        Token value increases with renewable energy adoption
                      </li>
                      <li className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-400" />
                        Community actions drive real-world environmental improvements
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-400" />
                        Ocean cleanup initiatives funded by ecosystem growth
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Verification Process</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>🔍 Satellite monitoring for forest coverage</li>
                      <li>📊 Third-party environmental audits</li>
                      <li>🌐 Blockchain transparency for all funding</li>
                      <li>📸 Community verification for local actions</li>
                      <li>🏆 Independent impact certification</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
                <CardHeader>
                  <CardTitle className="text-emerald-400 text-center">This Month</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-2xl font-bold text-emerald-400">2,847</div>
                  <div className="text-sm text-emerald-200">Trees Planted</div>
                  <div className="text-xs text-muted-foreground">+23% from last month</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-center">This Week</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-400">127.5t</div>
                  <div className="text-sm text-blue-200">CO2 Offset</div>
                  <div className="text-xs text-muted-foreground">+15% from last week</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400 text-center">Today</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-400">47</div>
                  <div className="text-sm text-purple-200">Actions Completed</div>
                  <div className="text-xs text-muted-foreground">By community members</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-0">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Global GAiA Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Community Features</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                        <h4 className="font-semibold text-green-400">Local Environmental Groups</h4>
                        <p className="text-sm text-muted-foreground">Connect with nearby GAiA holders for joint actions</p>
                      </div>
                      <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                        <h4 className="font-semibold text-blue-400">Expert Mentorship</h4>
                        <p className="text-sm text-muted-foreground">Learn from environmental scientists and activists</p>
                      </div>
                      <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                        <h4 className="font-semibold text-purple-400">Global Challenges</h4>
                        <p className="text-sm text-muted-foreground">Participate in worldwide environmental initiatives</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Exclusive Benefits</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-400" />
                        Early access to new environmental projects
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        Higher GAiA rewards for long-term holders
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-400" />
                        Exclusive environmental impact NFTs
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-400" />
                        VIP access to environmental conferences
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-cyan-400" />
                        Direct voting on project funding allocation
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
                <CardHeader>
                  <CardTitle className="text-indigo-400">Join GAiA Ambassador Program</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Become a leader in your community and earn exclusive rewards for promoting environmental awareness.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600">+500 GAiA</Badge>
                      <span>Monthly ambassador rewards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600">Exclusive</Badge>
                      <span>Ambassador-only environmental tools</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-600">VIP</Badge>
                      <span>Direct line to development team</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-teal-900/30 to-emerald-900/30 border-teal-500/30">
                <CardHeader>
                  <CardTitle className="text-teal-400">Educational Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Access comprehensive guides, webinars, and resources to maximize your environmental impact.
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>📚 Environmental Action Guides</div>
                    <div>🎥 Weekly Impact Webinars</div>
                    <div>📊 Personal Impact Tracking Tools</div>
                    <div>🌱 Sustainability Best Practices</div>
                    <div>🔬 Latest Environmental Research</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}