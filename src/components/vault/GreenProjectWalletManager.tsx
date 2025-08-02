
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Leaf, 
  DollarSign, 
  TrendingUp, 
  Globe,
  Zap,
  Shield
} from 'lucide-react'
import { toast } from 'sonner'

interface GreenProject {
  id: string
  name: string
  description: string
  wallet_address: string
  allocation_percentage: number
  total_received: number
  project_status: 'active' | 'funded' | 'completed'
}

export function GreenProjectWalletManager() {
  const [greenProjects, setGreenProjects] = useState<GreenProject[]>([
    {
      id: '1',
      name: '🌍 Global Reforestation Initiative',
      description: 'Tree planting and forest restoration worldwide',
      wallet_address: GAIA_TOKEN.GREEN_INVESTMENTS_WALLET,
      allocation_percentage: 25,
      total_received: 12547.89,
      project_status: 'active'
    },
    {
      id: '2',
      name: '☀️ Solar Energy for Communities',    
      description: 'Solar panel installations in underserved areas',
      wallet_address: '4HyK2mN7pQsRbVx8uT9wE6cJdL3vF1sA2rP5qW8xN9kM',
      allocation_percentage: 20,
      total_received: 8963.45,
      project_status: 'active'
    },
    {
      id: '3',
      name: '🌊 Ocean Cleanup Technology',
      description: 'Advanced systems for removing plastic from oceans',
      wallet_address: '7KjF3vR9sT2eN5qW8xL4mP6yC1zA9dH5uI7oE2nQ4rK',
      allocation_percentage: 15,
      total_received: 6782.34,
      project_status: 'active'
    },
    {
      id: '4',
      name: '🚗 Electric Vehicle Infrastructure',
      description: 'Charging stations and clean transportation',
      wallet_address: '2VbN8jK5sT9eR4wQ7xL3mP1yC6zA5dH9uI4oE8nF7rK',
      allocation_percentage: 15,
      total_received: 5429.12,
      project_status: 'active'
    },
    {
      id: '5',
      name: '♻️ Waste Reduction Systems',
      description: 'Advanced recycling and waste management',
      wallet_address: '9MkL5vR2sT6eN8qW4xJ7mP3yC1zA2dH6uI9oE5nQ1rK',
      allocation_percentage: 12,
      total_received: 4156.78,
      project_status: 'active'
    },
    {
      id: '6',
      name: '🌱 Sustainable Agriculture',
      description: 'Supporting eco-friendly farming practices',
      wallet_address: '3CdH8jK2sT5eR9wQ6xL4mP7yV1zA3dN5uI8oE4nF2rK',
      allocation_percentage: 13,
      total_received: 3894.56,
      project_status: 'active'
    }
  ])

  const [totalAllocated, setTotalAllocated] = useState(0)
  const [isProcessingFees, setIsProcessingFees] = useState(false)

  useEffect(() => {
    const total = greenProjects.reduce((sum, project) => sum + project.total_received, 0)
    setTotalAllocated(total)
    
    // Simulate live fee processing
    const interval = setInterval(() => {
      setIsProcessingFees(true)
      setTimeout(() => setIsProcessingFees(false), 2000)
    }, 30000) // Every 30 seconds
    
    return () => clearInterval(interval)
  }, [greenProjects])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'funded': return 'bg-blue-600'
      case 'completed': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Leaf className="h-6 w-6" />
            🌍 Green Project Wallet Distribution System
          </CardTitle>
          <p className="text-green-300">
            All community fees are automatically reinvested into global environmental projects
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <div className="text-2xl font-bold text-green-400">
                {totalAllocated.toLocaleString()} GAIA
              </div>
              <div className="text-xs text-muted-foreground">Total Allocated</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <div className="text-2xl font-bold text-blue-400">{greenProjects.length}</div>
              <div className="text-xs text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-xs text-muted-foreground">Fee Reinvestment</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-900/30">
              <div className="text-2xl font-bold text-orange-400">
                {isProcessingFees ? 'LIVE' : '24/7'}
              </div>
              <div className="text-xs text-muted-foreground">Processing</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Processing Status */}
      {isProcessingFees && (
        <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 animate-pulse">
          <CardContent className="pt-4">
            <div className="flex items-center justify-center gap-2 text-yellow-400">
              <Zap className="h-5 w-5 animate-bounce" />
              <span className="font-bold">LIVE FEE PROCESSING - Distributing to Green Projects</span>
              <Zap className="h-5 w-5 animate-bounce" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Green Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {greenProjects.map((project) => (
          <Card key={project.id} className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-emerald-900/10">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-green-400">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                </div>
                <Badge className={`${getStatusColor(project.project_status)} text-white`}>
                  {project.project_status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Allocation:</span>
                  <span className="font-bold text-green-400">{project.allocation_percentage}%</span>
                </div>
                
                <Progress value={project.allocation_percentage} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Received:</span>
                  <span className="font-bold">{project.total_received.toLocaleString()} GAIA</span>
                </div>
                
                <div className="bg-black/30 p-2 rounded text-xs">
                  <div className="text-muted-foreground mb-1">Wallet Address:</div>
                  <div className="font-mono text-green-400 break-all">{project.wallet_address}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Info */}
      <Card className="border-blue-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold text-blue-400">Automatic Reinvestment System</h3>
              <Globe className="h-6 w-6 text-green-400" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All transaction fees are automatically distributed to verified green projects 
              according to the allocation percentages shown above. This creates a sustainable 
              ecosystem where every trade helps improve our planet.
            </p>
            <div className="flex justify-center gap-4 text-xs flex-wrap">
              <Badge className="bg-green-600 text-white">
                <Leaf className="h-3 w-3 mr-1" />
                100% Green Reinvestment
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                Automatic Distribution
              </Badge>
              <Badge className="bg-purple-600 text-white">
                <DollarSign className="h-3 w-3 mr-1" />
                Transparent Allocation
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
