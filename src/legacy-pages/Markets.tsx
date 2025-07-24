
import { GaiasExchange } from '@/components/GaiasExchange'
import { InvestorScoutingSystem } from '@/components/InvestorScoutingSystem'
import { FullyFunctionalExchange } from '@/components/FullyFunctionalExchange'
import { MultiExchangeIntegration } from '@/components/MultiExchangeIntegration'
import { GaiaFeeManager } from '@/components/GaiaFeeManager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Markets = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="exchange" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="exchange">Live Exchange</TabsTrigger>
          <TabsTrigger value="fee-manager">Fee Options</TabsTrigger>
          <TabsTrigger value="investors">Investor Scouting</TabsTrigger>
          <TabsTrigger value="listings">Exchange Listings</TabsTrigger>
          <TabsTrigger value="platform">Full Platform</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exchange" className="space-y-6">
          <FullyFunctionalExchange />
        </TabsContent>
        
        <TabsContent value="fee-manager" className="space-y-6">
          <GaiaFeeManager />
        </TabsContent>
        
        <TabsContent value="investors" className="space-y-6">
          <InvestorScoutingSystem />
        </TabsContent>
        
        <TabsContent value="listings" className="space-y-6">
          <MultiExchangeIntegration />
        </TabsContent>
        
        <TabsContent value="platform" className="space-y-6">
          <GaiasExchange />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Markets
