import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cloud,
  Upload,
  Download,
  Image,
  Video,
  FileText,
  Music,
  Trash2,
  Search,
  FolderOpen,
  HardDrive,
  Database,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface StorageFile {
  id: string;
  name: string;
  size: number;
  type: "image" | "video" | "audio" | "document";
  url: string;
  bucket: string;
  created_at: string;
  metadata?: unknown;
}

export default function StorageManagement() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBucket, setSelectedBucket] = useState("all");

  const buckets = [
    { id: "artwork-files", name: "Artwork Files", icon: Image },
    { id: "video-uploads", name: "Videos", icon: Video },
    { id: "audio-files", name: "Audio", icon: Music },
    { id: "documents", name: "Documents", icon: FileText },
  ];

  useEffect(() => {
    loadFiles();
  }, [selectedBucket]);

  const loadFiles = async () => {
    setLoading(true);
    try {
      // Load files from all buckets or specific bucket
      const allFiles: StorageFile[] = [];

      for (const bucket of buckets) {
        if (selectedBucket === "all" || selectedBucket === bucket.id) {
          const { data, error } = await supabase.storage
            .from(bucket.id)
            .list("", { limit: 100, offset: 0 });

          if (data && !error) {
            const bucketFiles = data.map((file) => ({
              id: file.id || file.name,
              name: file.name,
              size: file.metadata?.size || 0,
              type: getFileType(file.name),
              url: supabase.storage.from(bucket.id).getPublicUrl(file.name).data.publicUrl,
              bucket: bucket.id,
              created_at: file.created_at || new Date().toISOString(),
              metadata: file.metadata,
            })) as StorageFile[];

            allFiles.push(...bucketFiles);
          }
        }
      }

      setFiles(allFiles);
    } catch (error) {
      console.error("Error loading files:", error);
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  const getFileType = (fileName: string): StorageFile["type"] => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "")) return "image";
    if (["mp4", "mov", "avi", "webm"].includes(ext || "")) return "video";
    if (["mp3", "wav", "ogg", "m4a"].includes(ext || "")) return "audio";
    return "document";
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = getFileType(file.name);

      // Determine bucket based on file type
      let bucketId = "documents";
      if (fileType === "image") bucketId = "artwork-files";
      else if (fileType === "video") bucketId = "video-uploads";
      else if (fileType === "audio") bucketId = "audio-files";

      try {
        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from(bucketId).upload(fileName, file);

        if (error) throw error;

        setUploadProgress(((i + 1) / files.length) * 100);

        toast.success(`${file.name} uploaded successfully`);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
    setUploadProgress(0);
    loadFiles();
  };

  const deleteFile = async (file: StorageFile) => {
    try {
      const { error } = await supabase.storage.from(file.bucket).remove([file.name]);

      if (error) throw error;

      toast.success("File deleted successfully");
      loadFiles();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete file");
    }
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStorageStats = () => {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const typeStats = files.reduce(
      (acc, file) => {
        acc[file.type] = (acc[file.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return { totalSize, typeStats, totalFiles: files.length };
  };

  const stats = getStorageStats();

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
          🗄️ GAiA Storage Management
        </h1>
        <p className="text-xl text-muted-foreground">
          Centralized storage for all your images, videos, audio, and documents
        </p>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30 bg-blue-900/10">
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{stats.totalFiles}</div>
            <div className="text-sm text-muted-foreground">Total Files</div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/10">
          <CardContent className="p-4 text-center">
            <HardDrive className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">
              {(stats.totalSize / (1024 * 1024)).toFixed(1)}MB
            </div>
            <div className="text-sm text-muted-foreground">Total Size</div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/10">
          <CardContent className="p-4 text-center">
            <Image className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{stats.typeStats.image || 0}</div>
            <div className="text-sm text-muted-foreground">Images</div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/10">
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400">{stats.typeStats.video || 0}</div>
            <div className="text-sm text-muted-foreground">Videos</div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Upload className="h-5 w-5" />
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Cloud className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-semibold mb-2">Drop files here or click to browse</p>
              <p className="text-muted-foreground mb-4">
                Images, videos, audio, and documents supported
              </p>
              <input
                type="file"
                multiple
                accept="*/*"
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={isUploading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select Files
              </Button>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Browser */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <FolderOpen className="h-5 w-5" />
            File Browser
          </CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedBucket}
              onChange={(e) => setSelectedBucket(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
            >
              <option value="all">All Buckets</option>
              {buckets.map((bucket) => (
                <option key={bucket.id} value={bucket.id}>
                  {bucket.name}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-blue-400 border-t-transparent rounded-full mx-auto mb-4" />
              <p>Loading files...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                      {file.type === "image" ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-4xl">
                          {file.type === "video" && "🎬"}
                          {file.type === "audio" && "🎵"}
                          {file.type === "document" && "📄"}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm truncate" title={file.name}>
                        {file.name}
                      </h4>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(1)}KB
                        </span>
                      </div>

                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteFile(file)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
