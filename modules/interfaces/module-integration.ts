// Module Integration System
export interface ModuleRegistry {
  modules: RegisteredModule[];
  dependencies: ModuleDependency[];
  status: ModuleStatus[];
}

export interface RegisteredModule {
  id: string;
  name: string;
  version: string;
  description: string;
  category: ModuleCategory;
  dependencies: string[];
  exports: ModuleExport[];
  config: ModuleConfig;
  status: 'active' | 'inactive' | 'loading' | 'error';
}

export type ModuleCategory = 
  | 'core'
  | 'admin'
  | 'trading'
  | 'optimization'
  | 'nft'
  | 'ui'
  | 'governance';

export interface ModuleExport {
  name: string;
  type: 'component' | 'service' | 'hook' | 'utility' | 'interface';
  path: string;
  isPublic: boolean;
}

export interface ModuleDependency {
  moduleId: string;
  dependsOn: string;
  version: string;
  isOptional: boolean;
}

export interface ModuleStatus {
  moduleId: string;
  isLoaded: boolean;
  isInitialized: boolean;
  lastChecked: Date;
  health: 'healthy' | 'warning' | 'error';
  metrics: ModuleMetrics;
}

export interface ModuleMetrics {
  memoryUsage: number;
  cpuUsage: number;
  requestCount: number;
  errorCount: number;
  responseTime: number;
}

export interface ModuleConfig {
  enabled: boolean;
  environment: Record<string, any>;
  features: Record<string, boolean>;
  permissions: string[];
  resources: ResourceLimits;
}

export interface ResourceLimits {
  maxMemory: number;
  maxCpu: number;
  maxConnections: number;
  maxRequestsPerSecond: number;
}

// Cross-Module Communication
export interface ModuleEvent {
  id: string;
  source: string;
  target?: string; // undefined for broadcast
  type: string;
  payload: any;
  timestamp: Date;
  correlationId?: string;
}

export interface ModuleMessage {
  from: string;
  to: string;
  method: string;
  params: any;
  id: string;
  timestamp: Date;
}

export interface ModuleResponse {
  messageId: string;
  success: boolean;
  data?: any;
  error?: string;
  timestamp: Date;
}

// Integration Service Interface
export interface IModuleIntegrationService {
  registerModule(module: RegisteredModule): Promise<void>;
  loadModule(moduleId: string): Promise<boolean>;
  unloadModule(moduleId: string): Promise<boolean>;
  getModuleStatus(moduleId?: string): Promise<ModuleStatus[]>;
  sendEvent(event: Omit<ModuleEvent, 'id' | 'timestamp'>): Promise<void>;
  sendMessage(message: Omit<ModuleMessage, 'id' | 'timestamp'>): Promise<ModuleResponse>;
  subscribeToEvents(moduleId: string, eventType: string, callback: (event: ModuleEvent) => void): Promise<void>;
  updateModuleConfig(moduleId: string, config: Partial<ModuleConfig>): Promise<void>;
  validateDependencies(moduleId: string): Promise<boolean>;
}