import type { GaiaBehavior, GaiaTick } from "../../types";

export type NumericState = Record<string, number>;

export function createRandomDriftBehavior(keys: string[], epsilon = 0.01): GaiaBehavior<NumericState, void> {
  return {
    id: "random-drift",
    describe: (s) => `Drifting keys(${keys.join(",")}) ±${epsilon}`,
    step: (state: NumericState, _tick: GaiaTick) => {
      const next: NumericState = { ...state };
      for (const k of keys) {
        const v = Number.isFinite(next[k]) ? next[k] : 0;
        const delta = (Math.random() * 2 - 1) * epsilon;
        next[k] = v + delta;
      }
      return next;
    }
  };
}
