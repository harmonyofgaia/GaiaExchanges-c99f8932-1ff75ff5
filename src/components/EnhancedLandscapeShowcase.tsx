import { LandscapePreview } from "./gaming/LandscapePreview";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Zap, Trophy } from "lucide-react";

export function EnhancedLandscapeShowcase() {
  return (
    <div className="space-y-6">
      <LandscapePreview />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-900/20 rounded border border-green-500/20">
          <div className="text-3xl mb-2">🦾</div>
          <div className="font-bold text-green-400">Bio-Mechanical Fusion</div>
          <div className="text-sm text-muted-foreground">Organic meets digital</div>
        </div>
        <div className="text-center p-4 bg-blue-900/20 rounded border border-blue-500/20">
          <div className="text-3xl mb-2">♾️</div>
          <div className="font-bold text-blue-400">Infinite Possibilities</div>
          <div className="text-sm text-muted-foreground">Endless exploration</div>
        </div>
        <div className="text-center p-4 bg-purple-900/20 rounded border border-purple-500/20">
          <div className="text-3xl mb-2">⚡</div>
          <div className="font-bold text-purple-400">Quantum Physics</div>
          <div className="text-sm text-muted-foreground">Reality-bending gameplay</div>
        </div>
      </div>
    </div>
  );
}
