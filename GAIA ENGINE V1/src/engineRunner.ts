import { EventBus } from "./eventBus";
import { StateStore } from "./stateStore";
import { createTicker } from "./tick";
import type { GaiaBehavior, GaiaTick } from "./types";
import { PluginHost } from "./plugins/pluginHost";
import type { GaiaPlugin } from "./plugins/types";

export type EngineEvent<S> =
  | { type: "tick"; payload: GaiaTick; at: number }
  | { type: "state:updated"; payload: S; at: number }
  | { type: "behavior:applied"; payload: { behaviorId: string }; at: number };

export type EngineConfig<S, C> = {
  initialState: S;
  fps?: number;
  context?: C;
};

export class GaiaEngine<S, C = unknown> {
  private store: StateStore<S>;
  private bus = new EventBus<EngineEvent<S>>();
  private behaviors = new Map<string, GaiaBehavior<S, C>>();
  private ticker = createTicker(this.fps, (t) => this.onTick(t));
  private ctx: C | undefined;
  private timeScale = 1;

  // Extensions
  private plugins = new PluginHost<S, C>();
  private priorities = new Map<string, number>();
  private paused = new Set<string>();

  constructor(private readonly cfg: EngineConfig<S, C>) {
    this.store = new StateStore<S>(cfg.initialState);
    this.ctx = cfg.context;
  }

  private get fps() { return Math.max(1, Math.floor(this.cfg.fps ?? 30)); }

  // Events
  on<T extends EngineEvent<S>["type"]>(type: T, handler: (e: Extract<EngineEvent<S>, { type: T }>) => void) {
    return this.bus.on(type as any, handler as any);
  }

  // State
  getState(): S { return this.store.get(); }
  subscribe(fn: (s: S) => void) { return this.store.subscribe(fn); }

  // Selectors
  onSelected<T>(selector: (s: S) => T, handler: (value: T, state: S) => void, equals?: (a: T, b: T) => boolean, immediate = true) {
    const eq = equals ?? Object.is;
    let last = selector(this.store.get());
    if (immediate) { try { handler(last, this.store.get()); } catch {} }
    return this.store.subscribe((s) => {
      const v = selector(s);
      if (!eq(v, last)) {
        last = v;
        try { handler(v, s); } catch {}
      }
    });
  }

  // Behaviors
  addBehavior(b: GaiaBehavior<S, C>) { this.behaviors.set(b.id, b); return () => this.behaviors.delete(b.id); }
  removeBehavior(id: string) { this.behaviors.delete(id); this.priorities.delete(id); this.paused.delete(id); }
  listBehaviors(): string[] { return Array.from(this.behaviors.keys()); }
  setBehaviorPriority(id: string, priority?: number) {
    if (priority === undefined || !Number.isFinite(priority)) this.priorities.delete(id);
    else this.priorities.set(id, Number(priority));
  }
  pauseBehavior(id: string) { this.paused.add(id); }
  resumeBehavior(id: string) { this.paused.delete(id); }
  isBehaviorPaused(id: string) { return this.paused.has(id); }

  // Plugins
  use(...plugins: GaiaPlugin<S, C>) { return this.plugins.attach(this, ...plugins); }
  disposePlugins() { this.plugins.dispose(); }

  // Engine controls
  setContext(ctx: C) { this.ctx = ctx; }
  setTimeScale(scale: number) { this.timeScale = Number.isFinite(scale) && scale > 0 ? scale : 1; }
  setFps(fps: number) {
    const wasRunning = this.isRunning();
    this.stop();
    (this as any).cfg = { ...this.cfg, fps: Math.max(1, Math.floor(fps)) };
    // @ts-expect-error reinit private in same class
    this.ticker = createTicker(this.fps, (t) => this.onTick(t));
    if (wasRunning) this.start();
  }
  resetState(next: S) { this.store.set(next); }

  // Lifecycle
  start() { this.ticker.start(); }
  stop() { this.ticker.stop(); }
  isRunning() { return this.ticker.isRunning(); }

  private onTick(tick: GaiaTick) {
    const scaled: GaiaTick = { ...tick, delta: tick.delta * this.timeScale };
    this.bus.emit({ type: "tick", payload: scaled, at: scaled.now });

    let next = this.store.get();
    const ordered = Array.from(this.behaviors.values()).sort((a, b) =>
      (this.priorities.get(a.id) ?? 0) - (this.priorities.get(b.id) ?? 0)
    );
    for (const b of ordered) {
      if (this.paused.has(b.id)) continue;
      next = b.step(next, scaled, this.ctx as C);
      this.bus.emit({ type: "behavior:applied", payload: { behaviorId: b.id }, at: scaled.now });
    }

    if (!Object.is(next, this.store.get())) {
      this.store.set(next);
      this.bus.emit({ type: "state:updated", payload: next, at: scaled.now });
    }
  }
}
