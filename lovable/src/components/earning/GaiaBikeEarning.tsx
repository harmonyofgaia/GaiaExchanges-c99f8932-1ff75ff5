import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bike, MapPin, Zap, Trophy, Play, Square } from "lucide-react";
import { toast } from "sonner";

interface BikeSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  distance: number;
  tokensEarned: number;
  route: string;
  isActive: boolean;
}

export function GaiaBikeEarning() {
  const [currentSession, setCurrentSession] = useState<BikeSession | null>(
    null,
  );
  const [sessionHistory, setSessionHistory] = useState<BikeSession[]>([
    {
      id: "1",
      startTime: new Date("2024-01-20T14:30:00"),
      endTime: new Date("2024-01-20T15:45:00"),
      distance: 12.5,
      tokensEarned: 25,
      route: "Central Park Loop",
      isActive: false,
    },
    {
      id: "2",
      startTime: new Date("2024-01-22T09:15:00"),
      endTime: new Date("2024-01-22T10:30:00"),
      distance: 8.3,
      tokensEarned: 17,
      route: "Riverside Path",
      isActive: false,
    },
  ]);
  const [totalDistance, setTotalDistance] = useState(45.8);
  const [totalTokens, setTotalTokens] = useState(142);

  const startBikeSession = () => {
    const newSession: BikeSession = {
      id: Date.now().toString(),
      startTime: new Date(),
      distance: 0,
      tokensEarned: 0,
      route: "Live Route",
      isActive: true,
    };
    setCurrentSession(newSession);
    toast.success("Bike Session Started!", {
      description:
        "Your GAiA bike earning session is now active. Earn 2 tokens per km!",
      duration: 4000,
    });

    // Simulate distance tracking
    const interval = setInterval(() => {
      setCurrentSession((prev) => {
        if (!prev || !prev.isActive) {
          clearInterval(interval);
          return prev;
        }
        const newDistance = prev.distance + Math.random() * 0.3;
        const newTokens = Math.floor(newDistance * 2);
        return {
          ...prev,
          distance: newDistance,
          tokensEarned: newTokens,
        };
      });
    }, 2000);
  };

  const stopBikeSession = () => {
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        endTime: new Date(),
        isActive: false,
      };
      setSessionHistory((prev) => [completedSession, ...prev]);
      setTotalDistance((prev) => prev + currentSession.distance);
      setTotalTokens((prev) => prev + currentSession.tokensEarned);
      setCurrentSession(null);

      toast.success("Session Complete!", {
        description: `Earned ${currentSession.tokensEarned} GAiA tokens for ${currentSession.distance.toFixed(1)}km ride!`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Bike className="h-6 w-6" />
            🚴 GAiA Eco Bike Earning System
            <Badge className="bg-blue-600">Phase 1</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Session */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">
                Current Session
              </h3>

              {currentSession ? (
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">
                      LIVE TRACKING
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="text-blue-400 font-bold">
                        {currentSession.distance.toFixed(2)} km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Tokens Earning:
                      </span>
                      <span className="text-green-400 font-bold">
                        {currentSession.tokensEarned} GAiA
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="text-white">
                        {Math.floor(
                          (Date.now() - currentSession.startTime.getTime()) /
                            60000,
                        )}
                        m
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={stopBikeSession}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop Session
                  </Button>
                </div>
              ) : (
                <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-500/20 text-center">
                  <Bike className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">
                    Ready to start earning with your GAiA bike?
                  </p>
                  <Button
                    onClick={startBikeSession}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Ride Session
                  </Button>
                </div>
              )}
            </div>

            {/* Stats & History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">
                Your Stats
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {totalDistance.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total KM</div>
                </div>
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {totalTokens}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    GAiA Earned
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-blue-400">Recent Sessions</h4>
                {sessionHistory.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className="p-2 bg-muted/20 rounded border border-border/50"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {session.route}
                      </span>
                      <span className="text-green-400">
                        +{session.tokensEarned} GAiA
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session.distance.toFixed(1)}km •{" "}
                      {session.startTime.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              <span className="font-medium text-cyan-400">
                Earning Rate: 2 GAiA per KM
              </span>
            </div>
            <p className="text-sm text-cyan-300/80">
              💡 <strong>Bonus multipliers:</strong> Group rides (1.5x),
              eco-routes (1.3x), weekly challenges (2x)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
