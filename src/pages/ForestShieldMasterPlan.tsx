
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Shield, TreePine, Users, Target, Brain, Zap, Flame, Globe, Activity } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function ForestShieldMasterPlan() {
  const [selectedPhase, setSelectedPhase] = useState('phase-2')

  const roadmapPhases = [
    {
      id: 'phase-1',
      phase: 1,
      title: 'Foundation & Core Infrastructure',
      description: 'Establishing the fundamental systems for forest protection',
      status: 'completed',
      progress: 100,
      milestones: ['Satellite monitoring network', 'AI threat detection', 'Community alerts'],
      technologies: ['Quantum encryption', 'AI pattern recognition', 'Blockchain verification']
    },
    {
      id: 'phase-2',
      phase: 2,
      title: 'Sand Blast Cannon Defense Systems',
      description: 'Implementation of advanced sand cannon wildfire suppression',
      status: 'in-progress',
      progress: 75,
      milestones: ['Sand cannon deployment', 'Automated targeting systems', 'Community training'],
      technologies: ['Precision sand cannons', 'AI targeting', 'Emergency response protocols']
    },
    {
      id: 'phase-3',
      phase: 3,
      title: 'Global Network Integration',
      description: 'Connecting forest protection systems worldwide',
      status: 'upcoming',
      progress: 25,
      milestones: ['International partnerships', 'Data sharing protocols', 'Unified command center'],
      technologies: ['Global mesh network', 'Cross-border coordination', 'Universal threat database']
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600'
      case 'in-progress': return 'bg-orange-600'
      case 'upcoming': return 'bg-gray-600'
      default: return 'bg-gray-600'
    }
  }

  const getPhaseIcon = (phase: number) => {
    switch (phase) {
      case 1: return <Shield className="h-6 w-6" />
      case 2: return <Flame className="h-6 w-6" />
      case 3: return <Globe className="h-6 w-6" />
      default: return <Target className="h-6 w-6" />
    }
  }

  const selectedPhaseData = roadmapPhases.find(p => p.id === selectedPhase)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            🛡️ Forest Shield Master Plan
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Advanced ecosystem protection through sand blast cannon defense systems
          </p>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 bg-gradient-to-br from-green-900/20 to-orange-900/20 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <TreePine className="h-6 w-6" />
              Global Forest Protection Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Master Plan Implementation</span>
                <span className="text-green-400 font-bold">67%</span>
              </div>
              <Progress value={67} className="w-full h-3" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">47M</div>
                  <div className="text-sm text-muted-foreground">Hectares Protected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">1.2K</div>
                  <div className="text-sm text-muted-foreground">Sand Cannons Deployed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">98.7%</div>
                  <div className="text-sm text-muted-foreground">Fire Prevention Rate</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase Selection */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {roadmapPhases.map((phase) => (
            <Button
              key={phase.id}
              variant={selectedPhase === phase.id ? 'default' : 'outline'}
              onClick={() => setSelectedPhase(phase.id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {getPhaseIcon(phase.phase)}
              Phase {phase.phase}
            </Button>
          ))}
        </div>

        {/* Selected Phase Details */}
        {selectedPhaseData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  {getPhaseIcon(selectedPhaseData.phase)}
                  {selectedPhaseData.title}
                </CardTitle>
                <Badge className={getStatusColor(selectedPhaseData.status)}>
                  {selectedPhaseData.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{selectedPhaseData.description}</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Phase Progress</span>
                      <span className="text-orange-400 font-bold">{selectedPhaseData.progress}%</span>
                    </div>
                    <Progress value={selectedPhaseData.progress} className="h-2" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Key Milestones</h4>
                    <ul className="space-y-1">
                      {selectedPhaseData.milestones.map((milestone, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Target className="h-3 w-3 text-green-400" />
                          {milestone}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-white">Core Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedPhaseData.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-orange-900/20 rounded-lg">
                      <Brain className="h-4 w-4 text-orange-400" />
                      <span className="text-white">{tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Phases Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmapPhases.map((phase) => (
            <Card key={phase.id} className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  {getPhaseIcon(phase.phase)}
                  Phase {phase.phase}
                </CardTitle>
                <Badge className={getStatusColor(phase.status)}>
                  {phase.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium text-white mb-2">{phase.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="text-orange-400 font-bold">{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} className="h-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
