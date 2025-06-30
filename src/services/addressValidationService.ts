
import { GAIA_TOKEN } from '@/constants/gaia'

class AddressValidationService {
  private readonly CORRECT_WALLET = '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh'
  private readonly CORRECT_CONTRACT = '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh'

  validateWalletAddress(address: string): boolean {
    if (address !== this.CORRECT_WALLET) {
      console.error(`🚨 INCORRECT WALLET ADDRESS DETECTED: ${address}`)
      console.error(`✅ CORRECT WALLET SHOULD BE: ${this.CORRECT_WALLET}`)
      return false
    }
    return true
  }

  validateContractAddress(address: string): boolean {
    if (address !== this.CORRECT_CONTRACT) {
      console.error(`🚨 INCORRECT CONTRACT ADDRESS DETECTED: ${address}`)
      console.error(`✅ CORRECT CONTRACT SHOULD BE: ${this.CORRECT_CONTRACT}`)
      return false
    }
    return true
  }

  getCorrectWalletAddress(): string {
    return this.CORRECT_WALLET
  }

  getCorrectContractAddress(): string {
    return this.CORRECT_CONTRACT
  }

  validateAllAddresses(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (GAIA_TOKEN.WALLET_ADDRESS !== this.CORRECT_WALLET) {
      errors.push(`Wallet address mismatch: ${GAIA_TOKEN.WALLET_ADDRESS} should be ${this.CORRECT_WALLET}`)
    }
    
    if (GAIA_TOKEN.CONTRACT_ADDRESS !== this.CORRECT_CONTRACT) {
      errors.push(`Contract address mismatch: ${GAIA_TOKEN.CONTRACT_ADDRESS} should be ${this.CORRECT_CONTRACT}`)
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  logCorrectAddresses(): void {
    console.log('✅ OFFICIAL GAiA TOKEN ADDRESSES:')
    console.log(`📍 Wallet: ${this.CORRECT_WALLET}`)
    console.log(`📍 Contract: ${this.CORRECT_CONTRACT}`)
    console.log('🌍 Network: Solana (Pump.fun)')
    console.log('🚫 NOT GAIA Everworld - We are GAiA Token by Harmony of Gaia')
  }
}

export const addressValidationService = new AddressValidationService()
