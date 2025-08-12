
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Crown, Zap, Shield, Sword, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface Character {
  id: string
  name: string
  class: string
  rarity: 'legendary' | 'epic' | 'quantum'
  powerLevel: number
  abilities: string[]
  description: string
  resolution: string
  fileSize: string
}

export function Elite4KCharacters() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

  const characters: Character[] = [
    {
      id: 'char-001',
      name: '🐉 Cyber Dragon Empress',
      class: 'Quantum Warrior',
      rarity: 'quantum',
      powerLevel: 9999,
      abilities: ['Dragon Fire Breath', 'Cyber Enhancement', 'Reality Manipulation'],
      description: 'Biomechanical dragon hybrid with quantum consciousness and cyberpunk aesthetics',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '2.8 GB'
    },
    {
      id: 'char-002',
      name: '❄️ Ice Globe Guardian',
      class: 'Frost Mage',
      rarity: 'legendary',
      powerLevel: 8750,
      abilities: ['Ice Globe Creation', 'Frost Storm', 'Crystal Armor'],
      description: 'Master of ice magic dwelling within frozen crystal spheres',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '2.4 GB'
    },
    {
      id: 'char-003',
      name: '🤖 Neural Assassin',
      class: 'Cyberpunk Stealth',
      rarity: 'epic',
      powerLevel: 7200,
      abilities: ['Neural Hacking', 'Optical Camouflage', 'Quantum Blade'],
      description: 'Elite cybernetic assassin with neural interface capabilities',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '2.1 GB'
    },
    {
      id: 'char-004',
      name: '🌲 Forest Spirit Shaman',
      class: 'Nature Oracle',
      rarity: 'legendary',
      powerLevel: 8900,
      abilities: ['Tree Communication', 'Nature\'s Wrath', 'Healing Aura'],
      description: 'Ancient forest guardian with deep connection to Gaia\'s life force',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '2.6 GB'
    },
    {
      id: 'char-005',
      name: '⚡ Quantum Berserker',
      class: 'Rage Fighter',
      rarity: 'quantum',
      powerLevel: 9800,
      abilities: ['Quantum Rage', 'Reality Tear', 'Berserker Mode'],
      description: 'Unstoppable warrior channeling quantum energy through pure rage',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '3.1 GB'
    },
    {
      id: 'char-006',
      name: '👑 Halo Spartan Elite',
      class: 'Military Commander',
      rarity: 'legendary',
      powerLevel: 8500,
      abilities: ['Energy Shield', 'Tactical Command', 'Plasma Weapons'],
      description: 'Enhanced super soldier with Halo-inspired armor and weaponry',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '2.9 GB'
    },
    {
      id: 'char-007',
      name: '🔥 Cyberpunk Netrunner',
      class: 'Digital Ghost',
      rarity: 'epic',
      powerLevel: 7800,
      abilities: ['Data Mining', 'System Override', 'Digital Phantom'],
      description: 'Master hacker navigating both physical and digital realms',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '2.3 GB'
    },
    {
      id: 'char-008',
      name: '🛡️ Crystal Knight',
      class: 'Defender',
      rarity: 'legendary',
      powerLevel: 8200,
      abilities: ['Crystal Shield', 'Ice Sword', 'Frozen Fortress'],
      description: 'Noble knight forged from crystalline ice with unbreakable armor',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '2.7 GB'
    },
    {
      id: 'char-009',
      name: '🌟 Quantum Angel',
      class: 'Divine Support',
      rarity: 'quantum',
      powerLevel: 9500,
      abilities: ['Divine Healing', 'Quantum Wings', 'Reality Blessing'],
      description: 'Celestial being infused with quantum energy and divine power',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '3.0 GB'
    },
    {
      id: 'char-010',
      name: '🐺 Bio-Mechanical Wolf',
      class: 'Beast Hunter',
      rarity: 'epic',
      powerLevel: 7600,
      abilities: ['Pack Leader', 'Mechanical Claws', 'Cyber Howl'],
      description: 'Enhanced wolf with biomechanical augmentations and AI consciousness',
      resolution: '4K Ultra HD (3840×2160)',
      fileSize: '2.5 GB'
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'quantum': return 'from-purple-600 via-pink-600 to-purple-600'
      case 'legendary': return 'from-yellow-600 via-orange-600 to-yellow-600'
      case 'epic': return 'from-blue-600 via-cyan-600 to-blue-600'
      default: return 'from-gray-600 via-slate-600 to-gray-600'
    }
  }

  const selectCharacter = (character: Character) => {
    setSelectedCharacter(character)
    toast.success(`Selected ${character.name}!`, {
      description: `${character.class} • Power Level: ${character.powerLevel}`,
      duration: 3000
    })
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Users className="h-6 w-6" />
          👥 ELITE 4K CHARACTER COLLECTION
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-purple-600 text-white">
            📺 4K Ultra HD Resolution
          </Badge>
          <Badge className="bg-green-600 text-white">
            👥 10 Unique Characters
          </Badge>
          <Badge className="bg-blue-600 text-white">
            💾 25+ GB Total Assets
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {characters.map((character) => (
            <Card 
              key={character.id}
              className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                selectedCharacter?.id === character.id 
                  ? 'border-purple-500 bg-purple-900/30' 
                  : 'border-gray-600 hover:border-blue-500'
              } bg-gradient-to-br ${getRarityColor(character.rarity)} bg-opacity-10`}
              onClick={() => selectCharacter(character)}
            >
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    {character.name.split(' ')[0]}
                  </div>
                  <h4 className="font-bold text-white text-xs mb-1">
                    {character.name.substring(2)}
                  </h4>
                  <div className="text-xs text-muted-foreground mb-2">{character.class}</div>
                  <Badge className={`bg-gradient-to-r ${getRarityColor(character.rarity)} text-white text-xs`}>
                    {character.rarity.toUpperCase()}
                  </Badge>
                  <div className="text-xs text-green-400 mt-1">
                    Power: {character.powerLevel.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Character Details */}
        {selectedCharacter && (
          <Card className={`bg-gradient-to-r ${getRarityColor(selectedCharacter.rarity)} bg-opacity-10 border-2`}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {selectedCharacter.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedCharacter.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class:</span>
                      <span className="text-blue-400">{selectedCharacter.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Power Level:</span>
                      <span className="text-green-400">{selectedCharacter.powerLevel.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Resolution:</span>
                      <span className="text-purple-400">{selectedCharacter.resolution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File Size:</span>
                      <span className="text-orange-400">{selectedCharacter.fileSize}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-cyan-400">Special Abilities:</h4>
                    {selectedCharacter.abilities.map((ability, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{ability}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-64 bg-black rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">
                        {selectedCharacter.name.split(' ')[0]}
                      </div>
                      <div className="text-xl font-bold text-white mb-2">
                        4K ULTRA HD
                      </div>
                      <div className="text-lg text-purple-400 animate-pulse">
                        {selectedCharacter.resolution}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
