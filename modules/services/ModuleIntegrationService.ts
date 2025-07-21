import { 
  IModuleIntegrationService, 
  RegisteredModule, 
  ModuleStatus, 
  ModuleEvent, 
  ModuleMessage, 
  ModuleResponse,
  ModuleConfig
} from '../interfaces/module-integration';
import { GAIA_MODULES, MODULE_INITIALIZATION_ORDER } from '../module-registry';

export class ModuleIntegrationService implements IModuleIntegrationService {
  private modules: Map<string, RegisteredModule> = new Map();
  private moduleStatus: Map<string, ModuleStatus> = new Map();
  private eventListeners: Map<string, ((event: ModuleEvent) => void)[]> = new Map();
  private messageHandlers: Map<string, (message: ModuleMessage) => Promise<ModuleResponse>> = new Map();

  constructor() {
    this.initializeModules();
  }

  private async initializeModules(): Promise<void> {
    console.log('🚀 Initializing GaiaExchanges Module System...');
    
    // Register all modules
    for (const module of GAIA_MODULES) {
      await this.registerModule(module);
    }

    // Load modules in dependency order
    for (const moduleId of MODULE_INITIALIZATION_ORDER) {
      await this.loadModule(moduleId);
    }

    console.log('✅ All modules initialized successfully');
  }

  async registerModule(module: RegisteredModule): Promise<void> {
    console.log(`📦 Registering module: ${module.name}`);
    
    this.modules.set(module.id, module);
    
    // Initialize module status
    this.moduleStatus.set(module.id, {
      moduleId: module.id,
      isLoaded: false,
      isInitialized: false,
      lastChecked: new Date(),
      health: 'healthy',
      metrics: {
        memoryUsage: 0,
        cpuUsage: 0,
        requestCount: 0,
        errorCount: 0,
        responseTime: 0
      }
    });

    // Emit module registered event
    await this.sendEvent({
      source: 'module-integration',
      type: 'module_registered',
      payload: { moduleId: module.id, moduleName: module.name }
    });
  }

  async loadModule(moduleId: string): Promise<boolean> {
    const module = this.modules.get(moduleId);
    if (!module) {
      console.error(`❌ Module not found: ${moduleId}`);
      return false;
    }

    try {
      console.log(`🔄 Loading module: ${module.name}`);
      
      // Validate dependencies
      const dependenciesValid = await this.validateDependencies(moduleId);
      if (!dependenciesValid) {
        console.error(`❌ Dependencies not satisfied for module: ${moduleId}`);
        return false;
      }

      // Update status
      const status = this.moduleStatus.get(moduleId)!;
      status.isLoaded = true;
      status.isInitialized = true;
      status.lastChecked = new Date();
      
      // Update module status
      module.status = 'active';

      console.log(`✅ Module loaded successfully: ${module.name}`);
      
      // Emit module loaded event
      await this.sendEvent({
        source: 'module-integration',
        type: 'module_loaded',
        payload: { moduleId, moduleName: module.name }
      });

      return true;
    } catch (error) {
      console.error(`❌ Failed to load module ${moduleId}:`, error);
      
      // Update status
      const status = this.moduleStatus.get(moduleId)!;
      status.health = 'error';
      module.status = 'error';
      
      return false;
    }
  }

  async unloadModule(moduleId: string): Promise<boolean> {
    const module = this.modules.get(moduleId);
    if (!module) {
      return false;
    }

    try {
      console.log(`🔄 Unloading module: ${module.name}`);
      
      // Update status
      const status = this.moduleStatus.get(moduleId)!;
      status.isLoaded = false;
      status.isInitialized = false;
      
      // Update module status
      module.status = 'inactive';

      // Emit module unloaded event
      await this.sendEvent({
        source: 'module-integration',
        type: 'module_unloaded',
        payload: { moduleId, moduleName: module.name }
      });

      return true;
    } catch (error) {
      console.error(`❌ Failed to unload module ${moduleId}:`, error);
      return false;
    }
  }

  async getModuleStatus(moduleId?: string): Promise<ModuleStatus[]> {
    if (moduleId) {
      const status = this.moduleStatus.get(moduleId);
      return status ? [status] : [];
    }
    
    return Array.from(this.moduleStatus.values());
  }

