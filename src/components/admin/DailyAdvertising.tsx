
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Megaphone, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Zap, 
  MessageSquare,
  BarChart3,
  Play,
  Pause
} from 'lucide-react'
import { toast } from 'sonner'

export function DailyAdvertising() {
  const [campaign, setCampaign] = useState({
    title: '',
    description: '',
    budget: '',
    targetAudience: 'global'
  })
  const [isLive, setIsLive] = useState(false)

  const handleLaunchCampaign = () => {
    if (!campaign.title || !campaign.description) {
      toast.error('Campaign Incomplete', {
        description: 'Please fill in all campaign details',
        duration: 3000
      })
      return
    }

    setIsLive(true)
    toast.success('🚀 Global Campaign Launched!', {
      description: `"${campaign.title}" is now reaching worldwide audience`,
      duration: 5000
    })
  }

  const handlePauseCampaign = () => {
    setIsLive(false)
    toast.success('⏸️ Campaign Paused', {
      description: 'Marketing campaign temporarily suspended',
      duration: 3000
    })
  }

  return (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-red-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Megaphone className="h-5 w-5" />
          Daily Global Advertising & Marketing Engine
          {isLive && <Badge className="bg-green-600 animate-pulse">LIVE</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
            <TabsTrigger value="create">Create Campaign</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="targeting">Global Targeting</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-green-500/20 bg-green-500/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-400">Global Reach Campaign</h4>
                    <Badge className={isLive ? "bg-green-600" : "bg-gray-600"}>
                      {isLive ? "ACTIVE" : "PAUSED"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Worldwide promotion of GAiA ecosystem and zero-fee trading
                  </p>
                  <div className="flex gap-2">
                    {!isLive ? (
                      <Button size="sm" onClick={handleLaunchCampaign} className="bg-green-600">
                        <Play className="h-4 w-4 mr-1" />
                        Launch
                      </Button>
                    ) : (
                      <Button size="sm" onClick={handlePauseCampaign} className="bg-orange-600">
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20 bg-blue-500/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-400">Investor Outreach</h4>
                    <Badge className="bg-blue-600">SCHEDULED</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Premium investor package presentations and demos
                  </p>
                  <Button size="sm" className="bg-blue-600">
                    <Target className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-500/20 bg-purple-500/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-purple-400">Community Growth</h4>
                    <Badge className="bg-purple-600">ACTIVE</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Social media engagement and community building initiatives
                  </p>
                  <Button size="sm" className="bg-purple-600">
                    <Users className="h-4 w-4 mr-1" />
                    Monitor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-orange-400">Create New Marketing Campaign</h3>
                <p className="text-sm text-muted-foreground">Launch global advertising initiatives</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campaign Title</label>
                  <Input
                    placeholder="Enter campaign title..."
                    value={campaign.title}
                    onChange={(e) => setCampaign(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget (GAiA)</label>
                  <Input
                    placeholder="Campaign budget..."
                    value={campaign.budget}
                    onChange={(e) => setCampaign(prev => ({ ...prev, budget: e.target.value }))}
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Campaign Description</label>
                <Textarea
                  placeholder="Describe your marketing campaign..."
                  value={campaign.description}
                  onChange={(e) => setCampaign(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleLaunchCampaign}
                className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3"
                disabled={!campaign.title || !campaign.description}
              >
                <Zap className="h-5 w-5 mr-2" />
                Launch Global Campaign
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">847M</div>
                <p className="text-sm text-muted-foreground">Global Impressions</p>
              </div>
              
              <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">2.4M</div>
                <p className="text-sm text-muted-foreground">New Users</p>
              </div>
              
              <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <MessageSquare className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">156K</div>
                <p className="text-sm text-muted-foreground">Engagements</p>
              </div>
              
              <div className="text-center p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">+324%</div>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="targeting" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Geographic Targeting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>North America</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Europe</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Asia Pacific</span>
                      <Badge className="bg-blue-600">Expanding</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Latin America</span>
                      <Badge className="bg-yellow-600">Planned</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-500/20">
                <CardHeader>
                  <CardTitle className="text-pink-400">Audience Segments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Crypto Enthusiasts</span>
                      <Badge className="bg-green-600">Primary</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Environmental Advocates</span>
                      <Badge className="bg-green-600">Primary</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tech Investors</span>
                      <Badge className="bg-blue-600">Secondary</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>General Public</span>
                      <Badge className="bg-purple-600">Awareness</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
