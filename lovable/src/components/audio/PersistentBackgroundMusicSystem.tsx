import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Upload,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Download,
  Trash2,
  Plus,
  List,
  Radio,
  Disc,
  Headphones,
} from "lucide-react";
import { toast } from "sonner";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  url: string;
  genre: string;
  uploadDate: Date;
  isActive: boolean;
  plays: number;
  isUserUploaded: boolean;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: string[];
  createdAt: Date;
  isPublic: boolean;
}

export function PersistentBackgroundMusicSystem() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [musicLibrary, setMusicLibrary] = useState<MusicTrack[]>([
    {
      id: "track-1",
      title: "Cosmic Dreams",
      artist: "Digital Harmony",
      album: "Space Vibes",
      duration: 240,
      url: "#",
      genre: "Electronic",
      uploadDate: new Date(Date.now() - 86400000),
      isActive: true,
      plays: 47,
      isUserUploaded: false,
    },
    {
      id: "track-2",
      title: "Neon Nights",
      artist: "Synthwave Studio",
      album: "Retro Future",
      duration: 285,
      url: "#",
      genre: "Synthwave",
      uploadDate: new Date(Date.now() - 172800000),
      isActive: true,
      plays: 32,
      isUserUploaded: false,
    },
    {
      id: "track-3",
      title: "Green Meditation",
      artist: "Nature Sounds",
      album: "Eco Therapy",
      duration: 180,
      url: "#",
      genre: "Ambient",
      uploadDate: new Date(Date.now() - 259200000),
      isActive: true,
      plays: 89,
      isUserUploaded: false,
    },
  ]);

  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "playlist-1",
      name: "Focus Mode",
      description: "Perfect background music for productive work",
      tracks: ["track-1", "track-3"],
      createdAt: new Date(),
      isPublic: true,
    },
    {
      id: "playlist-2",
      name: "Energy Boost",
      description: "High-energy tracks to keep you motivated",
      tracks: ["track-2"],
      createdAt: new Date(),
      isPublic: true,
    },
  ]);

  const [activePlaylist, setActivePlaylist] = useState<string | null>(
    "playlist-1",
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize audio element and set current track
  useEffect(() => {
    if (!currentTrack && musicLibrary.length > 0) {
      setCurrentTrack(musicLibrary[0]);
    }
  }, [musicLibrary, currentTrack]);

  // Handle audio persistence across navigation
  useEffect(() => {
    const savedMusicState = localStorage.getItem("backgroundMusicState");
    if (savedMusicState) {
      const state = JSON.parse(savedMusicState);
      setVolume(state.volume || 70);
      setIsMuted(state.isMuted || false);
      setIsShuffled(state.isShuffled || false);
      setIsRepeating(state.isRepeating || false);

      if (state.currentTrackId) {
        const track = musicLibrary.find((t) => t.id === state.currentTrackId);
        if (track) {
          setCurrentTrack(track);
          setCurrentTime(state.currentTime || 0);
        }
      }
    }

    // Save state when component unmounts or page changes
    const handleBeforeUnload = () => {
      const state = {
        volume,
        isMuted,
        isShuffled,
        isRepeating,
        currentTrackId: currentTrack?.id,
        currentTime: audioRef.current?.currentTime || 0,
        isPlaying,
      };
      localStorage.setItem("backgroundMusicState", JSON.stringify(state));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [volume, isMuted, isShuffled, isRepeating, currentTrack, isPlaying]);

  // Audio control functions
  const togglePlayPause = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      toast.info("🎵 Music paused", { duration: 2000 });
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
      toast.success("🎵 Now playing: " + currentTrack.title, {
        duration: 3000,
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    toast.info(isMuted ? "🔊 Audio unmuted" : "🔇 Audio muted", {
      duration: 2000,
    });
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
    }
  };

  const nextTrack = () => {
    if (!currentTrack || musicLibrary.length === 0) return;

    const currentIndex = musicLibrary.findIndex(
      (track) => track.id === currentTrack.id,
    );
    let nextIndex = (currentIndex + 1) % musicLibrary.length;

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * musicLibrary.length);
    }

    const nextTrack = musicLibrary[nextIndex];
    setCurrentTrack(nextTrack);
    setCurrentTime(0);

    toast.success("⏭️ Next: " + nextTrack.title, { duration: 2000 });
  };

  const previousTrack = () => {
    if (!currentTrack || musicLibrary.length === 0) return;

    const currentIndex = musicLibrary.findIndex(
      (track) => track.id === currentTrack.id,
    );
    const prevIndex =
      currentIndex === 0 ? musicLibrary.length - 1 : currentIndex - 1;

    const prevTrack = musicLibrary[prevIndex];
    setCurrentTrack(prevTrack);
    setCurrentTime(0);

    toast.success("⏮️ Previous: " + prevTrack.title, { duration: 2000 });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const newTrack: MusicTrack = {
        id: `track-${Date.now()}-${i}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "User Upload",
        duration: 200, // Would normally get from audio metadata
        url: URL.createObjectURL(file),
        genre: "User Content",
        uploadDate: new Date(),
        isActive: true,
        plays: 0,
        isUserUploaded: true,
      };

      setMusicLibrary((prev) => [...prev, newTrack]);
    }

    setIsUploading(false);
    setUploadProgress(0);

    toast.success(
      `🎵 Uploaded ${files.length} track(s) to your music library!`,
      {
        description: "Tracks are now available for background music",
        duration: 4000,
      },
    );
  };

  const deleteTrack = (trackId: string) => {
    setMusicLibrary((prev) => prev.filter((track) => track.id !== trackId));

    if (currentTrack?.id === trackId) {
      const remainingTracks = musicLibrary.filter(
        (track) => track.id !== trackId,
      );
      setCurrentTrack(remainingTracks.length > 0 ? remainingTracks[0] : null);
    }

    toast.success("🗑️ Track removed from library", { duration: 2000 });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAudioEnd = () => {
    if (isRepeating) {
      audioRef.current?.play();
    } else {
      nextTrack();
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Music Player */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-400">
            <Music className="h-8 w-8" />
            🎵 PERSISTENT BACKGROUND MUSIC SYSTEM
          </CardTitle>
          <p className="text-muted-foreground">
            Upload, manage, and play background music that persists across all
            pages
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Track Display */}
          {currentTrack && (
            <div className="flex items-center gap-4 p-4 bg-black/20 rounded-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Disc className="h-8 w-8 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg truncate">
                  {currentTrack.title}
                </div>
                <div className="text-muted-foreground truncate">
                  {currentTrack.artist}
                </div>
                <div className="text-sm text-purple-400">
                  {formatTime(currentTime)} /{" "}
                  {formatTime(currentTrack.duration)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {currentTrack.genre}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {currentTrack.plays} plays
                </Badge>
              </div>
            </div>
          )}

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsShuffled(!isShuffled)}
              className={isShuffled ? "bg-purple-600" : ""}
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={previousTrack}>
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              onClick={togglePlayPause}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>

            <Button variant="outline" size="sm" onClick={nextTrack}>
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRepeating(!isRepeating)}
              className={isRepeating ? "bg-purple-600" : ""}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={toggleMute}>
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>

            <div className="flex-1">
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <span className="text-sm text-muted-foreground w-12">
              {volume}%
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Music Library */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Upload className="h-6 w-6" />
              Upload Music
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Add your own tracks to the background music library
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="border-2 border-dashed border-green-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-green-500/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Music className="h-12 w-12 mx-auto text-green-400 mb-4" />
              <div className="text-lg font-bold text-green-400 mb-2">
                Drop music files here
              </div>
              <div className="text-muted-foreground">
                MP3, WAV, OGG supported
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <List className="h-6 w-6" />
              Playlists
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  activePlaylist === playlist.id
                    ? "border-blue-500 bg-blue-900/20"
                    : "border-border hover:border-blue-500/50"
                }`}
                onClick={() => setActivePlaylist(playlist.id)}
              >
                <div className="font-semibold text-blue-400">
                  {playlist.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {playlist.description}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {playlist.tracks.length} tracks •{" "}
                  {playlist.isPublic ? "Public" : "Private"}
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create New Playlist
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Music Library Tracks */}
      <Card className="border-orange-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Headphones className="h-6 w-6" />
            Music Library ({musicLibrary.length} tracks)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {musicLibrary.map((track) => (
              <div
                key={track.id}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                  currentTrack?.id === track.id
                    ? "border-orange-500 bg-orange-900/20"
                    : "border-border hover:border-orange-500/50"
                }`}
              >
                <div
                  className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center cursor-pointer"
                  onClick={() => setCurrentTrack(track)}
                >
                  {currentTrack?.id === track.id && isPlaying ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 text-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{track.title}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {track.artist} • {formatTime(track.duration)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {track.genre}
                  </Badge>

                  {track.isUserUploaded && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteTrack(track.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        muted={isMuted}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={handleAudioEnd}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume / 100;
          }
        }}
      />
    </div>
  );
}
