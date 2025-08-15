import { GaiaEngine } from "../engineRunner";
import type { GaiaPlugin } from "./types";

export type PersistenceOptions<S> = {
  save: (state: S) => void;
  load?: () => S | undefined;
  throttleMs?: number;
  beforeSave?: (state: S) => unknown;
  afterLoad?: (loaded: unknown) => S;
  onError?: (e: unknown) => void;
};

export function createPersistencePlugin<S, C>(opts: PersistenceOptions<S>): GaiaPlugin<S, C> {
  const throttle = Math.max(50, Math.floor(opts.throttleMs ?? 500));
  const before = opts.beforeSave ?? ((s: S) => s as unknown);
  const after = opts.afterLoad ?? ((v: unknown) => v as S);
  return {
    setup(engine: GaiaEngine<S, C>) {
      try {
        if (opts.load) {
          const loaded = opts.load();
          if (typeof loaded !== "undefined") {
            engine.resetState(after(loaded));
          }
        }
      } catch (e) {
        try { opts.onError?.(e); } catch {}
      }
      let last = 0;
      const off = engine.on("state:updated", (e) => {
        try {
          const now = (e as any).at as number;
          if (now - last >= throttle) {
            last = now;
            opts.save(before((e as any).payload as S) as S);
          }
        } catch (err) {
          try { opts.onError?.(err); } catch {}
        }
      });
      return () => off();
    }
  };
}

/** Browser-only helper: JSON localStorage adapter. */
export function browserLocalStorageAdapter<S>(key: string) {
  return {
    save(state: S) { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} },
    load(): S | undefined {
      try {
        const s = localStorage.getItem(key);
        return s ? JSON.parse(s) as S : undefined;
      } catch { return undefined; }
    }
  };
}
