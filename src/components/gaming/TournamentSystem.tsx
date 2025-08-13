import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Trophy,
  Crown,
  Users,
  Calendar,
  Clock,
  Zap,
  Target,
  Star,
  Flame,
  Globe,
  Gift,
  Medal,
} from "lucide-react";
import { toast } from "sonner";

interface Tournament {
  id: string;
  name: string;
  type: "bracket" | "battle_royale" | "league";
  status: "upcoming" | "registration" | "active" | "completed";
  participants: number;
  maxParticipants: number;
  prizePool: number;
  startTime: string;
  duration: string;
  entryFee: number;
  sponsor: string;
}

interface Match {
  id: string;
  round: number;
  player1: { name: string; country: string; rank: number };
  player2: { name: string; country: string; rank: number };
  winner?: string;
  scheduled: string;
  status: "upcoming" | "live" | "completed";
}

export function TournamentSystem() {
  const [selectedTab, setSelectedTab] = useState<
    "browse" | "active" | "brackets" | "history"
  >("browse");
  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: "1",
      name: "GAIA World Championship",
      type: "bracket",
      status: "registration",
      participants: 847,
      maxParticipants: 1024,
      prizePool: 100000,
      startTime: "2024-01-15 18:00",
      duration: "3 hours",
      entryFee: 50,
      sponsor: "Harmony of Gaia",
    },
    {
      id: "2",
      name: "Ocean Cleanup Cup",
      type: "battle_royale",
      status: "upcoming",
      participants: 245,
      maxParticipants: 500,
      prizePool: 25000,
      startTime: "2024-01-12 20:00",
      duration: "1 hour",
      entryFee: 25,
      sponsor: "EcoWarriors",
    },
    {
      id: "3",
      name: "Rookie League Weekly",
      type: "league",
      status: "active",
      participants: 1234,
      maxParticipants: 2000,
      prizePool: 5000,
      startTime: "2024-01-10 16:00",
      duration: "7 days",
      entryFee: 5,
      sponsor: "Gaming Guild",
    },
  ]);

  const [activeTournament, setActiveTournament] = useState<Tournament | null>(
    tournaments[0],
  );
  const [matches, setMatches] = useState<Match[]>([
    {
      id: "1",
      round: 1,
      player1: { name: "You", country: "Global", rank: 1 },
      player2: { name: "EcoFighter", country: "Brazil", rank: 15 },
      scheduled: "2024-01-15 18:30",
      status: "upcoming",
    },
    {
      id: "2",
      round: 1,
      player1: { name: "NatureGuard", country: "Japan", rank: 8 },
      player2: { name: "PlanetSaver", country: "Germany", rank: 12 },
      scheduled: "2024-01-15 18:45",
      status: "live",
    },
  ]);

  const joinTournament = (tournament: Tournament) => {
    if (tournament.participants < tournament.maxParticipants) {
      setTournaments((prev) =>
        prev.map((t) =>
          t.id === tournament.id
            ? { ...t, participants: t.participants + 1 }
            : t,
        ),
      );

      toast.success("🏆 Tournament Joined!", {
        description: `Welcome to ${tournament.name}! Entry fee: ${tournament.entryFee} GAIA`,
        duration: 5000,
      });
    }
  };

  const getTournamentStatusColor = (status: string) => {
    switch (status) {
      case "registration":
        return "bg-blue-600";
      case "active":
        return "bg-green-600";
      case "upcoming":
        return "bg-yellow-600";
      case "completed":
        return "bg-gray-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bracket":
        return <Trophy className="h-4 w-4" />;
      case "battle_royale":
        return <Target className="h-4 w-4" />;
      case "league":
        return <Crown className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tournament Header */}
      <Card className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-2 border-yellow-500/50">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex items-center justify-center gap-2 text-yellow-400 text-3xl font-bold mb-2">
              <Trophy className="h-8 w-8" />
              🏆 GAIA TOURNAMENT SYSTEM
            </div>
            <div className="text-lg text-orange-400">
              Compete • Win Prizes • Become Legend
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/30">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">2,847</div>
              <div className="text-xs text-muted-foreground">
                Active Fighters
              </div>
            </div>

            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/30">
              <Crown className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">15</div>
              <div className="text-xs text-muted-foreground">
                Live Tournaments
              </div>
            </div>

            <div className="text-center p-4 bg-yellow-900/30 rounded border border-yellow-500/30">
              <Gift className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">250K</div>
              <div className="text-xs text-muted-foreground">
                Total Prizes (GAIA)
              </div>
            </div>

            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/30">
              <Medal className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">1,247</div>
              <div className="text-xs text-muted-foreground">
                Champions Crowned
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Card className="bg-gradient-to-br from-gray-900/50 to-blue-900/30 border border-blue-500/30">
        <CardContent className="p-4">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: "browse", label: "🔍 Browse Tournaments", icon: Globe },
              { key: "active", label: "⚡ My Active", icon: Zap },
              { key: "brackets", label: "🏆 Live Brackets", icon: Trophy },
              { key: "history", label: "📜 History", icon: Clock },
            ].map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`${
                  selectedTab === tab.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tournament Content */}
      {selectedTab === "browse" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <Card
              key={tournament.id}
              className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 border border-purple-500/30"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tournament.type)}
                    <CardTitle className="text-purple-400 text-lg">
                      {tournament.name}
                    </CardTitle>
                  </div>
                  <Badge
                    className={`${getTournamentStatusColor(tournament.status)} text-white text-xs`}
                  >
                    {tournament.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tournament Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Prize Pool:</span>
                    <span className="text-yellow-400 font-bold">
                      {tournament.prizePool.toLocaleString()} GAIA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entry Fee:</span>
                    <span className="text-green-400 font-bold">
                      {tournament.entryFee} GAIA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="text-blue-400">{tournament.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sponsor:</span>
                    <span className="text-cyan-400">{tournament.sponsor}</span>
                  </div>
                </div>

                {/* Participants Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Participants:</span>
                    <span>
                      {tournament.participants}/{tournament.maxParticipants}
                    </span>
                  </div>
                  <Progress
                    value={
                      (tournament.participants / tournament.maxParticipants) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                {/* Start Time */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Starts: {tournament.startTime}</span>
                </div>

                {/* Join Button */}
                <Button
                  onClick={() => joinTournament(tournament)}
                  disabled={
                    tournament.participants >= tournament.maxParticipants ||
                    tournament.status === "active"
                  }
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {tournament.status === "registration"
                    ? "Join Tournament"
                    : tournament.status === "active"
                      ? "In Progress"
                      : "Coming Soon"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "brackets" && activeTournament && (
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              🏆 {activeTournament.name} - Live Bracket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Tournament Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-blue-900/30 rounded">
                  <div className="text-lg font-bold text-blue-400">
                    {activeTournament.participants}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Participants
                  </div>
                </div>
                <div className="p-3 bg-yellow-900/30 rounded">
                  <div className="text-lg font-bold text-yellow-400">
                    {activeTournament.prizePool.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Prize Pool (GAIA)
                  </div>
                </div>
                <div className="p-3 bg-green-900/30 rounded">
                  <div className="text-lg font-bold text-green-400">
                    Round 1
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Current Round
                  </div>
                </div>
                <div className="p-3 bg-red-900/30 rounded">
                  <div className="text-lg font-bold text-red-400">LIVE</div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
              </div>

              {/* Live Matches */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-orange-400">
                  🔥 Live Matches
                </h3>
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className="p-4 bg-black/30 rounded-lg border border-border/30"
                  >
                    <div className="flex items-center justify-between">
                      {/* Player 1 */}
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-500 text-white">
                            {match.player1.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">
                            {match.player1.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {match.player1.country} • Rank #{match.player1.rank}
                          </div>
                        </div>
                      </div>

                      {/* VS & Status */}
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-400 mb-1">
                          VS
                        </div>
                        <Badge
                          className={`${
                            match.status === "live"
                              ? "bg-red-600 animate-pulse"
                              : match.status === "upcoming"
                                ? "bg-yellow-600"
                                : "bg-green-600"
                          } text-white text-xs`}
                        >
                          {match.status.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Player 2 */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-semibold">
                            {match.player2.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {match.player2.country} • Rank #{match.player2.rank}
                          </div>
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-red-500 text-white">
                            {match.player2.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {match.status === "upcoming" && (
                      <div className="mt-3 text-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 inline mr-1" />
                        Scheduled: {match.scheduled}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
