/**
 * Core interfaces for the Lovable Deployment Tool
 * Defines the structure for deployment operations, platform integrations, and community approval workflows
 */

export interface DeploymentTarget {
  id: string;
  name: string;
  type: 'lovable' | 'replit' | 'vercel' | 'netlify' | 'supabase' | 'gaiaexchanges' | 'custom';
  url: string;
  credentials: Record<string, string>;
  healthStatus: 'healthy' | 'warning' | 'error' | 'offline';
  lastSync: Date;
  config: PlatformConfig;
}

export interface PlatformConfig {
  autoSync: boolean;
  requireApproval: boolean;
  rollbackEnabled: boolean;
  previewEnvironment: boolean;
  environmentalImpactTracking: boolean;
  communityVoting: boolean;
}

export interface Deployment {
  id: string;
  version: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected' | 'deployed' | 'failed' | 'rolled_back';
  changes: DeploymentChange[];
  targets: string[]; // DeploymentTarget IDs
  createdBy: string;
  approvals: Approval[];
  riskAssessment: RiskAssessment;
  impactScore: LovabilityScore;
  previewUrl?: string;
  rollbackAvailable: boolean;
}

export interface DeploymentChange {
  id: string;
  type: 'add' | 'modify' | 'delete' | 'move' | 'rename';
  path: string;
  oldValue?: any;
  newValue?: any;
  isAdditive: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  environmentalImpact: number; // Carbon footprint score
}

export interface Approval {
  id: string;
  approverType: 'ai_copilot' | 'community' | 'expert' | 'automated';
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
  comments?: string;
  riskConcerns?: string[];
  votingPower?: number;
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  mitigationStrategies: string[];
  aiConfidence: number; // 0-100
  historicalPatterns: string[];
  recommendedActions: string[];
}

export interface RiskFactor {
  type: 'security' | 'performance' | 'compatibility' | 'environmental' | 'user_experience';
  severity: 'low' | 'medium' | 'high';
  description: string;
  mitigation?: string;
}

export interface LovabilityScore {
  overall: number; // 0-100
  communitySatisfaction: number;
  performanceImpact: number;
  environmentalBenefit: number;
  innovationRecognition: number;
  longTermValue: number;
  lastUpdated: Date;
  breakdown: ScoreBreakdown[];
}

export interface ScoreBreakdown {
  category: string;
  score: number;
  weight: number;
  factors: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  deploymentId?: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  environmentalImpact?: number;
}

export interface PreviewEnvironment {
  id: string;
  deploymentId: string;
  url: string;
  status: 'creating' | 'ready' | 'failed' | 'expired';
  expiresAt: Date;
  createdAt: Date;
  resourceUsage: ResourceUsage;
}

export interface ResourceUsage {
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  carbonFootprint: number; // CO2 equivalent in grams
}

export interface CommunityVote {
  id: string;
  deploymentId: string;
  voter: string;
  vote: 'approve' | 'reject' | 'abstain';
  timestamp: Date;
  reason?: string;
  expertise: string[];
  votingPower: number;
  soulboundReputation: number;
}

export interface SoulboundReputation {
  userId: string;
  totalScore: number;
  deploymentContributions: number;
  communityLeadership: number;
  innovationBonus: number;
  environmentalImpact: number;
  consistencyScore: number;
  achievements: Achievement[];
  lastUpdated: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'deployment' | 'community' | 'innovation' | 'environmental' | 'security';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  value: number;
}

export interface SupabaseDiagnostics {
  instanceId: string;
  healthStatus: 'healthy' | 'warning' | 'error';
  warnings: DiagnosticWarning[];
  errors: DiagnosticError[];
  performanceMetrics: PerformanceMetrics;
  lastScan: Date;
  autoFixAvailable: boolean;
  recommendedActions: RecommendedAction[];
}

export interface DiagnosticWarning {
  id: string;
  type: 'configuration' | 'performance' | 'security' | 'resource';
  severity: 'low' | 'medium' | 'high';
  message: string;
  details: string;
  autoFixable: boolean;
  estimatedImpact: string;
}

export interface DiagnosticError {
  id: string;
  type: 'database' | 'api' | 'authentication' | 'storage';
  severity: 'medium' | 'high' | 'critical';
  message: string;
  stackTrace?: string;
  resolution?: string;
  occurrences: number;
  firstSeen: Date;
  lastSeen: Date;
}

export interface PerformanceMetrics {
  queryLatency: number;
  connectionCount: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  apiResponseTime: number;
  errorRate: number;
  throughput: number;
}

export interface RecommendedAction {
  id: string;
  type: 'fix' | 'optimize' | 'upgrade' | 'investigate';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  estimatedTime: string;
  environmentalBenefit?: number;
  communityImpact?: string;
  autoExecutable: boolean;
}

export interface DemoEnvironment {
  id: string;
  name: string;
  description: string;
  type: 'feature_showcase' | 'training' | 'stakeholder_demo' | 'community_exploration';
  url: string;
  status: 'active' | 'inactive' | 'maintenance';
  features: string[];
  targetAudience: string[];
  accessLevel: 'public' | 'restricted' | 'private';
  analytics: DemoAnalytics;
}

export interface DemoAnalytics {
  totalVisits: number;
  uniqueVisitors: number;
  averageSessionTime: number;
  featureEngagement: Record<string, number>;
  userFeedback: UserFeedback[];
  conversionRate: number;
}

export interface UserFeedback {
  id: string;
  rating: number; // 1-5
  comment?: string;
  features: string[];
  timestamp: Date;
  userId?: string;
}

export interface AdaptiveReward {
  userId: string;
  deploymentId: string;
  baseReward: number;
  multipliers: RewardMultiplier[];
  totalReward: number;
  rewardType: 'tokens' | 'reputation' | 'access' | 'recognition';
  timestamp: Date;
  description: string;
}

export interface RewardMultiplier {
  type: 'innovation' | 'community_leadership' | 'emergency_response' | 'consistency' | 'environmental_impact';
  factor: number;
  reason: string;
}

// API Response types
export interface DeploymentResponse {
  success: boolean;
  deployment?: Deployment;
  error?: string;
  warnings?: string[];
}

export interface ApprovalResponse {
  success: boolean;
  approval?: Approval;
  error?: string;
}

export interface RollbackResponse {
  success: boolean;
  rolledBackTo?: string;
  error?: string;
  affectedTargets?: string[];
}

export interface PlatformSyncResponse {
  success: boolean;
  syncedTargets?: string[];
  failedTargets?: { target: string; error: string }[];
  warnings?: string[];
}

// Configuration types
export interface DeploymentConfig {
  additiveOnly: boolean;
  requireCommunityApproval: boolean;
  minimumApprovals: number;
  autoRollbackOnFailure: boolean;
  previewEnvironmentDuration: number; // hours
  maxRiskLevel: 'low' | 'medium' | 'high';
  environmentalImpactThreshold: number;
}

export interface AIConfig {
  riskAssessmentModel: string;
  confidenceThreshold: number;
  learningEnabled: boolean;
  expertValidationRequired: boolean;
  mitigationSuggestions: boolean;
}

export interface CommunityConfig {
  votingPeriod: number; // hours
  quorumPercentage: number;
  expertWeight: number;
  reputationWeight: boolean;
  appealPeriod: number; // hours
}