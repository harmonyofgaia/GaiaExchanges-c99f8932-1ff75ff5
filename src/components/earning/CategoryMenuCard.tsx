import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";

interface CategoryMenuCardProps {
  category: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
    borderColor: string;
    completedCount: number;
    totalCount: number;
    components: any[];
  };
  onClick: () => void;
}

export function CategoryMenuCard({ category, onClick }: CategoryMenuCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const completionPercentage = (category.completedCount / category.totalCount) * 100;
  
  return (
    <Card
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out
        ${category.borderColor} border-2 bg-gradient-to-br ${category.color}
        ${isHovered ? 'scale-105 shadow-2xl shadow-primary/20' : 'hover:scale-102'}
        transform-gpu will-change-transform
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rotating background gradient on hover */}
      <div 
        className={`
          absolute inset-0 opacity-20 transition-all duration-700 ease-in-out
          bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30
          ${isHovered ? 'rotate-45 scale-150' : 'rotate-0 scale-100'}
        `}
      />
      
      {/* Main content */}
      <CardContent className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className={`
                p-3 rounded-xl bg-primary/20 transition-all duration-500
                ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
              `}
            >
              <category.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground line-clamp-1">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {category.description}
              </p>
            </div>
          </div>
          
          <Badge 
            variant="secondary" 
            className={`
              transition-all duration-300
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          >
            {category.components.length} activities
          </Badge>
        </div>

        {/* Progress section */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-primary">
              {category.completedCount}/{category.totalCount}
            </span>
          </div>
          
          <Progress 
            value={completionPercentage} 
            className={`
              h-2 transition-all duration-300
              ${isHovered ? 'h-3' : 'h-2'}
            `}
          />
          
          <div className="text-xs text-muted-foreground text-center">
            {Math.round(completionPercentage)}% Complete
          </div>
        </div>

        {/* Hover overlay with quick stats */}
        <div 
          className={`
            absolute inset-0 bg-background/95 backdrop-blur-sm p-6
            flex flex-col justify-center items-center text-center
            transition-all duration-300 ease-in-out
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
          `}
        >
          <category.icon className="h-12 w-12 text-primary mb-3 animate-pulse" />
          <h4 className="text-xl font-bold text-foreground mb-2">
            {category.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            {category.description}
          </p>
          <div className="grid grid-cols-2 gap-3 w-full text-sm">
            <div className="bg-primary/10 rounded-lg p-2">
              <div className="font-semibold text-primary">{category.components.length}</div>
              <div className="text-muted-foreground">Activities</div>
            </div>
            <div className="bg-secondary/10 rounded-lg p-2">
              <div className="font-semibold text-secondary">{Math.round(completionPercentage)}%</div>
              <div className="text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}