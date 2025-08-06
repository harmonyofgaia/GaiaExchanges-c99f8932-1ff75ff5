
import { UniversalSwapInterface } from '@/components/exchange/UniversalSwapInterface'
import { InvestorScoutingSystem } from '@/components/InvestorScoutingSystem'
import { MultiExchangeIntegration } from '@/components/MultiExchangeIntegration'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Markets = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="exchange" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exchange">Universal Exchange</TabsTrigger>
          <TabsTrigger value="integrations">Global Integrations</TabsTrigger>
          <TabsTrigger value="investors">Investor Network</TabsTrigger>
        </TabsList>
        
        <TabsContent value="exchange" className="space-y-6">
          <UniversalSwapInterface />
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <MultiExchangeIntegration />
        </TabsContent>
        
        <TabsContent value="investors" className="space-y-6">
          <InvestorScoutingSystem />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Markets
