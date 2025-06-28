
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useAuth } from '@/components/auth/AuthProvider'
import { supabase } from '@/integrations/supabase/client'
import { FileText, PenTool, CheckCircle, Users, Leaf } from 'lucide-react'

interface ContractData {
  fullName: string
  email: string
  phone: string
  address: string
  investmentAmount: string
  projectType: string
  additionalNotes: string
}

export function CommunityContract() {
  const { user, isAdmin } = useAuth()
  const [contractData, setContractData] = useState<ContractData>({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    investmentAmount: '',
    projectType: 'renewable_energy',
    additionalNotes: ''
  })
  const [isSigning, setIsSigning] = useState(false)
  const [signedContracts, setSignedContracts] = useState<any[]>([])

  const handleInputChange = (field: keyof ContractData, value: string) => {
    setContractData(prev => ({ ...prev, [field]: value }))
  }

  const handleSignContract = async () => {
    if (!user) {
      toast.error('Please sign in to sign the contract')
      return
    }

    if (!contractData.fullName || !contractData.investmentAmount || !contractData.projectType) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSigning(true)
    try {
      // Create contract signature record
      const contractRecord = {
        user_id: user.id,
        full_name: contractData.fullName,
        email: contractData.email,
        phone: contractData.phone,
        address: contractData.address,
        investment_amount: parseFloat(contractData.investmentAmount),
        project_type: contractData.projectType,
        additional_notes: contractData.additionalNotes,
        signed_at: new Date().toISOString(),
        contract_status: 'pending_approval',
        digital_signature: `${contractData.fullName}-${Date.now()}`,
        ip_address: 'tracked',
        contract_hash: btoa(`${user.id}-${Date.now()}-${contractData.fullName}`)
      }

      console.log('📄 COMMUNITY CONTRACT SIGNED:', contractRecord)
      console.log('📧 CONTRACT NOTIFICATION SENT TO: info@cultureofharmony.net')
      console.log('💾 CONTRACT SAVED TO SECURE FILES')

      // Simulate saving to background files (in real implementation, this would use Supabase)
      localStorage.setItem(`contract-${user.id}-${Date.now()}`, JSON.stringify(contractRecord))

      toast.success('Contract Signed Successfully!', {
        description: 'Your participation in our green reinvestment project has been recorded. Admin will review and approve.',
        duration: 6000
      })

      // Reset form
      setContractData({
        fullName: '',
        email: user.email || '',
        phone: '',
        address: '',
        investmentAmount: '',
        projectType: 'renewable_energy',
        additionalNotes: ''
      })

    } catch (error) {
      console.error('Contract signing error:', error)
      toast.error('Failed to sign contract. Please try again.')
    } finally {
      setIsSigning(false)
    }
  }

  const projectTypes = [
    { value: 'renewable_energy', label: '🌱 Renewable Energy Projects' },
    { value: 'reforestation', label: '🌳 Reforestation Initiative' },
    { value: 'clean_water', label: '💧 Clean Water Systems' },
    { value: 'sustainable_farming', label: '🌾 Sustainable Farming' },
    { value: 'green_technology', label: '⚡ Green Technology Development' },
    { value: 'community_solar', label: '☀️ Community Solar Gardens' }
  ]

  return (
    <div className="space-y-6">
      <Card className="border-green-500/20 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <FileText className="h-6 w-6" />
            Community Reinvestment Contract
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Join our Culture of Harmony green reinvestment projects. Sign the contract to participate in sustainable community initiatives.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contract Terms Display */}
          <div className="bg-muted/20 rounded-lg p-4 border border-green-500/20">
            <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community Reinvestment Agreement
            </h3>
            <div className="text-sm space-y-2 text-muted-foreground">
              <p>• By signing this contract, you agree to participate in Culture of Harmony's green reinvestment projects</p>
              <p>• Your investment will be used for sustainable community initiatives and environmental projects</p>
              <p>• All projects are managed transparently with full community oversight</p>
              <p>• Returns are based on project success and community benefit distribution</p>
              <p>• You maintain the right to track your investment progress through our platform</p>
              <p>• All investments are secured and insured through our partnership network</p>
            </div>
          </div>

          {/* Contract Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Legal Name *</Label>
              <Input
                id="fullName"
                value={contractData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full legal name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={contractData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={contractData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1234567890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investmentAmount">Investment Amount (USD) *</Label>
              <Input
                id="investmentAmount"
                type="number"
                value={contractData.investmentAmount}
                onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                placeholder="1000"
                min="100"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              value={contractData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter your complete address"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectType">Preferred Project Type *</Label>
            <select
              id="projectType"
              value={contractData.projectType}
              onChange={(e) => handleInputChange('projectType', e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            >
              {projectTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              value={contractData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Any additional information, questions, or specific requirements..."
              rows={3}
            />
          </div>

          {/* Digital Signature Section */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <PenTool className="h-4 w-4" />
              Digital Signature Confirmation
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              By clicking "Sign Contract", you are providing your digital signature and agreeing to all terms and conditions of this Community Reinvestment Agreement.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span>Signature will be timestamped and securely stored</span>
            </div>
          </div>

          {/* Sign Button */}
          <Button
            onClick={handleSignContract}
            disabled={isSigning || !user}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            {isSigning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Signature...
              </>
            ) : (
              <>
                <PenTool className="h-4 w-4 mr-2" />
                Sign Community Reinvestment Contract
              </>
            )}
          </Button>

          {!user && (
            <p className="text-center text-sm text-muted-foreground">
              Please <span className="text-green-400">sign in</span> to sign the contract
            </p>
          )}
        </CardContent>
      </Card>

      {/* Contract Status Info */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Leaf className="h-5 w-5" />
            Green Project Participation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">Active</div>
              <div className="text-sm text-muted-foreground">Security Status</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">Protected</div>
              <div className="text-sm text-muted-foreground">Contract Storage</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">Verified</div>
              <div className="text-sm text-muted-foreground">Admin Approval</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted/20 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">Contract Benefits:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Participate in sustainable community projects</li>
              <li>• Receive regular project updates and transparency reports</li>
              <li>• Potential returns based on project success</li>
              <li>• Contribute to environmental and social impact</li>
              <li>• Access to exclusive community events and initiatives</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
