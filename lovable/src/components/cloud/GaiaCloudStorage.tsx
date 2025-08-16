import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cloud,
  Upload,
  Download,
  Trash2,
  Eye,
  Folder,
  Image as ImageIcon,
  Video,
  FileText,
  Zap,
  Cpu,
  Server,
  Database,
  RefreshCw,
  Settings,
  Lock,
  Unlock,
} from "lucide-react";
import { toast } from "sonner";

interface CloudAsset {
  id: string;
  name: string;
  type: "image" | "video" | "audio" | "text" | "template";
  url: string;
  thumbnail: string;
  size: number;
  uploadDate: Date;
  lastAccessed: Date;
  metadata: {
    width?: number;
    height?: number;
    duration?: number;
    format: string;
    processingStatus: "pending" | "processing" | "completed" | "failed";
    tags: string[];
  };
  processedVariants?: {
    optimized: string;
    compressed: string;
    thumbnail: string;
    preview: string;
  };
}

interface ProcessingEngine {
  id: string;
  name: string;
  type: "image" | "video" | "audio" | "universal";
  status: "idle" | "busy" | "error";
  capabilities: string[];
  currentJob?: {
    assetId: string;
    progress: number;
    eta: number;
  };
}

interface GaiaCloudStorageProps {
  className?: string;
  onAssetSelected?: (asset: CloudAsset) => void;
  maxStorageGB?: number;
}

