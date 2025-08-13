import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Eye, EyeOff } from "lucide-react";
import { useSecureAdmin } from "@/hooks/useSecureAdmin";
import { toast } from "sonner";

interface AdminReverseButtonProps {
  onReverse?: () => void;
}

export function AdminReverseButton({ onReverse }: AdminReverseButtonProps) {
  const { isAdmin } = useSecureAdmin();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  // Load visibility setting from localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem(
      "admin-reverse-button-visible",
    );
    setIsVisible(savedVisibility === "true");
  }, []);

  // Don't render if not admin
  if (!isAdmin) return null;

  const handleReverse = () => {
    if (onReverse) {
      onReverse();
    } else {
      // Default reverse action - show instruction to user
      toast.info("Reverse Last Action", {
        description:
          'Go to chat history and click "Restore" on the previous edit to revert changes.',
        duration: 5000,
      });
    }
  };

  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem(
      "admin-reverse-button-visible",
      newVisibility.toString(),
    );

    toast.success(`Reverse button ${newVisibility ? "enabled" : "disabled"}`, {
      description: `Admin reverse button is now ${newVisibility ? "visible" : "hidden"} on all pages.`,
      duration: 3000,
    });
  };

  return (
    <>
      {/* Toggle visibility button - always visible for admin */}
      <Button
        onClick={toggleVisibility}
        className="fixed top-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 opacity-50 hover:opacity-100 transition-all duration-300"
        size="sm"
      >
        {isVisible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>

      {/* Reverse button - conditionally visible */}
      {isVisible && (
        <Button
          onClick={handleReverse}
          disabled={!isEnabled}
          className="fixed bottom-4 right-4 z-50 bg-red-600 hover:bg-red-700 shadow-lg border-2 border-red-400/50 animate-pulse"
          size="lg"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          🔄 REVERSE LAST ACTION
        </Button>
      )}
    </>
  );
}
