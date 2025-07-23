/**
 * Core Deployment Service
 * Handles the main deployment logic with additive-only guarantees
 */

import type {
  Deployment,
  DeploymentTarget,
  DeploymentChange,
  DeploymentResponse,
  DeploymentConfig,
  PlatformSyncResponse
} from '../interfaces';

export class DeploymentService {
  private config: DeploymentConfig;

  constructor(config: DeploymentConfig) {
    this.config = config;
  }

  /**
   * Validates that all changes are additive-only
   */
  validateAdditiveOnly(changes: DeploymentChange[]): { valid: boolean; violations: string[] } {
    const violations: string[] = [];

    for (const change of changes) {
      if (!this.config.additiveOnly) {
        continue; // Skip validation if additive-only is not enforced
      }

      switch (change.type) {
        case 'delete':
          violations.push(`Deletion of ${change.path} violates additive-only policy`);
          break;
        case 'modify':
          if (!this.isAdditiveModification(change)) {
            violations.push(`Modification of ${change.path} is not additive`);
          }
          break;
        case 'move':
        case 'rename':
          violations.push(`Moving/renaming ${change.path} violates additive-only policy`);
          break;
        case 'add':
          // Additions are always allowed
          break;
        default:
          violations.push(`Unknown change type for ${change.path}`);
      }
    }

    return {
      valid: violations.length === 0,
      violations
    };
  }

  /**
   * Checks if a modification is truly additive (e.g., appending to arrays, adding properties)
   */
  private isAdditiveModification(change: DeploymentChange): boolean {
    // This is a simplified check - in a real implementation, this would be much more sophisticated
    if (!change.oldValue || !change.newValue) {
      return false;
    }

    // If it's an object, check if new properties are only being added
    if (typeof change.oldValue === 'object' && typeof change.newValue === 'object') {
      const oldKeys = Object.keys(change.oldValue);
      const newKeys = Object.keys(change.newValue);

      // Check if all old keys are preserved
      const preservedKeys = oldKeys.every(key => key in change.newValue);
      if (!preservedKeys) {
        return false;
      }

      // Check if old values are unchanged
      const valuesUnchanged = oldKeys.every(key => 
        JSON.stringify(change.oldValue[key]) === JSON.stringify(change.newValue[key])
      );

      return valuesUnchanged;
    }

    // For arrays, check if elements are only being added
    if (Array.isArray(change.oldValue) && Array.isArray(change.newValue)) {
      if (change.newValue.length < change.oldValue.length) {
        return false; // Elements were removed
      }

      // Check if all original elements are preserved in order
      for (let i = 0; i < change.oldValue.length; i++) {
        if (JSON.stringify(change.oldValue[i]) !== JSON.stringify(change.newValue[i])) {
          return false;
        }
      }

      return true;
    }

    // For primitive values, any change is considered non-additive
    return false;
  }

