
import { ProLandscapeBuilder } from '@/components/landscapes/ProLandscapeBuilder'

const LandscapeBuilder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-green-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌍 LANDSCAPE BUILDER PRO
          </h1>
          <p className="text-xl text-muted-foreground">
            Unlimited Cloud Storage • AI Generation • 8K Export • Real-Time Physics
          </p>
        </div>
        <ProLandscapeBuilder />
      </div>
    </div>
  )
}

export default LandscapeBuilder
