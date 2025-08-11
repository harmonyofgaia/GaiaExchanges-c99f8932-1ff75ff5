import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Leaf, Shield, Zap, MapPin, Calendar, Users, TrendingUp } from 'lucide-react'

interface GrazingPhase {
  id: string
  name: string
  description: string
  animals: string[]
  duration: string
  objectives: string[]
  chemicalRemoval: string[]
  progress: number
  status: 'pending' | 'active' | 'completed'
}

interface LandProject {
  id: string
  name: string
  location: string
  totalArea: number
  currentPhase: number
  contamination: string[]
  startDate: string
  estimatedCompletion: string
}

export function AnimalGrazingRecovery() {
  const [selectedProject, setSelectedProject] = useState<string>('project1')

  const grazingPhases: GrazingPhase[] = [
    {
      id: 'phase1',
      name: '🐑 Initial Sheep Grazing',
      description: 'Sheep remove surface vegetation and begin soil compaction correction',
      animals: ['Sheep', 'Lambs'],
      duration: '3-4 months',
      objectives: ['Remove invasive weeds', 'Begin soil aeration', 'Create animal paths'],
      chemicalRemoval: ['Herbicide residues', 'Surface toxins'],
      progress: 100,
      status: 'completed'
    },
    {
      id: 'phase2', 
      name: '🐐 Goat Brush Clearing',
      description: 'Goats target woody plants and shrubs, clearing overgrown areas',
      animals: ['Goats', 'Kids'],
      duration: '2-3 months',
      objectives: ['Clear brush and shrubs', 'Access difficult terrain', 'Remove thorny vegetation'],
      chemicalRemoval: ['Pesticide buildup', 'Industrial runoff'],
      progress: 85,
      status: 'active'
    },
    {
      id: 'phase3',
      name: '🐄 Cattle Soil Processing',
      description: 'Cattle provide deep soil compaction and nutrient distribution',
      animals: ['Cattle', 'Calves'],
      duration: '4-5 months',
      objectives: ['Heavy soil processing', 'Nutrient distribution', 'Deep root system creation'],
      chemicalRemoval: ['Heavy metals', 'Chemical fertilizers'],
      progress: 60,
      status: 'active'
    },
    {
      id: 'phase4',
      name: '🐷 Pig Soil Turnover',
      description: 'Pigs naturally till soil and remove buried contaminants',
      animals: ['Pigs', 'Piglets'],
      duration: '2-3 months',
      objectives: ['Natural soil tilling', 'Root and debris removal', 'Soil mixture enhancement'],
      chemicalRemoval: ['Buried chemicals', 'Old fertilizer deposits'],
      progress: 30,
      status: 'pending'
    },
    {
      id: 'phase5',
      name: '🐔 Poultry Insect Control',
      description: 'Chickens and poultry control harmful insects and add nitrogen',
      animals: ['Chickens', 'Ducks', 'Geese'],
      duration: '3-4 months',
      objectives: ['Insect population control', 'Nitrogen addition', 'Seed distribution'],
      chemicalRemoval: ['Insecticide residues', 'Chemical pest control remnants'],
      progress: 10,
      status: 'pending'
    },
    {
      id: 'phase6',
      name: '🦌 Wildlife Restoration',
      description: 'Reintroduce native wildlife for natural ecosystem balance',
      animals: ['Deer', 'Rabbits', 'Native birds'],
      duration: '6-12 months',
      objectives: ['Ecosystem balance', 'Natural predator-prey cycles', 'Biodiversity restoration'],
      chemicalRemoval: ['Final chemical neutralization', 'Ecosystem detox'],
      progress: 0,
      status: 'pending'
    },
    {
      id: 'phase7',
      name: '🌳 Final Forest Integration',
      description: 'Plant native trees and create sustainable forest ecosystem',
      animals: ['All previous + new native species'],
      duration: '12+ months',
      objectives: ['Tree establishment', 'Carbon sequestration', 'Complete ecosystem restoration'],
      chemicalRemoval: ['Air purification', 'Complete soil restoration'],
      progress: 0,
      status: 'pending'
    }
  ]

  const landProjects: LandProject[] = [
    {
      id: 'project1',
      name: 'Former Industrial Site Alpha',
      location: 'Northern Valley, Sector 7',
      totalArea: 250,
      currentPhase: 2,
      contamination: ['Heavy metals', 'Industrial solvents', 'Chemical fertilizers'],
      startDate: '2024-01-15',
      estimatedCompletion: '2026-08-15'
    },
    {
      id: 'project2',
      name: 'Agricultural Recovery Beta',
      location: 'Eastern Plains, Sector 12',
      totalArea: 180,
      currentPhase: 3,
      contamination: ['Pesticide residues', 'Herbicides', 'Soil compaction'],
      startDate: '2023-09-01',
      estimatedCompletion: '2025-12-01'
    },
    {
      id: 'project3',
      name: 'Mining Restoration Gamma',
      location: 'Mountain Region, Sector 4',
      totalArea: 420,
      currentPhase: 1,
      contamination: ['Heavy metals', 'Acid drainage', 'Stripped topsoil'],
      startDate: '2024-03-01',
      estimatedCompletion: '2027-03-01'
    }
  ]

  const getPhaseStatus = (phaseNumber: number, currentPhase: number) => {
    if (phaseNumber < currentPhase) return 'completed'
    if (phaseNumber === currentPhase) return 'active'
    return 'pending'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600'
      case 'active': return 'bg-blue-600'
      case 'pending': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-green-400 flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            🌱 7-PHASE ANIMAL GRAZING LAND RECOVERY PROJECT
          </CardTitle>
          <p className="text-muted-foreground">
            Advanced ecological restoration using systematic animal grazing to remove chemicals and restore healthy land
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="phases">🔄 Phases</TabsTrigger>
          <TabsTrigger value="projects">🗺️ Projects</TabsTrigger>
          <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30">
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 mx-auto text-blue-400 mb-4" />
                <div className="text-3xl font-bold text-blue-400">{landProjects.length}</div>
                <div className="text-sm text-muted-foreground">Active Land Projects</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 mx-auto text-purple-400 mb-4" />
                <div className="text-3xl font-bold text-purple-400">
                  {landProjects.reduce((acc, project) => acc + project.totalArea, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Hectares Under Recovery</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 mx-auto text-orange-400 mb-4" />
                <div className="text-3xl font-bold text-orange-400">85%</div>
                <div className="text-sm text-muted-foreground">Chemical Removal Success</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="phases" className="space-y-6">
          <div className="grid gap-4">
            {grazingPhases.map((phase, index) => (
              <Card key={phase.id} className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{phase.name}</h3>
                      <p className="text-muted-foreground mb-3">{phase.description}</p>
                    </div>
                    <Badge className={getStatusColor(phase.status)}>
                      {phase.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">🐾 Animals Involved</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.animals.map((animal) => (
                          <Badge key={animal} className="bg-green-600">{animal}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">⏱️ Duration</h4>
                      <Badge className="bg-blue-600">{phase.duration}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-yellow-400 mb-2">🎯 Objectives</h4>
                      <ul className="text-sm space-y-1">
                        {phase.objectives.map((objective, i) => (
                          <li key={i} className="text-muted-foreground">• {objective}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-400 mb-2">🧪 Chemical Removal</h4>
                      <ul className="text-sm space-y-1">
                        {phase.chemicalRemoval.map((chemical, i) => (
                          <li key={i} className="text-muted-foreground">• {chemical}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6">
            {landProjects.map((project) => (
              <Card key={project.id} className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-cyan-400 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {project.name}
                  </CardTitle>
                  <p className="text-muted-foreground">{project.location}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-purple-400 mb-2">📏 Total Area</h4>
                      <Badge className="bg-purple-600">{project.totalArea} hectares</Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-2">🔄 Current Phase</h4>
                      <Badge className="bg-blue-600">Phase {project.currentPhase}/7</Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-400 mb-2">📅 Timeline</h4>
                      <div className="text-sm space-y-1">
                        <div>Start: {project.startDate}</div>
                        <div>End: {project.estimatedCompletion}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-red-400 mb-3">☢️ Contamination Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.contamination.map((contaminant) => (
                        <Badge key={contaminant} className="bg-red-600">{contaminant}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-400">Phase Progress</h4>
                    <div className="grid gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((phaseNum) => {
                        const status = getPhaseStatus(phaseNum, project.currentPhase)
                        return (
                          <div key={phaseNum} className="flex items-center gap-3">
                            <Badge className={getStatusColor(status)}>
                              Phase {phaseNum}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {grazingPhases[phaseNum - 1]?.name}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">🌱 Recovery Success Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Chemical Removal</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Soil Health Restoration</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Biodiversity Recovery</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-blue-400">📊 Project Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">850</div>
                    <div className="text-xs text-muted-foreground">Total Hectares</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">12</div>
                    <div className="text-xs text-muted-foreground">Active Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">350</div>
                    <div className="text-xs text-muted-foreground">Animals Deployed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-400">7</div>
                    <div className="text-xs text-muted-foreground">Restoration Phases</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}