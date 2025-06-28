
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Headphones, 
  Bluetooth, 
  Wifi, 
  Settings,
  Volume2,
  Mic,
  Eye,
  Gamepad2,
  Smartphone,
  Monitor,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

interface VRDevice {
  id: string
  name: string
  type: 'headset' | 'controller' | 'tracker'
  status: 'connected' | 'disconnected' | 'pairing'
  battery?: number
  icon: any
}

interface VRConnectionManagerProps {
  onConnectionChange: (connected: boolean) => void
  isConnected: boolean
}

export function VRConnectionManager({ onConnectionChange, isConnected }: VRConnectionManagerProps) {
  const [devices, setDevices] = useState<VRDevice[]>([
    { id: '1', name: 'GAIA VR Headset Pro', type: 'headset', status: 'disconnected', battery: 85, icon: Headphones },
    { id: '2', name: 'Left Controller', type: 'controller', status: 'disconnected', battery: 72, icon: Gamepad2 },
    { id: '3', name: 'Right Controller', type: 'controller', status: 'disconnected', battery: 68, icon: Gamepad2 },
    { id: '4', name: 'Phone Companion', type: 'tracker', status: 'disconnected', icon: Smartphone }
  ])

  const [audioSettings, setAudioSettings] = useState({
    spatialAudio: true,
    noiseReduction: true,
    voiceEnhancement: false,
    micSensitivity: 75,
    outputVolume: 80
  })

  const [connectionProgress, setConnectionProgress] = useState(0)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectVR = async () => {
    setIsConnecting(true)
    setConnectionProgress(0)
    
    toast.info('🔌 Initiating VR Connection...', {
      description: 'Scanning for GAIA VR devices...',
      duration: 3000
    })

    // Simulate connection process
    const steps = [
      { progress: 20, message: 'Scanning for devices...' },
      { progress: 40, message: 'Pairing VR headset...' },
      { progress: 60, message: 'Connecting controllers...' },
      { progress: 80, message: 'Calibrating tracking...' },
      { progress: 100, message: 'VR Ready!' }
    ]

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setConnectionProgress(step.progress)
      
      if (step.progress === 100) {
        setDevices(prev => prev.map(device => ({ 
          ...device, 
          status: 'connected' as const 
        })))
        onConnectionChange(true)
        setIsConnecting(false)
        
        toast.success('🎉 VR Connected Successfully!', {
          description: 'All devices paired and ready for immersive experience',
          duration: 5000
        })
      }
    }
  }

  const disconnectVR = () => {
    setDevices(prev => prev.map(device => ({ 
      ...device, 
      status: 'disconnected' as const 
    })))
    onConnectionChange(false)
    setConnectionProgress(0)
    
    toast.info('🔌 VR Disconnected', {
      description: 'All VR devices have been safely disconnected',
      duration: 3000
    })
  }

  return (
    <div className="space-y-6">
      
      {/* VR Connection Status */}
      <Card className={`bg-gradient-to-r ${isConnected ? 'from-green-900/30 to-emerald-900/30 border-green-500/30' : 'from-purple-900/30 to-pink-900/30 border-purple-500/30'}`}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isConnected ? 'text-green-400' : 'text-purple-400'}`}>
            <Headphones className="h-6 w-6" />
            🥽 VR Connection Manager - GAIA Immersive Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {isConnected ? (
              <>
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
                <h3 className="text-2xl font-bold text-green-400">VR Connected!</h3>
                <p className="text-green-200">
                  Immersive VR experience active. Enjoy crystal clear audio and seamless interaction!
                </p>
                <Button 
                  onClick={disconnectVR}
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-500/20"
                >
                  Disconnect VR
                </Button>
              </>
            ) : (
              <>
                <Headphones className="h-16 w-16 text-purple-400 mx-auto" />
                <h3 className="text-2xl font-bold text-purple-400">Connect Your VR Setup</h3>
                <p className="text-purple-200">
                  Experience GAIA Virtual World in full immersion with VR support
                </p>
                {isConnecting ? (
                  <div className="space-y-2">
                    <Progress value={connectionProgress} className="h-3" />
                    <p className="text-sm text-muted-foreground">Connecting... {connectionProgress}%</p>
                  </div>
                ) : (
                  <Button 
                    onClick={connectVR}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Bluetooth className="h-4 w-4 mr-2" />
                    Connect VR Devices
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Device Status */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Settings className="h-5 w-5" />
            VR Device Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                <div className="flex items-center gap-3">
                  <device.icon className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-sm">{device.name}</div>
                    <Badge className={
                      device.status === 'connected' ? 'bg-green-600' :
                      device.status === 'pairing' ? 'bg-yellow-600' : 'bg-gray-600'
                    }>
                      {device.status}
                    </Badge>
                  </div>
                </div>
                {device.battery && (
                  <div className="text-right">
                    <div className="text-sm font-medium">{device.battery}%</div>
                    <div className="text-xs text-muted-foreground">Battery</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Volume2 className="h-5 w-5" />
            VR Audio Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Audio Features */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="spatial-audio">Spatial Audio</Label>
                <Switch
                  id="spatial-audio"
                  checked={audioSettings.spatialAudio}
                  onCheckedChange={(checked) => setAudioSettings(prev => ({ ...prev, spatialAudio: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="noise-reduction">Noise Reduction</Label>
                <Switch
                  id="noise-reduction"
                  checked={audioSettings.noiseReduction}
                  onCheckedChange={(checked) => setAudioSettings(prev => ({ ...prev, noiseReduction: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-enhancement">Voice Enhancement</Label>
                <Switch
                  id="voice-enhancement"
                  checked={audioSettings.voiceEnhancement}
                  onCheckedChange={(checked) => setAudioSettings(prev => ({ ...prev, voiceEnhancement: checked }))}
                />
              </div>
            </div>

            {/* Volume Controls */}
            <div className="space-y-4">
              <div>
                <Label>Microphone Sensitivity: {audioSettings.micSensitivity}%</Label>
                <Progress value={audioSettings.micSensitivity} className="mt-2 h-2" />
              </div>
              
              <div>
                <Label>Output Volume: {audioSettings.outputVolume}%</Label>
                <Progress value={audioSettings.outputVolume} className="mt-2 h-2" />
              </div>
            </div>
          </div>

          {/* Audio Quality Indicator */}
          {isConnected && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <CheckCircle className="h-4 w-4" />
                Audio Quality: Excellent
              </div>
              <p className="text-sm text-green-200">
                Crystal clear 7.1 surround sound with noise cancellation active
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* VR Features */}
      <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-400">
            <Eye className="h-5 w-5" />
            VR Features & Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Eye className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="font-medium text-sm">360° Vision</div>
              <div className="text-xs text-muted-foreground">Full immersion</div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Gamepad2 className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="font-medium text-sm">Hand Tracking</div>
              <div className="text-xs text-muted-foreground">Natural gestures</div>
            </div>
            <div className="p-3 rounded-lg bg-green-500/10">
              <Volume2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="font-medium text-sm">Spatial Audio</div>
              <div className="text-xs text-muted-foreground">3D sound</div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/10">
              <Mic className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="font-medium text-sm">Voice Chat</div>
              <div className="text-xs text-muted-foreground">Clear comms</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
