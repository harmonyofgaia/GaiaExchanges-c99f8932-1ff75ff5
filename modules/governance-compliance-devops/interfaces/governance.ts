// Governance Types
export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  type: ProposalType;
  proposer: string;
  createdAt: Date;
  votingStartTime: Date;
  votingEndTime: Date;
  status: ProposalStatus;
  votingMechanism: VotingMechanism;
  requirements: VotingRequirements;
  votes: Vote[];
  results?: ProposalResults;
  executionData?: any;
}

export type ProposalType = 
  | 'protocol_upgrade'
  | 'treasury_spending'
  | 'parameter_change'
  | 'community_initiative'
  | 'emergency_action';

export type ProposalStatus = 
  | 'draft'
  | 'active'
  | 'succeeded'
  | 'defeated'
  | 'executed'
  | 'expired'
  | 'cancelled';

export type VotingMechanism = 
  | 'simple_majority'
  | 'quadratic_voting'
  | 'ranked_choice'
  | 'approval_voting';

export interface VotingRequirements {
  quorum: number; // Minimum participation percentage
  threshold: number; // Minimum approval percentage
  minTokens: number; // Minimum tokens to vote
  eligibilitySnapshot: Date; // Token snapshot date
}

export interface Vote {
  id: string;
  proposalId: string;
  voter: string;
  power: number; // Voting power (tokens)
  choice: VoteChoice;
  reason?: string;
  timestamp: Date;
  delegatedFrom?: string[];
}

export type VoteChoice = 'for' | 'against' | 'abstain' | string[]; // string[] for ranked choice

export interface ProposalResults {
  totalVotes: number;
  totalPower: number;
  participationRate: number;
  breakdown: Record<string, number>;
  outcome: 'passed' | 'failed';
  executionScheduled?: Date;
}

// Compliance Types
export interface ComplianceCheck {
  id: string;
  type: ComplianceType;
  description: string;
  required: boolean;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastPerformed?: Date;
  nextDue: Date;
  status: ComplianceStatus;
  evidence?: ComplianceEvidence[];
}

export type ComplianceType = 
  | 'kyc_verification'
  | 'aml_screening'
  | 'transaction_monitoring'
  | 'data_protection'
  | 'financial_reporting'
  | 'security_audit';

export type ComplianceStatus = 
  | 'compliant'
  | 'non_compliant'
  | 'pending'
  | 'under_review'
  | 'exempted';

export interface ComplianceEvidence {
  id: string;
  type: 'document' | 'certification' | 'audit_report' | 'screenshot';
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  expiresAt?: Date;
  verified: boolean;
}

export interface RiskAssessment {
  id: string;
  entityId: string;
  entityType: 'user' | 'transaction' | 'smart_contract' | 'external_service';
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: RiskFactor[];
  mitigations: RiskMitigation[];
  assessedAt: Date;
  assessedBy: string;
  isActive: boolean;
}

export interface RiskFactor {
  type: string;
  description: string;
  impact: number; // 0-10
  likelihood: number; // 0-10
  weight: number;
}

export interface RiskMitigation {
  action: string;
  description: string;
  responsible: string;
  deadline: Date;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled';
}

// DevOps Types
export interface DeploymentPipeline {
  id: string;
  name: string;
  repository: string;
  branch: string;
  stages: PipelineStage[];
  triggers: PipelineTrigger[];
  status: PipelineStatus;
  lastRun?: PipelineRun;
  config: PipelineConfig;
}

export interface PipelineStage {
  id: string;
  name: string;
  type: 'build' | 'test' | 'security_scan' | 'deploy' | 'approve';
  dependencies: string[];
  timeout: number;
  config: Record<string, any>;
  isParallel: boolean;
}

export interface PipelineTrigger {
  type: 'push' | 'pull_request' | 'schedule' | 'manual';
  config: Record<string, any>;
  isActive: boolean;
}

export type PipelineStatus = 
  | 'idle'
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'paused';

export interface PipelineRun {
  id: string;
  pipelineId: string;
  trigger: string;
  startTime: Date;
  endTime?: Date;
  status: PipelineStatus;
  stages: StageRun[];
  artifacts: Artifact[];
  logs: LogEntry[];
}

export interface StageRun {
  stageId: string;
  startTime: Date;
  endTime?: Date;
  status: PipelineStatus;
  output?: string;
  artifacts?: Artifact[];
}

export interface Artifact {
  id: string;
  name: string;
  type: 'binary' | 'report' | 'image' | 'config';
  url: string;
  size: number;
  checksum: string;
  createdAt: Date;
}

export interface MonitoringAlert {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  conditions: AlertCondition[];
  actions: AlertAction[];
  isActive: boolean;
  lastTriggered?: Date;
  suppressUntil?: Date;
}

export interface AlertCondition {
  metric: string;
  operator: '>' | '<' | '=' | '>=' | '<=' | '!=';
  threshold: number;
  duration: number; // Seconds
}

export interface AlertAction {
  type: 'email' | 'sms' | 'webhook' | 'slack';
  config: Record<string, any>;
  delay?: number;
}

export interface LogEntry {
  timestamp: Date;
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  service: string;
  message: string;
  metadata?: Record<string, any>;
  traceId?: string;
}

export interface PipelineConfig {
  environment: Record<string, string>;
  secrets: string[];
  dockerRegistry?: string;
  kubernetesNamespace?: string;
  approvers?: string[];
  rollbackEnabled: boolean;
  autoPromote: boolean;
}

// Service Interfaces
export interface IGovernanceService {
  createProposal(proposal: Omit<DAOProposal, 'id' | 'createdAt' | 'status' | 'votes'>): Promise<DAOProposal>;
  getProposals(status?: ProposalStatus): Promise<DAOProposal[]>;
  vote(proposalId: string, choice: VoteChoice, power: number, reason?: string): Promise<Vote>;
  delegateVotes(delegatee: string, tokens: number): Promise<boolean>;
  executeProposal(proposalId: string): Promise<boolean>;
  getVotingPower(address: string, snapshotDate: Date): Promise<number>;
}

export interface IComplianceService {
  performCheck(checkId: string): Promise<ComplianceCheck>;
  getComplianceStatus(): Promise<ComplianceCheck[]>;
  assessRisk(entityId: string, entityType: RiskAssessment['entityType']): Promise<RiskAssessment>;
  reportCompliance(period: { start: Date; end: Date }, type: ComplianceType): Promise<Blob>;
  updateEvidence(checkId: string, evidence: Omit<ComplianceEvidence, 'id' | 'uploadedAt'>): Promise<ComplianceEvidence>;
}

export interface IDevOpsService {
  triggerPipeline(pipelineId: string, parameters?: Record<string, any>): Promise<PipelineRun>;
  getPipelineStatus(pipelineId: string): Promise<PipelineStatus>;
  deployToEnvironment(artifactId: string, environment: string): Promise<boolean>;
  rollbackDeployment(environment: string, version: string): Promise<boolean>;
  getMetrics(service: string, timeRange: { start: Date; end: Date }): Promise<Record<string, number[]>>;
  createAlert(alert: Omit<MonitoringAlert, 'id'>): Promise<MonitoringAlert>;
}