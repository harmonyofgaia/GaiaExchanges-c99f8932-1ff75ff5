import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Ban } from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  status: "active" | "warned" | "restricted" | "banned";
  joinDate: string;
  lastActivity: string;
  ipAddress: string;
  location: string;
}

export function UserControlPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState<User[]>([
    {
      id: "1",
      username: "TestUser1",
      email: "user1@example.com",
      status: "active",
      joinDate: "2024-01-15",
      lastActivity: "2 min ago",
      ipAddress: "192.168.1.101",
      location: "United States",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "warned":
        return "bg-yellow-600";
      case "restricted":
        return "bg-orange-600";
      case "banned":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <h3 className="text-lg font-semibold text-green-400">
        Active Users ({filteredUsers.length})
      </h3>

      {filteredUsers.map((user) => (
        <Card key={user.id} className="bg-black/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold">{user.username}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    IP: {user.ipAddress} • Location: {user.location}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Joined: {user.joinDate} • Last active: {user.lastActivity}
                  </div>
                </div>
                <Badge className={`${getStatusColor(user.status)} text-white`}>
                  {user.status.toUpperCase()}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive">
                  <Ban className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
