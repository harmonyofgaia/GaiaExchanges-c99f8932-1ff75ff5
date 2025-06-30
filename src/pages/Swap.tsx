
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowUpDown, Coins, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import HoverSidebar from '@/components/HoverSidebar'

const Swap = () => {
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromToken, setFromToken] = useState('GAiA')
  const [toToken, setToToken] = useState('SOL')

  const handleSwap = () => {
    console.log('🔄 SWAP EXECUTED ON GAIA EXCHANGE')
    console.log(`Swapping ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                💱 GAiA SWAP EXCHANGE
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Instant Token Swapping • Ultra-Low Fees • Quantum Secured
              </p>
            </CardHeader>
          </Card>

          <div className="max-w-md mx-auto">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <ArrowUpDown className="h-6 w-6" />
                  Token Swap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* From Token */}
                <div className="space-y-2">
                  <Label>From</Label>
                  <div className="flex gap-2">
                    <Input
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      placeholder="0.00"
                      type="number"
                      className="bg-black/30 border-blue-500/30"
                    />
                    <Button variant="outline" className="min-w-20 border-blue-500/30">
                      {fromToken}
                    </Button>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="rounded-full border-purple-500/50"
                    onClick={() => {
                      const temp = fromToken
                      setFromToken(toToken)
                      setToToken(temp)
                    }}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* To Token */}
                <div className="space-y-2">
                  <Label>To</Label>
                  <div className="flex gap-2">
                    <Input
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      placeholder="0.00"
                      type="number"
                      className="bg-black/30 border-purple-500/30"
                    />
                    <Button variant="outline" className="min-w-20 border-purple-500/30">
                      {toToken}
                    </Button>
                  </div>
                </div>

                {/* Swap Stats */}
                <div className="bg-black/20 p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exchange Rate:</span>
                    <span className="text-green-400">1 GAiA = 0.0047 SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Fee:</span>
                    <span className="text-blue-400">0.0001 SOL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GAiA Fee:</span>
                    <span className="text-green-400">0.1%</span>
                  </div>
                </div>

                {/* Execute Swap */}
                <Button 
                  onClick={handleSwap}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!fromAmount || !toAmount}
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Execute Swap
                </Button>
              </CardContent>
            </Card>

            {/* Recent Swaps */}
            <Card className="mt-6 border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <TrendingUp className="h-6 w-6" />
                  Recent Swaps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { from: '100 GAiA', to: '0.47 SOL', time: '2 min ago' },
                    { from: '50 SOL', to: '10,638 GAiA', time: '5 min ago' },
                    { from: '25 GAiA', to: '0.12 SOL', time: '8 min ago' }
                  ].map((swap, index) => (
                    <div key={index} className="flex justify-between items-center text-sm bg-black/20 p-3 rounded">
                      <div>
                        <div className="text-white">{swap.from} → {swap.to}</div>
                        <div className="text-muted-foreground text-xs">{swap.time}</div>
                      </div>
                      <div className="text-green-400">✓</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Swap