export function GaiaCloudStorage({
  className = "",
  onAssetSelected,
  maxStorageGB = 100,
}: GaiaCloudStorageProps) {
  const [assets, setAssets] = useState<CloudAsset[]>([]);
  const [engines, setEngines] = useState<ProcessingEngine[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<CloudAsset | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [storageUsed, setStorageUsed] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize cloud engines
  useEffect(() => {
    const defaultEngines: ProcessingEngine[] = [
      {
        id: "gaia-image-processor",
        name: "GAIA Image Processor",
        type: "image",
        status: "idle",
        capabilities: [
          "Format Conversion",
          "Compression",
          "Upscaling",
          "Color Enhancement",
          "Background Removal",
          "Abstract Generation",
          "Pattern Creation",
          "Living Animation",
        ],
      },
      {
        id: "gaia-video-processor",
        name: "GAIA Video Processor",
        type: "video",
        status: "idle",
        capabilities: [
          "Format Conversion",
          "Compression",
          "Frame Extraction",
          "Motion Analysis",
          "Living Animation Creation",
          "Background Extraction",
          "Pattern Generation",
          "Neural Style Transfer",
        ],
      },
      {
        id: "gaia-universal-engine",
        name: "GAIA Universal Engine",
        type: "universal",
        status: "idle",
        capabilities: [
          "AI-Powered Analysis",
          "Content Understanding",
          "Automatic Tagging",
          "Similarity Detection",
          "Template Generation",
          "Abstract Art Creation",
          "Pattern Recognition",
          "Creative Enhancement",
        ],
      },
    ];

    setEngines(defaultEngines);

    // Load assets from cloud storage simulation
    loadCloudAssets();
  }, []);

  // Calculate storage usage
  useEffect(() => {
    const totalSize = assets.reduce((sum, asset) => sum + asset.size, 0);
    setStorageUsed(totalSize / (1024 * 1024 * 1024)); // Convert to GB
  }, [assets]);

  const loadCloudAssets = async () => {
    // Simulate cloud storage loading
    const savedAssets = localStorage.getItem("gaia-cloud-assets");
    if (savedAssets) {
      try {
        const parsed = JSON.parse(savedAssets);
        setAssets(parsed);
      } catch (e) {
        console.warn("Failed to load cloud assets");
      }
    }
  };

  const saveCloudAssets = (assets: CloudAsset[]) => {
    localStorage.setItem("gaia-cloud-assets", JSON.stringify(assets));
  };

  const handleFileUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newAssets: CloudAsset[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress((i / files.length) * 50); // First 50% for upload

        // Simulate upload process
        const asset = await uploadToCloudStorage(file);
        newAssets.push(asset);

        // Auto-process uploaded assets
        setUploadProgress(50 + (i / files.length) * 50); // Second 50% for processing
        await processAssetInCloud(asset);
      }

      setAssets((prev) => {
        const updated = [...prev, ...newAssets];
        saveCloudAssets(updated);
        return updated;
      });

      toast.success(`Uploaded ${files.length} file(s) to GAIA Cloud`);
    } catch (error) {
      toast.error("Failed to upload files to cloud storage");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadToCloudStorage = async (file: File): Promise<CloudAsset> => {
    // Simulate cloud upload
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const asset: CloudAsset = {
          id: `cloud-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: getAssetType(file.type),
          url: e.target?.result as string,
          thumbnail: e.target?.result as string, // Would be generated
          size: file.size,
          uploadDate: new Date(),
          lastAccessed: new Date(),
          metadata: {
            format: file.type,
            processingStatus: "pending",
            tags: [],
            ...(file.type.startsWith("image/") && {
              width: 1920, // Would be extracted
              height: 1080,
            })
            ...(file.type.startsWith("video/") && {
              duration: 60, // Would be extracted
            })
          },
        };
        resolve(asset);
      };
      reader.readAsDataURL(file);
    });
  };

  const getAssetType = (mimeType: string): CloudAsset["type"] => {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    if (mimeType.startsWith("audio/")) return "audio";
    if (mimeType.includes("json") || mimeType.includes("template")) return "template";
    return "text";
  };

  const processAssetInCloud = async (asset: CloudAsset) => {
    // Find appropriate engine
    const engine = engines.find((e) => e.type === asset.type || e.type === "universal");

    if (!engine) return;

    // Simulate cloud processing
    const processingTime = Math.random() * 3000 + 1000; // 1-4 seconds

    // Update engine status
    setEngines((prev) =>
      prev.map((e) =>
        e.id === engine.id
          ? {
              ...e,
              status: "busy",
              currentJob: {
                assetId: asset.id,
                progress: 0,
                eta: processingTime,
              },
            }
          : e
      )
    );

    // Simulate processing progress
    const progressInterval = setInterval(() => {
      setEngines((prev) =>
        prev.map((e) => {
          if (e.id === engine.id && e.currentJob) {
            const newProgress = Math.min(e.currentJob.progress + 10, 100);
            return {
              ...e,
              currentJob: {
                ...e.currentJob,
                progress: newProgress,
              },
            };
          }
          return e;
        })
      );
    }, processingTime / 10);

    // Complete processing
    setTimeout(() => {
      clearInterval(progressInterval);

      // Generate processed variants
      const processedVariants = {
        optimized: asset.url, // Would be actual processed version
        compressed: asset.url,
        thumbnail: asset.url,
        preview: asset.url,
      };

      // Update asset
      setAssets((prev) =>
        prev.map((a) =>
          a.id === asset.id
            ? {
                ...a,
                processedVariants,
                metadata: {
                  ...a.metadata,
                  processingStatus: "completed",
                  tags: generateSmartTags(a)
                },
              }
            : a
        )
      );

      // Reset engine
      setEngines((prev) =>
        prev.map((e) =>
          e.id === engine.id
            ? {
                ...e,
                status: "idle",
                currentJob: undefined,
              }
            : e
        )
      );

      toast.success(`Cloud processing completed for ${asset.name}`);
    }, processingTime);
  };

  const generateSmartTags = (asset: CloudAsset): string[] => {
    // Simulate AI-powered tag generation
    const baseTags = ["gaia", "processed"];

    switch (asset.type) {
      case "image":
        return [...baseTags, "visual", "artwork", "design"];
      case "video":
        return [...baseTags, "motion", "animation", "dynamic"];
      case "template":
        return [...baseTags, "template", "reusable", "theme"];
      default:
        return baseTags;
    }
  };

  const deleteAsset = async (assetId: string) => {
    try {
      setAssets((prev) => {
        const updated = prev.filter((a) => a.id !== assetId);
        saveCloudAssets(updated);
        return updated;
      });
      toast.success("Asset deleted from cloud storage");
    } catch (error) {
      toast.error("Failed to delete asset");
    }
  };

  const downloadAsset = (asset: CloudAsset) => {
    // Create download link
    const link = document.createElement("a");
    link.href = asset.url;
    link.download = asset.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update last accessed
    setAssets((prev) =>
      prev.map((a) => (a.id === asset.id ? { ...a, lastAccessed: new Date() } : a))
    );
  };

  const getEngineIcon = (type: ProcessingEngine["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "universal":
        return <Cpu className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  const getAssetIcon = (type: CloudAsset["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "template":
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={`gaia-cloud-storage ${className}`}>
      <Card className="bg-gray-900/50 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Cloud className="w-5 h-5" />
            GAIA Cloud Storage
            <Badge variant="outline" className="ml-auto">
              {storageUsed.toFixed(1)} / {maxStorageGB} GB
            </Badge>
          </CardTitle>
          <Progress value={(storageUsed / maxStorageGB) * 100} className="h-2" />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="engines">Engines</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="assets" className="space-y-4">
              {assets.length === 0 ? (
                <div className="text-center py-8">
                  <Cloud className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-400">No assets in cloud storage</p>
                  <p className="text-sm text-gray-500">Upload files to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assets.map((asset) => (
                    <Card
                      key={asset.id}
                      className={`cursor-pointer transition-all ${
                        selectedAsset?.id === asset.id
                          ? "ring-2 ring-cyan-500 bg-cyan-900/20"
                          : "bg-gray-800/50 hover:bg-gray-700/50"
                      }`}
                      onClick={() => {
                        setSelectedAsset(asset);
                        onAssetSelected?.(asset);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          {asset.type === "image" ? (
                            <img
                              src={asset.thumbnail}
                              alt={asset.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getAssetIcon(asset.type)
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-200 text-sm truncate">
                              {asset.name}
                            </h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                asset.metadata.processingStatus === "completed"
                                  ? "text-green-400 border-green-400"
                                  : asset.metadata.processingStatus === "processing"
                                    ? "text-yellow-400 border-yellow-400"
                                    : "text-gray-400 border-gray-400"
                              }`}
                            >
                              {asset.metadata.processingStatus}
                            </Badge>
                          </div>

                          <div className="flex justify-between text-xs text-gray-400">
                            <span>{formatFileSize(asset.size)}</span>
                            <span>{asset.uploadDate.toLocaleDateString()}</span>
                          </div>

                          <div className="flex gap-1 flex-wrap">
                            {asset.metadata.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadAsset(asset);
                              }}
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Preview asset
                              }}
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteAsset(asset.id);
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="engines" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {engines.map((engine) => (
                  <Card key={engine.id} className="bg-gray-800/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        {getEngineIcon(engine.type)}
                        <h4 className="font-medium text-gray-200">{engine.name}</h4>
                        <Badge
                          variant="outline"
                          className={`ml-auto ${
                            engine.status === "idle"
                              ? "text-green-400 border-green-400"
                              : engine.status === "busy"
                                ? "text-yellow-400 border-yellow-400"
                                : "text-red-400 border-red-400"
                          }`}
                        >
                          {engine.status}
                        </Badge>
                      </div>

                      {engine.currentJob && (
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-400 mb-1">
                            <span>Processing...</span>
                            <span>{engine.currentJob.progress}%</span>
                          </div>
                          <Progress value={engine.currentJob.progress} className="h-2" />
                        </div>
                      )}

                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium">Capabilities:</p>
                        <div className="flex flex-wrap gap-1">
                          {engine.capabilities.slice(0, 4).map((capability, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                          {engine.capabilities.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{engine.capabilities.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*,.json"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="cloud-upload"
                />
                <label htmlFor="cloud-upload" className="cursor-pointer">
                  <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-300 mb-4">Upload files to GAIA Cloud Storage</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports images, videos, audio, and templates
                  </p>
                  <Button disabled={isUploading} className="bg-cyan-600 hover:bg-cyan-700">
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploading ? "Uploading..." : "Select Files"}
                  </Button>
                </label>
              </div>

              {isUploading && (
                <Card className="bg-blue-900/20 border-blue-500/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between text-sm text-blue-400 mb-2">
                      <span>Uploading to GAIA Cloud...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-800/50">
                  <CardContent className="p-4 text-center">
                    <Zap className="mx-auto w-8 h-8 text-yellow-400 mb-2" />
                    <h4 className="font-medium text-gray-200 mb-1">Auto-Processing</h4>
                    <p className="text-sm text-gray-400">
                      Files are automatically processed upon upload
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50">
                  <CardContent className="p-4 text-center">
                    <Database className="mx-auto w-8 h-8 text-green-400 mb-2" />
                    <h4 className="font-medium text-gray-200 mb-1">Smart Storage</h4>
                    <p className="text-sm text-gray-400">
                      Intelligent compression and organization
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50">
                  <CardContent className="p-4 text-center">
                    <Lock className="mx-auto w-8 h-8 text-cyan-400 mb-2" />
                    <h4 className="font-medium text-gray-200 mb-1">Secure Cloud</h4>
                    <p className="text-sm text-gray-400">
                      Enterprise-grade security and encryption
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-200">Cloud Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-200">Auto-Processing</h4>
                      <p className="text-sm text-gray-400">
                        Automatically process uploads with AI engines
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-200">Smart Compression</h4>
                      <p className="text-sm text-gray-400">
                        Optimize file sizes while maintaining quality
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-200">Cloud Sync</h4>
                      <p className="text-sm text-gray-400">Sync assets across all devices</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
