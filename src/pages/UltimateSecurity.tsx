
import { ComprehensiveSecurityMonitor } from '@/components/security/ComprehensiveSecurityMonitor'
import { UltimateSecurityWall } from '@/components/security/UltimateSecurityWall'
import { OptimalTradingCosts } from '@/components/security/OptimalTradingCosts'
import { PhoneSecuritySystem } from '@/components/security/PhoneSecuritySystem'
import { UltimateWalletProtection } from '@/components/security/UltimateWalletProtection'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const UltimateSecurity = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ultimate Security & Future-Proof Protection
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            100 Years Ahead Technology • Quantum Protection • AI Defense • Zero-Fee Trading • Real-time Monitoring
          </p>
          <p className="text-sm text-green-400 mt-2">
            🛡️ Advanced protection for +31687758236 & info@cultureofharmony.net with instant threat neutralization
          </p>
        </div>

        <Tabs defaultValue="future-proof" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="future-proof" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🚀 Future-Proof Protection
            </TabsTrigger>
            <TabsTrigger value="comprehensive" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🛡️ Real-time Protection
            </TabsTrigger>
            <TabsTrigger value="phone" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              📱 Phone Security
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              🔒 Security Wall
            </TabsTrigger>
            <TabsTrigger value="optimization" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              💰 Cost Optimization
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="future-proof" className="space-y-6 mt-6">
            <UltimateWalletProtection />
          </TabsContent>
          
          <TabsContent value="comprehensive" className="space-y-6 mt-6">
            <ComprehensiveSecurityMonitor />
          </TabsContent>
          
          <TabsContent value="phone" className="space-y-6 mt-6">
            <PhoneSecuritySystem />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 mt-6">
            <UltimateSecurityWall />
          </TabsContent>
          
          <TabsContent value="optimization" className="space-y-6 mt-6">
            <OptimalTradingCosts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UltimateSecurity
