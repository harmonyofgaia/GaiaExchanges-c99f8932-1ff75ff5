import { GaiaEngine } from "../engineRunner";
import type { GaiaPlugin } from "./types";

export class PluginHost<S, C> {
  private disposers: Array<() => void> = [];
  attach(engine: GaiaEngine<S, C>, ...plugins: GaiaPlugin<S, C>[]) {
    this.dispose();
    this.disposers = plugins.map(p => p.setup(engine));
    return () => this.dispose();
  }
  dispose() {
    for (const d of this.disposers.splice(0)) {
      try { d(); } catch {}
    }
  }
}
