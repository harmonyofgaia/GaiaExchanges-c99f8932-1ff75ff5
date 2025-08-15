import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, VolumeX, Play, Pause, X } from "lucide-react";

interface MediaPreferences {
  enabled: boolean;
  volume: number;
  autoplay: boolean;
}

export function BackgroundMediaEngine() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<unknown>(null);
  const [preferences, setPreferences] = useState<MediaPreferences>({
    enabled: false,
    volume: 0.3,
    autoplay: false,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check for active background media set by admin
    const activeMediaId = localStorage.getItem("activeBackgroundMedia");
    const activeMediaData = localStorage.getItem("activeBackgroundMediaData");

    if (activeMediaId && activeMediaData) {
      const mediaData = JSON.parse(activeMediaData);
      setCurrentMedia(mediaData);

      // Show media preferences dialog if not set
      const userPrefs = localStorage.getItem("gaiaMediaPreferences");
      if (!userPrefs) {
        setIsVisible(true);
      } else {
        const prefs = JSON.parse(userPrefs);
        setPreferences(prefs);
        if (prefs.enabled && prefs.autoplay) {
          playMedia();
        }
      }
    }
  }, []);

  const playMedia = () => {
    if (!currentMedia) return;

    if (currentMedia.type === "video" && videoRef.current) {
      videoRef.current.volume = preferences.volume;
      videoRef.current.play();
      setIsPlaying(true);
    } else if (currentMedia.type === "audio" && audioRef.current) {
      audioRef.current.volume = preferences.volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseMedia = () => {
    if (videoRef.current) videoRef.current.pause();
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (videoRef.current) videoRef.current.muted = newMuted;
    if (audioRef.current) audioRef.current.muted = newMuted;
  };

  const acceptMediaExperience = () => {
    const newPrefs = { ...preferences, enabled: true, autoplay: true };
    setPreferences(newPrefs);
    localStorage.setItem("gaiaMediaPreferences", JSON.stringify(newPrefs));
    setIsVisible(false);
    playMedia();
  };

  const declineMediaExperience = () => {
    const newPrefs = { ...preferences, enabled: false, autoplay: false };
    setPreferences(newPrefs);
    localStorage.setItem("gaiaMediaPreferences", JSON.stringify(newPrefs));
    setIsVisible(false);
  };

  if (!currentMedia) return null;

  return (
    <>
      {/* Media Preference Dialog */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-gradient-to-br from-green-900/90 to-blue-900/90 border-green-500/30 shadow-2xl">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="text-4xl mb-2">🎵</div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Experience Gaia's Harmony</h3>
                <p className="text-muted-foreground text-sm">
                  We've prepared a special {currentMedia.type} experience to enhance your journey.
                  Would you like to enable background media?
                </p>
              </div>

              <div className="bg-black/20 rounded-lg p-3 mb-4">
                <div className="text-sm text-green-300">
                  Now Playing: <span className="font-semibold">{currentMedia.name}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={acceptMediaExperience}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Yes, Immerse Me
                </Button>
                <Button onClick={declineMediaExperience} variant="outline" className="flex-1">
                  No Thanks
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                You can change this preference anytime in settings
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Media Controls (bottom right) */}
      {preferences.enabled && currentMedia && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="bg-black/80 backdrop-blur-md border-green-500/30">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <div className="text-xs text-green-400 font-medium max-w-[120px] truncate">
                  {currentMedia.name}
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={isPlaying ? pauseMedia : playMedia}
                    className="h-8 w-8 p-0 text-green-400 hover:text-green-300"
                  >
                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleMute}
                    className="h-8 w-8 p-0 text-green-400 hover:text-green-300"
                  >
                    {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setPreferences({ ...preferences, enabled: false })}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hidden Media Elements */}
      {currentMedia?.type === "audio" && (
        <audio
          ref={audioRef}
          src={currentMedia.url}
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {currentMedia?.type === "video" && (
        <video
          ref={videoRef}
          src={currentMedia.url}
          loop
          muted={isMuted}
          className="fixed inset-0 w-full h-full object-cover pointer-events-none opacity-10 z-[-1]"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </>
  );
}
