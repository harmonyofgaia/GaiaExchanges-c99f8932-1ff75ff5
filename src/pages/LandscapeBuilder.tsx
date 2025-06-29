
import { LandscapeBuilderAdvanced } from '@/components/LandscapeBuilderAdvanced'

const LandscapeBuilder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAIA LANDSCAPE BUILDER
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Multi-Dimensional World Creation • 2D/3D/Reality Design • All Environments
          </p>
          <p className="text-lg text-green-400 mt-2">
            🎨 Create • Build • Sell • Explore • Infinite Possibilities
          </p>
        </div>

        <LandscapeBuilderAdvanced />
      </div>
    </div>
  )
}

export default LandscapeBuilder
