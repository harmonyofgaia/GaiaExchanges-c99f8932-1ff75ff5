export interface CacheEntry<T = any> {
  key: string;
  value: T;
  timestamp: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
  size: number;
  tags: string[];
  priority: number;
}

export interface CacheMetrics {
  hitRate: number;
  missRate: number;
  totalRequests: number;
  totalHits: number;
  totalMisses: number;
  averageResponseTime: number;
  memoryUsage: number;
  storageUsage: number;
  evictionCount: number;
}

export interface PredictionModel {
  id: string;
  name: string;
  type: 'neural_network' | 'random_forest' | 'svm' | 'lstm';
  accuracy: number;
  trainingData: number;
  lastTrained: Date;
  isActive: boolean;
  parameters: Record<string, any>;
}

export interface UserBehaviorPattern {
  userId: string;
  accessPatterns: AccessPattern[];
  preferences: UserPreferences;
  predictedActions: PredictedAction[];
  confidence: number;
  lastUpdated: Date;
}

export interface AccessPattern {
  resource: string;
  frequency: number;
  timeOfDay: number[];
  dayOfWeek: number[];
  accessDuration: number;
  correlatedResources: string[];
}

export interface UserPreferences {
  preferredDataFreshness: number;
  performancePriority: 'speed' | 'accuracy' | 'bandwidth';
  cacheSettings: {
    enablePrefetch: boolean;
    maxCacheSize: number;
    ttl: number;
  };
}

export interface PredictedAction {
  action: string;
  resource: string;
  probability: number;
  estimatedTime: number;
  dependencies: string[];
}

export interface QuantumOptimizationResult {
  optimalConfiguration: CacheConfiguration;
  expectedPerformanceGain: number;
  energyConsumption: number;
  computationTime: number;
  convergenceIterations: number;
}

export interface CacheConfiguration {
  layers: CacheLayer[];
  evictionPolicy: EvictionPolicy;
  sizeLimits: SizeLimits;
  refreshStrategies: RefreshStrategy[];
}

export interface CacheLayer {
  id: string;
  type: 'memory' | 'disk' | 'network' | 'distributed';
  capacity: number;
  latency: number;
  throughput: number;
  priority: number;
}

export interface EvictionPolicy {
  algorithm: 'lru' | 'lfu' | 'fifo' | 'ai_optimized' | 'quantum_optimized';
  parameters: Record<string, number>;
  adaptiveThreshold: number;
}

export interface SizeLimits {
  maxMemory: number;
  maxDisk: number;
  maxEntries: number;
  maxEntrySize: number;
}

export interface RefreshStrategy {
  type: 'proactive' | 'reactive' | 'predictive';
  interval: number;
  conditions: RefreshCondition[];
}

export interface RefreshCondition {
  metric: string;
  operator: '>' | '<' | '=' | '>=' | '<=';
  threshold: number;
  action: 'refresh' | 'invalidate' | 'prefetch';
}

// Service Interfaces
export interface IAICacheService {
  predictCacheNeeds(userId: string): Promise<PredictedAction[]>;
  optimizeCacheStrategy(userId?: string): Promise<CacheConfiguration>;
  prefetchData(predictions: PredictedAction[]): Promise<void>;
  getCacheMetrics(layer?: string): Promise<CacheMetrics>;
  updateUserBehavior(userId: string, action: string, resource: string): Promise<void>;
  trainPredictionModel(modelId: string, trainingData: any[]): Promise<PredictionModel>;
}

export interface IQuantumOptimizerService {
  optimizeCachePlacement(constraints: any): Promise<QuantumOptimizationResult>;
  calculateOptimalSize(usage: CacheMetrics[]): Promise<SizeLimits>;
  optimizeEvictionPolicy(accessPatterns: AccessPattern[]): Promise<EvictionPolicy>;
  runQuantumAnnealing(problem: any): Promise<any>;
}

export interface ICacheManagerService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  clear(tags?: string[]): Promise<void>;
  getMetrics(): Promise<CacheMetrics>;
  invalidatePattern(pattern: string): Promise<number>;
  warmup(keys: string[]): Promise<void>;
}