import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Users, Clock, Award } from "lucide-react";

interface EcoMissionCardProps {
  mission: {
    id: string;
    title: string;
    description: string;
    reward: number;
    progress: number;
    maxProgress: number;
    difficulty: "Easy" | "Medium" | "Hard";
    timeLeft: string;
    participants: number;
  };
  onJoin?: (missionId: string) => void;
}

export function EcoMissionCard({ mission, onJoin }: EcoMissionCardProps) {
  const difficultyColors = {
    Easy: "bg-green-600",
    Medium: "bg-yellow-600",
    Hard: "bg-red-600",
  };

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Leaf className="h-5 w-5" />
          {mission.title}
        </CardTitle>
        <div className="flex gap-2">
          <Badge className={difficultyColors[mission.difficulty]}>
            {mission.difficulty}
          </Badge>
          <Badge className="bg-emerald-600">
            <Award className="h-3 w-3 mr-1" />
            {mission.reward} GAIA
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-green-300/80">{mission.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-400">Progress</span>
            <span className="text-green-300">
              {mission.progress}/{mission.maxProgress}
            </span>
          </div>
          <Progress
            value={(mission.progress / mission.maxProgress) * 100}
            className="h-2"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-blue-400">
            <Users className="h-4 w-4" />
            {mission.participants} participants
          </div>
          <div className="flex items-center gap-1 text-orange-400">
            <Clock className="h-4 w-4" />
            {mission.timeLeft}
          </div>
        </div>

        <Button
          onClick={() => onJoin?.(mission.id)}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Join Mission
        </Button>
      </CardContent>
    </Card>
  );
}
