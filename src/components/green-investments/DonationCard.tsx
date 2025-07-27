
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Target, Users } from 'lucide-react'

interface DonationCardProps {
  onDonate: (projectId: string, amount: number) => void
}

export function DonationCard({ onDonate }: DonationCardProps) {
  const handleDonate = () => {
    onDonate('eco-project-1', 100)
  }

  return (
    <Card className="border-green-500/20 bg-green-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Heart className="h-5 w-5" />
          Support Green Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-green-400" />
            <span>Goal: $50,000</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-blue-400" />
            <span>Supporters: 1,234</span>
          </div>
        </div>
        
        <Button 
          onClick={handleDonate}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Heart className="h-4 w-4 mr-2" />
          Donate Now
        </Button>
      </CardContent>
    </Card>
  )
}
