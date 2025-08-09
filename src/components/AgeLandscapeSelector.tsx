import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AgeLandscapeSelectorProps {
  selectedAge: string;
  onAgeSelect: (age: string) => void;
}

export function AgeLandscapeSelector({
  selectedAge,
  onAgeSelect,
}: AgeLandscapeSelectorProps) {
  const ageGroups = [
    {
      range: "6-8",
      title: "Young Builders",
      description: "Simple, colorful landscapes with basic tools",
      color: "bg-green-600",
    },
    {
      range: "9-12",
      title: "Creative Explorers",
      description: "More complex building tools and adventure elements",
      color: "bg-blue-600",
    },
    {
      range: "13-16",
      title: "Master Architects",
      description: "Advanced building features and realistic physics",
      color: "bg-purple-600",
    },
    {
      range: "17+",
      title: "Professional Creators",
      description: "Full creative suite with monetization options",
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {ageGroups.map((group) => (
        <Card
          key={group.range}
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedAge === group.range
              ? "border-2 border-green-400 bg-green-900/30"
              : "border border-gray-600 bg-gray-900/20"
          }`}
          onClick={() => onAgeSelect(group.range)}
        >
          <CardContent className="p-4 text-center">
            <Badge className={`${group.color} text-white mb-3`}>
              Ages {group.range}
            </Badge>
            <h3 className="font-bold text-lg mb-2">{group.title}</h3>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
