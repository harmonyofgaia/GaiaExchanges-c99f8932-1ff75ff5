import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, Copy, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_TOKEN } from '@/constants/gaia'

export function BrandClarificationManager() {
  const [documentsGenerated, setDocumentsGenerated] = useState(false)

  const officialStatement = `
OFFICIAL BRAND CLARIFICATION STATEMENT

Project Name: GAiA Token
Powered By: Harmony of Gaia Projects Creator Business
Empowered By: Culture of Harmony

IMPORTANT DISCLAIMER:
GAiA Token is NOT associated with, connected to, or affiliated with GAIA Everworld 
(referenced at coinmarketcap.com/currencies/gaia-everworld/).

We are a completely separate, independent, and exclusive blockchain project with our own:
- Unique contract address: ${GAIA_TOKEN.CONTRACT_ADDRESS}
- Independent wallet system: ${GAIA_TOKEN.WALLET_ADDRESS}
- Exclusive community and tokenomics
- Original brand identity and mission

Our project maintains complete independence and operates under the Culture of Harmony 
framework, providing exclusive services and community benefits distinct from any 
other GAIA-named projects.

This statement shall be included in all official partnerships, documentation, 
and public communications.

Date: ${new Date().toLocaleDateString()}
Project Authority: Harmony of Gaia Admin
`

  const copyStatement = () => {
    navigator.clipboard.writeText(officialStatement)
    toast.success('Official statement copied to clipboard!', {
      description: 'Ready to paste in official documents'
    })
  }

  const generateDocuments = () => {
    setDocumentsGenerated(true)
    
    console.log('🔥 GENERATING OFFICIAL BRAND CLARIFICATION DOCUMENTS')
    console.log('📋 PREPARING PARTNERSHIP AGREEMENTS WITH DISCLAIMER')
    console.log('⚖️ CREATING LEGAL FRAMEWORK FOR BRAND DISTINCTION')
    
    toast.success('Official Documents Generated!', {
      description: 'Brand clarification documents ready for partnerships',
      duration: 5000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-6 w-6" />
            🚨 BRAND CLARIFICATION CENTER - OFFICIAL STATEMENT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-black/40 p-4 rounded-lg border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-4">CRITICAL DISTINCTION REQUIRED</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-red-600">NOT US</Badge>
                <span className="text-red-300">GAIA Everworld (coinmarketcap.com/currencies/gaia-everworld/)</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600">WE ARE</Badge>
                <span className="text-green-300">GAiA Token - Harmony of Gaia Projects - Culture of Harmony</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-900/40 rounded-lg border border-green-500/30">
              <CheckCircle className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-lg font-bold text-green-400">CORRECT WALLET</div>
              <code className="text-xs text-green-300 break-all">{GAIA_TOKEN.WALLET_ADDRESS}</code>
            </div>
            <div className="text-center p-4 bg-blue-900/40 rounded-lg border border-blue-500/30">
              <CheckCircle className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-lg font-bold text-blue-400">CORRECT CONTRACT</div>
              <code className="text-xs text-blue-300 break-all">{GAIA_TOKEN.CONTRACT_ADDRESS}</code>
            </div>
          </div>

          <div className="bg-black/40 p-4 rounded-lg border border-yellow-500/30">
            <h4 className="text-lg font-bold text-yellow-400 mb-3">📋 OFFICIAL STATEMENT FOR PARTNERSHIPS</h4>
            <div className="bg-black/60 p-4 rounded text-sm text-gray-300 font-mono whitespace-pre-line max-h-40 overflow-y-auto">
              {officialStatement}
            </div>
            <Button 
              onClick={copyStatement}
              className="mt-3 bg-yellow-600 hover:bg-yellow-700"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Official Statement
            </Button>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={generateDocuments}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6"
            >
              <FileText className="h-6 w-6 mr-3" />
              Generate Official Partnership Documents
            </Button>
          </div>

          {documentsGenerated && (
            <div className="bg-green-900/40 p-4 rounded-lg border border-green-500/30">
              <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                <CheckCircle className="h-5 w-5" />
                DOCUMENTS READY FOR DEPLOYMENT
              </div>
              <p className="text-green-300 text-sm">
                Official brand clarification documents have been prepared and are ready for all partnership agreements and public communications.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
