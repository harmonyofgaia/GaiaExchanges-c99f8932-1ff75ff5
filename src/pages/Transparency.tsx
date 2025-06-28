
import { BurningSystem } from '@/components/BurningSystem'
import { AnimatedCoinCrafting } from '@/components/AnimatedCoinCrafting'
import { VirtualAnimalWalk } from '@/components/VirtualAnimalWalk'

const Transparency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🔥 TRANSPARENCY & CRAFTING CENTER
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Live token burning, coin crafting, and virtual world exploration
          </p>
        </div>
        
        {/* Animated Coin Crafting Section */}
        <AnimatedCoinCrafting />
        
        {/* Token Burning System */}
        <BurningSystem />
        
        {/* Virtual Animal Walks */}
        <VirtualAnimalWalk />
      </div>
    </div>
  )
}

export default Transparency
