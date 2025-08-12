import { GameModeSelector } from "./gaming/GameModeSelector";
import { GameStyleSelector } from "./gaming/GameStyleSelector";

export function EnhancedGamingModes() {
  return (
    <div className="space-y-8">
      <GameModeSelector />
      <GameStyleSelector />
    </div>
  );
}
