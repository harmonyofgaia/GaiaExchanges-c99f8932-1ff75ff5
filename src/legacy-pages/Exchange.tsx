
import { Navbar } from '@/components/Navbar'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { UniversalSwapInterface } from '@/components/exchange/UniversalSwapInterface'

export default function Exchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-24 h-24 relative">
              <img 
                src="/lovable-uploads/1569bfa1-1c8d-4cb2-9588-d846081e8cfb.png"
                alt="Harmony of Gaia Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Gaia's Private Blockchain Network
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Unified Token Exchange • Zero Fees • 100% Community Controlled
          </p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <img 
              src="/lovable-uploads/1569bfa1-1c8d-4cb2-9588-d846081e8cfb.png"
              alt="Harmony of Gaia"
              className="w-4 h-4 object-contain"
            />
            <p className="text-sm text-green-400">
              Legally Confirmed Tokens Only • Powered by Harmony of Gaia ✨
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <UniversalSwapInterface />
        </div>
      </div>
    </div>
  )
}
