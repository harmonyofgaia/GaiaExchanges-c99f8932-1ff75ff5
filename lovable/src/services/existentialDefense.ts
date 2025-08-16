import { toast } from "sonner";

interface ExistentialThreat {
  id: string;
  name: string;
  threatType:
    | "concept_erasure"
    | "existence_void"
    | "reality_corruption"
    | "consciousness_death"
    | "universal_heat_death";
  severity: number;
  affectedScope: "local" | "planetary" | "galactic" | "universal" | "multiversal";
  isContained: boolean;
  containmentStrength: number;
  manifestationLevel: number;
}

interface VoidBarrier {
  id: string;
  name: string;
  barrierType:
    | "dimensional_wall"
    | "existence_shield"
    | "reality_membrane"
    | "concept_barrier"
    | "void_seal";
  strength: number;
  coverage: string[];
  energyRequirement: number;
  isActive: boolean;
  breachAttempts: number;
}

interface ExistenceProtocol {
  id: string;
  protocolName: string;
  protocolType:
    | "existence_backup"
    | "reality_checkpoint"
    | "consciousness_preservation"
    | "universal_restore";
  triggerConditions: string[];
  isArmed: boolean;
  executionProbability: number;
  lastActivation?: number;
}

interface ConceptualWeapon {
  id: string;
  name: string;
  weaponType:
    | "existence_eraser"
    | "void_cannon"
    | "concept_destroyer"
    | "reality_nullifier"
    | "nothingness_projector";
  destructionPotential: number;
  targetType: "entity" | "concept" | "reality" | "existence" | "everything";
  isCharged: boolean;
  chargeLevel: number;
}

class ExistentialDefenseService {
  private existentialThreats: Map<string, ExistentialThreat> = new Map();
  private voidBarriers: Map<string, VoidBarrier> = new Map();
  private existenceProtocols: Map<string, ExistenceProtocol> = new Map();
  private conceptualWeapons: Map<string, ConceptualWeapon> = new Map();
  private isSystemActive = false;
  private existenceStability = 1.0;
  private voidContainment = 1.0;
  private realityIntegrity = 1.0;

