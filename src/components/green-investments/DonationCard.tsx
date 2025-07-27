
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Heart, Target, Calendar, DollarSign } from 'lucide-react'

interface DonationCardProps {
  project: {
    id: string
    name: string
    description: string
    goal: number
    raised: number
    deadline: string
    category: string
    image?: string
  }
  onDonate: (projectId: string, amount: number) => void
}

export function DonationCard({ project, onDonate }: DonationCardProps) {
  const progress = (project.raised / project.goal) * 100

  const handleDonate = () => {
    onDonate(project.id, 25) // Default donation amount
  }

  return (
    <Card className="border-green-500/20 bg-green-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Heart className="h-5 w-5" />
          {project.name}
        </CardTitle>
        <Badge className="bg-green-600 text-white w-fit">
          {project.category}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {project.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-400">Raised: ${project.raised}</span>
            <span className="text-green-400">Goal: ${project.goal}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {progress.toFixed(1)}% funded
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          Deadline: {project.deadline}
        </div>
        
        <Button
          onClick={handleDonate}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Donate $25
        </Button>
      </CardContent>
    </Card>
  )
}
