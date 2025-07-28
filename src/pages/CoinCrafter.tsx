
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins } from 'lucide-react'

export default function CoinCrafter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900/20 via-green-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto">
        <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-900/40 to-green-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400 flex items-center justify-center gap-3">
              <Coins className="h-12 w-12 text-yellow-400" />
              🪙 Coin Crafter
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Create Custom Environmental Tokens
            </p>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
