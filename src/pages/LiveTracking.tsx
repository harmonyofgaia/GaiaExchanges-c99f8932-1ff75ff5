
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RealTimeAnimalTracker } from '@/components/RealTimeAnimalTracker'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

const LiveTracking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <Card className="mb-8 border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              📡 LIVE ANIMAL TRACKING SYSTEM
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Real-Time GPS • Satellite Monitoring • Environmental Data • Conservation Impact
            </p>
          </CardHeader>
        </Card>
        
        <RealTimeAnimalTracker />
      </div>
    </div>
  )
}

export default LiveTracking
