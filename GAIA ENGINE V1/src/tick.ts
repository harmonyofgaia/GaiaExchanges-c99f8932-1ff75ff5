import type { GaiaTick } from "./types";

export function createTicker(targetFps: number, onTick: (t: GaiaTick) => void) {
  const interval = Math.max(1, Math.floor(1000 / Math.max(1, targetFps)));
  let timer: ReturnType<typeof setInterval> | null = null;
  let frame = 0;
  let last = (globalThis.performance?.now?.() ?? Date.now());

  function tick() {
    const now = (globalThis.performance?.now?.() ?? Date.now());
    const delta = now - last;
    last = now;
    onTick({ now, delta, frame: frame++ });
  }

  return {
    start() { if (timer) return; last = (globalThis.performance?.now?.() ?? Date.now()); timer = setInterval(tick, interval); },
    stop() { if (!timer) return; clearInterval(timer); timer = null; },
    isRunning() { return !!timer; }
  };
}
