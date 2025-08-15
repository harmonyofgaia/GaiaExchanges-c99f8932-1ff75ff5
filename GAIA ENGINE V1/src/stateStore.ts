type Listener<S> = (state: S) => void;

export class StateStore<S> {
  private state: S;
  private listeners = new Set<Listener<S>>();

  constructor(initial: S) { this.state = initial; }

  get(): S { return this.state; }

  set(next: S) {
    if (Object.is(this.state, next)) return;
    this.state = next;
    for (const l of Array.from(this.listeners)) { 
      try { 
        l(this.state); 
      } catch (error) {
        // Silently ignore listener errors to prevent one failing listener from affecting others
        console.warn('StateStore listener error:', error);
      }
    }
  }

  patch(partial: Partial<S>) {
    if (Array.isArray(this.state)) {
      this.patchArray(partial);
    } else if (typeof this.state === 'object' && this.state !== null) {
      this.patchObject(partial);
    } else {
      throw new Error('StateStore.patch: Cannot patch primitive or null state. Patch is only supported for object or array state types.');
    }
  }

  private patchArray(partial: Partial<S>) {
    // For arrays, merge using spread (shallow copy)
    // Patch specific indices using Object.assign
    const newArray = [...(this.state as unknown[])];
    Object.assign(newArray, partial);
    this.set(newArray as S);
  }

  private patchObject(partial: Partial<S>) {
    // For objects, merge using spread
    this.set({ ...this.state, ...partial } as S);
  }
  subscribe(fn: Listener<S>) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  select<T>(selector: (s: S) => T, onChange: (v: T) => void) {
    let prev = selector(this.state);
    const sub = this.subscribe((s) => {
      const next = selector(s);
      if (!Object.is(prev, next)) { prev = next; onChange(next); }
    });
    return sub;
  }
}
