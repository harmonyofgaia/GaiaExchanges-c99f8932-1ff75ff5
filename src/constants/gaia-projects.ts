
export interface GAiAProject {
  id: string
  title: string
  description: string
  category: string
  status: 'active' | 'completed' | 'planning'
  progress: number
  participants: number
  reward: number
  deadline: string
  impact: 'Low' | 'Medium' | 'High' | 'Very High'
  image?: string
  tags: string[]
  fundingGoal?: number
  currentFunding?: number
  location?: string
  expectedImpact?: string
}

export const GAIA_PROJECTS: GAiAProject[] = [
  // Your Original Projects
  {
    id: 'heart-of-gaia',
    title: 'The Heart Of Gaia',
    description: 'Protect the core essence of nature itself through ancient dragon battles and forest restoration.',
    category: 'Environmental Gaming',
    status: 'active',
    progress: 95,
    participants: 1247,
    reward: 1500,
    deadline: '2024-12-31',
    impact: 'Very High',
    tags: ['gaming', 'forest', 'dragons', 'protection'],
    fundingGoal: 500000,
    currentFunding: 475000,
    location: 'Global Forest Networks',
    expectedImpact: 'Protect ancient forests, battle legendary dragons, restore 100,000 hectares'
  },
  {
    id: 'seed-splitter',
    title: 'Seed Splitter',
    description: 'Revolutionary project demo for dividing and multiplying life forces through advanced biotechnology.',
    category: 'Biotechnology',
    status: 'active',
    progress: 67,
    participants: 834,
    reward: 750,
    deadline: '2024-11-30',
    impact: 'High',
    tags: ['biotech', 'seeds', 'multiplication', 'demo'],
    fundingGoal: 200000,
    currentFunding: 134000,
    location: 'Agricultural Research Centers',
    expectedImpact: 'Develop seed multiplication technology, increase crop yields by 300%'
  },
  {
    id: 'railing-energy',
    title: 'Railing Energy',
    description: 'Innovative project demo harnessing kinetic energy from railway systems for clean power generation.',
    category: 'Renewable Energy',
    status: 'active',
    progress: 78,
    participants: 456,
    reward: 900,
    deadline: '2024-10-15',
    impact: 'Very High',
    tags: ['energy', 'railways', 'kinetic', 'demo'],
    fundingGoal: 300000,
    currentFunding: 234000,
    location: 'Global Railway Networks',
    expectedImpact: 'Generate clean energy from railway movement, power 10,000 homes'
  },
  {
    id: 'freeze-capital',
    title: 'Freeze Capital',
    description: 'Strategic ice realm asset management and frozen capital investment solutions.',
    category: 'Financial Innovation',
    status: 'active',
    progress: 45,
    participants: 623,
    reward: 1200,
    deadline: '2025-01-31',
    impact: 'High',
    tags: ['finance', 'ice', 'capital', 'strategy'],
    fundingGoal: 750000,
    currentFunding: 337500,
    location: 'Arctic Financial Centers',
    expectedImpact: 'Revolutionize frozen asset management, create sustainable ice economy'
  },
  {
    id: 'earth-aquarium-shrooms',
    title: 'Earth Aquarium of Shrooms',
    description: 'Underground ecosystem cultivation featuring mystical mushroom biodiversity and sustainable growth.',
    category: 'Mycology',
    status: 'active',
    progress: 89,
    participants: 1234,
    reward: 800,
    deadline: '2024-09-30',
    impact: 'Very High',
    tags: ['mushrooms', 'underground', 'ecosystem', 'biodiversity'],
    fundingGoal: 400000,
    currentFunding: 356000,
    location: 'Underground Bio Labs',
    expectedImpact: 'Create sustainable mushroom ecosystems, restore soil health globally'
  },
  {
    id: 'vintage-internet-cafe',
    title: 'Vintage Internet Cafe',
    description: 'Retro digital environment project demo combining nostalgia with modern environmental consciousness.',
    category: 'Digital Heritage',
    status: 'active',
    progress: 56,
    participants: 2156,
    reward: 400,
    deadline: '2024-11-15',
    impact: 'Medium',
    tags: ['vintage', 'internet', 'cafe', 'demo', 'digital'],
    fundingGoal: 150000,
    currentFunding: 84000,
    location: 'Global Digital Centers',
    expectedImpact: 'Preserve digital heritage, create sustainable tech nostalgia hubs'
  },
  {
    id: 'techno-soul-solutions',
    title: 'Techno Soul Solutions',
    description: 'Merging cutting-edge technology with spiritual energy for holistic problem-solving approaches.',
    category: 'Tech-Spirituality',
    status: 'active',
    progress: 73,
    participants: 567,
    reward: 1100,
    deadline: '2024-12-15',
    impact: 'Very High',
    tags: ['technology', 'spirituality', 'solutions', 'demo'],
    fundingGoal: 600000,
    currentFunding: 438000,
    location: 'Global Tech-Spiritual Centers',
    expectedImpact: 'Bridge technology and spirituality, create holistic solution frameworks'
  },
  {
    id: 'natural-clean-system',
    title: 'Natural Clean System',
    description: 'Comprehensive natural cleaning and purification systems using bio-organic technologies.',
    category: 'Environmental Tech',
    status: 'active',
    progress: 92,
    participants: 1567,
    reward: 950,
    deadline: '2024-08-31',
    impact: 'Very High',
    tags: ['cleaning', 'natural', 'purification', 'bio-organic'],
    fundingGoal: 350000,
    currentFunding: 322000,
    location: 'Global Cleanup Centers',
    expectedImpact: 'Deploy natural cleaning systems, eliminate 90% chemical pollutants'
  },
  {
    id: 'nft-gameswap-virtual',
    title: 'NFT GameSwap Virtual',
    description: 'Virtual trading platform for NFT gaming assets with environmental impact rewards.',
    category: 'Gaming NFTs',
    status: 'active',
    progress: 64,
    participants: 3421,
    reward: 600,
    deadline: '2024-10-30',
    impact: 'High',
    tags: ['nft', 'gaming', 'virtual', 'trading'],
    fundingGoal: 400000,
    currentFunding: 256000,
    location: 'Virtual Gaming Worlds',
    expectedImpact: 'Create sustainable NFT gaming economy, plant trees for every trade'
  },
  {
    id: 'sound-riffs-re-grau-dio',
    title: 'Sound Riffs Re Grau dio',
    description: 'Musical energy creation through sound battles and audio-based environmental restoration.',
    category: 'Audio Environmental',
    status: 'planning',
    progress: 23,
    participants: 892,
    reward: 850,
    deadline: '2025-02-28',
    impact: 'High',
    tags: ['music', 'sound', 'audio', 'battles', 'energy'],
    fundingGoal: 250000,
    currentFunding: 57500,
    location: 'Global Audio Studios',
    expectedImpact: 'Generate environmental healing through sound frequencies'
  },
  {
    id: 'greenlake-tribe',
    title: 'GreenLake Tribe',
    description: 'Community-driven water restoration initiative focusing on lake and river ecosystem revival.',
    category: 'Water Restoration',
    status: 'active',
    progress: 87,
    participants: 2341,
    reward: 1000,
    deadline: '2024-09-15',
    impact: 'Very High',
    tags: ['water', 'lakes', 'rivers', 'tribal', 'community'],
    fundingGoal: 500000,
    currentFunding: 435000,
    location: 'Global Water Bodies',
    expectedImpact: 'Restore 50 lakes and rivers, revive aquatic ecosystems'
  },

  // Additional Environmental Projects
  {
    id: 'global-reforestation',
    title: 'Global Reforestation Initiative',
    description: 'Plant trees worldwide to combat climate change and restore ecosystems.',
    category: 'Environmental',
    status: 'active',
    progress: 67,
    participants: 25847,
    reward: 500,
    deadline: '2024-12-31',
    impact: 'Very High',
    tags: ['trees', 'climate', 'carbon'],
    fundingGoal: 500000,
    currentFunding: 335000,
    location: 'Global',
    expectedImpact: 'Plant 1 million trees, absorb 50,000 tons CO2 annually'
  },
  {
    id: 'ocean-cleanup',
    title: 'Ocean Cleanup Campaign',
    description: 'Remove plastic waste from oceans and waterways using advanced technology.',
    category: 'Environmental',
    status: 'active',
    progress: 45,
    participants: 15632,
    reward: 350,
    deadline: '2024-11-30',
    impact: 'High',
    tags: ['ocean', 'plastic', 'cleanup'],
    fundingGoal: 750000,
    currentFunding: 337500,
    location: 'Pacific Ocean',
    expectedImpact: 'Remove 100 tons of plastic, protect marine ecosystems'
  },
  {
    id: 'solar-energy-expansion',
    title: 'Solar Energy Expansion',
    description: 'Install solar panels in communities worldwide to provide clean energy.',
    category: 'Energy',
    status: 'active',
    progress: 78,
    participants: 8934,
    reward: 750,
    deadline: '2024-10-15',
    impact: 'Very High',
    tags: ['solar', 'renewable', 'energy'],
    fundingGoal: 400000,
    currentFunding: 312000,
    location: 'Rural Communities Worldwide',
    expectedImpact: 'Power 5,000 homes with clean solar energy'
  }
]

