/**
 * Utility functions for Lovable Deployment Tool
 */

import type { DeploymentChange, SoulboundReputation, Achievement } from '../interfaces';
import { environmentalImpactWeights, reputationWeights, achievementDefinitions } from '../config';

/**
 * Calculates environmental impact score for deployment changes
 */
export function calculateEnvironmentalImpact(changes: DeploymentChange[]): number {
  let totalImpact = 0;

  for (const change of changes) {
    let changeImpact = 0;

    // Base impact by change type
    const typeWeight = environmentalImpactWeights.changeTypes[change.type] || 1;
    changeImpact += typeWeight;

    // File type multiplier
    const fileExtension = change.path.substring(change.path.lastIndexOf('.'));
    const fileWeight = environmentalImpactWeights.fileTypes[fileExtension] || 1;
    changeImpact *= fileWeight;

    // Path multiplier
    const pathMultiplier = Object.entries(environmentalImpactWeights.pathMultipliers)
      .find(([path]) => change.path.includes(path))?.[1] || 1;
    changeImpact *= pathMultiplier;

    // Size factor (if available)
    if (change.newValue && typeof change.newValue === 'string') {
      const sizeMultiplier = Math.min(change.newValue.length / 1000, 5); // Cap at 5x
      changeImpact *= (1 + sizeMultiplier * 0.1);
    }

    totalImpact += changeImpact;
  }

  return Math.round(totalImpact * 10) / 10; // Round to 1 decimal place
}

/**
 * Validates that changes are truly additive-only
 */
export function validateAdditiveChanges(changes: DeploymentChange[]): {
  valid: boolean;
  violations: string[];
  additiveRatio: number;
} {
  const violations: string[] = [];
  let additiveCount = 0;

  for (const change of changes) {
    switch (change.type) {
      case 'delete':
        violations.push(`Deletion of ${change.path} violates additive-only policy`);
        break;
      case 'add':
        additiveCount++;
        break;
      case 'modify':
        if (isAdditiveModification(change)) {
          additiveCount++;
        } else {
          violations.push(`Non-additive modification of ${change.path}`);
        }
        break;
      case 'move':
      case 'rename':
        violations.push(`Moving/renaming ${change.path} violates additive-only policy`);
        break;
    }
  }

  const additiveRatio = changes.length > 0 ? additiveCount / changes.length : 1;

  return {
    valid: violations.length === 0,
    violations,
    additiveRatio
  };
}

/**
 * Checks if a modification is additive (e.g., adding properties, appending to arrays)
 */
function isAdditiveModification(change: DeploymentChange): boolean {
  if (!change.oldValue || !change.newValue) {
    return false;
  }

  try {
    const oldVal = typeof change.oldValue === 'string' 
      ? JSON.parse(change.oldValue) 
      : change.oldValue;
    const newVal = typeof change.newValue === 'string' 
      ? JSON.parse(change.newValue) 
      : change.newValue;

    // For objects, check if new properties are only being added
    if (typeof oldVal === 'object' && typeof newVal === 'object' && !Array.isArray(oldVal)) {
      const oldKeys = Object.keys(oldVal);
      const newKeys = Object.keys(newVal);

      // All old keys must be preserved
      const allOldKeysPreserved = oldKeys.every(key => key in newVal);
      if (!allOldKeysPreserved) return false;

      // All old values must be unchanged
      const allValuesUnchanged = oldKeys.every(key => 
        JSON.stringify(oldVal[key]) === JSON.stringify(newVal[key])
      );

      return allValuesUnchanged;
    }

    // For arrays, check if elements are only being added
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      if (newVal.length < oldVal.length) return false;

      // All original elements must be preserved in order
      for (let i = 0; i < oldVal.length; i++) {
        if (JSON.stringify(oldVal[i]) !== JSON.stringify(newVal[i])) {
          return false;
        }
      }

      return true;
    }

    // For primitive values, any change is considered non-additive
    return false;
  } catch {
    // If parsing fails, consider it non-additive
    return false;
  }
}

/**
 * Calculates voting power based on reputation and expertise
 */
export function calculateVotingPower(
  reputation: SoulboundReputation,
  expertise: string[],
  deploymentContext?: string[]
): number {
  let basePower = 1;

  // Reputation multiplier (0.5x to 3x based on total score)
  const reputationMultiplier = Math.min(Math.max(reputation.totalScore / 1000, 0.5), 3);
  basePower *= reputationMultiplier;

  // Expertise bonus
  const expertiseBonus = expertise.length * 0.1;
  basePower += expertiseBonus;

  // Contextual expertise bonus
  if (deploymentContext && expertise.some(skill => 
    deploymentContext.some(context => context.includes(skill))
  )) {
    basePower += 0.3; // 30% bonus for relevant expertise
  }

  // Consistency bonus
  const consistencyBonus = (reputation.consistencyScore / 100) * 0.5;
  basePower += consistencyBonus;

  // Environmental impact bonus
  const envImpactBonus = Math.min(reputation.environmentalImpact / 100, 0.5);
  basePower += envImpactBonus;

  return Math.round(basePower * 100) / 100; // Round to 2 decimal places
}

/**
 * Updates reputation based on various actions
 */
