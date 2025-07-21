import { RegisteredModule, ModuleCategory } from './interfaces/module-integration';

// Module Registry - Central configuration for all modules
export const GAIA_MODULES: RegisteredModule[] = [
  {
    id: 'gaiachain-core',
    name: 'GaiaChain Core',
    version: '1.0.0',
    description: 'Blockchain infrastructure and core protocol',
    category: 'core',
    dependencies: [],
    exports: [
      { name: 'BlockchainService', type: 'service', path: './gaiachain-core/services/BlockchainService', isPublic: true },
      { name: 'useBlockchain', type: 'hook', path: './gaiachain-core/hooks/useBlockchain', isPublic: true },
      { name: 'BlockchainStatus', type: 'component', path: './gaiachain-core/components/BlockchainStatus', isPublic: true },
      { name: 'IBlockchainService', type: 'interface', path: './gaiachain-core/interfaces/blockchain', isPublic: true }
    ],
    config: {
      enabled: true,
      environment: { network: 'mainnet', rpcUrl: 'https://rpc.gaiachain.org' },
      features: { consensus: true, validation: true, mining: false },
      permissions: ['blockchain:read', 'blockchain:write', 'blockchain:admin'],
      resources: { maxMemory: 512, maxCpu: 50, maxConnections: 100, maxRequestsPerSecond: 1000 }
    },
    status: 'active'
  },
  {
    id: 'admin-system',
    name: 'Admin System',
    version: '1.0.0',
    description: 'Enhanced administrative controls and management',
    category: 'admin',
    dependencies: ['gaiachain-core'],
    exports: [
      { name: 'AdminAuthService', type: 'service', path: './admin-system/services/AdminAuthService', isPublic: true },
      { name: 'UserManagementService', type: 'service', path: './admin-system/services/UserManagementService', isPublic: true },
      { name: 'IAdminAuthService', type: 'interface', path: './admin-system/interfaces/admin', isPublic: true }
    ],
    config: {
      enabled: true,
      environment: { sessionTimeout: 3600000, mfaRequired: true },
      features: { multiAuth: true, audit: true, emergency: true },
      permissions: ['admin:read', 'admin:write', 'admin:emergency'],
      resources: { maxMemory: 256, maxCpu: 25, maxConnections: 50, maxRequestsPerSecond: 500 }
    },
    status: 'active'
  },
  {
    id: 'modular-dex-wallets',
    name: 'Modular DEX & Wallets',
    version: '1.0.0',
    description: 'Advanced trading and wallet management system',
    category: 'trading',
    dependencies: ['gaiachain-core'],
    exports: [
      { name: 'TradingService', type: 'service', path: './modular-dex-wallets/services/TradingService', isPublic: true },
      { name: 'WalletService', type: 'service', path: './modular-dex-wallets/services/WalletService', isPublic: true },
      { name: 'LiquidityService', type: 'service', path: './modular-dex-wallets/services/LiquidityService', isPublic: true },
      { name: 'ITradingService', type: 'interface', path: './modular-dex-wallets/interfaces/trading', isPublic: true }
    ],
    config: {
      enabled: true,
      environment: { multiChain: true, hardwareWallets: true },
      features: { spotTrading: true, futures: false, options: false },
      permissions: ['trading:read', 'trading:execute', 'wallet:manage'],
      resources: { maxMemory: 512, maxCpu: 40, maxConnections: 200, maxRequestsPerSecond: 2000 }
    },
    status: 'active'
  },
  {
    id: 'ai-quantum-cache',
    name: 'AI/Quantum Cache',
    version: '1.0.0',
    description: 'Intelligent caching and optimization system',
    category: 'optimization',
    dependencies: ['gaiachain-core'],
    exports: [
      { name: 'AICacheService', type: 'service', path: './ai-quantum-cache/services/AICacheService', isPublic: true },
      { name: 'QuantumOptimizerService', type: 'service', path: './ai-quantum-cache/services/QuantumOptimizerService', isPublic: true },
      { name: 'IAICacheService', type: 'interface', path: './ai-quantum-cache/interfaces/cache', isPublic: true }
    ],
    config: {
      enabled: true,
      environment: { aiModels: ['neural_network', 'random_forest'], quantumSimulation: true },
      features: { predictiveCache: true, quantumOptimization: true, realTimeAnalytics: true },
      permissions: ['cache:read', 'cache:write', 'cache:optimize'],
      resources: { maxMemory: 1024, maxCpu: 60, maxConnections: 100, maxRequestsPerSecond: 5000 }
    },
    status: 'active'
  },
  {
    id: 'nft-metaverse',
    name: 'NFT/Metaverse',
    version: '1.0.0',
    description: 'NFT marketplace and virtual world integration',
    category: 'nft',
    dependencies: ['gaiachain-core', 'modular-dex-wallets'],
    exports: [
      { name: 'NFTMarketplaceService', type: 'service', path: './nft-metaverse/services/NFTMarketplaceService', isPublic: true },
      { name: 'MetaverseService', type: 'service', path: './nft-metaverse/services/MetaverseService', isPublic: true },
      { name: 'VirtualRealEstateService', type: 'service', path: './nft-metaverse/services/VirtualRealEstateService', isPublic: true },
      { name: 'INFTMarketplaceService', type: 'interface', path: './nft-metaverse/interfaces/nft', isPublic: true }
    ],
    config: {
      enabled: true,
      environment: { webGL: true, vrSupport: true, arSupport: false },
      features: { marketplace: true, virtualWorlds: true, avatars: true },
      permissions: ['nft:read', 'nft:create', 'nft:trade', 'metaverse:access'],
      resources: { maxMemory: 768, maxCpu: 45, maxConnections: 300, maxRequestsPerSecond: 1500 }
    },
    status: 'active'
  },
  {
    id: 'frontend-ui',
    name: 'Frontend/UI',
    version: '1.0.0',
    description: 'Enhanced user interface components and theming',
    category: 'ui',
    dependencies: [],
    exports: [
      { name: 'ThemeService', type: 'service', path: './frontend-ui/services/ThemeService', isPublic: true },
      { name: 'ComponentLibraryService', type: 'service', path: './frontend-ui/services/ComponentLibraryService', isPublic: true },
      { name: 'IThemeService', type: 'interface', path: './frontend-ui/interfaces/ui', isPublic: true }
    ],
    config: {
      enabled: true,
      environment: { responsiveDesign: true, darkMode: true, accessibility: true },
      features: { theming: true, animations: true, optimization: true },
      permissions: ['ui:read', 'ui:customize'],
      resources: { maxMemory: 256, maxCpu: 20, maxConnections: 500, maxRequestsPerSecond: 3000 }
    },
    status: 'active'
  },
  {
    id: 'governance-compliance-devops',
    name: 'Governance/Compliance/DevOps',
    version: '1.0.0',
    description: 'Governance, compliance, and DevOps management',
    category: 'governance',
    dependencies: ['gaiachain-core', 'admin-system'],
    exports: [
      { name: 'GovernanceService', type: 'service', path: './governance-compliance-devops/services/GovernanceService', isPublic: true },
      { name: 'ComplianceService', type: 'service', path: './governance-compliance-devops/services/ComplianceService', isPublic: true },
      { name: 'DevOpsService', type: 'service', path: './governance-compliance-devops/services/DevOpsService', isPublic: true },
      { name: 'IGovernanceService', type: 'interface', path: './governance-compliance-devops/interfaces/governance', isPublic: true }
    ],
    config: {
      enabled: true,
      environment: { daoGovernance: true, kycCompliance: true, cicd: true },
      features: { voting: true, compliance: true, monitoring: true },
      permissions: ['governance:read', 'governance:vote', 'compliance:manage', 'devops:admin'],
      resources: { maxMemory: 384, maxCpu: 35, maxConnections: 150, maxRequestsPerSecond: 1000 }
    },
    status: 'active'
  }
];

// Module dependency graph for initialization order
export const MODULE_INITIALIZATION_ORDER = [
  'gaiachain-core',
  'admin-system',
  'modular-dex-wallets',
  'ai-quantum-cache',
  'frontend-ui',
  'nft-metaverse',
  'governance-compliance-devops'
];

// Module categories for organization
export const MODULE_CATEGORIES: Record<ModuleCategory, string[]> = {
  core: ['gaiachain-core'],
  admin: ['admin-system'],
  trading: ['modular-dex-wallets'],
  optimization: ['ai-quantum-cache'],
  nft: ['nft-metaverse'],
  ui: ['frontend-ui'],
  governance: ['governance-compliance-devops']
};