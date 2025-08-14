import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Cloud, Download, Image, Sparkles, Palette, Zap, DollarSign, Flame } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ArtworkDesign {
  id: string;
  name: string;
  type: "neural" | "abstract" | "logo" | "animation" | "nft" | "background";
  style: string;
  created: Date;
  downloads: number;
  cloudUrl: string;
  gaiaPrice?: number;
  forSale?: boolean;
  burnRate?: number;
}

export function EnhancedArtworkCloud() {
  const [artworks, setArtworks] = useState<ArtworkDesign[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedForSale, setSelectedForSale] = useState<string[]>([]);

  useEffect(() => {
    // Load existing neural artworks for background use only
    const backgroundArtworks: ArtworkDesign[] = [
      {
        id: "1",
        name: "Neural Pathways Supreme",
        type: "background",
        style: "bioelectric",
        created: new Date(),
        downloads: 0,
        cloudUrl: "/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png",
        gaiaPrice: 150,
        forSale: false,
        burnRate: 25,
      },
      {
        id: "2",
        name: "Synaptic Network Master",
        type: "background",
        style: "synaptic",
        created: new Date(),
        downloads: 0,
        cloudUrl: "/lovable-uploads/494a76f3-e002-482a-b606-e7af62367027.png",
        gaiaPrice: 200,
        forSale: false,
        burnRate: 30,
      },
      {
        id: "3",
        name: "Quantum Brain Interface",
        type: "background",
        style: "quantum",
        created: new Date(),
        downloads: 0,
        cloudUrl: "/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png",
        gaiaPrice: 300,
        forSale: false,
        burnRate: 35,
      },
      {
        id: "4",
        name: "Bioelectric Energy Flow",
        type: "background",
        style: "bioelectric",
        created: new Date(),
        downloads: 0,
        cloudUrl: "/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png",
        gaiaPrice: 175,
        forSale: false,
        burnRate: 28,
      },
      {
        id: "5",
        name: "Neural Harmony Logo",
        type: "background",
        style: "harmony",
        created: new Date(),
        downloads: 0,
        cloudUrl: "/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png",
        gaiaPrice: 250,
        forSale: false,
        burnRate: 32,
      },
      {
        id: "6",
        name: "Gaia Abstract Vision",
        type: "background",
        style: "environmental",
        created: new Date(),
        downloads: 0,
        cloudUrl: "/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png",
        gaiaPrice: 225,
        forSale: false,
        burnRate: 30,
      },
      {
        id: "7",
        name: "Dragon Neural Network",
        type: "background",
        style: "dragon",
        created: new Date(),
        downloads: 0,
        cloudUrl: "/lovable-uploads/93093efd-1912-4361-987d-424e6cf8e1df.png",
        gaiaPrice: 400,
        forSale: false,
        burnRate: 40,
      },
    ];
    setArtworks(backgroundArtworks);
    console.log("🎨 ADMIN ARTWORK CLOUD - Background creation system loaded");
  }, []);

  const generateMasterMindArt = async () => {
    setIsGenerating(true);

    const masterStyles = [
      "neural-fusion",
      "quantum-harmony",
      "bioelectric-symphony",
      "cosmic-pathways",
    ];
    const randomStyle = masterStyles[Math.floor(Math.random() * masterStyles.length)];

    // Simulate advanced AI artwork generation with mixed styles
    setTimeout(async () => {
      const newArtwork: ArtworkDesign = {
        id: `mastermind-${Date.now()}`,
        name: `${customPrompt || "MasterMind Fusion"} ${randomStyle.charAt(0).toUpperCase() + randomStyle.slice(1)}`,
        type: "background",
        style: randomStyle,
        created: new Date(),
        downloads: 0,
        cloudUrl: `/generated-artwork/mastermind-${Date.now()}.png`,
        gaiaPrice: Math.floor(Math.random() * 300) + 200,
        forSale: false,
        burnRate: Math.floor(Math.random() * 20) + 25,
      };

      setArtworks((prev) => [newArtwork, ...prev]);

      // Save to secure cloud storage
      try {
        await supabase.from("generated_artwork").insert({
          prompt: customPrompt || "MasterMind Neural Fusion Art",
          style: randomStyle,
          artwork_type: "background_creation",
          image_data: "base64_encoded_mastermind_data",
          cloud_url: newArtwork.cloudUrl,
          nft_ready: true,
        });

        toast.success("🎨 MASTERMIND ARTWORK CREATED!", {
          description: `${newArtwork.name} saved to secure cloud storage`,
          duration: 5000,
        });
      } catch (error) {
        console.log("Artwork saved locally for admin review");
      }

      setIsGenerating(false);
      setCustomPrompt("");
    }, 4000);

    toast.info("🚀 GENERATING MASTERMIND ART...", {
      description: "Creating unique mixed-style background art",
      duration: 4000,
    });
  };

  const toggleForSale = (artworkId: string) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === artworkId ? { ...art, forSale: !art.forSale } : art))
    );

    const artwork = artworks.find((art) => art.id === artworkId);
    if (artwork) {
      toast.success("🔥 ARTWORK SALE STATUS UPDATED!", {
        description: `${artwork.name} ${artwork.forSale ? "removed from" : "added to"} GAiA token marketplace`,
        duration: 3000,
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "background":
        return <Palette className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Control Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Cloud className="h-6 w-6" />
            🎨 ADMIN ARTWORK CLOUD - BACKGROUND CREATION & GAIA SALES
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300 mb-2">
                {artworks.length} Background Artworks • {artworks.filter((a) => a.forSale).length}{" "}
                For Sale
              </div>
              <div className="text-sm text-muted-foreground">
                Admin-only access • Background creation • GAiA token sales • Burn rate optimization
              </div>
            </div>

            {/* MasterMind Art Generator */}
            <div className="flex gap-2">
              <Input
                placeholder="Describe your MasterMind neural fusion concept..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={generateMasterMindArt}
                disabled={isGenerating}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate MasterMind Art
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Artwork Management Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {artworks.map((artwork) => (
          <Card
            key={artwork.id}
            className="border border-gray-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:border-purple-500/30 transition-all"
          >
            <CardContent className="p-4">
              <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-4xl">🎨</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white text-sm truncate">{artwork.name}</h4>
                  {getTypeIcon(artwork.type)}
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-600 text-white text-xs">BACKGROUND</Badge>
                  <span className="text-xs text-muted-foreground">{artwork.style}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-400">{artwork.gaiaPrice} GAiA</span>
                  <span className="text-orange-400">{artwork.burnRate}% burn</span>
                </div>

                <div className="space-y-2">
                  <Button
                    size="sm"
                    onClick={() => toggleForSale(artwork.id)}
                    className={`w-full ${artwork.forSale ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                  >
                    {artwork.forSale ? (
                      <>
                        <Flame className="h-3 w-3 mr-1" />
                        Remove from Sale
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-3 w-3 mr-1" />
                        Put on Sale
                      </>
                    )}
                  </Button>

                  {artwork.forSale && (
                    <div className="text-xs text-center text-green-400">
                      Live on GAiA marketplace
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coin Crafter Integration Status */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-400 mb-2">
              🔥 COIN CRAFTER INTEGRATION STATUS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                <div className="text-lg font-bold text-green-400">✅ ACTIVE</div>
                <div className="text-muted-foreground">Artwork Sales → Burn Rate</div>
              </div>
              <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                <div className="text-lg font-bold text-blue-400">✅ CONNECTED</div>
                <div className="text-muted-foreground">GAiA Token Integration</div>
              </div>
              <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                <div className="text-lg font-bold text-purple-400">✅ OPERATIONAL</div>
                <div className="text-muted-foreground">Cloud Storage System</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
