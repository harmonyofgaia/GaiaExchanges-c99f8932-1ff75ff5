# GAIA Engine V1

A typed, robust event-driven engine with state management, timing, and AI behavior capabilities.

## Live Progress

- ✅ Core Engine Architecture: 80% (EventBus, StateStore, Ticker complete)
- ✅ Type System: 90% (Strong typing with minimal any usage)
- ✅ AI Integration: 60% (Baseline behaviors implemented)
- ✅ Testing Infrastructure: 95% (Comprehensive test coverage)
- Core Engine Architecture: 30%
- Modular System: 30%
- Storage System (Cloud/External): 20%
- Plugin/Extension System: 20%
- UI/UX Framework: 10%
- Live Stats & Analytics: 20%

Progress updated: Main engine entrypoint wired up, core and modular system at 30%. **NEW**: EventBus, StateStore, Ticker, and baseline AI behaviors implemented with comprehensive tests.

## Core Modules

### EventBus

Type-safe event system with reliable subscriber management and error isolation.

```typescript
import { EventBus } from "./src/eventBus";

interface GameEvent {
  type: string;
  payload?: unknown;
  at: number;
}

const eventBus = new EventBus<GameEvent>();

// Subscribe to events
const unsubscribe = eventBus.on("player-moved", (event) => {
  console.log("Player moved:", event.payload);
});

// Subscribe once
eventBus.once("game-started", (event) => {
  console.log("Game started!");
});

// Emit events
eventBus.emit({ type: "player-moved", payload: { x: 10, y: 20 }, at: Date.now() });

// Async emission
await eventBus.emitAsync({ type: "game-started", at: Date.now() });

// Clean up
unsubscribe();
```

**Features:**
- Type-safe event handling
- Memory leak prevention
- Error isolation (failing handlers don't affect others)
- Support for both sync and async handlers
- One-time event subscriptions with `once()`

### StateStore

Predictable state management with selective subscriptions and immutable updates.

```typescript
import { StateStore } from "./src/stateStore";

interface GameState {
  level: number;
  score: number;
  player: {
    x: number;
    y: number;
  };
}

const store = new StateStore<GameState>({
  level: 1,
  score: 0,
  player: { x: 0, y: 0 }
});

// Subscribe to all state changes
const unsubscribe = store.subscribe((state) => {
  console.log("State changed:", state);
});

// Subscribe to specific properties
const unsubscribeScore = store.select(
  (state) => state.score,
  (score) => console.log("Score changed:", score)
);

// Update state
store.set({
  level: 2,
  score: 100,
  player: { x: 10, y: 20 }
});

// Partial updates
store.patch({ score: 150 });
store.patch({ player: { x: 15, y: 25 } });

// Get current state
const currentState = store.get();
```

**Features:**
- Type-safe state management
- Selective subscriptions with `select()`
- Partial updates with `patch()`
- Efficient change detection (Object.is)
- Error isolation for listeners

### Ticker

High-precision timing system for game loops and animations.

```typescript
import { createTicker } from "./src/tick";
import type { GaiaTick } from "./src/types";

// Create a 60 FPS ticker
const ticker = createTicker(60, (tick: GaiaTick) => {
  console.log(`Frame ${tick.frame}: ${tick.delta}ms since last tick`);
  
  // Update game logic here
  updateGame(tick.delta);
  render();
});

// Start the ticker
ticker.start();

// Check if running
if (ticker.isRunning()) {
  console.log("Ticker is running");
}

// Stop the ticker
ticker.stop();
```

**Features:**
- Configurable frame rate
- Drift-minimized intervals
- Frame counting
- Delta time calculation
- Start/stop lifecycle management
- Works in Node.js and browser environments

### Baseline AI Behaviors

Simple, composable AI behaviors for emergent gameplay.

```typescript
import { createRandomDriftBehavior } from "./src/ai/behaviors/baseline";
import type { GaiaTick } from "./src/types";

// Create a behavior that randomly drifts numeric values
const driftBehavior = createRandomDriftBehavior(["x", "y", "velocity"], 0.1);

// Apply to state
let agentState = { x: 10, y: 20, velocity: 5, name: "Agent1" };

const tick: GaiaTick = { now: Date.now(), delta: 16.67, frame: 0 };
agentState = driftBehavior.step(agentState, tick, {});

console.log("Updated state:", agentState);
// x, y, and velocity will have small random changes
// name remains unchanged
```

**Features:**
- Composable behavior system
- Type-safe state transformations
- Configurable drift parameters
- Preserves non-numeric properties

## Types

Core type definitions for the GAIA Engine ecosystem.

```typescript
import type { GaiaTick, GaiaEvent, GaiaBehavior } from "./src/types";

// Tick information for time-based updates
interface GaiaTick {
  now: number;    // Current timestamp
  delta: number;  // Time since last tick
  frame: number;  // Frame counter
}

// Event structure for EventBus
interface GaiaEvent<T extends string = string, P = unknown> {
  type: T;
  payload: P;
  at: number;
}

// Behavior interface for AI systems
interface GaiaBehavior<S = Record<string, unknown>, C = Record<string, unknown>> {
  id: string;
  describe?(state: S, ctx: C): string;
  step(state: S, tick: GaiaTick, ctx: C): S;
}
```

## Architecture Principles

### Type Safety
All modules provide strong TypeScript typing with no `any` types in the core API surface.

### Error Isolation
Failing event handlers, state listeners, or tick callbacks are isolated and don't affect other components.

### Memory Management
All subscriptions provide unsubscribe functions to prevent memory leaks.

### Predictable State
State changes are synchronous and use Object.is for efficient change detection.

### Performance
- Minimal allocations during runtime
- Efficient data structures (Set, Map)
- Optional async paths for expensive operations

## Testing

Comprehensive test suite covering:
- Event bus reliability and memory management
- State store consistency and subscriptions
- Ticker timing accuracy and lifecycle
- AI behavior determinism and edge cases

Run tests with:
```bash
npm test
```

## Integration

The GAIA Engine modules are designed to work together:

```typescript
import { EventBus } from "./src/eventBus";
import { StateStore } from "./src/stateStore";
import { createTicker } from "./src/tick";

// Integrated game engine example
class GameEngine {
  private eventBus = new EventBus();
  private stateStore = new StateStore({ running: false });
  private ticker = createTicker(60, (tick) => this.update(tick));

  start() {
    this.stateStore.set({ running: true });
    this.ticker.start();
    this.eventBus.emit({ type: "engine-started", at: Date.now() });
  }

  stop() {
    this.ticker.stop();
    this.stateStore.set({ running: false });
    this.eventBus.emit({ type: "engine-stopped", at: Date.now() });
  }

  private update(tick: GaiaTick) {
    if (!this.stateStore.get().running) return;
    
    // Emit tick event for other systems
    this.eventBus.emit({ 
      type: "tick", 
      payload: tick, 
      at: tick.now 
    });
  }
}
```
