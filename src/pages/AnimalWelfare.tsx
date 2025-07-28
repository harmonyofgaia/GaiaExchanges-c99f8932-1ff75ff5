
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Heart, Shield, Users, Leaf } from 'lucide-react'
import { AnimalWelfareHub } from '@/components/animal-welfare/AnimalWelfareHub'
import { AnimalRescueNFT } from '@/components/nft/AnimalRescueNFT'

export default function AnimalWelfare() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-8">
        <Card className="mb-8 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center gap-3">
              <Heart className="h-12 w-12 text-green-400 animate-pulse" />
              🐾 Animal Welfare Center
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Protecting Wildlife Through Technology and Community Action
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-green-600">🌱 Conservation</Badge>
              <Badge className="bg-blue-600">🐾 Wildlife Protection</Badge>
              <Badge className="bg-purple-600">❤️ Community Care</Badge>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="welfare-hub" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="welfare-hub">🏥 Welfare Hub</TabsTrigger>
            <TabsTrigger value="animal-nfts">🎨 Animal NFTs</TabsTrigger>
            <TabsTrigger value="protection">🛡️ Protection</TabsTrigger>
            <TabsTrigger value="rescue">🚑 Rescue Network</TabsTrigger>
            <TabsTrigger value="habitat">🌿 Habitat Restoration</TabsTrigger>
            <TabsTrigger value="adoption">❤️ Adoption Center</TabsTrigger>
          </TabsList>

          <TabsContent value="welfare-hub" className="space-y-6">
            <AnimalWelfareHub />
          </TabsContent>

          <TabsContent value="animal-nfts" className="space-y-6">
            <AnimalRescueNFT />
          </TabsContent>

          <TabsContent value="protection" className="space-y-6">
            <Card className="border-green-500/50 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  Protection Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Support wildlife protection initiatives and anti-poaching efforts worldwide.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rescue" className="space-y-6">
            <Card className="border-blue-500/50 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Rescue Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with local rescue organizations and volunteer opportunities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="habitat" className="space-y-6">
            <Card className="border-purple-500/50 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Leaf className="h-6 w-6" />
                  Habitat Restoration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fund and participate in habitat restoration projects for endangered species.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adoption" className="space-y-6">
            <Card className="border-yellow-500/50 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Heart className="h-6 w-6" />
                  Adoption Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find loving homes for animals in need through our digital adoption platform.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
