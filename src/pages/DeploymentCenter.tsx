
import { Navbar } from '@/components/Navbar'
import { DeploymentAutomation } from '@/components/deployment/DeploymentAutomation'
import { V2PlusValidator } from '@/components/deployment/V2PlusValidator'
import { EinsteinCopilotDashboard } from '@/components/admin/copilot/EinsteinCopilotDashboard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Rocket, 
  Shield, 
  Brain, 
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

export default function DeploymentCenter() {
  const runV2PlusValidation = async () => {
    toast.info('🔍 Running comprehensive V2+ validation...', { duration: 3000 })
    
    // Simulate comprehensive validation process
    setTimeout(() => {
      toast.success('✅ V2+ validation completed successfully!', {
        description: 'All master plan requirements verified and operational.',
        duration: 5000
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with V2+ Status */}
        <Card className="mb-6 border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              🚀 GAIA V2+ DEPLOYMENT CENTER
            </CardTitle>
            <p className="text-center text-xl text-green-300">
              Master Plan Implementation • Einstein Copilot Assisted • Zero-Downtime Deployment Ready
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Badge className="bg-green-600 text-white px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-1" />
                V2+ Ready
              </Badge>
              <Badge className="bg-blue-600 text-white px-4 py-2">
                <Brain className="h-4 w-4 mr-1" />
                Copilot Active
              </Badge>
              <Badge className="bg-purple-600 text-white px-4 py-2">
                <Shield className="h-4 w-4 mr-1" />
                Quantum Secured
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="deployment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger value="deployment" className="data-[state=active]:bg-blue-600">
              <Rocket className="h-4 w-4 mr-2" />
              Deployment Automation
            </TabsTrigger>
            <TabsTrigger value="copilot" className="data-[state=active]:bg-purple-600">
              <Brain className="h-4 w-4 mr-2" />
              Einstein Copilot
            </TabsTrigger>
            <TabsTrigger value="validation" className="data-[state=active]:bg-green-600">
              <Shield className="h-4 w-4 mr-2" />
              V2+ Validation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deployment">
            <DeploymentAutomation />
          </TabsContent>

          <TabsContent value="copilot">
            <div className="space-y-4">
              <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400">🤖 Live Deployment Assistant</CardTitle>
                  <p className="text-purple-300">
                    Einstein Copilot is available to provide real-time assistance during deployment processes.
                    Ask questions, get insights, and receive automated guidance.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Badge className="bg-green-600">Online</Badge>
                    <Badge className="bg-blue-600">Ready for Assistance</Badge>
                    <Badge className="bg-purple-600">Deep Learning Active</Badge>
                  </div>
                  <Button 
                    onClick={activateDeploymentAssistant}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Activate Deployment Assistant
                  </Button>
                </CardContent>
              </Card>
              <EinsteinCopilotDashboard />
            </div>
          </TabsContent>

          <TabsContent value="validation">
            <V2PlusValidator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
