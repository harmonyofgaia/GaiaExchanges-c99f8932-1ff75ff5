
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EncryptedDataVault } from '@/components/security/EncryptedDataVault'
import { WalletBackupSystem } from '@/components/security/WalletBackupSystem'
import { CloudRecoverySystem } from '@/components/security/CloudRecoverySystem'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'

const SecureVault = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-green-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            SECURE DATA VAULT
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Encrypted • Admin-Only • Continuous Protection • Zero Data Loss
          </p>
          <p className="text-sm text-purple-400 mt-2">
            🔒 Quantum Encrypted • 4-Barrier Recovery • Auto-Backup • Complete System Restoration
          </p>
        </div>

        <Tabs defaultValue="encrypted-vault" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md border border-purple-500/20">
            <TabsTrigger value="encrypted-vault" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🔒 Encrypted Vault
            </TabsTrigger>
            <TabsTrigger value="wallet-backup" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              💰 Wallet Backup
            </TabsTrigger>
            <TabsTrigger value="device-recovery" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🔄 Device Recovery
            </TabsTrigger>
            <TabsTrigger value="admin-recovery" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              🔑 Admin Recovery
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="encrypted-vault" className="space-y-6 mt-6">
            <EncryptedDataVault />
          </TabsContent>
          
          <TabsContent value="wallet-backup" className="space-y-6 mt-6">
            <WalletBackupSystem />
          </TabsContent>
          
          <TabsContent value="device-recovery" className="space-y-6 mt-6">
            <CloudRecoverySystem />
          </TabsContent>
          
          <TabsContent value="admin-recovery" className="space-y-6 mt-6">
            <AdminRecoveryPortal />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default SecureVault
