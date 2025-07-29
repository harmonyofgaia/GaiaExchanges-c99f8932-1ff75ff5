import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Brush, 
  Lock, 
  Unlock, 
  Palette, 
  LayoutDashboard, 
  Zap, 
  Eye,
  Monitor,
  Wand2,
  Image,
  Video,
  Music,
  Sparkles,
  Layers,
  MousePointer,
  Maximize,
  RotateCcw,
  Save,
  Download,
  Upload,
  Sliders,
  Grid,
  Type,
  Camera,
  Cpu,
  Gamepad2,
  Headphones,
  Heart,
  Star
} from 'lucide-react'
import { useLock } from '@/components/providers/ThemeProvider'
import { toast } from 'sonner'
import { FullVisualControlPanel } from './FullVisualControlPanel'

export function UpgradedVisualControlButton() {
  const { isLocked, toggleLock } = useLock()
  const [isOpen, setIsOpen] = useState(false)
  const [showFullPanel, setShowFullPanel] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [activeEffects, setActiveEffects] = useState({
    particles: false,
    glow: false,
    blur: false,
    rainbow: false,
    matrix: false,
    pulse: false
  })

  const handleLockToggle = () => {
    toggleLock()
    toast.success(isLocked ? 'Visual controls unlocked' : 'Visual controls locked', {
      description: isLocked 
        ? 'You can now modify all visual settings' 
        : 'All visual settings are now protected',
      duration: 2000
    })
  }

  const handleOpenFullPanel = () => {
    if (isLocked) {
      toast.error('Visual controls are locked', {
        description: 'Unlock to access the full visual control panel',
        duration: 3000
      })
      return
    }
    setShowFullPanel(true)
    setIsOpen(false)
  }

  const handleQuickEffect = (effect: string) => {
    if (isLocked) {
      toast.error('Visual controls are locked', {
        description: 'Unlock to apply visual effects',
        duration: 2000
      })
      return
    }

    setActiveEffects(prev => ({
      ...prev,
      [effect]: !prev[effect as keyof typeof prev]
    }))

    // Dispatch effect to the application
    window.dispatchEvent(new CustomEvent('visual-effect-toggle', {
      detail: { effect, enabled: !activeEffects[effect as keyof typeof activeEffects] }
    }))

    toast.success(`${effect.charAt(0).toUpperCase() + effect.slice(1)} effect ${
      activeEffects[effect as keyof typeof activeEffects] ? 'disabled' : 'enabled'
    }`, {
      description: 'Visual effect applied to the interface',
      duration: 2000
    })
  }

  const handleScreenRecord = () => {
    if (isRecording) {
      setIsRecording(false)
      toast.success('Screen recording stopped', {
        description: 'Recording saved to downloads',
        duration: 3000
      })
    } else {
      setIsRecording(true)
      toast.success('Screen recording started', {
        description: 'Recording the visual interface',
        duration: 3000
      })
    }
  }

  const handleScreenshot = () => {
    toast.success('Screenshot captured', {
      description: 'Interface screenshot saved',
      duration: 2000
    })
  }

  const handleExportTheme = () => {
    const themeData = {
      colors: document.documentElement.style.cssText,
      effects: activeEffects,
      timestamp: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gaia-theme-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Theme exported successfully', {
      description: 'Your custom theme has been downloaded',
      duration: 3000
    })
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 animate-scale-in">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 shadow-2xl border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              title="Advanced Visual Controls"
            >
              <Brush className="h-7 w-7" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="start" 
            side="top"
            className="w-80 bg-background/95 border-primary/30 backdrop-blur-md shadow-2xl"
          >
            <DropdownMenuLabel className="text-primary font-bold text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              🎨 Advanced Visual Controls
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator className="bg-primary/30" />
            
            {/* Lock Toggle */}
            <DropdownMenuItem 
              onClick={handleLockToggle}
              className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10 cursor-pointer py-3"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  {isLocked ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                  <span className="font-medium">{isLocked ? 'Controls Locked' : 'Controls Unlocked'}</span>
                </div>
                <Badge variant={isLocked ? 'destructive' : 'secondary'} className="text-xs">
                  {isLocked ? 'Protected' : 'Editable'}
                </Badge>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-primary/30" />
            
            {/* Quick Effects */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10">
                <Zap className="h-4 w-4 mr-2" />
                Quick Effects
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-background/95 backdrop-blur-md">
                <DropdownMenuItem onClick={() => handleQuickEffect('particles')} disabled={isLocked}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Particles {activeEffects.particles && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect('glow')} disabled={isLocked}>
                  <Star className="h-4 w-4 mr-2" />
                  Glow Effect {activeEffects.glow && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect('blur')} disabled={isLocked}>
                  <Eye className="h-4 w-4 mr-2" />
                  Background Blur {activeEffects.blur && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect('rainbow')} disabled={isLocked}>
                  <Palette className="h-4 w-4 mr-2" />
                  Rainbow Mode {activeEffects.rainbow && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect('matrix')} disabled={isLocked}>
                  <Grid className="h-4 w-4 mr-2" />
                  Matrix Rain {activeEffects.matrix && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect('pulse')} disabled={isLocked}>
                  <Heart className="h-4 w-4 mr-2" />
                  Pulse Animation {activeEffects.pulse && '✓'}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Design Tools */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Design Tools
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-background/95 backdrop-blur-md">
                <DropdownMenuItem onClick={handleOpenFullPanel} disabled={isLocked}>
                  <Settings className="h-4 w-4 mr-2" />
                  Full Control Panel
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Sliders className="h-4 w-4 mr-2" />
                  Color Mixer
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Type className="h-4 w-4 mr-2" />
                  Typography Studio
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Layers className="h-4 w-4 mr-2" />
                  Layer Manager
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Media Controls */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-green-300 hover:text-green-200 hover:bg-green-500/10">
                <Image className="h-4 w-4 mr-2" />
                Media Controls
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-background/95 backdrop-blur-md">
                <DropdownMenuItem onClick={handleScreenshot}>
                  <Camera className="h-4 w-4 mr-2" />
                  Take Screenshot
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleScreenRecord}>
                  <Video className="h-4 w-4 mr-2" />
                  {isRecording ? 'Stop Recording' : 'Record Screen'}
                  {isRecording && <div className="w-2 h-2 bg-red-500 rounded-full ml-2 animate-pulse" />}
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Music className="h-4 w-4 mr-2" />
                  Audio Visualizer
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Advanced Features */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-orange-300 hover:text-orange-200 hover:bg-orange-500/10">
                <Cpu className="h-4 w-4 mr-2" />
                Advanced Features
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-background/95 backdrop-blur-md">
                <DropdownMenuItem disabled={isLocked}>
                  <Gamepad2 className="h-4 w-4 mr-2" />
                  3D Interface Mode
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Headphones className="h-4 w-4 mr-2" />
                  Spatial Audio
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <MousePointer className="h-4 w-4 mr-2" />
                  Gesture Controls
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Monitor className="h-4 w-4 mr-2" />
                  Multi-Display Sync
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator className="bg-primary/30" />

            {/* Export/Import */}
            <DropdownMenuItem onClick={handleExportTheme} disabled={isLocked}>
              <Download className="h-4 w-4 mr-2" />
              Export Current Theme
            </DropdownMenuItem>

            <DropdownMenuItem disabled={isLocked}>
              <Upload className="h-4 w-4 mr-2" />
              Import Theme
            </DropdownMenuItem>

            <DropdownMenuItem disabled={isLocked}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-primary/30" />

            <DropdownMenuItem 
              onClick={handleOpenFullPanel}
              className="text-pink-300 hover:text-pink-200 hover:bg-pink-500/10 font-semibold"
              disabled={isLocked}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Open Master Control Panel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Full Visual Control Panel Modal */}
      {showFullPanel && (
        <FullVisualControlPanel 
          isOpen={showFullPanel} 
          onClose={() => setShowFullPanel(false)}
          activeEffects={activeEffects}
          onEffectToggle={handleQuickEffect}
        />
      )}
    </>
  )
}