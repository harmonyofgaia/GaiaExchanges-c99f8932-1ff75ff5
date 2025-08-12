import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Image,
  Palette,
  Brush,
  Layers,
  Download,
  Upload,
  Star,
  Search,
  Filter,
  Grid,
  List,
  Lock,
  Unlock,
} from "lucide-react";
import { toast } from "sonner";

interface DesignAsset {
  id: string;
  name: string;
  type: "background" | "overlay" | "texture" | "pattern";
  url: string;
  tags: string[];
  category: "neural" | "nature" | "abstract" | "geometric" | "cosmic";
  isFavorite?: boolean;
}

export function DesignLibrary({ isLocked }: { isLocked: boolean }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customAssets, setCustomAssets] = useState<DesignAsset[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("gaia-design-favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    }

    const savedCustomAssets = localStorage.getItem("gaia-custom-assets");
    if (savedCustomAssets) {
      try {
        setCustomAssets(JSON.parse(savedCustomAssets));
      } catch (error) {
        console.error("Failed to load custom assets:", error);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("gaia-design-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save custom assets to localStorage
  useEffect(() => {
    localStorage.setItem("gaia-custom-assets", JSON.stringify(customAssets));
  }, [customAssets]);

  // All uploaded design assets organized by category
  const designAssets: DesignAsset[] = [
    // Neural/Synaptic designs
    {
      id: "neural-1",
      name: "Electric Neural Network",
      type: "background",
      url: "/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png",
      tags: ["neural", "electric", "synaptic"],
      category: "neural",
    },
    {
      id: "neural-2",
      name: "Bioelectric Pathways",
      type: "overlay",
      url: "/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png",
      tags: ["bioelectric", "pathways", "organic"],
      category: "neural",
    },
    {
      id: "neural-3",
      name: "Neural Matrix",
      type: "background",
      url: "/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png",
      tags: ["matrix", "neural", "network"],
      category: "neural",
    },
    {
      id: "neural-4",
      name: "Synaptic Fire",
      type: "texture",
      url: "/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png",
      tags: ["synaptic", "fire", "energy"],
      category: "neural",
    },
    {
      id: "neural-5",
      name: "Brain Connections",
      type: "pattern",
      url: "/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png",
      tags: ["brain", "connections", "cognitive"],
      category: "neural",
    },
    // Nature designs
    {
      id: "nature-1",
      name: "Forest Canopy",
      type: "background",
      url: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800",
      tags: ["forest", "trees", "natural"],
      category: "nature",
    },
    {
      id: "nature-2",
      name: "Ocean Waves",
      type: "background",
      url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800",
      tags: ["ocean", "waves", "water"],
      category: "nature",
    },
    // Abstract designs
    {
      id: "abstract-1",
      name: "Plasma Energy",
      type: "background",
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800",
      tags: ["plasma", "energy", "abstract"],
      category: "abstract",
    },
    // Cosmic designs
    {
      id: "cosmic-1",
      name: "Starry Night",
      type: "background",
      url: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800",
      tags: ["stars", "night", "cosmic"],
      category: "cosmic",
    },
    // Add custom assets
    ...customAssets,
  ];

  const filteredAssets = designAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      selectedCategory === "all" || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (assetId: string) => {
    if (isLocked) {
      toast.error("Design library is locked");
      return;
    }

    setFavorites((prev) => {
      const newFavorites = prev.includes(assetId)
        ? prev.filter((id) => id !== assetId)
        : [...prev, assetId];

      const action = newFavorites.includes(assetId)
        ? "added to"
        : "removed from";
      toast.success(`Design ${action} favorites`);

      return newFavorites;
    });
  };

  const applyDesign = (asset: DesignAsset) => {
    if (isLocked) {
      toast.error("Design library is locked");
      return;
    }

    // Apply the design to the background
    const root = document.documentElement;

    switch (asset.type) {
      case "background":
        root.style.setProperty("--custom-background", `url(${asset.url})`);
        root.style.setProperty("--custom-background-size", "cover");
        root.style.setProperty("--custom-background-position", "center");
        break;
      case "overlay":
        root.style.setProperty("--custom-overlay", `url(${asset.url})`);
        root.style.setProperty("--custom-overlay-opacity", "0.3");
        break;
      case "texture":
        root.style.setProperty("--custom-texture", `url(${asset.url})`);
        break;
      case "pattern":
        root.style.setProperty("--custom-pattern", `url(${asset.url})`);
        root.style.setProperty("--custom-pattern-repeat", "repeat");
        break;
    }

    toast.success(`Applied ${asset.name} design`, {
      description: `${asset.type} has been set as your visual element`,
    });

    // Emit event for background manager
    window.dispatchEvent(
      new CustomEvent("apply-design", {
        detail: { asset },
      }),
    );
  };

  const uploadCustomDesign = () => {
    if (isLocked) {
      toast.error("Design library is locked");
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          const newAsset: DesignAsset = {
            id: `custom-${Date.now()}-${index}`,
            name: file.name.replace(/\.[^/.]+$/, ""),
            type: "background",
            url,
            tags: ["custom", "uploaded"],
            category: "abstract",
          };

          setCustomAssets((prev) => [...prev, newAsset]);

          if (index === files.length - 1) {
            toast.success(
              `Uploaded ${files.length} custom design${files.length > 1 ? "s" : ""}`,
            );
          }
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  };

  const exportCurrentDesign = () => {
    const designData = {
      favorites,
      customAssets,
      currentStyles: {
        background: getComputedStyle(document.documentElement).getPropertyValue(
          "--custom-background",
        ),
        overlay: getComputedStyle(document.documentElement).getPropertyValue(
          "--custom-overlay",
        ),
        texture: getComputedStyle(document.documentElement).getPropertyValue(
          "--custom-texture",
        ),
        pattern: getComputedStyle(document.documentElement).getPropertyValue(
          "--custom-pattern",
        ),
      },
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(designData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gaia-design-library-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Design library exported successfully");
  };

  const clearFavorites = () => {
    if (isLocked) {
      toast.error("Design library is locked");
      return;
    }

    setFavorites([]);
    toast.success("All favorites cleared");
  };

  const clearCustomAssets = () => {
    if (isLocked) {
      toast.error("Design library is locked");
      return;
    }

    setCustomAssets([]);
    toast.success("All custom assets cleared");
  };

  return (
    <Card className="border-purple-500/20 bg-purple-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Image className="h-5 w-5" />
          Design Library & Art Studio
        </CardTitle>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search designs, patterns, textures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              disabled={isLocked}
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-md border bg-background text-foreground"
            disabled={isLocked}
          >
            <option value="all">All Categories</option>
            <option value="neural">Neural/Synaptic</option>
            <option value="nature">Nature</option>
            <option value="abstract">Abstract</option>
            <option value="geometric">Geometric</option>
            <option value="cosmic">Cosmic</option>
          </select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              disabled={isLocked}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              disabled={isLocked}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-4">
            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredAssets.map((asset) => (
                <Card
                  key={asset.id}
                  className="group cursor-pointer hover:border-purple-500/50 transition-all duration-200"
                  onClick={() => applyDesign(asset)}
                >
                  <div className="relative">
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                      onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+";
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(asset.id);
                      }}
                      disabled={isLocked}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          favorites.includes(asset.id)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white"
                        }`}
                      />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm mb-1">{asset.name}</h4>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {asset.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {asset.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {asset.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredAssets.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    No designs found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={uploadCustomDesign} disabled={isLocked}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Custom Design
                </Button>
                <Button variant="outline" onClick={exportCurrentDesign}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Library
                </Button>
              </div>

              {customAssets.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {customAssets.map((asset) => (
                    <Card
                      key={asset.id}
                      className="cursor-pointer hover:border-purple-500/50"
                      onClick={() => applyDesign(asset)}
                    >
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="w-full h-24 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-2">
                        <h4 className="font-semibold text-xs">{asset.name}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          Custom
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                  <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">
                    No custom designs uploaded yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your images or click upload to add custom
                    designs
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="space-y-4">
              {favorites.length > 0 && (
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Your Favorite Designs</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFavorites}
                    disabled={isLocked}
                  >
                    Clear All
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {designAssets
                  .filter((asset) => favorites.includes(asset.id))
                  .map((asset) => (
                    <Card
                      key={asset.id}
                      className="cursor-pointer hover:border-purple-500/50"
                      onClick={() => applyDesign(asset)}
                    >
                      <img
                        src={asset.url}
                        alt={asset.name}
                        className="w-full h-24 object-cover rounded-t-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+";
                        }}
                      />
                      <CardContent className="p-2">
                        <h4 className="font-semibold text-xs">{asset.name}</h4>
                      </CardContent>
                    </Card>
                  ))}

                {favorites.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No favorites yet</p>
                    <p className="text-sm text-muted-foreground">
                      Click the star icon on any design to add it to favorites
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Library Statistics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Designs:</span>
                      <span>{designAssets.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Favorites:</span>
                      <span>{favorites.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Custom Uploads:</span>
                      <span>{customAssets.length}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={exportCurrentDesign}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Library
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={clearFavorites}
                      disabled={isLocked}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Clear Favorites
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={clearCustomAssets}
                      disabled={isLocked}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Clear Custom Assets
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
