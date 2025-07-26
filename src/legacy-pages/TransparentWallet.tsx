
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TransactionTracker } from '@/components/TransactionTracker'
import { WalletEnhancementEngine } from '@/components/WalletEnhancementEngine'
import { Eye, Shield, Copy, ExternalLink, Heart, Leaf } from 'lucide-react'
import { GAIA_TOKEN } from '@/constants/gaia'
import { toast } from 'sonner'

export default function TransparentWallet() {
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(GAIA_TOKEN.WALLET_ADDRESS)
    toast.success('Official GAiA Community Wallet Copied!', {
      description: 'This is where all fees and burns go - 100% transparent'
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
  }

  const openOfficialWebsite = () => {
    window.open(GAIA_TOKEN.OFFICIAL_WEBSITE, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
<div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-green-400 mb-4 animate-pulse">
            💎 100% TRANSPARENT COMMUNITY WALLET
          </h1>
          <p className="text-2xl text-green-300 mb-6">
            Every Fee • Every Burn • Every Transaction • Complete Transparency • Community First
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-green-600 text-white text-lg px-6 py-2 animate-pulse">
              <Eye className="h-4 w-4 mr-2" />
              100% Visible
            </Badge>
            <Badge className="bg-blue-600 text-white text-lg px-6 py-2 animate-pulse">
              <Shield className="h-4 w-4 mr-2" />
              Community Protected
            </Badge>
            <Badge className="bg-purple-600 text-white text-lg px-6 py-2 animate-pulse">
              <Heart className="h-4 w-4 mr-2" />
              No Daily Traders
            </Badge>
            <Badge className="bg-orange-600 text-white text-lg px-6 py-2 animate-pulse">
              <Leaf className="h-4 w-4 mr-2" />
              Pure Investment Focus
            </Badge>
          </div>
        </div>

        {/* Community Statement */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-green-400 text-2xl text-center">
              🌍 COMMUNITY STATEMENT: STABILITY OVER SPECULATION
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-xl text-green-300">
              "We build a community of believers, not traders. Every fee strengthens our environmental mission. 
              No staking, no gambling - just pure investment in a sustainable future."
            </p>
            <p className="text-lg text-blue-300">
              "GAiA is for those who want to change the world, not make quick profits. 
              We stay stable forever by focusing on long-term environmental impact."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-green-900/30 rounded-lg">
                <h4 className="font-bold text-green-400">✅ WE WELCOME</h4>
                <p className="text-sm text-green-300">Long-term believers, Environmental advocates, Community builders</p>
              </div>
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <h4 className="font-bold text-blue-400">🎯 OUR FOCUS</h4>
                <p className="text-sm text-blue-300">Stability, Environmental impact, Community growth</p>
              </div>
              <div className="p-4 bg-red-900/30 rounded-lg">
                <h4 className="font-bold text-red-400">❌ NOT FOR</h4>
                <p className="text-sm text-red-300">Daily traders, Quick profits, Speculation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Official Wallet Information */}
        <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-400 text-2xl text-center">
              🏦 OFFICIAL GAiA COMMUNITY WALLET - ALL FEES FLOW HERE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-400 font-bold text-xl">Official Community Wallet:</h3>
                <div className="flex gap-2">
                  <Button 
                    onClick={copyWalletAddress}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Address
                  </Button>
                  <Button 
                    onClick={openOfficialWebsite}
                    variant="outline"
                    className="border-green-500/30 text-green-400"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Official Site
                  </Button>
                </div>
              </div>
              <code className="text-green-300 font-mono text-lg break-all block bg-green-900/10 p-4 rounded border">
                {GAIA_TOKEN.WALLET_ADDRESS}
              </code>
            </div>

            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-purple-400 font-bold text-xl">Contract Address (Pump.fun):</h3>
                <Button 
                  onClick={openPumpFun}
                  variant="outline"
                  className="border-purple-500/30 text-purple-400"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Pump.fun
                </Button>
              </div>
              <code className="text-purple-300 font-mono text-lg break-all block bg-purple-900/10 p-4 rounded border">
                {GAIA_TOKEN.CONTRACT_ADDRESS}
              </code>
            </div>

            {/* Fee Flow Information */}
            <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30">
              <CardContent className="pt-6">
                <h4 className="text-orange-400 font-bold text-xl mb-4 text-center">
                  💰 WHERE YOUR FEES GO - CHOOSE YOUR IMPACT
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                    <h5 className="text-green-400 font-bold">🌱 Environmental Projects</h5>
                    <p className="text-green-300 text-sm">Reforestation, Ocean cleanup, Solar energy, Carbon offset</p>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                    <h5 className="text-blue-400 font-bold">🔥 Token Burning</h5>
                    <p className="text-blue-300 text-sm">Increase token value by reducing supply</p>
                  </div>
                  <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                    <h5 className="text-purple-400 font-bold">🏦 Community Vault</h5>
                    <p className="text-purple-300 text-sm">Admin humanitarian surprises and community rewards</p>
                  </div>
                  <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
                    <h5 className="text-orange-400 font-bold">❤️ Humanity Fund</h5>
                    <p className="text-orange-300 text-sm">Global humanitarian aid and disaster relief</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Wallet Enhancement Engine */}
        <div className="mb-8">
          <WalletEnhancementEngine />
        </div>

        {/* Complete Transaction History */}
        <TransactionTracker />

        {/* Bottom Statement */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40 mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-4xl font-bold text-green-400 mb-4">
              🌍 TRANSPARENCY IS OUR FOUNDATION
            </h2>
            <p className="text-xl text-green-300 mb-6">
              Every transaction visible • Every fee tracked • Every burn recorded • Community trust through complete openness
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600 text-white text-lg px-6 py-3">
                ✅ No Hidden Fees
              </Badge>
              <Badge className="bg-blue-600 text-white text-lg px-6 py-3">
                👁️ 100% Visible
              </Badge>
              <Badge className="bg-purple-600 text-white text-lg px-6 py-3">
                🛡️ Community Protected
              </Badge>
              <Badge className="bg-orange-600 text-white text-lg px-6 py-3">
                🌱 Environmental First
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
