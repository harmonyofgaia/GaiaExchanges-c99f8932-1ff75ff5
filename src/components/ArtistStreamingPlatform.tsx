import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Play, 
  Pause, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  Music, 
  Video,
  Heart,
  Share2,
  Star,
  Leaf,
  Eye,
  TrendingUp,
  Coins,
  Flame
} from 'lucide-react'
import { AbstractArtOverlay } from '@/components/ui/abstract-art-overlay'
import { PhantomWalletConnector } from '@/components/PhantomWalletConnector'
import { FlexibleRevenueAgreements } from '@/components/FlexibleRevenueAgreements'
import { ExclusiveNFTShowcase } from '@/components/ExclusiveNFTShowcase'

interface StreamingSlot {
  id: string
  time: string
  date: string
  artist: string
  genre: string
  status: 'available' | 'booked' | 'live'
  viewers?: number
  revenue?: number
}

interface LiveStream {
  id: string
  artist: string
  title: string
  viewers: number
  revenue: number
  duration: string
  category: string
  environmentalImpact: number
  gaiaTokensBurned: number
  foundationSplit: number
  artistSplit: number
}

interface RevenueAgreement {
  foundationPercentage: number
  artistPercentage: number
  gaiaTokensPerViewer: number
  investmentTargets: string[]
}

