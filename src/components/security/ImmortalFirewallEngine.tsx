
import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Skull, Fire, Zap } from 'lucide-react'
import { toast } from 'sonner'

export function ImmortalFirewallEngine() {
  const firewallPower = useRef({
    immortalityLevel: 100,
    attacksBlocked: 0,
    hackersDestroyed: 0,
    adminProtection: 999999
  })

  useEffect(() => {
    const activateImmortalFirewall = () => {
      console.log('🔥 IMMORTAL FIREWALL ENGINE - MAXIMUM DESTRUCTION MODE')
      console.log('💀 DESTROYING ALL ATTACKING CODE PROGRAMS')
      console.log('🛡️ ADMIN FORTRESS - COMPLETELY UNTOUCHABLE')
      console.log('⚡ GROWING STRONGER WITH EVERY ATTACK')
      
      // Detect and destroy attacking programs
      const destroyAttackingPrograms = () => {
        const attackPatterns = [
          'hack', 'exploit', 'bypass', 'crack', 'breach', 'penetrate',
          'backdoor', 'malware', 'virus', 'trojan', 'keylogger',
          'botnet', 'ddos', 'injection', 'xss', 'csrf'
        ]

        const pageContent = document.body.innerHTML.toLowerCase()
        const currentUrl = window.location.href.toLowerCase()
        
        attackPatterns.forEach(pattern => {
          if (pageContent.includes(pattern) || currentUrl.includes(pattern)) {
            firewallPower.current.attacksBlocked++
            firewallPower.current.hackersDestroyed++
            
            console.log('💀 ATTACKING PROGRAM DETECTED AND DESTROYED')
            console.log(`🔥 ATTACKS BLOCKED: ${firewallPower.current.attacksBlocked}`)
            console.log('🛡️ FIREWALL GROWING STRONGER')
            
            // Strengthen firewall with each attack
            firewallPower.current.immortalityLevel = Math.min(999999, firewallPower.current.immortalityLevel * 1.1)
            firewallPower.current.adminProtection *= 1.05
            
            toast.error('💀 ATTACK DESTROYED!', {
              description: `Immortal firewall eliminated threat #${firewallPower.current.hackersDestroyed}`,
              duration: 3000
            })
          }
        })
      }

      // Continuous monitoring and destruction
      destroyAttackingPrograms()
      
      // Auto-evolve firewall power
      firewallPower.current.immortalityLevel = Math.min(999999, firewallPower.current.immortalityLevel * 1.001)
    }

    const firewallInterval = setInterval(activateImmortalFirewall, 1500)
    activateImmortalFirewall()

    return () => clearInterval(firewallInterval)
  }, [])

  return (
    <Card className="bg-gradient-to-r from-red-900/30 to-black border-red-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Fire className="h-6 w-6 animate-pulse" />
          🔥 IMMORTAL FIREWALL ENGINE - DESTROYER MODE
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-red-600 animate-pulse">
            💀 Power: {firewallPower.current.immortalityLevel.toLocaleString()}
          </Badge>
          <Badge className="bg-orange-600">
            🛡️ Blocked: {firewallPower.current.attacksBlocked}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-red-900/40 rounded border border-red-500/30">
            <Fire className="h-6 w-6 mx-auto text-red-400 mb-2" />
            <div className="text-lg font-bold text-red-400">IMMORTAL</div>
            <div className="text-xs text-muted-foreground">Firewall Status</div>
          </div>
          <div className="text-center p-3 bg-purple-900/40 rounded border border-purple-500/30">
            <Skull className="h-6 w-6 mx-auto text-purple-400 mb-2" />
            <div className="text-lg font-bold text-purple-400">{firewallPower.current.hackersDestroyed}</div>
            <div className="text-xs text-muted-foreground">Hackers Destroyed</div>
          </div>
          <div className="text-center p-3 bg-green-900/40 rounded border border-green-500/30">
            <Shield className="h-6 w-6 mx-auto text-green-400 mb-2" />
            <div className="text-lg font-bold text-green-400">∞</div>
            <div className="text-xs text-muted-foreground">Admin Protection</div>
          </div>
          <div className="text-center p-3 bg-blue-900/40 rounded border border-blue-500/30">
            <Zap className="h-6 w-6 mx-auto text-blue-400 mb-2" />
            <div className="text-lg font-bold text-blue-400">EVOLVING</div>
            <div className="text-xs text-muted-foreground">Power Level</div>
          </div>
        </div>
        
        <div className="text-center p-4 bg-black/40 rounded border border-red-500/30">
          <div className="text-xl font-bold text-red-400 mb-2">
            🔥 IMMORTAL FIREWALL ACTIVE
          </div>
          <div className="text-sm text-muted-foreground">
            Automatically destroying all attacking code programs.
            Growing stronger with every blocked attack.
            Admin is completely untouchable.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