  /**
   * Creates a new deployment
   */
  async createDeployment(
    version: string,
    changes: DeploymentChange[],
    targets: string[],
    createdBy: string
  ): Promise<DeploymentResponse> {
    try {
      // Validate additive-only compliance
      const validation = this.validateAdditiveOnly(changes);
      if (!validation.valid) {
        return {
          success: false,
          error: `Additive-only validation failed: ${validation.violations.join(', ')}`
        };
      }

      // Calculate environmental impact
      const environmentalImpact = this.calculateEnvironmentalImpact(changes);
      if (environmentalImpact > this.config.environmentalImpactThreshold) {
        return {
          success: false,
          error: `Environmental impact threshold exceeded: ${environmentalImpact} > ${this.config.environmentalImpactThreshold}`
        };
      }

      const deployment: Deployment = {
        id: this.generateId(),
        version,
        timestamp: new Date(),
        status: 'pending',
        changes,
        targets,
        createdBy,
        approvals: [],
        riskAssessment: await this.performRiskAssessment(changes),
        impactScore: await this.calculateLovabilityScore(changes),
        rollbackAvailable: true
      };

      // Store deployment (in a real implementation, this would persist to a database)
      await this.storeDeployment(deployment);

      return {
        success: true,
        deployment
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Calculates environmental impact of changes
   */
  private calculateEnvironmentalImpact(changes: DeploymentChange[]): number {
    let totalImpact = 0;

    for (const change of changes) {
      // Base impact based on change type
      switch (change.type) {
        case 'add':
          totalImpact += 1; // Adding new functionality has minimal impact
          break;
        case 'modify':
          totalImpact += 2; // Modifications require rebuilding
          break;
        case 'delete':
          totalImpact += 0.5; // Deletions reduce resource usage
          break;
        case 'move':
        case 'rename':
          totalImpact += 1.5; // Reorganization has medium impact
          break;
      }

      // Additional impact based on file type and size
      if (change.path.includes('.js') || change.path.includes('.ts')) {
        totalImpact += 0.5; // JavaScript files require processing
      }
      if (change.path.includes('.css')) {
        totalImpact += 0.3; // CSS files have lower impact
      }
      if (change.path.includes('node_modules')) {
        totalImpact += 2; // Dependencies have higher impact
      }
    }

    return totalImpact;
  }

  /**
   * Performs AI-powered risk assessment
   */
  private async performRiskAssessment(changes: DeploymentChange[]): Promise<any> {
    // In a real implementation, this would use ML models
    const riskFactors = [];
    let overallRisk: 'low' | 'medium' | 'high' | 'critical' = 'low';

    for (const change of changes) {
      if (change.path.includes('security') || change.path.includes('auth')) {
        riskFactors.push({
          type: 'security',
          severity: 'high',
          description: `Security-related change in ${change.path}`,
          mitigation: 'Require additional security review'
        });
        overallRisk = 'high';
      }

      if (change.path.includes('database') || change.path.includes('migration')) {
        riskFactors.push({
          type: 'performance',
          severity: 'medium',
          description: `Database change in ${change.path}`,
          mitigation: 'Test performance impact in staging'
        });
      }
    }

    return {
      overallRisk,
      factors: riskFactors,
      mitigationStrategies: ['Staged rollout', 'Monitoring alerts', 'Rollback plan'],
      aiConfidence: 85,
      historicalPatterns: [],
      recommendedActions: ['Review security implications', 'Test in preview environment']
    };
  }

  /**
   * Calculates lovability score for deployment
   */
  private async calculateLovabilityScore(changes: DeploymentChange[]): Promise<any> {
    // Simplified scoring algorithm
    let communitySatisfaction = 75;
    let performanceImpact = 80;
    let environmentalBenefit = 85;
    let innovationRecognition = 70;
    let longTermValue = 78;

    // Adjust based on change types
    const hasNewFeatures = changes.some(c => c.type === 'add' && c.path.includes('component'));
    if (hasNewFeatures) {
      communitySatisfaction += 10;
      innovationRecognition += 15;
    }

    const hasPerformanceOptimizations = changes.some(c => 
      c.path.includes('optimization') || c.path.includes('performance')
    );
    if (hasPerformanceOptimizations) {
      performanceImpact += 15;
      environmentalBenefit += 10;
    }

    const overall = Math.round(
      (communitySatisfaction + performanceImpact + environmentalBenefit + 
       innovationRecognition + longTermValue) / 5
    );

    return {
      overall,
      communitySatisfaction,
      performanceImpact,
      environmentalBenefit,
      innovationRecognition,
      longTermValue,
      lastUpdated: new Date(),
      breakdown: [
        {
          category: 'Community Satisfaction',
          score: communitySatisfaction,
          weight: 0.2,
          factors: ['User feedback', 'Feature requests fulfilled']
        },
        {
          category: 'Performance Impact',
          score: performanceImpact,
          weight: 0.2,
          factors: ['Load time improvements', 'Resource optimization']
        },
        {
          category: 'Environmental Benefit',
          score: environmentalBenefit,
          weight: 0.25,
          factors: ['Carbon footprint reduction', 'Green practices']
        },
        {
          category: 'Innovation Recognition',
          score: innovationRecognition,
          weight: 0.15,
          factors: ['Novel approaches', 'Creative solutions']
        },
        {
          category: 'Long-term Value',
          score: longTermValue,
          weight: 0.2,
          factors: ['Maintainability', 'Scalability', 'Future-proofing']
        }
      ]
    };
  }

  /**
   * Deploys to multiple platforms
   */
  async deployToTargets(deploymentId: string, targets: DeploymentTarget[]): Promise<PlatformSyncResponse> {
    const syncedTargets: string[] = [];
    const failedTargets: { target: string; error: string }[] = [];
    const warnings: string[] = [];

    for (const target of targets) {
      try {
        const result = await this.deployToTarget(deploymentId, target);
        if (result.success) {
          syncedTargets.push(target.id);
          if (result.warnings) {
            warnings.push(...result.warnings);
          }
        } else {
          failedTargets.push({
            target: target.id,
            error: result.error || 'Unknown error'
          });
        }
      } catch (error) {
        failedTargets.push({
          target: target.id,
          error: error instanceof Error ? error.message : 'Deployment failed'
        });
      }
    }

    return {
      success: failedTargets.length === 0,
      syncedTargets,
      failedTargets: failedTargets.length > 0 ? failedTargets : undefined,
      warnings: warnings.length > 0 ? warnings : undefined
    };
  }

  /**
   * Deploys to a specific target platform
   */
  private async deployToTarget(deploymentId: string, target: DeploymentTarget): Promise<any> {
    // Platform-specific deployment logic
    switch (target.type) {
      case 'vercel':
        return await this.deployToVercel(deploymentId, target);
      case 'netlify':
        return await this.deployToNetlify(deploymentId, target);
      case 'supabase':
        return await this.deployToSupabase(deploymentId, target);
      case 'lovable':
        return await this.deployToLovable(deploymentId, target);
      case 'replit':
        return await this.deployToReplit(deploymentId, target);
      case 'gaiaexchanges':
        return await this.deployToGaiaExchanges(deploymentId, target);
      default:
        throw new Error(`Unsupported target type: ${target.type}`);
    }
  }

  // Platform-specific deployment methods (stubs for now)
  private async deployToVercel(deploymentId: string, target: DeploymentTarget): Promise<any> {
    // Vercel deployment logic
    return { success: true, warnings: ['Vercel deployment is in preview mode'] };
  }

  private async deployToNetlify(deploymentId: string, target: DeploymentTarget): Promise<any> {
    // Netlify deployment logic
    return { success: true };
  }

  private async deployToSupabase(deploymentId: string, target: DeploymentTarget): Promise<any> {
    // Supabase deployment logic
    return { success: true };
  }

  private async deployToLovable(deploymentId: string, target: DeploymentTarget): Promise<any> {
    // Lovable deployment logic
    return { success: true };
  }

  private async deployToReplit(deploymentId: string, target: DeploymentTarget): Promise<any> {
    // Replit deployment logic
    return { success: true };
  }

  private async deployToGaiaExchanges(deploymentId: string, target: DeploymentTarget): Promise<any> {
    // GaiaExchanges deployment logic
    return { success: true };
  }

  /**
   * Utility methods
   */
  private generateId(): string {
    return `deploy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async storeDeployment(deployment: Deployment): Promise<void> {
    // In a real implementation, this would persist to a database
    console.log('Storing deployment:', deployment.id);
  }
}