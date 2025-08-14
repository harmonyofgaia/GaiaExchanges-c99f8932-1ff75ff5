import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Headphones, MapPin, Play, Pause, Volume2, Eye } from "lucide-react";
import { toast } from "sonner";

interface VRExperienceProps {
  animals: Array<{
    id: string;
    name: string;
    species: string;
    emoji: string;
    vrAvailable: boolean;
    currentLocation: string;
    adoptionReady: boolean;
  }>;
}

export function AnimalVRExperience({ animals }: VRExperienceProps) {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [sessionProgress, setSessionProgress] = useState(0);

  const startVRSession = (animalId: string, animalName: string) => {
    setActiveSession(animalId);
    setSessionProgress(0);

    toast.success(`🥽 Starting VR session with ${animalName}!`, {
      description: "Put on your VR headset and explore potential new habitats together.",
      duration: 4000,
    });

    // Simulate session progress
    const interval = setInterval(() => {
      setSessionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setActiveSession(null);
          toast.info(`✨ VR session with ${animalName} completed!`, {
            description: "You helped explore new habitat options for their future release.",
            duration: 4000,
          });
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  };

  const vrAnimals = animals.filter((animal) => animal.vrAvailable);

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Headphones className="h-6 w-6" />
            🥽 VR Habitat Exploration & Rehabilitation
          </CardTitle>
          <p className="text-muted-foreground">
            Use Virtual Reality to walk with animals and help them explore potential new habitats
            for their release.
          </p>
        </CardHeader>
      </Card>

      {activeSession && (
        <Card className="border-green-500/50 bg-green-900/20 animate-pulse">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-4xl">🥽</div>
              <h3 className="text-xl font-bold text-green-400">VR Session Active</h3>
              <Progress value={sessionProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Exploring new habitat locations... {sessionProgress.toFixed(0)}% complete
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vrAnimals.map((animal) => (
          <Card key={animal.id} className="border-purple-500/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{animal.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{animal.name}</h3>
                    <p className="text-muted-foreground">{animal.species}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-blue-400" />
                      <span className="text-xs">{animal.currentLocation}</span>
                    </div>
                  </div>
                  <Badge className="bg-purple-600">
                    <Eye className="h-3 w-3 mr-1" />
                    VR Ready
                  </Badge>
                </div>

                <div className="bg-purple-900/30 p-4 rounded border border-purple-500/20">
                  <h4 className="font-semibold mb-2">🌍 Available VR Experiences:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Explore natural habitat options</li>
                    <li>• Walk through potential release sites</li>
                    <li>• Experience their current environment</li>
                    <li>• Virtual rehabilitation exercises</li>
                  </ul>
                </div>

                {animal.adoptionReady && (
                  <div className="bg-green-900/30 p-3 rounded border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">🌟</span>
                      <span className="text-sm font-semibold text-green-400">
                        Ready for Release Planning
                      </span>
                    </div>
                    <p className="text-xs text-green-300 mt-1">
                      Help find the perfect new habitat through VR exploration!
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => startVRSession(animal.id, animal.name)}
                  disabled={activeSession !== null}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  {activeSession === animal.id
                    ? "Session Active..."
                    : `Start VR with ${animal.name}`}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  VR headset required • Compatible with Meta Quest, PSVR2, HTC Vive
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vrAnimals.length === 0 && (
        <Card className="border-yellow-500/30">
          <CardContent className="text-center py-8">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-2">No VR Sessions Available</h3>
            <p className="text-muted-foreground">
              VR experiences are being prepared for animals that are ready for release planning.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
