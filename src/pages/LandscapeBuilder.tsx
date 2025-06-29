
import { MinecraftLandscapeBuilder } from '@/components/MinecraftLandscapeBuilder'

const LandscapeBuilder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🏗️ GAIA LANDSCAPE BUILDER
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Create Your Own Virtual Worlds with GAiA Token Integration
          </p>
        </div>
        
        <MinecraftLandscapeBuilder />
      </div>
    </div>
  )
}

export default LandscapeBuilder
