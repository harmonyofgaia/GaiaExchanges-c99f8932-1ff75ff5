// GAIA Engine Core Module
// Provides the foundational engine logic, lifecycle, and extensibility hooks

export type EngineStatus = "initializing" | "ready" | "running" | "error";

export interface GaiaEngineConfig {
  name: string;
  version: string;
  storagePath?: string;
  plugins?: string[];
}

interface GaiaModule {
  init?(engine: GaiaEngine): void;
  listPlugins?(): unknown[];
}

interface PluginSystemModule extends GaiaModule {
  listPlugins(): unknown[];
}

export class GaiaEngine {
  public status: EngineStatus = "initializing";
  public config: GaiaEngineConfig;
  public modules: Record<string, GaiaModule> = {};

  constructor(config: GaiaEngineConfig) {
    this.config = config;
    this.status = "ready";
  }

  public start() {
    this.status = "running";
    // Initialize all registered modules if they have an 'init' method
    for (const mod of Object.values(this.modules)) {
      if (mod && mod.init) {
        mod.init(this);
      }
    }
    // Optionally, initialize plugins if a plugin system is registered
    const pluginSystem = this.modules["pluginSystem"] as PluginSystemModule | undefined;
    if (pluginSystem && pluginSystem.listPlugins) {
      // Plugins are assumed to be already activated on registration
    }
  }

  public stop() {
    this.status = "ready";
    // Graceful shutdown: call shutdown on all modules if available
    for (const mod of Object.values(this.modules)) {
      if (mod && typeof (mod as any).shutdown === "function") {
        (mod as any).shutdown();
      }
    }
  }

  public registerModule(name: string, module: GaiaModule) {
    this.modules[name] = module;
  }
}
