
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Film } from 'lucide-react'

export default function StreamingShows() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto">
        <Card className="border-blue-500/50 bg-gradient-to-r from-blue-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center gap-3">
              <Film className="h-12 w-12 text-blue-400" />
              🎬 Streaming Shows
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Environmental Documentary Streaming
            </p>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
