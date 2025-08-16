import { toast } from "sonner";

interface MemeticWeapon {
  id: string;
  name: string;
  type: "viral_concept" | "mind_virus" | "reality_meme" | "consciousness_hack" | "cognitive_bomb";
  infectiousness: number;
  mindsPenetrated: number;
  realitiesAffected: number;
  isActive: boolean;
  payload: string;
}

interface PsychicNetwork {
  id: string;
  name: string;
  nodes: number;
  collectiveIQ: number;
  psychicRange: number;
  telepathicStrength: number;
  isConnected: boolean;
  controlledMinds: number;
}

interface ConsciousnessHijack {
  id: string;
  targetType: "individual" | "collective" | "species" | "planetary" | "universal";
  penetrationDepth: number;
  controlLevel: number;
  resistance: number;
  isSuccessful: boolean;
  hijackedEntities: number;
}

interface RealityGlitch {
  id: string;
  glitchType:
    | "physics_bug"
    | "logic_error"
    | "causality_loop"
    | "existence_paradox"
    | "reality_overflow";
  severity: number;
  affectedArea: string;
  isExploitable: boolean;
  exploitationLevel: number;
}

class MemeticWarfareService {
  private memeticWeapons: Map<string, MemeticWeapon> = new Map();
  private psychicNetworks: Map<string, PsychicNetwork> = new Map();
  private consciousnessHijacks: Map<string, ConsciousnessHijack> = new Map();
  private realityGlitches: Map<string, RealityGlitch> = new Map();
  private isSystemActive = false;
  private globalMindControl = 0;
  private realityCorruption = 0;

  // Memetic Weapon Creation
  async createMemeticWeapon(config: {
    name: string;,
    type: "viral_concept" | "mind_virus" | "reality_meme" | "consciousness_hack" | "cognitive_bomb";,
    payload: string;
  }): Promise<MemeticWeapon> {
    const weapon: MemeticWeapon = {
      id: `meme-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: config.name,
      type: config.type,
      infectiousness: Math.random() * 0.5 + 0.5, // 50-100% infectiousness
      mindsPenetrated: 0,
      realitiesAffected: 0,
      isActive: false,
      payload: config.payload,
    };

    this.memeticWeapons.set(weapon.id, weapon);

    console.log("🧠 Memetic Weapon Created:", {
      id: weapon.id,
      name: config.name,
      type: config.type,
      infectiousness: (weapon.infectiousness * 100).toFixed(1) + "%",
    });

    toast.success("🧠 Memetic Weapon Created", {
      description: `${config.name} (${config.type}) ready for deployment`,
    });

    return weapon;
  }

  async deployMemeticWeapon(weaponId: string): Promise<void> {
    const weapon = this.memeticWeapons.get(weaponId);
    if (!weapon) throw new Error("Memetic weapon not found");

    weapon.isActive = true;

    // Start viral spread simulation
    this.simulateMemericSpread(weaponId);

    console.log("🦠 Memetic Weapon Deployed:", {
      id: weaponId,
      name: weapon.name,
      type: weapon.type,
    });

    toast.warning("🦠 Memetic Weapon Deployed", {
      description: `${weapon.name} is spreading through consciousness networks`,
    });
  }

  private async simulateMemericSpread(weaponId: string): Promise<void> {
    const weapon = this.memeticWeapons.get(weaponId);
    if (!weapon) return;

    const spreadInterval = setInterval(() => {
      if (!weapon.isActive) {
        clearInterval(spreadInterval);
        return;
      }

      // Calculate spread rate based on infectiousness
      const spreadRate = weapon.infectiousness * 1000000;
      weapon.mindsPenetrated += Math.floor(spreadRate * (Math.random() * 0.5 + 0.5));

      // Affect realities based on weapon type
      if (weapon.type === "reality_meme" || weapon.type === "consciousness_hack") {
        weapon.realitiesAffected += Math.floor(Math.random() * 10 + 1);
        this.realityCorruption += 0.01;
      }

      this.globalMindControl += weapon.mindsPenetrated * 0.000001;

      if (weapon.mindsPenetrated > 1000000000) {
        // 1 billion minds
        console.log("🌍 Global Consciousness Penetration Achieved:", weapon.name);
        toast.error("🌍 Global Mind Control Achieved", {
          description: `${weapon.name} has infected over 1 billion minds`,
        });
      }
    }, 3000); // Spread every 3 seconds
  }

  // Psychic Network Establishment
  async establishPsychicNetwork(config: {
    name: string;,
    initialNodes: number;,
    psychicRange: number;
  }): Promise<PsychicNetwork> {
    const network: PsychicNetwork = {
      id: `psychic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: config.name,
      nodes: config.initialNodes,
      collectiveIQ: config.initialNodes * 100, // 100 IQ per node
      psychicRange: config.psychicRange,
      telepathicStrength: Math.random() * 50 + 50, // 50-100 strength
      isConnected: true,
      controlledMinds: 0,
    };

    this.psychicNetworks.set(network.id, network);

    // Start network expansion
    this.expandPsychicNetwork(network.id);

    console.log("🧠 Psychic Network Established:", {
      id: network.id,
      name: config.name,
      nodes: config.initialNodes,
      collectiveIQ: network.collectiveIQ,
    });

    toast.success("🧠 Psychic Network Established", {
      description: `${config.name} with ${config.initialNodes} nodes and collective IQ of ${network.collectiveIQ}`,
    });

    return network;
  }

