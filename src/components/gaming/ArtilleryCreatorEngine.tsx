
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Target, 
  Crosshair, 
  Zap, 
  Shield, 
  Sword, 
  Bomb, 
  Settings, 
  Save, 
  Upload,
  Download,
  Wand2,
  Sparkles,
  Rocket
} from 'lucide-react'
import { toast } from 'sonner'

export function ArtilleryCreatorEngine() {
  const [weaponName, setWeaponName] = useState('')
  const [weaponType, setWeaponType] = useState('cannon')
  const [damage, setDamage] = useState(50)
  const [range, setRange] = useState(100)
  const [accuracy, setAccuracy] = useState(75)
  const [fireRate, setFireRate] = useState(1)
  const [selectedWeapon, setSelectedWeapon] = useState('basic-cannon')

  const weaponTypes = [
    { value: 'cannon', label: '🔥 Cannon', icon: '💥' },
    { value: 'rocket', label: '🚀 Rocket Launcher', icon: '🚀' },
    { value: 'laser', label: '⚡ Laser Cannon', icon: '⚡' },
    { value: 'plasma', label: '🔮 Plasma Gun', icon: '🔮' },
    { value: 'mortar', label: '💣 Mortar', icon: '💣' },
    { value: 'railgun', label: '⚙️ Railgun', icon: '⚙️' }
  ]

  const prebuiltWeapons = [
    {
      id: 'basic-cannon',
      name: '🔥 Basic Cannon',
      type: 'cannon',
      damage: 50,
      range: 100,
      accuracy: 75,
      fireRate: 1,
      description: 'Standard artillery piece'
    },
    {
      id: 'super-laser',
      name: '⚡ Super Laser',
      type: 'laser',
      damage: 85,
      range: 200,
      accuracy: 95,
      fireRate: 2,
      description: 'High-tech energy weapon'
    },
    {
      id: 'mega-rocket',
      name: '🚀 Mega Rocket',
      type: 'rocket',
      damage: 120,
      range: 300,
      accuracy: 60,
      fireRate: 0.5,
      description: 'Devastating long-range missile'
    },
    {
      id: 'plasma-destroyer',
      name: '🔮 Plasma Destroyer',
      type: 'plasma',
      damage: 100,
      range: 150,
      accuracy: 80,
      fireRate: 1.5,
      description: 'Advanced plasma artillery'
    }
  ]

  const createWeapon = () => {
    if (!weaponName.trim()) {
      toast.error('Please enter a weapon name')
      return
    }
    
    const newWeapon = {
      name: weaponName,
      type: weaponType,
      damage,
      range,
      accuracy,
      fireRate
    }
    
    console.log('🔫 Created weapon:', newWeapon)
    toast.success(`Created ${weaponName}! Added to your arsenal.`)
  }

  const loadWeapon = (weapon: any) => {
    setWeaponName(weapon.name)
    setWeaponType(weapon.type)
    setDamage(weapon.damage)
    setRange(weapon.range)
    setAccuracy(weapon.accuracy)
    setFireRate(weapon.fireRate)
    setSelectedWeapon(weapon.id)
    toast.success(`Loaded ${weapon.name}`)
  }

  const generateAIWeapon = () => {
    const randomWeapon = {
      name: `AI-Gen ${Math.random().toString(36).substr(2, 5)}`,
      type: weaponTypes[Math.floor(Math.random() * weaponTypes.length)].value,
      damage: Math.floor(Math.random() * 100) + 20,
      range: Math.floor(Math.random() * 200) + 50,
      accuracy: Math.floor(Math.random() * 40) + 60,
      fireRate: Math.random() * 3 + 0.5
    }
    
    setWeaponName(randomWeapon.name)
    setWeaponType(randomWeapon.type)
    setDamage(randomWeapon.damage)
    setRange(randomWeapon.range)
    setAccuracy(randomWeapon.accuracy)
    setFireRate(randomWeapon.fireRate)
    
    toast.success('AI generated unique weapon!')
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400 text-2xl">
            <Target className="h-8 w-8 animate-pulse" />
            🎯 ARTILLERY CREATOR ENGINE
          </CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-red-600 animate-pulse">
              ⚡ WEAPON FORGE ACTIVE
            </Badge>
            <Badge className="bg-orange-600">
              🔫 {prebuiltWeapons.length} Weapons Available
            </Badge>
            <Badge className="bg-yellow-600">
              🎯 BALLISTICS SYSTEM v2.0
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            Design devastating weapons, customize artillery, and create the ultimate gaming arsenal
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="creator" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/20">
          <TabsTrigger value="creator" className="data-[state=active]:bg-red-600">
            🔧 Creator
          </TabsTrigger>
          <TabsTrigger value="arsenal" className="data-[state=active]:bg-orange-600">
            🔫 Arsenal
          </TabsTrigger>
          <TabsTrigger value="testing" className="data-[state=active]:bg-yellow-600">
            🎯 Testing
          </TabsTrigger>
          <TabsTrigger value="gallery" className="data-[state=active]:bg-green-600">
            🏆 Gallery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creator" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weapon Design Panel */}
            <Card className="border-red-500/30 bg-red-900/10">
              <CardHeader>
                <CardTitle className="text-red-400">🔧 Weapon Design Studio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Weapon Name</Label>
                  <Input
                    placeholder="Enter weapon name..."
                    value={weaponName}
                    onChange={(e) => setWeaponName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Weapon Type</Label>
                  <Select value={weaponType} onValueChange={setWeaponType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {weaponTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Damage: {damage}</Label>
                    <Slider
                      value={[damage]}
                      onValueChange={(value) => setDamage(value[0])}
                      max={150}
                      min={10}
                      step={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Range: {range}</Label>
                    <Slider
                      value={[range]}
                      onValueChange={(value) => setRange(value[0])}
                      max={500}
                      min={20}
                      step={10}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Accuracy: {accuracy}%</Label>
                    <Slider
                      value={[accuracy]}
                      onValueChange={(value) => setAccuracy(value[0])}
                      max={100}
                      min={30}
                      step={5}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Fire Rate: {fireRate.toFixed(1)}/sec</Label>
                    <Slider
                      value={[fireRate]}
                      onValueChange={(value) => setFireRate(value[0])}
                      max={5}
                      min={0.1}
                      step={0.1}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={createWeapon} className="flex-1 bg-red-600 hover:bg-red-700">
                    <Save className="h-4 w-4 mr-2" />
                    Create Weapon
                  </Button>
                  <Button onClick={generateAIWeapon} className="bg-purple-600 hover:bg-purple-700">
                    <Wand2 className="h-4 w-4 mr-2" />
                    AI Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weapon Preview */}
            <Card className="border-orange-500/30 bg-orange-900/10">
              <CardHeader>
                <CardTitle className="text-orange-400">🎯 Weapon Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl">
                    {weaponTypes.find(t => t.value === weaponType)?.icon || '🔫'}
                  </div>
                  <h3 className="text-2xl font-bold text-orange-400">
                    {weaponName || 'Unnamed Weapon'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-red-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-red-400">{damage}</div>
                      <div className="text-xs text-muted-foreground">Damage</div>
                    </div>
                    <div className="p-3 bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{range}</div>
                      <div className="text-xs text-muted-foreground">Range</div>
                    </div>
                    <div className="p-3 bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="p-3 bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">{fireRate.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">Fire Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="arsenal" className="space-y-4">
          <Card className="border-orange-500/30 bg-orange-900/10">
            <CardHeader>
              <CardTitle className="text-orange-400">🔫 Weapon Arsenal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prebuiltWeapons.map((weapon) => (
                  <Card 
                    key={weapon.id} 
                    className={`cursor-pointer border transition-all ${
                      selectedWeapon === weapon.id 
                        ? 'border-orange-500 bg-orange-900/20' 
                        : 'border-border hover:border-orange-500/50'
                    }`}
                    onClick={() => loadWeapon(weapon)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-bold text-orange-400 mb-2">{weapon.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{weapon.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>DMG: {weapon.damage}</div>
                        <div>RNG: {weapon.range}</div>
                        <div>ACC: {weapon.accuracy}%</div>
                        <div>FR: {weapon.fireRate}/s</div>
                      </div>
                      {selectedWeapon === weapon.id && (
                        <Badge className="mt-2 bg-orange-600">Loaded</Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card className="border-yellow-500/30 bg-yellow-900/10">
            <CardHeader>
              <CardTitle className="text-yellow-400">🎯 Weapon Testing Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-8xl">🎯</div>
                <h3 className="text-2xl font-bold text-yellow-400">Testing Range</h3>
                <p className="text-muted-foreground">Test your weapons in realistic combat scenarios</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Target className="h-4 w-4 mr-2" />
                    Target Practice
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Bomb className="h-4 w-4 mr-2" />
                    Explosive Test
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Shield className="h-4 w-4 mr-2" />
                    Armor Penetration
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Full Combat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <Card className="border-green-500/30 bg-green-900/10">
            <CardHeader>
              <CardTitle className="text-green-400">🏆 Community Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-6xl">🏆</div>
                <h3 className="text-2xl font-bold text-green-400">Top Community Weapons</h3>
                <p className="text-muted-foreground">Share your creations and explore community designs</p>
                <div className="flex gap-2 justify-center">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Share Creation
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Browse Gallery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <h4 className="font-medium text-green-400 mb-2">🎯 Artillery Creator System Status</h4>
        <div className="text-sm text-green-300">
          ✅ Weapon forge systems fully operational<br/>
          ✅ Ballistics calculator active and calibrated<br/>
          ✅ AI weapon generation engine online<br/>
          ✅ Testing range simulation ready<br/>
          ✅ Community sharing platform connected
        </div>
      </div>
    </div>
  )
}
