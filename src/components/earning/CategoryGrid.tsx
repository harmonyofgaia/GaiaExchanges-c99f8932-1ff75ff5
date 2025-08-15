import { useState } from "react";
import { CategoryMenuCard } from "./CategoryMenuCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List } from "lucide-react";

interface CategoryGridProps {
  categories: any[];
  onCategorySelect: (category: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CategoryGrid({ 
  categories, 
  onCategorySelect, 
  searchQuery, 
  onSearchChange 
}: CategoryGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'activities'>('name');

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'progress':
        return (b.completedCount / b.totalCount) - (a.completedCount / a.totalCount);
      case 'activities':
        return b.components.length - a.components.length;
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background/60 backdrop-blur-sm border-border/50"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sort controls */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-md bg-background/60 backdrop-blur-sm border border-border/50 text-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="activities">Sort by Activities</option>
          </select>
          
          {/* View mode toggle */}
          <div className="flex rounded-md border border-border/50 bg-background/60 backdrop-blur-sm">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Grid/List */}
      <div 
        className={
          viewMode === 'grid'
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {sortedCategories.map((category) => (
          <div
            key={category.id}
            className={
              viewMode === 'list' 
                ? "w-full" 
                : ""
            }
            style={{
              animationDelay: `${sortedCategories.indexOf(category) * 100}ms`
            }}
          >
            <CategoryMenuCard
              category={category}
              onClick={() => onCategorySelect(category)}
            />
          </div>
        ))}
      </div>

      {/* No results */}
      {sortedCategories.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No categories found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
}