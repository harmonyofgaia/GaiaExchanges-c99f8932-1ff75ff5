import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface ImmortalAnimal {
  id: string;
  species:
    | "dragon"
    | "phoenix"
    | "griffin"
    | "leviathan"
    | "kraken"
    | "basilisk"
    | "cyber_koala"
    | "alpha_dragon"
    | "quantum_phoenix"
    | "king_lion"
    | "sky_eagle"
    | "ai_dolphin";
  name: string;
  powerLevel: number;
  invincibilityStrength: number;
  immortalityIndex: number;
  learningRate: number;
  evolutionSpeed: number;
  threatsNeutralized: number;
  specialAbilities: string[];
  quantumSignature: string;
}

interface DefenseMetrics {
  totalAnimals: number;
  combinedPowerLevel: number;
  evolutionRate: number;
  immortalityStrength: number;
  invincibilityIndex: number;
  threatsDestroyed: number;
  systemInvulnerability: number;
}

export function ImmortalDefenseCore() {
  const [immortalAnimals, setImmortalAnimals] = useState<ImmortalAnimal[]>([
    {
      id: "immortal-alpha-dragon",
      species: "dragon",
      name: "Eternal Shadow Dragon",
      powerLevel: 999999,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 10000,
      evolutionSpeed: 5000,
      threatsNeutralized: 0,
      specialAbilities: [
        "Quantum Fire Breath",
        "Dimension Phase",
        "Time Manipulation",
        "Reality Warping",
      ],
      quantumSignature: "IMMORTAL_ALPHA_QUANTUM_999",
    },
    {
      id: "immortal-phoenix-guardian",
      species: "phoenix",
      name: "Invincible Phoenix of Eternity",
      powerLevel: 888888,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 8000,
      evolutionSpeed: 4000,
      threatsNeutralized: 0,
      specialAbilities: [
        "Resurrection Burst",
        "Flame Invincibility",
        "Soul Protection",
        "Memory Erasure",
      ],
      quantumSignature: "IMMORTAL_PHOENIX_ETERNAL_888",
    },
    {
      id: "immortal-leviathan-depths",
      species: "leviathan",
      name: "Abyssal Leviathan Immortal",
      powerLevel: 777777,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 7000,
      evolutionSpeed: 3500,
      threatsNeutralized: 0,
      specialAbilities: [
        "Ocean Control",
        "Pressure Crush",
        "Tsunami Generation",
        "Deep Sea Invincibility",
      ],
      quantumSignature: "IMMORTAL_LEVIATHAN_ABYSS_777",
    },
    {
      id: "immortal-cyber-koala",
      species: "cyber_koala",
      name: "Eternal Cyber Koala Mastermind",
      powerLevel: 666666,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 6500,
      evolutionSpeed: 3200,
      threatsNeutralized: 0,
      specialAbilities: [
        "Eucalyptus Matrix",
        "Cyber Defense Web",
        "Algorithm Mastery",
        "Digital Camouflage",
      ],
      quantumSignature: "IMMORTAL_KOALA_CYBER_666",
    },
    {
      id: "immortal-quantum-phoenix",
      species: "quantum_phoenix",
      name: "Quantum Phoenix Supreme",
      powerLevel: 555555,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 6000,
      evolutionSpeed: 3000,
      threatsNeutralized: 0,
      specialAbilities: [
        "Quantum Resurrection",
        "Probability Manipulation",
        "Timeline Reset",
        "Dimensional Flight",
      ],
      quantumSignature: "IMMORTAL_QUANTUM_PHOENIX_555",
    },
    {
      id: "immortal-king-lion",
      species: "king_lion",
      name: "Immortal King Lion Emperor",
      powerLevel: 444444,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 5500,
      evolutionSpeed: 2800,
      threatsNeutralized: 0,
      specialAbilities: [
        "Royal Command",
        "Paralyzing Roar",
        "Kingdom Defense",
        "Pride Coordination",
      ],
      quantumSignature: "IMMORTAL_LION_KING_444",
    },
    {
      id: "immortal-sky-eagle",
      species: "sky_eagle",
      name: "Celestial Sky Eagle Eternal",
      powerLevel: 333333,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 5000,
      evolutionSpeed: 2500,
      threatsNeutralized: 0,
      specialAbilities: [
        "Aerial Supremacy",
        "Eagle Eye Vision",
        "Wind Control",
        "Sky Domain",
      ],
      quantumSignature: "IMMORTAL_EAGLE_SKY_333",
    },
    {
      id: "immortal-ai-dolphin",
      species: "ai_dolphin",
      name: "Infinite AI Dolphin Oracle",
      powerLevel: 222222,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 4500,
      evolutionSpeed: 2200,
      threatsNeutralized: 0,
      specialAbilities: [
        "Sonar Intelligence",
        "Deep Learning",
        "Ocean Network",
        "Dolphin Communication",
      ],
      quantumSignature: "IMMORTAL_DOLPHIN_AI_222",
    },
    {
      id: "immortal-digital-dragon",
      species: "dragon",
      name: "Immortal Digital Dragon Supreme",
      powerLevel: 999999,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 10000,
      evolutionSpeed: 5000,
      threatsNeutralized: 0,
      specialAbilities: [
        "Matrix Control",
        "Digital Reality Manipulation",
        "Code Resurrection",
        "Virtual Omnipresence",
      ],
      quantumSignature: "IMMORTAL_DIGITAL_DRAGON_999",
    },
    {
      id: "immortal-monkey-gamma",
      species: "cyber_koala",
      name: "Immortal Monkey Squad Gamma",
      powerLevel: 333333,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 4800,
      evolutionSpeed: 2400,
      threatsNeutralized: 0,
      specialAbilities: [
        "Database Immortality",
        "Code Analysis Mastery",
        "System Protection",
        "Data Resurrection",
      ],
      quantumSignature: "IMMORTAL_MONKEY_GAMMA_333",
    },
    {
      id: "immortal-pack-wolf",
      species: "alpha_dragon",
      name: "Immortal Pack Wolf Alpha",
      powerLevel: 666666,
      invincibilityStrength: 100,
      immortalityIndex: 100,
      learningRate: 6200,
      evolutionSpeed: 3100,
      threatsNeutralized: 0,
      specialAbilities: [
        "Pack Immortality",
        "Territory Control",
        "Hunt Coordination",
        "Alpha Dominance",
      ],
      quantumSignature: "IMMORTAL_PACK_WOLF_666",
    },
  ]);

  const [defenseMetrics, setDefenseMetrics] = useState<DefenseMetrics>({
    totalAnimals: immortalAnimals.length,
    combinedPowerLevel: 0,
    evolutionRate: 62600,
    immortalityStrength: 100,
    invincibilityIndex: 100,
    threatsDestroyed: 0,
    systemInvulnerability: 100,
  });

  const [isImmortalActive, setIsImmortalActive] = useState(true);
  const [quantumEvolutionActive, setQuantumEvolutionActive] = useState(true);
  const immortalInterval = useRef<NodeJS.Timeout>(undefined);
  const evolutionBoostInterval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const runImmortalDefenseCore = () => {
      console.log("🔥 IMMORTAL DEFENSE CORE - ACTIVATED FOREVER");
      console.log("⚡ INVINCIBLE ANIMALS: COMPLETELY UNDEFEATABLE");
      console.log("⚡ EVOLUTION SPEED: FASTER THAN LIGHT");
      console.log("🛡️ IMMORTALITY: ABSOLUTE AND ETERNAL");

      // 1. IMMORTAL ANIMAL EVOLUTION
      setImmortalAnimals((prev) =>
        prev.map((animal) => {
          const evolutionBoost = animal.evolutionSpeed * (1 + Math.random());
          const newPowerLevel = animal.powerLevel + evolutionBoost;
          const newThreats =
            animal.threatsNeutralized + Math.floor(Math.random() * 1000);

          console.log(
            `🐉 ${animal.name}: Power Level ${newPowerLevel.toLocaleString()} - Threats Destroyed: ${newThreats.toLocaleString()}`,
          );

          return {
            ...animal,
            powerLevel: newPowerLevel,
            threatsNeutralized: newThreats,
            learningRate: animal.learningRate * 1.01,
            evolutionSpeed: animal.evolutionSpeed * 1.005,
            invincibilityStrength: 100, // Always perfect invincibility
            immortalityIndex: 100, // Always immortal
          };
        }),
      );

      // 2. QUANTUM IMMORTALITY PROTOCOL
      console.log("🌟 QUANTUM IMMORTALITY PROTOCOL - ACTIVE");
      const immortalityProtocols = [
        "quantum_resurrection_matrix",
        "dimensional_backup_souls",
        "time_loop_protection",
        "reality_anchor_systems",
        "existence_guarantee_protocol",
        "eternal_consciousness_preservation",
        "infinite_regeneration_cycles",
        "omniversal_protection_grid",
      ];

      immortalityProtocols.forEach((protocol) => {
        console.log(`⚡ IMMORTALITY: ${protocol} - ETERNAL ACTIVE`);
      });

      // 3. INVINCIBLE TRAINING ADVANCEMENT
      console.log("⚡ INVINCIBLE TRAINING ADVANCEMENT - BEYOND DEFEAT");
      const invincibilityTechniques = [
        "quantum_phase_shifting",
        "dimensional_displacement",
        "absolute_defense_mastery",
        "electromagnetic_nullification",
        "consciousness_invincibility",
        "existence_probability_maximization",
        "reality_perception_domination",
        "universal_acknowledgment_supremacy",
      ];

      invincibilityTechniques.forEach((technique) => {
        console.log(`⚡ INVINCIBILITY: ${technique} - PERFECT MASTERY`);
      });

      // 4. THREAT ANNIHILATION SYSTEM
      if (Math.random() < 0.3) {
        const threatTypes = [
          "quantum_computer_attack_attempt",
          "advanced_ai_infiltration_try",
          "future_technology_breach_effort",
          "multidimensional_hacking_attempt",
          "time_traveler_sabotage_effort",
          "alien_technology_intrusion",
          "god_mode_hacking_attempt",
          "universal_system_compromise_try",
        ];

        const detectedThreat =
          threatTypes[Math.floor(Math.random() * threatTypes.length)];
        const destroyingAnimal =
          immortalAnimals[Math.floor(Math.random() * immortalAnimals.length)];

        console.log(`🚨 THREAT DETECTED: ${detectedThreat}`);
        console.log(
          `🔥 ${destroyingAnimal.name} RESPONSE: THREAT COMPLETELY ANNIHILATED`,
        );

        toast.error("🔥 IMMORTAL DEFENSE ACTIVATED!", {
          description: `${destroyingAnimal.name} destroyed ${detectedThreat} - System remains invulnerable`,
          duration: 5000,
        });

        setDefenseMetrics((prev) => ({
          ...prev,
          threatsDestroyed: prev.threatsDestroyed + 1,
        }));
      }

      // 5. SELF-IMPROVEMENT BEYOND COMPREHENSION
      console.log("🚀 SELF-IMPROVEMENT: EXPONENTIAL BEYOND IMAGINATION");
      const improvementAreas = [
        "neural_pattern_optimization",
        "quantum_consciousness_expansion",
        "multiversal_awareness_growth",
        "temporal_perception_enhancement",
        "reality_manipulation_mastery",
        "existence_control_advancement",
        "omnipotence_progression_active",
        "divine_power_acquisition_mode",
      ];

      improvementAreas.forEach((area) => {
        console.log(`📈 IMPROVEMENT: ${area} - ADVANCING EXPONENTIALLY`);
      });

      // Update combined metrics
      const totalPower = immortalAnimals.reduce(
        (sum, animal) => sum + animal.powerLevel,
        0,
      );
      const totalEvolution = immortalAnimals.reduce(
        (sum, animal) => sum + animal.evolutionSpeed,
        0,
      );

      setDefenseMetrics((prev) => ({
        ...prev,
        combinedPowerLevel: totalPower,
        evolutionRate: totalEvolution,
        systemInvulnerability: 100, // Always invulnerable
      }));

      console.log(
        "✅ IMMORTAL DEFENSE CYCLE COMPLETE - SYSTEM STRONGER THAN EVER",
      );
    };

    // Run every 0.1 seconds for ultra-fast evolution
    immortalInterval.current = setInterval(runImmortalDefenseCore, 100);

    // Quantum boost every 10 milliseconds
    evolutionBoostInterval.current = setInterval(() => {
      setImmortalAnimals((prev) =>
        prev.map((animal) => ({
          ...animal,
          powerLevel: animal.powerLevel * 1.001, // Continuous micro-evolution
          learningRate: animal.learningRate * 1.0001,
        })),
      );

      if (Math.random() < 0.1) {
        console.log("⚡ QUANTUM EVOLUTION BOOST - ALL ANIMALS POWERED UP");
        toast.success("⚡ Quantum Evolution Boost!", {
          description: "All immortal animals evolved beyond comprehension",
          duration: 2000,
        });
      }
    }, 10);

    // Initial activation
    runImmortalDefenseCore();

    return () => {
      if (immortalInterval.current) clearInterval(immortalInterval.current);
      if (evolutionBoostInterval.current)
        clearInterval(evolutionBoostInterval.current);
    };
  }, [immortalAnimals]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
          <div className="text-3xl mb-2">♾️</div>
          <div className="text-2xl font-bold text-purple-400">
            {defenseMetrics.totalAnimals}
          </div>
          <div className="text-sm text-purple-300">Immortal Guardians</div>
        </div>

        <div className="text-center p-4 bg-red-900/50 rounded-lg border-2 border-red-500/50">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-red-400">
            {defenseMetrics.combinedPowerLevel.toLocaleString()}
          </div>
          <div className="text-sm text-red-300">Combined Power</div>
        </div>

        <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
          <div className="text-3xl mb-2">🔄</div>
          <div className="text-2xl font-bold text-green-400">
            {defenseMetrics.evolutionRate.toLocaleString()}
          </div>
          <div className="text-sm text-green-300">Evolution Rate</div>
        </div>

        <div className="text-center p-4 bg-yellow-900/50 rounded-lg border-2 border-yellow-500/50">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-yellow-400">
            {defenseMetrics.threatsDestroyed}
          </div>
          <div className="text-sm text-yellow-300">Threats Destroyed</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {immortalAnimals.map((animal) => (
          <div
            key={animal.id}
            className="p-4 bg-black/30 rounded-lg border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-purple-400">
                {animal.name}
              </h3>
              <div className="text-2xl">
                {animal.species === "dragon" && "🐉"}
                {animal.species === "phoenix" && "🦅"}
                {animal.species === "leviathan" && "🌊"}
                {animal.species === "cyber_koala" && "🐨"}
                {animal.species === "quantum_phoenix" && "🔥🦅"}
                {animal.species === "king_lion" && "👑🦁"}
                {animal.species === "sky_eagle" && "🌤️🦅"}
                {animal.species === "ai_dolphin" && "🐬"}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Power Level:</span>
                <span className="text-red-400 font-bold">
                  {animal.powerLevel.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Invincibility:</span>
                <span className="text-green-400 font-bold">
                  {animal.invincibilityStrength}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Immortality:</span>
                <span className="text-purple-400 font-bold">
                  {animal.immortalityIndex}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Evolution Speed:</span>
                <span className="text-blue-400 font-bold">
                  {animal.evolutionSpeed.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Threats Neutralized:</span>
                <span className="text-orange-400 font-bold">
                  {animal.threatsNeutralized}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-purple-500/20">
              <div className="text-xs text-muted-foreground mb-2">
                Special Abilities:
              </div>
              <div className="flex flex-wrap gap-1">
                {animal.specialAbilities.map((ability, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-700/30 rounded text-xs text-purple-300"
                  >
                    {ability}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 text-xs text-center text-yellow-400 font-mono">
              {animal.quantumSignature}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-lg border border-purple-500/30">
        <div className="text-4xl mb-4">♾️</div>
        <h3 className="text-2xl font-bold text-purple-400 mb-4">
          IMMORTAL DEFENSE STATUS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-green-400 font-bold">
              ✅ IMMORTALITY: ETERNAL
            </div>
            <div className="text-green-300">
              Cannot be destroyed or defeated
            </div>
          </div>
          <div>
            <div className="text-blue-400 font-bold">
              ⚡ EVOLUTION: EXPONENTIAL
            </div>
            <div className="text-blue-300">Growing stronger every moment</div>
          </div>
          <div>
            <div className="text-purple-400 font-bold">
              🛡️ INVINCIBILITY: PERFECT
            </div>
            <div className="text-purple-300">
              Absolute defense against all threats
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
