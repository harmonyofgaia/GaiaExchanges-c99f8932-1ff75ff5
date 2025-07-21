
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function NFTGreenAnimals() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)

  const greenAnimals = [
    { id: '1', name: 'Earth Guardian Wolf', price: '50 GAIA', rarity: 'Legendary', image: '🐺' },
    { id: '2', name: 'Forest Protector Bear', price: '35 GAIA', rarity: 'Epic', image: '🐻' },
    { id: '3', name: 'Ocean Cleaner Dolphin', price: '25 GAIA', rarity: 'Rare', image: '🐬' },
    { id: '4', name: 'Sky Harmony Eagle', price: '40 GAIA', rarity: 'Epic', image: '🦅' },
    { id: '5', name: 'Garden Helper Bee', price: '15 GAIA', rarity: 'Common', image: '🐝' },
    { id: '6', name: 'Tree Planter Elephant', price: '60 GAIA', rarity: 'Legendary', image: '🐘' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/10 via-emerald-900/10 to-black p-4">
      <div className="container mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-green-900/40 via-emerald-900/40 to-teal-900/40 border-2 border-green-500/50">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              🌿 NFT GREEN ANIMALS SANCTUARY
            </CardTitle>
            <div className="flex justify-center gap-2 flex-wrap mt-4">
              <Badge className="bg-green-600 animate-pulse">ECO POWERED</Badge>
              <Badge className="bg-emerald-600 animate-pulse">CARBON NEGATIVE</Badge>
              <Badge className="bg-teal-600 animate-pulse">NATURE GUARDIAN</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {greenAnimals.map((animal) => (
            <Card key={animal.id} className="border-green-500/30 bg-green-900/20 hover:bg-green-900/30 transition-all cursor-pointer" onClick={() => setSelectedAnimal(animal.id)}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-green-400">
                  <div className="flex items-center gap-2">
                    <span className="text-4xl">{animal.image}</span>
                    <span className="text-lg">{animal.name}</span>
                  </div>
                  <Badge className={animal.rarity === 'Legendary' ? 'bg-yellow-600' : animal.rarity === 'Epic' ? 'bg-purple-600' : animal.rarity === 'Rare' ? 'bg-blue-600' : 'bg-gray-600'}>
                    {animal.rarity}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{animal.price}</div>
                  <div className="text-sm text-muted-foreground">Environmental Impact NFT</div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Adopt & Mint NFT
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-emerald-500/30 bg-emerald-900/20">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">
              GREEN ANIMALS ECOSYSTEM IMPACT
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-emerald-200">
              <div className="space-y-2">
                <div>🌳 <strong>Trees Planted:</strong> 15,847 trees</div>
                <div>🌊 <strong>Ocean Cleanup:</strong> 2,340 kg plastic</div>
              </div>
              <div className="space-y-2">
                <div>🐝 <strong>Habitats Protected:</strong> 45 ecosystems</div>
                <div>⚡ <strong>Renewable Energy:</strong> 100% powered</div>
              </div>
              <div className="space-y-2">
                <div>♻️ <strong>Carbon Offset:</strong> -5,000 tons CO2</div>
                <div>🌱 <strong>Biodiversity Score:</strong> 98.5%</div>
              </div>
              <div className="space-y-2">
                <div>💚 <strong>Community Impact:</strong> Global healing</div>
                <div>🌈 <strong>Future Vision:</strong> Sustainable harmony</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