  async sendEvent(event: Omit<ModuleEvent, 'id' | 'timestamp'>): Promise<void> {
    const fullEvent: ModuleEvent = {
      ...event,
      id: `event_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      timestamp: new Date()
    };

    console.log(`📡 Broadcasting event: ${fullEvent.type} from ${fullEvent.source}`);

    // Broadcast to all listeners if no target specified
    if (!fullEvent.target) {
      for (const [listenerId, listeners] of this.eventListeners.entries()) {
        for (const listener of listeners) {
          try {
            listener(fullEvent);
          } catch (error) {
            console.error(`❌ Error in event listener ${listenerId}:`, error);
          }
        }
      }
    } else {
      // Send to specific target
      const listeners = this.eventListeners.get(fullEvent.target) || [];
      for (const listener of listeners) {
        try {
          listener(fullEvent);
        } catch (error) {
          console.error(`❌ Error in targeted event listener:`, error);
        }
      }
    }
  }

  async sendMessage(message: Omit<ModuleMessage, 'id' | 'timestamp'>): Promise<ModuleResponse> {
    const fullMessage: ModuleMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      timestamp: new Date()
    };

    console.log(`💬 Sending message: ${fullMessage.method} from ${fullMessage.from} to ${fullMessage.to}`);

    // Find message handler for target module
    const handler = this.messageHandlers.get(fullMessage.to);
    if (!handler) {
      return {
        messageId: fullMessage.id,
        success: false,
        error: `No message handler found for module: ${fullMessage.to}`,
        timestamp: new Date()
      };
    }

    try {
      return await handler(fullMessage);
    } catch (error) {
      return {
        messageId: fullMessage.id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
    }
  }

  async subscribeToEvents(
    moduleId: string, 
    eventType: string, 
    callback: (event: ModuleEvent) => void
  ): Promise<void> {
    const listenerId = `${moduleId}_${eventType}`;
    
    if (!this.eventListeners.has(listenerId)) {
      this.eventListeners.set(listenerId, []);
    }
    
    this.eventListeners.get(listenerId)!.push(callback);
    
    console.log(`👂 Module ${moduleId} subscribed to events: ${eventType}`);
  }

  async updateModuleConfig(moduleId: string, config: Partial<ModuleConfig>): Promise<void> {
    const module = this.modules.get(moduleId);
    if (!module) {
      throw new Error(`Module not found: ${moduleId}`);
    }

    // Update module configuration
    module.config = { ...module.config, ...config };
    
    console.log(`⚙️ Updated configuration for module: ${moduleId}`);

    // Emit configuration updated event
    await this.sendEvent({
      source: 'module-integration',
      type: 'module_config_updated',
      payload: { moduleId, config }
    });
  }

  async validateDependencies(moduleId: string): Promise<boolean> {
    const module = this.modules.get(moduleId);
    if (!module) {
      return false;
    }

    // Check if all dependencies are loaded
    for (const depId of module.dependencies) {
      const depStatus = this.moduleStatus.get(depId);
      if (!depStatus || !depStatus.isLoaded) {
        console.warn(`⚠️ Dependency not loaded: ${depId} for module: ${moduleId}`);
        return false;
      }
    }

    return true;
  }

  // Utility methods for module management
  getLoadedModules(): RegisteredModule[] {
    return Array.from(this.modules.values()).filter(m => m.status === 'active');
  }

  getModuleByCategory(category: string): RegisteredModule[] {
    return Array.from(this.modules.values()).filter(m => m.category === category);
  }

  getModuleHealth(): Record<string, string> {
    const health: Record<string, string> = {};
    for (const [moduleId, status] of this.moduleStatus.entries()) {
      health[moduleId] = status.health;
    }
    return health;
  }

  // Performance monitoring
  updateModuleMetrics(moduleId: string, metrics: Partial<ModuleStatus['metrics']>): void {
    const status = this.moduleStatus.get(moduleId);
    if (status) {
      status.metrics = { ...status.metrics, ...metrics };
      status.lastChecked = new Date();
    }
  }
}

// Singleton instance
export const moduleIntegrationService = new ModuleIntegrationService();