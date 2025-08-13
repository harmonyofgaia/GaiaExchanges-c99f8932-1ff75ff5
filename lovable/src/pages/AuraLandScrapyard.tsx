import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Recycle, Sparkles, Hammer } from "lucide-react";

export default function AuraLandScrapyard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 p-6">
      <div className="container mx-auto">
        <Card className="mb-8 border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-pink-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center gap-3">
              <Palette className="h-12 w-12 text-purple-400 animate-pulse" />
              🎨 Aura Land Scrapyard
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Creative Recycling and Digital Art Studio
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-purple-600">🎨 Creative</Badge>
              <Badge className="bg-green-600">♻️ Recycling</Badge>
              <Badge className="bg-blue-600">✨ Digital Art</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-purple-500/50 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Palette className="h-6 w-6" />
                Digital Art Studio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create stunning digital artwork using our advanced design tools
                and AI assistance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Recycle className="h-6 w-6" />
                Material Recycling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Transform waste materials into beautiful digital assets and earn
                rewards.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-500/50 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Hammer className="h-6 w-6" />
                Crafting Workshop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use recycled materials to craft unique items and environmental
                solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
