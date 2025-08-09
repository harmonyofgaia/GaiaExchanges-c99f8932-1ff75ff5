import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, Clock } from "lucide-react";

export function VideoChallengesEvents() {
  const [activeTab, setActiveTab] = useState("challenges");

  const upcomingEvents = [
    {
      id: 1,
      title: "Earth Day Video Challenge",
      date: "2024-04-22",
      participants: 1234,
      prize: "5000 GAiA Tokens",
      status: "Open",
    },
    {
      id: 2,
      title: "Renewable Energy Showcase",
      date: "2024-05-01",
      participants: 892,
      prize: "3000 GAiA Tokens",
      status: "Starting Soon",
    },
    {
      id: 3,
      title: "Ocean Conservation Stories",
      date: "2024-05-15",
      participants: 567,
      prize: "2500 GAiA Tokens",
      status: "Open",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-400" />
            Challenges & Events
            <Badge variant="secondary">Community Driven</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={activeTab === "challenges" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("challenges")}
              >
                Active Challenges
              </Button>
              <Button
                variant={activeTab === "events" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("events")}
              >
                Upcoming Events
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-purple-400">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.participants} participants
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        event.status === "Open" ? "default" : "secondary"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium">
                        Prize: {event.prize}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      {event.status === "Open"
                        ? "Join Challenge"
                        : "Learn More"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
