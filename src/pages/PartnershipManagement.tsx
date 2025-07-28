
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Handshake, 
  Building2, 
  Globe, 
  Target, 
  TrendingUp, 
  Users,
  Leaf,
  Award,
  MessageSquare,
  FileText
} from 'lucide-react'

export default function PartnershipManagement() {
  const partnershipStats = [
    { label: 'Active Partners', value: '47', icon: Handshake, color: 'text-blue-400' },
    { label: 'Joint Projects', value: '124', icon: Target, color: 'text-green-400' },
    { label: 'Global Reach', value: '89 Countries', icon: Globe, color: 'text-purple-400' },
    { label: 'Partnership Value', value: '$12.4M', icon: TrendingUp, color: 'text-yellow-400' }
  ]

  const activePartners = [
    { 
      name: 'Global Forest Alliance', 
      type: 'Environmental NGO', 
      status: 'Active', 
      projects: 12,
      impact: '45,000 trees planted',
      tier: 'Platinum'
    },
    { 
      name: 'Ocean Cleanup Foundation', 
      type: 'Research Institute', 
      status: 'Active', 
      projects: 8,
      impact: '2,340 kg plastic removed',
      tier: 'Gold'
    },
    { 
      name: 'Green Energy Corp', 
      type: 'Technology Company', 
      status: 'Pending', 
      projects: 3,
      impact: '1.2MW clean energy',
      tier: 'Silver'
    },
    { 
      name: 'Wildlife Conservation Trust', 
      type: 'Conservation Group', 
      status: 'Active', 
      projects: 15,
      impact: '234 species protected',
      tier: 'Platinum'
    }
  ]

  const partnershipOpportunities = [
    {
      title: 'Renewable Energy Initiative',
      organization: 'Solar Solutions Inc.',
      value: '$2.4M',
      duration: '36 months',
      impact: 'Carbon reduction',
      status: 'Under Review'
    },
    {
      title: 'Marine Protection Program',
      organization: 'Ocean Guardians',
      value: '$890K',
      duration: '24 months',
      impact: 'Ocean cleanup',
      status: 'Negotiating'
    },
    {
      title: 'Urban Farming Project',
      organization: 'City Green Alliance',
      value: '$560K',
      duration: '18 months',
      impact: 'Food security',
      status: 'Approved'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🤝 Partnership Management
          </h1>
          <p className="text-xl text-muted-foreground">
            Building strategic alliances for maximum environmental impact
          </p>
        </div>

        {/* Partnership Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {partnershipStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-blue-500/20 bg-black/20">
                <CardContent className="p-6 text-center">
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Active Partners */}
          <Card className="border-green-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Building2 className="h-5 w-5" />
                Active Partners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activePartners.map((partner, index) => (
                <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{partner.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={partner.tier === 'Platinum' ? 'default' : 
                                partner.tier === 'Gold' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {partner.tier}
                      </Badge>
                      <Badge 
                        variant={partner.status === 'Active' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {partner.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{partner.type}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="text-blue-400">{partner.projects} projects</span>
                    <span className="text-green-400">{partner.impact}</span>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Users className="h-4 w-4 mr-2" />
                Manage Partners
              </Button>
            </CardContent>
          </Card>

          {/* Partnership Opportunities */}
          <Card className="border-purple-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Target className="h-5 w-5" />
                Partnership Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {partnershipOpportunities.map((opportunity, index) => (
                <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{opportunity.title}</h3>
                    <Badge 
                      variant={opportunity.status === 'Approved' ? 'default' : 
                              opportunity.status === 'Under Review' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {opportunity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{opportunity.organization}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="text-yellow-400">{opportunity.value}</span>
                    <span className="text-blue-400">{opportunity.duration}</span>
                    <span className="text-green-400">{opportunity.impact}</span>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Handshake className="h-4 w-4 mr-2" />
                Explore Opportunities
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Partnership Management Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-cyan-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <FileText className="h-5 w-5" />
                Contract Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage partnership contracts, agreements, and legal documents
              </p>
              <Progress value={75} className="mb-4" />
              <div className="text-sm text-muted-foreground mb-4">12/16 contracts processed</div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                View Contracts
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <MessageSquare className="h-5 w-5" />
                Communication Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Direct communication channels with partner organizations
              </p>
              <div className="text-sm text-orange-400 mb-4">23 unread messages</div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Open Messages
              </Button>
            </CardContent>
          </Card>

          <Card className="border-pink-500/20 bg-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-400">
                <Award className="h-5 w-5" />
                Impact Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Monitor and measure partnership environmental impact
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <span className="text-green-400">89,234 kg CO₂ saved</span>
                <span className="text-blue-400">156 projects completed</span>
              </div>
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                View Impact Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/20">
          <CardContent className="p-8 text-center">
            <Leaf className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Partner with Us?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our network of environmental partners and multiply your impact through collaboration
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Handshake className="h-5 w-5 mr-2" />
                Become a Partner
              </Button>
              <Button size="lg" variant="outline" className="border-white/20">
                Partnership Guidelines
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
