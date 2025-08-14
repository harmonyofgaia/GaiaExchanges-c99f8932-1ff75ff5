import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gamepad2,
  Sword,
  Shield,
  Wrench,
  Mountain,
  Zap,
  Upload,
  Download,
  Eye,
  Settings,
  Star,
  Crown,
  Gem,
  Palette,
  Image,
  Film,
} from "lucide-react";
import { toast } from "sonner";

interface GameAsset {
  id: string;
  name: string;
  category: "armor" | "weapon" | "tool" | "landscape" | "enhancement" | "animation" | "texture";
  type: "gameplay" | "cosmetic" | "utility" | "environment";
  fileType: "image" | "model" | "animation" | "sound" | "script";
  filePath: string;
  previewImage: string;
  description: string;
  gameplayStats: {
    attack?: number;
    defense?: number;
    speed?: number;
    magic?: number;
  };
  compatibility: string[];
  createdDate: Date;
  lastModified: Date;
  fileSize: string;
  adminNotes: string;
  usageCount: number;
  tags: string[];
}

export function GamingAssetsManager() {
  const [assets, setAssets] = useState<GameAsset[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadGameAssets();
  }, []);

  const loadGameAssets = () => {
    const gameAssets: GameAsset[] = [
      // Armor Assets
      {
        id: "armor-001",
        name: "Dragon Scale Helmet",
        category: "armor",
        type: "gameplay",
        fileType: "model",
        filePath: "/assets/armor/dragon-helmet.fbx",
        previewImage: "/lovable-uploads/93093efd-1912-4361-987d-424e6cf8e1df.png",
        description: "Legendary helmet with fire resistance and enhanced vision",
        gameplayStats: { defense: 85, magic: 45 },
        compatibility: ["Unity", "Unreal Engine", "GAiA Engine"],
        createdDate: new Date("2024-01-15"),
        lastModified: new Date("2024-01-20"),
        fileSize: "12.4 MB",
        adminNotes: "High-quality mesh with LOD support",
        usageCount: 247,
        tags: ["premium", "fire-resistant", "helmet", "dragon"],
      },
      {
        id: "armor-002",
        name: "Quantum Battle Suit",
        category: "armor",
        type: "gameplay",
        fileType: "model",
        filePath: "/assets/armor/quantum-suit.fbx",
        previewImage: "/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png",
        description: "Full body armor with energy shields and quantum enhancement",
        gameplayStats: { defense: 95, speed: 30, magic: 60 },
        compatibility: ["Unity", "Unreal Engine", "GAiA Engine", "VR Systems"],
        createdDate: new Date("2024-01-18"),
        lastModified: new Date("2024-01-22"),
        fileSize: "24.8 MB",
        adminNotes: "Premium tier armor with particle effects",
        usageCount: 189,
        tags: ["quantum", "full-body", "energy-shield", "premium"],
      },
      // Weapon Assets
      {
        id: "weapon-001",
        name: "Neural Blade of Harmony",
        category: "weapon",
        type: "gameplay",
        fileType: "model",
        filePath: "/assets/weapons/neural-blade.fbx",
        previewImage: "/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png",
        description: "AI-enhanced sword that adapts to combat situations",
        gameplayStats: { attack: 90, speed: 75, magic: 40 },
        compatibility: ["Unity", "Unreal Engine", "GAiA Engine"],
        createdDate: new Date("2024-01-12"),
        lastModified: new Date("2024-01-25"),
        fileSize: "8.7 MB",
        adminNotes: "Includes attack animations and particle effects",
        usageCount: 356,
        tags: ["neural", "adaptive", "sword", "premium"],
      },
      {
        id: "weapon-002",
        name: "Harmony Staff Supreme",
        category: "weapon",
        type: "gameplay",
        fileType: "model",
        filePath: "/assets/weapons/harmony-staff.fbx",
        previewImage: "/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png",
        description: "Magical staff that channels environmental energy",
        gameplayStats: { attack: 45, magic: 95, speed: 20 },
        compatibility: ["Unity", "Unreal Engine", "GAiA Engine", "Magic Systems"],
        createdDate: new Date("2024-01-10"),
        lastModified: new Date("2024-01-28"),
        fileSize: "15.2 MB",
        adminNotes: "Includes spell casting animations",
        usageCount: 298,
        tags: ["magic", "staff", "environmental", "harmony"],
      },
      // Tool Assets
      {
        id: "tool-001",
        name: "Landscape Modifier Pro",
        category: "tool",
        type: "utility",
        fileType: "script",
        filePath: "/assets/tools/landscape-modifier.cs",
        previewImage: "/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png",
        description: "Advanced terrain manipulation tool for world building",
        gameplayStats: {},
        compatibility: ["Unity", "GAiA Engine", "Level Editors"],
        createdDate: new Date("2024-01-08"),
        lastModified: new Date("2024-01-30"),
        fileSize: "2.1 MB",
        adminNotes: "Includes GUI for easy terrain editing",
        usageCount: 145,
        tags: ["terrain", "world-building", "editor", "utility"],
      },
      // Landscape Assets
      {
        id: "landscape-001",
        name: "Mystical Forest Environment",
        category: "landscape",
        type: "environment",
        fileType: "model",
        filePath: "/assets/landscapes/mystical-forest.unitypackage",
        previewImage: "/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png",
        description: "Complete forest environment with interactive elements",
        gameplayStats: {},
        compatibility: ["Unity", "Unreal Engine", "GAiA Engine"],
        createdDate: new Date("2024-01-05"),
        lastModified: new Date("2024-02-01"),
        fileSize: "156.7 MB",
        adminNotes: "High-quality environment with LOD system",
        usageCount: 89,
        tags: ["forest", "environment", "mystical", "complete-scene"],
      },
      // Enhancement Assets
      {
        id: "enhancement-001",
        name: "Quantum Reality Core",
        category: "enhancement",
        type: "utility",
        fileType: "script",
        filePath: "/assets/enhancements/quantum-core.cs",
        previewImage: "/lovable-uploads/494a76f3-e002-482a-b606-e7af62367027.png",
        description: "Core system for quantum-enhanced gameplay mechanics",
        gameplayStats: {},
        compatibility: ["Unity", "GAiA Engine", "Quantum Systems"],
        createdDate: new Date("2024-01-03"),
        lastModified: new Date("2024-02-03"),
        fileSize: "5.4 MB",
        adminNotes: "Advanced physics and reality manipulation system",
        usageCount: 67,
        tags: ["quantum", "physics", "enhancement", "core-system"],
      },
    ];
    setAssets(gameAssets);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "armor":
        return <Shield className="h-4 w-4" />;
      case "weapon":
        return <Sword className="h-4 w-4" />;
      case "tool":
        return <Wrench className="h-4 w-4" />;
      case "landscape":
        return <Mountain className="h-4 w-4" />;
      case "enhancement":
        return <Zap className="h-4 w-4" />;
      case "animation":
        return <Film className="h-4 w-4" />;
      case "texture":
        return <Palette className="h-4 w-4" />;
      default:
        return <Image className="h-4 w-4" />;
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case "model":
        return "bg-blue-600";
      case "animation":
        return "bg-green-600";
      case "script":
        return "bg-purple-600";
      case "image":
        return "bg-orange-600";
      case "sound":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory;
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const downloadAsset = (asset: GameAsset) => {
    toast.success("🔽 Asset Downloaded!", {
      description: `${asset.name} downloaded to secure admin storage`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Gaming Assets Header */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Gamepad2 className="h-6 w-6" />
            🎮 GAMING ASSETS MANAGER - COMPLETE DEVELOPMENT ARSENAL
          </CardTitle>
          <p className="text-muted-foreground">
            Comprehensive management of all gaming assets: armor, weapons, tools, landscapes, and
            enhancements
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">{assets.length}</div>
              <div className="text-xs text-muted-foreground">Total Assets</div>
            </div>
            <div className="p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <div className="text-xl font-bold text-green-400">
                {assets.filter((a) => a.category === "armor").length}
              </div>
              <div className="text-xs text-muted-foreground">Armor Pieces</div>
            </div>
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <div className="text-xl font-bold text-red-400">
                {assets.filter((a) => a.category === "weapon").length}
              </div>
              <div className="text-xs text-muted-foreground">Weapons</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">
                {assets.filter((a) => a.category === "tool").length}
              </div>
              <div className="text-xs text-muted-foreground">Tools</div>
            </div>
            <div className="p-3 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <div className="text-xl font-bold text-orange-400">
                {assets.filter((a) => a.category === "landscape").length}
              </div>
              <div className="text-xs text-muted-foreground">Landscapes</div>
            </div>
            <div className="p-3 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <div className="text-xl font-bold text-yellow-400">
                {assets.reduce((sum, a) => sum + a.usageCount, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search assets by name or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-muted border border-border rounded-md"
        >
          <option value="all">All Categories</option>
          <option value="armor">Armor</option>
          <option value="weapon">Weapons</option>
          <option value="tool">Tools</option>
          <option value="landscape">Landscapes</option>
          <option value="enhancement">Enhancements</option>
        </select>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <Card
            key={asset.id}
            className="border border-gray-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:border-blue-500/30 transition-all"
          >
            <CardContent className="p-4 space-y-4">
              {/* Preview Image */}
              <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg overflow-hidden">
                <img
                  src={asset.previewImage}
                  alt={asset.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Asset Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white text-sm">{asset.name}</h4>
                  {getCategoryIcon(asset.category)}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">{asset.description}</p>

                <div className="flex items-center gap-2">
                  <Badge className={`${getFileTypeColor(asset.fileType)} text-white text-xs`}>
                    {asset.fileType.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{asset.fileSize}</span>
                </div>

                {/* Gameplay Stats */}
                {Object.keys(asset.gameplayStats).length > 0 && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {asset.gameplayStats.attack && (
                      <div className="flex justify-between">
                        <span className="text-red-400">Attack:</span>
                        <span className="text-red-400 font-bold">{asset.gameplayStats.attack}</span>
                      </div>
                    )}
                    {asset.gameplayStats.defense && (
                      <div className="flex justify-between">
                        <span className="text-blue-400">Defense:</span>
                        <span className="text-blue-400 font-bold">
                          {asset.gameplayStats.defense}
                        </span>
                      </div>
                    )}
                    {asset.gameplayStats.speed && (
                      <div className="flex justify-between">
                        <span className="text-green-400">Speed:</span>
                        <span className="text-green-400 font-bold">
                          {asset.gameplayStats.speed}
                        </span>
                      </div>
                    )}
                    {asset.gameplayStats.magic && (
                      <div className="flex justify-between">
                        <span className="text-purple-400">Magic:</span>
                        <span className="text-purple-400 font-bold">
                          {asset.gameplayStats.magic}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {asset.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Usage Stats */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Used: {asset.usageCount} times</span>
                  <span>{asset.compatibility.length} engines</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => downloadAsset(asset)}
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Asset Creation Tools */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Upload className="h-6 w-6" />
            🔧 Asset Creation & Management Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Shield className="h-4 w-4 mr-2" />
              Create Armor
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              <Sword className="h-4 w-4 mr-2" />
              Forge Weapon
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Wrench className="h-4 w-4 mr-2" />
              Build Tool
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Mountain className="h-4 w-4 mr-2" />
              Design Landscape
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
