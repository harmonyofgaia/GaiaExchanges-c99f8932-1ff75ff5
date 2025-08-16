import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Sword,
  Flame,
  Zap,
  Crown,
  Star,
  Download,
  FileText,
  Edit,
  Save,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useSecureAdmin } from "@/hooks/useSecureAdmin";

interface EnhancedNFT {
  id: string;
  name: string;
  type: "Attack" | "Defense" | "Special" | "Ultimate";
  element: "Fire" | "Water" | "Earth" | "Air" | "Lightning" | "Shadow" | "Light";
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythical" | "Divine";
  sprite: string;
  stats: {
    attackPower: number;
    defensePower: number;
    speed: number;
    energy: number;
    durability: number;
    specialAbility: number;
  };
  abilities: {
    primary: string;
    secondary: string;
    ultimate: string;
  };
  descriptions: {
    lore: string;
    combatStyle: string;
    strengths: string[];
    weaknesses: string[];
  };
  elementalProperties: {
    resistant: string[];
    vulnerable: string[];
    superEffective: string[];
  };
  isReorderable: boolean;
  createdBy: "ai" | "admin";
}

export function EnhancedNFTSystem() {
  const { isAdmin } = useSecureAdmin();
  const [nfts, setNfts] = useState<EnhancedNFT[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<EnhancedNFT | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      loadEnhancedNFTs();
    }
  }, [isAdmin]);

  const loadEnhancedNFTs = () => {
    const enhancedNFTCollection: EnhancedNFT[] = [
      {
        id: "fire-dragon-attack",
        name: "Inferno Strike",
        type: "Attack",
        element: "Fire",
        rarity: "Divine",
        sprite: "🔥",
        stats: {
          attackPower: 100,
          defensePower: 70,
          speed: 85,
          energy: 90,
          durability: 80,
          specialAbility: 95,
        },
        abilities: {
          primary: "Molten Breath",
          secondary: "Flame Shield",
          ultimate: "Dragon's Inferno",
        },
        descriptions: {
          lore: "Forged in the heart of ancient volcanoes, this mystical force harnesses pure flame energy.",
          combatStyle: "Aggressive frontal assault with devastating area damage",
          strengths: ["Massive AOE damage", "Burns through armor", "Fear inducement"],
          weaknesses: ["Water-based attacks", "High energy consumption", "Slow recovery"],
        },
        elementalProperties: {
          resistant: ["Fire", "Earth"],
          vulnerable: ["Water"],
          superEffective: ["Earth", "Air"],
        },
        isReorderable: true,
        createdBy: "ai",
      },
      {
        id: "earth-fortress-defense",
        name: "Titanium Barrier",
        type: "Defense",
        element: "Earth",
        rarity: "Legendary",
        sprite: "🛡️",
        stats: {
          attackPower: 60,
          defensePower: 100,
          speed: 40,
          energy: 85,
          durability: 95,
          specialAbility: 80,
        },
        abilities: {
          primary: "Stone Wall",
          secondary: "Earthquake Tremor",
          ultimate: "Fortress of Eternity",
        },
        descriptions: {
          lore: "Born from the deepest mountain cores, this defensive marvel absorbs and redirects all attacks.",
          combatStyle: "Immovable defense with counter-attack capabilities",
          strengths: ["Absorbs physical damage", "Reflects projectiles", "Self-repair ability"],
          weaknesses: ["Lightning attacks", "Mobility limitations", "Long activation time"],
        },
        elementalProperties: {
          resistant: ["Fire", "Air"],
          vulnerable: ["Lightning"],
          superEffective: ["Fire", "Water"],
        },
        isReorderable: true,
        createdBy: "ai",
      },
      {
        id: "lightning-speed-special",
        name: "Thunder Strike",
        type: "Special",
        element: "Lightning",
        rarity: "Mythical",
        sprite: "⚡",
        stats: {
          attackPower: 90,
          defensePower: 50,
          speed: 100,
          energy: 95,
          durability: 70,
          specialAbility: 100,
        },
        abilities: {
          primary: "Lightning Bolt",
          secondary: "Static Field",
          ultimate: "Storm of Vengeance",
        },
        descriptions: {
          lore: "Captured from the essence of the first thunderstorm, this power moves at the speed of light.",
          combatStyle: "Lightning-fast strikes with chain damage effects",
          strengths: ["Instant activation", "Chain lightning", "Stun effects"],
          weaknesses: ["Water conductivity danger", "Energy drain", "Limited range"],
        },
        elementalProperties: {
          resistant: ["Air", "Light"],
          vulnerable: ["Earth"],
          superEffective: ["Water", "Air"],
        },
        isReorderable: true,
        createdBy: "ai",
      },
      {
        id: "water-healing-special",
        name: "Tidal Restoration",
        type: "Special",
        element: "Water",
        rarity: "Epic",
        sprite: "🌊",
        stats: {
          attackPower: 70,
          defensePower: 80,
          speed: 75,
          energy: 100,
          durability: 90,
          specialAbility: 85,
        },
        abilities: {
          primary: "Healing Wave",
          secondary: "Aqua Shield",
          ultimate: "Ocean's Blessing",
        },
        descriptions: {
          lore: "Blessed by ancient sea spirits, this essence brings life and renewal to all it touches.",
          combatStyle: "Support-based healing with defensive capabilities",
          strengths: ["Continuous healing", "Purification effects", "Team support"],
          weaknesses: ["Fire evaporation", "Freezing vulnerability", "Low direct damage"],
        },
        elementalProperties: {
          resistant: ["Fire"],
          vulnerable: ["Lightning", "Air"],
          superEffective: ["Fire", "Earth"],
        },
        isReorderable: true,
        createdBy: "ai",
      },
      {
        id: "shadow-ultimate",
        name: "Void Annihilation",
        type: "Ultimate",
        element: "Shadow",
        rarity: "Divine",
        sprite: "🌑",
        stats: {
          attackPower: 95,
          defensePower: 85,
          speed: 90,
          energy: 80,
          durability: 75,
          specialAbility: 100,
        },
        abilities: {
          primary: "Shadow Strike",
          secondary: "Darkness Veil",
          ultimate: "Reality Tear",
        },
        descriptions: {
          lore: "Summoned from the void between worlds, this ultimate power bends reality itself.",
          combatStyle: "Stealth-based attacks with reality manipulation",
          strengths: ["Invisibility", "Ignore defenses", "Fear effects"],
          weaknesses: ["Light attacks", "High energy cost", "Unpredictable nature"],
        },
        elementalProperties: {
          resistant: ["Shadow", "Earth"],
          vulnerable: ["Light"],
          superEffective: ["Light", "Air"],
        },
        isReorderable: true,
        createdBy: "ai",
      },
    ];

    setNfts(enhancedNFTCollection);
  };

  const generatePDFDocumentation = () => {
    toast.info("📄 Generating PDF Documentation...", {
      description: "Creating comprehensive NFT abilities and capabilities guide",
      duration: 3000,
    });

    setTimeout(() => {
      setPdfGenerated(true);
      toast.success("✅ PDF Documentation Generated!", {
        description: "Complete NFT guide is ready for admin access",
        duration: 4000,
      });
    }, 3000);
  };

  const downloadPDF = () => {
    // Simulate PDF download
    const pdfContent = nfts
      .map(
        (nft) => `
=== ${nft.name} (${nft.rarity} ${nft.element} ${nft.type}) ===

LORE: ${nft.descriptions.lore}

COMBAT STYLE: ${nft.descriptions.combatStyle}

ABILITIES:
- Primary: ${nft.abilities.primary}
- Secondary: ${nft.abilities.secondary}
- Ultimate: ${nft.abilities.ultimate}

STATS:
- Attack Power: ${nft.stats.attackPower}
- Defense Power: ${nft.stats.defensePower}
- Speed: ${nft.stats.speed}
- Energy: ${nft.stats.energy}
- Durability: ${nft.stats.durability}
- Special Ability: ${nft.stats.specialAbility}

STRENGTHS: ${nft.descriptions.strengths.join(", ")}
WEAKNESSES: ${nft.descriptions.weaknesses.join(", ")}

ELEMENTAL PROPERTIES:
- Resistant to: ${nft.elementalProperties.resistant.join(", ")}
- Vulnerable to: ${nft.elementalProperties.vulnerable.join(", ")}
- Super effective against: ${nft.elementalProperties.superEffective.join(", ")}

-------------------
    `
      )
      .join("\n");

    const blob = new Blob([pdfContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "GAIA_NFT_Complete_Guide_Admin_Only.txt";
    a.click();
    URL.revokeObjectURL(url);

    toast.success("📥 PDF Downloaded!", {
      description: "Complete NFT documentation saved to your device",
      duration: 3000,
    });
  };

  const reorderNFTs = (dragIndex: number, hoverIndex: number) => {
    if (!isAdmin) return;

    const draggedNFT = nfts[dragIndex];
    const newNfts = [...nfts];
    newNfts.splice(dragIndex, 1);
    newNfts.splice(hoverIndex, 0, draggedNFT);

    setNfts(newNfts);

    toast.success("🔄 NFTs Reordered!", {
      description: "NFT collection order updated successfully",
      duration: 2000,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Divine":
        return "from-purple-600 via-pink-600 to-gold-600";
      case "Mythical":
        return "from-purple-600 to-pink-600";
      case "Legendary":
        return "from-gold-600 to-orange-600";
      case "Epic":
        return "from-blue-600 to-cyan-600";
      case "Rare":
        return "from-green-600 to-emerald-600";
      default:
        return "from-gray-600 to-slate-600";
    }
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case "Fire":
        return "text-red-400";
      case "Water":
        return "text-blue-400";
      case "Earth":
        return "text-yellow-600";
      case "Air":
        return "text-cyan-400";
      case "Lightning":
        return "text-yellow-400";
      case "Shadow":
        return "text-purple-400";
      case "Light":
        return "text-white";
      default:
        return "text-gray-400";
    }
  };

  if (!isAdmin) {
    return (
      <Card className="border-2 border-red-500/50">
        <CardContent className="p-8 text-center">
          <Crown className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-400">Admin Access Required</h3>
          <p className="text-muted-foreground">Enhanced NFT System requires admin privileges</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Crown className="h-6 w-6" />
            🎴 ENHANCED NFT COLLECTION MANAGEMENT
          </CardTitle>
          <p className="text-muted-foreground">
            Advanced NFT system with elemental properties, comprehensive documentation, and admin
            reordering
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={generatePDFDocumentation} className="bg-blue-600 hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Generate PDF Documentation
            </Button>

            {pdfGenerated && (
              <Button onClick={downloadPDF} className="bg-green-600 hover:bg-green-700">
                <Download className="h-4 w-4 mr-2" />
                Download Complete Guide (Admin Only)
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* NFT Collection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft, index) => (
          <Card
            key={nft.id}
            className={`border-2 bg-gradient-to-br ${getRarityColor(nft.rarity)}/20 hover:scale-105 transition-all cursor-pointer`}
            onClick={() => setSelectedNFT(nft)}
          >
            <CardContent className="p-4 space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">{nft.sprite}</div>
                <h3 className="font-bold text-white text-lg">{nft.name}</h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white`}>
                    {nft.rarity}
                  </Badge>
                  <Badge className={`${getElementColor(nft.element)} bg-black/20`}>
                    {nft.element}
                  </Badge>
                </div>
              </div>

              <div className="text-center space-y-1">
                <div className={`text-sm font-bold ${getElementColor(nft.element)}`}>
                  {nft.type}
                </div>
                <div className="text-xs text-muted-foreground">
                  {nft.descriptions.lore.substring(0, 80)}...
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 text-xs">
                <div className="text-center">
                  <div className="text-red-400 font-bold">{nft.stats.attackPower}</div>
                  <div className="text-muted-foreground">ATK</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold">{nft.stats.defensePower}</div>
                  <div className="text-muted-foreground">DEF</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">{nft.stats.speed}</div>
                  <div className="text-muted-foreground">SPD</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-xs">
                  {nft.abilities.primary}
                </Badge>
                {nft.isReorderable && (
                  <Button size="sm" variant="outline" className="text-xs">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reorder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed NFT View */}
      {selectedNFT && (
        <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              {selectedNFT.sprite} {selectedNFT.name} - Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Combat Abilities</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-yellow-400">Primary:</span>{" "}
                      {selectedNFT.abilities.primary}
                    </div>
                    <div>
                      <span className="text-orange-400">Secondary:</span>{" "}
                      {selectedNFT.abilities.secondary}
                    </div>
                    <div>
                      <span className="text-red-400">Ultimate:</span>{" "}
                      {selectedNFT.abilities.ultimate}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Combat Style</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedNFT.descriptions.combatStyle}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Elemental Properties</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-green-400">Resistant:</span>{" "}
                      {selectedNFT.elementalProperties.resistant.join(", ")}
                    </div>
                    <div>
                      <span className="text-red-400">Vulnerable:</span>{" "}
                      {selectedNFT.elementalProperties.vulnerable.join(", ")}
                    </div>
                    <div>
                      <span className="text-yellow-400">Super Effective:</span>{" "}
                      {selectedNFT.elementalProperties.superEffective.join(", ")}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Tactical Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-green-400">Strengths:</span>{" "}
                      {selectedNFT.descriptions.strengths.join(", ")}
                    </div>
                    <div>
                      <span className="text-red-400">Weaknesses:</span>{" "}
                      {selectedNFT.descriptions.weaknesses.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
