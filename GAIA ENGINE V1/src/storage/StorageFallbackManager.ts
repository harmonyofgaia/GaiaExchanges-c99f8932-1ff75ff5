// StorageFallbackManager
// Handles seamless fallback between external, local, and cloud storage for GAIA Engine

import { StorageSystem, StorageConfig } from "../storageSystem";

export class StorageFallbackManager {
  private storages: StorageSystem[] = [];

  constructor(configs: StorageConfig[]) {
    this.storages = configs.map((cfg) => new StorageSystem(cfg));
  }

  async save(key: string, data: unknown): Promise<void> {
    for (const storage of this.storages) {
      try {
        await storage.save(key, data);
        return;
      } catch (e) {
        // Try next storage
      }
    }
    throw new Error("All storage backends failed.");
  }

  async load(key: string): Promise<unknown> {
    for (const storage of this.storages) {
      try {
        const data = await storage.load(key);
        if (data !== null && data !== undefined) return data;
      } catch (e) {
        // Try next storage
      }
    }
    return null;
  }
}
