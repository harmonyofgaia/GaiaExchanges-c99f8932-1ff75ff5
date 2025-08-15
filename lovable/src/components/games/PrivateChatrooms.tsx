import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Shield, Lock, Users, Crown, Eye, Zap } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  encrypted: boolean;
  adminOnly?: boolean;
}

interface Chatroom {
  id: string;
  name: string;
  participants: number;
  private: boolean;
  location: string;
  admin: boolean;
}

interface ChatroomProps {
  selectedLocation: unknown;
  playerData: unknown;
  isAdmin: boolean;
}

export function PrivateChatrooms({ selectedLocation, playerData, isAdmin }: ChatroomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: "System",
      content:
        "🛡️ Welcome to the quantum-encrypted chatroom. All communications are secured by parabolic universe technology.",
      timestamp: new Date(),
      encrypted: true,
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [activeChatroom, setActiveChatroom] = useState<Chatroom | null>(null);
  const [availableChatrooms] = useState<Chatroom[]>([
    {
      id: "1",
      name: "Global Secure Chat",
      participants: 156,
      private: false,
      location: "Global",
      admin: false,
    },
    {
      id: "2",
      name: "VIP Members Only",
      participants: 42,
      private: true,
      location: "Global",
      admin: false,
    },
    {
      id: "3",
      name: "Local Community",
      participants: 23,
      private: false,
      location: selectedLocation?.city || "Unknown",
      admin: false,
    },
    {
      id: "4",
      name: "👑 Admin Command Center",
      participants: 1,
      private: true,
      location: "Secure",
      admin: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [parabolicConnection, setParabolicConnection] = useState(100);
  const [encryptionLevel, setEncryptionLevel] = useState(100);

  useEffect(() => {
    console.log("💬 PRIVATE CHATROOM SYSTEM INITIALIZED");
    console.log("🛡️ QUANTUM ENCRYPTION PROTOCOLS ACTIVE");
    console.log("🌌 PARABOLIC UNIVERSE CONNECTION ESTABLISHED");

    if (isAdmin) {
      console.log("👑 ADMIN CHATROOM ACCESS GRANTED");
      console.log("🔍 FULL SURVEILLANCE CAPABILITIES ENABLED");
    }

    // Simulate live connection monitoring
    const interval = setInterval(() => {
      setParabolicConnection((prev) =>
        Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 2))
      );
      setEncryptionLevel(100); // Always maximum for security
    }, 3000);

    return () => clearInterval(interval);
  }, [isAdmin]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChatroom = (chatroom: Chatroom) => {
    if (chatroom.admin && !isAdmin) {
      toast.error("🚫 Access Denied!", {
        description: "Admin-only chatroom - Insufficient privileges",
        duration: 3000,
      });
      return;
    }

    setActiveChatroom(chatroom);

    const welcomeMessage: Message = {
      id: Date.now().toString(),
      user: "System",
      content: `🎉 Welcome to ${chatroom.name}! This chatroom is ${chatroom.private ? "private and encrypted" : "open to community"}. Location: ${chatroom.location}`,
      timestamp: new Date(),
      encrypted: true,
    };

    setMessages([welcomeMessage]);

    toast.success(`💬 Joined ${chatroom.name}!`, {
      description: `Connected with quantum encryption - ${chatroom.participants} participants`,
      duration: 3000,
    });
  };

  const sendMessage = () => {
    if (!currentMessage.trim() || !activeChatroom) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: playerData.name,
      content: currentMessage,
      timestamp: new Date(),
      encrypted: true,
      adminOnly: isAdmin && activeChatroom.admin,
    };

    setMessages((prev) => [...prev, newMessage]);
    setCurrentMessage("");

    // Admin monitoring
    if (isAdmin) {
      console.log("👑 ADMIN MESSAGE SENT:", newMessage.content);
      console.log("🔍 FULL SURVEILLANCE LOG UPDATED");
    }

    // Simulate AI response in admin channel
    if (activeChatroom.admin && isAdmin) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          user: "Parabolic AI",
          content: `🤖 Acknowledged, Admin. All systems secure. Quantum defenses at 100%. No threats detected in the parabolic universe.`,
          timestamp: new Date(),
          encrypted: true,
          adminOnly: true,
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!selectedLocation) {
    return (
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardContent className="p-8 text-center">
          <MessageSquare className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-400 mb-2">🌍 Select Location First</h3>
          <p className="text-muted-foreground">
            Please select a location on the world map to access secure chatrooms in that area.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Status */}
      <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-6 w-6 animate-pulse" />
            🔒 QUANTUM ENCRYPTED CHATROOMS - {selectedLocation.city}
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge className="bg-green-600 animate-pulse">
              🌌 Parabolic Connection: {parabolicConnection.toFixed(1)}%
            </Badge>
            <Badge className="bg-blue-600">🔐 Encryption Level: {encryptionLevel}%</Badge>
            <Badge className="bg-purple-600">📍 Location: {selectedLocation.city}</Badge>
            {isAdmin && (
              <Badge className="bg-red-600 animate-pulse">👑 ADMIN SURVEILLANCE ACTIVE</Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chatroom List */}
        <Card className="bg-black/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400">💬 Available Chatrooms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableChatrooms.map((chatroom) => (
              <Card
                key={chatroom.id}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  activeChatroom?.id === chatroom.id
                    ? "bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500"
                    : "bg-gray-900/30 border-gray-500/30"
                } ${chatroom.admin && !isAdmin ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => joinChatroom(chatroom)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm">{chatroom.name}</h4>
                    {chatroom.private && <Lock className="h-4 w-4 text-yellow-400" />}
                    {chatroom.admin && <Crown className="h-4 w-4 text-red-400" />}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>👥 {chatroom.participants} participants</div>
                    <div>📍 {chatroom.location}</div>
                  </div>
                  {chatroom.admin && !isAdmin && (
                    <div className="text-xs text-red-400 mt-1">🚫 Admin Only</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2 bg-black/30 border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <MessageSquare className="h-6 w-6" />
              {activeChatroom ? `💬 ${activeChatroom.name}` : "💬 Select a Chatroom"}
            </CardTitle>
            {activeChatroom && (
              <div className="flex gap-2 text-sm">
                <Badge className="bg-green-600">👥 {activeChatroom.participants} Online</Badge>
                <Badge className="bg-blue-600">🔒 Quantum Encrypted</Badge>
                {activeChatroom.admin && <Badge className="bg-red-600">👑 Admin Channel</Badge>}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {activeChatroom ? (
              <div className="space-y-4">
                {/* Messages */}
                <ScrollArea className="h-64 w-full border border-gray-500/30 rounded-lg p-4 bg-black/20">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 rounded-lg ${
                          message.user === "System"
                            ? "bg-blue-900/30 border border-blue-500/30"
                            : message.adminOnly
                              ? "bg-red-900/30 border border-red-500/30"
                              : "bg-gray-900/30 border border-gray-500/30"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-sm">
                            {message.user === "System" && "🤖"}
                            {message.user === "Parabolic AI" && "🌌"}
                            {message.user !== "System" && message.user !== "Parabolic AI" && "👤"}
                            {message.user}
                          </span>
                          {message.encrypted && <Lock className="h-3 w-3 text-green-400" />}
                          {message.adminOnly && <Crown className="h-3 w-3 text-red-400" />}
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm">{message.content}</div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your encrypted message..."
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                    📤 Send
                  </Button>
                </div>

                {/* Security Info */}
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="text-xs text-green-300 space-y-1">
                    <div>🔒 All messages are quantum encrypted</div>
                    <div>🌌 Protected by parabolic universe technology</div>
                    <div>🛡️ Impossible to intercept or decode</div>
                    {isAdmin && (
                      <div className="text-red-300">
                        👑 Admin: Full monitoring capabilities active
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-400 mb-2">Select a Chatroom</h3>
                <p className="text-muted-foreground">
                  Choose a chatroom from the list to start secure communication.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
