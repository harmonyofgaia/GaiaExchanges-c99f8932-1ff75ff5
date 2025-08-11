import { Outlet } from "react-router-dom";
import { PersistentAudioControls } from "@/components/audio/PersistentAudioControls";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Outlet />
      </main>
      <PersistentAudioControls />
    </div>
  );
}
