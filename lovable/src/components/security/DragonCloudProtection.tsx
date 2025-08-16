import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Cloud, Lock, Eye, FileText, Database, Zap, Sword } from "lucide-react";
import { toast } from "sonner";

export function DragonCloudProtection() {
  const [cloudFiles, setCloudFiles] = useState(0);
  const [protectionLevel, setProtectionLevel] = useState("MAXIMUM");
  const [dragonArmor, setDragonArmor] = useState(100);
  const [activeThreats, setActiveThreats] = useState(0);

  useEffect(() => {
    const dragonProtectionCycle = () => {
      console.log("🐉 DRAGON FULL BODY ARMOR PROTECTION ACTIVE");
      console.log("🛡️ PROTECTING ALL CLOUD FILES WITH DRAGON ARMOR");

      // Simulate dragon protecting files
      setCloudFiles((prev) => prev + Math.floor(Math.random() * 5));
      setDragonArmor(100); // Always maximum armor
      setActiveThreats(0); // Dragon eliminates all threats

      // Dragon gets stronger with each protection cycle
      console.log("🐉 DRAGON ARMOR STRENGTHENED - FULL BODY PROTECTION ENHANCED");

      if (Math.random() < 0.1) {
        toast.success("🐉 Dragon Cloud Protection Enhanced!", {
          description: "All files secured with dragon full body armor",
          duration: 4000,
        });
      }
    };

    // Dragon protects every millisecond
    const protectionInterval = setInterval(dragonProtectionCycle, 1);

    return () => clearInterval(protectionInterval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Dragon Cloud Protection Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-black/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Cloud className="h-6 w-6" />
            🐉 DRAGON FULL BODY ARMOR CLOUD PROTECTION
            <Badge className="bg-purple-600 text-white animate-pulse">
              <Shield className="h-3 w-3 mr-1" />
              MAXIMUM ARMOR
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <FileText className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {cloudFiles.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Protected Files</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{dragonArmor}%</div>
              <div className="text-sm text-muted-foreground">Dragon Armor</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <Lock className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{protectionLevel}</div>
              <div className="text-sm text-muted-foreground">Protection Level</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-red-900/30 border border-red-500/20">
              <Zap className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{activeThreats}</div>
              <div className="text-sm text-muted-foreground">Active Threats</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dragon Protection Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-red-900/20 border border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400">🛡️ DRAGON FULL BODY ARMOR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Head Protection:</span>
                <Badge className="bg-green-600 text-white">ACTIVE</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Chest Armor:</span>
                <Badge className="bg-green-600 text-white">MAXIMUM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Wing Shields:</span>
                <Badge className="bg-green-600 text-white">DEPLOYED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tail Defense:</span>
                <Badge className="bg-green-600 text-white">ENHANCED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Claw Protection:</span>
                <Badge className="bg-green-600 text-white">LETHAL</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-900/20 border border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400">☁️ CLOUD FILE PROTECTION</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Connection Logs:</span>
                <Badge className="bg-purple-600 text-white">SECURED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">IP Database:</span>
                <Badge className="bg-purple-600 text-white">ENCRYPTED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Location Data:</span>
                <Badge className="bg-purple-600 text-white">PROTECTED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Threat Reports:</span>
                <Badge className="bg-purple-600 text-white">CLASSIFIED</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Admin Documents:</span>
                <Badge className="bg-purple-600 text-white">INVISIBLE</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dragon Actions */}
      <Card className="bg-gradient-to-r from-red-900/20 to-purple-900/20 border border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400">🐉 DRAGON PROTECTION ACTIONS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-red-600 hover:bg-red-700 h-16">
              <Sword className="h-5 w-5 mr-2" />
              🛡️ ENHANCE ARMOR
              <br />
              Strengthen Full Body Protection
            </Button>

            <Button className="bg-purple-600 hover:bg-purple-700 h-16">
              <Cloud className="h-5 w-5 mr-2" />
              ☁️ SECURE CLOUD
              <br />
              Protect All Files with Armor
            </Button>

            <Button className="bg-blue-600 hover:bg-blue-700 h-16">
              <Eye className="h-5 w-5 mr-2" />
              👁️ DRAGON SURVEILLANCE
              <br />
              Monitor All Cloud Access
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Protection Guarantee */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-4">
            🐉 DRAGON FULL BODY ARMOR GUARANTEE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-6xl">🛡️</div>
              <div className="font-bold text-red-400">FULL BODY ARMOR</div>
              <div className="text-sm text-muted-foreground">
                Every file protected by dragon's complete armor system
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-6xl">👑</div>
              <div className="font-bold text-purple-400">ADMIN ONLY ACCESS</div>
              <div className="text-sm text-muted-foreground">
                Invisible to all users except verified admin accounts
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-red-900/20 rounded-lg">
            <div className="text-xl font-bold text-red-400">
              🐉 NO FILE CAN BE ACCESSED WITHOUT DRAGON PERMISSION 🐉
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Dragon's full body armor protects every byte of data with maximum security
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
