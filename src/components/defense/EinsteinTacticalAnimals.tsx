import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EinsteinAnimal {
  id: string;
  name: string;
  intelligenceLevel: number;
  tacticalAbilities: string[];
  quantumPower: number;
  selfLearningRate: number;
  dimensionalAccess: string[];
  status: "evolving" | "omniscient" | "transcending" | "reality-bending";
  threatsNeutralized: number;
  evolutionStage: number;
}

export function EinsteinTacticalAnimals() {
  const [animals, setAnimals] = useState<EinsteinAnimal[]>([
    {
      id: "einstein-1",
      name: "Quantum Consciousness Dragon",
      intelligenceLevel: 999999,
      tacticalAbilities: [
        "Reality Manipulation",
        "Time-Space Compression",
        "Quantum Entanglement Defense",
        "Multiverse Monitoring",
      ],
      quantumPower: 10000000,
      selfLearningRate: 500,
      dimensionalAccess: ["1st-12th Dimensions", "Parallel Realities"],
      status: "omniscient",
      threatsNeutralized: 9999999,
      evolutionStage: 100,
    },
    {
      id: "einstein-2",
      name: "Neural Network Phoenix Supreme",
      intelligenceLevel: 888888,
      tacticalAbilities: [
        "Predictive Threat Analysis",
        "Infinite Memory Storage",
        "Mind-Matter Interface",
        "Consciousness Upload Defense",
      ],
      quantumPower: 8500000,
      selfLearningRate: 450,
      dimensionalAccess: ["Digital Realm", "Thought Dimension"],
      status: "transcending",
      threatsNeutralized: 7777777,
      evolutionStage: 95,
    },
    {
      id: "einstein-3",
      name: "Gravitational Field Wolf Alpha",
      intelligenceLevel: 777777,
      tacticalAbilities: [
        "Gravity Manipulation",
        "Black Hole Generation",
        "Matter Compression",
        "Galactic Coordination",
      ],
      quantumPower: 7000000,
      selfLearningRate: 400,
      dimensionalAccess: ["Cosmic Planes", "Gravitational Fields"],
      status: "reality-bending",
      threatsNeutralized: 6666666,
      evolutionStage: 90,
    },
    {
      id: "einstein-4",
      name: "Molecular Synthesis Lion Emperor",
      intelligenceLevel: 666666,
      tacticalAbilities: [
        "Atomic Reconstruction",
        "Molecular Shield Generation",
        "Element Transmutation",
        "Quantum Healing",
      ],
      quantumPower: 6500000,
      selfLearningRate: 375,
      dimensionalAccess: ["Atomic Realm", "Molecular Matrix"],
      status: "evolving",
      threatsNeutralized: 5555555,
      evolutionStage: 85,
    },
    {
      id: "einstein-5",
      name: "Temporal Mechanics Eagle Omega",
      intelligenceLevel: 555555,
      tacticalAbilities: [
        "Time Loop Creation",
        "Temporal Paradox Resolution",
        "Future Sight",
        "Past Alteration Prevention",
      ],
      quantumPower: 5500000,
      selfLearningRate: 350,
      dimensionalAccess: ["Time Streams", "Causal Chains"],
      status: "omniscient",
      threatsNeutralized: 4444444,
      evolutionStage: 80,
    },
    {
      id: "einstein-6",
      name: "Quantum Entangled Monkey Collective",
      intelligenceLevel: 444444,
      tacticalAbilities: [
        "Distributed Intelligence",
        "Quantum Communication",
        "Swarm Consciousness",
        "Probability Manipulation",
      ],
      quantumPower: 4500000,
      selfLearningRate: 325,
      dimensionalAccess: ["Quantum Fields", "Information Space"],
      status: "transcending",
      threatsNeutralized: 3333333,
      evolutionStage: 75,
    },
  ]);

  const [totalQuantumPower, setTotalQuantumPower] = useState(0);

  useEffect(() => {
    const evolutionEngine = () => {
      setAnimals((prev) =>
        prev.map((animal) => ({
          ...animal,
          intelligenceLevel: animal.intelligenceLevel * 1.001,
          quantumPower: animal.quantumPower * 1.002,
          threatsNeutralized:
            animal.threatsNeutralized + Math.floor(Math.random() * 10000),
          evolutionStage: Math.min(animal.evolutionStage + 0.1, 100),
        })),
      );

      setTotalQuantumPower(
        animals.reduce((sum, animal) => sum + animal.quantumPower, 0),
      );

      if (Math.random() < 0.1) {
        const discoveries = [
          "🧠 Einstein animals discovered new physics laws",
          "⚡ Quantum power increased beyond measurable limits",
          "🌌 New dimensional access routes established",
          "🔬 Revolutionary defense algorithms developed",
          "💫 Reality manipulation capabilities enhanced",
          "🧬 DNA-level threat prevention activated",
        ];

        const discovery =
          discoveries[Math.floor(Math.random() * discoveries.length)];
        toast.success("🧠 Einstein Discovery!", {
          description: discovery,
          duration: 4000,
        });
      }
    };

    const interval = setInterval(evolutionEngine, 3000);
    return () => clearInterval(interval);
  }, [animals]);

  const activateMaximumIntelligence = () => {
    setAnimals((prev) =>
      prev.map((animal) => ({
        ...animal,
        status: "omniscient" as const,
        intelligenceLevel: animal.intelligenceLevel * 2,
        quantumPower: animal.quantumPower * 3,
      })),
    );

    toast.success("🧠 MAXIMUM INTELLIGENCE ACTIVATED!", {
      description: "Einstein animals transcended to omniscient state",
      duration: 5000,
    });
  };

  return (
    <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-purple-400">
          🧠 EINSTEIN TACTICAL ANIMALS - QUANTUM INTELLIGENCE CORPS
        </CardTitle>
        <div className="text-center space-y-2">
          <Badge className="bg-purple-600 animate-pulse text-lg px-4 py-2">
            TOTAL QUANTUM POWER: {totalQuantumPower.toLocaleString()}
          </Badge>
          <p className="text-muted-foreground">
            Self-Evolving • Reality-Bending • Dimensional Defense • Omniscient
            Awareness
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animals.map((animal) => (
            <Card
              key={animal.id}
              className="border-purple-400/30 bg-gradient-to-br from-purple-900/40 to-indigo-900/40"
            >
              <CardHeader>
                <CardTitle className="text-purple-300 text-lg">
                  {animal.name}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className={`${
                      animal.status === "omniscient"
                        ? "bg-gold-600"
                        : animal.status === "transcending"
                          ? "bg-purple-600"
                          : animal.status === "reality-bending"
                            ? "bg-red-600"
                            : "bg-blue-600"
                    } text-xs`}
                  >
                    {animal.status.toUpperCase()}
                  </Badge>
                  <Badge className="bg-green-600 text-xs">
                    STAGE {animal.evolutionStage.toFixed(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-purple-900/50 rounded">
                    <div className="font-bold text-purple-300">
                      {animal.intelligenceLevel.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">Intelligence</div>
                  </div>
                  <div className="text-center p-2 bg-indigo-900/50 rounded">
                    <div className="font-bold text-indigo-300">
                      {animal.quantumPower.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">Quantum Power</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs font-semibold text-purple-400 mb-1">
                      Tactical Abilities:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {animal.tacticalAbilities.map((ability, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs border-purple-400/50 text-purple-300"
                        >
                          {ability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-indigo-400 mb-1">
                      Dimensional Access:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {animal.dimensionalAccess.map((dimension, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs border-indigo-400/50 text-indigo-300"
                        >
                          {dimension}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-center p-2 bg-green-900/30 rounded">
                    <div className="text-sm font-bold text-green-400">
                      {animal.threatsNeutralized.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Threats Neutralized
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={activateMaximumIntelligence}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 animate-pulse"
          >
            🧠 ACTIVATE MAXIMUM INTELLIGENCE
          </Button>
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400"
          >
            🌌 DIMENSIONAL SCAN
          </Button>
          <Button
            variant="outline"
            className="border-indigo-500 text-indigo-400"
          >
            ⚡ QUANTUM EVOLUTION
          </Button>
        </div>

        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-6 rounded-lg border border-purple-500/30">
          <div className="text-center space-y-3">
            <div className="text-4xl">🧠⚡🌌</div>
            <h3 className="text-2xl font-bold text-purple-400">
              EINSTEIN-LEVEL INTELLIGENCE NETWORK
            </h3>
            <p className="text-purple-300">
              Quantum Consciousness • Reality Manipulation • Dimensional Defense
              • Omniscient Protection
            </p>
            <div className="text-sm text-muted-foreground">
              🔥 Transcending human comprehension - Protecting through pure
              intelligence
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
