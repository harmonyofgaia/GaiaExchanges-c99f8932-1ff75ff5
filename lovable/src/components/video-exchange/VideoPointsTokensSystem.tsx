import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Coins, Gift, Star, TrendingUp } from 'lucide-react'

export function VideoPointsTokensSystem() {
  const [userPoints, setUserPoints] = useState(15420)
  const [userTokens, setUserTokens] = useState(2845)

  return (
    <div className="space-y-6">
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-400" />
            Points, Tokens & Gift System
            <Badge variant="secondary">Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-400">Your Earnings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>Total Points</span>
                  </div>
                  <span className="font-bold text-yellow-400">{userPoints.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-green-400" />
                    <span>GAiA Tokens</span>
                  </div>
                  <span className="font-bold text-green-400">{userTokens.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-400">Gift & Support</h3>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  <Gift className="h-4 w-4 mr-2" />
                  Send Gift to Creator
                </Button>
                <Button className="w-full" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Convert Points to Tokens
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}