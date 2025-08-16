// --- Rapid Prototyping: GameLoop Integration ---
import { GameLoop, Entity, Component } from "./gameLoop";

// --- Type Definitions ---
interface StatEntry {
  key: string;
  value: unknown;
}

interface StatsObject {
  [key: string]: unknown;
  inventory?: unknown[];
  activeQuests?: unknown[];
  completedQuests?: unknown[];
}

interface InventoryComponentData extends Component {
  items: unknown[];
}

interface QuestComponentData extends Component {
  activeQuests: unknown[];
  completedQuests: unknown[];
}

// --- Gameplay Expansion: Inventory & Quest ---
// --- Next Steps: Abilities, Equipment, Environment ---
class AbilitiesComponent implements Component {
  type = "abilities";
  abilities: string[];
  constructor(abilities: string[] = []) {
    this.abilities = abilities;
  }
  update(dt: number) {}
}

class EquipmentComponent implements Component {
  type = "equipment";
  equipment: string[];
  constructor(equipment: string[] = []) {
    this.equipment = equipment;
  }
  update(dt: number) {}
}

class EnvironmentComponent implements Component {
  type = "environment";
  environmentState: string;
  constructor(state: string = "normal") {
    this.environmentState = state;
  }
  update(dt: number) {}
}
class InventoryComponent implements Component {
  type = "inventory";
  items: string[];
  constructor(items: string[] = []) {
    this.items = items;
  }
  update(dt: number) {}
}

class QuestComponent implements Component {
  type = "quest";
  activeQuests: string[];
  completedQuests: string[];
  constructor(active: string[] = [], completed: string[] = []) {
    this.activeQuests = active;
    this.completedQuests = completed;
  }
  update(dt: number) {}
}

const liveStats = new LiveStats();
const gameLoop = new GameLoop();

class MovementComponent implements Component {
  type = "movement";
  x = 0;
  y = 0;
  vx = 1;
  vy = 1;
  update(dt: number) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    liveStats.report(
      "player1:position",
      `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`,
    );
    console.log(`Entity moved to (${this.x.toFixed(2)}, ${this.y.toFixed(2)})`);
  }
}

class HealthComponent implements Component {
  type = "health";
  hp = 100;
  update(dt: number) {
    this.hp -= dt * 2; // Simulate damage over time
    if (this.hp < 0) this.hp = 0;
    liveStats.report("player1:health", this.hp);
    console.log(`Entity health: ${this.hp.toFixed(0)}`);
  }
}

class ScoreComponent implements Component {
  type = "score";
  score = 0;
  update(dt: number) {
    this.score += Math.floor(dt * 10); // Simulate scoring
    liveStats.report("player1:score", this.score);
    console.log(`Entity score: ${this.score}`);
  }
}

const player = new Entity("player1");
player.addComponent(new AbilitiesComponent(["Dash", "Heal"]));
player.addComponent(new EquipmentComponent(["Shield", "Helmet"]));
player.addComponent(new MovementComponent());
player.addComponent(new HealthComponent());
player.addComponent(new ScoreComponent());
gameLoop.addEntity(player);

gameLoop.start();
console.log("Game loop started with test entity and components.");
// GAIA Engine Main Entrypoint
// Wires together all core modules and starts the engine

import { GaiaEngine } from "./coreEngine";
import { ModularSystem } from "./modularSystem";
import { StorageSystem } from "./storageSystem";
import { PluginSystem } from "./pluginSystem";
import { AIIntegration } from "./aiIntegration";
import { UIFramework, UIComponent } from "./uiFramework";
import { LiveStats } from "./liveStats";
import { LiveStatsPanel } from "./components/LiveStatsPanel";

// Example config
const config = {
  name: "GAIA Engine V1",
  version: "1.0.0",
  storagePath: "./data",
  plugins: [],
  // Show inventory and quest stats for demo (removed invalid usage)
};

const engine = new GaiaEngine(config);
const uiFramework = new UIFramework();

