import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Star, Sparkles } from "lucide-react";

export function GameStyleSelector() {
  const styles = [
    {
      name: "Classic",
      description: "Traditional gaming experience with timeless appeal",
      color: "from-blue-600 to-cyan-600",
      popularity: "4.8/5",
      features: ["Clean UI", "Standard Controls", "Familiar Mechanics"],
    },
    {
      name: "Neon",
      description: "Futuristic cyberpunk aesthetic with glowing effects",
      color: "from-purple-600 to-pink-600",
      popularity: "4.9/5",
      features: ["Glow Effects", "Synthwave Music", "Dark Themes"],
    },
    {
      name: "Nature",
      description: "Environmental and organic themes with Earth tones",
      color: "from-green-600 to-teal-600",
      popularity: "4.7/5",
      features: ["Natural Sounds", "Organic Shapes", "Earth Tones"],
    },
    {
      name: "Retro",
      description: "Nostalgic pixel art style with 8-bit charm",
      color: "from-yellow-600 to-orange-600",
      popularity: "4.6/5",
      features: ["Pixel Art", "Chiptune Music", "8-bit Sounds"],
    },
    {
      name: "Minimalist",
      description: "Clean, simple design focused on gameplay",
      color: "from-gray-600 to-slate-600",
      popularity: "4.5/5",
      features: ["Clean Design", "Focused UI", "Subtle Effects"],
    },
    {
      name: "Quantum",
      description: "Reality-bending visuals with impossible geometry",
      color: "from-indigo-600 to-purple-600",
      popularity: "4.9/5",
      features: ["Reality Shifting", "Impossible Physics", "Mind-Bending"],
    },
  ];

  return (
    <Card className="border-green-500/30 bg-green-900/20">
      <CardHeader>
        <CardTitle className="text-green-400">🎨 Advanced Game Style Selection</CardTitle>
        <p className="text-muted-foreground text-sm">
          Transform your gaming experience with unique visual styles
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {styles.map((style, index) => (
            <div
              key={index}
              className={`p-4 bg-gradient-to-br ${style.color}/20 rounded-lg border border-opacity-50 hover:scale-105 transition-all`}
            >
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                {style.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">{style.description}</p>

              <div className="mb-3">
                <h5 className="text-xs font-bold text-white mb-1">Features:</h5>
                <div className="flex flex-wrap gap-1">
                  {style.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">{style.popularity}</span>
                </div>
                <Badge className={`bg-gradient-to-r ${style.color}`}>Available</Badge>
              </div>

              <Button
                className={`w-full bg-gradient-to-r ${style.color} hover:opacity-90 text-white font-bold`}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Apply Style
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
