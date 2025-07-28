
import { GAIA_TOKEN } from '@/constants/gaia'

export interface ComponentIntegration {
  name: string
  path: string
  hasGaiaIntegration: boolean
  integrationLevel: 'FULL' | 'PARTIAL' | 'NONE'
  issues: ConsistencyIssue[]
}

export interface ConsistencyIssue {
  file: string
  issue: string
  severity: 'high' | 'medium' | 'low'
  status: 'NEEDS_UPDATE' | 'INCONSISTENT' | 'MISSING' | 'OK'
  recommendation: string
}

export class ComponentScanner {
  private requiredIntegrationPatterns = [
    'Exchange', 'Wallet', 'Token', 'Coin', 'Trading', 'Market', 'NFT',
    'Reward', 'Staking', 'Mining', 'Burn', 'Vault', 'Payment', 'Fee'
  ]

  async checkComponentIntegration(component: any): Promise<ComponentIntegration> {
    const issues: ConsistencyIssue[] = []
    
    const shouldHaveIntegration = this.requiredIntegrationPatterns.some(pattern => 
      component.name.toLowerCase().includes(pattern.toLowerCase()) ||
      component.path.toLowerCase().includes(pattern.toLowerCase())
    )

    let hasGaiaIntegration = false
    let integrationLevel: 'FULL' | 'PARTIAL' | 'NONE' = 'NONE'

    const knownIntegratedComponents = [
      'GaiaTokenService', 'GAIA_TOKEN Constants', 'useGaiaTokenData Hook',
      'Wallet Page', 'TransparentWallet Page', 'VaultSystem Page',
      'AnimatedCoinCrafting', 'LiveTVScreen'
    ]

    const partiallyIntegratedComponents = [
      'Exchange Page', 'TokenMining Page'
    ]

    const notIntegratedComponents = [
      'CoinCrafter Page', 'FeeVault Page', 'MusicPlatform Page'
    ]

    if (knownIntegratedComponents.includes(component.name)) {
      hasGaiaIntegration = true
      integrationLevel = 'FULL'
    } else if (partiallyIntegratedComponents.includes(component.name)) {
      hasGaiaIntegration = true
      integrationLevel = 'PARTIAL'
      issues.push({
        file: component.path,
        issue: 'Component has partial GAiA token integration but could be enhanced',
        severity: 'medium',
        status: 'NEEDS_UPDATE',
        recommendation: 'Add full GAiA token integration with official addresses and branding'
      })
    } else if (notIntegratedComponents.includes(component.name) && shouldHaveIntegration) {
      integrationLevel = 'NONE'
      issues.push({
        file: component.path,
        issue: 'Component should have GAiA token integration but currently missing',
        severity: 'high',
        status: 'MISSING',
        recommendation: 'Implement GAiA token integration using GAIA_TOKEN constants'
      })
    }

    return {
      name: component.name,
      path: component.path,
      hasGaiaIntegration,
      integrationLevel,
      issues
    }
  }
}
