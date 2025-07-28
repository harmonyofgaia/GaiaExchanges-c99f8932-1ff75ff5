
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pickaxe } from 'lucide-react'

export default function TokenMining() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20 p-6">
      <div className="container mx-auto">
        <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-900/40 to-orange-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center gap-3">
              <Pickaxe className="h-12 w-12 text-yellow-400" />
              ⛏️ Token Mining
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Eco-Friendly Token Mining Platform
            </p>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