export const MISSING_CORE_FEATURES = [
  // Real-time & Live Systems
  'Real-time WebSocket Integration - Live data feeds',
  'Live Trading Charts & Analytics - Advanced visualizations',
  'Real-time Notification System - Push notifications',
  'Live Chat & Messaging System - Community communication',
  
  // Advanced Analytics & AI
  'Predictive Analytics Engine - AI market predictions',
  'Natural Language Processing - Chat analysis',
  'Computer Vision Integration - Image recognition',
  'Sentiment Analysis System - Community mood tracking',
  'Machine Learning Trading Algorithms - Automated trading',
  
  // Blockchain & DeFi Advanced
  'Multi-Chain Bridge Protocol - Cross-chain transfers',
  'Automated Market Maker (AMM) - Decentralized pools',
  'Yield Farming Mechanisms - Staking optimization',
  'Flash Loan Protection - Advanced DeFi security',
  'Liquidity Mining Programs - Incentivized liquidity',
  'Cross-Chain Asset Management - Multi-blockchain support',
  
  // Mobile & Cross-Platform
  'Progressive Web App (PWA) Features - Offline functionality',
  'Mobile Responsiveness Optimization - Touch interfaces',
  'Biometric Authentication - Fingerprint/Face ID',
  'Camera Integration - QR scanning, document upload',
  'Geo-location Services - Location-based features',
  'Push Notification System - Mobile alerts',
  
  // Performance & Infrastructure
  'Content Delivery Network (CDN) Integration',
  'Database Optimization Tools - Query performance',
  'Microservices Architecture - Scalable components',
  'Load Balancing & Auto-scaling - Performance optimization',
  'Advanced Caching Strategies - Speed improvements',
  'Performance Monitoring Dashboard - Real-time metrics',
  
  // Security Enhancements
  'Hardware Security Module (HSM) Integration',
  'Zero-Knowledge Proof Verification',
  'Multi-Party Computation (MPC) Wallets',
  'Behavioral Biometrics Authentication',
  'Quantum Key Distribution Network',
  'Advanced Threat Detection System',
  
  // User Experience & Interface
  'Loading States & Skeleton UI - Better UX',
  'Error Boundary Components - Graceful error handling',
  'Advanced Search & Filter Systems - Data discovery',
  'User Journey Analytics - UX optimization',
  'Accessibility Features - WCAG compliance',
  'Multi-language Support - Internationalization',
  
  // Integration & APIs
  'External Data Feeds Integration - Price oracles, weather',
  'Third-party Wallet Integrations - More wallet support',
  'Payment Gateway Integration - Fiat on/off ramps',
  'KYC/AML Service Integration - Identity verification',
  'Tax Reporting API - Automated calculations',
  'Social Media Integration - Sharing & connectivity',
  
  // Advanced Trading & Finance
  'Options Trading Platform - Derivatives trading',
  'Margin Trading System - Leveraged positions',
  'Portfolio Rebalancing Engine - Automated allocation',
  'Risk Management Tools - Stop-loss automation',
  'Arbitrage Detection System - Cross-exchange opportunities',
  'Copy Trading Platform - Social trading features',
  
  // Community & Governance
  'DAO Governance Portal - Decentralized voting',
  'Reputation System - Trust scoring',
  'Referral Program Engine - Multi-tier rewards',
  'Community Challenges - Gamified engagement',
  'Social Trading Features - Following & signals',
  'Community Content Creation - User-generated content',
  
  // Environmental & Impact
  'Carbon Credit Marketplace - Environmental trading',
  'Impact Measurement Tools - Environmental tracking',
  'Sustainability Scoring - Green investment ratings',
  'Environmental Data Integration - Satellite data feeds',
  'Green Bond Platform - Sustainable finance',
  'Climate Risk Assessment - Environmental analysis',

  // Recently Identified Missing Features
  'API Gateway Management - External service connections',
  'Database Optimization Tools - Query performance',
  'Backup & Recovery Systems - Data protection',
  'Logging & Audit Systems - Activity tracking',
  'User Session Management - Advanced auth flows'
]
