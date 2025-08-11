import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, SkipForward, Volume2, Pause } from "lucide-react";

interface GameIntroMovieProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function GameIntroMovie({ onComplete, onSkip }: GameIntroMovieProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const scenes = [
    {
      title: "Welcome to Harmony of Gaia",
      subtitle: "The Gaming Universe",
      duration: 4000,
      background: "from-blue-900/80 to-purple-900/80",
    },
    {
      title: "Where Seeds Form Into Music",
      subtitle: "And Dreams Become Reality",
      duration: 4000,
      background: "from-green-900/80 to-cyan-900/80",
    },
    {
      title: "Powered by GAiA Token",
      subtitle: "The Massively Token Underdog",
      duration: 4000,
      background: "from-orange-900/80 to-red-900/80",
    },
    {
      title: "Enter the Open Minded Space",
      subtitle: "Where Innovation Knows No Boundaries",
      duration: 4000,
      background: "from-purple-900/80 to-pink-900/80",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    // Show logo after 2 seconds instead of 5
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 2000);

    // Handle scene transitions
    const sceneTimer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene((prev) => prev + 1);
      } else {
        // Movie complete - auto advance after 2 seconds
        setTimeout(onComplete, 2000);
      }
    }, scenes[currentScene].duration);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(sceneTimer);
    };
  }, [currentScene, isPlaying, onComplete, scenes]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isPlaying && currentScene === 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <Button
          onClick={togglePlayback}
          className="bg-green-600 hover:bg-green-700"
        >
          <Play className="h-6 w-6 mr-2" />
          Start Game Intro
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Background Animation */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-br ${scenes[currentScene].background}
        transition-all duration-1000 ease-in-out
      `}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse top-1/4 left-1/4 bg-white-10"></div>
          <div className="absolute w-64 h-64 rounded-full blur-2xl animate-pulse bottom-1/4 right-1/4 bg-white-5"></div>
          <div className="absolute w-48 h-48 rounded-full blur-xl animate-pulse top-3/4 left-3/4 bg-white-15"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl px-8">
        {/* Logo */}
        {showLogo && (
          <div
            className={`
            transition-all duration-2000 ease-in-out
            ${currentScene > 1 ? "opacity-20 scale-75" : "opacity-100 scale-100"}
          `}
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-2xl">
              <div className="text-4xl font-bold text-white">HoG</div>
            </div>
          </div>
        )}

        {/* Scene Content */}
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-4">
            {scenes[currentScene].title}
          </h1>
          <p className="text-2xl md:text-3xl text-cyan-100 opacity-80">
            {scenes[currentScene].subtitle}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mt-12">
          {scenes.map((_, index) => (
            <div
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-500
                ${index === currentScene ? "bg-white scale-125" : "bg-white/30"}
              `}
            />
          ))}
        </div>

        {/* "Provided by Harmony of Gaia" */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-lg text-white/60">
            Provided by{" "}
            <span className="text-green-400 font-semibold">
              Harmony of Gaia
            </span>
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute top-6 right-6 flex gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={togglePlayback}
          className="bg-black/50 border-white/30 text-white hover:bg-black/70"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 mr-2" />
          ) : (
            <Play className="h-5 w-5 mr-2" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onSkip}
          className="bg-black/50 border-white/30 text-white hover:bg-black/70"
        >
          <SkipForward className="h-5 w-5 mr-2" />
          Skip Intro
        </Button>
      </div>

      {/* Audio Indicator */}
      <div className="absolute bottom-6 left-6">
        <div className="flex items-center gap-2 text-white/60">
          <Volume2 className="h-5 w-5" />
          <span className="text-sm">Game Audio: Enhanced</span>
        </div>
      </div>
    </div>
  );
}
