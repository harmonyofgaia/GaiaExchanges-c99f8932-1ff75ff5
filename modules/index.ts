// GaiaExchanges Module System - Main Export
export * from './interfaces/module-integration';
export * from './module-registry';
export * from './services/ModuleIntegrationService';

// Module-specific exports
export * from './gaiachain-core/interfaces/blockchain';
export * from './gaiachain-core/services/BlockchainService';
export * from './gaiachain-core/hooks/useBlockchain';
export * from './gaiachain-core/components/BlockchainStatus';

export * from './admin-system/interfaces/admin';
export * from './modular-dex-wallets/interfaces/trading';
export * from './ai-quantum-cache/interfaces/cache';
export * from './nft-metaverse/interfaces/nft';
export * from './frontend-ui/interfaces/ui';
export * from './governance-compliance-devops/interfaces/governance';

// Convenience re-exports for common use cases
import { moduleIntegrationService } from './services/ModuleIntegrationService';
import { BlockchainService } from './gaiachain-core/services/BlockchainService';
import { useBlockchain } from './gaiachain-core/hooks/useBlockchain';
import { BlockchainStatus } from './gaiachain-core/components/BlockchainStatus';

export {
  moduleIntegrationService,
  BlockchainService,
  useBlockchain,
  BlockchainStatus
};

// Module system initialization
export const initializeGaiaModules = async () => {
  console.log('🌍 Initializing GaiaExchanges Module System...');
  
  // The ModuleIntegrationService automatically initializes when instantiated
  // This function provides a convenient way to ensure initialization
  
  const loadedModules = moduleIntegrationService.getLoadedModules();
  console.log(`✅ ${loadedModules.length} modules loaded successfully`);
  
  return moduleIntegrationService;
};

// Module health check
export const checkModuleHealth = async () => {
  const health = moduleIntegrationService.getModuleHealth();
  const allHealthy = Object.values(health).every(status => status === 'healthy');
  
  console.log('🔍 Module Health Check:', health);
  
  return {
    isHealthy: allHealthy,
    moduleHealth: health,
    timestamp: new Date()
  };
};