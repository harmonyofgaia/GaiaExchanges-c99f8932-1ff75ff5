import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  X,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";

interface Track {
  id: string;
  original_name: string;
  storage_path?: string;
  name?: string;
  url?: string;
}

export function UnifiedMusicPlayer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize and check for background music

  // --- Move playTrack and playNext above this useEffect ---

  useEffect(() => {
    const loadActiveMedia = () => {
      const activeMediaId = localStorage.getItem("activeBackgroundMedia");
      const activeMediaData = localStorage.getItem("activeBackgroundMediaData");

      if (activeMediaId && activeMediaData) {
        try {
          const mediaData = JSON.parse(activeMediaData);
          if (mediaData.type === "audio") {
            setCurrentTrack(mediaData);
            setIsVisible(true);
            console.log(
              "🎵 Unified Music Player Loaded:",
              mediaData.name || mediaData.original_name,
            );
          }
        } catch (error) {
          console.log("Error loading music:", error);
        }
      }
    };

    loadActiveMedia();

    // Listen for admin updates
    const handleMediaUpdate = (event: CustomEvent) => {
      const { track, action } = event.detail || {};

      if (action === "play" && track) {
        setCurrentTrack(track);
        setIsVisible(true);
        playTrack(track);
      } else if (action === "playlist_update") {
        setPlaylist(event.detail.tracks || []);
        if (event.detail.tracks?.length > 0) {
          setIsVisible(true);
        }
      }
    };

    // Listen for storage changes and custom events
    window.addEventListener("storage", loadActiveMedia);
    window.addEventListener("backgroundMediaUpdated", loadActiveMedia);
    window.addEventListener("admin-audio-update", handleMediaUpdate);

    return () => {
      window.removeEventListener("storage", loadActiveMedia);
      window.removeEventListener("backgroundMediaUpdated", loadActiveMedia);
      window.removeEventListener("admin-audio-update", handleMediaUpdate);
    };
  }, [playTrack]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (playlist.length > 1 && currentIndex < playlist.length - 1) {
        playNext();
      } else {
        // Loop current track
        audio.currentTime = 0;
        audio.play();
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [currentIndex, playlist, playNext]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // Persist player state across page navigation
  useEffect(() => {
    const saveState = () => {
      if (currentTrack && isPlaying) {
        const state = {
          track: currentTrack,
          currentTime: audioRef.current?.currentTime || 0,
          volume,
          isMuted,
          isPlaying,
        };
        sessionStorage.setItem("gaiaPlayerState", JSON.stringify(state));
      }
    };

    // Save state before page unload
    window.addEventListener("beforeunload", saveState);

    // Try to restore state on load
    const savedState = sessionStorage.getItem("gaiaPlayerState");
    if (savedState && !currentTrack) {
      try {
        const state = JSON.parse(savedState);
        setCurrentTrack(state.track);
        setVolume(state.volume || 0.7);
        setIsMuted(state.isMuted || false);
        setIsVisible(true);

        // Restore playback position after audio loads
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = state.currentTime || 0;
            if (state.isPlaying) {
              audioRef.current.play().catch(() => {
                // Autoplay might be blocked
                console.log("Autoplay blocked, user interaction required");
              });
            }
          }
        }, 1000);
      } catch (error) {
        console.log("Error restoring player state:", error);
      }
    }

    return () => {
      window.removeEventListener("beforeunload", saveState);
    };
  }, [currentTrack, isMuted, isPlaying, volume]);

  const playTrack = useCallback(async (track: Track) => {
    if (!audioRef.current) return;

    try {
      const audioUrl = track.storage_path
        ? `https://slheudxfcqqppyphyobq.supabase.co/storage/v1/object/public/admin-media/${track.storage_path}`
        : track.url;

      if (audioUrl) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
        setIsPlaying(true);
        setCurrentTrack(track);
        toast.success(`🎵 Now playing: ${track.original_name || track.name}`);
      }
    } catch (error) {
      console.error("Failed to play track:", error);
      toast.error("Failed to play audio file");
    }
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        if (!audioRef.current.src) {
          await playTrack(currentTrack);
        } else {
          await audioRef.current.play();
        }
      } catch (error) {
        toast.error("Failed to play audio");
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "🔊 Audio unmuted" : "🔇 Audio muted", {
      duration: 1000,
    });
  };

  const playNext = useCallback(() => {
    if (playlist.length === 0) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    playTrack(playlist[nextIndex]);
  }, [playlist, currentIndex, playTrack]);

  const playPrevious = () => {
    if (playlist.length === 0) return;
    const prevIndex =
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    playTrack(playlist[prevIndex]);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = (value[0] / 100) * duration;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const hidePlayer = () => {
    setIsVisible(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    sessionStorage.removeItem("gaiaPlayerState");
  };

  if (!isVisible || !currentTrack) {
    return <audio ref={audioRef} />;
  }

  return (
    <>
      <audio ref={audioRef} />

      <Card
        className={`fixed bottom-4 right-4 z-50 border-primary/30 bg-background/95 backdrop-blur-md transition-all duration-300 ${
          isMinimized ? "w-64 h-16" : "w-80 h-auto"
        }`}
      >
        <CardContent className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {isMinimized ? "🎵" : "Gaia Music"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
              >
                {isMinimized ? (
                  <Maximize2 className="h-3 w-3" />
                ) : (
                  <Minimize2 className="h-3 w-3" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={hidePlayer}
                className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Track info */}
              <div className="mb-3">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {currentTrack.original_name || currentTrack.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <Slider
                  value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={handleSeek}
                />
              </div>
            </>
          )}

          {/* Controls */}
          <div
            className={`flex items-center ${isMinimized ? "justify-center gap-2" : "justify-between"}`}
          >
            {!isMinimized && playlist.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={playPrevious}
                className="h-8 w-8 p-0 text-primary hover:text-primary/80"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="h-8 w-8 p-0 text-primary hover:text-primary/80"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            {!isMinimized && (
              <>
                {playlist.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={playNext}
                    className="h-8 w-8 p-0 text-primary hover:text-primary/80"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="h-6 w-6 p-0 text-primary hover:text-primary/80"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3 w-3" />
                    ) : (
                      <Volume2 className="h-3 w-3" />
                    )}
                  </Button>
                  <Slider
                    value={[volume * 100]}
                    max={100}
                    step={5}
                    className="w-16"
                    onValueChange={(value) => setVolume(value[0] / 100)}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
