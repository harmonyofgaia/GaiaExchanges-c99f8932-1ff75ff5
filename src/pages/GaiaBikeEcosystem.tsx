
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bike } from 'lucide-react'

export default function GaiaBikeEcosystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto">
        <Card className="border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center gap-3">
              <Bike className="h-12 w-12 text-green-400" />
              🚲 GAiA Bike Ecosystem
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Sustainable Transportation Network
            </p>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
