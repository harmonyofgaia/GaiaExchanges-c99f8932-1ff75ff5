
import { ContractDeployment } from '@/components/ContractDeployment'
import { ContractLegalFramework } from '@/components/ContractLegalFramework'
import { SmartContractInterface } from '@/components/SmartContractInterface'
import { GaiaLogo } from '@/components/GaiaLogo'

const SmartContracts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10" />
        <div className="relative container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <GaiaLogo size="lg" variant="colorful" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Smart Contract Suite
              </h1>
              <p className="text-xl text-muted-foreground mt-4">
                Military-Grade Smart Contracts with Full Legal Compliance
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <ContractDeployment />
        <SmartContractInterface />
        <ContractLegalFramework />
      </div>
    </div>
  )
}

export default SmartContracts
