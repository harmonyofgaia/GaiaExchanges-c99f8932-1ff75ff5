
import { GAIA_TOKEN } from '@/constants/gaia'
import { ComponentScanner, ConsistencyIssue, ComponentIntegration } from './consistency/ComponentScanner'
import { AddressConsistencyChecker } from './consistency/AddressConsistencyChecker'

// Export the types for external use
export type { ConsistencyIssue, ComponentIntegration } from './consistency/ComponentScanner'

class GaiaConsistencyScanner {
  private componentScanner = new ComponentScanner()
  private addressChecker = new AddressConsistencyChecker()

  async scanSystemConsistency(): Promise<{
    overallStatus: 'CONSISTENT' | 'NEEDS_UPDATE' | 'INCONSISTENT'
    issues: ConsistencyIssue[]
    componentIntegrations: ComponentIntegration[]
    summary: {
      totalComponents: number
      fullyIntegrated: number
      partiallyIntegrated: number
      notIntegrated: number
      criticalIssues: number
    }
  }> {
    console.log('🔍 Starting GAiA Token Consistency Scan - Optimized...')
    
    const issues: ConsistencyIssue[] = []
    const componentIntegrations: ComponentIntegration[] = []

    // Optimized component list - focused on core components only
    const coreComponents = [
      { name: 'GaiaTokenService', path: 'src/services/gaiaTokenService.ts', type: 'service' },
      { name: 'GAIA_TOKEN Constants', path: 'src/constants/gaia.ts', type: 'constants' },
      { name: 'useGaiaTokenData Hook', path: 'src/hooks/useGaiaTokenData.ts', type: 'hook' },
      { name: 'Wallet Page', path: 'src/pages/Wallet.tsx', type: 'page' },
      { name: 'TransparentWallet Page', path: 'src/pages/TransparentWallet.tsx', type: 'page' },
      { name: 'VaultSystem Page', path: 'src/pages/VaultSystem.tsx', type: 'page' },
    ]

    for (const component of coreComponents) {
      const integration = await this.componentScanner.checkComponentIntegration(component)
      componentIntegrations.push(integration)
      issues.push(...integration.issues)
    }

    // Check address consistency
    const addressIssues = this.addressChecker.checkAddressConsistency()
    issues.push(...addressIssues)

    // Determine overall status
    const criticalIssues = issues.filter(i => i.severity === 'high').length
    const needsUpdateIssues = issues.filter(i => i.status === 'NEEDS_UPDATE').length
    
    let overallStatus: 'CONSISTENT' | 'NEEDS_UPDATE' | 'INCONSISTENT' = 'CONSISTENT'
    if (issues.filter(i => i.status === 'INCONSISTENT').length > 0) {
      overallStatus = 'INCONSISTENT'
    } else if (needsUpdateIssues > 0 || criticalIssues > 0) {
      overallStatus = 'NEEDS_UPDATE'
    }

    const summary = {
      totalComponents: componentIntegrations.length,
      fullyIntegrated: componentIntegrations.filter(c => c.integrationLevel === 'FULL').length,
      partiallyIntegrated: componentIntegrations.filter(c => c.integrationLevel === 'PARTIAL').length,
      notIntegrated: componentIntegrations.filter(c => c.integrationLevel === 'NONE').length,
      criticalIssues
    }

    console.log(`✅ GAiA Consistency Scan Complete. Status: ${overallStatus}`)
    
    return {
      overallStatus,
      issues,
      componentIntegrations,
      summary
    }
  }

  async getDetailedReport(): Promise<string> {
    const scanResult = await this.scanSystemConsistency()
    
    let report = `🌍 GAiA TOKEN CONSISTENCY SCAN REPORT - OPTIMIZED
=====================================
Overall Status: ${scanResult.overallStatus}
Components: ${scanResult.summary.fullyIntegrated}/${scanResult.summary.totalComponents} integrated
`

    if (scanResult.issues.length > 0) {
      report += `\nISSUES FOUND:\n`
      scanResult.issues.slice(0, 5).forEach((issue) => {
        const icon = issue.severity === 'high' ? '🚨' : '⚠️'
        report += `${icon} ${issue.status}: ${issue.issue}\n`
      })
    } else {
      report += `\n✅ System is consistent and optimized.\n`
    }

    return report
  }
}

export const gaiaConsistencyScanner = new GaiaConsistencyScanner()
