import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Settings, 
  Shield, 
  Lock, 
  Unlock, 
  Palette, 
  Upload, 
  Image, 
  Video,
  Monitor,
  Eye,
  Trash2,
  Download,
  Save,
  History,
  Users,
  Database,
  Layers,
  Grid3X3
} from 'lucide-react'
import { toast } from 'sonner'
import { VisualControlMenu } from '../visual/VisualControlMenu'

export function AdminVisualControls() {
  const [isLocked, setIsLocked] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleLockToggle = () => {
    setIsLocked(!isLocked)
    toast.success(isLocked ? 'Admin controls unlocked' : 'Admin controls locked', {
      description: isLocked 
        ? 'Visual modifications are now allowed' 
        : 'Visual controls are now protected',
      duration: 2000
    })
  }

  const systemStats = {
    totalAssets: 0,
    storageUsed: '0 MB',
    activeThemes: 6,
    userSessions: 12,
    designChanges: 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-purple-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                🎨 Admin Visual Control Center
              </CardTitle>
              <p className="text-purple-300 mt-2">
                Complete control over visual elements, themes, and user experience
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLockToggle}
                className={isLocked ? "border-red-500/50 text-red-400" : "border-green-500/50 text-green-400"}
              >
                {isLocked ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                {isLocked ? 'System Locked' : 'System Unlocked'}
              </Button>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                <Settings className="h-3 w-3 mr-1" />
                Admin Access
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Control Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
          <TabsTrigger value="assets">Asset Manager</TabsTrigger>
          <TabsTrigger value="users">User Controls</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{systemStats.totalAssets}</div>
                <div className="text-green-400 text-sm">Total Uploaded</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{systemStats.storageUsed}</div>
                <div className="text-blue-400 text-sm">Cloud Storage Used</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{systemStats.activeThemes}</div>
                <div className="text-purple-400 text-sm">Active Themes</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{systemStats.userSessions}</div>
                <div className="text-yellow-400 text-sm">Active Users</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Quick Access Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <VisualControlMenu isAdmin={true} />
                
                <Button 
                  variant="outline" 
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 h-14"
                  disabled={isLocked}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Bulk Asset Upload
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 h-14"
                  disabled={isLocked}
                >
                  <History className="h-5 w-5 mr-2" />
                  System Restore
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backgrounds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Global Background Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enable Auto-Generation</Label>
                    <Switch disabled={isLocked} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Default Theme for New Users</Label>
                    <Select disabled={isLocked}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matrix">Matrix Green</SelectItem>
                        <SelectItem value="liquid">Liquid Flow</SelectItem>
                        <SelectItem value="neural">Neural Network</SelectItem>
                        <SelectItem value="water">Water Ripples</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Daily Theme Schedule</Label>
                    <Input 
                      placeholder="UTC time (e.g., 00:00)" 
                      disabled={isLocked}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-blue-400">Background Restrictions</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Allow User Uploads</Label>
                      <Switch disabled={isLocked} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Restrict to Presets</Label>
                      <Switch disabled={isLocked} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Admin Approval Required</Label>
                      <Switch disabled={isLocked} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Grid3X3 className="h-5 w-5" />
                Page-Specific Backgrounds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Homepage', 'Admin Panel', 'Trading Interface'].map((page) => (
                  <Card key={page} className="border border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{page}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Select disabled={isLocked}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select background" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="matrix">Matrix</SelectItem>
                          <SelectItem value="liquid">Liquid</SelectItem>
                          <SelectItem value="neural">Neural</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" disabled={isLocked}>
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" disabled={isLocked}>
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Asset Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Database className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Assets Uploaded</h3>
                <p className="mb-6">Upload images, videos, and other assets to get started</p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600" disabled={isLocked}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Assets
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Visual Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-green-400">Global Permissions</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Allow Theme Changes</Label>
                      <Switch disabled={isLocked} defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Allow Background Uploads</Label>
                      <Switch disabled={isLocked} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Allow Custom Colors</Label>
                      <Switch disabled={isLocked} defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-blue-400">Restrictions</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Require Admin Approval</Label>
                      <Switch disabled={isLocked} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Lock Theme Designer</Label>
                      <Switch disabled={isLocked} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Disable Daily Themes</Label>
                      <Switch disabled={isLocked} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Safety Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-green-400">Content Security</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Scan Uploaded Content</Label>
                      <Switch disabled={isLocked} defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Block Inappropriate Content</Label>
                      <Switch disabled={isLocked} defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label>Virus Scanning</Label>
                      <Switch disabled={isLocked} defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-blue-400">Backup & Recovery</h4>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" disabled={isLocked}>
                      <Download className="h-4 w-4 mr-2" />
                      Export All Settings
                    </Button>
                    
                    <Button variant="outline" className="w-full" disabled={isLocked}>
                      <History className="h-4 w-4 mr-2" />
                      Create Restore Point
                    </Button>
                    
                    <Button variant="outline" className="w-full text-red-400 border-red-500/50" disabled={isLocked}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Reset All Themes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}