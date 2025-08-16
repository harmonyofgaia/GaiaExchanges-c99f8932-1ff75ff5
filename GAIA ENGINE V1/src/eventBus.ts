type Handler<E extends { type: string }> = (event: E) => void | Promise<void>;

export class EventBus<
  E extends { type: string } = { type: string; payload?: unknown; at: number },
> {
  private listeners = new Map<string, Set<Handler<E>>>();

  on<T extends E["type"]>(type: T, handler: Handler<E>) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(handler);
    return () => this.off(type, handler);
  }

  once<T extends E["type"]>(type: T, handler: Handler<E>) {
    const off = this.on(type, async (evt) => {
      try {
        await handler(evt);
      } finally {
        off();
      }
    });
    return off;
  }

  off<T extends E["type"]>(type: T, handler: Handler<E>) {
    this.listeners.get(type)?.delete(handler);
  }

  clear(type?: E["type"]) {
    if (type) this.listeners.delete(type);
    else this.listeners.clear();
  }

  emit(event: E) {
    const set = this.listeners.get(event.type);
    if (!set || set.size === 0) return 0;
    for (const h of Array.from(set)) {
      try {
        h(event);
      } catch (error) {
        console.warn('Event handler error:', error);
      }
    }
    return set.size;
  }

  async emitAsync(event: E) {
    const set = this.listeners.get(event.type);
    if (!set || set.size === 0) return 0;
    await Promise.all(
      Array.from(set).map(async (h) => {
        try {
          await h(event);
        } catch (error) {
          console.warn('Async event handler error:', error);
        }
      }),
    );
    return set.size;
  }
}
