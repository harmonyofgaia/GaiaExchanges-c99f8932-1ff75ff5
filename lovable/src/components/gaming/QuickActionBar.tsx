import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Gamepad2,
  Wallet,
  Trophy,
  Target,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Globe,
  Heart,
  Crown,
  Flame,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface QuickAction {
  id: string;
  label: string;
  icon: unknown;
  action: () => void;
  color: string;
  badge?: string;
  hotkey?: string;
}

export function QuickActionBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: "quick-fight",
      label: "Quick Fight",
      icon: Target,
      action: () => {
        toast.success("⚔️ Quick Fight Started!", {
          description: "Matched with opponent - Battle begins now!",
          duration: 3000,
        });
      },
      color: "from-red-600 to-orange-600",
      hotkey: "F",
    },
    {
      id: "join-tournament",
      label: "Join Tournament",
      icon: Trophy,
      action: () => {
        toast.success("🏆 Tournament Joined!", {
          description: "Registered for next available tournament!",
          duration: 3000,
        });
      },
      color: "from-yellow-600 to-orange-600",
      badge: "15 Live",
      hotkey: "T",
    },
    {
      id: "battle-royale",
      label: "Battle Royale",
      icon: Crown,
      action: () => {
        toast.success("👑 Battle Royale Queued!", {
          description: "Waiting for 100 players - 47 more needed!",
          duration: 3000,
        });
      },
      color: "from-purple-600 to-pink-600",
      badge: "53/100",
      hotkey: "B",
    },
    {
      id: "check-balance",
      label: "Check Balance",
      icon: Wallet,
      action: () => {
        toast.info("💰 Wallet Balance", {
          description: "GAIA: 2,847.5 | ETH: 0.15 | BTC: 0.002",
          duration: 4000,
        });
      },
      color: "from-green-600 to-blue-600",
      hotkey: "W",
    },
    {
      id: "global-chat",
      label: "Global Chat",
      icon: MessageSquare,
      action: () => {
        toast.success("💬 Global Chat Opened!", {
          description: "2,847 fighters currently online and chatting!",
          duration: 3000,
        });
      },
      color: "from-cyan-600 to-blue-600",
      badge: "2.8K online",
      hotkey: "C",
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: BarChart3,
      action: () => {
        toast.info("📊 Leaderboard", {
          description: "Your rank: #247 | Next rank in 3 wins!",
          duration: 4000,
        });
      },
      color: "from-blue-600 to-purple-600",
      hotkey: "L",
    },
    {
      id: "find-friends",
      label: "Find Friends",
      icon: Users,
      action: () => {
        toast.success("👥 Friend Finder!", {
          description: "Found 12 fighters from your region online!",
          duration: 3000,
        });
      },
      color: "from-pink-600 to-purple-600",
      hotkey: "R",
    },
    {
      id: "impact-tracker",
      label: "Impact Tracker",
      icon: Heart,
      action: () => {
        toast.success("🌍 Impact Tracker!", {
          description: "Your gaming planted 47 trees this month!",
          duration: 4000,
        });
      },
      color: "from-green-600 to-emerald-600",
      hotkey: "I",
    },
  ];

  // Keyboard shortcuts
  useState(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey) {
        const action = quickActions.find((a) => a.hotkey?.toLowerCase() === e.key.toLowerCase());
        if (action) {
          e.preventDefault();
          action.action();
          toast.info(`⌨️ Hotkey Used: Ctrl+${action.hotkey}`, {
            description: `${action.label} activated!`,
            duration: 2000,
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`
        bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg 
        border border-gray-500/30 rounded-full p-2 shadow-2xl
        transition-all duration-300 ease-in-out
        ${isExpanded ? "w-auto" : "w-16"}
      `}
      >
        {/* Toggle Button */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            <Zap className="h-5 w-5" />
          </Button>

          {/* Quick Actions */}
          {isExpanded && (
            <div className="flex items-center gap-2 animate-fade-in">
              {quickActions.slice(0, 6).map((action) => (
                <div key={action.id} className="relative">
                  <Button
                    onClick={action.action}
                    className={`
                      rounded-full w-12 h-12 bg-gradient-to-r ${action.color} 
                      hover:scale-110 transition-all duration-200 shadow-lg
                      relative group
                    `}
                    title={`${action.label} ${action.hotkey ? `(Ctrl+${action.hotkey})` : ""}`}
                  >
                    <action.icon className="h-5 w-5" />
                  </Button>

                  {/* Badge */}
                  {action.badge && (
                    <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 min-w-0 h-5 flex items-center justify-center animate-pulse">
                      {action.badge}
                    </Badge>
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {action.label}
                    {action.hotkey && (
                      <span className="ml-1 text-gray-400">(Ctrl+{action.hotkey})</span>
                    )}
                  </div>
                </div>
              ))}

              {/* More Actions Button */}
              <Button
                className="rounded-full w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
                title="More Actions"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Action Grid */}
      {isExpanded && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border border-gray-500/30 rounded-2xl p-4 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <div key={action.id} className="relative group">
                <Button
                  onClick={action.action}
                  className={`
                    w-16 h-16 rounded-xl bg-gradient-to-br ${action.color} 
                    hover:scale-105 transition-all duration-200 shadow-lg
                    flex flex-col items-center justify-center gap-1
                  `}
                >
                  <action.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{action.label.split(" ")[0]}</span>
                </Button>

                {action.badge && (
                  <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 min-w-0 h-4 flex items-center justify-center animate-pulse">
                    {action.badge}
                  </Badge>
                )}

                {action.hotkey && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                    Ctrl+{action.hotkey}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-500/30 text-center">
            <div className="text-xs text-gray-400 mb-2">
              💡 Pro Tip: Use Ctrl+Key for instant actions!
            </div>
            <div className="flex justify-center gap-2">
              <Badge className="bg-green-600 text-white text-xs">
                <Flame className="h-3 w-3 mr-1" />
                Power User Mode
              </Badge>
              <Badge className="bg-blue-600 text-white text-xs">
                <Star className="h-3 w-3 mr-1" />
                All Systems Active
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
