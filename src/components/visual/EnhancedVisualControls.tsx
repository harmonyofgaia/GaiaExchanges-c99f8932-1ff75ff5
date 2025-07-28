import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from "@/components/ui/slider"
import {
  Settings,
  Palette,
  Brush,
  LayoutDashboard,
  Code,
  Wand2,
  Lock,
  Unlock,
  Dice,
  RotateCcw,
  Eye
} from 'lucide-react'
import { toast } from 'sonner'
import { useGlobalBackground } from '@/hooks/useGlobalBackground'
import { useDebounce } from '@/hooks/useDebounce'

const aiPaletteEndpoint = 'https://api.openai.com/v1/chat/completions'

export function EnhancedVisualControls() {
  const [siteTitle, setSiteTitle] = useState('GAiA - Harmony of Life')
  const [siteDescription, setSiteDescription] = useState('The future of sustainable finance and entertainment')
  const [primaryColor, setPrimaryColor] = useState('#0070f3')
  const [secondaryColor, setSecondaryColor] = useState('#6c757d')
  const [accentColor, setAccentColor] = useState('#ff4581')
  const [backgroundColor, setBackgroundColor] = useState('#1a202c')
  const [fontFamily, setFontFamily] = useState('Inter, sans-serif')
  const [fontSize, setFontSize] = useState(16)
  const [lineHeight, setLineHeight] = useState(1.5)
  const [containerWidth, setContainerWidth] = useState(1200)
  const [padding, setPadding] = useState(16)
  const [margin, setMargin] = useState(24)
  const [customCSS, setCustomCSS] = useState('')
  const [backgroundIntensity, setBackgroundIntensity] = useState([50])
  const [backgroundSpeed, setBackgroundSpeed] = useState([100])
  const debouncedIntensity = useDebounce(backgroundIntensity[0], 500)
  const debouncedSpeed = useDebounce(backgroundSpeed[0], 500)
  const { backgroundStyle, changeBackground } = useGlobalBackground()
  const backgroundOptions = [
    'classic', 'plasma', 'galaxy', 'forest', 'ocean', 'fire', 'ice', 'void', 'rainbow', 'matrix'
  ]

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--background-intensity', `${debouncedIntensity / 100}`);
    }
  }, [debouncedIntensity])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--background-speed', `${debouncedSpeed / 100}`);
    }
  }, [debouncedSpeed])

  const applyColorPalette = (colors: any) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement as HTMLElement;
      if (root.style) {
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--accent', colors.accent);
        root.style.setProperty('--background', colors.background);
      }
    }
    
    toast.success('Color palette applied successfully!');
  };

  const generateAIPalette = async () => {
    try {
      const response = await fetch(aiPaletteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a color palette generator. Provide a JSON object with primary, secondary, accent, and background colors based on the theme.'
            },
            {
              role: 'user',
              content: `Generate a color palette for a vibrant and modern web design, focusing on themes related to ${siteTitle} and ${siteDescription}.`
            }
          ],
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      const palette = JSON.parse(data.choices[0].message.content)
      applyColorPalette(palette)
      toast.success('AI-generated palette applied!')
    } catch (error: any) {
      console.error('AI Palette Generation Error:', error)
      toast.error(`Failed to generate AI palette: ${error.message}`)
    }
  }

  const shuffleBackground = () => {
    const newBackground = backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)]
    changeBackground(newBackground)
    toast.success(`Background shuffled to ${newBackground}!`)
  }

  const resetBackground = () => {
    changeBackground('classic')
    toast.success('Background reset to classic!')
  }

  const handleIntensityChange = (value: number[]) => {
    setBackgroundIntensity(value)
  }

  const handleSpeedChange = (value: number[]) => {
    setBackgroundSpeed(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* General Settings */}
      <Card className="bg-muted/50 border border-muted/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            <Settings className="mr-2 h-4 w-4 inline-block" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site-title">Site Title</Label>
            <Input
              id="site-title"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="site-description">Site Description</Label>
            <Textarea
              id="site-description"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card className="bg-muted/50 border border-muted/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            <Palette className="mr-2 h-4 w-4 inline-block" />
            Color Palette
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <Input
                type="color"
                id="primary-color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <Input
                type="color"
                id="secondary-color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accent-color">Accent Color</Label>
              <Input
                type="color"
                id="accent-color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="background-color">Background Color</Label>
              <Input
                type="color"
                id="background-color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={generateAIPalette}>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate AI Palette
          </Button>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card className="bg-muted/50 border border-muted/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            <Brush className="mr-2 h-4 w-4 inline-block" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Input
              id="font-family"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="font-size">Font Size (px)</Label>
              <Input
                type="number"
                id="font-size"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="line-height">Line Height</Label>
              <Input
                type="number"
                step="0.1"
                id="line-height"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout */}
      <Card className="bg-muted/50 border border-muted/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            <LayoutDashboard className="mr-2 h-4 w-4 inline-block" />
            Layout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="container-width">Container Width (px)</Label>
            <Input
              type="number"
              id="container-width"
              value={containerWidth}
              onChange={(e) => setContainerWidth(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="padding">Padding (px)</Label>
              <Input
                type="number"
                id="padding"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="margin">Margin (px)</Label>
              <Input
                type="number"
                id="margin"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom CSS */}
      <Card className="bg-muted/50 border border-muted/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            <Code className="mr-2 h-4 w-4 inline-block" />
            Custom CSS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="custom-css">Custom CSS</Label>
            <Textarea
              id="custom-css"
              placeholder="Enter your custom CSS here"
              value={customCSS}
              onChange={(e) => setCustomCSS(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Background Effects */}
      <Card className="bg-muted/50 border border-muted/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            <Eye className="mr-2 h-4 w-4 inline-block" />
            Background Effects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Background Style</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {backgroundOptions.map(option => (
                <Badge
                  key={option}
                  variant={backgroundStyle === option ? 'secondary' : 'outline'}
                  onClick={() => changeBackground(option)}
                  className="cursor-pointer"
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="background-intensity">Intensity (%)</Label>
              <Slider
                id="background-intensity"
                defaultValue={backgroundIntensity}
                max={100}
                step={1}
                onValueChange={handleIntensityChange}
              />
            </div>
            <div>
              <Label htmlFor="background-speed">Speed (%)</Label>
              <Slider
                id="background-speed"
                defaultValue={backgroundSpeed}
                max={200}
                step={1}
                onValueChange={handleSpeedChange}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={shuffleBackground}>
              <Dice className="mr-2 h-4 w-4" />
              Shuffle
            </Button>
            <Button variant="ghost" onClick={resetBackground}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