// Example AI NPC entity
class AINPCComponent implements Component {
  type = "ai-npc";
  intelligence: number;
  personality: string;
  constructor(intelligence: number = 100, personality: string = "adaptive") {
    this.intelligence = intelligence;
    this.personality = personality;
  }
  update(dt: number) {}
}
const aiNPC = new Entity("npc1");
aiNPC.addComponent(new AbilitiesComponent(["Steal", "Hide"]));
aiNPC.addComponent(new EquipmentComponent(["Cloak"]));
// --- Quest & Inventory Logic Expansion ---
// Example: Add/complete quest, add/remove inventory item
function addQuest(entity: Entity, quest: string) {
  const comp = entity.getComponent("quest");
  if (comp && "activeQuests" in comp) {
    (comp as QuestComponent).activeQuests.push(quest);
  }
}
function completeQuest(entity: Entity, quest: string) {
  const comp = entity.getComponent("quest");
  if (comp && "activeQuests" in comp && "completedQuests" in comp) {
    const idx = (comp as QuestComponent).activeQuests.indexOf(quest);
    if (idx !== -1) {
      (comp as QuestComponent).activeQuests.splice(idx, 1);
      (comp as QuestComponent).completedQuests.push(quest);
    }
  }
}
function addInventoryItem(entity: Entity, item: string) {
  const comp = entity.getComponent("inventory");
  if (comp && "items" in comp) {
    (comp as InventoryComponent).items.push(item);
  }
}
function removeInventoryItem(entity: Entity, item: string) {
  const comp = entity.getComponent("inventory");
  if (comp && "items" in comp) {
    const idx = (comp as InventoryComponent).items.indexOf(item);
    if (idx !== -1) (comp as InventoryComponent).items.splice(idx, 1);
  }
}
// --- AI NPC Behavior Expansion ---
function updateAINPCBehavior(entity: Entity) {
  const comp = entity.getComponent("ai-npc");
  if (comp && "personality" in comp) {
    // Example: Adaptive behavior
    if ((comp as AINPCComponent).personality === "curious") {
      addInventoryItem(entity, "Mystery Box");
    }
  }
}
updateAINPCBehavior(aiNPC);
// --- Plugin System Expansion ---
function triggerPluginEvent(event: string, data: unknown) {
  // Example: Plugin event hook
  console.log(`[PluginEvent] ${event}`, data);
}
triggerPluginEvent("entityCreated", { entity: player });
aiNPC.addComponent(new MovementComponent());
aiNPC.addComponent(new HealthComponent());
aiNPC.addComponent(new AINPCComponent(120, "curious"));
gameLoop.addEntity(aiNPC);

// Example plugin event hook
// engine.on("pluginEvent", (event) => {
//   console.log("Plugin event triggered:", event);
// });
// Register core modules
engine.registerModule("modularSystem", new ModularSystem());
engine.registerModule(
  "storageSystem",
  new StorageSystem({ type: "local", path: "./data" }),
);
engine.registerModule("pluginSystem", new PluginSystem());
engine.registerModule("aiIntegration", new AIIntegration());
engine.registerModule("uiFramework", uiFramework);
engine.registerModule("liveStats", liveStats);

// Register LiveStatsPanel as a UI component
const liveStatsPanelComponent: UIComponent = {
  id: "liveStatsPanel",
  render: () => {
    // In a real app, this would mount the React component to the DOM
    // For demo, just log the stats
    // Aggregate stats into an object
    const statsObj: StatsObject = {};
    const recentStats = liveStats.getRecentStats(10);
    if (Array.isArray(recentStats)) {
      recentStats.forEach((stat: StatEntry) => {
        if (stat && stat.key) {
          statsObj[stat.key] = stat.value;
        }
      });
    }
    // Add inventory and quest stats
    const inventoryComp = player.getComponent("inventory");
    if (inventoryComp && "items" in inventoryComp) {
      statsObj.inventory = (inventoryComp as InventoryComponent).items;
    } else {
      statsObj.inventory = [];
    }
    const questComp = player.getComponent("quest");
    if (
      questComp &&
      "activeQuests" in questComp &&
      "completedQuests" in questComp
    ) {
      statsObj.activeQuests = (questComp as QuestComponent).activeQuests;
      statsObj.completedQuests = (questComp as QuestComponent).completedQuests;
    } else {
      statsObj.activeQuests = [];
      statsObj.completedQuests = [];
    }
    console.log("[LiveStatsPanel]", statsObj);
    // If using React, you would return <LiveStatsPanel liveStats={liveStats} />;
  },
};
uiFramework.registerComponent(liveStatsPanelComponent);

// Start the engine
engine.start();

// Render all UI components (for demo, logs stats)
uiFramework.renderAll();

console.log("GAIA Engine started:", engine.status);
