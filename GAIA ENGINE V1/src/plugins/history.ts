import { GaiaEngine } from "../engineRunner";
import type { GaiaPlugin } from "./types";

export type HistoryController<S> = {
  undo(): void;
  redo(): void;
  clear(): void;
  canUndo(): boolean;
  canRedo(): boolean;
  length(): number;
  index(): number;
};

export function createHistoryPlugin<S, C>(capacity = 200): { plugin: GaiaPlugin<S, C>; controller: HistoryController<S> } {
  const cap = Math.max(2, Math.floor(capacity));
  let stack: S[] = [];
  let idx = -1;
  let suppress = false;
  let engine: GaiaEngine<S, C> | undefined;

  const controller: HistoryController<S> = {
    undo() { if (idx > 0) { suppress = true; idx -= 1; engine?.resetState(stack[idx]); suppress = false; } },
    redo() { if (idx >= 0 && idx < stack.length - 1) { suppress = true; idx += 1; engine?.resetState(stack[idx]); suppress = false; } },
    clear() { stack = idx >= 0 ? [stack[idx]] : []; idx = stack.length - 1; },
    canUndo() { return idx > 0; },
    canRedo() { return idx >= 0 && idx < stack.length - 1; },
    length() { return stack.length; },
    index() { return idx; }
  };

  const plugin: GaiaPlugin<S, C> = {
    setup(e: GaiaEngine<S, C>) {
      engine = e;
      stack = [e.getState()];
      idx = 0;
      const off = e.on("state:updated", (ev) => {
        if (suppress) return;
        const s = (ev as any).payload as S;
        if (idx < stack.length - 1) stack.splice(idx + 1);
        stack.push(s); idx = stack.length - 1;
        if (stack.length > cap) { const drop = stack.length - cap; stack.splice(0, drop); idx -= drop; }
      });
      return () => { off(); engine = undefined; };
    }
  };

  return { plugin, controller };
}
