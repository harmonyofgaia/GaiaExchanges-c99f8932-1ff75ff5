import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { weaponizedCounterAttack } from "@/services/weaponizedCounterAttack";
import { Sword, Target, Shield, Zap, Crosshair, Bomb } from "lucide-react";

export function WeaponizedCounterAttackDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    autoRetaliationEnabled: false,
    activeCounterAttacks: 0,
    completedAttacks: 0,
    weaponizedIPs: 0,
    socialReversals: 0,
    weaponizedHoneypots: 0,
    totalAttackersTrapped: 0,
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus(weaponizedCounterAttack.getWeaponizedCounterAttackStatus());
    };

    const interval = setInterval(updateStatus, 2000);
    updateStatus();

    return () => clearInterval(interval);
  }, []);

  const handleInitializeCounterAttack = async () => {
    try {
      await weaponizedCounterAttack.initializeWeaponizedCounterAttackSystem();
      toast.success("⚔️ Weaponized Counter-Attack System Armed");
    } catch (error) {
      toast.error("Failed to initialize counter-attack system");
    }
  };

  const handleLaunchCounterAttack = async () => {
    try {
      await weaponizedCounterAttack.launchCounterAttack({
        attackType: "quantum_retaliation",
        targetIP: "192.168.1.100",
        intensity: "overwhelming",
        evidence: ["Simulated threat detected", "Demo counter-attack"],
      });
    } catch (error) {
      toast.error("Failed to launch counter-attack");
    }
  };

  const handleWeaponizeIP = async () => {
    try {
      await weaponizedCounterAttack.weaponizeIPReputation("203.0.113.1");
    } catch (error) {
      toast.error("Failed to weaponize IP reputation");
    }
  };

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sword className="h-6 w-6 text-primary" />
          Phase 7: Weaponized Counter-Attack Systems
          <Badge variant={status.isActive ? "destructive" : "secondary"}>
            {status.isActive ? "ARMED" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Attacks</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.activeCounterAttacks}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Crosshair className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Completed</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.completedAttacks}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bomb className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Weaponized IPs</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.weaponizedIPs}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Honeypots</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.weaponizedHoneypots}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Social Reversals</span>
            </div>
            <div className="text-xl font-bold">{status.socialReversals}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Attackers Trapped</span>
            </div>
            <div className="text-xl font-bold">{status.totalAttackersTrapped}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Auto-Retaliation:</span>
          <Badge variant={status.autoRetaliationEnabled ? "destructive" : "secondary"}>
            {status.autoRetaliationEnabled ? "ENABLED" : "DISABLED"}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handleInitializeCounterAttack} size="sm">
            <Sword className="h-4 w-4 mr-2" />
            Initialize Counter-Attack
          </Button>

          <Button onClick={handleLaunchCounterAttack} variant="destructive" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Launch Counter-Attack
          </Button>

          <Button onClick={handleWeaponizeIP} variant="outline" size="sm">
            <Bomb className="h-4 w-4 mr-2" />
            Weaponize IP Reputation
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Active Counter-Attack Arsenal</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="destructive">DDoS Reflection</Badge>
            <Badge variant="destructive">Exploit Mirror</Badge>
            <Badge variant="destructive">Social Reversal</Badge>
            <Badge variant="destructive">Honeypot Trap</Badge>
            <Badge variant="destructive">Quantum Retaliation</Badge>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">⚔️ Automated Retaliation Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Our weaponized counter-attack system provides automated retaliation against all threats
            with quantum-level precision, social engineering reversals, and overwhelming defensive
            firepower.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
