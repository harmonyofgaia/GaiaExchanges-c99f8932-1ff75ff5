import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X,
  Upload,
  Music,
  Video,
  Shuffle,
  Repeat,
  Plus,
  Trash2,
  List,
  Save,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  type: "audio" | "video";
  url: string;
  duration?: number;
  size: number;
  uploadDate: Date;
}

interface Playlist {
  id: string;
  name: string;
  files: MediaFile[];
  isActive: boolean;
}

export function EnhancedPersistentMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<MediaFile | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"none" | "all" | "one">("none");
  const [showLibrary, setShowLibrary] = useState(false);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if in production mode
  useEffect(() => {
    const isProduction =
      window.location.hostname !== "localhost" &&
      !window.location.hostname.includes("127.0.0.1") &&
      !window.location.hostname.includes(".app"); // Lovable staging
    setIsDeveloperMode(!isProduction);
  }, []);

  useEffect(() => {
    // Load saved playlists and current track
    const savedPlaylists = localStorage.getItem("gaia-media-playlists");
    const activePlaylistId = localStorage.getItem("gaia-active-playlist");
    const currentTrackId = localStorage.getItem("gaia-current-track");

    if (savedPlaylists) {
      try {
        const parsedPlaylists = JSON.parse(savedPlaylists);
        setPlaylists(parsedPlaylists);

        if (activePlaylistId) {
          const activePlaylist = parsedPlaylists.find(
            (p: Playlist) => p.id === activePlaylistId,
          );
          if (activePlaylist) {
            setCurrentPlaylist(activePlaylist);
            setIsVisible(true);

            if (currentTrackId) {
              const trackIndex = activePlaylist.files.findIndex(
                (f: MediaFile) => f.id === currentTrackId,
              );
              if (trackIndex !== -1) {
                setCurrentIndex(trackIndex);
                setCurrentTrack(activePlaylist.files[trackIndex]);
              }
            }
          }
        }
      } catch (error) {
        console.log("Error loading media playlists:", error);
      }
    }
  }, []);

  useEffect(() => {
    const mediaElement =
      currentTrack?.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    const updateTime = () => {
      setCurrentTime(mediaElement.currentTime);
      setDuration(mediaElement.duration || 0);
    };

    const handleEnded = () => {
      playNext();
    };

    const handleLoadedMetadata = () => {
      setDuration(mediaElement.duration || 0);
    };

    mediaElement.addEventListener("timeupdate", updateTime);
    mediaElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    mediaElement.addEventListener("ended", handleEnded);

    return () => {
      mediaElement.removeEventListener("timeupdate", updateTime);
      mediaElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      mediaElement.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, currentPlaylist, currentIndex, repeatMode]);

  const savePlayerState = () => {
    if (currentPlaylist) {
      localStorage.setItem("gaia-active-playlist", currentPlaylist.id);
      localStorage.setItem("gaia-media-playlists", JSON.stringify(playlists));
    }
    if (currentTrack) {
      localStorage.setItem("gaia-current-track", currentTrack.id);
    }
  };

  const togglePlay = () => {
    const mediaElement =
      currentTrack?.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement || !currentTrack) return;

    if (isPlaying) {
      mediaElement.pause();
      setIsPlaying(false);
    } else {
      if (mediaElement.src !== currentTrack.url) {
        mediaElement.src = currentTrack.url;
      }
      mediaElement
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing media:", error);
          toast.error("Error playing media file");
        });
    }
  };

  const toggleMute = () => {
    const mediaElement =
      currentTrack?.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    mediaElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const mediaElement =
      currentTrack?.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    const newVolume = value[0];
    mediaElement.volume = newVolume;
    setVolume(newVolume);
  };

  const handleSeek = (value: number[]) => {
    const mediaElement =
      currentTrack?.type === "video" ? videoRef.current : audioRef.current;
    if (!mediaElement) return;

    mediaElement.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const playNext = () => {
    if (!currentPlaylist || currentPlaylist.files.length === 0) return;

    let nextIndex = currentIndex;

    if (repeatMode === "one") {
      // Repeat current track
      const mediaElement =
        currentTrack?.type === "video" ? videoRef.current : audioRef.current;
      if (mediaElement) {
        mediaElement.currentTime = 0;
        if (isPlaying) mediaElement.play();
      }
      return;
    }

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * currentPlaylist.files.length);
    } else {
      nextIndex = (currentIndex + 1) % currentPlaylist.files.length;
    }

    if (nextIndex === 0 && repeatMode === "none") {
      // End of playlist, stop playing
      setIsPlaying(false);
      return;
    }

    setCurrentIndex(nextIndex);
    setCurrentTrack(currentPlaylist.files[nextIndex]);
    savePlayerState();
  };

  const playPrevious = () => {
    if (!currentPlaylist || currentPlaylist.files.length === 0) return;

    let prevIndex;
    if (isShuffled) {
      prevIndex = Math.floor(Math.random() * currentPlaylist.files.length);
    } else {
      prevIndex =
        currentIndex === 0
          ? currentPlaylist.files.length - 1
          : currentIndex - 1;
    }

    setCurrentIndex(prevIndex);
    setCurrentTrack(currentPlaylist.files[prevIndex]);
    savePlayerState();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      const isAudio = file.type.startsWith("audio/");
      const isVideo = file.type.startsWith("video/");

      if (!isAudio && !isVideo) {
        toast.error(`Unsupported file type: ${file.name}`);
        return;
      }

      const mediaFile: MediaFile = {
        id: `media-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: isVideo ? "video" : "audio",
        url: URL.createObjectURL(file),
        size: file.size,
        uploadDate: new Date(),
      };

      // Add to current playlist or create new one
      if (currentPlaylist) {
        const updatedPlaylist = {
          ...currentPlaylist,
          files: [...currentPlaylist.files, mediaFile],
        };
        setCurrentPlaylist(updatedPlaylist);

        const updatedPlaylists = playlists.map((p) =>
          p.id === currentPlaylist.id ? updatedPlaylist : p,
        );
        setPlaylists(updatedPlaylists);
      } else {
        const newPlaylist: Playlist = {
          id: `playlist-${Date.now()}`,
          name: "My Playlist",
          files: [mediaFile],
          isActive: true,
        };
        setPlaylists([newPlaylist]);
        setCurrentPlaylist(newPlaylist);
        setCurrentTrack(mediaFile);
        setCurrentIndex(0);
        setIsVisible(true);
      }

      savePlayerState();
    });

    toast.success(`Added ${files.length} media file(s) to playlist`, {
      description: "Files are ready to play",
      duration: 3000,
    });
  };

  const createNewPlaylist = () => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: `Playlist ${playlists.length + 1}`,
      files: [],
      isActive: false,
    };
    setPlaylists([...playlists, newPlaylist]);
    toast.success("New playlist created");
  };

  const activatePlaylist = (playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    if (playlist.files.length > 0) {
      setCurrentTrack(playlist.files[0]);
      setCurrentIndex(0);
      setIsVisible(true);
    }
    savePlayerState();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const closePlayer = () => {
    const audioElement = audioRef.current;
    const videoElement = videoRef.current;
    if (audioElement) audioElement.pause();
    if (videoElement) videoElement.pause();

    setIsVisible(false);
    setIsPlaying(false);
    setShowLibrary(false);
    localStorage.removeItem("gaia-active-playlist");
    localStorage.removeItem("gaia-current-track");
  };

  // Hide player controls in production mode
  if (!isDeveloperMode && !isVisible) return null;

  return (
    <>
      {/* Main Player */}
      {isVisible && (
        <div
          className={`fixed ${isMinimized ? "bottom-4 right-4" : "bottom-4 right-4"} z-50 transition-all duration-300`}
        >
          <Card
            className={`${isMinimized ? "w-80" : "w-96"} bg-black/95 backdrop-blur-md border-purple-500/30 shadow-2xl`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  {currentTrack?.type === "video" ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <Music className="h-4 w-4" />
                  )}
                  Gaia Media Player
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                  >
                    {isMinimized ? "□" : "_"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={closePlayer}
                    className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="pt-0">
                {/* Video Display */}
                {currentTrack?.type === "video" && (
                  <div className="mb-4">
                    <video
                      ref={videoRef}
                      className="w-full h-32 bg-black rounded-lg object-cover"
                      controls={false}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  </div>
                )}

                {/* Track Info */}
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-purple-400 truncate">
                    {currentTrack?.name || "No track selected"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {currentPlaylist?.name} • {currentIndex + 1} of{" "}
                    {currentPlaylist?.files.length || 0}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full"
                    disabled={!currentTrack}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`h-8 w-8 p-0 ${isShuffled ? "text-purple-400" : "text-gray-400"} hover:text-purple-300`}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={playPrevious}
                    className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
                    disabled={
                      !currentPlaylist || currentPlaylist.files.length === 0
                    }
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={togglePlay}
                    className="h-10 w-10 p-0 text-white bg-purple-600 hover:bg-purple-700 rounded-full"
                    disabled={!currentTrack}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={playNext}
                    className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
                    disabled={
                      !currentPlaylist || currentPlaylist.files.length === 0
                    }
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setRepeatMode(
                        repeatMode === "none"
                          ? "all"
                          : repeatMode === "all"
                            ? "one"
                            : "none",
                      )
                    }
                    className={`h-8 w-8 p-0 ${repeatMode !== "none" ? "text-purple-400" : "text-gray-400"} hover:text-purple-300`}
                  >
                    <Repeat className="h-4 w-4" />
                    {repeatMode === "one" && (
                      <span className="text-xs absolute">1</span>
                    )}
                  </Button>
                </div>

                {/* Volume & Additional Controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={toggleMute}
                      className="h-6 w-6 p-0 text-purple-400 hover:text-purple-300"
                    >
                      {isMuted ? (
                        <VolumeX className="h-3 w-3" />
                      ) : (
                        <Volume2 className="h-3 w-3" />
                      )}
                    </Button>
                    <div className="w-16">
                      <Slider
                        value={[volume]}
                        max={1}
                        step={0.1}
                        onValueChange={handleVolumeChange}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowLibrary(!showLibrary)}
                      className="h-6 w-6 p-0 text-blue-400 hover:text-blue-300"
                    >
                      <List className="h-3 w-3" />
                    </Button>
                    {isDeveloperMode && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-6 w-6 p-0 text-green-400 hover:text-green-300"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Library/Playlist View */}
                {showLibrary && (
                  <div className="border-t border-purple-500/30 pt-3">
                    <Tabs defaultValue="current" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="current">
                          Current Playlist
                        </TabsTrigger>
                        <TabsTrigger value="library">Library</TabsTrigger>
                      </TabsList>

                      <TabsContent
                        value="current"
                        className="space-y-2 max-h-32 overflow-y-auto"
                      >
                        {currentPlaylist?.files.map((file, index) => (
                          <div
                            key={file.id}
                            className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-purple-500/10 ${
                              index === currentIndex ? "bg-purple-500/20" : ""
                            }`}
                            onClick={() => {
                              setCurrentIndex(index);
                              setCurrentTrack(file);
                            }}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-medium truncate">
                                {file.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </div>
                            </div>
                            {file.type === "video" ? (
                              <Video className="h-3 w-3" />
                            ) : (
                              <Music className="h-3 w-3" />
                            )}
                          </div>
                        ))}
                        {(!currentPlaylist ||
                          currentPlaylist.files.length === 0) && (
                          <div className="text-center text-muted-foreground text-xs py-4">
                            No files in playlist
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent
                        value="library"
                        className="space-y-2 max-h-32 overflow-y-auto"
                      >
                        {playlists.map((playlist) => (
                          <div
                            key={playlist.id}
                            className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-blue-500/10"
                            onClick={() => activatePlaylist(playlist)}
                          >
                            <div>
                              <div className="text-xs font-medium">
                                {playlist.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {playlist.files.length} files
                              </div>
                            </div>
                            {playlist.id === currentPlaylist?.id && (
                              <Badge variant="secondary" className="text-xs">
                                Active
                              </Badge>
                            )}
                          </div>
                        ))}
                        {isDeveloperMode && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={createNewPlaylist}
                            className="w-full text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            New Playlist
                          </Button>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      )}

      {/* Developer Mode File Upload */}
      {isDeveloperMode && (
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*,video/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
        crossOrigin="anonymous"
      />

      {/* Hidden Video Element (for audio extraction) */}
      <video
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />

      {/* Developer Quick Access */}
      {isDeveloperMode && !isVisible && (
        <div className="fixed bottom-4 left-4 z-50">
          <Button
            onClick={() => setIsVisible(true)}
            className="bg-purple-600 hover:bg-purple-700 shadow-lg"
          >
            <Music className="h-4 w-4 mr-2" />
            Open Media Player
          </Button>
        </div>
      )}
    </>
  );
}
