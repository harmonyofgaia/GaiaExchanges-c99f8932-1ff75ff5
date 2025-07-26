import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Palette, 
  Image, 
  Video, 
  Upload, 
  Layers,
  Monitor,
  Settings,
  History,
  Lock,
  Unlock,
  Eye,
  Download,
  Trash2,
  Plus,
  Grid3X3
} from 'lucide-react'
import { toast } from 'sonner'
import { ThemeDesigner } from '../theme/ThemeDesigner'

interface VisualControlMenuProps {
  isAdmin?: boolean
  className?: string
}

export function VisualControlMenu({ isAdmin = false, className = '' }: VisualControlMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [activeSection, setActiveSection] = useState('backgrounds')

  const handleLockToggle = () => {
    setIsLocked(!isLocked)
    toast.success(isLocked ? 'Visual controls unlocked' : 'Visual controls locked', {
      description: isLocked 
        ? 'You can now modify visual settings' 
        : 'Visual settings are now protected',
      duration: 2000
    })
  }

  const menuSections = [
    {
      id: 'backgrounds',
      label: 'Backgrounds',
      icon: <Layers className="h-4 w-4" />,
      description: 'Manage page backgrounds and effects'
    },
    {
      id: 'assets',
      label: 'Assets',
      icon: <Image className="h-4 w-4" />,
      description: 'Upload and manage media assets'
    },
    {
      id: 'layouts',
      label: 'Layouts',
      icon: <Grid3X3 className="h-4 w-4" />,
      description: 'Configure page and menu layouts'
    },
    {
      id: 'history',
      label: 'History',
      icon: <History className="h-4 w-4" />,
      description: 'View and restore previous designs'
    }
  ]

  const backgroundPresets = [
    { name: 'Matrix Green', type: 'matrix', color: '#00ff00', preview: 'matrix-green' },
    { name: 'Ocean Blue', type: 'water', color: '#0080ff', preview: 'ocean-blue' },
    { name: 'Neural Pink', type: 'neuro', color: '#ff00ff', preview: 'neural-pink' },
    { name: 'Liquid Gold', type: 'liquid', color: '#ffaa00', preview: 'liquid-gold' },
    { name: 'Puzzle Purple', type: 'puzzle', color: '#8000ff', preview: 'puzzle-purple' },
    { name: 'Daily Theme', type: 'daily-theme', color: '#ff8000', preview: 'daily-theme' }
  ]

  const handleBackgroundSelect = (preset: any) => {
    if (isLocked) {
      toast.error('Visual controls are locked', {
        description: 'Unlock to change backgrounds',
        duration: 3000
      })
      return
    }

    // Update background configuration
    localStorage.setItem('gaia-enhanced-background-config', JSON.stringify({
      type: preset.type,
      intensity: 'medium',
      color: preset.color,
      speed: 1,
      autoGenerate: preset.type === 'daily-theme'
    }))

    // Trigger background update
    const backgroundChangeEvent = new CustomEvent('backgroundChange', {
      detail: {
        type: preset.type,
        intensity: 'medium',
        color: preset.color,
        speed: 1,
        autoGenerate: preset.type === 'daily-theme'
      }
    });
    window.dispatchEvent(backgroundChangeEvent);

    toast.success(`Background changed to ${preset.name}`)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className={`bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg ${className}`}
          >
            <Settings className="h-5 w-5 mr-2" />
            Visual Control
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-background/95 border-primary/30 backdrop-blur-sm">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                <Monitor className="h-6 w-6 text-green-400" />
                🎨 Visual Control Menu
                {isAdmin && <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">Admin</Badge>}
              </DialogTitle>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLockToggle}
                  className={isLocked ? "border-red-500/50 text-red-400" : "border-green-500/50 text-green-400"}
                >
                  {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                  {isLocked ? 'Locked' : 'Unlocked'}
                </Button>
              </div>
            </div>
          </DialogHeader>

          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {menuSections.map((section) => (
                <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                  {section.icon}
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="backgrounds" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Background Presets
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {backgroundPresets.map((preset) => (
                        <div
                          key={preset.name}
                          className="group cursor-pointer rounded-lg border border-primary/20 p-3 hover:border-primary/50 transition-colors"
                          onClick={() => handleBackgroundSelect(preset)}
                        >
                          <div
                            className="w-full h-20 rounded-lg mb-2 relative overflow-hidden"
                            style={{ 
                              background: `linear-gradient(45deg, ${preset.color}20, ${preset.color}40)`,
                              border: `1px solid ${preset.color}60`
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center text-xs text-white/80">
                              {preset.type}
                            </div>
                          </div>
                          <div className="text-sm font-medium">{preset.name}</div>
                          <div className="text-xs text-muted-foreground">{preset.type}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Advanced Designer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Access the full Theme Designer for complete customization
                    </p>
                    <ThemeDesigner isLocked={isLocked} onLockToggle={handleLockToggle} />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Page-Specific Backgrounds
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border border-green-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-green-400">Homepage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">Current: Matrix Green</div>
                        <Button variant="outline" size="sm" className="w-full" disabled={isLocked}>
                          <Palette className="h-3 w-3 mr-1" />
                          Change
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-blue-400">Admin Panel</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">Current: Neural Network</div>
                        <Button variant="outline" size="sm" className="w-full" disabled={isLocked}>
                          <Palette className="h-3 w-3 mr-1" />
                          Change
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border border-purple-500/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm text-purple-400">Menu Sidebar</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">Current: Liquid Flow</div>
                        <Button variant="outline" size="sm" className="w-full" disabled={isLocked}>
                          <Palette className="h-3 w-3 mr-1" />
                          Change
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-400 flex items-center gap-2">
                      <Upload className="h-5 w-5" />
                      Upload Assets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">
                        Drop files here or click to browse
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm" disabled={isLocked}>
                          <Image className="h-4 w-4 mr-2" />
                          Images
                        </Button>
                        <Button variant="outline" size="sm" disabled={isLocked}>
                          <Video className="h-4 w-4 mr-2" />
                          Videos
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Supported: JPG, PNG, GIF, WebP, MP4, WebM (Max 50MB)
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Grid3X3 className="h-5 w-5" />
                      Asset Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Image className="h-12 w-12 mx-auto mb-4" />
                      <p>No assets uploaded yet</p>
                      <p className="text-xs">Upload some media to get started</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Cloud Storage Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">0</div>
                      <div className="text-xs text-muted-foreground">Images</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">0</div>
                      <div className="text-xs text-muted-foreground">Videos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">0 MB</div>
                      <div className="text-xs text-muted-foreground">Used</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layouts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Grid3X3 className="h-5 w-5" />
                    Layout Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-blue-400">Menu Layout</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" disabled={isLocked}>Sidebar Left</Button>
                        <Button variant="outline" size="sm" disabled={isLocked}>Sidebar Right</Button>
                        <Button variant="outline" size="sm" disabled={isLocked}>Top Navigation</Button>
                        <Button variant="outline" size="sm" disabled={isLocked}>Floating Menu</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-purple-400">Column Layout</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" disabled={isLocked}>Single Column</Button>
                        <Button variant="outline" size="sm" disabled={isLocked}>Two Columns</Button>
                        <Button variant="outline" size="sm" disabled={isLocked}>Three Columns</Button>
                        <Button variant="outline" size="sm" disabled={isLocked}>Custom Grid</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Design History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-4" />
                    <p>No design history yet</p>
                    <p className="text-xs">Changes will be tracked here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}