export function calculateReputationUpdate(
  currentReputation: SoulboundReputation,
  action: 'deployment_success' | 'deployment_failure' | 'vote_accurate' | 'vote_inaccurate' | 'expert_review' | 'innovation',
  context?: { environmentalImpact?: number; innovationScore?: number }
): Partial<SoulboundReputation> {
  const updates: Partial<SoulboundReputation> = {
    lastUpdated: new Date()
  };

  let scoreChange = 0;

  switch (action) {
    case 'deployment_success':
      scoreChange = reputationWeights.deploymentSuccess;
      updates.deploymentContributions = (currentReputation.deploymentContributions || 0) + 1;
      if (context?.environmentalImpact && context.environmentalImpact > 0) {
        scoreChange += reputationWeights.environmentalContribution;
        updates.environmentalImpact = (currentReputation.environmentalImpact || 0) + context.environmentalImpact;
      }
      break;
    
    case 'deployment_failure':
      scoreChange = reputationWeights.deploymentFailure;
      break;
    
    case 'vote_accurate':
      scoreChange = reputationWeights.communityVoteAccuracy;
      break;
    
    case 'vote_inaccurate':
      scoreChange = reputationWeights.communityVoteInaccuracy;
      break;
    
    case 'expert_review':
      scoreChange = reputationWeights.expertReviewProvided;
      updates.communityLeadership = (currentReputation.communityLeadership || 0) + 1;
      break;
    
    case 'innovation':
      scoreChange = reputationWeights.innovationBonus;
      if (context?.innovationScore) {
        scoreChange += context.innovationScore;
        updates.innovationBonus = (currentReputation.innovationBonus || 0) + context.innovationScore;
      }
      break;
  }

  updates.totalScore = Math.max(0, currentReputation.totalScore + scoreChange);

  // Update consistency score based on recent activity
  updates.consistencyScore = calculateConsistencyScore(currentReputation);

  return updates;
}

/**
 * Calculates consistency score based on activity patterns
 */
function calculateConsistencyScore(reputation: SoulboundReputation): number {
  // Simplified consistency calculation
  const totalActivities = (reputation.deploymentContributions || 0) + 
                         (reputation.communityLeadership || 0);
  
  if (totalActivities === 0) return 0;

  // Base consistency on participation frequency and quality
  const participationScore = Math.min(totalActivities * 2, 60);
  const qualityScore = Math.min(reputation.totalScore / 10, 40);
  
  return Math.min(participationScore + qualityScore, 100);
}

/**
 * Checks for new achievement unlocks
 */
export function checkAchievementUnlocks(
  reputation: SoulboundReputation,
  currentAchievements: Achievement[]
): Achievement[] {
  const newAchievements: Achievement[] = [];
  const currentAchievementIds = new Set(currentAchievements.map(a => a.id));

  for (const definition of achievementDefinitions) {
    if (currentAchievementIds.has(definition.id)) continue;

    let unlocked = true;
    for (const [criterion, threshold] of Object.entries(definition.criteria)) {
      const currentValue = (reputation as any)[criterion] || 0;
      if (currentValue < threshold) {
        unlocked = false;
        break;
      }
    }

    if (unlocked) {
      newAchievements.push({
        id: definition.id,
        title: definition.title,
        description: definition.description,
        category: definition.category as any,
        rarity: definition.rarity as any,
        unlockedAt: new Date(),
        value: definition.value
      });
    }
  }

  return newAchievements;
}

/**
 * Generates a unique ID for various entities
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
}

/**
 * Formats time duration in human-readable format
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

/**
 * Validates platform configuration
 */
export function validatePlatformConfig(platform: string, config: Record<string, any>): {
  valid: boolean;
  missingVars: string[];
} {
  const platformConfig = (window as any).platformConfigs?.[platform];
  if (!platformConfig) {
    return { valid: false, missingVars: [`Unknown platform: ${platform}`] };
  }

  const missingVars = platformConfig.requiredEnvVars.filter((envVar: string) => 
    !config[envVar] || config[envVar].trim() === ''
  );

  return {
    valid: missingVars.length === 0,
    missingVars
  };
}

/**
 * Calculates lovability score components
 */
export function calculateLovabilityScore(
  changes: DeploymentChange[],
  communityFeedback?: number,
  performanceMetrics?: number,
  environmentalBenefit?: number
): {
  overall: number;
  communitySatisfaction: number;
  performanceImpact: number;
  environmentalBenefit: number;
  innovationRecognition: number;
  longTermValue: number;
} {
  // Base scores
  let communitySatisfaction = communityFeedback || 75;
  let performanceImpact = performanceMetrics || 80;
  let envBenefit = environmentalBenefit || calculateEnvironmentalImpact(changes) * 2;
  let innovationRecognition = 70;
  let longTermValue = 75;

  // Adjust based on changes
  const hasNewFeatures = changes.some(c => c.type === 'add' && c.path.includes('component'));
  if (hasNewFeatures) {
    communitySatisfaction += 10;
    innovationRecognition += 15;
  }

  const hasOptimizations = changes.some(c => 
    c.path.includes('optimization') || c.path.includes('performance')
  );
  if (hasOptimizations) {
    performanceImpact += 15;
    envBenefit += 10;
  }

  // Ensure scores are within bounds
  communitySatisfaction = Math.min(100, Math.max(0, communitySatisfaction));
  performanceImpact = Math.min(100, Math.max(0, performanceImpact));
  envBenefit = Math.min(100, Math.max(0, envBenefit));
  innovationRecognition = Math.min(100, Math.max(0, innovationRecognition));
  longTermValue = Math.min(100, Math.max(0, longTermValue));

  const overall = Math.round(
    (communitySatisfaction + performanceImpact + envBenefit + 
     innovationRecognition + longTermValue) / 5
  );

  return {
    overall,
    communitySatisfaction,
    performanceImpact,
    environmentalBenefit: envBenefit,
    innovationRecognition,
    longTermValue
  };
}