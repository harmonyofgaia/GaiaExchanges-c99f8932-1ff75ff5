import { GaiaFighterGameRestored } from "@/components/GaiaFighterGameRestored";
import { LandscapeBuilderRestored } from "@/components/LandscapeBuilderRestored";
import { VideoStreamingPlatform } from "@/components/VideoStreamingPlatform";
import { WebsiteHostingManager } from "@/components/WebsiteHostingManager";
import { SystemRecheck } from "@/components/SystemRecheck";
import { DatabaseErrorFixer } from "@/components/security/DatabaseErrorFixer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Palette, Video, Globe, Settings, Shield } from "lucide-react";

const CompleteSystemHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <DatabaseErrorFixer />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🌍 HARMONY OF GAIA - COMPLETE SYSTEM HUB
          </h1>
          <p className="text-muted-foreground mb-4">
            World's #1 Ecological Project • All Systems Integrated • Full Platform Access
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-green-600 text-white">Gaming Platform</Badge>
            <Badge className="bg-blue-600 text-white">Video Streaming</Badge>
            <Badge className="bg-purple-600 text-white">Landscape Builder</Badge>
            <Badge className="bg-orange-600 text-white">Web Hosting</Badge>
            <Badge className="bg-cyan-600 text-white">System Management</Badge>
          </div>
        </div>

        <Tabs defaultValue="gaming" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="gaming" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Gaming
            </TabsTrigger>
            <TabsTrigger value="streaming" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Streaming
            </TabsTrigger>
            <TabsTrigger value="landscape" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Landscape
            </TabsTrigger>
            <TabsTrigger value="hosting" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Hosting
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gaming" className="space-y-6">
            <GaiaFighterGameRestored />
          </TabsContent>

          <TabsContent value="streaming" className="space-y-6">
            <VideoStreamingPlatform />
          </TabsContent>

          <TabsContent value="landscape" className="space-y-6">
            <LandscapeBuilderRestored />
          </TabsContent>

          <TabsContent value="hosting" className="space-y-6">
            <WebsiteHostingManager />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemRecheck />
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Shield className="h-6 w-6" />
                  🌍 HARMONY OF GAIA - COMPLETE PLATFORM OVERVIEW
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Gamepad2 className="h-5 w-5 text-green-400" />
                      <h3 className="font-bold text-green-400">Gaming Platform</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Gaia Fighter Game with environmental battles and GAiA token rewards
                    </p>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="h-5 w-5 text-purple-400" />
                      <h3 className="font-bold text-purple-400">Video Streaming</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Live streaming platform for environmental and gaming content
                    </p>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="h-5 w-5 text-blue-400" />
                      <h3 className="font-bold text-blue-400">Landscape Builder</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      VR-ready world creation tools with Little Big Planet integration
                    </p>
                  </div>

                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-5 w-5 text-orange-400" />
                      <h3 className="font-bold text-orange-400">Web Hosting</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Official website hosting at www.gaiaexchanges.com with quantum security
                    </p>
                  </div>

                  <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-5 w-5 text-cyan-400" />
                      <h3 className="font-bold text-cyan-400">System Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Complete system monitoring and health checks for all platforms
                    </p>
                  </div>

                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-red-400" />
                      <h3 className="font-bold text-red-400">Security Systems</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quantum-level protection with automatic dragon training systems
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-400 mb-4">
                    🚀 All Systems Fully Operational
                  </h3>
                  <p className="text-muted-foreground">
                    Complete Harmony of Gaia ecosystem with integrated GAiA token support, quantum
                    security, and world-class features for environmental impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompleteSystemHub;
