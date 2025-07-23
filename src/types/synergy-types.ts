/**
 * Cross-Project Synergy System Types
 * Defines types for token synergy, cross-project interactions, and unified progress tracking
 */

export interface HarmonyPoints {
  total: number;
  balance: number;
  earned: number;
  spent: number;
  multiplier: number;
}

export interface ProjectToken {
  projectId: string;
  tokenType: string;
  amount: number;
  earned: Date;
  source: string;
  transferable: boolean;
}

export interface TokenSynergy {
  sourceProject: string;
  targetProject: string;
  sourceTokens: ProjectToken[];
  exchangeRate: number;
  bonusMultiplier: number;
  unlockConditions: string[];
}

export interface SkillTransfer {
  id: string;
  sourceProject: string;
  targetProject: string;
  skillType: string;
  level: number;
  bonusPercentage: number;
  description: string;
}

export interface CrossProjectMission {
  id: string;
  title: string;
  description: string;
  requiredProjects: string[];
  rewards: ProjectToken[];
  harmonyPointsReward: number;
  duration: number;
  participants: number;
  maxParticipants: number;
  status: 'active' | 'completed' | 'upcoming';
}

export interface ProjectProgress {
  projectId: string;
  projectName: string;
  level: number;
  experience: number;
  achievements: string[];
  tokensEarned: ProjectToken[];
  participationDays: number;
  lastActive: Date;
}

export interface UnifiedDashboard {
  harmonyPoints: HarmonyPoints;
  projectProgress: ProjectProgress[];
  activeTokenSynergies: TokenSynergy[];
  availableSkillTransfers: SkillTransfer[];
  crossProjectMissions: CrossProjectMission[];
  globalRank: number;
  impactScore: number;
}

export interface EventBonus {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  applicableProjects: string[];
  startDate: Date;
  endDate: Date;
  conditions: string[];
}

export interface GlobalRecognition {
  badgeId: string;
  name: string;
  description: string;
  criteria: string[];
  projectsRequired: string[];
  harmonyPointsRequired: number;
  earned: boolean;
  earnedDate?: Date;
}

export interface SmartReferral {
  referrerId: string;
  refereeId: string;
  projectsShared: string[];
  bonusTokens: ProjectToken[];
  harmonyPointsBonus: number;
  status: 'pending' | 'active' | 'completed';
}

export interface ImpactInvestment {
  id: string;
  projectId: string;
  amount: number;
  investmentDate: Date;
  expectedReturns: number;
  actualReturns: number;
  environmentalImpact: {
    co2Reduced: number;
    treesPlanted: number;
    waterSaved: number;
    wildlifeProtected: number;
  };
}