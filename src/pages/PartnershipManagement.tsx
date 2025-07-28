
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Handshake, Building2, Users, TrendingUp, Globe, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import HoverSidebar from '@/components/HoverSidebar'

export function PartnershipManagement() {
  const [partners] = useState([
    { id: 1, name: 'Forest Protection NGO', type: 'NGO', status: 'Active', projects: 8 },
    { id: 2, name: 'Tech Innovation Corp', type: 'Technology', status: 'Active', projects: 3 },
    { id: 3, name: 'Environmental Agency', type: 'Government', status: 'Pending', projects: 5 },
    { id: 4, name: 'Green Solutions Ltd', type: 'Corporate', status: 'Active', projects: 12 },
  ])

  const [partnerships] = useState({
    total: 47,
    active: 34,
    pending: 8,
    initiatives: 23
  })

  const connectPartner = (partnerId: number) => {
    toast.success('🤝 Partnership Connection Initiated!', {
      description: 'Partnership request has been sent',
      duration: 4000
    })
    console.log(`Connecting with partner: ${partnerId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600'
      case 'Pending': return 'bg-yellow-600'
      case 'Inactive': return 'bg-gray-600'
      default: return 'bg-blue-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'NGO': return <Users className="h-5 w-5" />
      case 'Technology': return <Building2 className="h-5 w-5" />
      case 'Government': return <Globe className="h-5 w-5" />
      case 'Corporate': return <TrendingUp className="h-5 w-5" />
      default: return <Handshake className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                🤝 PARTNERSHIP MANAGEMENT
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                NGO • Agency • Tech Firm Partnership Coordination Platform
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="directory" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="directory">🏢 Directory</TabsTrigger>
              <TabsTrigger value="collaboration">🤝 Collaboration</TabsTrigger>
              <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
              <TabsTrigger value="initiatives">🎯 Initiatives</TabsTrigger>
            </TabsList>

            <TabsContent value="directory" className="space-y-6">
              {/* Partnership Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-green-500/30">
                  <CardContent className="p-4 text-center">
                    <Handshake className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">{partnerships.total}</div>
                    <div className="text-sm text-muted-foreground">Total Partners</div>
                  </CardContent>
                </Card>
                <Card className="border-blue-500/30">
                  <CardContent className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-400">{partnerships.active}</div>
                    <div className="text-sm text-muted-foreground">Active Partners</div>
                  </CardContent>
                </Card>
                <Card className="border-yellow-500/30">
                  <CardContent className="p-4 text-center">
                    <Building2 className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-400">{partnerships.pending}</div>
                    <div className="text-sm text-muted-foreground">Pending Partners</div>
                  </CardContent>
                </Card>
                <Card className="border-purple-500/30">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-400">{partnerships.initiatives}</div>
                    <div className="text-sm text-muted-foreground">Joint Initiatives</div>
                  </CardContent>
                </Card>
              </div>

              {/* Partner Directory */}
              <Card className="border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400">🏢 Partner Directory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {partners.map((partner) => (
                    <div key={partner.id} className="p-4 bg-black/20 rounded-lg border border-gray-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(partner.type)}
                          <div>
                            <span className="font-medium text-white">{partner.name}</span>
                            <p className="text-sm text-muted-foreground">{partner.type} Partner</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(partner.status)}>
                            {partner.status}
                          </Badge>
                          <Badge variant="outline">
                            {partner.projects} projects
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => connectPartner(partner.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <Handshake className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaboration" className="space-y-6">
              <Card className="border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400">🤝 Collaboration Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Users className="h-16 w-16 mx-auto mb-4 text-green-400" />
                    <p className="text-lg">Active collaboration projects</p>
                    <p className="text-sm">Manage joint initiatives and partnerships</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-400">📊 Partnership Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                    <p className="text-lg">Partnership performance metrics</p>
                    <p className="text-sm">Track success rates and collaboration effectiveness</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="initiatives" className="space-y-6">
              <Card className="border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-yellow-400">🎯 Initiative Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <Globe className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
                    <p className="text-lg">Joint environmental initiatives</p>
                    <p className="text-sm">Monitor progress on collaborative projects</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default PartnershipManagement
