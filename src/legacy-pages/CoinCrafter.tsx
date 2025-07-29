import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Coins, Flame, TrendingUp, Zap, Shield, Star } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const CoinCrafter = () => {
  const [craftingLevel, setCraftingLevel] = useState(1)
  const [craftingProgress, setCraftingProgress] = useState(0)
  const [gaiaCoins, setGaiaCoins] = useState(1500)
  const [burnRate, setBurnRate] = useState(0.05)
  const [isBurning, setIsBurning] = useState(false)
  const [burnAmount, setBurnAmount] = useState('')

  const handleCraft = () => {
    if (craftingLevel < 10) {
      setCraftingProgress(0)
      const interval = setInterval(() => {
        setCraftingProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            setCraftingLevel((prevLevel) => prevLevel + 1)
            toast.success(`Crafting level increased to ${craftingLevel + 1}!`, {
              duration: 3000
            })
            return 0
          }
          return prevProgress + 10
        })
      }, 500)
    } else {
      toast.warning('Maximum crafting level reached!', {
        duration: 3000
      })
    }
  }

  const handleBurnToggle = () => {
    setIsBurning(!isBurning)
    if (!isBurning) {
      toast.success('Automated GAiA Coin Burn Activated!', {
        duration: 3000
      })
    } else {
      toast.info('Automated GAiA Coin Burn Deactivated.', {
        duration: 3000
      })
    }
  }

  const handleBurnAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBurnAmount(e.target.value)
  }

  const handleBurn = () => {
    const amount = parseFloat(burnAmount)
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount to burn.', {
        duration: 3000
      })
      return
    }

    if (amount > gaiaCoins) {
      toast.error('Insufficient GAiA Coins to burn.', {
        duration: 3000
      })
      return
    }

    setGaiaCoins((prevCoins) => prevCoins - amount)
    setBurnAmount('')
    toast.success(`Successfully burned ${amount} GAiA Coins!`, {
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-yellow-500/30 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              🔥 GAiA COIN CRAFTER
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Craft GAiA Coins • Burn Tokens • Increase Value
            </p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="crafting" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="crafting">Crafting</TabsTrigger>
            <TabsTrigger value="burning">Burning</TabsTrigger>
          </TabsList>

          <TabsContent value="crafting" className="space-y-6">
            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Flame className="h-5 w-5" />
                  Crafting Level: {craftingLevel}
                  {craftingLevel >= 10 && <Badge className="bg-green-600">MAX LEVEL</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Increase your crafting level to unlock new features and bonuses.
                </p>
                <Progress value={craftingProgress} className="mb-4" />
                <Button onClick={handleCraft} disabled={craftingLevel >= 10} className="w-full bg-orange-600 hover:bg-orange-700">
                  {craftingLevel < 10 ? 'Craft GAiA Coin' : 'Maximum Level Reached'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="burning" className="space-y-6">
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Zap className="h-5 w-5" />
                  GAiA Coin Burning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">
                      Total GAiA Coins:
                    </p>
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-yellow-400" />
                      <span className="text-xl font-bold text-yellow-400">{gaiaCoins}</span>
                    </div>
                  </div>
                  <Badge className={isBurning ? 'bg-red-600' : 'bg-gray-600'}>
                    {isBurning ? 'Burning Active' : 'Burning Inactive'}
                  </Badge>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Burn Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount to burn"
                    value={burnAmount}
                    onChange={handleBurnAmountChange}
                  />
                </div>

                <div className="space-y-2">
                  <Button onClick={handleBurn} className="w-full bg-red-600 hover:bg-red-700">
                    🔥 Burn GAiA Coins
                  </Button>
                  <Button onClick={handleBurnToggle} variant="outline" className="w-full border-red-500/30 text-red-300">
                    {isBurning ? 'Deactivate Auto-Burn' : 'Activate Auto-Burn'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CoinCrafter
