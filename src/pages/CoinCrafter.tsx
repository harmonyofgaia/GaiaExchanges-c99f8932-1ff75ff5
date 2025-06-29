
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Coins, Zap } from 'lucide-react'

const CoinCrafter = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900/20 via-red-900/20 to-yellow-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-400 mb-4">
            🔥 COIN CRAFTER
          </h1>
          <p className="text-muted-foreground">
            Craft and forge new tokens with dragon fire
          </p>
        </div>
        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardContent className="pt-6 text-center">
            <Flame className="h-16 w-16 text-orange-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Token Forging Active</h3>
            <p className="text-muted-foreground">
              Create custom tokens with dragon-powered blockchain technology
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CoinCrafter
