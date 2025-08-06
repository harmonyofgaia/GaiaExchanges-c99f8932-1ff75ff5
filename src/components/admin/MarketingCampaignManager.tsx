import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Globe,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Play,
  Pause,
  BarChart3,
  Copy
} from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/tokens'

interface Campaign {
  id: string
  title: string
  platform: string
  budget: string
  status: 'active' | 'paused' | 'completed'
  reach: number
  engagement: number
  conversions: number
  startDate: string
  endDate: string
}

export function MarketingCampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'GAiA Token Worldwide Launch',
      platform: 'Multi-Platform',
      budget: '50,000 GAIA',
      status: 'active',
      reach: 1847329,
      engagement: 247891,
      conversions: 12847,
      startDate: '2024-01-15',
      endDate: '2024-03-15'
    },
    {
      id: '2', 
      title: 'Green Investment Awareness',
      platform: 'Social Media',
      budget: '25,000 GAIA',
      status: 'active',
      reach: 892456,
      engagement: 134782,
      conversions: 8234,
      startDate: '2024-01-20',
      endDate: '2024-02-20'
    }
  ])

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    platform: '',
    budget: '',
    description: '',
    targetAudience: '',
    duration: ''
  })

  const copyTokenAddress = (type: 'wallet' | 'contract') => {
    const address = type === 'wallet' ? GAIA_TOKEN.WALLET_ADDRESS : GAIA_TOKEN.CONTRACT_ADDRESS
    navigator.clipboard.writeText(address)
    toast.success(`📋 ${type === 'wallet' ? 'Wallet' : 'Contract'} Address Copied!`, {
      description: `GAiA Token ${type} address copied to clipboard`,
      duration: 3000
    })
  }

  const launchCampaign = () => {
    if (!newCampaign.title || !newCampaign.platform || !newCampaign.budget) {
      toast.error('Campaign Incomplete', {
        description: 'Please fill in all required campaign details'
      })
      return
    }

    const campaign: Campaign = {
      id: Date.now().toString(),
      title: newCampaign.title,
      platform: newCampaign.platform,
      budget: newCampaign.budget,
      status: 'active',
      reach: 0,
      engagement: 0,
      conversions: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    setCampaigns(prev => [...prev, campaign])
    setNewCampaign({ title: '', platform: '', budget: '', description: '', targetAudience: '', duration: '' })
    
    toast.success('🚀 Campaign Launched Successfully!', {
      description: `"${campaign.title}" is now live and reaching global audience`,
      duration: 5000
    })
  }

  const toggleCampaignStatus = (id: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id 
        ? { ...campaign, status: campaign.status === 'active' ? 'paused' : 'active' as const }
        : campaign
    ))
    
    const campaign = campaigns.find(c => c.id === id)
    toast.success(`📊 Campaign ${campaign?.status === 'active' ? 'Paused' : 'Resumed'}`, {
      description: `"${campaign?.title}" status updated`
    })
  }

  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Header with Token Info */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400 text-2xl">
            <Globe className="h-7 w-7" />
            🚀 GAiA Marketing Campaign Manager
          </CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <h4 className="text-blue-400 font-bold mb-2">💰 Official GAiA Wallet</h4>
              <code className="font-mono text-xs text-blue-300 break-all">{GAIA_TOKEN.WALLET_ADDRESS}</code>
              <Button 
                onClick={() => copyTokenAddress('wallet')}
                size="sm" 
                className="mt-2 bg-blue-600 hover:bg-blue-700"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy Wallet
              </Button>
            </div>
            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <h4 className="text-purple-400 font-bold mb-2">📜 Contract Address</h4>
              <code className="font-mono text-xs text-purple-300 break-all">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
              <Button 
                onClick={() => copyTokenAddress('contract')}
                size="sm" 
                className="mt-2 bg-purple-600 hover:bg-purple-700"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy Contract
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Campaign Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-blue-400">{activeCampaigns}</div>
            <div className="text-sm text-muted-foreground">Active Campaigns</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-green-400">{totalReach.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Reach</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{totalConversions.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Conversions</div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-purple-400">134K</div>
            <div className="text-sm text-muted-foreground">GAIA Spent</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-orange-400">{campaign.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge className={`${campaign.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}`}>
                        {campaign.status}
                      </Badge>
                      <Badge className="bg-blue-600">{campaign.platform}</Badge>
                      <Badge className="bg-purple-600">{campaign.budget}</Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleCampaignStatus(campaign.id)}
                    size="sm"
                    className={campaign.status === 'active' ? 'bg-orange-600' : 'bg-green-600'}
                  >
                    {campaign.status === 'active' ? (
                      <><Pause className="h-4 w-4 mr-1" /> Pause</>
                    ) : (
                      <><Play className="h-4 w-4 mr-1" /> Resume</>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Reach</div>
                    <div className="text-xl font-bold text-green-400">{campaign.reach.toLocaleString()}</div>
                    <Progress value={65} className="mt-2" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                    <div className="text-xl font-bold text-blue-400">{campaign.engagement.toLocaleString()}</div>
                    <Progress value={82} className="mt-2" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Conversions</div>
                    <div className="text-xl font-bold text-purple-400">{campaign.conversions.toLocaleString()}</div>
                    <Progress value={43} className="mt-2" />
                  </div>
                </div>
                <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                  <span>📅 Start: {campaign.startDate}</span>
                  <span>🏁 End: {campaign.endDate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">🎯 Create New Marketing Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Campaign Title*</label>
                  <Input
                    placeholder="Enter campaign title..."
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Platform*</label>
                  <Input
                    placeholder="e.g., Twitter, Instagram, Multi-Platform..."
                    value={newCampaign.platform}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, platform: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Budget (GAIA)*</label>
                  <Input
                    placeholder="e.g., 10,000 GAIA"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <Input
                    placeholder="e.g., 30 days"
                    value={newCampaign.duration}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Campaign Description</label>
                <Textarea
                  placeholder="Describe your marketing campaign goals and strategy..."
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Target Audience</label>
                <Input
                  placeholder="Who is your target audience?"
                  value={newCampaign.targetAudience}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, targetAudience: e.target.value }))}
                />
              </div>

              <Button
                onClick={launchCampaign}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                disabled={!newCampaign.title || !newCampaign.platform || !newCampaign.budget}
              >
                <Globe className="h-5 w-5 mr-2" />
                🚀 Launch Global Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <BarChart3 className="h-6 w-6" />
                📊 Campaign Analytics & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-purple-400">🎯 Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Conversion Rate:</span>
                      <span className="text-green-400 font-bold">7.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Click-through Rate:</span>
                      <span className="text-blue-400 font-bold">12.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost per Conversion:</span>
                      <span className="text-yellow-400 font-bold">0.3 GAIA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className="text-green-400 font-bold">340%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-400">🌍 Global Reach Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>North America:</span>
                      <span className="text-blue-400">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Europe:</span>
                      <span className="text-green-400">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Asia-Pacific:</span>
                      <span className="text-purple-400">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Others:</span>
                      <span className="text-orange-400">12%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <h4 className="text-green-400 font-bold mb-2">🚀 Campaign Success Highlights</h4>
                <ul className="text-sm space-y-1 text-green-300">
                  <li>• 300% increase in GAiA token awareness</li>
                  <li>• 12,847 new wallet activations</li>
                  <li>• 89% positive sentiment analysis</li>
                  <li>• Featured on 45+ crypto news platforms</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}