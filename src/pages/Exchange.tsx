
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

const Exchange = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-to-r from-green-900/40 to-blue-900/40 border-green-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-6 w-6" />
              Gaia Exchange
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Advanced trading platform coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Exchange
