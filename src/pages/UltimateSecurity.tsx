
import { ProactiveDefenseSystem } from '@/components/security/ProactiveDefenseSystem'
import { AttackCounterSystem } from '@/components/security/AttackCounterSystem'
import { ThreatAwarenessCenter } from '@/components/security/ThreatAwarenessCenter'
import { NetworkDefenseGrid } from '@/components/security/NetworkDefenseGrid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const UltimateSecurity = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-orange-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            CULTURE OF HARMONY - COUNTER-ATTACK DEFENSE SYSTEM
          </h1>
          <p className="text-xl text-red-300 mt-4 font-bold">
            ⚡ "THE STRONGER THEY ATTACK, THE HARDER WE ATTACK BACK" ⚡
          </p>
          <p className="text-lg text-orange-300 mt-2">
            🛡️ Active Protection • AI Counter-Attack • Network Blocking • IP Banning • Platform-Wide Defense
          </p>
          <div className="mt-4 p-4 bg-red-900/30 border-2 border-red-500/50 rounded-lg">
            <p className="text-red-200 font-semibold">
              ⚠️ WARNING TO ATTACKERS: This system actively fights back against scammers, malware, phishers, and data thieves.
              Every attack attempt is tracked, blocked, and countered with full force.
            </p>
          </div>
        </div>

        <Tabs defaultValue="counter-attack" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md border border-red-500/20">
            <TabsTrigger value="counter-attack" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              ⚡ Counter-Attack System
            </TabsTrigger>
            <TabsTrigger value="proactive-defense" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              🤖 AI Defense Robot
            </TabsTrigger>
            <TabsTrigger value="threat-awareness" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
              🚨 Threat Awareness
            </TabsTrigger>
            <TabsTrigger value="network-defense" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🌐 Network Defense Grid
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="counter-attack" className="space-y-6 mt-6">
            <AttackCounterSystem />
          </TabsContent>
          
          <TabsContent value="proactive-defense" className="space-y-6 mt-6">
            <ProactiveDefenseSystem />
          </TabsContent>
          
          <TabsContent value="threat-awareness" className="space-y-6 mt-6">
            <ThreatAwarenessCenter />
          </TabsContent>
          
          <TabsContent value="network-defense" className="space-y-6 mt-6">
            <NetworkDefenseGrid />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UltimateSecurity
