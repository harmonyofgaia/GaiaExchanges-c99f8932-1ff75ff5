
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
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
  },
  {
    id: '4',
    title: 'Sustainable Agriculture Network',
    description: 'Promote sustainable farming practices globally to ensure food security.',
    category: 'Agriculture',
    status: 'planning',
    progress: 12,
    participants: 3456,
    reward: 400,
    deadline: '2025-03-31',
    impact: 'High',
    tags: ['farming', 'sustainable', 'food'],
    fundingGoal: 300000,
    currentFunding: 36000,
    location: 'Agricultural Regions',
    expectedImpact: 'Train 10,000 farmers in sustainable practices'
  },
  {
    id: '5',
    title: 'Wildlife Conservation Program',
    description: 'Protect endangered species and their habitats through community action.',
    category: 'Wildlife',
    status: 'active',
    progress: 56,
    participants: 7890,
    reward: 600,
    deadline: '2024-09-30',
    impact: 'Very High',
    tags: ['wildlife', 'conservation', 'biodiversity'],
    fundingGoal: 600000,
    currentFunding: 336000,
    location: 'Africa & Amazon',
    expectedImpact: 'Protect 50 endangered species, preserve 100,000 hectares'
  },
  {
    id: '6',
    title: 'Clean Water Access Initiative',
    description: 'Provide clean drinking water to underserved communities worldwide.',
    category: 'Water',
    status: 'active',
    progress: 89,
    participants: 12453,
    reward: 450,
    deadline: '2024-08-31',
    impact: 'Very High',
    tags: ['water', 'health', 'community'],
    fundingGoal: 250000,
    currentFunding: 222500,
    location: 'Sub-Saharan Africa',
    expectedImpact: 'Provide clean water to 25,000 people'
  },
  {
    id: '7',
    title: 'Urban Green Spaces Development',
    description: 'Create and maintain green spaces in urban areas to improve air quality.',
    category: 'Urban',
    status: 'active',
    progress: 34,
    participants: 5678,
    reward: 300,
    deadline: '2025-01-31',
    impact: 'Medium',
    tags: ['urban', 'parks', 'air quality'],
    fundingGoal: 180000,
    currentFunding: 61200,
    location: 'Major Cities',
    expectedImpact: 'Create 50 new urban parks, improve air quality for 1M people'
  },
  {
    id: '8',
    title: 'Renewable Energy Education',
    description: 'Educate communities about renewable energy solutions and implementation.',
    category: 'Education',
    status: 'planning',
    progress: 8,
    participants: 2341,
    reward: 200,
    deadline: '2025-06-30',
    impact: 'Medium',
    tags: ['education', 'renewable', 'awareness'],
    fundingGoal: 120000,
    currentFunding: 9600,
    location: 'Global',
    expectedImpact: 'Educate 50,000 people about renewable energy'
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
  'Climate Risk Assessment - Environmental analysis'
]