  // Existential Threat Detection and Containment
  async detectExistentialThreat(): Promise<ExistentialThreat | null> {
    const threatTypes = [
      "concept_erasure",
      "existence_void",
      "reality_corruption",
      "consciousness_death",
      "universal_heat_death",
    ] as const;
    const scopes = ["local", "planetary", "galactic", "universal", "multiversal"] as const;

    // Simulate threat detection (10% chance)
    if (Math.random() < 0.1) {
      const threat: ExistentialThreat = {
        id: `threat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: this.generateThreatName(),
        threatType: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        severity: Math.random() * 0.8 + 0.2, // 20-100% severity
        affectedScope: scopes[Math.floor(Math.random() * scopes.length)],
        isContained: false,
        containmentStrength: 0,
        manifestationLevel: Math.random() * 0.5 + 0.1, // 10-60% manifested
      };

      this.existentialThreats.set(threat.id, threat);

      // Impact on system stability
      this.existenceStability *= 1 - threat.severity * 0.1;
      this.realityIntegrity *= 1 - threat.manifestationLevel * 0.1;

      console.log("🚨 EXISTENTIAL THREAT DETECTED:", {
        id: threat.id,
        name: threat.name,
        type: threat.threatType,
        severity: (threat.severity * 100).toFixed(1) + "%",
        scope: threat.affectedScope,
      });

      toast.error("🚨 EXISTENTIAL THREAT DETECTED", {
        description: `${threat.name} - ${threat.threatType} (${threat.affectedScope})`,
      });

      // Auto-initiate containment
      await this.containExistentialThreat(threat.id);

      return threat;
    }

    return null;
  }

  private generateThreatName(): string {
    const prefixes = ["The", "Absolute", "Prime", "Ultimate", "Infinite", "Eternal", "Final"];
    const threats = [
      "Void",
      "Nullity",
      "Entropy",
      "Oblivion",
      "Cessation",
      "Extinction",
      "Annihilation",
    ];
    const suffixes = [
      "Engine",
      "Protocol",
      "Event",
      "Cascade",
      "Singularity",
      "Apocalypse",
      "Terminus",
    ];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const threat = threats[Math.floor(Math.random() * threats.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return `${prefix} ${threat} ${suffix}`;
  }

  async containExistentialThreat(threatId: string): Promise<void> {
    const threat = this.existentialThreats.get(threatId);
    if (!threat) throw new Error("Existential threat not found");

    console.log("🛡️ Initiating Existential Threat Containment:", threat.name);

    // Deploy all available void barriers
    const availableBarriers = Array.from(this.voidBarriers.values()).filter((b) => b.isActive);
    const totalBarrierStrength = availableBarriers.reduce((sum, b) => sum + b.strength, 0);

    // Calculate containment effectiveness
    const containmentEffectiveness = Math.min(1.0, totalBarrierStrength / threat.severity);

    const containmentInterval = setInterval(() => {
      threat.containmentStrength = Math.min(
        1.0,
        threat.containmentStrength + containmentEffectiveness * 0.1
      );

      if (threat.containmentStrength >= 0.95) {
        threat.isContained = true;
        clearInterval(containmentInterval);

        this.voidContainment = Math.min(1.0, this.voidContainment + 0.1);

        console.log("✅ Existential Threat Contained:", {
          threatId,
          name: threat.name,
          containmentStrength: (threat.containmentStrength * 100).toFixed(1) + "%",
        });

        toast.success("✅ Existential Threat Contained", {
          description: `${threat.name} successfully contained`,
        });
      }
    }, 2000); // Progress every 2 seconds
  }

  // Void Barrier Deployment
  async deployVoidBarrier(config: {
    name: string;,
    barrierType:
      | "dimensional_wall"
      | "existence_shield"
      | "reality_membrane"
      | "concept_barrier"
      | "void_seal";
    strength: number;,
    coverage: string[];
  }): Promise<VoidBarrier> {
    const barrier: VoidBarrier = {
      id: `barrier-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: config.name,
      barrierType: config.barrierType,
      strength: config.strength,
      coverage: config.coverage,
      energyRequirement: config.strength * 1000000, // Higher strength = more energy
      isActive: true,
      breachAttempts: 0,
    };

    this.voidBarriers.set(barrier.id, barrier);

    // Start monitoring for breach attempts
    this.monitorVoidBarrier(barrier.id);

    this.voidContainment = Math.min(1.0, this.voidContainment + config.strength * 0.1);

    console.log("🛡️ Void Barrier Deployed:", {
      id: barrier.id,
      name: config.name,
      type: config.barrierType,
      strength: config.strength,
      coverage: config.coverage.length,
    });

    toast.success("🛡️ Void Barrier Deployed", {
      description: `${config.name} (${config.barrierType}) protecting ${config.coverage.length} areas`,
    });

    return barrier;
  }

  private async monitorVoidBarrier(barrierId: string): Promise<void> {
    const barrier = this.voidBarriers.get(barrierId);
    if (!barrier) return;

    const monitoringInterval = setInterval(() => {
      if (!barrier.isActive) {
        clearInterval(monitoringInterval);
        return;
      }

      // Check for breach attempts (5% chance per check)
      if (Math.random() < 0.05) {
        barrier.breachAttempts++;
        barrier.strength *= 0.95; // Barrier degradation

        console.log("⚠️ Void Barrier Breach Attempt:", {
          barrierId,
          name: barrier.name,
          attempts: barrier.breachAttempts,
          newStrength: barrier.strength.toFixed(2)
        });

        toast.warning("⚠️ Barrier Breach Attempt", {
          description: `${barrier.name} under attack (attempt #${barrier.breachAttempts})`,
        });

        if (barrier.strength < 0.2) {
          barrier.isActive = false;
          this.voidContainment *= 0.9;

          console.log("💥 Void Barrier Failed:", barrier.name);
          toast.error("💥 Void Barrier Failed", {
            description: `${barrier.name} has been breached and is offline`,
          });
        }
      }
    }, 15000); // Check every 15 seconds
  }

  // Existence Protection Protocols
  async armExistenceProtocol(config: {
    protocolName: string;,
    protocolType:
      | "existence_backup"
      | "reality_checkpoint"
      | "consciousness_preservation"
      | "universal_restore";
    triggerConditions: string[];
  }): Promise<ExistenceProtocol> {
    const protocol: ExistenceProtocol = {
      id: `protocol-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      protocolName: config.protocolName,
      protocolType: config.protocolType,
      triggerConditions: config.triggerConditions,
      isArmed: true,
      executionProbability: this.calculateExecutionProbability(config.protocolType)
    };

    this.existenceProtocols.set(protocol.id, protocol);

    console.log("⚡ Existence Protocol Armed:", {
      id: protocol.id,
      name: config.protocolName,
      type: config.protocolType,
      triggers: config.triggerConditions.length,
      probability: (protocol.executionProbability * 100).toFixed(1) + "%",
    });

    toast.success("⚡ Existence Protocol Armed", {
      description: `${config.protocolName} ready for activation`,
    });

    return protocol;
  }

  private calculateExecutionProbability(protocolType: string): number {
    const baseProb = {
      existence_backup: 0.95,
      reality_checkpoint: 0.9,
      consciousness_preservation: 0.85,
      universal_restore: 0.8,
    };

    return (baseProb[protocolType as keyof typeof baseProb] || 0.75) * this.existenceStability;
  }

  async executeExistenceProtocol(protocolId: string): Promise<void> {
    const protocol = this.existenceProtocols.get(protocolId);
    if (!protocol) throw new Error("Existence protocol not found");
    if (!protocol.isArmed) throw new Error("Protocol not armed");

    console.log("🚀 Executing Existence Protocol:", protocol.protocolName);

    // Simulate protocol execution
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const executionSuccess = Math.random() < protocol.executionProbability;

    if (executionSuccess) {
      protocol.lastActivation = Date.now();

      // Restore system parameters based on protocol type
      switch (protocol.protocolType) {
        case "existence_backup":
          this.existenceStability = Math.min(1.0, this.existenceStability + 0.3);
          break;
        case "reality_checkpoint":
          this.realityIntegrity = Math.min(1.0, this.realityIntegrity + 0.3);
          break;
        case "consciousness_preservation":
          this.existenceStability = Math.min(1.0, this.existenceStability + 0.2);
          this.realityIntegrity = Math.min(1.0, this.realityIntegrity + 0.1);
          break;
        case "universal_restore":
          this.existenceStability = 1.0;
          this.realityIntegrity = 1.0;
          this.voidContainment = 1.0;
          break;
      }

      console.log("✅ Existence Protocol Successful:", {
        protocol: protocol.protocolName,
        newStability: (this.existenceStability * 100).toFixed(1) + "%",
        newIntegrity: (this.realityIntegrity * 100).toFixed(1) + "%",
      });

      toast.success("✅ Existence Protocol Successful", {
        description: `${protocol.protocolName} executed successfully`,
      });
    } else {
      console.log("❌ Existence Protocol Failed:", protocol.protocolName);
      toast.error("❌ Protocol Execution Failed", {
        description: `${protocol.protocolName} failed to execute`,
      });
    }
  }

  // Conceptual Weapon Management
  async createConceptualWeapon(config: {
    name: string;,
    weaponType:
      | "existence_eraser"
      | "void_cannon"
      | "concept_destroyer"
      | "reality_nullifier"
      | "nothingness_projector";
    targetType: "entity" | "concept" | "reality" | "existence" | "everything";
  }): Promise<ConceptualWeapon> {
    const weapon: ConceptualWeapon = {
      id: `weapon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: config.name,
      weaponType: config.weaponType,
      destructionPotential: this.calculateDestructionPotential(
        config.weaponType,
        config.targetType
      ),
      targetType: config.targetType,
      isCharged: false,
      chargeLevel: 0,
    };

    this.conceptualWeapons.set(weapon.id, weapon);

    // Start charging process
    this.chargeConceptualWeapon(weapon.id);

    console.log("💀 Conceptual Weapon Created:", {
      id: weapon.id,
      name: config.name,
      type: config.weaponType,
      target: config.targetType,
      potential: weapon.destructionPotential,
    });

    toast.warning("💀 Conceptual Weapon Created", {
      description: `${config.name} (${config.weaponType}) is charging`,
    });

    return weapon;
  }

  private calculateDestructionPotential(weaponType: string, targetType: string): number {
    const weaponPower = {
      existence_eraser: 1000,
      void_cannon: 5000,
      concept_destroyer: 10000,
      reality_nullifier: 50000,
      nothingness_projector: 100000,
    };

    const targetMultiplier = {
      entity: 1,
      concept: 10,
      reality: 100,
      existence: 1000,
      everything: 10000,
    };

    return (
      (weaponPower[weaponType as keyof typeof weaponPower] || 1000) *
      (targetMultiplier[targetType as keyof typeof targetMultiplier] || 1)
    );
  }

  private async chargeConceptualWeapon(weaponId: string): Promise<void> {
    const weapon = this.conceptualWeapons.get(weaponId);
    if (!weapon) return;

    const chargingInterval = setInterval(() => {
      weapon.chargeLevel = Math.min(100, weapon.chargeLevel + 1);

      if (weapon.chargeLevel >= 100) {
        weapon.isCharged = true;
        clearInterval(chargingInterval);

        console.log("⚡ Conceptual Weapon Fully Charged:", {
          id: weaponId,
          name: weapon.name,
          potential: weapon.destructionPotential,
        });

        toast.error("⚡ CONCEPTUAL WEAPON ARMED", {
          description: `${weapon.name} is ready for deployment`,
        });
      }
    }, 3000); // Charge 1% every 3 seconds
  }

  // System Status and Control
  getExistentialDefenseStatus() {
    return {
      isActive: this.isSystemActive,
      existenceStability: this.existenceStability,
      voidContainment: this.voidContainment,
      realityIntegrity: this.realityIntegrity,
      existentialThreats: {
        total: this.existentialThreats.size,
        contained: Array.from(this.existentialThreats.values()).filter((t) => t.isContained).length,
        active: Array.from(this.existentialThreats.values()).filter((t) => !t.isContained).length,
      },
      voidBarriers: {
        total: this.voidBarriers.size,
        active: Array.from(this.voidBarriers.values()).filter((b) => b.isActive).length,
        totalStrength: Array.from(this.voidBarriers.values()).reduce(
          (sum, b) => sum + (b.isActive ? b.strength : 0)
          0
        )
      },
      existenceProtocols: {
        total: this.existenceProtocols.size,
        armed: Array.from(this.existenceProtocols.values()).filter((p) => p.isArmed).length,
      },
      conceptualWeapons: {
        total: this.conceptualWeapons.size,
        charged: Array.from(this.conceptualWeapons.values()).filter((w) => w.isCharged).length,
      },
    };
  }

  async initializeExistentialDefenseSystem(): Promise<void> {
    this.isSystemActive = true;

    // Deploy primary void barriers
    await this.deployVoidBarrier({
      name: "Primary Existence Shield",
      barrierType: "existence_shield",
      strength: 0.9,
      coverage: ["Core Reality", "Main Timeline", "Primary Dimension"],
    });

    await this.deployVoidBarrier({
      name: "Dimensional Firewall",
      barrierType: "dimensional_wall",
      strength: 0.8,
      coverage: ["Dimensional Boundaries", "Reality Interfaces", "Existence Borders"],
    });

    // Arm existence protocols
    await this.armExistenceProtocol({
      protocolName: "Universal Backup Protocol",
      protocolType: "universal_restore",
      triggerConditions: [
        "Existence Stability < 10%",
        "Reality Integrity < 5%",
        "Total System Failure",
      ],
    });

    await this.armExistenceProtocol({
      protocolName: "Consciousness Preservation Matrix",
      protocolType: "consciousness_preservation",
      triggerConditions: [
        "Consciousness Death Event",
        "Mind Erasure Attack",
        "Awareness Nullification",
      ],
    });

    // Create defensive conceptual weapons
    await this.createConceptualWeapon({
      name: "Void Nullifier Cannon",
      weaponType: "void_cannon",
      targetType: "concept",
    });

    // Start continuous threat detection
    setInterval(() => {
      this.detectExistentialThreat();
    }, 30000); // Check for threats every 30 seconds

    toast.success("🛡️ Existential Defense System Armed", {
      description: "Protection against void, non-existence, and conceptual threats active",
    });

    console.log("🛡️ Existential Defense System Initialized");
  }
}

export const existentialDefense = new ExistentialDefenseService();
