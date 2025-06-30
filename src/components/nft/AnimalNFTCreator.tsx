
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Camera, Heart, Shield, Zap, Star } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

export function AnimalNFTCreator() {
  const [animalNFT, setAnimalNFT] = useState({
    name: '',
    species: '',
    rarity: [75],
    conservationValue: [85],
    trackingEnabled: true,
    realAnimal: true
  })

  const handleCreateNFT = () => {
    toast.success(`🐾 Created Animal NFT: ${animalNFT.name}!`, {
      description: `Species: ${animalNFT.species} | Rarity: ${animalNFT.rarity[0]}% | Conservation Impact: High`,
      duration: 5000
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Camera className="h-6 w-6" />
            🎨 Animal NFT Creator
          </CardTitle>
          <p className="text-muted-foreground">
            Create unique animal NFTs connected to real wildlife conservation efforts
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-green-400 mb-2 block">Animal Name</label>
              <Input
                placeholder="e.g., Thunder the Eagle"
                value={animalNFT.name}
                onChange={(e) => setAnimalNFT(prev => ({ ...prev, name: e.target.value }))}
                className="border-green-500/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-blue-400 mb-2 block">Species</label>
              <Input
                placeholder="e.g., Golden Eagle"
                value={animalNFT.species}
                onChange={(e) => setAnimalNFT(prev => ({ ...prev, species: e.target.value }))}
                className="border-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-purple-400 mb-2 block">
              Rarity Level: {animalNFT.rarity[0]}%
            </label>
            <Slider
              value={animalNFT.rarity}
              onValueChange={(value) => setAnimalNFT(prev => ({ ...prev, rarity: value }))}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-cyan-400 mb-2 block">
              Conservation Impact: {animalNFT.conservationValue[0]}%
            </label>
            <Slider
              value={animalNFT.conservationValue}
              onValueChange={(value) => setAnimalNFT(prev => ({ ...prev, conservationValue: value }))}
              max={100}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded border border-blue-500/20">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400">Real Animal Tracking</span>
              </div>
              <Badge className="bg-green-600">ENABLED</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-900/20 rounded border border-green-500/20">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Conservation Connected</span>
              </div>
              <Badge className="bg-green-600">ACTIVE</Badge>
            </div>
          </div>

          <Button onClick={handleCreateNFT} className="w-full bg-green-600 hover:bg-green-700">
            <Camera className="h-4 w-4 mr-2" />
            Create Animal NFT
          </Button>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Star className="h-6 w-6" />
            🖼️ NFT Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-square bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-lg border border-blue-500/20 flex flex-col items-center justify-center p-6">
            <div className="text-8xl mb-4">🦅</div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-blue-400">
                {animalNFT.name || 'Unnamed Animal'}
              </h3>
              <p className="text-muted-foreground">
                {animalNFT.species || 'Species not specified'}
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <Badge className="bg-purple-600">
                  Rarity: {animalNFT.rarity[0]}%
                </Badge>
                <Badge className="bg-green-600">
                  Conservation: {animalNFT.conservationValue[0]}%
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Powered by:</span>
              <span className="text-green-400 font-bold">{GAIA_TOKEN.SYMBOL} Token</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network:</span>
              <span className="text-blue-400">{GAIA_TOKEN.NETWORK}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Real-Time Tracking:</span>
              <Badge className="bg-green-600 text-xs">ENABLED</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
