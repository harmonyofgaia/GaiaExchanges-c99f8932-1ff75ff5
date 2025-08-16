import { useState, Suspense, lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Star, Trophy, Zap } from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";

export interface CategoryComponent {
  title: string;
  component: React.ComponentType;
  description?: string;
}

export interface Category {
  components: CategoryComponent[];
  title?: string;
  description?: string;
  completedCount: number;
  totalCount: number;
}

interface CategoryProps {
  onBack: () => void;
  category: Category;
}

export function EarningCategories({ onBack, category }: CategoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const filteredComponents = category.components.filter((comp: CategoryComponent) =>
    comp.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (selectedActivity) {
    const selectedComponent = category.components.find(
      (comp: CategoryComponent) => comp.title === selectedActivity,
    );

    if (selectedComponent) {
      const Component = selectedComponent.component;
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setSelectedActivity(null)}
              className="border-green-500/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {category.title}
            </Button>
            <h2 className="text-2xl font-bold text-green-400">
              {selectedComponent.title}
            </h2>
          </div>

          <Suspense
            fallback={
              <Card className="border-green-500/30">
                <CardContent className="p-8 text-center">
                  <Zap className="h-12 w-12 text-green-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-green-400">Loading activity...</p>
                </CardContent>
              </Card>
            }
          >
            <Component />
          </Suspense>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-green-500/30"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-green-400 mb-2">
            {category.title}
          </h2>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Progress</div>
          <div className="text-lg font-bold text-green-400">
            {category.completedCount}/{category.totalCount}
          </div>
          <Progress
            value={(category.completedCount / category.totalCount) * 100}
            className="w-24 h-2 mt-1"
          />
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component: CategoryComponent, index: number) => (
          <Card
            key={index}
            className={`${category.color} ${category.borderColor} border-2 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20`}
            onClick={() => setSelectedActivity(component.title)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <component.icon className="h-6 w-6 text-green-400" />
                <div className="flex-1">
                  <div className="text-lg font-bold text-green-400">
                    {component.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {component.points}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    component.difficulty === "Easy"
                      ? "border-green-500/50 text-green-400"
                      : component.difficulty === "Medium"
                        ? "border-yellow-500/50 text-yellow-400"
                        : component.difficulty === "Hard"
                          ? "border-red-500/50 text-red-400"
                          : "border-purple-500/50 text-purple-400"
                  }`}
                >
                  {component.difficulty}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Potential Rewards:
                  </span>
                  <span className="text-green-400 font-medium">
                    {component.points} {GAIA_TOKEN.SYMBOL}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i <
                          (component.difficulty === "Easy"
                            ? 2
                            : component.difficulty === "Medium"
                              ? 3
                              : component.difficulty === "Hard"
                                ? 4
                                : 5)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedActivity(component.title);
                  }}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Start Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredComponents.length === 0 && (
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              No Activities Found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms to find activities.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
