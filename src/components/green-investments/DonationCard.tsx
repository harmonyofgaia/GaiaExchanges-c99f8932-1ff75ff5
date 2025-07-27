
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Leaf, Target, Users, DollarSign } from 'lucide-react'
import { useState } from 'react'

interface DonationCardProps {
  project: {
    id: string
    title: string
    description: string
    fundingGoal: number
    currentFunding: number
    category: string
    impact: string
  }
  onDonate?: (projectId: string, amount: number) => void
}

export function DonationCard({ project, onDonate }: DonationCardProps) {
  const [donationAmount, setDonationAmount] = useState('')
  const progressPercentage = (project.currentFunding / project.fundingGoal) * 100

  const handleDonate = () => {
    const amount = parseFloat(donationAmount)
    if (amount > 0 && onDonate) {
      onDonate(project.id, amount)
      setDonationAmount('')
    }
  }

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Leaf className="h-5 w-5" />
          {project.title}
        </CardTitle>
        <Badge className="bg-green-600 w-fit">
          {project.category}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-green-300/80">
          {project.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-400">Funding Progress</span>
            <span className="text-green-300">
              ${project.currentFunding.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <Target className="h-4 w-4" />
            <span className="font-medium">Expected Impact</span>
          </div>
          <p className="text-sm text-emerald-300/80">{project.impact}</p>
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
            onClick={handleDonate}
            disabled={!donationAmount || parseFloat(donationAmount) <= 0}
            className="bg-green-600 hover:bg-green-700"
          >
            <DollarSign className="h-4 w-4 mr-1" />
            Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
