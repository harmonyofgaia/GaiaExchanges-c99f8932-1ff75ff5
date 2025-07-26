import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ExternalLink, Zap, Heart } from 'lucide-react'
import { toast } from 'sonner'
import { GAIA_COMMUNITY_PROJECTS, CULTURE_OF_HARMONY_URL, type GAiAProject } from '@/constants/gaia-projects'
import { GAIA_TOKEN } from '@/constants/gaia'

interface GaiaCommunityProjectsProps {
  onDonate?: (projectId: string, amount: number) => void
}

export function GaiaCommunityProjects({ onDonate }: GaiaCommunityProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<GAiAProject | null>(null)
  const [donationAmount, setDonationAmount] = useState<number>(0)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDonate = async (project: GAiAProject, amount: number) => {
    if (amount < project.minDonation) {
      toast.error(`Minimum donation is ${project.minDonation} GAiA`, {
        description: `Please donate at least ${project.minDonation} GAiA tokens to support ${project.name}.`
      })
      return
    }

    try {
      // Simulate payment processing (replace with actual logic)
      const paymentResult = await processPayment(project.walletAddress, amount)

      if (paymentResult.success) {
        toast.success(`🌍 Donation Successful!`, {
          description: `${amount} GAiA tokens donated to ${project.name}. Transaction routed to ${project.walletAddress}`,
          duration: 5000
        })

        // Call the parent callback if provided
        if (onDonate) {
          onDonate(project.id, amount)
        }
      } else {
        toast.error(`Payment Failed`, {
          description: `Unable to process the donation. Please try again.`,
          duration: 5000
        })
      }
    } catch (error) {
      toast.error(`Payment Error`, {
        description: `An error occurred while processing the donation: ${error.message}`,
        duration: 5000
      })
    }

    setIsDialogOpen(false)
    setDonationAmount(0)
    setCustomAmount('')
  }

  const openDonationDialog = (project: GAiAProject) => {
    setSelectedProject(project)
    setDonationAmount(project.suggestedDonations[0])
    setCustomAmount('')
    setIsDialogOpen(true)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Community Foundation': 'bg-red-500/20 text-red-400 border-red-500/50',
      'Agriculture & Biodiversity': 'bg-green-500/20 text-green-400 border-green-500/50',
      'Renewable Energy': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'Conservation': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'Research & Restoration': 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      'Digital Sustainability': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50',
      'Green Technology': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      'Water & Sanitation': 'bg-teal-500/20 text-teal-400 border-teal-500/50',
      'Environmental Gaming': 'bg-pink-500/20 text-pink-400 border-pink-500/50',
      'Environmental Arts': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50',
      'Ecosystem Restoration': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
    }
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/50'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          🌟 GAiA Token Community Projects
        </h2>
        <p className="text-lg text-green-300 mb-4">
          Support verified green projects from the official GAiA token community. 
          Payments are routed directly to each project's GAiA wallet.
        </p>
        <Button
          variant="outline"
          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
          onClick={() => window.open(CULTURE_OF_HARMONY_URL, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit Culture of Harmony - Heart of Gaia Projects
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAIA_COMMUNITY_PROJECTS.map((project) => {
          const Icon = project.icon
          
          return (
            <Card key={project.id} className="bg-gradient-to-br from-gray-900/50 to-green-900/20 border-green-500/30 hover:border-green-400/50 transition-all hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-green-400" />
                    <div>
                      <CardTitle className="text-green-400 text-lg">{project.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={`text-xs ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </Badge>
                        {project.verified && (
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-300 mb-4 text-sm line-clamp-3">{project.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="text-sm">
                    <div className="text-gray-400 mb-1">Impact:</div>
                    <div className="text-green-400 font-medium">{project.impactDescription}</div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="text-gray-400 mb-1">Minimum Donation:</div>
                    <div className="text-yellow-400 font-semibold">{project.minDonation} GAiA</div>
                  </div>
                  
                  <div className="text-xs text-gray-500 font-mono">
                    Wallet: {project.walletAddress.slice(0, 8)}...{project.walletAddress.slice(-8)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={() => openDonationDialog(project)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Support Project
                  </Button>
                  {project.website && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-green-500/50 text-green-400 hover:bg-green-500/20"
                      onClick={() => window.open(project.website, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Donation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-green-500/30">
          <DialogHeader>
            <DialogTitle className="text-green-400 flex items-center gap-2">
              {selectedProject && <selectedProject.icon className="h-6 w-6" />}
              Support {selectedProject?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Choose your donation amount to support this GAiA community project.
              Funds will be sent directly to their verified wallet.
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-sm text-green-300 mb-2">🌱 {selectedProject.impactDescription}</p>
                <p className="text-xs text-gray-400">
                  Minimum donation: {selectedProject.minDonation} GAiA
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">Select Amount</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedProject.suggestedDonations.map((amount) => (
                      <Button
                        key={amount}
                        variant={donationAmount === amount ? "default" : "outline"}
                        className={donationAmount === amount 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "border-green-500/50 text-green-400 hover:bg-green-500/20"
                        }
                        onClick={() => {
                          setDonationAmount(amount)
                          setCustomAmount('')
                        }}
                      >
                        {amount} GAiA
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="custom-amount" className="text-sm font-medium text-gray-300">
                    Or enter custom amount
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    min={selectedProject.minDonation}
                    placeholder={`Min: ${selectedProject.minDonation} GAiA`}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setDonationAmount(parseFloat(e.target.value) || 0)
                    }}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-sm text-blue-300">
                    💡 <strong>Total:</strong> {donationAmount || customAmount || 0} GAiA
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Destination: {selectedProject.walletAddress}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={() => {
                      const finalAmount = parseFloat(customAmount) ?? donationAmount
                      handleDonate(selectedProject, finalAmount)
                    }}
                    disabled={!donationAmount && !customAmount}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Donate Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}