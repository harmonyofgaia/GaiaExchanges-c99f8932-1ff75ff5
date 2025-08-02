
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coins, Zap, Crown, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'

export function CoinCrafterIllustration() {
  const [coinCount, setCoinCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCoinCount(prev => prev + 1)
        setIsAnimating(false)
      }, 500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 mb-8">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
          🔥 OFFICIAL GAiA COIN CRAFTER ILLUSTRATION
        </CardTitle>
        <p className="text-center text-lg text-yellow-300">
          Real-Time Coin Generation • 100 Coins Monthly • Connected to GAiA Ecosystem
        </p>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-6">
          <div className="relative">
            <div className={`text-8xl transition-all duration-500 ${isAnimating ? 'scale-125 rotate-12' : 'scale-100'}`}>
              🪙
            </div>
            <div className="absolute -top-2 -right-2">
              <Badge className="bg-yellow-600 text-white px-3 py-1 text-lg">
                +{coinCount}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30">
              <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-400">100 Coins/Month</div>
              <div className="text-sm text-yellow-300">Automatic Generation</div>
            </div>

            <div className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30">
              <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-400">Real-Time Mining</div>
              <div className="text-sm text-orange-300">Quantum Powered</div>
            </div>

            <div className="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
              <Crown className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-red-400">Premium Access</div>
              <div className="text-sm text-red-300">Admin Controlled</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-lg border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4">🌍 Connected to GAiA Ecosystem</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-green-300 font-medium">Official GAiA Wallet:</div>
                <div className="text-green-400 font-mono text-xs break-all">
                  {GAIA_TOKEN.WALLET_ADDRESS}
                </div>
              </div>
              <div>
                <div className="text-blue-300 font-medium">Smart Contract:</div>
                <div className="text-blue-400 font-mono text-xs break-all">
                  t7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 text-lg">
              <Shield className="h-5 w-5 mr-2" />
              BANK-LEVEL SECURITY • QUANTUM PROTECTED
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
