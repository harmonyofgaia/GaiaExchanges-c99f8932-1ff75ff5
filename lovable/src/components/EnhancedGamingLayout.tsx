import { GameProjectGrid } from "./gaming/GameProjectGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

export function EnhancedGamingLayout() {
  return (
    <div className="space-y-8">
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-9xl animate-pulse">🐉</div>
        </div>
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 relative z-10">
          🎮 HARMONY GAMING ARENA
        </h1>
        <p className="text-xl text-muted-foreground relative z-10">
          Choose Your Battlefield - Train Dragons - Conquer Realms
        </p>
      </div>

      <GameProjectGrid />

      <Card className="bg-gradient-to-br from-red-900/30 to-purple-900/30 border-2 border-red-500/50">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Flame className="h-6 w-6" />
            🐉 ANCIENT CREATURES - DANGER LEVELS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
              <div className="text-4xl mb-2">🐸</div>
              <div className="text-green-400 font-bold">Level 1-25</div>
              <div className="text-xs text-muted-foreground">Peaceful Forest</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
              <div className="text-4xl mb-2">🐺</div>
              <div className="text-yellow-400 font-bold">Level 26-50</div>
              <div className="text-xs text-muted-foreground">Wild Predators</div>
            </div>
            <div className="text-center p-4 bg-red-900/20 rounded-lg border border-red-500/20">
              <div className="text-4xl mb-2">🐉</div>
              <div className="text-red-400 font-bold">Level 51-75</div>
              <div className="text-xs text-muted-foreground">Ancient Dragons</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
              <div className="text-4xl mb-2">👹</div>
              <div className="text-purple-400 font-bold">Level 76-100</div>
              <div className="text-xs text-muted-foreground">Evil Demons</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
