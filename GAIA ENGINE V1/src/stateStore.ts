type Listener<S> = (state: S) => void;

export class StateStore<S> {
  private state: S;
  private listeners = new Set<Listener<S>>();

  constructor(initial: S) {
    this.state = initial;
  }

  get(): S {
    return this.state;
  }

  set(next: S) {
    if (Object.is(this.state, next)) return;
    this.state = next;
    for (const l of Array.from(this.listeners)) {
      try {
        l(this.state);
      } catch {
        /* Silent error handling */
      }
    }
  }

  patch(partial: Partial<S>) {
    this.set(
      Object.assign(
        Array.isArray(this.state) ? ([] as any) : {},
        this.state as any,
        partial,
      ),
    );
  }

  subscribe(fn: Listener<S>) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  select<T>(selector: (s: S) => T, onChange: (v: T) => void) {
    let prev = selector(this.state);
    const sub = this.subscribe((s) => {
      const next = selector(s);
      if (!Object.is(prev, next)) {
        prev = next;
        onChange(next);
      }
    });
    return sub;
  }
}
