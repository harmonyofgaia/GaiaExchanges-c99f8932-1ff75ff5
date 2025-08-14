import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Bot, Heart, Sparkles } from "lucide-react";

export function RobotAdvertisement() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<"approaching" | "delivering" | "leaving">(
    "approaching"
  );
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show robot advertisement after 3 seconds on home page
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      setAnimationPhase("approaching");
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const phaseTimer = setTimeout(
      () => {
        if (animationPhase === "approaching") {
          setAnimationPhase("delivering");
          setShowMessage(true);
        } else if (animationPhase === "delivering") {
          setAnimationPhase("leaving");
        }
      },
      animationPhase === "approaching" ? 2000 : 16000
    ); // 2s approach, 16s deliver message

    if (animationPhase === "leaving") {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      return () => clearTimeout(hideTimer);
    }

    return () => clearTimeout(phaseTimer);
  }, [animationPhase]);

  if (!isVisible) return null;

  const getRobotPosition = () => {
    switch (animationPhase) {
      case "approaching":
        return "translate-x-full opacity-0";
      case "delivering":
        return "translate-x-0 opacity-100";
      case "leaving":
        return "-translate-x-full opacity-0";
      default:
        return "translate-x-full opacity-0";
    }
  };

  const handleClose = () => {
    setAnimationPhase("leaving");
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Robot Character */}
      <div
        className={`
        fixed bottom-20 right-10 
        transition-all duration-2000 ease-in-out
        ${getRobotPosition()}
        pointer-events-auto
      `}
      >
        <div className="relative">
          {/* Robot Body */}
          <div className="relative animate-bounce">
            <div className="w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-2xl relative">
              {/* Robot Head */}
              <div className="w-12 h-12 bg-gradient-to-b from-cyan-300 to-cyan-500 rounded-full absolute -top-6 left-2 shadow-lg">
                {/* Eyes */}
                <div className="flex gap-2 absolute top-3 left-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                {/* Antenna */}
                <div className="w-1 h-4 bg-gray-400 absolute -top-4 left-5">
                  <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -left-0.5 animate-ping"></div>
                </div>
              </div>

              {/* Robot Arms */}
              <div className="absolute -left-3 top-4 w-6 h-2 bg-blue-500 rounded animate-pulse"></div>
              <div className="absolute -right-3 top-4 w-6 h-2 bg-blue-500 rounded animate-pulse"></div>

              {/* Robot Legs */}
              <div className="absolute -bottom-2 left-2 w-3 h-4 bg-blue-700 rounded"></div>
              <div className="absolute -bottom-2 right-2 w-3 h-4 bg-blue-700 rounded"></div>

              {/* Heart Icon on Chest */}
              <Heart className="w-4 h-4 text-red-400 absolute top-8 left-6 animate-pulse" />

              {/* Bot Icon */}
              <Bot className="w-3 h-3 text-white absolute top-12 left-6" />
            </div>

            {/* Robot Trail Effect */}
            <div className="absolute -right-2 top-2 w-8 h-1 bg-blue-300 opacity-50 animate-pulse"></div>
            <div className="absolute -right-4 top-4 w-6 h-1 bg-blue-200 opacity-30 animate-pulse"></div>
            <div className="absolute -right-6 top-6 w-4 h-1 bg-blue-100 opacity-20 animate-pulse"></div>
          </div>

          {/* Sparkle Effects */}
          <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-2 -left-2 animate-spin" />
          <Sparkles className="w-3 h-3 text-blue-400 absolute -bottom-1 -right-2 animate-spin" />
        </div>
      </div>

      {/* Message Card */}
      {showMessage && animationPhase === "delivering" && (
        <div className="fixed bottom-44 right-4 pointer-events-auto animate-scale-in">
          <Card className="w-80 bg-gradient-to-br from-purple-900/95 to-blue-900/95 border-2 border-purple-400/50 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="absolute top-1 right-1 h-6 w-6 p-0 text-purple-300 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-cyan-400 animate-pulse" />
                  <h3 className="font-bold text-cyan-300">Message from Harmony of Gaia!</h3>
                </div>

                <div className="text-sm text-white space-y-2">
                  <p className="font-semibold text-yellow-300">
                    🚀 The Massively Token Underdog is here!
                  </p>
                  <p>
                    GAiA Token will{" "}
                    <strong className="text-green-400">bark his way to barriers</strong> of many
                    projects and
                    <strong className="text-purple-300"> rise and shine fully</strong> in this open
                    minded space!
                  </p>
                  <p className="text-cyan-200">
                    🛡️ Protected by our <strong>Exotic Defense System</strong> - the most powerful
                    AI-Human engagement ever created!
                  </p>
                  <p className="text-orange-300 font-medium">"Seeds Will Form Into Music" 🎵</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white"
                  >
                    Join the Revolution! 🚀
                  </Button>
                </div>
              </div>

              {/* Message pointer */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-purple-900 rotate-45 border-r border-b border-purple-400/50"></div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
