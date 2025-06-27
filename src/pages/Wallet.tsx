
import { GaiaWallet } from '@/components/GaiaWallet'

const Wallet = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Harmony of Gaia Wallet</h1>
          <p className="text-muted-foreground">Manage your GAiA tokens and track environmental impact</p>
        </div>
      </div>
      
      <GaiaWallet />
    </div>
  )
}

export default Wallet
