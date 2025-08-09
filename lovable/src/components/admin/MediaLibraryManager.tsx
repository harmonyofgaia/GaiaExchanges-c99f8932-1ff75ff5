import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Music,
  Video,
  Play,
  Pause,
  Trash2,
  Volume2,
  VolumeX,
  Download,
  Eye,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  type: "audio" | "video";
  format: string;
  size: number;
  duration?: number;
  url: string;
  uploadDate: Date;
  isActive: boolean;
}

export function MediaLibraryManager() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [activeBackgroundMedia, setActiveBackgroundMedia] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const supportedFormats = {
    audio: [".mp3", ".wav", ".flac", ".ogg", ".m4a", ".aac", ".wma"],
    video: [".mp4", ".mkv", ".avi", ".webm", ".mov", ".wmv"],
  };

  const handleFileUpload = async (files: FileList) => {
    const allowedFormats = [
      ...supportedFormats.audio,
      ...supportedFormats.video,
    ];

    Array.from(files).forEach(async (file) => {
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

      if (!allowedFormats.includes(fileExtension)) {
        toast.error(`Unsupported format: ${fileExtension}`);
        return;
      }

      const fileId =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);

      // Simulate upload progress
      setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);

      // Get audio duration if it's an audio file
      let duration: number | undefined;
      if (file.type.startsWith("audio/")) {
        try {
          const audioElement = new Audio(objectUrl);
          await new Promise((resolve) => {
            audioElement.addEventListener("loadedmetadata", resolve);
            audioElement.load();
          });
          duration = audioElement.duration;
        } catch (error) {
          console.log("Could not get audio duration:", error);
        }
      }

      // Simulate upload
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
      }

      const mediaFile: MediaFile = {
        id: fileId,
        name: file.name,
        type: file.type.startsWith("video/") ? "video" : "audio",
        format: fileExtension,
        size: file.size,
        url: objectUrl,
        uploadDate: new Date(),
        isActive: false,
        duration,
      };

      setMediaFiles((prev) => [...prev, mediaFile]);
      setUploadProgress((prev) => {
        const { [fileId]: removed, ...rest } = prev;
        return rest;
      });

      toast.success(`🎵 ${file.name} uploaded successfully!`);
    });
  };

  const playMedia = (fileId: string) => {
    const file = mediaFiles.find((f) => f.id === fileId);
    if (!file) return;

    if (currentlyPlaying === fileId) {
      setCurrentlyPlaying(null);
      if (file.type === "video" && videoRef.current) {
        videoRef.current.pause();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setCurrentlyPlaying(fileId);
      if (file.type === "video" && videoRef.current) {
        videoRef.current.src = file.url;
        videoRef.current.play();
      } else if (audioRef.current) {
        audioRef.current.src = file.url;
        audioRef.current.play();
      }
    }
  };

  const setAsBackgroundMedia = (fileId: string) => {
    setActiveBackgroundMedia(fileId);
    const file = mediaFiles.find((f) => f.id === fileId);

    if (file) {
      // Save to localStorage for global access
      localStorage.setItem("activeBackgroundMedia", fileId);
      localStorage.setItem("activeBackgroundMediaData", JSON.stringify(file));

      // Dispatch custom event to notify BackgroundMusic component
      window.dispatchEvent(new CustomEvent("backgroundMediaUpdated"));

      toast.success(
        `🌍 ${file.name} set as background music for entire website!`,
      );
    }
  };

  const deleteMedia = (fileId: string) => {
    const file = mediaFiles.find((f) => f.id === fileId);
    setMediaFiles((prev) => prev.filter((f) => f.id !== fileId));

    if (currentlyPlaying === fileId) setCurrentlyPlaying(null);
    if (activeBackgroundMedia === fileId) {
      setActiveBackgroundMedia(null);
      localStorage.removeItem("activeBackgroundMedia");
      localStorage.removeItem("activeBackgroundMediaData");
      window.dispatchEvent(new CustomEvent("backgroundMediaUpdated"));
    }

    // Cleanup object URL
    if (file?.url) {
      URL.revokeObjectURL(file.url);
    }

    toast.success("Media file deleted");
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Music className="h-6 w-6" />
            🎵 Gaia's Harmony Media Library - Ultimate Experience Engine
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload your own music and audio files to create the perfect
            atmospheric experience. Set any track as background music for the
            entire website.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                Drop Your Creative Assets
              </h3>
              <p className="text-muted-foreground mb-4">
                Upload MP3, WAV, FLAC, OGG, M4A, AAC files for audio or MP4,
                MKV, AVI, WebM for video
              </p>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={[
                  ...supportedFormats.audio,
                  ...supportedFormats.video,
                ].join(",")}
                onChange={(e) =>
                  e.target.files && handleFileUpload(e.target.files)
                }
                className="hidden"
              />

              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </Button>

              <div className="mt-4 text-xs text-muted-foreground">
                Supported:{" "}
                {[...supportedFormats.audio, ...supportedFormats.video].join(
                  ", ",
                )}
              </div>
            </div>

            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
              <Card className="bg-blue-900/20 border-blue-500/30">
                <CardContent className="pt-4">
                  <h4 className="font-medium text-blue-400 mb-4">
                    Upload Progress
                  </h4>
                  {Object.entries(uploadProgress).map(([fileId, progress]) => (
                    <div key={fileId} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">
                  All Media ({mediaFiles.length})
                </TabsTrigger>
                <TabsTrigger value="audio">
                  Audio Files (
                  {mediaFiles.filter((f) => f.type === "audio").length})
                </TabsTrigger>
                <TabsTrigger value="video">
                  Video Files (
                  {mediaFiles.filter((f) => f.type === "video").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {mediaFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Music className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">
                      No media files uploaded yet
                    </h3>
                    <p>
                      Start creating your harmony library by uploading your
                      favorite tracks!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaFiles.map((file) => (
                      <Card
                        key={file.id}
                        className="bg-muted/20 border-green-500/20 hover:border-green-400/40 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            {file.type === "video" ? (
                              <Video className="h-5 w-5 text-blue-400" />
                            ) : (
                              <Music className="h-5 w-5 text-green-400" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div
                                className="font-medium text-sm truncate"
                                title={file.name}
                              >
                                {file.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.format}
                                {file.duration &&
                                  ` • ${formatDuration(file.duration)}`}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-1 mb-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => playMedia(file.id)}
                              className="flex-1"
                              title="Preview"
                            >
                              {currentlyPlaying === file.id ? (
                                <Pause className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                            </Button>

                            <Button
                              size="sm"
                              variant={
                                activeBackgroundMedia === file.id
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => setAsBackgroundMedia(file.id)}
                              className="flex-1"
                              title="Set as background music"
                            >
                              <Settings className="h-3 w-3" />
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteMedia(file.id)}
                              title="Delete file"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>

                          {activeBackgroundMedia === file.id && (
                            <Badge className="w-full bg-green-600 text-white text-xs justify-center">
                              🌍 Active Background Music
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Audio Tab Content */}
              <TabsContent value="audio">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaFiles
                    .filter((file) => file.type === "audio")
                    .map((file) => (
                      <Card
                        key={file.id}
                        className="bg-muted/20 border-green-500/20 hover:border-green-400/40 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Music className="h-5 w-5 text-green-400" />
                            <div className="flex-1 min-w-0">
                              <div
                                className="font-medium text-sm truncate"
                                title={file.name}
                              >
                                {file.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.format}
                                {file.duration &&
                                  ` • ${formatDuration(file.duration)}`}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-1 mb-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => playMedia(file.id)}
                              className="flex-1"
                            >
                              {currentlyPlaying === file.id ? (
                                <Pause className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                            </Button>

                            <Button
                              size="sm"
                              variant={
                                activeBackgroundMedia === file.id
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => setAsBackgroundMedia(file.id)}
                              className="flex-1"
                            >
                              <Settings className="h-3 w-3" />
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteMedia(file.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>

                          {activeBackgroundMedia === file.id && (
                            <Badge className="w-full bg-green-600 text-white text-xs justify-center">
                              🌍 Active Background Music
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Video Tab Content */}
              <TabsContent value="video">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaFiles
                    .filter((file) => file.type === "video")
                    .map((file) => (
                      <Card
                        key={file.id}
                        className="bg-muted/20 border-blue-500/20 hover:border-blue-400/40 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Video className="h-5 w-5 text-blue-400" />
                            <div className="flex-1 min-w-0">
                              <div
                                className="font-medium text-sm truncate"
                                title={file.name}
                              >
                                {file.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.format}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-1 mb-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => playMedia(file.id)}
                              className="flex-1"
                            >
                              {currentlyPlaying === file.id ? (
                                <Pause className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                            </Button>

                            <Button
                              size="sm"
                              variant={
                                activeBackgroundMedia === file.id
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => setAsBackgroundMedia(file.id)}
                              className="flex-1"
                            >
                              <Settings className="h-3 w-3" />
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteMedia(file.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>

                          {activeBackgroundMedia === file.id && (
                            <Badge className="w-full bg-green-600 text-white text-xs justify-center">
                              🌍 Active Background Media
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Hidden Media Players */}
      <audio
        ref={audioRef}
        onEnded={() => setCurrentlyPlaying(null)}
        controls={false}
        preload="metadata"
      />
      <video
        ref={videoRef}
        onEnded={() => setCurrentlyPlaying(null)}
        className="hidden"
        controls={false}
        preload="metadata"
      />
    </div>
  );
}
