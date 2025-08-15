import { describe, it, expect, vi, beforeEach } from "vitest";
import { StateStore } from "../src/stateStore";

interface TestState {
  count: number;
  name: string;
  nested: {
    value: number;
  };
}

describe("StateStore", () => {
  let store: StateStore<TestState>;
  const initialState: TestState = {
    count: 0,
    name: "test",
    nested: { value: 42 }
  };

  beforeEach(() => {
    store = new StateStore(initialState);
  });

  describe("constructor", () => {
    it("should initialize with provided state", () => {
      const state = store.get();
      expect(state).toEqual(initialState);
    });
  });

  describe("get", () => {
    it("should return current state", () => {
      const state = store.get();
      expect(state).toEqual(initialState);
    });

    it("should return reference to state object", () => {
      const state1 = store.get();
      const state2 = store.get();
      expect(state1).toBe(state2);
    });
  });

  describe("set", () => {
    it("should update state", () => {
      const newState = { count: 1, name: "updated", nested: { value: 100 } };
      store.set(newState);
      
      expect(store.get()).toEqual(newState);
    });

    it("should not trigger listeners if state is identical (Object.is)", () => {
      const listener = vi.fn();
      store.subscribe(listener);
      
      const currentState = store.get();
      store.set(currentState); // Same reference
      
      expect(listener).not.toHaveBeenCalled();
    });

    it("should trigger listeners when state changes", () => {
      const listener = vi.fn();
      store.subscribe(listener);
      
      const newState = { count: 1, name: "updated", nested: { value: 100 } };
      store.set(newState);
      
      expect(listener).toHaveBeenCalledWith(newState);
    });

    it("should handle listener errors gracefully", () => {
      const errorListener = vi.fn(() => { throw new Error("Listener error"); });
      const normalListener = vi.fn();
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      store.subscribe(errorListener);
      store.subscribe(normalListener);
      
      const newState = { count: 1, name: "updated", nested: { value: 100 } };
      store.set(newState);
      
      expect(errorListener).toHaveBeenCalledWith(newState);
      expect(normalListener).toHaveBeenCalledWith(newState);
      expect(consoleSpy).toHaveBeenCalledWith('StateStore listener error:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });

    it("should trigger all listeners in order", () => {
      const callOrder: number[] = [];
      const listener1 = vi.fn(() => callOrder.push(1));
      const listener2 = vi.fn(() => callOrder.push(2));
      const listener3 = vi.fn(() => callOrder.push(3));
      
      store.subscribe(listener1);
      store.subscribe(listener2);
      store.subscribe(listener3);
      
      const newState = { count: 1, name: "updated", nested: { value: 100 } };
      store.set(newState);
      
      expect(callOrder).toEqual([1, 2, 3]);
    });
  });

  describe("patch", () => {
    it("should merge partial state with current state", () => {
      store.patch({ count: 5 });
      
      expect(store.get()).toEqual({
        count: 5,
        name: "test",
        nested: { value: 42 }
      });
    });

    it("should handle nested object updates", () => {
      store.patch({ nested: { value: 100 } });
      
      expect(store.get()).toEqual({
        count: 0,
        name: "test",
        nested: { value: 100 }
      });
    });

    it("should trigger listeners when patching", () => {
      const listener = vi.fn();
      store.subscribe(listener);
      
      store.patch({ count: 5 });
      
      expect(listener).toHaveBeenCalledWith({
        count: 5,
        name: "test",
        nested: { value: 42 }
      });
    });

    it("should work with array state", () => {
      const arrayStore = new StateStore([1, 2, 3]);
      arrayStore.patch({ 1: 10 }); // Update index 1
      
      expect(arrayStore.get()).toEqual([1, 10, 3]);
    });

    it("should not trigger listeners if patch results in identical state", () => {
      const listener = vi.fn();
      store.subscribe(listener);
      
      // Patch with same values and same structure
      const currentState = store.get();
      store.set(currentState); // Setting same reference should not trigger
      
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("subscribe", () => {
    it("should return unsubscribe function", () => {
      const listener = vi.fn();
      const unsubscribe = store.subscribe(listener);
      
      // Should receive update before unsubscribe
      store.set({ count: 1, name: "updated", nested: { value: 100 } });
      expect(listener).toHaveBeenCalledTimes(1);
      
      // Unsubscribe
      unsubscribe();
      
      // Should not receive update after unsubscribe
      store.set({ count: 2, name: "updated2", nested: { value: 200 } });
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it("should support multiple subscribers", () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      
      store.subscribe(listener1);
      store.subscribe(listener2);
      
      const newState = { count: 1, name: "updated", nested: { value: 100 } };
      store.set(newState);
      
      expect(listener1).toHaveBeenCalledWith(newState);
      expect(listener2).toHaveBeenCalledWith(newState);
    });

    it("should handle multiple unsubscribes gracefully", () => {
      const listener = vi.fn();
      const unsubscribe = store.subscribe(listener);
      
      // Multiple unsubscribes should not throw
      unsubscribe();
      unsubscribe();
      
      store.set({ count: 1, name: "updated", nested: { value: 100 } });
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("select", () => {
    it("should call onChange when selected value changes", () => {
      const selector = (state: TestState) => state.count;
      const onChange = vi.fn();
      
      const unsubscribe = store.select(selector, onChange);
      
      store.patch({ count: 5 });
      expect(onChange).toHaveBeenCalledWith(5);
      
      unsubscribe();
    });

    it("should not call onChange when selected value remains the same", () => {
      const selector = (state: TestState) => state.count;
      const onChange = vi.fn();
      
      store.select(selector, onChange);
      
      // Change different property
      store.patch({ name: "different" });
      expect(onChange).not.toHaveBeenCalled();
    });

    it("should use Object.is for value comparison", () => {
      const obj = { x: 1 };
      const objStore = new StateStore({ data: obj });
      
      const selector = (state: { data: typeof obj }) => state.data;
      const onChange = vi.fn();
      
      objStore.select(selector, onChange);
      
      // Set same reference
      objStore.set({ data: obj });
      expect(onChange).not.toHaveBeenCalled();
      
      // Set different object with same content
      objStore.set({ data: { x: 1 } });
      expect(onChange).toHaveBeenCalledWith({ x: 1 });
    });

    it("should return unsubscribe function", () => {
      const selector = (state: TestState) => state.count;
      const onChange = vi.fn();
      
      const unsubscribe = store.select(selector, onChange);
      
      store.patch({ count: 5 });
      expect(onChange).toHaveBeenCalledTimes(1);
      
      unsubscribe();
      
      store.patch({ count: 10 });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("should support nested property selection", () => {
      const selector = (state: TestState) => state.nested.value;
      const onChange = vi.fn();
      
      store.select(selector, onChange);
      
      store.patch({ nested: { value: 999 } });
      expect(onChange).toHaveBeenCalledWith(999);
    });

    it("should support computed selectors", () => {
      const selector = (state: TestState) => `${state.name}:${state.count}`;
      const onChange = vi.fn();
      
      store.select(selector, onChange);
      
      store.patch({ count: 1 });
      expect(onChange).toHaveBeenCalledWith("test:1");
      
      store.patch({ name: "updated" });
      expect(onChange).toHaveBeenCalledWith("updated:1");
    });
  });

  describe("memory management", () => {
    it("should clean up all listeners properly", () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      const selector = (state: TestState) => state.count;
      const onChange = vi.fn();
      
      const unsub1 = store.subscribe(listener1);
      const unsub2 = store.subscribe(listener2);
      const unsub3 = store.select(selector, onChange);
      
      // Verify all are working
      store.patch({ count: 1 });
      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
      
      // Cleanup
      unsub1();
      unsub2();
      unsub3();
      
      // Reset mocks
      listener1.mockClear();
      listener2.mockClear();
      onChange.mockClear();
      
      // Verify cleanup
      store.patch({ count: 2 });
      expect(listener1).not.toHaveBeenCalled();
      expect(listener2).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle null state", () => {
      const nullStore = new StateStore<null>(null);
      expect(nullStore.get()).toBe(null);
      
      const listener = vi.fn();
      nullStore.subscribe(listener);
      
      nullStore.set(null); // Same value, should not trigger
      expect(listener).not.toHaveBeenCalled();
    });

    it("should handle undefined state", () => {
      const undefinedStore = new StateStore<undefined>(undefined);
      expect(undefinedStore.get()).toBe(undefined);
    });

    it("should handle primitive state types", () => {
      const numberStore = new StateStore(42);
      const stringStore = new StateStore("hello");
      const booleanStore = new StateStore(true);
      
      expect(numberStore.get()).toBe(42);
      expect(stringStore.get()).toBe("hello");
      expect(booleanStore.get()).toBe(true);
      
      const numberListener = vi.fn();
      numberStore.subscribe(numberListener);
      
      numberStore.set(100);
      expect(numberListener).toHaveBeenCalledWith(100);
    });

    it("should handle circular references gracefully", () => {
      interface CircularState {
        value: number;
        ref?: CircularState;
      }
      
      const circularState: CircularState = { value: 1 };
      circularState.ref = circularState;
      
      const circularStore = new StateStore(circularState);
      
      // Should not throw when handling circular references
      expect(() => {
        circularStore.set({ value: 2, ref: circularState });
      }).not.toThrow();
    });
  });
});