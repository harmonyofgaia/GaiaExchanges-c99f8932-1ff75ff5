/**
 * Configuration for Lovable Deployment Tool
 */

import type { DeploymentConfig, AIConfig, CommunityConfig } from '../interfaces';

export const defaultDeploymentConfig: DeploymentConfig = {
  additiveOnly: true,
  requireCommunityApproval: true,
  minimumApprovals: 3,
  autoRollbackOnFailure: true,
  previewEnvironmentDuration: 24, // hours
  maxRiskLevel: 'medium',
  environmentalImpactThreshold: 50
};

export const defaultAIConfig: AIConfig = {
  riskAssessmentModel: 'gaia-risk-analyzer-v3',
  confidenceThreshold: 80,
  learningEnabled: true,
  expertValidationRequired: true,
  mitigationSuggestions: true
};

export const defaultCommunityConfig: CommunityConfig = {
  votingPeriod: 24, // hours
  quorumPercentage: 51,
  expertWeight: 2,
  reputationWeight: true,
  appealPeriod: 48 // hours
};

export const platformConfigs = {
  vercel: {
    apiUrl: 'https://api.vercel.com',
    requiredEnvVars: ['VERCEL_TOKEN', 'VERCEL_PROJECT_ID'],
    deploymentCommand: 'vercel deploy --prod',
    healthCheckEndpoint: '/api/health'
  },
  netlify: {
    apiUrl: 'https://api.netlify.com/api/v1',
    requiredEnvVars: ['NETLIFY_AUTH_TOKEN', 'NETLIFY_SITE_ID'],
    deploymentCommand: 'netlify deploy --prod',
    healthCheckEndpoint: '/.netlify/functions/health'
  },
  supabase: {
    apiUrl: 'https://supabase.com/dashboard/api',
    requiredEnvVars: ['SUPABASE_ACCESS_TOKEN', 'SUPABASE_PROJECT_REF'],
    deploymentCommand: 'supabase db push',
    healthCheckEndpoint: '/rest/v1/'
  },
  lovable: {
    apiUrl: 'https://api.lovable.dev',
    requiredEnvVars: ['LOVABLE_API_KEY', 'LOVABLE_PROJECT_ID'],
    deploymentCommand: 'lovable deploy',
    healthCheckEndpoint: '/api/status'
  },
  replit: {
    apiUrl: 'https://replit.com/graphql',
    requiredEnvVars: ['REPLIT_TOKEN', 'REPLIT_REPL_ID'],
    deploymentCommand: 'replit deploy',
    healthCheckEndpoint: '/health'
  },
  gaiaexchanges: {
    apiUrl: 'https://api.gaiaexchanges.com',
    requiredEnvVars: ['GAIA_API_KEY', 'GAIA_PROJECT_ID'],
    deploymentCommand: 'gaia deploy',
    healthCheckEndpoint: '/api/health'
  }
};

export const environmentalImpactWeights = {
  fileTypes: {
    '.js': 1.0,
    '.ts': 1.0,
    '.jsx': 1.1,
    '.tsx': 1.1,
    '.css': 0.5,
    '.scss': 0.6,
    '.html': 0.3,
    '.json': 0.2,
    '.md': 0.1
  },
  changeTypes: {
    add: 1.0,
    modify: 1.5,
    delete: 0.5,
    move: 1.2,
    rename: 0.8
  },
  pathMultipliers: {
    'node_modules/': 3.0,
    'dist/': 2.0,
    'build/': 2.0,
    'src/': 1.0,
    'public/': 0.8,
    'docs/': 0.3
  }
};

export const reputationWeights = {
  deploymentSuccess: 10,
  deploymentFailure: -5,
  communityVoteAccuracy: 5,
  communityVoteInaccuracy: -2,
  expertReviewProvided: 15,
  innovationBonus: 20,
  environmentalContribution: 8,
  consistencyBonus: 5,
  participationBonus: 2
};

export const achievementDefinitions = [
  {
    id: 'first_deployment',
    title: 'First Deployment',
    description: 'Successfully completed your first deployment',
    category: 'deployment',
    rarity: 'common',
    criteria: { deploymentContributions: 1 },
    value: 10
  },
  {
    id: 'eco_champion',
    title: 'Eco Champion',
    description: 'Contributed to 10+ environmental deployments',
    category: 'environmental',
    rarity: 'rare',
    criteria: { environmentalImpact: 10 },
    value: 50
  },
  {
    id: 'community_leader',
    title: 'Community Leader',
    description: 'Provided leadership in 5+ community votes',
    category: 'community',
    rarity: 'epic',
    criteria: { communityLeadership: 5 },
    value: 100
  },
  {
    id: 'innovation_master',
    title: 'Innovation Master',
    description: 'Recognized for exceptional innovation in deployments',
    category: 'innovation',
    rarity: 'legendary',
    criteria: { innovationBonus: 100 },
    value: 250
  },
  {
    id: 'security_guardian',
    title: 'Security Guardian',
    description: 'Prevented security vulnerabilities through expert review',
    category: 'security',
    rarity: 'epic',
    criteria: { securityReviews: 10 },
    value: 150
  }
];

export const riskThresholds = {
  low: {
    maxChanges: 10,
    maxSecurityFiles: 0,
    maxPerformanceImpact: 5,
    maxEnvironmentalImpact: 20
  },
  medium: {
    maxChanges: 50,
    maxSecurityFiles: 2,
    maxPerformanceImpact: 15,
    maxEnvironmentalImpact: 50
  },
  high: {
    maxChanges: 100,
    maxSecurityFiles: 5,
    maxPerformanceImpact: 30,
    maxEnvironmentalImpact: 100
  }
};

export const votingRules = {
  quorumRequirements: {
    low: 25, // % of eligible voters
    medium: 40,
    high: 60,
    critical: 75
  },
  approvalThresholds: {
    standard: 50, // % approval needed
    security: 75,
    environmental: 60,
    innovation: 40
  },
  expertRequirements: {
    security: 2, // minimum expert approvals
    performance: 1,
    environmental: 1,
    innovation: 1
  }
};