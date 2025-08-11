import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Flame,
  Zap,
  Crown,
  Users,
  AlertTriangle,
  Trophy,
  Globe,
  Leaf,
  Heart,
  Star,
} from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";
import { EnhancedArtisticTitle } from "./EnhancedArtisticTitle";

export const HeroSection = () => {
  const worldRankings = [
    {
      position: 1,
      title: "Most Pure Ecological Token",
      badge: "🌍 #1 WORLDWIDE",
    },
    {
      position: 1,
      title: "Leading Environmental Impact",
      badge: "🌱 #1 GLOBAL",
    },
    { position: 1, title: "Most Innovative Tribe", badge: "⚡ #1 UNIVERSE" },
    { position: 1, title: "Strongest Community Bond", badge: "❤️ #1 HARMONY" },
    { position: 1, title: "Purest Dragon Protection", badge: "🐲 #1 SECURITY" },
    {
      position: 1,
      title: "Most Advanced Token Burning",
      badge: "🔥 #1 IMPACT",
    },
  ];

  return (
    <div className="text-center mb-12 relative">
      {/* Enhanced Artistic Title Component */}
      <EnhancedArtisticTitle />

      {/* BRAND CLARIFICATION NOTICE */}
      <div className="relative mb-8">
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm shadow-lg shadow-red-500/20">
          <div className="flex items-center justify-center gap-2 text-red-400 font-bold mb-4 text-xl">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            IMPORTANT BRAND CLARIFICATION
            <AlertTriangle className="h-6 w-6 animate-pulse" />
          </div>
          <div className="border-2 border-red-400/30 rounded-lg p-4 bg-black/20">
            <p className="text-lg text-red-300 font-semibold leading-relaxed">
              We are{" "}
              <span className="text-red-400 font-bold">
                NOT GAIA Everworld!
              </span>{" "}
              We are{" "}
              <span className="text-green-400 font-bold">GAiA Token</span> - a
              completely separate, exclusive project powered by{" "}
              <span className="text-blue-400 font-bold">
                Harmony of Gaia Projects Creator Business
              </span>
              , empowered by{" "}
              <span className="text-purple-400 font-bold">
                Culture of Harmony
              </span>
              .
            </p>
          </div>
        </div>
      </div>

      {/* WORLDWIDE RANKINGS */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-gold-900/20 to-yellow-900/20 border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold mb-6 text-2xl">
              <Trophy className="h-8 w-8 animate-bounce" />
              🏆 WORLDWIDE RANKINGS - WE ARE #1 IN EVERYTHING 🏆
              <Trophy className="h-8 w-8 animate-bounce" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {worldRankings.map((ranking, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg p-4"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      #{ranking.position}
                    </div>
                    <div className="text-white font-semibold mb-2">
                      {ranking.title}
                    </div>
                    <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-xs animate-pulse">
                      {ranking.badge}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-yellow-400 font-bold text-lg mb-2">
                🌟 THE MOST PURE AND ECOLOGIC FRIENDLY TRIBE IN THE UNIVERSE 🌟
              </div>
              <p className="text-yellow-300 text-sm">
                Leading the world in environmental protection, community
                harmony, and innovative blockchain solutions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative mb-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg blur-sm" />
          <div className="relative bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm">
            <div className="text-2xl font-bold text-green-400 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 animate-pulse" />
              🚀 POWERED BY GAiA TOKEN (NOT GAIA EVERWORLD)
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                <span className="text-green-400 font-semibold">
                  Our Contract:
                </span>
                <code className="mt-2 bg-black/30 px-2 py-1 rounded text-xs font-mono">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </code>
              </div>
              <div className="flex flex-col items-center p-3 bg-black/20 rounded-lg">
                <span className="text-blue-400 font-semibold">Our Wallet:</span>
                <code className="mt-2 bg-black/30 px-2 py-1 rounded text-xs font-mono">
                  {GAIA_TOKEN.WALLET_ADDRESS}
                </code>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-center italic">
              Exclusive GAiA Token ecosystem with dragon-level security -
              Culture of Harmony powered
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-6 flex-wrap">
          <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl px-8 py-3 animate-bounce shadow-lg shadow-red-500/25 border border-red-400/30">
            <Flame className="h-5 w-5 mr-2" />
            Dragon Protected
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl px-8 py-3 animate-pulse shadow-lg shadow-blue-500/25 border border-blue-400/30">
            <Zap className="h-5 w-5 mr-2" />
            Quantum Secure
          </Badge>
          <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl px-8 py-3 animate-bounce shadow-lg shadow-green-500/25 border border-green-400/30">
            <Crown className="h-5 w-5 mr-2" />
            Forever Invisible
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl px-8 py-3 animate-pulse shadow-lg shadow-purple-500/25 border border-purple-400/30">
            <Users className="h-5 w-5 mr-2" />
            Culture of Harmony
          </Badge>
        </div>
      </div>
    </div>
  );
};
