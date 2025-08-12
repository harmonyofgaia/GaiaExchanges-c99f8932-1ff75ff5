import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

interface LockToggleProps {
  isLocked: boolean;
  onLockToggle: () => void;
}

export function LockToggle({ isLocked, onLockToggle }: LockToggleProps) {
  return (
    <Button
      onClick={onLockToggle}
      variant={isLocked ? "destructive" : "outline"}
      size="sm"
      className="flex items-center gap-2"
    >
      {isLocked ? (
        <>
          <Lock className="h-4 w-4" />
          Locked
        </>
      ) : (
        <>
          <Unlock className="h-4 w-4" />
          Unlocked
        </>
      )}
    </Button>
  );
}
