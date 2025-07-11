
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SelfTrainingAnimals } from '@/components/creatures/SelfTrainingAnimals'
import { DefenseWallCreatures } from '@/components/creatures/DefenseWallCreatures'
import { Badge } from '@/components/ui/badge'

export function CreatureManagement() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-gold-500/50 bg-gradient-to-br from-gold-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-gold-400">
            🦁 GAIA CREATURE MANAGEMENT CENTER
          </CardTitle>
          <p className="text-center text-gold-300">
            Complete oversight of all defensive creatures and self-training animals
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-purple-600 animate-pulse">CREATURES ACTIVE</Badge>
            <Badge className="bg-green-600 animate-pulse">AUTO-TRAINING</Badge>
            <Badge className="bg-red-600 animate-pulse">DEFENSE MODE</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="training-animals" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50 backdrop-blur-md border border-purple-500/20">
          <TabsTrigger 
            value="training-animals" 
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            🦁 Self-Training Animals
          </TabsTrigger>
          <TabsTrigger 
            value="defense-creatures" 
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
          >
            🏰 Defense Wall Creatures
          </TabsTrigger>
        </TabsList>

        <TabsContent value="training-animals" className="space-y-6 mt-6">
          <SelfTrainingAnimals />
        </TabsContent>

        <TabsContent value="defense-creatures" className="space-y-6 mt-6">
          <DefenseWallCreatures />
        </TabsContent>
      </Tabs>
    </div>
  )
}
