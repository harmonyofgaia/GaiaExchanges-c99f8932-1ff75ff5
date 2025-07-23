import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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
  Activity
} from 'lucide-react'

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
      activityLevel: 80
    },
    {
      id: 2,
      name: 'Dragon AI',
      description: 'AI dragon that protects against network intrusions',
      effectiveness: 90,
      status: 'Active',
      location: 'Transylvania',
      contributors: 2500,
      activityLevel: 95
    },
    {
      id: 3,
      name: 'Phoenix Guardian',
      description: 'AI phoenix that monitors and restores system integrity',
      effectiveness: 85,
      status: 'Active',
      location: 'Cairo, Egypt',
      contributors: 1800,
      activityLevel: 90
    },
    {
      id: 4,
      name: 'Lion Security',
      description: 'AI lion that guards against unauthorized access',
      effectiveness: 80,
      status: 'Active',
      location: 'Nairobi, Kenya',
      contributors: 1500,
      activityLevel: 85
    }
  ])

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            🛡️ AI Defense Animals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {animalDefenses.map((animal) => (
              <Card key={animal.id} className="bg-black/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-lg text-green-400">{animal.name}</div>
                    <Badge className={animal.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}>
                      {animal.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{animal.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span>{animal.effectiveness}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span>{animal.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-orange-400" />
                      <span>{animal.contributors}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-purple-400" />
                      <span>{animal.activityLevel}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-green-400">
                {animalDefenses.filter(animal => animal.status === 'Active').length}
              </div>
              <div className="text-sm text-green-300">Active Defenses</div>
            </div>
            
            <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-blue-400">
                {animalDefenses.length}
              </div>
              <div className="text-sm text-blue-300">Global Protectors</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
