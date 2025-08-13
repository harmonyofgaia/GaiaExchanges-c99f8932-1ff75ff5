import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Shield,
  Users,
  Lock,
  Eye,
  EyeOff,
  Crown,
  AlertTriangle,
  CheckCircle,
  Send,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  verified: boolean;
  role: "admin" | "moderator" | "user";
  encrypted: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  securityLevel: "low" | "medium" | "high" | "quantum";
  adminOnly?: boolean;
}

export function SecureChatIntegration() {
  const [currentRoom, setCurrentRoom] = useState<string>("habbo-main");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      user: "TycoonMaster",
      message: "🏨 Welcome to the secure Habbo Tycoon community!",
      timestamp: new Date(),
      verified: true,
      role: "admin",
      encrypted: true,
    },
    {
      id: "2",
      user: "EcoBuilder",
      message: "This quantum encryption is amazing! Total privacy 🔒",
      timestamp: new Date(),
      verified: true,
      role: "user",
      encrypted: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers] = useState(2847);
  const [isAdminView, setIsAdminView] = useState(true); // Admin can see everything
  const [monitoringMode, setMonitoringMode] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    encryptionLevel: "quantum",
    autoModeration: true,
    adminAuditLog: true,
    userDataProtection: true,
  });

  const chatRooms: ChatRoom[] = [
    {
      id: "habbo-main",
      name: "🏨 Habbo Tycoon Main",
      description: "Main discussion for Habbo Tycoon players",
      memberCount: 1247,
      securityLevel: "quantum",
    },
    {
      id: "partnership-hub",
      name: "🤝 Partnership Hub",
      description: "Community partnership discussions",
      memberCount: 156,
      securityLevel: "high",
    },
    {
      id: "admin-vault",
      name: "👑 Admin Vault",
      description: "Secure admin communications",
      memberCount: 5,
      securityLevel: "quantum",
      adminOnly: true,
    },
    {
      id: "gaming-arena",
      name: "🎮 Gaming Arena",
      description: "Game discussions and challenges",
      memberCount: 892,
      securityLevel: "medium",
    },
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Simulate real-time messages
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomUsers = [
          "GameMaster",
          "EcoWarrior",
          "BuilderPro",
          "ChatModerator",
        ];
        const randomMessages = [
          "Just completed a major building project! 🏗️",
          "Anyone want to form an alliance?",
          "The new security features are incredible!",
          "Partnership opportunities in renewable energy 🌱",
          "Quantum encryption working perfectly! 🔐",
        ];

        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
          message:
            randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date(),
          verified: Math.random() > 0.2,
          role: Math.random() > 0.9 ? "moderator" : "user",
          encrypted: true,
        };

        setMessages((prev) => [...prev, newMsg]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "Admin (You)",
      message: newMessage,
      timestamp: new Date(),
      verified: true,
      role: "admin",
      encrypted: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    toast.success("🔐 Message sent with quantum encryption", {
      description: "Your message is now visible to verified community members",
    });
  };

  const toggleMonitoring = () => {
    setMonitoringMode(!monitoringMode);
    toast.info(
      monitoringMode ? "👁️ Monitoring disabled" : "👁️ Admin monitoring enabled",
      {
        description: monitoringMode
          ? "Chat privacy restored for community"
          : "Full admin oversight active for security",
      },
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return "👑";
      case "moderator":
        return "🛡️";
      default:
        return "👤";
    }
  };

  const getSecurityBadge = (level: string) => {
    const colors = {
      low: "bg-yellow-600",
      medium: "bg-blue-600",
      high: "bg-green-600",
      quantum: "bg-purple-600",
    };
    return colors[level as keyof typeof colors] || "bg-gray-600";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Shield className="h-6 w-6" />
            🔒 Secure Community Chat - Admin Control Panel
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-green-600">
              <Users className="h-3 w-3 mr-1" />
              {onlineUsers.toLocaleString()} Online
            </Badge>
            <Badge className="bg-purple-600">
              <Lock className="h-3 w-3 mr-1" />
              Quantum Encrypted
            </Badge>
            <Badge className="bg-blue-600">
              <Shield className="h-3 w-3 mr-1" />
              Full Admin Control
            </Badge>
            {monitoringMode && (
              <Badge className="bg-red-600 animate-pulse">
                <Eye className="h-3 w-3 mr-1" />
                Monitoring Active
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      <Tabs
        value={currentRoom}
        onValueChange={setCurrentRoom}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          {chatRooms.map((room) => (
            <TabsTrigger key={room.id} value={room.id} className="text-xs">
              {room.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {chatRooms.map((room) => (
          <TabsContent key={room.id} value={room.id} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Chat Area */}
              <div className="lg:col-span-3">
                <Card className="bg-black/30 border-blue-500/30">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-blue-400 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        {room.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getSecurityBadge(room.securityLevel)}>
                          {room.securityLevel.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {room.memberCount} members
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {room.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {/* Messages */}
                    <div className="h-96 bg-black/50 rounded-lg border border-blue-500/30 p-4 overflow-y-auto mb-4">
                      <div className="space-y-3">
                        {messages.map((msg) => (
                          <div key={msg.id} className="flex gap-3">
                            <div className="text-lg">
                              {getRoleIcon(msg.role)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`font-medium ${
                                    msg.role === "admin"
                                      ? "text-purple-400"
                                      : msg.role === "moderator"
                                        ? "text-green-400"
                                        : "text-blue-400"
                                  }`}
                                >
                                  {msg.user}
                                </span>
                                {msg.verified && (
                                  <CheckCircle className="h-3 w-3 text-green-400" />
                                )}
                                {msg.encrypted && (
                                  <Lock className="h-3 w-3 text-purple-400" />
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {msg.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm">
                                {msg.message}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message... (Admin privileges active)"
                        className="flex-1 bg-black/50 border-blue-500/30"
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      />
                      <Button
                        onClick={sendMessage}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Admin Controls */}
              <div className="space-y-4">
                <Card className="bg-black/30 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-purple-400 text-sm flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Admin Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={toggleMonitoring}
                      className={`w-full ${monitoringMode ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                      {monitoringMode ? (
                        <EyeOff className="h-4 w-4 mr-2" />
                      ) : (
                        <Eye className="h-4 w-4 mr-2" />
                      )}
                      {monitoringMode ? "Disable Monitor" : "Enable Monitor"}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-green-500/30"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Security Logs
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-yellow-500/30"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Moderation Queue
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-green-400 text-sm">
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Encryption:</span>
                      <Badge className="bg-purple-600">QUANTUM</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto-Moderation:</span>
                      <Badge className="bg-green-600">ACTIVE</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Audit Logging:</span>
                      <Badge className="bg-blue-600">ENABLED</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Protection:</span>
                      <Badge className="bg-green-600">MAXIMUM</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-yellow-500/30">
                  <CardHeader>
                    <CardTitle className="text-yellow-400 text-sm">
                      Chat Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Messages Today:</span>
                      <span className="text-yellow-400">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users:</span>
                      <span className="text-green-400">
                        {onlineUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mod Actions:</span>
                      <span className="text-blue-400">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Score:</span>
                      <span className="text-purple-400">100%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
