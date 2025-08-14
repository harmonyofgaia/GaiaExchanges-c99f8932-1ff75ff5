import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Music,
  Play,
  Pause,
  Heart,
  Share2,
  Radio,
  Users,
  Star,
  Volume2,
  Headphones,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface Artist {
  id: string;
  name: string;
  genre: string;
  listeners: number;
  avatar: string;
  isLive: boolean;
  currentSong?: string;
  streamUrl?: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  plays: number;
  likes: number;
}

export default function ArtistStreaming() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [liveArtists, setLiveArtists] = useState<Artist[]>([]);
  const [featuredTracks, setFeaturedTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Mock data for live artists
    setLiveArtists([
      {
        id: "1",
        name: "EcoSounds Collective",
        genre: "Ambient Nature",
        listeners: 2547,
        avatar: "🌿",
        isLive: true,
        currentSong: "Forest Whispers",
        streamUrl: "/stream/ecosounds",
      },
      {
        id: "2",
        name: "Harmony of Gaia",
        genre: "Electronic Eco",
        listeners: 1823,
        avatar: "🌍",
        isLive: true,
        currentSong: "Seeds Will Form Into Music",
        streamUrl: "/stream/harmony",
      },
      {
        id: "3",
        name: "Ocean Voices",
        genre: "Healing Sounds",
        listeners: 987,
        avatar: "🌊",
        isLive: false,
        currentSong: "Deep Blue Meditation",
      },
    ]);

    // Mock featured tracks
    setFeaturedTracks([
      {
        id: "1",
        title: "Seeds Will Form Into Music",
        artist: "Harmony of Gaia",
        duration: "4:32",
        genre: "Electronic Eco",
        plays: 15673,
        likes: 2341,
      },
      {
        id: "2",
        title: "Dragon's Breath",
        artist: "Culture of Harmony",
        duration: "3:45",
        genre: "Mystical",
        plays: 12890,
        likes: 1876,
      },
      {
        id: "3",
        title: "Green Revolution",
        artist: "EcoWarriors",
        duration: "5:18",
        genre: "Electronic",
        plays: 9876,
        likes: 1543,
      },
    ]);
  }, []);

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    toast.success(`Now playing: ${track.title} by ${track.artist}`);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleLike = (trackId: string) => {
    toast.success("Added to favorites! 💚");
  };

  const handleJoinLiveStream = (artist: Artist) => {
    toast.success(`Joined ${artist.name}'s live stream! 🎵`);
  };

  const LiveArtistCard = ({ artist }: { artist: Artist }) => (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{artist.avatar}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-white">{artist.name}</h3>
              {artist.isLive && <Badge className="bg-red-600 animate-pulse">🔴 LIVE</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{artist.genre}</p>
            <div className="flex items-center gap-2 text-sm text-purple-400">
              <Users className="h-4 w-4" />
              {artist.listeners.toLocaleString()} listeners
            </div>
          </div>
        </div>

        {artist.currentSong && (
          <div className="mb-4 p-3 bg-black/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Music className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Now Playing</span>
            </div>
            <p className="text-white font-semibold">{artist.currentSong}</p>
          </div>
        )}

        <Button
          onClick={() => handleJoinLiveStream(artist)}
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={!artist.isLive}
        >
          <Radio className="h-4 w-4 mr-2" />
          {artist.isLive ? "Join Live Stream" : "Not Live"}
        </Button>
      </CardContent>
    </Card>
  );

  const TrackCard = ({ track }: { track: Track }) => (
    <Card className="bg-card/50 border-green-500/20 hover:bg-card/70 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-white">{track.title}</h4>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className="text-xs">
                {track.genre}
              </Badge>
              <span className="text-xs text-muted-foreground">{track.duration}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                {track.plays.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleLike(track.id)}
              size="sm"
              variant="ghost"
              className="text-red-400 hover:text-red-300"
            >
              <Heart className="h-4 w-4" />
              {track.likes}
            </Button>
            <Button
              onClick={() => handlePlay(track)}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              🎵 Live Artist Streaming Platform
            </CardTitle>
            <div className="text-center space-y-2">
              <p className="text-xl text-muted-foreground">
                Where Seeds Form Into Music - Culture of Harmony Live
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-purple-600">🎤 Live Streams</Badge>
                <Badge className="bg-green-600">🌱 Eco Music</Badge>
                <Badge className="bg-blue-600">🎧 24/7 Streaming</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Current Player */}
        {currentTrack && (
          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                    <Music className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentTrack.title}</h3>
                    <p className="text-muted-foreground">{currentTrack.artist}</p>
                    <Badge className="bg-green-600 mt-1">{currentTrack.genre}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={isPlaying ? handlePause : () => handlePlay(currentTrack)}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button size="lg" variant="outline">
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card className="bg-card/50 border-gray-500/20">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <Input
                placeholder="Search artists, tracks, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-purple-600 hover:bg-purple-700">Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Artists */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
            <Radio className="h-6 w-6" />
            Live Artists ({liveArtists.filter((a) => a.isLive).length} online)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveArtists.map((artist) => (
              <LiveArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>

        {/* Featured Tracks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2">
            <Star className="h-6 w-6" />
            Featured Eco Tracks
          </h2>
          <div className="space-y-3">
            {featuredTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Headphones className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">12.5K</div>
              <div className="text-xs text-muted-foreground">Active Listeners</div>
            </CardContent>
          </Card>
          <Card className="bg-green-900/30 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Music className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">847</div>
              <div className="text-xs text-muted-foreground">Available Tracks</div>
            </CardContent>
          </Card>
          <Card className="bg-blue-900/30 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Radio className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">15</div>
              <div className="text-xs text-muted-foreground">Live Streams</div>
            </CardContent>
          </Card>
          <Card className="bg-orange-900/30 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">256</div>
              <div className="text-xs text-muted-foreground">Artists</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
