import { describe, it, expect, vi, beforeEach } from "vitest";
import { EventBus } from "../src/eventBus";

interface TestEvent {
  type: string;
  payload?: unknown;
  at: number;
}

describe("EventBus", () => {
  let eventBus: EventBus<TestEvent>;

  beforeEach(() => {
    eventBus = new EventBus<TestEvent>();
  });

  describe("on/emit", () => {
    it("should emit events to registered listeners", () => {
      const handler = vi.fn();
      eventBus.on("test", handler);
      
      const event = { type: "test", payload: "data", at: Date.now() };
      const count = eventBus.emit(event);
      
      expect(handler).toHaveBeenCalledWith(event);
      expect(count).toBe(1);
    });

    it("should return 0 when no listeners are registered", () => {
      const event = { type: "unknown", payload: "data", at: Date.now() };
      const count = eventBus.emit(event);
      
      expect(count).toBe(0);
    });

    it("should support multiple listeners for the same event", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      
      eventBus.on("test", handler1);
      eventBus.on("test", handler2);
      
      const event = { type: "test", payload: "data", at: Date.now() };
      const count = eventBus.emit(event);
      
      expect(handler1).toHaveBeenCalledWith(event);
      expect(handler2).toHaveBeenCalledWith(event);
      expect(count).toBe(2);
    });

    it("should isolate handler errors and continue execution", () => {
      const errorHandler = vi.fn(() => { throw new Error("Handler error"); });
      const normalHandler = vi.fn();
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      eventBus.on("test", errorHandler);
      eventBus.on("test", normalHandler);
      
      const event = { type: "test", payload: "data", at: Date.now() };
      const count = eventBus.emit(event);
      
      expect(errorHandler).toHaveBeenCalledWith(event);
      expect(normalHandler).toHaveBeenCalledWith(event);
      expect(count).toBe(2);
      expect(consoleSpy).toHaveBeenCalledWith('EventBus handler error:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });

    it("should return unsubscribe function", () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.on("test", handler);
      
      // Should receive event before unsubscribe
      eventBus.emit({ type: "test", payload: "data1", at: Date.now() });
      expect(handler).toHaveBeenCalledTimes(1);
      
      // Unsubscribe
      unsubscribe();
      
      // Should not receive event after unsubscribe
      eventBus.emit({ type: "test", payload: "data2", at: Date.now() });
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe("once", () => {
    it("should call handler only once", () => {
      const handler = vi.fn();
      eventBus.once("test", handler);
      
      const event1 = { type: "test", payload: "data1", at: Date.now() };
      const event2 = { type: "test", payload: "data2", at: Date.now() };
      
      eventBus.emit(event1);
      eventBus.emit(event2);
      
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event1);
    });

    it("should return unsubscribe function", () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.once("test", handler);
      
      // Unsubscribe before event
      unsubscribe();
      
      eventBus.emit({ type: "test", payload: "data", at: Date.now() });
      expect(handler).not.toHaveBeenCalled();
    });

    it("should handle async handlers correctly", async () => {
      const handler = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });
      
      eventBus.once("test", handler);
      
      const event1 = { type: "test", payload: "data1", at: Date.now() };
      const event2 = { type: "test", payload: "data2", at: Date.now() };
      
      eventBus.emit(event1);
      eventBus.emit(event2);
      
      // Wait for async handler to complete
      await new Promise(resolve => setTimeout(resolve, 20));
      
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(event1);
    });
  });

  describe("off", () => {
    it("should remove specific handler", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      
      eventBus.on("test", handler1);
      eventBus.on("test", handler2);
      
      eventBus.off("test", handler1);
      
      const event = { type: "test", payload: "data", at: Date.now() };
      eventBus.emit(event);
      
      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalledWith(event);
    });

    it("should handle removing non-existent handler gracefully", () => {
      const handler = vi.fn();
      
      eventBus.off("test", handler); // Should not throw
      
      const event = { type: "test", payload: "data", at: Date.now() };
      eventBus.emit(event);
      
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("clear", () => {
    it("should clear all listeners for specific event type", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      const handler3 = vi.fn();
      
      eventBus.on("test1", handler1);
      eventBus.on("test1", handler2);
      eventBus.on("test2", handler3);
      
      eventBus.clear("test1");
      
      eventBus.emit({ type: "test1", payload: "data", at: Date.now() });
      eventBus.emit({ type: "test2", payload: "data", at: Date.now() });
      
      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
      expect(handler3).toHaveBeenCalled();
    });

    it("should clear all listeners when no type specified", () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      
      eventBus.on("test1", handler1);
      eventBus.on("test2", handler2);
      
      eventBus.clear();
      
      eventBus.emit({ type: "test1", payload: "data", at: Date.now() });
      eventBus.emit({ type: "test2", payload: "data", at: Date.now() });
      
      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
    });
  });

  describe("emitAsync", () => {
    it("should emit events to async handlers", async () => {
      const handler = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
      });
      
      eventBus.on("test", handler);
      
      const event = { type: "test", payload: "data", at: Date.now() };
      const count = await eventBus.emitAsync(event);
      
      expect(handler).toHaveBeenCalledWith(event);
      expect(count).toBe(1);
    });

    it("should return 0 when no listeners are registered", async () => {
      const event = { type: "unknown", payload: "data", at: Date.now() };
      const count = await eventBus.emitAsync(event);
      
      expect(count).toBe(0);
    });

    it("should wait for all async handlers to complete", async () => {
      const results: number[] = [];
      
      const handler1 = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 20));
        results.push(1);
      });
      
      const handler2 = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        results.push(2);
      });
      
      eventBus.on("test", handler1);
      eventBus.on("test", handler2);
      
      const event = { type: "test", payload: "data", at: Date.now() };
      const count = await eventBus.emitAsync(event);
      
      expect(handler1).toHaveBeenCalledWith(event);
      expect(handler2).toHaveBeenCalledWith(event);
      expect(count).toBe(2);
      expect(results).toHaveLength(2);
      expect(results).toEqual(expect.arrayContaining([1, 2]));
    });

    it("should isolate async handler errors and continue execution", async () => {
      const errorHandler = vi.fn(async () => { 
        throw new Error("Async handler error"); 
      });
      const normalHandler = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 5));
      });
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      eventBus.on("test", errorHandler);
      eventBus.on("test", normalHandler);
      
      const event = { type: "test", payload: "data", at: Date.now() };
      const count = await eventBus.emitAsync(event);
      
      expect(errorHandler).toHaveBeenCalledWith(event);
      expect(normalHandler).toHaveBeenCalledWith(event);
      expect(count).toBe(2);
      expect(consoleSpy).toHaveBeenCalledWith('EventBus async handler error:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe("type safety", () => {
    it("should enforce event type constraints", () => {
      // This is a compile-time test - TypeScript should catch type mismatches
      const typedEventBus = new EventBus<{ type: "specific"; data: string }>();
      
      const handler = vi.fn();
      typedEventBus.on("specific", handler);
      
      const event = { type: "specific" as const, data: "test" };
      typedEventBus.emit(event);
      
      expect(handler).toHaveBeenCalledWith(event);
    });
  });

  describe("memory management", () => {
    it("should properly clean up listeners to prevent memory leaks", () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.on("test", handler);
      
      // Verify listener is registered
      expect(eventBus.emit({ type: "test", payload: "data", at: Date.now() })).toBe(1);
      
      // Unsubscribe and verify cleanup
      unsubscribe();
      expect(eventBus.emit({ type: "test", payload: "data", at: Date.now() })).toBe(0);
    });

    it("should handle multiple unsubscribes gracefully", () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.on("test", handler);
      
      // Multiple unsubscribes should not throw
      unsubscribe();
      unsubscribe();
      
      expect(eventBus.emit({ type: "test", payload: "data", at: Date.now() })).toBe(0);
    });
  });
});