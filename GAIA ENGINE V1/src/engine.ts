// GAIA Engine Main Entrypoint
// Wires together all core modules and starts the engine

import { GaiaEngine } from "./coreEngine";
import { ModularSystem } from "./modularSystem";
import { StorageSystem } from "./storageSystem";
import { PluginSystem } from "./pluginSystem";
import { AIIntegration } from "./aiIntegration";
import { UIFramework } from "./uiFramework";
import { LiveStats } from "./liveStats";

// Example config
const config = {
  name: "GAIA Engine V1",
  version: "1.0.0",
  storagePath: "./data",
  plugins: [],
};

const engine = new GaiaEngine(config);

// Register core modules
engine.registerModule("modularSystem", new ModularSystem());
engine.registerModule(
  "storageSystem",
  new StorageSystem({ type: "local", path: "./data" }),
);
engine.registerModule("pluginSystem", new PluginSystem());
engine.registerModule("aiIntegration", new AIIntegration());
engine.registerModule("uiFramework", new UIFramework());
engine.registerModule("liveStats", new LiveStats());

// Start the engine
engine.start();

console.log("GAIA Engine started:", engine.status);
