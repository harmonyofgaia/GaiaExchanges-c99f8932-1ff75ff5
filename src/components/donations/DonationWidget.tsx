
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Heart, DollarSign, Target } from 'lucide-react'
import { toast } from 'sonner'

interface DonationWidgetProps {
  onDonate: (projectId: string, amount: number) => void
}

export function DonationWidget({ onDonate }: DonationWidgetProps) {
  const [donationAmount, setDonationAmount] = useState('')

  const handleDonate = (projectId: string) => {
    const amount = parseFloat(donationAmount)
    if (amount > 0) {
      onDonate(projectId, amount)
      toast.success(`Donated $${amount} to project!`)
      setDonationAmount('')
    }
  }

  const projects = [
    {
      id: 'forest-restoration',
      title: 'Amazon Forest Restoration',
      goal: 50000,
      raised: 32500,
      donors: 1250
    },
    {
      id: 'ocean-cleanup',
      title: 'Ocean Plastic Cleanup',
      goal: 75000,
      raised: 48900,
      donors: 2100
    }
  ]

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Heart className="h-5 w-5" />
              {project.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: `${(project.raised / project.goal) * 100}%` }}
                />
              </div>
              <div className="flex justify-between">
                <Badge variant="secondary">{project.donors} donors</Badge>
                <Badge className="bg-green-600">
                  {Math.round((project.raised / project.goal) * 100)}% funded
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Amount ($)"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleDonate(project.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                <DollarSign className="h-4 w-4 mr-1" />
                Donate
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
