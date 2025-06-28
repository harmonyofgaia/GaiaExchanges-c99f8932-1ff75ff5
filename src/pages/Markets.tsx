
import { SwapSystem } from '@/components/SwapSystem'
import { CoinGeckoTrading } from '@/components/CoinGeckoTrading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Markets = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gaia's Exchanges - Digital Currency Markets</h1>
          <p className="text-muted-foreground">World's most secure trading platform with real-time CoinGecko integration</p>
        </div>
      </div>
      
      <Tabs defaultValue="trading" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="trading">Live Trading</TabsTrigger>
          <TabsTrigger value="swap">Quick Swap</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trading" className="space-y-6">
          <CoinGeckoTrading />
        </TabsContent>
        
        <TabsContent value="swap" className="space-y-6">
          <SwapSystem />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Markets
