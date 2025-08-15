// Sentient AI NPCs: Core Prototype
// This module scaffolds a persistent, learning, and evolving AI NPC system for the GAIA Engine.

export interface SentientNPCMemory {
  experiences: string[];
  relationships: Record<string, string>;
  goals: string[];
  emotionalState: string;
}

export class SentientNPC {
  id: string;
  name: string;
  memory: SentientNPCMemory;
  personality: string;
  constructor(id: string, name: string, personality: string) {
    this.id = id;
    this.name = name;
    this.personality = personality;
    this.memory = {
      experiences: [],
      relationships: {},
      goals: [],
      emotionalState: "neutral",
    };
  }

  experience(event: string) {
    this.memory.experiences.push(event);
    // Evolve emotional state and goals based on event
    if (event.includes("friend")) this.memory.emotionalState = "happy";
    if (event.includes("danger")) this.memory.emotionalState = "alert";
  }

  setGoal(goal: string) {
    this.memory.goals.push(goal);
  }

  relateTo(npcId: string, relation: string) {
    this.memory.relationships[npcId] = relation;
  }

  tick() {
    // Simulate learning and evolving
    if (this.memory.goals.length > 0) {
      this.memory.emotionalState = "motivated";
    }
    // More advanced logic can be added here
  }
}

// Example usage
const npc = new SentientNPC("npc1", "Gaia", "curious");
npc.experience("met a friend");
npc.setGoal("explore the world");
npc.tick();
console.log("SentientNPC State:", npc);
