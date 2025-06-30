
import { VirtualWorldCanvas } from '@/components/virtualworld/VirtualWorldCanvas'
import { useState } from 'react'

const VirtualWorld = () => {
  const [currentLandscape, setCurrentLandscape] = useState('🌊 Ocean Paradise')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌍 GAiA Virtual World
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Explore immersive landscapes • Burn tokens for environmental impact • Help wildlife
        </p>
      </div>

      <VirtualWorldCanvas 
        currentLandscape={currentLandscape}
        onLandscapeChange={setCurrentLandscape}
      />
    </div>
  )
}

export default VirtualWorld
