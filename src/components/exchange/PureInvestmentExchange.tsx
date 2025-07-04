
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SwapInterface } from './SwapInterface'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

export function PureInvestmentExchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            💎 GAiA PURE INVESTMENT EXCHANGE
          </h1>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-green-600">INVESTMENT FOCUSED</Badge>
            <Badge className="bg-blue-600">ENVIRONMENTAL IMPACT</Badge>
            <Badge className="bg-purple-600">LONG-TERM STRATEGY</Badge>
          </div>
        </div>

        {/* Main Exchange Interface */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-green-400">
              🌍 Pure Investment Trading
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Investment-focused trading without speculation mechanisms. Built for environmental impact and long-term growth.
            </p>
          </CardHeader>
          <CardContent>
            <SwapInterface title="Pure Investment Exchange" />
          </CardContent>
        </Card>

        {/* Investment Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-green-900/20 border border-green-500/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-green-400 font-bold text-xl mb-2">Environmental First</h3>
              <p className="text-green-300 text-sm">
                Every transaction directly funds environmental restoration projects
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-900/20 border border-blue-500/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-blue-400 font-bold text-xl mb-2">Long-Term Value</h3>
              <p className="text-blue-300 text-sm">
                Built for investors who believe in sustainable growth
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-900/20 border border-purple-500/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-purple-400 font-bold text-xl mb-2">Community Driven</h3>
              <p className="text-purple-300 text-sm">
                Community consensus guides all major platform decisions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
