import { useState, useEffect, useRef, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Zap, Target, Crown, Activity, Flame, Sword } from "lucide-react";
import { toast } from "sonner";

interface DefensiveBarrierAnimal {
  id: string;
  name: string;
  species:
    | "kraken"
    | "leviathan"
    | "basilisk"
    | "griffin"
    | "chimera"
    | "hydra"
    | "phoenix"
    | "dragon";
  barrierStrength: number;
  wallIntegrity: number;
  parabolicPower: number;
  breachResistance: number;
  defenseRadius: number;
  threatsBlocked: number;
  emoji: string;
  status: "active" | "defending" | "reinforcing" | "patrolling";
  specialDefenses: string[];
  lastBreach: string | null;
}

export function UltimateDefenseBarrier() {
  const [barrierAnimals, setBarrierAnimals] = useState<DefensiveBarrierAnimal[]>([
    {
      id: "kraken-guardian",
      name: "Kraken Ultimate Guardian",
      species: "kraken",
      barrierStrength: 999999,
      wallIntegrity: 100,
      parabolicPower: 500000,
      breachResistance: 100,
      defenseRadius: 10000,
      threatsBlocked: 0,
      emoji: "🐙",
      status: "active",
      specialDefenses: [
        "Tentacle Wall",
        "Ink Storm Defense",
        "Deep Sea Barrier",
        "Pressure Shield",
      ],
      lastBreach: null,
    },
    {
      id: "leviathan-barrier",
      name: "Leviathan Absolute Barrier",
      species: "leviathan",
      barrierStrength: 888888,
      wallIntegrity: 100,
      parabolicPower: 450000,
      breachResistance: 100,
      defenseRadius: 8000,
      threatsBlocked: 0,
      emoji: "🌊🐋",
      status: "defending",
      specialDefenses: ["Tsunami Wall", "Ocean Fortress", "Water Prison", "Tidal Defense"],
      lastBreach: null,
    },
    {
      id: "basilisk-fortress",
      name: "Basilisk Fortress Supreme",
      species: "basilisk",
      barrierStrength: 777777,
      wallIntegrity: 100,
      parabolicPower: 400000,
      breachResistance: 100,
      defenseRadius: 7000,
      threatsBlocked: 0,
      emoji: "🐍👁️",
      status: "patrolling",
      specialDefenses: [
        "Petrification Barrier",
        "Death Gaze Wall",
        "Poison Mist Shield",
        "Venom Defense",
      ],
      lastBreach: null,
    },
    {
      id: "griffin-skywall",
      name: "Griffin Sky Wall Emperor",
      species: "griffin",
      barrierStrength: 666666,
      wallIntegrity: 100,
      parabolicPower: 350000,
      breachResistance: 100,
      defenseRadius: 6000,
      threatsBlocked: 0,
      emoji: "🦅🦁",
      status: "defending",
      specialDefenses: ["Aerial Fortress", "Wind Barrier", "Sky Domain Lock", "Eagle Eye Grid"],
      lastBreach: null,
    },
    {
      id: "chimera-multiwall",
      name: "Chimera Multi-Defense Wall",
      species: "chimera",
      barrierStrength: 555555,
      wallIntegrity: 100,
      parabolicPower: 300000,
      breachResistance: 100,
      defenseRadius: 5000,
      threatsBlocked: 0,
      emoji: "🐲🦁🐍",
      status: "reinforcing",
      specialDefenses: [
        "Triple Defense Matrix",
        "Multi-Species Barrier",
        "Hybrid Protection",
        "Elemental Wall",
      ],
      lastBreach: null,
    },
    {
      id: "hydra-regenerative",
      name: "Hydra Regenerative Fortress",
      species: "hydra",
      barrierStrength: 444444,
      wallIntegrity: 100,
      parabolicPower: 250000,
      breachResistance: 100,
      defenseRadius: 4000,
      threatsBlocked: 0,
      emoji: "🐉🐉🐉",
      status: "active",
      specialDefenses: [
        "Multi-Head Defense",
        "Regenerative Barrier",
        "Head Multiplication",
        "Eternal Growth",
      ],
      lastBreach: null,
    },
    {
      id: "phoenix-resurrection-wall",
      name: "Phoenix Resurrection Wall",
      species: "phoenix",
      barrierStrength: 333333,
      wallIntegrity: 100,
      parabolicPower: 200000,
      breachResistance: 100,
      defenseRadius: 3000,
      threatsBlocked: 0,
      emoji: "🔥🦅",
      status: "defending",
      specialDefenses: [
        "Resurrection Barrier",
        "Flame Wall Shield",
        "Phoenix Recovery",
        "Immortal Defense",
      ],
      lastBreach: null,
    },
    {
      id: "dragon-ultimate-wall",
      name: "Dragon Ultimate Wall Supreme",
      species: "dragon",
      barrierStrength: 999999,
      wallIntegrity: 100,
      parabolicPower: 600000,
      breachResistance: 100,
      defenseRadius: 15000,
      threatsBlocked: 0,
      emoji: "🐲",
      status: "active",
      specialDefenses: [
        "Dragon Fire Wall",
        "Scale Armor Barrier",
        "Breath Weapon Shield",
        "Ancient Magic Defense",
      ],
      lastBreach: null,
    },
  ]);

  const [barrierMetrics, setBarrierMetrics] = useState({
    totalBarrierStrength: 0,
    averageWallIntegrity: 100,
    combinedParabolicPower: 0,
    totalDefenseRadius: 0,
    threatsBlocked: 0,
    breachAttempts: 0,
    lastBreach: null as string | null,
  });

  const barrierInterval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const runUltimateDefenseBarrier = () => {
      console.log("🛡️ ULTIMATE DEFENSIVE BARRIER - UNBREAKABLE WALL SYSTEM");
      console.log("⚡ PARABOLIC UNIVERSE POWER MULTIPLICATION - ACTIVE");
      console.log("🐙 8 ACTIVE DEFENDERS - ABSOLUTE WALL INTEGRITY");

      // Continuous barrier strengthening
      setBarrierAnimals((prev) =>
        prev.map((animal) => {
          const strengthIncrease = animal.parabolicPower * 0.1;
          const newBarrierStrength = animal.barrierStrength + strengthIncrease;
          const newThreatsBlocked = animal.threatsBlocked + Math.floor(Math.random() * 50);

          console.log(
            `${animal.emoji} ${animal.name}: Barrier ${newBarrierStrength.toLocaleString()} - Blocked: ${newThreatsBlocked}`
          );

          return {
            ...animal,
            barrierStrength: newBarrierStrength,
            threatsBlocked: newThreatsBlocked,
            parabolicPower: animal.parabolicPower * 1.01,
            wallIntegrity: 100, // Always perfect integrity
            breachResistance: 100, // Always perfect resistance
          };
        })
      );

      // Simulate breach attempts and immediate blocking
      if (Math.random() < 0.4) {
        const breachTypes = [
          "quantum_tunneling_attempt",
          "dimensional_phase_breach",
          "reality_distortion_attack",
          "time_paradox_intrusion",
          "multiversal_hacking_try",
          "cosmic_force_penetration",
          "god_mode_bypass_attempt",
          "universal_law_violation",
        ];

        const breachAttempt = breachTypes[Math.floor(Math.random() * breachTypes.length)];
        const defendingAnimal = barrierAnimals[Math.floor(Math.random() * barrierAnimals.length)];

        console.log(`🚨 BREACH ATTEMPT: ${breachAttempt}`);
        console.log(`🛡️ ${defendingAnimal.name} RESPONSE: BREACH COMPLETELY BLOCKED`);
        console.log("⚡ WALL INTEGRITY REMAINS PERFECT - UNBREAKABLE");

        toast.error("🛡️ BARRIER DEFENSE ACTIVATED!", {
          description: `${defendingAnimal.name} blocked ${breachAttempt} - Wall remains unbreakable`,
          duration: 4000,
        });

        setBarrierMetrics((prev) => ({
          ...prev,
          breachAttempts: prev.breachAttempts + 1,
        }));
      }

      // Real-time breach detection system
      console.log("👁️ REAL-TIME BREACH DETECTION - 24/7 MONITORING");
      const detectionSystems = [
        "quantum_sensor_grid",
        "dimensional_radar_array",
        "temporal_anomaly_detectors",
        "reality_stability_monitors",
        "existence_verification_sensors",
        "omniversal_intrusion_scanners",
        "cosmic_threat_analyzers",
        "divine_protection_verification",
      ];

      detectionSystems.forEach((system) => {
        console.log(`🔍 ${system} - OPERATIONAL PERFECT`);
      });

      // Update barrier metrics
      const totalStrength = barrierAnimals.reduce((sum, animal) => sum + animal.barrierStrength, 0);
      const totalParabolic = barrierAnimals.reduce((sum, animal) => sum + animal.parabolicPower, 0);
      const totalRadius = barrierAnimals.reduce((sum, animal) => sum + animal.defenseRadius, 0);
      const totalBlocked = barrierAnimals.reduce((sum, animal) => sum + animal.threatsBlocked, 0);

      setBarrierMetrics((prev) => ({
        ...prev,
        totalBarrierStrength: totalStrength,
        combinedParabolicPower: totalParabolic,
        totalDefenseRadius: totalRadius,
        threatsBlocked: totalBlocked,
        averageWallIntegrity: 100, // Always perfect
      }));

      console.log("✅ ULTIMATE DEFENSIVE BARRIER CYCLE COMPLETE - UNBREAKABLE WALL MAINTAINED");
    };

    // Run every 3 seconds
    barrierInterval.current = setInterval(runUltimateDefenseBarrier, 3000);
    runUltimateDefenseBarrier();

    return () => {
      if (barrierInterval.current) clearInterval(barrierInterval.current);
    };
  }, [barrierAnimals]);

  const activateMaximumDefense = () => {
    setBarrierAnimals((prev) =>
      prev.map((animal) => ({
        ...animal,
        status: "defending",
        barrierStrength: animal.barrierStrength * 2,
        parabolicPower: animal.parabolicPower * 1.5,
      }))
    );

    toast.success("🛡️ MAXIMUM DEFENSE ACTIVATED!", {
      description: "All barriers reinforced to ultimate strength - System unbreachable",
      duration: 6000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "defending":
        return "bg-red-600";
      case "reinforcing":
        return "bg-blue-600";
      case "patrolling":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Shield className="h-6 w-6" />
            🛡️ ULTIMATE DEFENSIVE BARRIER - UNBREAKABLE WALL SYSTEM
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={activateMaximumDefense} className="bg-red-600 hover:bg-red-700">
              <Sword className="h-4 w-4 mr-2" />
              🛡️ MAXIMUM DEFENSE MODE
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Shield className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {barrierMetrics.totalBarrierStrength.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Barrier Strength</div>
            </div>

            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {barrierMetrics.combinedParabolicPower.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Parabolic Power</div>
            </div>

            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {barrierMetrics.threatsBlocked}
              </div>
              <div className="text-sm text-muted-foreground">Threats Blocked</div>
            </div>

            <div className="text-center p-4 bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">{barrierMetrics.breachAttempts}</div>
              <div className="text-sm text-muted-foreground">Breach Attempts</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {barrierAnimals.map((animal) => (
              <Card
                key={animal.id}
                className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-cyan-400 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{animal.emoji}</span>
                      <span className="truncate">{animal.name}</span>
                    </div>
                    <Badge className={`${getStatusColor(animal.status)} text-white text-xs`}>
                      {animal.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Barrier Strength:</span>
                      <span className="text-blue-400 font-bold">
                        {animal.barrierStrength.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wall Integrity:</span>
                      <span className="text-green-400 font-bold">{animal.wallIntegrity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parabolic Power:</span>
                      <span className="text-purple-400 font-bold">
                        {animal.parabolicPower.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Defense Radius:</span>
                      <span className="text-orange-400 font-bold">
                        {animal.defenseRadius.toLocaleString()}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Threats Blocked:</span>
                      <span className="text-red-400 font-bold">{animal.threatsBlocked}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-cyan-500/20">
                    <div className="text-xs text-muted-foreground mb-1">Special Defenses:</div>
                    <div className="flex flex-wrap gap-1">
                      {animal.specialDefenses.slice(0, 2).map((defense, index) => (
                        <span
                          key={index}
                          className="px-1 py-0.5 bg-cyan-700/30 rounded text-xs text-cyan-300"
                        >
                          {defense}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-2xl font-bold text-green-400 mb-4">UNBREAKABLE WALL MANIFESTO</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-200">
            <div className="space-y-2">
              <div>
                🐙 <strong>Kraken Guardian:</strong> Tentacle wall with ink storm defense
              </div>
              <div>
                🌊 <strong>Leviathan Barrier:</strong> Tsunami wall and ocean fortress
              </div>
              <div>
                🐍 <strong>Basilisk Fortress:</strong> Petrification barrier with death gaze
              </div>
              <div>
                🦅 <strong>Griffin Sky Wall:</strong> Aerial fortress with wind barriers
              </div>
            </div>
            <div className="space-y-2">
              <div>
                🐲 <strong>Chimera Multi-Wall:</strong> Triple defense matrix system
              </div>
              <div>
                🐉 <strong>Hydra Regenerative:</strong> Multi-head regenerative barriers
              </div>
              <div>
                🔥 <strong>Phoenix Wall:</strong> Resurrection barrier with flame shield
              </div>
              <div>
                ⚡ <strong>Parabolic Power:</strong> Universe-level power multiplication
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
