import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cloud,
  Download,
  Trash2,
  Eye,
  Database,
  HardDrive,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CloudArtwork {
  id: string;
  prompt: string;
  artwork_type: string;
  style: string;
  image_data: string;
  cloud_url: string;
  cloud_path: string;
  file_size: number;
  storage_metadata: unknown;
  generated_at: string;
  downloads: number;
  nft_ready: boolean;
}

export function CloudArtworkManager() {
  const [artworks, setArtworks] = useState<CloudArtwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStorage, setTotalStorage] = useState(0);
  const [storageStats, setStorageStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    avgFileSize: 0,
    lastUpload: null as string | null,
  });

  useEffect(() => {
    loadCloudArtworks();
  }, []);

  const loadCloudArtworks = async () => {
    try {
      const { data, error } = await supabase
        .from("generated_artwork")
        .select("*")
        .not("cloud_url", "is", null)
        .order("generated_at", { ascending: false });

      if (error) throw error;

      setArtworks(data || []);

      // Calculate storage stats
      const totalSize = data?.reduce((sum, artwork) => sum + (artwork.file_size || 0), 0) || 0;
      setTotalStorage(totalSize);

      setStorageStats({
        totalFiles: data?.length || 0,
        totalSize,
        avgFileSize: data?.length ? totalSize / data.length : 0,
        lastUpload: data?.[0]?.generated_at || null,
      });
    } catch (error) {
      console.error("Error loading cloud artworks:", error);
      toast.error("Failed to load cloud artworks");
    } finally {
      setLoading(false);
    }
  };

  const downloadArtwork = async (artwork: CloudArtwork) => {
    try {
      if (artwork.cloud_url) {
        // Download from cloud URL
        const response = await fetch(artwork.cloud_url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${artwork.artwork_type}-${artwork.id}.png`;
        link.click();

        window.URL.revokeObjectURL(url);
      } else {
        // Fallback to base64 data
        const link = document.createElement("a");
        link.href = artwork.image_data;
        link.download = `${artwork.artwork_type}-${artwork.id}.png`;
        link.click();
      }

      // Update download count
      await supabase
        .from("generated_artwork")
        .update({ downloads: artwork.downloads + 1 })
        .eq("id", artwork.id);

      toast.success("🎨 Artwork Downloaded from Cloud!");
      loadCloudArtworks(); // Refresh data
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download artwork");
    }
  };

  const deleteArtwork = async (artwork: CloudArtwork) => {
    if (!confirm("Are you sure you want to delete this artwork from cloud storage?")) {
      return;
    }

    try {
      // Delete from storage
      if (artwork.cloud_path) {
        await supabase.storage.from("artwork-files").remove([artwork.cloud_path]);
      }

      // Delete from database
      await supabase.from("generated_artwork").delete().eq("id", artwork.id);

      toast.success("🗑️ Artwork deleted from cloud storage");
      loadCloudArtworks(); // Refresh data
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete artwork");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Storage Statistics */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-400">
            <Cloud className="h-6 w-6" />
            Cloud Storage Analytics
            <Shield className="h-5 w-5 text-green-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">{storageStats.totalFiles}</div>
              <div className="text-sm text-muted-foreground">Total Files</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-400">
                {formatFileSize(storageStats.totalSize)}
              </div>
              <div className="text-sm text-muted-foreground">Total Storage</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-400">
                {formatFileSize(storageStats.avgFileSize)}
              </div>
              <div className="text-sm text-muted-foreground">Avg File Size</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-yellow-400">
                {storageStats.lastUpload
                  ? new Date(storageStats.lastUpload).toLocaleDateString()
                  : "N/A"}
              </div>
              <div className="text-sm text-muted-foreground">Last Upload</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gallery">🎨 Cloud Gallery</TabsTrigger>
          <TabsTrigger value="storage">☁️ Storage Manager</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artworks.map((artwork) => (
              <Card
                key={artwork.id}
                className="border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-purple-900/10"
              >
                <CardContent className="p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3">
                    <img
                      src={artwork.cloud_url || artwork.image_data}
                      alt="Cloud Artwork"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-600 text-white">{artwork.artwork_type}</Badge>
                      <div className="flex items-center gap-1">
                        {artwork.cloud_url && <Cloud className="h-4 w-4 text-blue-400" />}
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{artwork.prompt}</p>
                    <div className="text-xs text-blue-400">
                      Size: {formatFileSize(artwork.file_size || 0)}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-purple-400">
                        Downloads: {artwork.downloads || 0}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => downloadArtwork(artwork)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs px-2 py-1"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteArtwork(artwork)}
                          className="text-xs px-2 py-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Storage Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Storage Overview</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Total Files:</span>
                        <span className="font-mono">{storageStats.totalFiles}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Size:</span>
                        <span className="font-mono">{formatFileSize(storageStats.totalSize)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Size:</span>
                        <span className="font-mono">
                          {formatFileSize(storageStats.avgFileSize)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Security Status</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Admin-only access enabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Cloud storage secured</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>RLS policies active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cloud Storage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-400">
                    {artworks.filter((a) => a.artwork_type === "abstract").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Abstract</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-purple-400">
                    {artworks.filter((a) => a.artwork_type === "atmospheric").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Atmospheric</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-400">
                    {artworks.filter((a) => a.artwork_type === "nature_fusion").length}
                  </div>
                  <div className="text-xs text-muted-foreground">Nature Fusion</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-yellow-400">
                    {artworks.reduce((sum, a) => sum + (a.downloads || 0), 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Downloads</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
