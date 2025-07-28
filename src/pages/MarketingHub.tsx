
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Target, TrendingUp, Users, Globe, Zap, Share2, 
  MessageSquare, Mail, Send, BarChart3, Eye,
  Megaphone, Star, Heart, Shield, Crown,
  Rocket, Trophy, Flame, Copy, ExternalLink
} from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

const MarketingHub = () => {
  const [campaigns, setCampaigns] = useState(5)
  const [totalReach, setTotalReach] = useState(125000)
  const [conversions, setConversions] = useState(3250)
  const [engagement, setEngagement] = useState(87.5)

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalReach(prev => prev + Math.floor(Math.random() * 50) + 10)
      setConversions(prev => prev + Math.floor(Math.random() * 5) + 1)
      setEngagement(prev => Math.min(100, prev + (Math.random() - 0.5) * 0.5))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const copyGaiaAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('GAiA Contract Address Copied!', {
      description: 'Official GAiA token address copied for marketing use'
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-pink-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            🚀 MARKETING & INVESTOR OUTREACH HUB
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Accelerating community growth with automated marketing & secure investor attraction
          </p>
          <p className="text-sm text-purple-400 mt-2">
            🦁🐬 Lions + Dolphins Power = Unstoppable Market Domination
          </p>
        </div>

        {/* Official GAiA Token Integration */}
        <Card className="border-green-500/30 bg-green-900/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Shield className="h-6 w-6" />
              🌍 Official GAiA Token Marketing Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <h4 className="text-blue-400 font-bold mb-2">Contract Address:</h4>
                <code className="text-blue-300 font-mono text-sm break-all block bg-blue-900/10 p-2 rounded">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
                <Button onClick={copyGaiaAddress} size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy for Marketing
                </Button>
              </div>
              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <h4 className="text-purple-400 font-bold mb-2">Official Links:</h4>
                <div className="space-y-2">
                  <Button onClick={openPumpFun} variant="outline" size="sm" className="w-full border-purple-500/30 text-purple-400">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Pump.fun Trading
                  </Button>
                  <Button 
                    onClick={() => window.open(GAIA_TOKEN.OFFICIAL_WEBSITE, '_blank')} 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-green-500/30 text-green-400"
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    Official Website
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full bg-black/20 border border-purple-500/30">
            <TabsTrigger value="campaigns" className="text-purple-400">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics" className="text-blue-400">Analytics</TabsTrigger>
            <TabsTrigger value="social" className="text-pink-400">Social Media</TabsTrigger>
            <TabsTrigger value="outreach" className="text-green-400">Investor Outreach</TabsTrigger>
            <TabsTrigger value="security" className="text-orange-400">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            {/* Campaign Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Campaigns</p>
                      <p className="text-2xl font-bold text-purple-400">{campaigns}</p>
                    </div>
                    <Rocket className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/30 bg-blue-900/20">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Reach</p>
                      <p className="text-2xl font-bold text-blue-400">{totalReach.toLocaleString()}</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-900/20">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversions</p>
                      <p className="text-2xl font-bold text-green-400">{conversions.toLocaleString()}</p>
                    </div>
                    <Trophy className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-900/20">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Engagement</p>
                      <p className="text-2xl font-bold text-orange-400">{engagement.toFixed(1)}%</p>
                    </div>
                    <Flame className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Campaign Manager */}
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Target className="h-5 w-5" />
                  Dragon-Powered Campaign Manager
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-orange-300">Campaign Name</label>
                    <Input placeholder="GAiA Token Launch Campaign" className="bg-black/20 border-orange-500/30" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-orange-300">Target Audience</label>
                    <Input placeholder="Eco-conscious investors" className="bg-black/20 border-orange-500/30" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-orange-300">Campaign Message</label>
                  <Textarea 
                    placeholder="Join the GAiA revolution - sustainable crypto for a better world!" 
                    className="bg-black/20 border-orange-500/30" 
                  />
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Rocket className="h-4 w-4 mr-2" />
                  Launch Dragon Campaign
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="h-5 w-5" />
                  Real-time Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-400">Campaign Performance</span>
                      <span className="text-green-300">{engagement.toFixed(1)}%</span>
                    </div>
                    <Progress value={engagement} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-blue-400">Reach Growth</span>
                      <span className="text-blue-300">89.2%</span>
                    </div>
                    <Progress value={89.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-400">Conversion Rate</span>
                      <span className="text-purple-300">12.7%</span>
                    </div>
                    <Progress value={12.7} className="h-2" />
                  </div>
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Share2 className="h-5 w-5" />
                  Social Media Command Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-900/30 rounded-lg text-center">
                    <div className="text-3xl mb-2">🐦</div>
                    <div className="text-blue-400 font-bold">Twitter/X</div>
                    <div className="text-2xl text-blue-300">45.2K</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="p-4 bg-purple-900/30 rounded-lg text-center">
                    <div className="text-3xl mb-2">📘</div>
                    <div className="text-purple-400 font-bold">Facebook</div>
                    <div className="text-2xl text-purple-300">32.1K</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div className="p-4 bg-pink-900/30 rounded-lg text-center">
                    <div className="text-3xl mb-2">📸</div>
                    <div className="text-pink-400 font-bold">Instagram</div>
                    <div className="text-2xl text-pink-300">28.7K</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Manage Social Campaigns
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outreach" className="space-y-6">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Crown className="h-5 w-5" />
                  🦁🐬 Lion + Dolphin Investor Outreach System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🦁</span>
                      <h4 className="text-yellow-400 font-bold">Lion Power Strategy</h4>
                    </div>
                    <p className="text-yellow-300 text-sm">Aggressive market domination and community leadership</p>
                    <Button size="sm" className="mt-2 bg-yellow-600 hover:bg-yellow-700">
                      Activate Lion Mode
                    </Button>
                  </div>
                  <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🐬</span>
                      <h4 className="text-cyan-400 font-bold">Dolphin Intelligence</h4>
                    </div>
                    <p className="text-cyan-300 text-sm">Smart networking and strategic partnerships</p>
                    <Button size="sm" className="mt-2 bg-cyan-600 hover:bg-cyan-700">
                      Deploy Dolphin AI
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div>
                      <div className="font-bold text-green-400">Venture Capitalists</div>
                      <div className="text-sm text-muted-foreground">247 contacts reached</div>
                    </div>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div>
                      <div className="font-bold text-blue-400">Crypto Influencers</div>
                      <div className="text-sm text-muted-foreground">156 partnerships</div>
                    </div>
                    <Badge className="bg-blue-600">Growing</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div>
                      <div className="font-bold text-purple-400">Institutional Investors</div>
                      <div className="text-sm text-muted-foreground">89 meetings scheduled</div>
                    </div>
                    <Badge className="bg-purple-600">Priority</Badge>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  Launch Combined L+D Outreach
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Shield className="h-5 w-5" />
                  🛡️ Ultimate Security Wall - Marketing Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">100%</div>
                    <div className="text-sm text-green-300">Brand Protection</div>
                  </div>
                  <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">24/7</div>
                    <div className="text-sm text-blue-300">Monitoring Active</div>
                  </div>
                  <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-400">0</div>
                    <div className="text-sm text-purple-300">Security Breaches</div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <h4 className="font-medium text-orange-400 mb-2">🔥 Active Protections</h4>
                  <div className="text-sm text-orange-300 space-y-1">
                    <div>• Anti-fraud campaign monitoring</div>
                    <div>• Brand impersonation detection</div>
                    <div>• Fake token address blocking</div>
                    <div>• Scam website prevention</div>
                    <div>• Social media security scanning</div>
                  </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Activate Maximum Security
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default MarketingHub
