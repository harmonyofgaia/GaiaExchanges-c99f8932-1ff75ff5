
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Paw, Shield } from 'lucide-react'

export default function AnimalWelfare() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center gap-3">
              <Heart className="h-12 w-12 text-green-400 animate-pulse" />
              🐾 Animal Welfare
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Protecting Wildlife Through Technology
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-green-600">🐾 Wildlife</Badge>
              <Badge className="bg-blue-600">🛡️ Protection</Badge>
              <Badge className="bg-purple-600">💚 Conservation</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Animal Rescue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Support animal rescue operations through our blockchain-based funding system.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/50 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Habitat Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Contribute to protecting natural habitats and endangered species worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Paw className="h-6 w-6" />
                Adoption Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect rescued animals with loving homes through our global network.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
