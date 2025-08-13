
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Globe, 
  MapPin, 
  Camera, 
  Video, 
  Upload,
  Headphones,
  Users,
  Star,
  Navigation,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface Animal {
  id: string
  name: string
  species: string
  emoji: string
  fundingGoal: number
  currentFunding: number
  topInvestor: {
    name: string
    nftCount: number
    totalInvested: number
  }
  location: {
    lat: number
    lng: number
    country: string
  }
  relocationReady: boolean
}

interface RelocationSite {
  id: string
  name: string
  lat: number
  lng: number
  country: string
  habitat: string
  suitability: number
  verified: boolean
}

export function GlobalRelocationMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapView, setMapView] = useState<'earth' | 'local'>('earth')
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [vrActive, setVrActive] = useState(false)
  const [uploadMode, setUploadMode] = useState<'photo' | 'video' | 'stream' | null>(null)

  const [animals] = useState<Animal[]>([
    {
      id: '1',
      name: 'Maya',
      species: 'Bengal Tiger',
      emoji: '🐅',
      fundingGoal: 25000,
      currentFunding: 25000,
      topInvestor: {
        name: 'WildlifeGuardian_42',
        nftCount: 15,
        totalInvested: 8500
      },
      location: { lat: 20.5937, lng: 78.9629, country: 'India' },
      relocationReady: true
    },
    {
      id: '2',
      name: 'Charlie',
      species: 'Rescued Elephant',
      emoji: '🐘',
      fundingGoal: 45000,
      currentFunding: 45000,
      topInvestor: {
        name: 'ElephantProtector',
        nftCount: 23,
        totalInvested: 15200
      },
      location: { lat: -1.2921, lng: 36.8219, country: 'Kenya' },
      relocationReady: true
    }
  ])

  const [relocationSites] = useState<RelocationSite[]>([
    {
      id: 'site_1',
      name: 'Kaziranga National Park',
      lat: 26.7509, 
      lng: 93.3956,
      country: 'India',
      habitat: 'Grassland & Forest',
      suitability: 98,
      verified: true
    },
    {
      id: 'site_2',
      name: 'Amboseli National Park',
      lat: -2.6527,
      lng: 37.2606,
      country: 'Kenya',
      habitat: 'Savannah',
      suitability: 95,
      verified: true
    },
    {
      id: 'site_3',
      name: 'Yellowstone National Park',
      lat: 44.4280,
      lng: -110.5885,
      country: 'USA',
      habitat: 'Mixed Forest',
      suitability: 87,
      verified: true
    }
  ])

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setMapView('local')
          toast.success('📍 Location pinned! Switching to local map view', {
            duration: 3000
          })
        },
        (error) => {
          toast.error('❌ Could not get your location. Please enable location services.')
        }
      )
    }
  }

  const startVRExperience = (animal: Animal) => {
    if (!animal.relocationReady) {
      toast.error('🚫 Animal funding goal not reached yet!')
      return
    }

    console.log(`🌍 STARTING GLOBAL VR EXPERIENCE FOR: ${animal.name}`)
    console.log(`👑 Top Investor: ${animal.topInvestor.name} (${animal.topInvestor.nftCount} NFTs)`)
    console.log(`🎯 Searching for relocation sites globally...`)
    
    setSelectedAnimal(animal)
    setVrActive(true)

    toast.success(`🥽 VR Global Search activated for ${animal.name}!`, {
      description: `As top investor, you can now explore the entire planet for the perfect habitat.`,
      duration: 5000
    })
  }

  const uploadRelocationContent = (type: 'photo' | 'video' | 'stream') => {
    setUploadMode(type)
    const contentType = type === 'stream' ? 'live stream' : type
    
    toast.success(`📹 ${contentType.charAt(0).toUpperCase() + contentType.slice(1)} upload activated!`, {
      description: 'Share the relocation journey with the community',
      duration: 4000
    })

    console.log(`📱 UPLOADING ${type.toUpperCase()} CONTENT`)
    console.log(`🦾 Real-time relocation documentation active`)
  }

  const endVRExperience = () => {
    setVrActive(false)
    setSelectedAnimal(null)
    toast.info('✨ VR experience completed! Thank you for helping find a new home.', {
      duration: 4000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Globe className="h-6 w-6" />
            🌍 Global Animal Relocation Map
          </CardTitle>
          <p className="text-muted-foreground">
            Explore the world to find perfect new habitats for rescued animals. Top NFT investors lead the relocation process.
          </p>
        </CardHeader>
      </Card>

      {/* Map View Toggle */}
      <div className="flex gap-4">
        <Button
          variant={mapView === 'earth' ? 'default' : 'outline'}
          onClick={() => setMapView('earth')}
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          Earth View
        </Button>
        <Button
          variant="outline"
          onClick={getUserLocation}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Pin My Location
        </Button>
        {userLocation && (
          <Button
            variant={mapView === 'local' ? 'default' : 'outline'}
            onClick={() => setMapView('local')}
            className="flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" />
            Local Area
          </Button>
        )}
      </div>

      {/* VR Experience Active */}
      {vrActive && selectedAnimal && (
        <Card className="border-green-500/50 bg-green-900/20 animate-pulse">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-6xl">{selectedAnimal.emoji}</div>
              <h3 className="text-2xl font-bold text-green-400">
                🥽 VR Global Exploration Active
              </h3>
              <p className="text-lg">
                Searching worldwide for the perfect habitat for {selectedAnimal.name}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => uploadRelocationContent('photo')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photos
                </Button>
                <Button
                  onClick={() => uploadRelocationContent('video')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Record Video
                </Button>
                <Button
                  onClick={() => uploadRelocationContent('stream')}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Live Stream
                </Button>
                <Button
                  onClick={endVRExperience}
                  variant="outline"
                  className="border-green-500/50"
                >
                  End Experience
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Container */}
      <Card className="min-h-[500px]">
        <CardContent className="p-0">
          <div ref={mapRef} className="relative w-full h-[500px] bg-gradient-to-b from-blue-900 to-green-900 rounded overflow-hidden">
            
            {mapView === 'earth' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-8xl animate-spin-slow">🌍</div>
                  <h3 className="text-2xl font-bold text-blue-400">Earth Overview</h3>
                  <p className="text-muted-foreground">Pin your location to explore local relocation sites</p>
                  
                  {/* Show animals ready for relocation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {animals.filter(a => a.relocationReady).map(animal => (
                      <div key={animal.id} className="bg-black/40 p-4 rounded border border-green-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-3xl">{animal.emoji}</div>
                          <div>
                            <h4 className="font-bold">{animal.name}</h4>
                            <p className="text-sm text-muted-foreground">{animal.location.country}</p>
                          </div>
                          <Badge className="bg-green-600">READY</Badge>
                        </div>
                        
                        <div className="bg-purple-900/30 p-3 rounded mb-3">
                          <div className="text-sm font-semibold text-purple-400">👑 Top Investor</div>
                          <div className="text-xs">{animal.topInvestor.name}</div>
                          <div className="text-xs text-yellow-400">
                            {animal.topInvestor.nftCount} NFTs • {animal.topInvestor.totalInvested} GAiA
                          </div>
                        </div>

                        <Button
                          onClick={() => startVRExperience(animal)}
                          className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                          disabled={vrActive}
                        >
                          <Headphones className="h-4 w-4 mr-2" />
                          Start Global VR Search
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mapView === 'local' && userLocation && (
              <div className="absolute inset-0 p-4">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">
                    📍 Local Area Exploration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relocationSites.map(site => (
                    <Card key={site.id} className="bg-black/40 border-blue-500/20">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold">{site.name}</h4>
                            {site.verified && (
                              <Badge className="bg-green-600">
                                <Star className="h-3 w-3 mr-1" />
                                VERIFIED
                              </Badge>
                            )}
                          </div>
                          
                          <div className="text-sm space-y-1">
                            <div>🌍 {site.country}</div>
                            <div>🌳 {site.habitat}</div>
                            <div>📍 {site.lat.toFixed(4)}, {site.lng.toFixed(4)}</div>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Habitat Suitability</span>
                              <span className="font-bold text-green-400">{site.suitability}%</span>
                            </div>
                            <Progress value={site.suitability} className="h-2" />
                          </div>

                          <Button
                            size="sm"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => toast.success(`🎯 Selected ${site.name} for VR exploration!`)}
                          >
                            <Zap className="h-3 w-3 mr-2" />
                            Explore in VR
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Floating particles for atmosphere */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Mode Active */}
      {uploadMode && (
        <Card className="border-orange-500/50 bg-orange-900/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-4xl">
                {uploadMode === 'photo' && '📷'}
                {uploadMode === 'video' && '🎥'}
                {uploadMode === 'stream' && '📡'}
              </div>
              <h3 className="text-xl font-bold text-orange-400">
                {uploadMode === 'stream' && '🔴 LIVE STREAM ACTIVE'}
                {uploadMode === 'video' && '🎬 VIDEO RECORDING'}
                {uploadMode === 'photo' && '📸 PHOTO MODE'}
              </h3>
              <p className="text-muted-foreground">
                Document the relocation journey and share with the community
              </p>
              <Button
                onClick={() => setUploadMode(null)}
                variant="outline"
                className="border-orange-500/50"
              >
                End {uploadMode === 'stream' ? 'Stream' : 'Recording'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
