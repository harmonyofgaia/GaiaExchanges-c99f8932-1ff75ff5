import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Volume2,
  Music,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";

interface Track {
  id: string;
  original_name: string;
  storage_path: string;
}

export function PersistentAudioControls() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Check for background music on mount and listen for changes
  useEffect(() => {
    const checkBackgroundMusic = () => {
      // Listen for events from admin media library
      const handleMediaUpdate = (event: CustomEvent) => {
        const { track, action } = event.detail;

        if (action === "play") {
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

      window.addEventListener("admin-audio-update", handleMediaUpdate as EventListener);

      return () => {
        window.removeEventListener("admin-audio-update", handleMediaUpdate as EventListener);
      };
    };

    checkBackgroundMusic();
  }, []);

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
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, playlist]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playTrack = async (track: Track) => {
    if (!audioRef.current) return;

    try {
      const audioUrl = `https://slheudxfcqqppyphyobq.supabase.co/storage/v1/object/public/admin-media/${track.storage_path}`;
      audioRef.current.src = audioUrl;
      await audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrack(track);
      toast.success(`🎵 Now playing: ${track.original_name}`);
    } catch (error) {
      console.error("Failed to play track:", error);
      toast.error("Failed to play audio file");
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        toast.error("Failed to play audio");
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    playTrack(playlist[nextIndex]);
  };

  const playPrevious = () => {
    if (playlist.length === 0) return;
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    playTrack(playlist[prevIndex]);
  };

  const formatTime = (seconds: number) => {
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
  };

  if (!isVisible || !currentTrack) {
    return <audio ref={audioRef} />;
  }

  return (
    <>
      <audio ref={audioRef} />

      <Card
        className={`fixed bottom-4 right-4 z-40 border-purple-500/50 bg-black/90 backdrop-blur-md transition-all duration-300 ${
          isMinimized ? "w-64 h-16" : "w-80 h-auto"
        }`}
      >
        <CardContent className="p-3">
          {/* Header with minimize/close */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Music className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">
                {isMinimized ? "🎵" : "Background Music"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-purple-400 hover:text-purple-300"
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
                className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
              >
                ×
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Track info */}
              <div className="mb-3">
                <h4 className="text-sm font-medium text-white truncate">
                  {currentTrack.original_name}
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
                  onValueChange={(value) => {
                    if (audioRef.current && duration > 0) {
                      audioRef.current.currentTime = (value[0] / 100) * duration;
                    }
                  }}
                />
              </div>
            </>
          )}

          {/* Controls */}
          <div
            className={`flex items-center ${isMinimized ? "justify-center gap-2" : "justify-between"}`}
          >
            {!isMinimized && (
              <Button
                variant="ghost"
                size="sm"
                onClick={playPrevious}
                disabled={playlist.length <= 1}
                className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={stopAudio}
              className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
            >
              <Square className="h-4 w-4" />
            </Button>

            {!isMinimized && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={playNext}
                  disabled={playlist.length <= 1}
                  className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-purple-400" />
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
