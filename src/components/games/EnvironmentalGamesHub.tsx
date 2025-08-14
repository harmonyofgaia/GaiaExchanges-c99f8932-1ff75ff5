import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, TreePine, Target, Trophy, Zap, Users } from "lucide-react";
import { HabboTycoonGame } from "./HabboTycoonGame";
import { EcoMissionsHub } from "./EcoMissionsHub";

export function EnvironmentalGamesHub() {
  const [activeTab, setActiveTab] = useState("habbo-tycoon");

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            🌍 Environmental Games Hub
          </CardTitle>
          <p className="text-center text-lg text-muted-foreground">
            Play games, earn GAiA tokens, and make real environmental impact
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
              <Gamepad2 className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="font-bold text-green-400">Fun Games</div>
              <div className="text-sm text-muted-foreground">
                Engaging gameplay with environmental themes
              </div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <Zap className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="font-bold text-blue-400">Earn Tokens</div>
              <div className="text-sm text-muted-foreground">
                Get rewarded with real GAiA tokens
              </div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <TreePine className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="font-bold text-purple-400">Real Impact</div>
              <div className="text-sm text-muted-foreground">
                Your gameplay funds real environmental projects
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Games Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 h-auto p-2">
          <TabsTrigger value="habbo-tycoon" className="p-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="text-xs">Habbo Tycoon</span>
              <Badge className="bg-green-600 text-xs">New</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="eco-missions" className="p-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="text-xs">Eco Missions</span>
              <Badge className="bg-blue-600 text-xs">Active</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="p-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <Trophy className="h-4 w-4" />
              <span className="text-xs">Challenges</span>
              <Badge className="bg-purple-600 text-xs">Soon</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="p-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <Zap className="h-4 w-4" />
              <span className="text-xs">Leaderboard</span>
              <Badge className="bg-orange-600 text-xs">Live</Badge>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="habbo-tycoon" className="mt-0">
            <HabboTycoonGame />
          </TabsContent>

          <TabsContent value="eco-missions" className="mt-0">
            <EcoMissionsHub />
          </TabsContent>

          <TabsContent value="challenges" className="mt-0">
            <Card className="border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">🏆 Environmental Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Trophy className="h-16 w-16 mx-auto text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-purple-400 mb-2">Coming Soon!</h3>
                  <p className="text-muted-foreground">
                    Weekly environmental challenges with massive GAiA token rewards. Compete with
                    players worldwide to make the biggest environmental impact!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-0">
            <Card className="border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400">⚡ Global Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Zap className="h-16 w-16 mx-auto text-orange-400 mb-4" />
                  <h3 className="text-xl font-bold text-orange-400 mb-2">
                    Global Rankings Coming Soon!
                  </h3>
                  <p className="text-muted-foreground">
                    See how your environmental impact compares with players worldwide. Climb the
                    ranks and earn exclusive badges and rewards!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
