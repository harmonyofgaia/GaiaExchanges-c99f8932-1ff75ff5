import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sprout,
  Calendar,
  Coins,
  Trees,
  Users,
  MapPin,
  TrendingUp,
  Leaf,
  Crown,
  Star,
  Plus,
  DollarSign,
} from "lucide-react";

interface FarmEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  ticketPrice: number;
  expectedAttendees: number;
  status: "planning" | "active" | "completed";
  profitGenerated: number;
  forestLayers: number;
}

interface ForestProject {
  id: string;
  name: string;
  location: string;
  layers: number;
  targetLayers: number;
  totalInvestment: number;
  completionDate: string;
  status: "designing" | "funding" | "planting" | "growing" | "complete";
}

export function FarmerEcosystem() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    ticketPrice: 0,
    expectedAttendees: 0,
  });

  const [farmEvents] = useState<FarmEvent[]>([
    {
      id: "1",
      title: "Sustainable Harvest Festival",
      description: "Community gathering celebrating organic farming and permaculture techniques",
      date: "2024-08-15",
      location: "Green Valley Farm, California",
      ticketPrice: 45,
      expectedAttendees: 250,
      status: "active",
      profitGenerated: 8750,
      forestLayers: 2,
    },
    {
      id: "2",
      title: "Regenerative Agriculture Workshop",
      description: "Educational workshop on soil restoration and biodiversity enhancement",
      date: "2024-09-20",
      location: "EcoFarm Institute, Oregon",
      ticketPrice: 120,
      expectedAttendees: 100,
      status: "planning",
      profitGenerated: 0,
      forestLayers: 0,
    },
    {
      id: "3",
      title: "Forest Garden Symposium",
      description: "Sharing knowledge about food forests and layered ecosystems",
      date: "2024-07-10",
      location: "Woodland Preserve, Vermont",
      ticketPrice: 75,
      expectedAttendees: 180,
      status: "completed",
      profitGenerated: 12150,
      forestLayers: 3,
    },
  ]);

  const [forestProjects] = useState<ForestProject[]>([
    {
      id: "1",
      name: "Pacific Living Forest Complex",
      location: "Washington State",
      layers: 5,
      targetLayers: 7,
      totalInvestment: 125000,
      completionDate: "2025-06-15",
      status: "planting",
    },
    {
      id: "2",
      name: "Desert Oasis Food Forest",
      location: "Arizona",
      layers: 3,
      targetLayers: 7,
      totalInvestment: 89000,
      completionDate: "2025-09-30",
      status: "funding",
    },
    {
      id: "3",
      name: "Mountain Valley Ecosystem",
      location: "Colorado",
      layers: 7,
      targetLayers: 7,
      totalInvestment: 156000,
      completionDate: "2024-12-01",
      status: "complete",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
      case "completed":
        return "bg-green-600";
      case "active":
      case "planting":
      case "growing":
        return "bg-blue-600";
      case "planning":
      case "designing":
      case "funding":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const totalEventRevenue = farmEvents.reduce((sum, event) => sum + event.profitGenerated, 0);
  const totalForestInvestment = forestProjects.reduce(
    (sum, project) => sum + project.totalInvestment,
    0
  );
  const totalForestLayers = forestProjects.reduce((sum, project) => sum + project.layers, 0);

  const handleCreateEvent = () => {
    // In a real app, this would create a new event
    console.log("Creating new event:", newEvent);
    setNewEvent({
      title: "",
      description: "",
      location: "",
      ticketPrice: 0,
      expectedAttendees: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-green-400 flex items-center gap-2">
            <Sprout className="h-6 w-6" />
            🌱 FARMER ECOSYSTEM COMMAND CENTER
          </CardTitle>
          <p className="text-muted-foreground">
            Create land events, generate profits, and build 7-layered living forests worldwide
          </p>
        </CardHeader>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-blue-400">{farmEvents.length}</div>
                <div className="text-sm text-muted-foreground">Total Events</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">
                  ${totalEventRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Event Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trees className="h-5 w-5 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-purple-400">{forestProjects.length}</div>
                <div className="text-sm text-muted-foreground">Forest Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-yellow-400">{totalForestLayers}</div>
                <div className="text-sm text-muted-foreground">Forest Layers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">🏠 Dashboard</TabsTrigger>
          <TabsTrigger value="events">📅 Events</TabsTrigger>
          <TabsTrigger value="forests">🌳 Forests</TabsTrigger>
          <TabsTrigger value="create">➕ Create</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-400">Recent Event Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {farmEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-2 bg-gray-800/50 rounded"
                  >
                    <div>
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.location}</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                      {event.profitGenerated > 0 && (
                        <span className="text-green-400 text-sm">${event.profitGenerated}</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">
                  Forest Development Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {forestProjects.map((project) => (
                  <div key={project.id} className="p-3 bg-gray-800/50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{project.name}</div>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{project.location}</span>
                      <span>
                        Layers: {project.layers}/{project.targetLayers}
                      </span>
                      <span>${project.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                        style={{
                          width: `${(project.layers / project.targetLayers) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-yellow-400">
                💰 Profit-to-Forest Investment Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    ${totalEventRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Event Profits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    ${totalForestInvestment.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Forest Investment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{totalForestLayers} / 21</div>
                  <div className="text-sm text-muted-foreground">
                    Layers Created (Target: 7 per forest)
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <h4 className="text-green-400 font-semibold mb-2">🌱 Ecosystem Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Every farmer event generates profits that directly fund the creation of 7-layered
                  living forests. These forests provide sustainable food production, carbon
                  sequestration, and biodiversity restoration.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-indigo-400">🎪 Farm Events Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {farmEvents.map((event) => (
                  <Card key={event.id} className="bg-gray-800/50 border border-gray-700/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <h3 className="font-semibold">{event.title}</h3>
                            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Coins className="h-3 w-3" />${event.ticketPrice} ticket
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.expectedAttendees} attendees
                            </div>
                          </div>
                          {event.profitGenerated > 0 && (
                            <div className="mt-2 p-2 bg-green-900/20 border border-green-500/30 rounded">
                              <span className="text-green-400 text-sm font-medium">
                                💰 Profit Generated: ${event.profitGenerated} → {event.forestLayers}{" "}
                                Forest Layers Funded
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forests" className="space-y-4">
          <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-green-400">🌳 7-Layered Living Forests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forestProjects.map((project) => (
                  <Card key={project.id} className="bg-gray-800/50 border border-gray-700/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            <Trees className="h-4 w-4 text-green-400" />
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{project.location}</p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Layers:</span>
                          <div className="font-medium text-green-400">
                            {project.layers} / {project.targetLayers}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Investment:</span>
                          <div className="font-medium text-blue-400">
                            ${project.totalInvestment.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Completion:</span>
                          <div className="font-medium text-purple-400">
                            {project.completionDate}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Progress:</span>
                          <div className="font-medium text-yellow-400">
                            {Math.round((project.layers / project.targetLayers) * 100)}%
                          </div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${(project.layers / project.targetLayers) * 100}%`,
                          }}
                        ></div>
                      </div>

                      {project.layers === project.targetLayers && (
                        <div className="mt-2 p-2 bg-green-900/30 border border-green-500/50 rounded">
                          <span className="text-green-400 text-sm font-medium">
                            🎉 Complete 7-Layer Ecosystem! Providing sustainable food, carbon
                            capture & biodiversity.
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card className="bg-gradient-to-br from-violet-900/20 to-pink-900/20 border border-violet-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-violet-400 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Farm Event
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Event Title</label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event name..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Event location..."
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Describe your farm event..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ticket Price ($)</label>
                  <Input
                    type="number"
                    value={newEvent.ticketPrice}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        ticketPrice: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Expected Attendees</label>
                  <Input
                    type="number"
                    value={newEvent.expectedAttendees}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        expectedAttendees: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">📊 Projected Impact</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Estimated Revenue:</span>
                    <div className="font-medium text-green-400">
                      ${(newEvent.ticketPrice * newEvent.expectedAttendees).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Forest Layers Fundable:</span>
                    <div className="font-medium text-purple-400">
                      {Math.floor((newEvent.ticketPrice * newEvent.expectedAttendees) / 5000)}{" "}
                      layers
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCreateEvent}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Sprout className="h-4 w-4 mr-2" />
                Create Event & Start Forest Fund
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
