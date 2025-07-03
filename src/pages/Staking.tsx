
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Staking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black p-6">
      <div className="container mx-auto space-y-6">
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-purple-400">
              🏦 GAiA Staking Platform
            </CardTitle>
            <div className="flex justify-center">
              <Badge className="bg-red-600">COMMUNITY FOCUSED - NO STAKING</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-red-400">No Staking Available</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              GAiA focuses on long-term investment and environmental impact, not speculation or staking rewards. 
              We build stability through community strength, not financial mechanisms.
            </p>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-green-400 font-bold mb-2">🌍 Our Alternative Approach</h3>
              <p className="text-green-300">
                Instead of staking, join our environmental mission through direct token holding and community participation. 
                Every transaction fee goes directly to environmental projects and community growth.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
