
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Eye, Shield } from 'lucide-react'
import { MatrixWalletDisplay } from '@/components/MatrixWalletDisplay'

const Transparency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            🔥 TRANSPARENCY CENTER
          </h1>
          <p className="text-muted-foreground">
            Full transparency with dragon-verified data
          </p>
        </div>

        {/* Matrix Wallet Display */}
        <div className="mb-8">
          <MatrixWalletDisplay />
        </div>

        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardContent className="pt-6 text-center">
            <Eye className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">100% Transparent</h3>
            <p className="text-muted-foreground">
              Complete transparency with dragon-verified blockchain data
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Transparency
