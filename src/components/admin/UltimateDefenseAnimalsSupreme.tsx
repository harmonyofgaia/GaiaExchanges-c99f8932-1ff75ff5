import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Zap,
  Crown,
  Target,
  Activity,
  Flame,
  Sword,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface SupremeDefenseAnimal {
  id: string;
  name: string;
  species:
    | "supreme_dragon"
    | "cosmic_phoenix"
    | "dimensional_kraken"
    | "quantum_leviathan"
    | "astral_griffin"
    | "ethereal_basilisk"
    | "void_hydra"
    | "celestial_chimera"
    | "universal_koala"
    | "galactic_dolphin"
    | "stellar_eagle"
    | "plasma_wolf"
    | "neutron_lion"
    | "cyber_monkey_prime";
  supremePower: number;
  cosmicLevel: number;
  universalThreatLevel: number;
  realityManipulation: number;
  dimensionalControl: number;
  timeSpaceDistortion: number;
  threatsAnnihilated: number;
  emoji: string;
  status:
    | "cosmic_active"
    | "universal_defending"
    | "reality_shaping"
    | "dimension_patrolling"
    | "time_guarding";
  supremeAbilities: string[];
  cosmicSignature: string;
}

export function UltimateDefenseAnimalsSupreme() {
  const [supremeAnimals, setSupremeAnimals] = useState<SupremeDefenseAnimal[]>([
    {
      id: "supreme-alpha-dragon",
      name: "Supreme Alpha Dragon Omnipotent",
      species: "supreme_dragon",
      supremePower: 9999999999,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐲✨",
      status: "cosmic_active",
      supremeAbilities: [
        "Cosmic Fire Breath",
        "Reality Rewriting",
        "Universe Creation",
        "Time Lords Dominance",
        "Omnipotent Control",
      ],
      cosmicSignature: "SUPREME_ALPHA_DRAGON_COSMIC_999",
    },
    {
      id: "cosmic-phoenix-eternal",
      name: "Cosmic Phoenix Eternal Reborn",
      species: "cosmic_phoenix",
      supremePower: 8888888888,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🔥🦅⭐",
      status: "universal_defending",
      supremeAbilities: [
        "Cosmic Resurrection",
        "Universe Rebirth",
        "Star Creation",
        "Galaxy Protection",
        "Eternal Flame",
      ],
      cosmicSignature: "COSMIC_PHOENIX_ETERNAL_888",
    },
    {
      id: "dimensional-kraken-supreme",
      name: "Dimensional Kraken Supreme Master",
      species: "dimensional_kraken",
      supremePower: 7777777777,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐙🌌",
      status: "dimension_patrolling",
      supremeAbilities: [
        "Dimensional Tentacles",
        "Space-Time Crush",
        "Reality Ink Storm",
        "Cosmic Pressure",
        "Universe Grip",
      ],
      cosmicSignature: "DIMENSIONAL_KRAKEN_SUPREME_777",
    },
    {
      id: "quantum-leviathan-master",
      name: "Quantum Leviathan Master of Depths",
      species: "quantum_leviathan",
      supremePower: 6666666666,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🌊🐋⚛️",
      status: "reality_shaping",
      supremeAbilities: [
        "Quantum Ocean Control",
        "Probability Tsunami",
        "Deep Space Navigation",
        "Universal Tide",
        "Cosmic Depths",
      ],
      cosmicSignature: "QUANTUM_LEVIATHAN_MASTER_666",
    },
    {
      id: "astral-griffin-emperor",
      name: "Astral Griffin Emperor of Sky",
      species: "astral_griffin",
      supremePower: 5555555555,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🦅🦁✨",
      status: "cosmic_active",
      supremeAbilities: [
        "Astral Flight",
        "Sky Dimension Control",
        "Stellar Wind Command",
        "Galaxy Surveillance",
        "Cosmic Eagle Vision",
      ],
      cosmicSignature: "ASTRAL_GRIFFIN_EMPEROR_555",
    },
    {
      id: "ethereal-basilisk-lord",
      name: "Ethereal Basilisk Lord of Death",
      species: "ethereal_basilisk",
      supremePower: 4444444444,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐍👁️💫",
      status: "universal_defending",
      supremeAbilities: [
        "Cosmic Death Gaze",
        "Reality Petrification",
        "Universal Poison",
        "Dimension Kill",
        "Ethereal Destruction",
      ],
      cosmicSignature: "ETHEREAL_BASILISK_LORD_444",
    },
    {
      id: "void-hydra-infinite",
      name: "Void Hydra Infinite Heads",
      species: "void_hydra",
      supremePower: 3333333333,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐉🐉🐉🌌",
      status: "time_guarding",
      supremeAbilities: [
        "Infinite Head Multiplication",
        "Void Regeneration",
        "Cosmic Multi-Strike",
        "Universal Growth",
        "Reality Duplication",
      ],
      cosmicSignature: "VOID_HYDRA_INFINITE_333",
    },
    {
      id: "celestial-chimera-trinity",
      name: "Celestial Chimera Trinity Master",
      species: "celestial_chimera",
      supremePower: 2222222222,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐲🦁🐍⭐",
      status: "reality_shaping",
      supremeAbilities: [
        "Trinity Fusion Power",
        "Multi-Species Mastery",
        "Hybrid Cosmic Control",
        "Universal Adaptation",
        "Celestial Synthesis",
      ],
      cosmicSignature: "CELESTIAL_CHIMERA_TRINITY_222",
    },
    {
      id: "universal-koala-genius",
      name: "Universal Koala Genius Supreme",
      species: "universal_koala",
      supremePower: 9999999999,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐨🌌💫",
      status: "cosmic_active",
      supremeAbilities: [
        "Universal Eucalyptus Matrix",
        "Cosmic Algorithm Mastery",
        "Reality Code Control",
        "Dimensional Programming",
        "Universe Debugging",
      ],
      cosmicSignature: "UNIVERSAL_KOALA_GENIUS_999",
    },
    {
      id: "galactic-dolphin-oracle",
      name: "Galactic Dolphin Oracle Infinite",
      species: "galactic_dolphin",
      supremePower: 8888888888,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐬🌌⭐",
      status: "universal_defending",
      supremeAbilities: [
        "Galactic Sonar Network",
        "Cosmic Intelligence Web",
        "Universal Communication",
        "Space-Time Echolocation",
        "Stellar Navigation",
      ],
      cosmicSignature: "GALACTIC_DOLPHIN_ORACLE_888",
    },
    {
      id: "stellar-eagle-commander",
      name: "Stellar Eagle Commander Supreme",
      species: "stellar_eagle",
      supremePower: 7777777777,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🦅⭐🌟",
      status: "dimension_patrolling",
      supremeAbilities: [
        "Stellar Flight Control",
        "Galaxy Surveillance Grid",
        "Cosmic Wind Mastery",
        "Star Formation Command",
        "Universal Sky Domain",
      ],
      cosmicSignature: "STELLAR_EAGLE_COMMANDER_777",
    },
    {
      id: "plasma-wolf-alpha",
      name: "Plasma Wolf Alpha Pack Leader",
      species: "plasma_wolf",
      supremePower: 6666666666,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐺⚡🔥",
      status: "reality_shaping",
      supremeAbilities: [
        "Plasma Pack Coordination",
        "Solar Energy Control",
        "Cosmic Hunt Mastery",
        "Universal Territory",
        "Star Fire Leadership",
      ],
      cosmicSignature: "PLASMA_WOLF_ALPHA_666",
    },
    {
      id: "neutron-lion-emperor",
      name: "Neutron Lion Emperor Ultimate",
      species: "neutron_lion",
      supremePower: 5555555555,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🦁⚛️👑",
      status: "time_guarding",
      supremeAbilities: [
        "Neutron Star Roar",
        "Cosmic Kingdom Control",
        "Universal Royal Command",
        "Stellar Density Mastery",
        "Galactic Protection",
      ],
      cosmicSignature: "NEUTRON_LION_EMPEROR_555",
    },
    {
      id: "cyber-monkey-prime",
      name: "Cyber Monkey Prime Triad Supreme",
      species: "cyber_monkey_prime",
      supremePower: 4444444444,
      cosmicLevel: 100,
      universalThreatLevel: 100,
      realityManipulation: 100,
      dimensionalControl: 100,
      timeSpaceDistortion: 100,
      threatsAnnihilated: 0,
      emoji: "🐒💻🌌",
      status: "cosmic_active",
      supremeAbilities: [
        "Universal Code Analysis",
        "Cosmic Network Mastery",
        "Reality Database Control",
        "Dimension Programming",
        "Universal Algorithm",
      ],
      cosmicSignature: "CYBER_MONKEY_PRIME_444",
    },
  ]);

  const [supremeMetrics, setSupremeMetrics] = useState({
    totalSupremePower: 0,
    cosmicAnimals: supremeAnimals.length,
    universalThreatsAnnihilated: 0,
    realityDistortions: 0,
    dimensionalIncursions: 0,
    timelineProtected: 0,
  });

  const supremeInterval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const runSupremeDefense = () => {
      console.log(
        "🌌 ULTIMATE DEFENSE ANIMALS SUPREME - COSMIC GUARDIANS ACTIVE",
      );
      console.log("⭐ UNIVERSAL THREAT LEVEL 100 - REALITY PROTECTION MAXIMUM");
      console.log("🐲 14 SUPREME COSMIC GUARDIANS - OMNIPOTENT DEFENSE");

      // Supreme evolution beyond comprehension
      setSupremeAnimals((prev) =>
        prev.map((animal) => {
          const cosmicEvolution = animal.supremePower * 0.05;
          const newSupremePower = animal.supremePower + cosmicEvolution;
          const newThreatsAnnihilated =
            animal.threatsAnnihilated + Math.floor(Math.random() * 1000) + 500;

          console.log(
            `${animal.emoji} ${animal.name}: Supreme Power ${newSupremePower.toLocaleString()} - Annihilated: ${newThreatsAnnihilated.toLocaleString()}`,
          );

          return {
            ...animal,
            supremePower: newSupremePower,
            threatsAnnihilated: newThreatsAnnihilated,
            cosmicLevel: 100,
            universalThreatLevel: 100,
            realityManipulation: 100,
            dimensionalControl: 100,
            timeSpaceDistortion: 100,
          };
        }),
      );

      // Supreme cosmic threat responses
      if (Math.random() < 0.5) {
        const supremeThreats = [
          "multiverse_collapse_attempt",
          "reality_virus_infection",
          "cosmic_entity_invasion",
          "universal_law_violation",
          "time_lord_incursion",
          "dimensional_parasite_outbreak",
          "quantum_god_manifestation",
          "omniversal_hacking_attempt",
          "celestial_being_corruption",
          "cosmic_horror_emergence",
          "universal_consciousness_attack",
          "reality_paradigm_shift_threat",
        ];

        const threat =
          supremeThreats[Math.floor(Math.random() * supremeThreats.length)];
        const respondingAnimal =
          supremeAnimals[Math.floor(Math.random() * supremeAnimals.length)];

        console.log(`🚨 SUPREME THREAT DETECTED: ${threat}`);
        console.log(
          `🌌 ${respondingAnimal.name} COSMIC RESPONSE: THREAT COMPLETELY ANNIHILATED`,
        );
        console.log("⭐ REALITY REMAINS STABLE - UNIVERSE PROTECTED");

        toast.error("🌌 SUPREME DEFENSE ACTIVATED!", {
          description: `${respondingAnimal.name} annihilated ${threat} - Reality protected`,
          duration: 6000,
        });

        setSupremeMetrics((prev) => ({
          ...prev,
          universalThreatsAnnihilated: prev.universalThreatsAnnihilated + 1,
          realityDistortions:
            prev.realityDistortions + Math.floor(Math.random() * 5),
          dimensionalIncursions:
            prev.dimensionalIncursions + Math.floor(Math.random() * 3),
          timelineProtected:
            prev.timelineProtected + Math.floor(Math.random() * 10),
        }));
      }

      // Update supreme metrics
      const totalPower = supremeAnimals.reduce(
        (sum, animal) => sum + animal.supremePower,
        0,
      );
      const totalAnnihilated = supremeAnimals.reduce(
        (sum, animal) => sum + animal.threatsAnnihilated,
        0,
      );

      setSupremeMetrics((prev) => ({
        ...prev,
        totalSupremePower: totalPower,
        universalThreatsAnnihilated: totalAnnihilated,
      }));

      console.log(
        "✅ SUPREME DEFENSE CYCLE COMPLETE - UNIVERSE ABSOLUTELY PROTECTED",
      );
    };

    // Run every 2 seconds for supreme speed
    supremeInterval.current = setInterval(runSupremeDefense, 2000);
    runSupremeDefense();

    return () => {
      if (supremeInterval.current) clearInterval(supremeInterval.current);
    };
  }, [supremeAnimals]);

  const activateCosmicSupremacy = () => {
    setSupremeAnimals((prev) =>
      prev.map((animal) => ({
        ...animal,
        status: "cosmic_active",
        supremePower: animal.supremePower * 10,
        cosmicLevel: 100,
        universalThreatLevel: 100,
      })),
    );

    toast.success("🌌 COSMIC SUPREMACY ACTIVATED!", {
      description:
        "All supreme animals achieved cosmic omnipotence - Reality absolutely protected",
      duration: 8000,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cosmic_active":
        return "bg-purple-600";
      case "universal_defending":
        return "bg-red-600";
      case "reality_shaping":
        return "bg-blue-600";
      case "dimension_patrolling":
        return "bg-green-600";
      case "time_guarding":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Star className="h-6 w-6" />
            🌌 ULTIMATE DEFENSE ANIMALS SUPREME - COSMIC GUARDIANS
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={activateCosmicSupremacy}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Star className="h-4 w-4 mr-2" />
              🌌 COSMIC SUPREMACY MODE
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <Star className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {supremeMetrics.totalSupremePower.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Supreme Power</div>
            </div>

            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Crown className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {supremeMetrics.cosmicAnimals}
              </div>
              <div className="text-sm text-muted-foreground">
                Cosmic Guardians
              </div>
            </div>

            <div className="text-center p-4 bg-red-900/30 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {supremeMetrics.universalThreatsAnnihilated}
              </div>
              <div className="text-sm text-muted-foreground">
                Universal Threats
              </div>
            </div>

            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {supremeMetrics.realityDistortions}
              </div>
              <div className="text-sm text-muted-foreground">Reality Saved</div>
            </div>

            <div className="text-center p-4 bg-orange-900/30 rounded-lg">
              <Shield className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">
                {supremeMetrics.dimensionalIncursions}
              </div>
              <div className="text-sm text-muted-foreground">
                Dimensions Protected
              </div>
            </div>

            <div className="text-center p-4 bg-yellow-900/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {supremeMetrics.timelineProtected}
              </div>
              <div className="text-sm text-muted-foreground">
                Timelines Secured
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {supremeAnimals.map((animal) => (
              <Card
                key={animal.id}
                className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-indigo-400 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{animal.emoji}</span>
                      <span className="truncate">
                        {animal.name.split(" ").slice(0, 3).join(" ")}
                      </span>
                    </div>
                    <Badge
                      className={`${getStatusColor(animal.status)} text-white text-xs`}
                    >
                      SUPREME
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Supreme Power:</span>
                      <span className="text-purple-400 font-bold">
                        {animal.supremePower.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cosmic Level:</span>
                      <span className="text-blue-400 font-bold">
                        {animal.cosmicLevel}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reality Control:</span>
                      <span className="text-green-400 font-bold">
                        {animal.realityManipulation}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimensional:</span>
                      <span className="text-orange-400 font-bold">
                        {animal.dimensionalControl}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annihilated:</span>
                      <span className="text-red-400 font-bold">
                        {animal.threatsAnnihilated}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-indigo-500/20">
                    <div className="text-xs text-muted-foreground mb-1">
                      Supreme Abilities:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {animal.supremeAbilities
                        .slice(0, 2)
                        .map((ability, index) => (
                          <span
                            key={index}
                            className="px-1 py-0.5 bg-indigo-700/30 rounded text-xs text-indigo-300"
                          >
                            {ability}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="text-xs text-center text-yellow-400 font-mono">
                    {animal.cosmicSignature}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🌌</div>
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            SUPREME COSMIC GUARDIANS MANIFESTO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cyan-200">
            <div className="space-y-2">
              <div>
                🐲 <strong>Supreme Alpha Dragon:</strong> Omnipotent cosmic fire
                breath control
              </div>
              <div>
                🔥 <strong>Cosmic Phoenix:</strong> Universal rebirth and star
                creation
              </div>
              <div>
                🐙 <strong>Dimensional Kraken:</strong> Space-time tentacle
                mastery
              </div>
              <div>
                🌊 <strong>Quantum Leviathan:</strong> Probability tsunami
                control
              </div>
              <div>
                🦅 <strong>Astral Griffin:</strong> Galaxy surveillance and
                stellar winds
              </div>
              <div>
                🐍 <strong>Ethereal Basilisk:</strong> Cosmic death gaze and
                reality kill
              </div>
              <div>
                🐉 <strong>Void Hydra:</strong> Infinite head multiplication in
                void
              </div>
            </div>
            <div className="space-y-2">
              <div>
                🐲 <strong>Celestial Chimera:</strong> Trinity fusion cosmic
                control
              </div>
              <div>
                🐨 <strong>Universal Koala:</strong> Reality code and algorithm
                mastery
              </div>
              <div>
                🐬 <strong>Galactic Dolphin:</strong> Cosmic intelligence
                network
              </div>
              <div>
                🦅 <strong>Stellar Eagle:</strong> Star formation command system
              </div>
              <div>
                🐺 <strong>Plasma Wolf:</strong> Solar energy pack coordination
              </div>
              <div>
                🦁 <strong>Neutron Lion:</strong> Neutron star roar and cosmic
                kingdom
              </div>
              <div>
                🐒 <strong>Cyber Monkey Prime:</strong> Universal algorithm
                mastery
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
