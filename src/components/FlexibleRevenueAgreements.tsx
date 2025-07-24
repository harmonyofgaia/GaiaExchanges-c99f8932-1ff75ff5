
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Handshake, Calculator, Save } from 'lucide-react'

interface RevenueAgreement {
  foundationPercentage: number
  artistPercentage: number
  gaiaTokensPerViewer: number
  minimumViewers: number
  bonusThreshold: number
  bonusPercentage: number
}

interface RevenuePreset {
  name: string
  foundation: number
  artist: number
  tokens: number
}

export function FlexibleRevenueAgreements() {
  const [agreement, setAgreement] = useState<RevenueAgreement>({
    foundationPercentage: 50,
    artistPercentage: 50,
    gaiaTokensPerViewer: 1,
    minimumViewers: 10,
    bonusThreshold: 1000,
    bonusPercentage: 5
  })

  const [customAgreements, setCustomAgreements] = useState<RevenuePreset[]>([
    { name: "Eco-Priority", foundation: 60, artist: 40, tokens: 1.2 },
    { name: "Artist-Focus", foundation: 35, artist: 65, tokens: 0.8 },
    { name: "Balanced Growth", foundation: 50, artist: 50, tokens: 1.0 },
    { name: "High Impact", foundation: 70, artist: 30, tokens: 1.5 }
  ])

  const updateFoundationPercentage = (value: number[]) => {
    const foundation = value[0]
    const artist = 100 - foundation
    setAgreement({
      ...agreement,
      foundationPercentage: foundation,
      artistPercentage: artist
    })
  }

  const updateTokensPerViewer = (value: number[]) => {
    setAgreement({
      ...agreement,
      gaiaTokensPerViewer: value[0] / 10 // Slider gives 0-50, we want 0-5
    })
  }

  const applyPreset = (preset: RevenuePreset) => {
    setAgreement({
      ...agreement,
      foundationPercentage: preset.foundation,
      artistPercentage: preset.artist,
      gaiaTokensPerViewer: preset.tokens
    })
  }

  const calculateEstimatedRevenue = (viewers: number) => {
    const baseRevenue = viewers * 0.10 // $0.10 per viewer base
    const foundationShare = (baseRevenue * agreement.foundationPercentage) / 100
    const artistShare = (baseRevenue * agreement.artistPercentage) / 100
    const tokensBurned = viewers * agreement.gaiaTokensPerViewer
    
    return { baseRevenue, foundationShare, artistShare, tokensBurned }
  }

  const estimates = calculateEstimatedRevenue(1000) // Example with 1000 viewers

  return (
    <Card className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border-emerald-500/20">
      <CardHeader>
        <CardTitle className="text-emerald-400 flex items-center gap-2">
          <Handshake className="w-5 h-5" />
          🤝 FLEXIBLE REVENUE AGREEMENTS
        </CardTitle>
        <p className="text-muted-foreground">
          Create custom revenue splits that work for both foundation and artists
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Presets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {customAgreements.map((preset, index) => (
            <Button
              key={index}
              onClick={() => applyPreset(preset)}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto border-emerald-500/20 hover:border-emerald-400"
            >
              <div className="font-bold text-emerald-400">{preset.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {preset.foundation}% / {preset.artist}%
              </div>
              <div className="text-xs text-yellow-400">
                {preset.tokens} GAiA/viewer
              </div>
            </Button>
          ))}
        </div>

        {/* Custom Sliders */}
        <div className="space-y-6">
          {/* Foundation vs Artist Split */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-400">Foundation / Artist Split</span>
              <Badge className="bg-emerald-600 text-white">
                {agreement.foundationPercentage}% / {agreement.artistPercentage}%
              </Badge>
            </div>
            
            <Slider
              value={[agreement.foundationPercentage]}
              onValueChange={updateFoundationPercentage}
              max={90}
              min={10}
              step={5}
              className="w-full"
            />
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Foundation Priority</span>
              <span>Artist Priority</span>
            </div>
          </div>

          {/* GAiA Tokens per Viewer */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-yellow-400">GAiA Tokens per Viewer</span>
              <Badge className="bg-yellow-600 text-white">
                {agreement.gaiaTokensPerViewer.toFixed(1)} GAiA
              </Badge>
            </div>
            
            <Slider
              value={[agreement.gaiaTokensPerViewer * 10]}
              onValueChange={updateTokensPerViewer}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0.1 GAiA/viewer</span>
              <span>5.0 GAiA/viewer</span>
            </div>
          </div>

          {/* Additional Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2">
                Minimum Viewers
              </label>
              <Input
                type="number"
                value={agreement.minimumViewers}
                onChange={(e) => setAgreement({
                  ...agreement,
                  minimumViewers: parseInt(e.target.value) || 0
                })}
                className="bg-black/20 border-cyan-500/20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-400 mb-2">
                Bonus Threshold
              </label>
              <Input
                type="number"
                value={agreement.bonusThreshold}
                onChange={(e) => setAgreement({
                  ...agreement,
                  bonusThreshold: parseInt(e.target.value) || 0
                })}
                className="bg-black/20 border-purple-500/20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-pink-400 mb-2">
                Bonus Percentage
              </label>
              <Input
                type="number"
                value={agreement.bonusPercentage}
                onChange={(e) => setAgreement({
                  ...agreement,
                  bonusPercentage: parseInt(e.target.value) || 0
                })}
                className="bg-black/20 border-pink-500/20"
              />
            </div>
          </div>
        </div>

        {/* Revenue Calculator */}
        <Card className="bg-black/30 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Revenue Estimator (1000 viewers example)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  ${estimates.foundationShare.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Foundation Share</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  ${estimates.artistShare.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Artist Share</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {estimates.tokensBurned.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">GAiA Burned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  ${estimates.baseRevenue.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Agreement */}
        <div className="flex gap-4">
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Custom Agreement
          </Button>
          <Button 
            variant="outline" 
            className="border-emerald-500/30 text-emerald-400"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Preview Contract
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
