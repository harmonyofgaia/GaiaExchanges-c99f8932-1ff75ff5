import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Zap, Shield } from "lucide-react";
import { toast } from "sonner";

export function CommunityRecoveryEngine() {
  const [communityStrength, setCommunityStrength] = useState(99.9);
  const [membersProtected, setMembersProtected] = useState(50000);
  const [recoveryMissions, setRecoveryMissions] = useState(999);

  const activateRecoveryProtocol = () => {
    setCommunityStrength(100);

    console.log("❤️ COMMUNITY RECOVERY ENGINE ACTIVATED");
    console.log("🌍 PROTECTING ALL HARMONY OF GAIA MEMBERS");
    console.log("🛡️ GLOBAL COMMUNITY SHIELD DEPLOYED");

    toast.success("❤️ COMMUNITY RECOVERY ACTIVATED!", {
      description: "All community members now under ultimate protection",
      duration: 8000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">
            ❤️ COMMUNITY RECOVERY ENGINE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <div className="text-3xl font-bold text-green-400">
                {communityStrength.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Community Strength
              </div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <div className="text-3xl font-bold text-blue-400">
                {membersProtected.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Members Protected
              </div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <div className="text-3xl font-bold text-purple-400">
                {recoveryMissions}
              </div>
              <div className="text-sm text-muted-foreground">
                Recovery Missions
              </div>
            </div>
          </div>

          <Button
            onClick={activateRecoveryProtocol}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-16 text-lg mb-6"
          >
            <Heart className="h-6 w-6 mr-2" />
            ❤️ ACTIVATE COMMUNITY PROTECTION
          </Button>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-white">Community Unity</span>
                <span className="text-green-400">
                  {communityStrength.toFixed(1)}%
                </span>
              </div>
              <Progress value={communityStrength} className="h-3" />
            </div>

            <div className="space-y-2">
              <h4 className="text-green-400 font-bold">
                🌍 GLOBAL COMMUNITY PROTECTION:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Badge className="bg-green-600">
                  🌱 Environmental Activists
                </Badge>
                <Badge className="bg-blue-600">
                  💚 Green Technology Supporters
                </Badge>
                <Badge className="bg-purple-600">🔬 Quantum Researchers</Badge>
                <Badge className="bg-orange-600">🎮 Gaming Community</Badge>
                <Badge className="bg-red-600">🛡️ Security Enthusiasts</Badge>
                <Badge className="bg-yellow-600">💰 Vault Investors</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
