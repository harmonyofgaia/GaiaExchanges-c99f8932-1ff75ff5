import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  TreePine, 
  Droplets, 
  Wind, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Shield, 
  Plus,
  BarChart3,
  Globe,
  Leaf
} from 'lucide-react'
interface ImpactData {
  id: string
  category: string
  metric: string
  value: number
  unit: string
  timestamp: Date
  source: string
  confidenceLevel: number
  notes?: string
}

interface EnvironmentalProject {
  id: string
  name: string
  description: string
  location: string
  startDate: Date
  endDate?: Date
  status: 'active' | 'completed' | 'pending' | 'cancelled'
  impactMetrics: ImpactData[]
  fundingGoal: number
  currentFunding: number
  leadOrganization: string
  contactPerson: string
}

export default function ImpactMeasurementSystem() {
  const [projects, setProjects] = useState<EnvironmentalProject[]>([
    {
      id: 'forest-restoration-1',
      name: 'Amazon Rainforest Restoration',
      description: 'Reforestation project in the Amazon basin to restore biodiversity and sequester carbon.',
      location: 'Amazon Basin, Brazil',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2028-01-01'),
      status: 'active',
      impactMetrics: [
        {
          id: 'carbon-seq-1',
          category: 'Carbon Sequestration',
          metric: 'CO2 Sequestered',
          value: 15000,
          unit: 'tons',
          timestamp: new Date(),
          source: 'Satellite Data',
          confidenceLevel: 95,
          notes: 'Based on annual growth rate and area covered.'
        },
        {
          id: 'biodiversity-1',
          category: 'Biodiversity',
          metric: 'Species Count',
          value: 2500,
          unit: 'species',
          timestamp: new Date(),
          source: 'Field Surveys',
          confidenceLevel: 85,
          notes: 'Includes plants, insects, and vertebrates.'
        }
      ],
      fundingGoal: 5000000,
      currentFunding: 3800000,
      leadOrganization: 'Rainforest Alliance',
      contactPerson: 'Dr. Jane Goodall'
    },
    {
      id: 'ocean-cleanup-1',
      name: 'Great Pacific Garbage Patch Cleanup',
      description: 'Project to remove plastic waste from the Great Pacific Garbage Patch.',
      location: 'North Pacific Ocean',
      startDate: new Date('2022-06-01'),
      status: 'active',
      impactMetrics: [
        {
          id: 'plastic-rem-1',
          category: 'Ocean Cleanup',
          metric: 'Plastic Removed',
          value: 5000,
          unit: 'tons',
          timestamp: new Date(),
          source: 'Direct Measurement',
          confidenceLevel: 98,
          notes: 'Collected by specialized vessels.'
        },
        {
          id: 'marine-life-1',
          category: 'Marine Life',
          metric: 'Entanglement Reduction',
          value: 75,
          unit: '%',
          timestamp: new Date(),
          source: 'Observation',
          confidenceLevel: 90,
          notes: 'Reduction in marine animal entanglements.'
        }
      ],
      fundingGoal: 10000000,
      currentFunding: 8200000,
      leadOrganization: 'The Ocean Cleanup',
      contactPerson: 'Boyan Slat'
    }
  ])
  const [selectedProject, setSelectedProject] = useState<EnvironmentalProject | null>(null)
  const [newImpactData, setNewImpactData] = useState<Omit<ImpactData, 'id' | 'timestamp'>>({
    category: '',
    metric: '',
    value: 0,
    unit: '',
    source: '',
    confidenceLevel: 0,
    notes: ''
  })
  const [showAddImpactForm, setShowAddImpactForm] = useState(false)

  const handleProjectSelect = (project: EnvironmentalProject) => {
    setSelectedProject(project)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewImpactData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddImpactData = () => {
    if (!selectedProject) return

    const newImpact: ImpactData = {
      id: `impact-${Date.now()}`,
      timestamp: new Date(),
      ...newImpactData
    }

    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === selectedProject.id
          ? { ...project, impactMetrics: [...project.impactMetrics, newImpact] }
          : project
      )
    )

    setNewImpactData({
      category: '',
      metric: '',
      value: 0,
      unit: '',
      source: '',
      confidenceLevel: 0,
      notes: ''
    })
    setShowAddImpactForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
<div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌱 Impact Measurement System
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Track and visualize the environmental impact of your projects with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Project Selection Cards */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Select a Project</h2>
            {projects.map(project => (
              <Card
                key={project.id}
                className={`bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300 cursor-pointer ${selectedProject?.id === project.id ? 'border-2 border-green-500' : ''}`}
                onClick={() => handleProjectSelect(project)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Leaf className="h-5 w-5 text-green-400" />
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-green-400 font-bold">${project.currentFunding.toLocaleString()}</span>
                    <span className="text-muted-foreground text-xs">Raised of ${project.fundingGoal.toLocaleString()}</span>
                  </div>
                  <Progress value={(project.currentFunding / project.fundingGoal) * 100} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Impact Metrics and Visualization */}
          <div className="md:col-span-2">
            {selectedProject ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Impact Metrics for {selectedProject.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.impactMetrics.map(impact => (
                    <Card key={impact.id} className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                      <CardHeader>
                        <CardTitle className="text-white">{impact.metric}</CardTitle>
                        <Badge className="bg-blue-600">{impact.category}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-400">{impact.value} {impact.unit}</div>
                        <p className="text-muted-foreground text-sm mt-2">
                          Source: {impact.source} ({impact.confidenceLevel}% confidence)
                        </p>
                        {impact.notes && <p className="text-xs text-gray-500 mt-1">Notes: {impact.notes}</p>}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Impact Data Form */}
                <div className="mt-6">
                  <Button onClick={() => setShowAddImpactForm(!showAddImpactForm)} className="bg-blue-600 hover:bg-blue-700">
                    {showAddImpactForm ? 'Hide Form' : 'Add New Impact Data'}
                  </Button>

                  {showAddImpactForm && (
                    <Card className="mt-4 bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white">Category</label>
                          <input
                            type="text"
                            name="category"
                            value={newImpactData.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white">Metric</label>
                          <input
                            type="text"
                            name="metric"
                            value={newImpactData.metric}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white">Value</label>
                          <input
                            type="number"
                            name="value"
                            value={newImpactData.value}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white">Unit</label>
                          <input
                            type="text"
                            name="unit"
                            value={newImpactData.unit}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white">Source</label>
                          <input
                            type="text"
                            name="source"
                            value={newImpactData.source}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white">Confidence Level (%)</label>
                          <input
                            type="number"
                            name="confidenceLevel"
                            value={newImpactData.confidenceLevel}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-800 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white">Notes</label>
                          <textarea
                            name="notes"
                            value={newImpactData.notes}
                            onChange={handleInputChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-800 text-white"
                          />
                        </div>
                        <Button onClick={handleAddImpactData} className="bg-green-600 hover:bg-green-700">
                          Add Impact Data
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-xl text-muted-foreground">Select a project to view its impact metrics.</p>
                <BarChart3 className="h-12 w-12 mx-auto mt-4 text-gray-500" />
              </div>
            )}
          </div>
        </div>
        
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Impact Data
        </Button>
      </div>
    </div>
  )
}
