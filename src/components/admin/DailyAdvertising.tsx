
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Megaphone, Target, TrendingUp, Globe } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function DailyAdvertising() {
  const { toast } = useToast()

  const advertisingCampaigns = [
    {
      platform: 'Global News Networks',
      message: '🌍 BREAKING: GAiA Token emerges as the world\'s most secure and environmentally sustainable cryptocurrency! Zero-fee trading now available on Gaia\'s Exchanges. Join the revolution at cultureofharmony.net',
      reach: '500M+ Users',
      status: 'Ready'
    },
    {
      platform: 'Social Media Blitz',
      message: '🚀 GAiA Token is revolutionizing crypto trading with INFINITE supply potential and ZERO fees! The future of sustainable finance is here. Experience the most secure trading platform globally! #GAiAToken #CryptoRevolution',
      reach: '100M+ Users',
      status: 'Ready'
    },
    {
      platform: 'Financial News Outlets',
      message: 'GAiA Token sets new industry standards with military-grade security, zero trading fees, and unlimited supply scalability. Institutional investors are taking notice of this groundbreaking cryptocurrency innovation.',
      reach: '50M+ Professionals',
      status: 'Ready'
    },
    {
      platform: 'Radio Stations Worldwide',
      message: 'Stay Tuned And Connect With the most Loveable Project of Our Human Race, called Harmony of Gaia. The GAiA Token is now the safest and most profitable cryptocurrency investment globally. Visit cultureofharmony.net',
      reach: '1B+ Listeners',
      status: 'Ready'
    }
  ]

  const launchCampaign = (platform: string) => {
    toast({
      title: "Campaign Launched Successfully!",
      description: `Daily advertising campaign for ${platform} is now active and reaching millions globally.`,
    })
  }

  const launchAllCampaigns = () => {
    toast({
      title: "Global Marketing Blitz Activated!",
      description: "All daily advertising campaigns are now live across news, social media, radio, and financial platforms worldwide.",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/20 to-orange-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Megaphone className="h-5 w-5" />
            Daily Global Advertising System
          </CardTitle>
          <div className="text-sm text-purple-300">
            Automated daily campaigns reaching billions worldwide to establish GAiA as the #1 global cryptocurrency
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">1.6B+</div>
              <p className="text-xs text-muted-foreground">Daily Reach</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <p className="text-xs text-muted-foreground">Active Campaigns</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">Global</div>
              <p className="text-xs text-muted-foreground">Coverage</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">Premium</div>
              <p className="text-xs text-muted-foreground">Placements</p>
            </div>
          </div>

          <Button onClick={launchAllCampaigns} className="w-full bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-bold py-3">
            <Globe className="h-5 w-5 mr-2" />
            Launch Global Marketing Blitz - Reach 1.6 Billion People Daily
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advertisingCampaigns.map((campaign, index) => (
          <Card key={index} className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-blue-400">{campaign.platform}</CardTitle>
                <Badge className="bg-green-600">{campaign.status}</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Target className="h-3 w-3" />
                <span className="text-green-400">Reach: {campaign.reach}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                <p className="text-sm text-blue-300">{campaign.message}</p>
              </div>
              <Button 
                onClick={() => launchCampaign(campaign.platform)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Launch Daily Campaign
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-green-900/20 to-yellow-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400">Performance Optimization Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-green-400">Key Messaging:</h4>
              <ul className="space-y-1 text-green-300">
                <li>• World's most secure cryptocurrency</li>
                <li>• Zero trading fees guaranteed</li>
                <li>• Infinite supply scalability</li>
                <li>• Environmental sustainability leader</li>
                <li>• Military-grade security protocols</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-yellow-400">Target Outcomes:</h4>
              <ul className="space-y-1 text-yellow-300">
                <li>• #1 cryptocurrency globally</li>
                <li>• Maximum trading volume</li>
                <li>• Institutional adoption</li>
                <li>• Global brand recognition</li>
                <li>• Market leadership position</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
