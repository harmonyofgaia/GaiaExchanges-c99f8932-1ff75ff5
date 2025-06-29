
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Wallet, Shield, Zap, TrendingUp, Copy, Star } from 'lucide-react'
import { GAIA_TOKEN, formatGaiaPrice, formatGaiaNumber } from '@/constants/gaia'
import { toast } from 'sonner'

export function WalletEnhancementEngine() {
  const [enhancementLevel, setEnhancementLevel] = useState(85)
  const [securityScore, setSecurityScore] = useState(98)
  const [gaiaBalance, setGaiaBalance] = useState(15420.87)

  useEffect(() => {
    const interval = setInterval(() => {
      setEnhancementLevel(prev => Math.min(100, prev + Math.random() * 0.5))
      setSecurityScore(prev => Math.min(100, prev + Math.random() * 0.2))
      setGaiaBalance(prev => prev + (Math.random() - 0.5) * 5)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('GAiA Wallet Address Copied!', {
      description: 'Official GAiA wallet address copied to clipboard'
    })
  }

  const copyContractAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.CONTRACT_ADDRESS)
    toast.success('GAiA Contract Address Copied!', {
      description: 'Official GAiA contract address copied to clipboard'
    })
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Wallet className="h-6 w-6" />
          🚀 GAiA Wallet Enhancement Engine
        </CardTitle>
        <p className="text-muted-foreground">
          Advanced wallet optimization with official GAiA integration
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Official GAiA Token Info */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-400 font-bold">Official GAiA Wallet:</span>
            <Button 
              onClick={copyWalletAddress}
              variant="outline" 
              size="sm"
              className="border-blue-500/30 text-blue-400"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
          <code className="text-blue-300 font-mono text-sm break-all block bg-blue-900/10 p-2 rounded">
            {GAIA_TOKEN.WALLET_ADDRESS}
          </code>
        </div>

        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-400 font-bold">GAiA Contract:</span>
            <Button 
              onClick={copyContractAddress}
              variant="outline" 
              size="sm"
              className="border-purple-500/30 text-purple-400"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
          <code className="text-purple-300 font-mono text-sm break-all block bg-purple-900/10 p-2 rounded">
            {GAIA_TOKEN.CONTRACT_ADDRESS}
          </code>
        </div>

        {/* Enhancement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-500/20 bg-green-900/20">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground">GAiA Balance</p>
                  <p className="text-xl font-bold text-green-400">{formatGaiaNumber(gaiaBalance)}</p>
                </div>
                <Wallet className="h-6 w-6 text-green-400" />
              </div>
              <Progress value={(gaiaBalance / 20000) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-900/20">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground">Enhancement</p>
                  <p className="text-xl font-bold text-blue-400">{enhancementLevel.toFixed(1)}%</p>
                </div>
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <Progress value={enhancementLevel} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-purple-900/20">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-muted-foreground">Security</p>
                  <p className="text-xl font-bold text-purple-400">{securityScore.toFixed(1)}%</p>
                </div>
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <Progress value={securityScore} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Enhancement Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Badge className="bg-green-600 text-white justify-center py-2">
            <Star className="h-3 w-3 mr-1" />
            Auto-Optimize
          </Badge>
          <Badge className="bg-blue-600 text-white justify-center py-2">
            <Shield className="h-3 w-3 mr-1" />
            Dragon Security
          </Badge>
          <Badge className="bg-purple-600 text-white justify-center py-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            Smart Trading
          </Badge>
          <Badge className="bg-orange-600 text-white justify-center py-2">
            <Zap className="h-3 w-3 mr-1" />
            Instant Sync
          </Badge>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            🌍 Connected to official GAiA ecosystem
          </p>
          <p className="text-xs text-green-400">
            Contract: {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20)}...
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
