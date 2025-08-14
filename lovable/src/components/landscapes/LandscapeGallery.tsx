import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Share, Edit, Trash2, Star } from "lucide-react";

export function LandscapeGallery() {
  const [landscapes] = useState([
    {
      id: 1,
      name: "Mystic Volcano Realm",
      type: "Vulcan Land",
      size: "75 km²",
      complexity: "89%",
      rating: 4.8,
      downloads: 1247,
      thumbnail: "🌋",
      status: "Published",
    },
    {
      id: 2,
      name: "Lunar Crystal Caves",
      type: "Moon Land",
      size: "120 km²",
      complexity: "76%",
      rating: 4.9,
      downloads: 2156,
      thumbnail: "🌙",
      status: "Published",
    },
    {
      id: 3,
      name: "Digital Matrix Forest",
      type: "Dark Web Land",
      size: "95 km²",
      complexity: "94%",
      rating: 4.7,
      downloads: 867,
      thumbnail: "🌐",
      status: "Draft",
    },
    {
      id: 4,
      name: "Ancient Redwood Sanctuary",
      type: "Forest Land",
      size: "200 km²",
      complexity: "82%",
      rating: 4.9,
      downloads: 3421,
      thumbnail: "🌲",
      status: "Published",
    },
  ]);

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400">🖼️ My Landscape Gallery</CardTitle>
          <p className="text-muted-foreground">
            View, edit, and manage all your created landscapes
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {landscapes.map((landscape) => (
          <Card key={landscape.id} className="border-blue-500/20 bg-blue-900/10">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-blue-400">
                    <span className="text-3xl">{landscape.thumbnail}</span>
                    {landscape.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{landscape.type}</p>
                </div>
                <Badge
                  className={landscape.status === "Published" ? "bg-green-600" : "bg-yellow-600"}
                >
                  {landscape.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Size:</span>
                  <span className="ml-2 text-blue-400 font-semibold">{landscape.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Complexity:</span>
                  <span className="ml-2 text-purple-400 font-semibold">{landscape.complexity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">{landscape.rating}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Downloads:</span>
                  <span className="ml-2 text-green-400 font-semibold">
                    {landscape.downloads.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="border-green-500/30 text-green-400">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-500/30 text-purple-400"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
                <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-400">
                  <Share className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-500/20 bg-green-900/10">
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-bold text-green-400 mb-4">🌟 Gallery Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-green-400">{landscapes.length}</div>
              <div className="text-sm text-muted-foreground">Total Landscapes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">
                {landscapes.filter((l) => l.status === "Published").length}
              </div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {landscapes.reduce((sum, l) => sum + l.downloads, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {(landscapes.reduce((sum, l) => sum + l.rating, 0) / landscapes.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
