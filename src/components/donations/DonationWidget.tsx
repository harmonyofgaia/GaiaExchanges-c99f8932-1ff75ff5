
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Heart, Coins, Target, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

interface DonationWidgetProps {
  onDonate: (projectId: string, amount: number) => void
}

export function DonationWidget({ onDonate }: DonationWidgetProps) {
  const [donationAmount, setDonationAmount] = useState('')
  const [selectedProject, setSelectedProject] = useState('')

  const projects = [
    {
      id: 'reforestation-amazon',
      name: 'Amazon Reforestation',
      description: 'Plant trees in the Amazon rainforest',
      raised: 45000,
      target: 100000,
      donors: 234
    },
    {
      id: 'ocean-cleanup',
      name: 'Ocean Plastic Cleanup',
      description: 'Remove plastic waste from oceans',
      raised: 78000,
      target: 150000,
      donors: 456
    },
    {
      id: 'renewable-energy',
      name: 'Solar Panel Installation',
      description: 'Install solar panels in rural communities',
      raised: 23000,
      target: 75000,
      donors: 123
    }
  ]

  const handleDonate = () => {
    const amount = parseFloat(donationAmount)
    if (!selectedProject) {
      toast.error('Please select a project to donate to')
      return
    }
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid donation amount')
      return
    }

    onDonate(selectedProject, amount)
    
    toast.success(`💚 Donated $${amount} successfully!`, {
      description: `Thank you for supporting environmental projects`,
      duration: 5000
    })
    
    setDonationAmount('')
    setSelectedProject('')
  }

  return (
    <Card className="border-green-500/30 bg-green-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Heart className="h-6 w-6" />
          💚 Make a Donation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Project Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Select Project</label>
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedProject === project.id
                    ? 'border-green-500 bg-green-900/30'
                    : 'border-gray-700 hover:border-green-500/50'
                }`}
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{project.name}</h4>
                  <Badge variant="outline">{project.donors} donors</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Raised: ${project.raised.toLocaleString()}</span>
                    <span>Target: ${project.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(project.raised / project.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Amount */}
        <div>
          <label className="text-sm font-medium mb-2 block">Donation Amount ($)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              min="1"
              step="0.01"
            />
            <Button
              onClick={handleDonate}
              disabled={!selectedProject || !donationAmount}
              className="bg-green-600 hover:bg-green-700"
            >
              <Coins className="h-4 w-4 mr-2" />
              Donate
            </Button>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[10, 25, 50, 100].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => setDonationAmount(amount.toString())}
              className="text-xs"
            >
              ${amount}
            </Button>
          ))}
        </div>

        {/* Impact Info */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
          <h5 className="font-semibold text-blue-400 mb-2">🌍 Your Impact</h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-400" />
              <span>Direct environmental impact</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span>Earn impact tokens</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
