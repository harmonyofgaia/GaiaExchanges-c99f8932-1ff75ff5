
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Video } from 'lucide-react'

export default function VideoExchange() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center gap-3">
              <Video className="h-12 w-12 text-purple-400" />
              📹 Video Exchange
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Environmental Content Creation Platform
            </p>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
