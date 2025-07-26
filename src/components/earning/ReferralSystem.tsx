import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  Share2, 
  Trophy, 
  Coins,
  Copy,
  CheckCircle,
  TrendingUp,
  Gift,
  Star,
  Link,
  UserPlus,
  Crown
} from 'lucide-react'
import { useEarningActivities } from '@/hooks/useEarningSystem'
import { toast } from 'sonner'

interface ReferralData {
  referralCode: string
  totalReferrals: number
  activeReferrals: number
  totalEarnings: number
  monthlyEarnings: number
  referralLevel: number
  nextLevelReferrals: number
}

export function ReferralSystem() {
  const { processReferral, activities, loading } = useEarningActivities()
  const [referralData, setReferralData] = useState<ReferralData>({
    referralCode: 'GAIA-ECO-2024',
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 6250,
    monthlyEarnings: 1450,
    referralLevel: 2,
    nextLevelReferrals: 25
  })
  const [inviteEmail, setInviteEmail] = useState('')
  const [showInviteForm, setShowInviteForm] = useState(false)

  const referralTiers = [
    {
      level: 1,
      name: 'Eco Advocate',
      minReferrals: 0,
      maxReferrals: 10,
      bonusRate: 0.05,
      icon: '🌱',
      color: 'text-green-400',
      benefits: ['5% bonus on referral earnings', 'Basic referral tracking']
    },
    {
      level: 2,
      name: 'Green Ambassador', 
      minReferrals: 10,
      maxReferrals: 25,
      bonusRate: 0.10,
      icon: '🌿',
      color: 'text-blue-400',
      benefits: ['10% bonus on referral earnings', 'Monthly bonus rewards', 'Priority support']
    },
    {
      level: 3,
      name: 'Sustainability Champion',
      minReferrals: 25,
      maxReferrals: 50,
      bonusRate: 0.15,
      icon: '🏆',
      color: 'text-yellow-400',
      benefits: ['15% bonus on referral earnings', 'Exclusive community access', 'Special badge']
    },
    {
      level: 4,
      name: 'Eco Influencer',
      minReferrals: 50,
      maxReferrals: 100,
      bonusRate: 0.20,
      icon: '⭐',
      color: 'text-purple-400',
      benefits: ['20% bonus on referral earnings', 'Custom referral page', 'VIP status']
    },
    {
      level: 5,
      name: 'Gaia Guardian',
      minReferrals: 100,
      maxReferrals: Infinity,
      bonusRate: 0.25,
      icon: '👑',
      color: 'text-orange-400',
      benefits: ['25% bonus on referral earnings', 'Governance voting rights', 'Profit sharing']
    }
  ]

  const currentTier = referralTiers.find(tier => 
    referralData.totalReferrals >= tier.minReferrals && 
    referralData.totalReferrals < tier.maxReferrals
  ) || referralTiers[0]

  const nextTier = referralTiers.find(tier => tier.level === currentTier.level + 1)

  const progressToNextLevel = nextTier 
    ? ((referralData.totalReferrals - currentTier.minReferrals) / (nextTier.minReferrals - currentTier.minReferrals)) * 100
    : 100

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode)
    toast.success('Referral code copied!', {
      description: 'Share this code with friends to earn rewards'
    })
  }

  const copyReferralLink = () => {
    const referralLink = `https://gaiaexchanges.net/signup?ref=${referralData.referralCode}`
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied!', {
      description: 'Share this link to invite friends automatically'
    })
  }

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail) {
      toast.error('Please enter an email address')
      return
    }

    try {
      // TODO: Implement email invitation
      toast.success('Invitation sent!', {
        description: `Invitation sent to ${inviteEmail}`
      })
      setInviteEmail('')
      setShowInviteForm(false)
    } catch (error) {
      toast.error('Failed to send invitation')
    }
  }

  const recentReferrals = [
    {
      id: '1',
      username: 'EcoNewbie23',
      joinDate: new Date('2024-01-15'),
      status: 'active',
      pointsEarned: 1250,
      bonusEarned: 125
    },
    {
      id: '2',
      username: 'GreenStudent',
      joinDate: new Date('2024-01-10'),
      status: 'active',
      pointsEarned: 890,
      bonusEarned: 89
    },
    {
      id: '3',
      username: 'NatureLover99',
      joinDate: new Date('2024-01-05'),
      status: 'inactive',
      pointsEarned: 450,
      bonusEarned: 45
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
                <p className="text-2xl font-bold text-green-400">{referralData.totalReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserPlus className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-muted-foreground">Active Referrals</p>
                <p className="text-2xl font-bold text-blue-400">{referralData.activeReferrals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-yellow-400">{referralData.totalEarnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Coins className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-sm text-muted-foreground">GAIA Tokens</p>
                <p className="text-2xl font-bold text-purple-400">
                  {(referralData.totalEarnings * 0.001).toFixed(3)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Tier Status */}
      <Card className="border-gradient-to-r from-purple-500/30 to-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{currentTier.icon}</div>
              <div>
                <h3 className={`text-xl font-bold ${currentTier.color}`}>
                  {currentTier.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Level {currentTier.level} • {(currentTier.bonusRate * 100)}% bonus rate
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {referralData.totalReferrals} referrals
            </Badge>
          </div>
          
          {nextTier && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextTier.name}</span>
                <span>{referralData.totalReferrals}/{nextTier.minReferrals}</span>
              </div>
              <Progress value={progressToNextLevel} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {nextTier.minReferrals - referralData.totalReferrals} more referrals needed
              </p>
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Current Benefits:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {currentTier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Referral Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Referral Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Share2 className="h-5 w-5" />
              <span>Your Referral Code</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                value={referralData.referralCode}
                readOnly
                className="font-mono text-lg font-bold text-center"
              />
              <Button 
                onClick={copyReferralCode}
                size="sm"
                variant="outline"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={copyReferralLink}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500"
              >
                <Link className="mr-2 h-4 w-4" />
                Copy Referral Link
              </Button>
              
              <Button 
                onClick={() => setShowInviteForm(!showInviteForm)}
                variant="outline"
                className="w-full"
              >
                <Gift className="mr-2 h-4 w-4" />
                Send Email Invitation
              </Button>
            </div>

            {showInviteForm && (
              <form onSubmit={sendInvite} className="space-y-3 p-4 border rounded-lg">
                <Label htmlFor="inviteEmail">Invite by Email</Label>
                <div className="flex space-x-2">
                  <Input
                    id="inviteEmail"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="friend@example.com"
                  />
                  <Button type="submit" size="sm">
                    Send
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Referral Tiers Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5" />
              <span>Referral Tiers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referralTiers.map((tier) => (
                <div 
                  key={tier.level}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    tier.level === currentTier.level 
                      ? 'border-blue-400/50 bg-blue-900/10' 
                      : 'border-gray-600/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{tier.icon}</div>
                    <div>
                      <p className={`font-semibold ${tier.color}`}>{tier.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {tier.minReferrals}+ referrals • {(tier.bonusRate * 100)}% bonus
                      </p>
                    </div>
                  </div>
                  {tier.level === currentTier.level && (
                    <Badge variant="secondary">Current</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Recent Referrals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReferrals.map((referral) => (
              <div 
                key={referral.id} 
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">👤</div>
                  <div>
                    <p className="font-medium">{referral.username}</p>
                    <p className="text-sm text-muted-foreground">
                      Joined {referral.joinDate.toLocaleDateString()}
                    </p>
                    <Badge 
                      variant={referral.status === 'active' ? 'default' : 'secondary'}
                      className="mt-1 text-xs"
                    >
                      {referral.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-400">
                    {referral.pointsEarned} pts earned
                  </p>
                  <p className="text-sm text-purple-400">
                    +{referral.bonusEarned} bonus
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>How Referrals Work</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📤</div>
              <h3 className="font-semibold mb-2">1. Share Your Code</h3>
              <p className="text-sm text-muted-foreground">
                Share your unique referral code or link with friends and family
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-semibold mb-2">2. They Join & Act</h3>
              <p className="text-sm text-muted-foreground">
                When they sign up and complete environmental actions, you both earn
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold mb-2">3. Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Get bonus points and tokens for every active referral's activities
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg">
            <h4 className="font-semibold mb-2">💡 Pro Tips:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Share your code on social media for wider reach</li>
              <li>• Help your referrals get started to keep them active</li>
              <li>• Higher tier members get better bonus rates</li>
              <li>• Both you and your referral get welcome bonuses</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}