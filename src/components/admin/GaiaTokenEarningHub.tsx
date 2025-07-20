
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Coins, 
  Leaf, 
  Recycle, 
  TreePine, 
  Bike,
  Camera,
  Users,
  Heart,
  Star,
  Gift
} from 'lucide-react'
import { toast } from 'sonner'

export function GaiaTokenEarningHub() {
  const [totalEarners, setTotalEarners] = useState(8742)
  const [dailyTokens, setDailyTokens] = useState(45832)

  const earningMethods = [
    {
      title: '🌱 Plant & Verify Trees',
      description: 'Upload photos of trees you plant, get verified by community',
      tokens: '50-200 GAIA',
      icon: TreePine,
      color: 'green'
    },
    {
      title: '🚴 Eco-Friendly Transportation',
      description: 'Use bikes, walk, or public transport - track with GPS',
      tokens: '10-50 GAIA',
      icon: Bike,
      color: 'blue'
    },
    {
      title: '♻️ Recycling Activities',
      description: 'Document recycling efforts with photos and receipts',
      tokens: '20-100 GAIA',
      icon: Recycle,
      color: 'cyan'
    },
    {
      title: '📸 Environmental Content',
      description: 'Share educational content about sustainability',
      tokens: '30-150 GAIA',
      icon: Camera,
      color: 'purple'
    },
    {
      title: '🤝 Community Building',
      description: 'Organize local environmental events and activities',
      tokens: '100-500 GAIA',
      icon: Users,
      color: 'orange'
    },
    {
      title: '🌿 Green Business Reviews',
      description: 'Review and promote eco-friendly businesses',
      tokens: '25-75 GAIA',
      icon: Star,
      color: 'yellow'
    }
  ]

  const bonusPrograms = [
    {
      title: '🎯 Daily Green Goals',
      description: 'Complete daily environmental challenges',
      reward: '5-25 GAIA daily'
    },
    {
      title: '📅 Weekly Eco Streaks',
      description: 'Maintain consistent green activities',
      reward: '50-200 GAIA weekly'
    },
    {
      title: '🏆 Monthly Champions',
      description: 'Top contributors get special rewards',
      reward: '500-2000 GAIA monthly'
    },
    {
      title: '🎁 Referral Program',
      description: 'Invite friends to join the green movement',
      reward: '100 GAIA per referral'
    }
  ]

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center text-3xl">
            🌍 GAIA TOKEN EARNING HUB
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-400">{totalEarners.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Earners</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-400">{dailyTokens.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Daily Tokens Earned</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-400">2.4M</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {earningMethods.map((method, idx) => {
          const Icon = method.icon
          return (
            <Card key={idx} className={`border-${method.color}-500/30`}>
              <CardHeader>
                <CardTitle className={`text-${method.color}-400 text-lg flex items-center gap-2`}>
                  <Icon className="h-5 w-5" />
                  {method.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                <Badge className={`bg-${method.color}-600`}>
                  {method.tokens}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">🎁 Bonus Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonusPrograms.map((program, idx) => (
              <div key={idx} className="p-4 bg-yellow-900/10 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">{program.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{program.description}</p>
                <Badge className="bg-yellow-600">{program.reward}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-cyan-400">💡 New Earning Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-400" />
              <span>Carbon footprint tracking and reduction rewards</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span>Volunteering for environmental cleanup events</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-purple-400" />
              <span>Sustainable product purchases verification</span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-yellow-400" />
              <span>Energy saving achievements at home</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
