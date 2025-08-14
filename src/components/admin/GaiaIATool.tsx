import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchResult } from "@/types/ui-types";

export function GaiaIATool() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const performSearch = async (query: string) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockResults: SearchResult[] = [
      {
        id: "1",
        type: "data",
        title: "Environmental Data",
        status: "active",
        timestamp: new Date(),
        source: "Environmental Database",
        data: `Environmental data for ${query}: Temperature trends show...`,
        confidence: 0.95,
      },
      {
        id: "2",
        type: "analysis",
        title: "Market Analysis",
        status: "completed",
        timestamp: new Date(),
        source: "Market Analytics",
        data: `Market analysis for ${query}: Current trends indicate...`,
        confidence: 0.88,
      },
    ];

    setSearchResults(mockResults);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return;
    performSearch(query);
  };

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="text-green-400">🔍 Gaia AI Search Tool</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Enter search query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>

        {/* Search Results */}
        <div className="space-y-3">
          {searchResults.map((result) => (
            <Card key={result.id} className="border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-400">{result.title}</h4>
                  <Badge variant="secondary">
                    {result.confidence !== undefined &&
                      `${(result.confidence * 100).toFixed(0)}% confidence`}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{result.data}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Source: {result.source}</span>
                  <span>•</span>
                  <span>Type: {result.type}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
