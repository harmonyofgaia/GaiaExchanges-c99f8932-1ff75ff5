
import { GaiaWallet } from '@/components/GaiaWallet'
import { TransactionTracker } from '@/components/TransactionTracker'
import { GaiaTokenTracker } from '@/components/GaiaTokenTracker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Wallet = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Harmony of Gaia Wallet</h1>
          <p className="text-muted-foreground">Complete transparency with real-time updates every 5 seconds</p>
        </div>
      </div>
      
      <Tabs defaultValue="wallet" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wallet">Main Wallet</TabsTrigger>
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
          <TabsTrigger value="gaia-tracker">GAiA Token Tracker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="wallet" className="space-y-6">
          <GaiaWallet />
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <TransactionTracker />
        </TabsContent>
        
        <TabsContent value="gaia-tracker" className="space-y-6">
          <GaiaTokenTracker />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Wallet
