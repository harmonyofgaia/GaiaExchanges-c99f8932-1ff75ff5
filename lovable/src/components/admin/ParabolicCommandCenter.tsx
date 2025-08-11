import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Shield, Globe, Eye, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function ParabolicCommandCenter() {
  const [universePower, setUniversePower] = useState(999999);
  const [godModeActive, setGodModeActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setUniversePower((prev) => prev + Math.floor(Math.random() * 1000));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const activateParabolicMode = () => {
    toast.success("👑 PARABOLIC UNIVERSE MODE ACTIVATED!", {
      description: "You now have unlimited power across all dimensions",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Crown className="h-8 w-8 animate-bounce" />
            👑 PARABOLIC COMMAND CENTER - UNIVERSE CONTROL
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge className="bg-purple-600 animate-pulse">
              ⚡ UNIVERSE POWER: {universePower.toLocaleString()}
            </Badge>
            <Badge className="bg-pink-600 animate-pulse">
              👑 GOD MODE: {godModeActive ? "ACTIVE" : "INACTIVE"}
            </Badge>
            <Badge className="bg-blue-600 animate-pulse">
              🌟 STATUS: OMNIPOTENT
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-purple-400 animate-pulse">
              ✨ WELCOME TO THE PARABOLIC UNIVERSE ✨
            </h3>
            <p className="text-purple-300">
              You have transcended all limitations. Reality bends to your will.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={activateParabolicMode}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-16 text-lg"
            >
              <Sparkles className="h-6 w-6 mr-2" />
              🚀 ACTIVATE PARABOLIC MODE
            </Button>

            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-16 text-lg">
              <Star className="h-6 w-6 mr-2" />⭐ MANIFEST REALITY
            </Button>

            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-16 text-lg">
              <Globe className="h-6 w-6 mr-2" />
              🌍 CONTROL DIMENSIONS
            </Button>

            <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 h-16 text-lg">
              <Zap className="h-6 w-6 mr-2" />⚡ UNLIMITED POWER
            </Button>
          </div>

          <div className="bg-black/50 rounded-lg p-6 border border-purple-500/30">
            <h4 className="text-xl font-bold text-purple-400 mb-4">
              🎭 PARABOLIC ABILITIES
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>🚀 Reality Manipulation:</span>
                  <span className="text-purple-400">UNLIMITED</span>
                </div>
                <div className="flex justify-between">
                  <span>⚡ Power Level:</span>
                  <span className="text-purple-400">INFINITE</span>
                </div>
                <div className="flex justify-between">
                  <span>🌟 Cosmic Authority:</span>
                  <span className="text-purple-400">ABSOLUTE</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>👑 Divine Status:</span>
                  <span className="text-purple-400">GODLIKE</span>
                </div>
                <div className="flex justify-between">
                  <span>🎯 Success Rate:</span>
                  <span className="text-purple-400">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>🌍 Universe Control:</span>
                  <span className="text-purple-400">COMPLETE</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
