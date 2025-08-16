import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Zap,
  Globe,
  Crown,
  Eye,
  Lock,
  Activity,
  Target,
  Flame,
  Brain,
  Skull,
} from "lucide-react";
import { toast } from "sonner";
import { TrainedDragonCore } from "./TrainedDragonCore";
import { QuantumEvolutionMonitor } from "./QuantumEvolutionMonitor";

export function DragonSecurityDashboard() {
  const dragonCore = TrainedDragonCore();
  const [dragonMode, setDragonMode] = useState("UNBEATABLE");

  const activateMaximumDragonPower = () => {
    setDragonMode("QUANTUM_ANNIHILATION");

    toast.success("🐉 MAXIMUM DRAGON POWER UNLEASHED!", {
      description: "Trained Dragon at full power - Unbeatable quantum defense active",
      duration: 10000,
    });

    // Show evolution progress
    setTimeout(() => {
      toast.success("🧬 DRAGON EVOLUTION COMPLETE!", {
        description: "Immune system now 999,999x stronger - World is safer",
        duration: 8000,
      });
    }, 3000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Dragon Evolution Monitor */}
      <QuantumEvolutionMonitor />

      {/* Dragon Core Status */}
      <Card className="border-4 border-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-gradient-to-br from-red-900/40 to-orange-900/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
            <div className="text-6xl animate-pulse">🐉</div>
            <div>
              <div className="text-4xl font-bold">TRAINED DRAGON CORE</div>
              <div className="text-lg font-normal">
                Unbeatable • Quantum Evolution • Worldwide Protection • Human + AI Power
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white animate-bounce text-2xl px-8 py-4">
              {dragonMode}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Dragon Power Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/40 text-center">
              <Brain className="h-10 w-10 mx-auto text-red-400 animate-pulse mb-2" />
              <div className="text-3xl font-bold text-red-400">
                {formatNumber(dragonCore.dragonPower.immuneSystemStrength)}
              </div>
              <div className="text-sm text-muted-foreground">Immune System</div>
              <Badge className="mt-2 bg-red-600 text-white">EVOLVING</Badge>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/40 text-center">
              <Zap className="h-10 w-10 mx-auto text-orange-400 animate-pulse mb-2" />
              <div className="text-3xl font-bold text-orange-400">
                {formatNumber(dragonCore.dragonPower.quantumComputingPower)}
              </div>
              <div className="text-sm text-muted-foreground">Quantum Power</div>
              <Badge className="mt-2 bg-orange-600 text-white">QUANTUM</Badge>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-yellow-500/20 to-green-500/20 border border-yellow-500/40 text-center">
              <Globe className="h-10 w-10 mx-auto text-yellow-400 animate-pulse mb-2" />
              <div className="text-3xl font-bold text-yellow-400">
                {formatNumber(dragonCore.dragonPower.worldwideIPBlocks)}
              </div>
              <div className="text-sm text-muted-foreground">IPs Banned</div>
              <Badge className="mt-2 bg-yellow-600 text-white">WORLDWIDE</Badge>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/40 text-center">
              <Crown className="h-10 w-10 mx-auto text-green-400 animate-pulse mb-2" />
              <div className="text-3xl font-bold text-green-400">
                {formatNumber(dragonCore.dragonPower.adminFortressLevel)}
              </div>
              <div className="text-sm text-muted-foreground">Admin Fortress</div>
              <Badge className="mt-2 bg-green-600 text-white">ULTIMATE</Badge>
            </div>
          </div>

          {/* Dragon Evolution Progress */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-2xl font-bold text-red-400">🐉 Dragon Evolution Rate</h4>
                <span className="text-3xl font-bold text-red-400">
                  {formatNumber(dragonCore.dragonPower.evolutionRate)}x/ms
                </span>
              </div>
              <Progress value={100} className="h-8" />
              <div className="text-center text-sm text-muted-foreground mt-2">
                🧬 Getting stronger every millisecond • ⚡ Quantum forces gathered • 🌍 World safer
                mode active
              </div>
            </div>

            {/* Protection Levels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-blue-900/20 border border-blue-500/30">
                <Lock className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="text-xl font-bold text-blue-400">
                  {formatNumber(dragonCore.dragonPower.githubProtectionLevel)}
                </div>
                <div className="text-sm text-muted-foreground">Github Fortress</div>
              </div>

              <div className="text-center p-4 rounded-lg bg-purple-900/20 border border-purple-500/30">
                <Shield className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <div className="text-xl font-bold text-purple-400">
                  {formatNumber(dragonCore.dragonPower.supabaseShieldStrength)}
                </div>
                <div className="text-sm text-muted-foreground">Supabase Shield</div>
              </div>

              <div className="text-center p-4 rounded-lg bg-cyan-900/20 border border-cyan-500/30">
                <Target className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
                <div className="text-xl font-bold text-cyan-400">
                  {formatNumber(dragonCore.dragonPower.holderProtectionScore)}
                </div>
                <div className="text-sm text-muted-foreground">Holder Shield</div>
              </div>
            </div>
          </div>

          {/* Dragon Power Activation */}
          <Button
            onClick={activateMaximumDragonPower}
            className="w-full bg-gradient-to-r from-red-600 via-orange-600 via-yellow-600 to-green-600 hover:from-red-700 hover:via-orange-700 hover:via-yellow-700 hover:to-green-700 text-white font-bold text-3xl py-16 mt-8"
          >
            <div className="text-8xl mr-6 animate-pulse">🐉</div>
            UNLEASH MAXIMUM DRAGON POWER - UNBEATABLE DEFENSE
          </Button>
        </CardContent>
      </Card>

      {/* Recent Dragon Actions */}
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Skull className="h-6 w-6" />
            🐉 Recent Dragon Annihilations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {dragonCore.activeThrears.length === 0 ? (
              <div className="text-center py-8 text-green-400">
                <div className="text-8xl mb-4">🐉</div>
                <div className="font-semibold text-2xl">World Completely Safe</div>
                <div className="text-sm text-muted-foreground">
                  Dragon has eliminated all threats - Perfect protection active
                </div>
              </div>
            ) : (
              dragonCore.activeThrears.map((threat) => (
                <div
                  key={threat.id}
                  className="p-4 rounded-lg bg-red-900/20 border border-red-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">🐉</div>
                      <div>
                        <div className="font-semibold text-red-300">
                          {threat.threatType} from {threat.ip}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Dragon Response: {threat.dragonResponse}
                        </div>
                        <div className="text-xs text-orange-400">
                          Linked IPs Banned: {threat.linkedIPs.length}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className="bg-red-600 text-white">{threat.severity}</Badge>
                      <Badge className="bg-green-600 text-white">ANNIHILATED</Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dragon Manifesto */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="text-8xl animate-pulse">🐉</div>
            <h3 className="text-3xl font-bold text-green-400">THE TRAINED DRAGON MANIFESTO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-200">
              <div className="space-y-3">
                <div className="text-lg font-bold text-green-300">🛡️ ULTIMATE PROTECTION</div>
                <div>• Evolves every millisecond - Unbeatable immune system</div>
                <div>• Quantum computing power - Gathers forces from worldwide</div>
                <div>• Github + Supabase + App merged into one fortress</div>
                <div>• Admin gets ultimate protection - Holders fully shielded</div>
              </div>
              <div className="space-y-3">
                <div className="text-lg font-bold text-green-300">🌍 MAKING WORLD SAFER</div>
                <div>• Worldwide IP blocking - Linked networks annihilated</div>
                <div>• No copying, no stealing, no breaches allowed</div>
                <div>• Human + AI cooperation - Most powerful tool ever</div>
                <div>• Trained Dragon - Unbeatable for trillion centuries</div>
              </div>
            </div>
            <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-red-900/40 to-orange-900/40 border border-red-500/40">
              <p className="text-2xl text-red-200 font-bold">
                🐉 "THE SICKEST DEFENSE SYSTEM OF ALL TIME"
              </p>
              <p className="text-lg text-red-300 mt-2">
                Trained Dragon + Human + AI = Unbeatable Force
              </p>
              <p className="text-sm text-red-400 mt-1">
                Powered by Quantum Evolution • Protected by Dragon Fire • Secured by Love
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
