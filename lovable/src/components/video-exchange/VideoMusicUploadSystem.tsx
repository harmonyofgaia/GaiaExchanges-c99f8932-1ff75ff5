import React, { useState , useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Music, Upload, Coins, Play, Eye, Heart, Users } from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";
import { toast } from "sonner";

interface MusicUpload {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  uploadDate: string;
  plays: number;
  likes: number;
  tokensEarned: number;
  status: "processing" | "approved" | "published";
}

export function VideoMusicUploadSystem() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [userTokens, setUserTokens] = useState(2847);

  const recentUploads: MusicUpload[] = [
    {
      id: "1",
      title: "Seeds Will Form Into Music",
      artist: "Harmony of Gaia",
      genre: "Electronic Eco",
      duration: "4:32",
      uploadDate: "2 days ago",
      plays: 15673,
      likes: 2341,
      tokensEarned: 156,
      status: "published",
    },
    {
      id: "2",
      title: "Forest Whispers",
      artist: "EcoSounds Collective",
      genre: "Ambient Nature",
      duration: "6:15",
      uploadDate: "5 days ago",
      plays: 8932,
      likes: 1456,
      tokensEarned: 89,
      status: "approved",
    },
    {
      id: "3",
      title: "Green Revolution Beat",
      artist: "Culture of Harmony",
      genre: "Hip-Hop Eco",
      duration: "3:48",
      uploadDate: "1 week ago",
      plays: 23451,
      likes: 3678,
      tokensEarned: 234,
      status: "published",
    },
  ];

  const handleUpload = () => {
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          const tokensEarned = Math.floor(Math.random() * 50) + 25;
          setUserTokens((prev) => prev + tokensEarned);
          toast.success(`🎵 Music uploaded! Earned ${tokensEarned} ${GAIA_TOKEN.SYMBOL} tokens`, {
            description: "Your performance is being processed for approval",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Token Balance */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coins className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">{userTokens}</div>
                <div className="text-sm text-muted-foreground">
                  {GAIA_TOKEN.SYMBOL} Tokens from Music
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Official {GAIA_TOKEN.NAME} Integration
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Form */}
        <Card className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Upload className="h-5 w-5" />
              Upload Musical Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Share your music and earn {GAIA_TOKEN.SYMBOL} tokens based on plays and engagement
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audio-file">Audio/Video File</Label>
              <Input id="audio-file" type="file" accept="audio/*,video/*" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="track-title">Track Title</Label>
              <Input id="track-title" placeholder="Enter your track title..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist-name">Artist Name</Label>
              <Input id="artist-name" placeholder="Your artist name..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input id="genre" placeholder="Electronic Eco, Ambient Nature, etc..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell the story behind your music..."
                rows={3}
              />
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Music className="h-4 w-4 mr-2" />
              {isUploading ? "Processing..." : "Upload & Earn Tokens"}
            </Button>

            <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
              <h4 className="font-bold text-green-400 mb-2">Token Earning System</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• Upload bonus: 25 {GAIA_TOKEN.SYMBOL} tokens</div>
                <div>• Play rewards: 0.1 token per play</div>
                <div>• Like bonus: 1 token per like</div>
                <div>• Quality bonus: up to 50 tokens</div>
                <div>• Viral bonus: 100+ tokens for trending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Music Library */}
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Music className="h-5 w-5" />
              Your Music Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.map((track) => (
                <Card key={track.id} className="border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">by {track.artist}</p>
                      </div>
                      <Badge
                        variant={
                          track.status === "published"
                            ? "default"
                            : track.status === "approved"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {track.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {track.genre}
                      </Badge>
                      <span className="text-xs text-muted-foreground">• {track.duration}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {track.plays.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {track.likes.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-green-400" />
                        {track.tokensEarned} {GAIA_TOKEN.SYMBOL}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Music Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-purple-500/30 bg-purple-900/10">
          <CardContent className="p-4 text-center">
            <Music className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">47</div>
            <div className="text-sm text-muted-foreground">Tracks Uploaded</div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/30 bg-blue-900/10">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">125.4K</div>
            <div className="text-sm text-muted-foreground">Total Plays</div>
          </CardContent>
        </Card>
        <Card className="border-red-500/30 bg-red-900/10">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400">18.7K</div>
            <div className="text-sm text-muted-foreground">Total Likes</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30 bg-green-900/10">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">2.3K</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
