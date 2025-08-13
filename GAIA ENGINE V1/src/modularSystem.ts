// Modular System for GAIA Engine
// Handles dynamic loading/unloading of modules and plugins

export interface GaiaModule {
  name: string;
  version: string;
  init(engine: unknown): void;
  shutdown?(): void;
}

export class ModularSystem {
  private modules: Map<string, GaiaModule> = new Map();

  public loadModule(module: GaiaModule, engine: unknown) {
    module.init(engine);
    this.modules.set(module.name, module);
  }

  public unloadModule(name: string) {
    const module = this.modules.get(name);
    if (module && module.shutdown) module.shutdown();
    this.modules.delete(name);
  }

  public listModules(): string[] {
    return Array.from(this.modules.keys());
  }
}
