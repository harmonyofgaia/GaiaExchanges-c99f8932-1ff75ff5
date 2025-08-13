// Plugin/Extension System for GAIA Engine
// Enables dynamic discovery, loading, and management of plugins/extensions

export interface GaiaPlugin {
  name: string;
  version: string;
  activate(engine: unknown): void;
  deactivate?(): void;
}

export class PluginSystem {
  private plugins: Map<string, GaiaPlugin> = new Map();

  public registerPlugin(plugin: GaiaPlugin, engine: unknown) {
    plugin.activate(engine);
    this.plugins.set(plugin.name, plugin);
  }

  public unregisterPlugin(name: string) {
    const plugin = this.plugins.get(name);
    if (plugin && plugin.deactivate) plugin.deactivate();
    this.plugins.delete(name);
  }

  public listPlugins(): string[] {
    return Array.from(this.plugins.keys());
  }
}
