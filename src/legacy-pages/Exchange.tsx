
import { Navbar } from '@/components/Navbar'
import { GaiaLogo } from '@/components/GaiaLogo'
import { UniversalSwapInterface } from '@/components/exchange/UniversalSwapInterface'

export default function Exchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <GaiaLogo size="xl" variant="glow" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              GAIA Private Exchange Network
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Universal Multi-Token Exchange • Zero Fees • Full Transparency
          </p>
          <p className="text-sm text-green-400">
            🌍 Legally Confirmed Tokens Only • Powered by Harmony of Gaia
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <UniversalSwapInterface />
        </div>
      </div>
    </div>
  )
}
