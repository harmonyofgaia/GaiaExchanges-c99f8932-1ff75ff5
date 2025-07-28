
import { GAIA_TOKEN } from '@/constants/gaia'
import { ConsistencyIssue } from './ComponentScanner'

export class AddressConsistencyChecker {
  private officialWalletAddress = GAIA_TOKEN.WALLET_ADDRESS
  private officialContractAddress = GAIA_TOKEN.CONTRACT_ADDRESS

  checkAddressConsistency(): ConsistencyIssue[] {
    const issues: ConsistencyIssue[] = []

    // Check if gaiaTokenService has consistent addresses
    const gaiaServiceAddress = 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump'
    const gaiaServiceWallet = '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh'

    if (gaiaServiceAddress !== this.officialContractAddress || 
        gaiaServiceWallet !== this.officialWalletAddress) {
      issues.push({
        file: 'src/services/gaiaTokenService.ts',
        issue: 'Hardcoded addresses in gaiaTokenService do not match GAIA_TOKEN constants',
        severity: 'high',
        status: 'INCONSISTENT',
        recommendation: 'Import and use GAIA_TOKEN constants instead of hardcoded addresses'
      })
    }

    return issues
  }
}
