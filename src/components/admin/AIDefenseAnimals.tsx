import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Shield, 
  Heart, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  MapPin,
  Globe,
  Users,
  Activity,
  Edit,
  Trash2,
  Plus,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Target
} from 'lucide-react'
import { toast } from 'sonner'

export function AIDefenseAnimals() {
  const [animalDefenses, setAnimalDefenses] = useState([
    {
      id: 1,
      name: 'Cyber Koala',
      description: 'AI-powered koala that defends against cyber threats',
      effectiveness: 75,
      status: 'Active',
      location: 'Sydney, Australia',
      contributors: 1200,
      activityLevel: 80,
      threatsRepelled: 2847,
      emoji: '🐨'
    },
    {
      id: 2,
      name: 'Dragon AI',
      description: 'AI dragon that protects against network intrusions',
      effectiveness: 90,
      status: 'Active',
      location: 'Transylvania',
      contributors: 2500,
      activityLevel: 95,
      threatsRepelled: 5932,
      emoji: '🐉'
    },
    {
      id: 3,
      name: 'Phoenix Guardian',
      description: 'AI phoenix that monitors and restores system integrity',
      effectiveness: 85,
      status: 'Active',
      location: 'Cairo, Egypt',
      contributors: 1800,
      activityLevel: 90,
      threatsRepelled: 4156,
      emoji: '🦅'
    },
    {
      id: 4,
      name: 'Lion Security',
      description: 'AI lion that guards against unauthorized access',
      effectiveness: 80,
      status: 'Active',
      location: 'Nairobi, Kenya',
      contributors: 1500,
      activityLevel: 85,
      threatsRepelled: 3421,
      emoji: '🦁'
    },
    {
      id: 5,
      name: 'Alpha Dragon',
      description: 'Ultimate alpha dragon with quantum fire breath capabilities',
      effectiveness: 99,
      status: 'Active',
      location: 'Global Command Center',
      contributors: 5000,
      activityLevel: 100,
      threatsRepelled: 9999,
      emoji: '🐲'
    },
    {
      id: 6,
      name: 'Sky Eagle',
      description: 'Aerial surveillance guardian with space monitoring',
      effectiveness: 88,
      status: 'Active',
      location: 'Stratosphere Zone',
      contributors: 2200,
      activityLevel: 92,
      threatsRepelled: 3784,
      emoji: '🦅'
    },
    {
      id: 7,
      name: 'Pack Wolf',
      description: 'Pack leader coordinating multi-animal defense responses',
      effectiveness: 82,
      status: 'Hunting',
      location: 'Northern Territory',
      contributors: 1890,
      activityLevel: 89,
      threatsRepelled: 2965,
      emoji: '🐺'
    },
    {
      id: 8,
      name: 'King Lion Protector',
      description: 'Royal lion with paralyzing roar and supreme protection',
      effectiveness: 91,
      status: 'Active',
      location: 'Central Command',
      contributors: 3200,
      activityLevel: 94,
      threatsRepelled: 4872,
      emoji: '👑🦁'
    },
    {
      id: 9,
      name: 'Monkey Squad Alpha',
      description: 'Elite monkey unit specialized in code analysis',
      effectiveness: 78,
      status: 'Training',
      location: 'Tech Center Alpha',
      contributors: 980,
      activityLevel: 85,
      threatsRepelled: 1567,
      emoji: '🐒'
    },
    {
      id: 10,
      name: 'Monkey Squad Beta',
      description: 'Advanced monkey unit for network infiltration tracking',
      effectiveness: 81,
      status: 'Active',
      location: 'Tech Center Beta',
      contributors: 1120,
      activityLevel: 88,
      threatsRepelled: 1890,
      emoji: '🐒'
    },
    {
      id: 11,
      name: 'AI Dolphin',
      description: 'Aquatic AI guardian for deep web and data protection',
      effectiveness: 84,
      status: 'Active',
      location: 'Digital Ocean',
      contributors: 1650,
      activityLevel: 87,
      threatsRepelled: 2341,
      emoji: '🐬'
    },
    {
      id: 12,
      name: 'Quantum Phoenix',
      description: 'Evolved phoenix with quantum resurrection abilities',
      effectiveness: 93,
      status: 'Active',
      location: 'Quantum Realm',
      contributors: 2800,
      activityLevel: 96,
      threatsRepelled: 5673,
      emoji: '🔥🦅'
    },
    {
      id: 13,
      name: 'Digital Dragon',
      description: 'Matrix-controlling dragon with digital domain mastery',
      effectiveness: 97,
      status: 'Active',
      location: 'Digital Matrix',
      contributors: 4200,
      activityLevel: 98,
      threatsRepelled: 7892,
      emoji: '🐲'
    },
    {
      id: 14,
      name: 'Monkey Squad Gamma',
      description: 'Elite monkey unit specialized in database protection',
      effectiveness: 79,
      status: 'Active',
      location: 'Tech Center Gamma',
      contributors: 1050,
      activityLevel: 86,
      threatsRepelled: 1456,
      emoji: '🐒'
    }
  ])

  const [selectedAnimals, setSelectedAnimals] = useState<number[]>([])
  const [editingAnimal, setEditingAnimal] = useState<any>(null)
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimalDefenses(prev => prev.map(animal => ({
        ...animal,
        threatsRepelled: animal.threatsRepelled + Math.floor(Math.random() * 3),
        activityLevel: Math.min(100, animal.activityLevel + (Math.random() - 0.5) * 2)
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const toggleAnimalStatus = (id: number) => {
    setAnimalDefenses(prev => prev.map(animal => 
      animal.id === id 
        ? { ...animal, status: animal.status === 'Active' ? 'Inactive' : 'Active' }
        : animal
    ))
    toast.success('Animal status updated successfully!')
  }

  const updateAnimalAttribute = (id: number, attribute: string, value: any) => {
    setAnimalDefenses(prev => prev.map(animal => 
      animal.id === id 
        ? { ...animal, [attribute]: value }
        : animal
    ))
    toast.success(`Animal ${attribute} updated!`)
  }

  const deleteAnimal = (id: number) => {
    setAnimalDefenses(prev => prev.filter(animal => animal.id !== id))
    toast.success('Defense animal removed successfully!')
  }

  const batchActivateAnimals = () => {
    setAnimalDefenses(prev => prev.map(animal => ({ ...animal, status: 'Active' })))
    toast.success('All animals activated!')
  }

  const batchDeactivateAnimals = () => {
    setAnimalDefenses(prev => prev.map(animal => ({ ...animal, status: 'Inactive' })))
    toast.success('All animals deactivated!')
  }

  const resetAnimalStats = (id: number) => {
    setAnimalDefenses(prev => prev.map(animal => 
      animal.id === id 
        ? { ...animal, threatsRepelled: 0, activityLevel: 50, effectiveness: 50 }
        : animal
    ))
    toast.success('Animal stats reset!')
  }

  const addNewAnimal = (animalData: any) => {
    const newAnimal = {
      ...animalData,
      id: Math.max(...animalDefenses.map(a => a.id)) + 1,
      threatsRepelled: 0,
      activityLevel: 50
    }
    setAnimalDefenses(prev => [...prev, newAnimal])
    setIsCreatingNew(false)
    toast.success('New defense animal added!')
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            🛡️ AI Defense Animals - Enhanced Control Center
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={batchActivateAnimals} size="sm" className="bg-green-600 hover:bg-green-700">
              <PlayCircle className="h-4 w-4 mr-1" />
              Activate All
            </Button>
            <Button onClick={batchDeactivateAnimals} size="sm" className="bg-red-600 hover:bg-red-700">
              <PauseCircle className="h-4 w-4 mr-1" />
              Deactivate All
            </Button>
            <Button onClick={() => setIsCreatingNew(true)} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              Add New Animal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {animalDefenses.map((animal) => (
              <Card key={animal.id} className="bg-black/30 relative">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{animal.emoji}</span>
                      <div className="font-semibold text-lg text-green-400">{animal.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={animal.status === 'Active'}
                        onCheckedChange={() => toggleAnimalStatus(animal.id)}
                      />
                      <Badge className={animal.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}>
                        {animal.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{animal.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Effectiveness</Label>
                      <div className="flex items-center gap-2">
                        <Progress value={animal.effectiveness} className="h-2 flex-1" />
                        <span className="text-xs text-green-400">{animal.effectiveness}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-muted-foreground">Activity Level</Label>
                      <div className="flex items-center gap-2">
                        <Progress value={animal.activityLevel} className="h-2 flex-1" />
                        <span className="text-xs text-purple-400">{Math.round(animal.activityLevel)}%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-blue-400" />
                        <span className="text-xs truncate">{animal.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-orange-400" />
                        <span className="text-xs">{animal.contributors}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-red-400" />
                        <span className="text-xs">{animal.threatsRepelled}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4 text-purple-400" />
                        <span className="text-xs">Live</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => setEditingAnimal(animal)}
                        className="flex-1 text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => resetAnimalStats(animal.id)}
                        className="flex-1 text-xs"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => deleteAnimal(animal.id)}
                        className="text-xs"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {animalDefenses.filter(animal => animal.status === 'Active').length}
              </div>
              <div className="text-sm text-green-300">Active Defenses</div>
            </div>
            
            <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {animalDefenses.length}
              </div>
              <div className="text-sm text-blue-300">Total Guardians</div>
            </div>
            
            <div className="text-center p-4 bg-red-900/50 rounded-lg border-2 border-red-500/50">
              <Target className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {animalDefenses.reduce((sum, animal) => sum + animal.threatsRepelled, 0)}
              </div>
              <div className="text-sm text-red-300">Threats Repelled</div>
            </div>
            
            <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
              <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(animalDefenses.reduce((sum, animal) => sum + animal.effectiveness, 0) / animalDefenses.length)}%
              </div>
              <div className="text-sm text-purple-300">Avg Effectiveness</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Animal Modal */}
      {editingAnimal && (
        <Card className="border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
          <CardHeader>
            <CardTitle className="text-yellow-400">
              Edit {editingAnimal.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <Input 
                  value={editingAnimal.location}
                  onChange={(e) => setEditingAnimal(prev => ({...prev, location: e.target.value}))}
                />
              </div>
              <div>
                <Label>Contributors</Label>
                <Input 
                  type="number"
                  value={editingAnimal.contributors}
                  onChange={(e) => setEditingAnimal(prev => ({...prev, contributors: parseInt(e.target.value)}))}
                />
              </div>
              <div>
                <Label>Effectiveness (%)</Label>
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  value={editingAnimal.effectiveness}
                  onChange={(e) => setEditingAnimal(prev => ({...prev, effectiveness: parseInt(e.target.value)}))}
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select 
                  value={editingAnimal.status}
                  onValueChange={(value) => setEditingAnimal(prev => ({...prev, status: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Hunting">Hunting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Input 
                value={editingAnimal.description}
                onChange={(e) => setEditingAnimal(prev => ({...prev, description: e.target.value}))}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setAnimalDefenses(prev => prev.map(animal => 
                    animal.id === editingAnimal.id ? editingAnimal : animal
                  ))
                  setEditingAnimal(null)
                  toast.success('Animal updated successfully!')
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Save Changes
              </Button>
              <Button 
                onClick={() => setEditingAnimal(null)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Animal Modal */}
      {isCreatingNew && (
        <Card className="border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardHeader>
            <CardTitle className="text-blue-400">
              Add New Defense Animal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input id="animal-name" placeholder="Enter animal name..." />
                </div>
                <div>
                  <Label>Emoji</Label>
                  <Input id="animal-emoji" placeholder="🐾" />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input id="animal-location" placeholder="Global location..." />
                </div>
                <div>
                  <Label>Contributors</Label>
                  <Input id="animal-contributors" type="number" placeholder="1000" />
                </div>
                <div>
                  <Label>Effectiveness (%)</Label>
                  <Input id="animal-effectiveness" type="number" min="0" max="100" placeholder="75" />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select defaultValue="Active">
                    <SelectTrigger id="animal-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Input 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Describe the animal's capabilities..." 
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    addNewAnimal({
                      name: name || 'New Guardian',
                      emoji: emoji || '🛡️',
                      location: location || 'New Location',
                      contributors: contributors || 1000,
                      effectiveness: effectiveness || 75,
                      status: status || 'Active',
                      description: description || 'New AI defense animal',
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Animal
                </Button>
                <Button 
                  onClick={() => setIsCreatingNew(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
