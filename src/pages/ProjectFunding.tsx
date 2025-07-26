
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Vote, Shield, Coins, Users } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function ProjectFunding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            💝 Project Funding
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Master Plan v7: Advanced Decentralized Funding with Community Governance
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Heart className="h-3 w-3 mr-1" />
              Community Driven
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Shield className="h-3 w-3 mr-1" />
              Smart Contracts
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  Decentralized Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Community-driven decision making for environmental project funding through transparent voting mechanisms.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-black/30 rounded-lg border border-green-500/20">
                    <div className="text-lg font-bold text-white">Active Proposals</div>
                    <div className="text-2xl font-bold text-green-400">24</div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-lg border border-blue-500/20">
                    <div className="text-lg font-bold text-white">Total Votes Cast</div>
                    <div className="text-2xl font-bold text-blue-400">45.2K</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Smart Contract Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                    <div className="font-medium text-blue-400 mb-1">Automated Milestone Funding</div>
                    <div className="text-sm text-muted-foreground">Funds released automatically upon milestone verification</div>
                  </div>
                  <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                    <div className="font-medium text-purple-400 mb-1">Multi-signature Security</div>
                    <div className="text-sm text-muted-foreground">Enhanced security through multi-signature wallet protection</div>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                    <div className="font-medium text-green-400 mb-1">Impact Verification</div>
                    <div className="text-sm text-muted-foreground">Blockchain-verified environmental impact tracking</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Voters</span>
                    <span className="text-white font-bold">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funded Projects</span>
                    <span className="text-white font-bold">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Funding</span>
                    <span className="text-white font-bold">$2.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="text-green-400 font-bold">94.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/20 to-black/50 border-orange-500/20">
              <CardHeader>
                <CardTitle className="text-orange-400">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Submit Project Proposal
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Vote on Proposals
                </Button>
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  View Funding History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
