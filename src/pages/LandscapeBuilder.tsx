
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mountain } from 'lucide-react'

export default function LandscapeBuilder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-brown-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto">
        <Card className="border-green-500/50 bg-gradient-to-r from-green-900/40 to-brown-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-brown-400 flex items-center justify-center gap-3">
              <Mountain className="h-12 w-12 text-green-400" />
              🏔️ Landscape Builder
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Virtual Ecosystem Design Platform
            </p>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
