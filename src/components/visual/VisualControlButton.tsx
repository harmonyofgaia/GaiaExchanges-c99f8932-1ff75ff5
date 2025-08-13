import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Brush,
  Lock,
  Unlock,
  Palette,
  LayoutDashboard,
  Zap,
  Eye,
} from "lucide-react";
import { useLock } from "lovable/src/components/providers/ThemeProvider";
import { toast } from "sonner";
import { VisualControlMenu } from "./VisualControlMenu";
import { EnhancedVisualControls } from "./EnhancedVisualControls";

export function VisualControlButton() {
  const { isLocked, toggleLock } = useLock();
  const [isOpen, setIsOpen] = useState(false);
  const [showFullMenu, setShowFullMenu] = useState(false);

  const handleLockToggle = () => {
    toggleLock();
    toast.success(
      isLocked ? "Visual controls unlocked" : "Visual controls locked",
      {
        description: isLocked
          ? "You can now modify visual settings"
          : "Visual settings are now protected",
        duration: 2000,
      },
    );
  };

  const handleOpenFullMenu = () => {
    if (isLocked) {
      toast.error("Visual controls are locked", {
        description: "Unlock to access visual customization options",
        duration: 3000,
      });
      return;
    }
    setShowFullMenu(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg border-2 border-purple-400/30 backdrop-blur-sm"
              title="Visual Controls"
            >
              <Brush className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            side="top"
            className="w-72 bg-background/95 border-primary/30 backdrop-blur-sm"
          >
            <DropdownMenuLabel className="text-primary font-semibold">
              🎨 Visual Controls
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-primary/30" />

            {/* Lock Toggle */}
            <DropdownMenuItem
              onClick={handleLockToggle}
              className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10 cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {isLocked ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                  <span>
                    {isLocked ? "Controls Locked" : "Controls Unlocked"}
                  </span>
                </div>
                <Badge
                  variant={isLocked ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {isLocked ? "Protected" : "Editable"}
                </Badge>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-primary/30" />

            {/* Visual Options */}
            <DropdownMenuItem
              onClick={handleOpenFullMenu}
              className={`text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 cursor-pointer ${
                isLocked ? "opacity-60" : ""
              }`}
              disabled={isLocked}
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Background Settings</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleOpenFullMenu}
              className={`text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 cursor-pointer ${
                isLocked ? "opacity-60" : ""
              }`}
              disabled={isLocked}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Layout Designer</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleOpenFullMenu}
              className={`text-green-300 hover:text-green-200 hover:bg-green-500/10 cursor-pointer ${
                isLocked ? "opacity-60" : ""
              }`}
              disabled={isLocked}
            >
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Color Palettes</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleOpenFullMenu}
              className={`text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 cursor-pointer ${
                isLocked ? "opacity-60" : ""
              }`}
              disabled={isLocked}
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Animation Controls</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleOpenFullMenu}
              className={`text-pink-300 hover:text-pink-200 hover:bg-pink-500/10 cursor-pointer ${
                isLocked ? "opacity-60" : ""
              }`}
              disabled={isLocked}
            >
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>Visual Effects</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Full Visual Control Menu Modal */}
      {showFullMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background/95 backdrop-blur-sm border border-primary/30 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">
                  Enhanced Visual Control Panel
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullMenu(false)}
                  className="text-muted-foreground hover:text-primary"
                >
                  ✕
                </Button>
              </div>

              <EnhancedVisualControls />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
