
interface DatabaseRecord {
  id: string
  wallet_address?: string
  contract_address?: string
}

export class AddressMigrationUtility {
  private readonly CORRECT_WALLET = '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh'
  private readonly CORRECT_CONTRACT = 't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump'
  private readonly INCORRECT_ADDRESSES = [
    '5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh', // If this was in contract field
    't7Tnf5m4K1dhNu5Cx6pocQjZ5o5rNqicg5aDcgBpump'   // If this was in wallet field
  ]

  async migrateLocalStorageAddresses(): Promise<void> {
    try {
      // Check and fix localStorage entries
      const keys = Object.keys(localStorage)
      let fixCount = 0

      keys.forEach(key => {
        const value = localStorage.getItem(key)
        if (value) {
          try {
            const parsed = JSON.parse(value)
            let modified = false

            // Fix any swapped addresses in stored data
            if (this.fixAddressesInObject(parsed)) {
              localStorage.setItem(key, JSON.stringify(parsed))
              modified = true
              fixCount++
            }
          } catch (e) {
            // Not JSON, check if it's a raw address
            if (this.INCORRECT_ADDRESSES.includes(value)) {
              const correctedAddress = this.getCorrectedAddress(value, key)
              if (correctedAddress) {
                localStorage.setItem(key, correctedAddress)
                fixCount++
              }
            }
          }
        }
      })

      console.log(`✅ Fixed ${fixCount} incorrect addresses in localStorage`)
      
    } catch (error) {
      console.error('❌ Error during address migration:', error)
    }
  }

  private fixAddressesInObject(obj: any): boolean {
    let modified = false
    
    if (typeof obj === 'object' && obj !== null) {
      // Fix wallet addresses
      if (obj.wallet_address === this.CORRECT_CONTRACT) {
        obj.wallet_address = this.CORRECT_WALLET
        modified = true
        console.log('🔧 Fixed swapped wallet address')
      }
      
      // Fix contract addresses  
      if (obj.contract_address === this.CORRECT_WALLET) {
        obj.contract_address = this.CORRECT_CONTRACT
        modified = true
        console.log('🔧 Fixed swapped contract address')
      }

      // Recursively check nested objects
      Object.keys(obj).forEach(key => {
        if (this.fixAddressesInObject(obj[key])) {
          modified = true
        }
      })
    }
    
    return modified
  }

  private getCorrectedAddress(incorrectAddress: string, storageKey: string): string | null {
    // Determine correct address based on context
    if (storageKey.toLowerCase().includes('wallet') && incorrectAddress === this.CORRECT_CONTRACT) {
      return this.CORRECT_WALLET
    }
    if (storageKey.toLowerCase().includes('contract') && incorrectAddress === this.CORRECT_WALLET) {
      return this.CORRECT_CONTRACT
    }
    return null
  }

  validateSystemAddresses(): { isValid: boolean; report: string[] } {
    const report: string[] = []
    let isValid = true

    // Check constants
    const { WALLET_ADDRESS, CONTRACT_ADDRESS } = require('../constants/gaia').GAIA_TOKEN
    
    if (WALLET_ADDRESS !== this.CORRECT_WALLET) {
      report.push(`❌ WALLET ADDRESS INCORRECT: ${WALLET_ADDRESS} should be ${this.CORRECT_WALLET}`)
      isValid = false
    } else {
      report.push(`✅ Wallet address correct: ${WALLET_ADDRESS}`)
    }

    if (CONTRACT_ADDRESS !== this.CORRECT_CONTRACT) {
      report.push(`❌ CONTRACT ADDRESS INCORRECT: ${CONTRACT_ADDRESS} should be ${this.CORRECT_CONTRACT}`)
      isValid = false
    } else {
      report.push(`✅ Contract address correct: ${CONTRACT_ADDRESS}`)
    }

    return { isValid, report }
  }

  async performFullSystemMigration(): Promise<void> {
    console.log('🚀 Starting full address migration...')
    
    // 1. Migrate localStorage
    await this.migrateLocalStorageAddresses()
    
    // 2. Validate system addresses
    const validation = this.validateSystemAddresses()
    validation.report.forEach(msg => console.log(msg))
    
    // 3. Log correct addresses for verification
    console.log('\n📋 OFFICIAL GAiA TOKEN ADDRESSES:')
    console.log(`💰 Wallet: ${this.CORRECT_WALLET}`)
    console.log(`📄 Contract: ${this.CORRECT_CONTRACT}`)
    console.log('🌐 Network: Solana')
    console.log('🏢 Platform: Pump.fun')
    console.log('🚫 NOT GAIA Everworld')
    
    console.log('✅ Address migration completed!')
  }
}

export const addressMigration = new AddressMigrationUtility()