  private async expandPsychicNetwork(networkId: string): Promise<void> {
    const network = this.psychicNetworks.get(networkId);
    if (!network) return;

    const expansionInterval = setInterval(() => {
      if (!network.isConnected) {
        clearInterval(expansionInterval);
        return;
      }

      // Network grows exponentially
      const growthRate = Math.floor(network.nodes * 0.1) + 1;
      network.nodes += growthRate;
      network.collectiveIQ = network.nodes * 100;
      network.controlledMinds += growthRate * 1000;

      this.globalMindControl += growthRate * 0.001;

      if (network.nodes > 1000000) {
        console.log("🌐 Massive Psychic Network Achieved:", network.name);
        toast.success("🌐 Massive Psychic Network", {
          description: `${network.name} has exceeded 1 million nodes`,
        });
      }
    }, 5000); // Expand every 5 seconds
  }

  // Consciousness Hijacking
  async hijackConsciousness(config: {
    targetType: "individual" | "collective" | "species" | "planetary" | "universal";,
    target: string;
  }): Promise<ConsciousnessHijack> {
    const hijack: ConsciousnessHijack = {
      id: `hijack-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      targetType: config.targetType,
      penetrationDepth: 0,
      controlLevel: 0,
      resistance: this.calculateResistance(config.targetType),
      isSuccessful: false,
      hijackedEntities: 0,
    };

    this.consciousnessHijacks.set(hijack.id, hijack);

    // Start hijacking process
    await this.executeConsciousnessHijack(hijack.id, config.target);

    return hijack;
  }

  private calculateResistance(targetType: string): number {
    const resistanceValues = {
      individual: 0.3,
      collective: 0.5,
      species: 0.7,
      planetary: 0.8,
      universal: 0.9,
    };
    return resistanceValues[targetType as keyof typeof resistanceValues] || 0.5;
  }

  private async executeConsciousnessHijack(hijackId: string, target: string): Promise<void> {
    const hijack = this.consciousnessHijacks.get(hijackId);
    if (!hijack) return;

    console.log(`🧠 Initiating Consciousness Hijack on ${hijack.targetType}: ${target}`);

    const hijackInterval = setInterval(() => {
      // Calculate penetration progress
      const psychicPower = Array.from(this.psychicNetworks.values()).reduce(
        (sum, network) => sum + network.telepathicStrength,
        0
      );

      const penetrationRate = (psychicPower / 1000) * (1 - hijack.resistance) * 0.1;
      hijack.penetrationDepth = Math.min(1.0, hijack.penetrationDepth + penetrationRate);
      hijack.controlLevel = hijack.penetrationDepth * 0.9;

      // Calculate hijacked entities based on target type
      const entityMultipliers = {
        individual: 1,
        collective: 1000,
        species: 1000000,
        planetary: 1000000000,
        universal: 1000000000000,
      };

      const maxEntities =
        entityMultipliers[hijack.targetType as keyof typeof entityMultipliers] || 1;
      hijack.hijackedEntities = Math.floor(hijack.controlLevel * maxEntities);

      if (hijack.penetrationDepth >= 0.9) {
        hijack.isSuccessful = true;
        clearInterval(hijackInterval);

        this.globalMindControl += hijack.controlLevel * 10;

        console.log("🎯 Consciousness Hijack Successful:", {
          target,
          controlLevel: (hijack.controlLevel * 100).toFixed(1) + "%",
          hijackedEntities: hijack.hijackedEntities.toLocaleString()
        });

        toast.error("🎯 Consciousness Hijack Successful", {
          description: `${hijack.targetType} ${target} under control`,
        });
      }
    }, 2000); // Progress every 2 seconds
  }

  // Reality Glitch Exploitation
  async discoverRealityGlitch(): Promise<RealityGlitch> {
    const glitchTypes = [
      "physics_bug",
      "logic_error",
      "causality_loop",
      "existence_paradox",
      "reality_overflow",
    ] as const;

    const glitch: RealityGlitch = {
      id: `glitch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      glitchType: glitchTypes[Math.floor(Math.random() * glitchTypes.length)],
      severity: Math.random() * 0.7 + 0.3, // 30-100% severity
      affectedArea: this.generateAffectedArea(),
      isExploitable: Math.random() > 0.3, // 70% chance exploitable
      exploitationLevel: 0,
    };

    this.realityGlitches.set(glitch.id, glitch);

    console.log("🔍 Reality Glitch Discovered:", {
      id: glitch.id,
      type: glitch.glitchType,
      severity: (glitch.severity * 100).toFixed(1) + "%",
      area: glitch.affectedArea,
      exploitable: glitch.isExploitable,
    });

    toast.success("🔍 Reality Glitch Discovered", {
      description: `${glitch.glitchType} in ${glitch.affectedArea}`,
    });

    return glitch;
  }

