/**
 * Lovable Deployment Tool Module
 * 
 * Revolutionary additive-only deployment tool with multi-platform sync,
 * community approval workflow, and comprehensive environmental impact tracking.
 * 
 * Features:
 * - Additive-only deployment guarantees
 * - Multi-platform sync (Vercel, Netlify, Supabase, Lovable, Replit, etc.)
 * - Community approval workflow with AI-powered risk assessment
 * - Rollback, preview, and audit capabilities
 * - Supabase Diagnostics Service with auto-fix engine
 * - Impact/lovability scoring system
 * - Demo environments and community voting
 * - Adaptive rewards and soulbound reputation
 * - AI-powered risk checks and mitigation
 */

// Core interfaces
export * from './interfaces';

// Services
export * from './services';

// Components
export * from './components';

// Configuration
export * from './config';

// Utilities
export * from './utils';

// Main module metadata
export const MODULE_INFO = {
  name: 'Lovable Deployment Tool',
  version: '1.0.0',
  description: 'Additive-only deployment with community approval workflow',
  author: 'GaiaExchanges Team',
  masterPlanVersion: 'v3',
  features: [
    'Additive-Only Deployment Engine',
    'Multi-Platform Sync',
    'Community Approval Workflow',
    'AI-Powered Risk Assessment',
    'Supabase Diagnostics Service',
    'Auto-Fix Engine',
    'Rollback & Preview System',
    'Audit Log & Impact Tracking',
    'Lovability Scoring',
    'Demo Environments',
    'Community Voting',
    'Adaptive Rewards',
    'Soulbound Reputation',
    'Environmental Impact Tracking'
  ],
  platforms: [
    'GaiaExchanges',
    'Lovable',
    'Replit', 
    'Vercel',
    'Netlify',
    'Supabase'
  ],
  environmentalImpact: {
    carbonFootprintReduction: true,
    greenPlatformPriority: true,
    resourceOptimization: true,
    sustainabilityMetrics: true
  },
  security: {
    zeroTrustArchitecture: true,
    multiSignatureApprovals: true,
    immutableAuditTrail: true,
    complianceAutomation: true
  }
};

// Default export for easy module import
export default {
  ...MODULE_INFO,
  // Quick access to main components
  DeploymentDashboard: () => import('./components/DeploymentDashboard'),
  CommunityVoting: () => import('./components/CommunityVoting'),
  SupabaseDiagnosticsWidget: () => import('./components/SupabaseDiagnosticsWidget'),
  
  // Quick access to main services
  DeploymentService: () => import('./services/DeploymentService'),
  SupabaseDiagnosticsService: () => import('./services/SupabaseDiagnosticsService'),
  CommunityApprovalService: () => import('./services/CommunityApprovalService'),
  
  // Configuration
  config: () => import('./config'),
  
  // Utilities
  utils: () => import('./utils')
};