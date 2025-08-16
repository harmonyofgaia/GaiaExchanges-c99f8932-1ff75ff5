import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Shield, Users, Lock } from "lucide-react";
import { toast } from "sonner";

interface Location {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  players: number;
  securityLevel: number;
  chatrooms: number;
}

interface WorldMapProps {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location) => void;
  playerData: unknown;
  isAdmin: boolean;
}

export function WorldMapSelector({
  selectedLocation,
  setSelectedLocation,
  playerData,
  isAdmin,
}: WorldMapProps) {
  const [locations] = useState<Location[]>([
    {
      id: "1",
      city: "Tokyo",
      country: "Japan",
      lat: 35.6762,
      lng: 139.6503,
      players: 2543,
      securityLevel: 100,
      chatrooms: 15,
    },
    {
      id: "2",
      city: "New York",
      country: "USA",
      lat: 40.7128,
      lng: -74.006,
      players: 3421,
      securityLevel: 100,
      chatrooms: 22,
    },
    {
      id: "3",
      city: "London",
      country: "UK",
      lat: 51.5074,
      lng: -0.1278,
      players: 1876,
      securityLevel: 100,
      chatrooms: 18,
    },
    {
      id: "4",
      city: "Paris",
      country: "France",
      lat: 48.8566,
      lng: 2.3522,
      players: 1654,
      securityLevel: 100,
      chatrooms: 12,
    },
    {
      id: "5",
      city: "Berlin",
      country: "Germany",
      lat: 52.52,
      lng: 13.405,
      players: 1432,
      securityLevel: 100,
      chatrooms: 14,
    },
    {
      id: "6",
      city: "Sydney",
      country: "Australia",
      lat: -33.8688,
      lng: 151.2093,
      players: 987,
      securityLevel: 100,
      chatrooms: 8,
    },
    {
      id: "7",
      city: "Dubai",
      country: "UAE",
      lat: 25.2048,
      lng: 55.2708,
      players: 1234,
      securityLevel: 100,
      chatrooms: 10,
    },
    {
      id: "8",
      city: "São Paulo",
      country: "Brazil",
      lat: -23.5505,
      lng: -46.6333,
      players: 1567,
      securityLevel: 100,
      chatrooms: 11,
    },
  ]);

  const [globalStats] = useState({
    totalPlayers: 15847,
    activeChatrooms: 156,
    securedLocations: 247,
    quantumEncryption: 100,
  });

  const selectLocation = (location: Location) => {
    setSelectedLocation(location);
    console.log(`🌍 LOCATION SELECTED: ${location.city}, ${location.country}`);
    console.log(`🛡️ QUANTUM SECURITY LEVEL: ${location.securityLevel}%`);
    console.log(`👥 ACTIVE PLAYERS: ${location.players}`);

    toast.success(`🌍 Location Selected: ${location.city}!`, {
      description: `${location.players} players online - Security Level: ${location.securityLevel}%`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-900/50 to-green-900/50 border-blue-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Globe className="h-6 w-6 animate-spin" />
            🌍 WORLD MAP - GLOBAL VIRTUAL REAL LIFE PLATFORM
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge className="bg-green-600">
              👥 {globalStats.totalPlayers.toLocaleString()} Total Players
            </Badge>
            <Badge className="bg-blue-600">💬 {globalStats.activeChatrooms} Active Chatrooms</Badge>
            <Badge className="bg-purple-600">
              🛡️ {globalStats.securedLocations} Secured Locations
            </Badge>
            <Badge className="bg-red-600 animate-pulse">
              🔒 {globalStats.quantumEncryption}% Quantum Encryption
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* World Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedLocation?.id === location.id
                ? "bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500"
                : "bg-black/30 border-gray-500/30"
            }`}
            onClick={() => selectLocation(location)}
          >
            <CardContent className="p-4">
              <div className="text-center mb-3">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-bold text-lg">{location.city}</h3>
                <p className="text-sm text-muted-foreground">{location.country}</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>👥 Players:</span>
                  <span className="text-green-400">{location.players}</span>
                </div>
                <div className="flex justify-between">
                  <span>💬 Chatrooms:</span>
                  <span className="text-blue-400">{location.chatrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span>🛡️ Security:</span>
                  <span className="text-purple-400">{location.securityLevel}%</span>
                </div>
              </div>

              <div className="mt-3 flex justify-center">
                <Badge
                  className={selectedLocation?.id === location.id ? "bg-green-600" : "bg-gray-600"}
                >
                  {selectedLocation?.id === location.id ? "✅ Selected" : "📍 Select"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <MapPin className="h-6 w-6" />
              📍 Selected Location: {selectedLocation.city}, {selectedLocation.country}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-900/30 rounded-lg">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">{selectedLocation.players}</div>
                <div className="text-sm text-muted-foreground">Online Players</div>
              </div>

              <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  {selectedLocation.securityLevel}%
                </div>
                <div className="text-sm text-muted-foreground">Security Level</div>
              </div>

              <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                <Lock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">
                  {selectedLocation.chatrooms}
                </div>
                <div className="text-sm text-muted-foreground">Private Chatrooms</div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-black/30 rounded-lg border border-green-500/20">
              <h4 className="text-lg font-bold text-green-400 mb-2">
                🔒 QUANTUM SECURITY FEATURES
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>✅ End-to-end quantum encryption</div>
                <div>✅ Zero-trace communication protocols</div>
                <div>✅ AI-powered threat detection</div>
                <div>✅ Parabolic universe protection</div>
                <div>✅ Admin-only monitoring capabilities</div>
                {isAdmin && (
                  <div className="text-red-400">👑 Admin: Full surveillance access enabled</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