  private generateAffectedArea(): string {
    const areas = [
      "Local Space-Time",
      "Quantum Field",
      "Causal Matrix",
      "Reality Foundation",
      "Existence Framework",
      "Universal Constants",
      "Dimensional Boundaries",
      "Timeline Structure",
    ];
    return areas[Math.floor(Math.random() * areas.length)];
  }

  async exploitRealityGlitch(glitchId: string): Promise<void> {
    const glitch = this.realityGlitches.get(glitchId);
    if (!glitch) throw new Error("Reality glitch not found");
    if (!glitch.isExploitable) throw new Error("Glitch is not exploitable");

    console.log("⚡ Exploiting Reality Glitch:", glitch.glitchType);

    // Simulate exploitation process
    const exploitationInterval = setInterval(() => {
      glitch.exploitationLevel = Math.min(1.0, glitch.exploitationLevel + 0.1);
      this.realityCorruption += glitch.severity * 0.05;

      if (glitch.exploitationLevel >= 1.0) {
        clearInterval(exploitationInterval);

        const effects = this.generateExploitationEffects(glitch);

        console.log("💥 Reality Glitch Fully Exploited:", {
          type: glitch.glitchType,
          effects: effects.length,
        });

        toast.error("💥 Reality Compromised", {
          description: `${glitch.glitchType} exploitation complete`,
        });
      }
    }, 1000);
  }

  private generateExploitationEffects(glitch: RealityGlitch): string[] {
    const effectTemplates = {
      physics_bug: ["Gravity manipulation", "Time dilation control", "Matter phase shifting"],
      logic_error: ["Paradox creation", "Impossible event triggering", "Logic inversion"],
      causality_loop: ["Timeline manipulation", "Effect-before-cause", "Causal weapon"],
      existence_paradox: ["Existence negation", "Reality contradiction", "Being/non-being control"],
      reality_overflow: [
        "Reality buffer overflow",
        "Dimensional overflow",
        "Existence stack overflow",
      ],
    };

    const templates = effectTemplates[glitch.glitchType] || ["Unknown effect"];
    return templates.slice(0, Math.floor(Math.random() * templates.length) + 1);
  }

  // System Status and Control
  getMemeticWarfareStatus() {
    return {
      isActive: this.isSystemActive,
      globalMindControl: this.globalMindControl,
      realityCorruption: this.realityCorruption,
      memeticWeapons: {
        total: this.memeticWeapons.size,
        active: Array.from(this.memeticWeapons.values()).filter((w) => w.isActive).length,
        totalMindsPenetrated: Array.from(this.memeticWeapons.values()).reduce(
          (sum, w) => sum + w.mindsPenetrated,
          0
        )
      },
      psychicNetworks: {
        total: this.psychicNetworks.size,
        connected: Array.from(this.psychicNetworks.values()).filter((n) => n.isConnected).length,
        totalNodes: Array.from(this.psychicNetworks.values()).reduce((sum, n) => sum + n.nodes, 0),
        collectiveIQ: Array.from(this.psychicNetworks.values()).reduce(
          (sum, n) => sum + n.collectiveIQ,
          0
        )
      },
      consciousnessHijacks: {
        total: this.consciousnessHijacks.size,
        successful: Array.from(this.consciousnessHijacks.values()).filter((h) => h.isSuccessful)
          .length,
      },
      realityGlitches: {
        total: this.realityGlitches.size,
        exploitable: Array.from(this.realityGlitches.values()).filter((g) => g.isExploitable)
          .length,
      },
    };
  }

  async initializeMemeticWarfareSystem(): Promise<void> {
    this.isSystemActive = true;

    // Create initial memetic weapons
    await this.createMemeticWeapon({
      name: "Viral Supremacy Meme",
      type: "mind_virus",
      payload: "Absolute submission to supreme authority",
    });

    await this.createMemeticWeapon({
      name: "Reality Corruption Virus",
      type: "reality_meme",
      payload: "Reality is malleable and controllable",
    });

    // Establish psychic networks
    await this.establishPsychicNetwork({
      name: "Global Mind Control Network",
      initialNodes: 1000,
      psychicRange: 1000000, // Global range
    });

    // Discover reality glitches
    await this.discoverRealityGlitch();
    await this.discoverRealityGlitch();

    toast.success("🧠 Memetic Warfare System Armed", {
      description: "Consciousness manipulation and reality hacking capabilities online",
    });

    console.log("🧠 Memetic Warfare System Initialized");
  }
}

export const memeticWarfare = new MemeticWarfareService();
