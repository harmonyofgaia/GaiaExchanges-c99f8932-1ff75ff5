
import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { TreePine, Waves, Recycle, Sun, Heart, Globe } from 'lucide-react'
import { GaiaFeeManager } from '@/components/GaiaFeeManager'
import { RealWorldImpactTracker } from '@/components/gaming/RealWorldImpactTracker'
import { FeeDestinationManager } from '@/components/vault/FeeDestinationManager'
import { GreenLakeTriibe } from '@/components/admin/GreenLakeTriibe'

export default function GaiasProjects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-green-400 mb-4 animate-pulse">
            🌍 GAiA'S GLOBAL GREEN PROJECTS
          </h1>
          <p className="text-2xl text-green-300 mb-6">
            Worldwide Environmental Revolution • Your Fees Fund Real Change • Choose Your Impact
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-green-600 text-white text-lg px-6 py-2 animate-pulse">
              🔥 Token Burning for Green Projects
            </Badge>
            <Badge className="bg-blue-600 text-white text-lg px-6 py-2 animate-pulse">
              🌊 Ocean Cleanup Initiative
            </Badge>
            <Badge className="bg-orange-600 text-white text-lg px-6 py-2 animate-pulse">
              ☀️ Solar Revolution Network
            </Badge>
            <Badge className="bg-purple-600 text-white text-lg px-6 py-2 animate-pulse">
              🌱 Reforestation Programs
            </Badge>
          </div>
        </div>

        {/* Main Project Tabs */}
        <Tabs defaultValue="fee-management" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="fee-management" className="text-sm">💰 Fee Control</TabsTrigger>
            <TabsTrigger value="impact-tracker" className="text-sm">📊 Real Impact</TabsTrigger>
            <TabsTrigger value="greenlake-tribe" className="text-sm">🌊 Water Projects</TabsTrigger>
            <TabsTrigger value="solar-revolution" className="text-sm">☀️ Solar Network</TabsTrigger>
            <TabsTrigger value="reforestation" className="text-sm">🌳 Tree Planting</TabsTrigger>
            <TabsTrigger value="ocean-cleanup" className="text-sm">🐋 Ocean Cleanup</TabsTrigger>
          </TabsList>

          {/* Fee Management & Destination Control */}
          <TabsContent value="fee-management" className="space-y-6">
            <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
              <CardHeader>
                <CardTitle className="text-green-400 text-2xl text-center">
                  💎 CONTROL YOUR IMPACT - CHOOSE WHERE YOUR FEES GO
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Every transaction fee becomes a force for environmental change. You decide the destination.
                </p>
              </CardHeader>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-green-400 mb-4">🎯 Fee Destination Manager</h3>
                <FeeDestinationManager />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">⚡ Live Fee Management</h3>
                <GaiaFeeManager />
              </div>
            </div>

            {/* Global Impact Overview */}
            <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
              <CardHeader>
                <CardTitle className="text-purple-400 text-xl">🌍 GLOBAL FEE IMPACT DISTRIBUTION</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-900/30 rounded-lg">
                    <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">40%</div>
                    <div className="text-sm text-green-300">Reforestation</div>
                  </div>
                  <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                    <Waves className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-400">30%</div>
                    <div className="text-sm text-blue-300">Ocean Cleanup</div>
                  </div>
                  <div className="text-center p-4 bg-orange-900/30 rounded-lg">
                    <Sun className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-400">20%</div>
                    <div className="text-sm text-orange-300">Solar Energy</div>
                  </div>
                  <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                    <Recycle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-400">10%</div>
                    <div className="text-sm text-purple-300">Waste Reduction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real World Impact Tracker */}
          <TabsContent value="impact-tracker" className="space-y-6">
            <RealWorldImpactTracker />
          </TabsContent>

          {/* GreenLake Tribe Water Projects */}
          <TabsContent value="greenlake-tribe" className="space-y-6">
            <GreenLakeTriibe />
          </TabsContent>

          {/* Solar Revolution Network */}
          <TabsContent value="solar-revolution" className="space-y-6">
            <Card className="border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-2xl">☀️ SOLAR REVOLUTION NETWORK</CardTitle>
                <p className="text-yellow-300">Global solar infrastructure powered by GAiA community fees</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-orange-900/20 border-orange-500/30">
                    <CardContent className="p-4 text-center">
                      <Sun className="h-10 w-10 text-orange-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-orange-400">2,847</div>
                      <div className="text-sm text-orange-300">Solar Panels Installed</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-900/20 border-yellow-500/30">
                    <CardContent className="p-4 text-center">
                      <Globe className="h-10 w-10 text-yellow-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-yellow-400">47</div>
                      <div className="text-sm text-yellow-300">Countries Covered</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-900/20 border-green-500/30">
                    <CardContent className="p-4 text-center">
                      <Heart className="h-10 w-10 text-green-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-green-400">15.2MW</div>
                      <div className="text-sm text-green-300">Clean Energy Generated</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-yellow-400 mb-4">🚀 ACTIVE SOLAR PROJECTS</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-yellow-400">Morocco Solar Farm Expansion</div>
                          <div className="text-sm text-muted-foreground">5,000 additional panels • 2.5MW capacity</div>
                        </div>
                        <Badge className="bg-green-600">85% Funded</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-yellow-400">Indian Village Solar Grid</div>
                          <div className="text-sm text-muted-foreground">Community solar network • 1,500 homes</div>
                        </div>
                        <Badge className="bg-orange-600">67% Funded</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-yellow-400">Australian Outback Solar Stations</div>
                          <div className="text-sm text-muted-foreground">Remote area electrification • 12 stations</div>
                        </div>
                        <Badge className="bg-yellow-600">34% Funded</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reforestation Programs */}
          <TabsContent value="reforestation" className="space-y-6">
            <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
              <CardHeader>
                <CardTitle className="text-green-400 text-2xl">🌳 GLOBAL REFORESTATION NETWORK</CardTitle>
                <p className="text-green-300">Restoring forests worldwide through community-funded initiatives</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-green-900/20 border-green-500/30">
                    <CardContent className="p-4 text-center">
                      <TreePine className="h-10 w-10 text-green-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-green-400">584,291</div>
                      <div className="text-sm text-green-300">Trees Planted</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-emerald-900/20 border-emerald-500/30">
                    <CardContent className="p-4 text-center">
                      <Globe className="h-10 w-10 text-emerald-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-emerald-400">1,247</div>
                      <div className="text-sm text-emerald-300">Hectares Restored</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-teal-900/20 border-teal-500/30">
                    <CardContent className="p-4 text-center">
                      <Heart className="h-10 w-10 text-teal-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-teal-400">2,847</div>
                      <div className="text-sm text-teal-300">Tons CO₂ Absorbed</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-cyan-900/20 border-cyan-500/30">
                    <CardContent className="p-4 text-center">
                      <Waves className="h-10 w-10 text-cyan-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-cyan-400">67</div>
                      <div className="text-sm text-cyan-300">Countries Active</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-green-400 mb-4">🌲 ACTIVE REFORESTATION PROJECTS</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-green-400">Amazon Rainforest Restoration</div>
                          <div className="text-sm text-muted-foreground">Brazil • 50,000 native trees • 200 hectares</div>
                        </div>
                        <Badge className="bg-green-600">92% Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-green-400">Indonesian Mangrove Recovery</div>
                          <div className="text-sm text-muted-foreground">Coastal protection • 25,000 mangroves</div>
                        </div>
                        <Badge className="bg-emerald-600">78% Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-green-400">African Sahel Green Wall</div>
                          <div className="text-sm text-muted-foreground">Desert expansion prevention • 15 countries</div>
                        </div>
                        <Badge className="bg-teal-600">45% Complete</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ocean Cleanup Initiative */}
          <TabsContent value="ocean-cleanup" className="space-y-6">
            <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
              <CardHeader>
                <CardTitle className="text-blue-400 text-2xl">🐋 GLOBAL OCEAN CLEANUP INITIATIVE</CardTitle>
                <p className="text-blue-300">Removing plastic waste and protecting marine life worldwide</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-blue-900/20 border-blue-500/30">
                    <CardContent className="p-4 text-center">
                      <Waves className="h-10 w-10 text-blue-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-blue-400">47,582</div>
                      <div className="text-sm text-blue-300">Tons Plastic Removed</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-cyan-900/20 border-cyan-500/30">
                    <CardContent className="p-4 text-center">
                      <Heart className="h-10 w-10 text-cyan-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-cyan-400">12,847</div>
                      <div className="text-sm text-cyan-300">Marine Animals Saved</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-teal-900/20 border-teal-500/30">
                    <CardContent className="p-4 text-center">
                      <Globe className="h-10 w-10 text-teal-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-teal-400">284</div>
                      <div className="text-sm text-teal-300">Ocean Zones Cleaned</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-indigo-900/20 border-indigo-500/30">
                    <CardContent className="p-4 text-center">
                      <Recycle className="h-10 w-10 text-indigo-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-indigo-400">89%</div>
                      <div className="text-sm text-indigo-300">Plastic Recycled</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-blue-400 mb-4">🌊 ACTIVE OCEAN PROJECTS</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-blue-400">Pacific Garbage Patch Cleanup</div>
                          <div className="text-sm text-muted-foreground">Advanced collection systems • 15,000 tons target</div>
                        </div>
                        <Badge className="bg-blue-600">67% Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-blue-400">Mediterranean Sea Restoration</div>
                          <div className="text-sm text-muted-foreground">Coastal cleanup • Marine habitat protection</div>
                        </div>
                        <Badge className="bg-cyan-600">83% Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-black/20 rounded">
                        <div>
                          <div className="font-bold text-blue-400">Caribbean Coral Reef Recovery</div>
                          <div className="text-sm text-muted-foreground">Plastic removal • Coral restoration • 500 reefs</div>
                        </div>
                        <Badge className="bg-teal-600">54% Complete</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Call to Action */}
        <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40 mt-8">
          <CardContent className="p-8 text-center">
            <h2 className="text-4xl font-bold text-green-400 mb-4">
              🌍 EVERY TRANSACTION CHANGES THE WORLD
            </h2>
            <p className="text-xl text-green-300 mb-6">
              Your fees become a force for environmental healing. Choose your impact, track real results, change the planet.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600 text-white text-lg px-6 py-3">
                ✅ Zero Fees Available
              </Badge>
              <Badge className="bg-blue-600 text-white text-lg px-6 py-3">
                🎯 Choose Your Destination
              </Badge>
              <Badge className="bg-purple-600 text-white text-lg px-6 py-3">
                📊 Track Real Impact
              </Badge>
              <Badge className="bg-orange-600 text-white text-lg px-6 py-3">
                🔥 Token Burning for Green Projects
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
