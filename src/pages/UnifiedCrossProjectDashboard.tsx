import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Circle, CheckCircle, AlertTriangle } from 'lucide-react'
import { getBadgeClassNames } from '@/utils/badgeHelpers'

interface ProjectStatus {
  name: string
  status: 'active' | 'pending' | 'completed' | 'failed'
  details: string
}

export default function UnifiedCrossProjectDashboard() {
  const [projects, setProjects] = useState<ProjectStatus[]>([
    {
      name: 'Clean Water Initiative',
      status: 'active',
      details: 'Deploying advanced filtration systems in rural communities.'
    },
    {
      name: 'Coral Reef Restoration',
      status: 'pending',
      details: 'Preparing for the annual coral planting event.'
    },
    {
      name: 'Seed Splitter AI',
      status: 'completed',
      details: 'Successfully launched the AI-powered seed distribution platform.'
    },
    {
      name: 'NFT Animal Rescue',
      status: 'active',
      details: 'Rescuing endangered species and minting NFTs for funding.'
    },
    {
      name: 'Earth Aquarium Mushroom',
      status: 'failed',
      details: 'Project suspended due to unforeseen environmental factors.'
    },
    {
      name: 'AI Powered Mission Generator',
      status: 'active',
      details: 'Generating new missions for environmental restoration.'
    }
  ])

  return (
    <div className="container mx-auto p-8 space-y-6">
      <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/20 to-gray-900/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-400">
            🌍 Unified Cross-Project Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-300">
            Monitor the status of all GAIA projects in one centralized view.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/20 to-gray-900/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-400 flex items-center gap-2">
                {project.name}
                {project.status === 'active' && <Circle className="h-4 w-4 text-green-500 animate-pulse" />}
                {project.status === 'pending' && <Circle className="h-4 w-4 text-yellow-500 animate-pulse" />}
                {project.status === 'completed' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                {project.status === 'failed' && <AlertTriangle className="h-4 w-4 text-red-500" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-300 mb-4">{project.details}</p>
              <Badge className={getBadgeClassNames(project.status)}>
                {project.status.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-gray-900/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-yellow-400">
            📈 Overall Project Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-300">
            Aggregated metrics and insights across all GAIA initiatives.
          </p>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              • Total Active Projects: {projects.filter(p => p.status === 'active').length}
            </p>
            <p className="text-sm text-muted-foreground">
              • Total Completed Projects: {projects.filter(p => p.status === 'completed').length}
            </p>
            <p className="text-sm text-muted-foreground">
              • Total Pending Projects: {projects.filter(p => p.status === 'pending').length}
            </p>
            <p className="text-sm text-muted-foreground">
              • Total Failed Projects: {projects.filter(p => p.status === 'failed').length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