export function ArtistStreamingPlatform() {
  const [activeStreams, setActiveStreams] = useState<LiveStream[]>([
    {
      id: '1',
      artist: 'EcoSoul Collective',
      title: 'Nature Sounds & Healing Frequencies',
      viewers: 1247,
      revenue: 89.32,
      duration: '02:34:12',
      category: 'Ambient/Healing',
      environmentalImpact: 45.2,
      gaiaTokensBurned: 1247,
      foundationSplit: 44.66,
      artistSplit: 44.66
    },
    {
      id: '2',
      artist: 'Green Harmony Band',
      title: 'Live from the Forest - Acoustic Session',
      viewers: 892,
      revenue: 67.89,
      duration: '01:45:33',
      category: 'Folk/Acoustic',
      environmentalImpact: 32.8,
      gaiaTokensBurned: 892,
      foundationSplit: 33.95,
      artistSplit: 33.95
    }
  ])

  const [schedule, setSchedule] = useState<StreamingSlot[]>([
    { id: '1', time: '14:00', date: '2024-12-29', artist: 'Available', genre: 'Any', status: 'available' },
    { id: '2', time: '16:00', date: '2024-12-29', artist: 'Ocean Waves Trio', genre: 'Ambient', status: 'booked' },
    { id: '3', time: '18:00', date: '2024-12-29', artist: 'Earth Guardians', genre: 'Rock', status: 'live', viewers: 432, revenue: 23.45 },
    { id: '4', time: '20:00', date: '2024-12-29', artist: 'Available', genre: 'Any', status: 'available' },
    { id: '5', time: '22:00', date: '2024-12-29', artist: 'Gaia Symphony', genre: 'Classical', status: 'booked' }
  ])

  const [applicationForm, setApplicationForm] = useState({
    artistName: '',
    email: '',
    genre: '',
    description: '',
    streamingLink: '',
    preferredTime: '',
    environmentalCause: '',
    revenueAgreement: 'foundation_artist_50_50' as 'foundation_artist_50_50' | 'foundation_60_artist_40' | 'foundation_40_artist_60'
  })

  const [revenueAgreement, setRevenueAgreement] = useState<RevenueAgreement>({
    foundationPercentage: 50,
    artistPercentage: 50,
    gaiaTokensPerViewer: 1,
    investmentTargets: ['Coral Reef Restoration', 'Forest Regeneration', 'Ocean Cleanup', 'Renewable Energy']
  })

  const totalViewers = activeStreams.reduce((sum, stream) => sum + stream.viewers, 0)
  const totalRevenue = activeStreams.reduce((sum, stream) => sum + stream.revenue, 0)
  const totalEnvironmentalImpact = activeStreams.reduce((sum, stream) => sum + stream.environmentalImpact, 0)
  const totalGaiaTokensBurned = activeStreams.reduce((sum, stream) => sum + stream.gaiaTokensBurned, 0)

  const handleApplication = () => {
    const agreementDetails = {
      ...applicationForm,
      revenueAgreement: revenueAgreement,
      submissionDate: new Date().toISOString(),
      gaiaTokenAddress: 'ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7'
    }
    
    console.log('Artist Application with Revenue Agreement:', agreementDetails)
    alert(`Application submitted with ${revenueAgreement.foundationPercentage}/${revenueAgreement.artistPercentage} revenue split! We'll contact you at ${applicationForm.email} with streaming details and investment agreement.`)
    
    setApplicationForm({
      artistName: '',
      email: '',
      genre: '',
      description: '',
      streamingLink: '',
      preferredTime: '',
      environmentalCause: '',
      revenueAgreement: 'foundation_artist_50_50'
    })
  }

  const updateRevenueAgreement = (type: string) => {
    switch (type) {
      case 'foundation_artist_50_50':
        setRevenueAgreement({...revenueAgreement, foundationPercentage: 50, artistPercentage: 50})
        break
      case 'foundation_60_artist_40':
        setRevenueAgreement({...revenueAgreement, foundationPercentage: 60, artistPercentage: 40})
        break
      case 'foundation_40_artist_60':
        setRevenueAgreement({...revenueAgreement, foundationPercentage: 40, artistPercentage: 60})
        break
    }
  }

  return (
    <div className="space-y-8 p-6 relative">
      <AbstractArtOverlay artType="quantum" intensity="subtle" />
      
      {/* Platform Header */}
      <div className="text-center relative z-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          🎵 ARTIST STREAMING PLATFORM
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Perform Live • Earn Revenue • Support Environmental Causes • Burn GAiA Tokens
        </p>
        
        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalViewers.toLocaleString()}</div>
              <div className="text-sm text-green-300">Live Viewers</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
              <div className="text-sm text-blue-300">Total Revenue</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Leaf className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalEnvironmentalImpact.toFixed(1)}kg</div>
              <div className="text-sm text-purple-300">CO2 Offset</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Music className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{activeStreams.length}</div>
              <div className="text-sm text-orange-300">Live Streams</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalGaiaTokensBurned.toLocaleString()}</div>
              <div className="text-sm text-yellow-300">GAiA Burned</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Phantom Wallet Integration */}
      <PhantomWalletConnector />

      {/* Enhanced Flexible Revenue Agreement System */}
      <FlexibleRevenueAgreements />

      {/* Exclusive NFT Showcase */}
      <ExclusiveNFTShowcase />

      {/* Live Streams with Revenue Tracking */}
      <Card className="bg-gradient-to-br from-gray-900/40 to-black/40 border-green-500/20 relative">
        <AbstractArtOverlay artType="waves" intensity="subtle" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Play className="w-5 h-5" />
            Live Performances with Revenue Sharing
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeStreams.map((stream) => (
              <Card key={stream.id} className="bg-black/30 border-green-500/30">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg">{stream.artist}</CardTitle>
                      <p className="text-green-300">{stream.title}</p>
                      <Badge className="mt-2 bg-green-500/20 text-green-300">{stream.category}</Badge>
                    </div>
                    <Badge className="bg-red-500 text-white animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      LIVE
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Duration: {stream.duration}</span>
                      <span className="text-gray-300">Impact: {stream.environmentalImpact}kg CO2</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-blue-300">
                        <Eye className="w-4 h-4" />
                        {stream.viewers.toLocaleString()} viewers
                      </div>
                      <div className="flex items-center gap-2 text-green-300">
                        <DollarSign className="w-4 h-4" />
                        ${stream.revenue.toFixed(2)}
                      </div>
                      <div className="flex items-center gap-2 text-yellow-300">
                        <Coins className="w-4 h-4" />
                        {stream.gaiaTokensBurned} GAiA
                      </div>
                      <div className="flex items-center gap-2 text-purple-300">
                        <Flame className="w-4 h-4" />
                        Burned for Reinvestment
                      </div>
                    </div>

                    {/* Revenue Split Display */}
                    <div className="p-3 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded border border-green-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-green-400">Revenue Split:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-bold text-green-300">${stream.foundationSplit.toFixed(2)}</div>
                          <div className="text-muted-foreground">Foundation (50%)</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-300">${stream.artistSplit.toFixed(2)}</div>
                          <div className="text-muted-foreground">Artist (50%)</div>
                        </div>
                      </div>
                    </div>
                    
                    <Progress value={(stream.viewers / 2000) * 100} className="h-2" />
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1">
                        <Heart className="w-4 h-4 mr-2" />
                        Support
                      </Button>
                      <Button size="sm" variant="outline" className="border-green-500/50 text-green-400">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Streaming Schedule */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20 relative">
        <AbstractArtOverlay artType="fractals" intensity="subtle" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Streaming Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            {schedule.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-white">{slot.time}</div>
                  <div>
                    <div className="text-white font-medium">{slot.artist}</div>
                    <div className="text-gray-400 text-sm">{slot.genre}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {slot.status === 'live' && (
                    <div className="flex items-center gap-2 text-green-400">
                      <Eye className="w-4 h-4" />
                      {slot.viewers} viewers
                      <DollarSign className="w-4 h-4 ml-2" />
                      ${slot.revenue?.toFixed(2)}
                    </div>
                  )}
                  
                  <Badge 
                    className={
                      slot.status === 'available' ? 'bg-green-500/20 text-green-300' :
                      slot.status === 'booked' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }
                  >
                    {slot.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Artist Application Form */}
      <Card className="bg-gradient-to-br from-cyan-900/20 to-teal-900/20 border-cyan-500/20 relative">
        <AbstractArtOverlay artType="matrix" intensity="medium" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Apply for Streaming Slot with Revenue Agreement
          </CardTitle>
          <p className="text-gray-300">Join our platform and help restore natural health through your art while earning revenue</p>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Artist Name"
              value={applicationForm.artistName}
              onChange={(e) => setApplicationForm({...applicationForm, artistName: e.target.value})}
              className="bg-black/20 border-cyan-500/20"
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={applicationForm.email}
              onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
              className="bg-black/20 border-cyan-500/20"
            />
            <Input
              placeholder="Music Genre"
              value={applicationForm.genre}
              onChange={(e) => setApplicationForm({...applicationForm, genre: e.target.value})}
              className="bg-black/20 border-cyan-500/20"
            />
            <Input
              placeholder="Preferred Time Slot"
              value={applicationForm.preferredTime}
              onChange={(e) => setApplicationForm({...applicationForm, preferredTime: e.target.value})}
              className="bg-black/20 border-cyan-500/20"
            />
          </div>
          
          <Input
            placeholder="Your Streaming Link (YouTube, Twitch, etc.)"
            value={applicationForm.streamingLink}
            onChange={(e) => setApplicationForm({...applicationForm, streamingLink: e.target.value})}
            className="bg-black/20 border-cyan-500/20"
          />
          
          <Textarea
            placeholder="Describe your performance and how it connects to environmental healing..."
            value={applicationForm.description}
            onChange={(e) => setApplicationForm({...applicationForm, description: e.target.value})}
            className="bg-black/20 border-cyan-500/20 min-h-[100px]"
          />
          
          <Textarea
            placeholder="Which environmental cause would you like to support with your performance?"
            value={applicationForm.environmentalCause}
            onChange={(e) => setApplicationForm({...applicationForm, environmentalCause: e.target.value})}
            className="bg-black/20 border-cyan-500/20 min-h-[80px]"
          />

          {/* Revenue Agreement Selection */}
          <div className="p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/20">
            <h4 className="font-bold text-purple-400 mb-3">Select Revenue Agreement:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant={applicationForm.revenueAgreement === 'foundation_artist_50_50' ? 'default' : 'outline'}
                onClick={() => setApplicationForm({...applicationForm, revenueAgreement: 'foundation_artist_50_50'})}
                className="text-center"
              >
                50% / 50%<br/>
                <span className="text-xs">Equal Split</span>
              </Button>
              <Button
                variant={applicationForm.revenueAgreement === 'foundation_60_artist_40' ? 'default' : 'outline'}
                onClick={() => setApplicationForm({...applicationForm, revenueAgreement: 'foundation_60_artist_40'})}
                className="text-center"
              >
                60% / 40%<br/>
                <span className="text-xs">Foundation Priority</span>
              </Button>
              <Button
                variant={applicationForm.revenueAgreement === 'foundation_40_artist_60' ? 'default' : 'outline'}
                onClick={() => setApplicationForm({...applicationForm, revenueAgreement: 'foundation_40_artist_60'})}
                className="text-center"
              >
                40% / 60%<br/>
                <span className="text-xs">Artist Priority</span>
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleApplication}
            className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
          >
            <Music className="w-4 h-4 mr-2" />
            Submit Application with Revenue Agreement
          </Button>
          
          <p className="text-sm text-gray-400 text-center">
            Applications will be sent to info@cultureofharmony.net for review with your selected revenue agreement
          </p>

          <div className="p-3 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded border border-yellow-500/20">
            <p className="text-sm text-yellow-300 text-center">
              <Coins className="w-4 h-4 inline mr-1" />
              GAiA Token: ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7
              <br/>1 GAiA token burned per viewer for environmental reinvestment
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
