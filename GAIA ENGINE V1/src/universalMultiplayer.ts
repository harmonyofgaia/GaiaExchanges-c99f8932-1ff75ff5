// Universal Multiplayer: Core Prototype
// Connect any game, device, or reality for shared experiences in GAIA Engine.

export interface PlayerConnection {
  id: string;
  device: string;
  reality: "physical" | "virtual" | "augmented";
  status: "connected" | "disconnected";
}

export class UniversalMultiplayer {
  connections: PlayerConnection[] = [];

  connect(
    id: string,
    device: string,
    reality: "physical" | "virtual" | "augmented",
  ) {
    this.connections.push({ id, device, reality, status: "connected" });
  }

  disconnect(id: string) {
    const conn = this.connections.find((c) => c.id === id);
    if (conn) conn.status = "disconnected";
  }

  broadcast(message: string) {
    this.connections.forEach((conn) => {
      if (conn.status === "connected") {
        // Simulate sending message
        console.log(`[Broadcast to ${conn.id}]: ${message}`);
      }
    });
  }
}

// Example usage
const multiplayer = new UniversalMultiplayer();
multiplayer.connect("player1", "VR Headset", "virtual");
multiplayer.connect("player2", "Mobile", "physical");
multiplayer.broadcast("Welcome to the GAIA Universe!");
