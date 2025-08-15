import { describe, it, expect, beforeEach } from "vitest";
import { createRandomDriftBehavior } from "../src/ai/behaviors/baseline";
import type { GaiaTick } from "../src/types";

describe("createRandomDriftBehavior", () => {
  let mockTick: GaiaTick;

  beforeEach(() => {
    mockTick = {
      now: Date.now(),
      delta: 16.67, // ~60fps
      frame: 0
    };
  });

  describe("behavior creation", () => {
    it("should create behavior with correct id", () => {
      const behavior = createRandomDriftBehavior(["x", "y"]);
      expect(behavior.id).toBe("random-drift");
    });

    it("should have describe method", () => {
      const behavior = createRandomDriftBehavior(["x", "y"], 0.1);
      expect(behavior.describe).toBeDefined();
      expect(typeof behavior.describe).toBe("function");
    });

    it("should have step method", () => {
      const behavior = createRandomDriftBehavior(["x", "y"]);
      expect(behavior.step).toBeDefined();
      expect(typeof behavior.step).toBe("function");
    });

    it("should describe itself correctly", () => {
      const behavior = createRandomDriftBehavior(["x", "y", "z"], 0.05);
      const state = { x: 1, y: 2, z: 3 };
      
      const description = behavior.describe?.(state, undefined);
      expect(description).toBe("Drifting keys(x,y,z) ±0.05");
    });

    it("should use default epsilon when not provided", () => {
      const behavior = createRandomDriftBehavior(["x"]);
      const state = { x: 1 };
      
      const description = behavior.describe?.(state, undefined);
      expect(description).toBe("Drifting keys(x) ±0.01");
    });
  });

  describe("step behavior", () => {
    it("should return new state object", () => {
      const behavior = createRandomDriftBehavior(["x", "y"]);
      const initialState = { x: 1, y: 2, z: 3 };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      expect(newState).not.toBe(initialState); // Different reference
      expect(newState).toEqual(expect.objectContaining({ z: 3 })); // Unchanged property
    });

    it("should modify specified keys", () => {
      const behavior = createRandomDriftBehavior(["x", "y"]);
      const initialState = { x: 1, y: 2, z: 3 };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      expect(newState.x).not.toBe(initialState.x);
      expect(newState.y).not.toBe(initialState.y);
      expect(newState.z).toBe(initialState.z); // Unchanged
    });

    it("should not modify non-specified keys", () => {
      const behavior = createRandomDriftBehavior(["x"]);
      const initialState = { x: 1, y: 2, z: 3, w: 4 };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      expect(newState.y).toBe(initialState.y);
      expect(newState.z).toBe(initialState.z);
      expect(newState.w).toBe(initialState.w);
    });

    it("should apply drift within epsilon bounds", () => {
      const epsilon = 0.1;
      const behavior = createRandomDriftBehavior(["x"], epsilon);
      const initialValue = 10;
      const initialState = { x: initialValue };
      
      // Run multiple steps and check bounds
      for (let i = 0; i < 100; i++) {
        const newState = behavior.step(initialState, mockTick, undefined);
        const drift = Math.abs(newState.x - initialValue);
        expect(drift).toBeLessThanOrEqual(epsilon);
      }
    });

    it("should handle non-finite initial values", () => {
      const behavior = createRandomDriftBehavior(["x", "y", "z"]);
      const initialState = { 
        x: NaN, 
        y: Infinity, 
        z: -Infinity,
        normal: 5 
      };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      // Should default non-finite values to 0 and apply drift
      expect(Number.isFinite(newState.x)).toBe(true);
      expect(Number.isFinite(newState.y)).toBe(true);
      expect(Number.isFinite(newState.z)).toBe(true);
      expect(Number.isFinite(newState.normal)).toBe(true);
    });

    it("should handle missing keys gracefully", () => {
      const behavior = createRandomDriftBehavior(["x", "missing"]);
      const initialState = { x: 1, y: 2 };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      expect(newState.x).not.toBe(initialState.x); // Should be modified
      expect(newState.missing).toBeDefined(); // Should be created
      expect(Number.isFinite(newState.missing)).toBe(true);
      expect(newState.y).toBe(initialState.y); // Should be unchanged
    });

    it("should produce different results on multiple calls", () => {
      const behavior = createRandomDriftBehavior(["x"], 0.1);
      const initialState = { x: 5 };
      
      const results = [];
      for (let i = 0; i < 10; i++) {
        const newState = behavior.step(initialState, mockTick, undefined);
        results.push(newState.x);
      }
      
      // Results should be varied (not all identical)
      const uniqueResults = new Set(results);
      expect(uniqueResults.size).toBeGreaterThan(1);
    });

    it("should maintain state structure", () => {
      const behavior = createRandomDriftBehavior(["value"]);
      const initialState = { 
        value: 1, 
        metadata: { id: "test" },
        array: [1, 2, 3] 
      };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      expect(newState.metadata).toBe(initialState.metadata);
      expect(newState.array).toBe(initialState.array);
      expect(newState.value).not.toBe(initialState.value);
    });
  });

  describe("epsilon parameter", () => {
    it("should use larger epsilon for bigger drifts", () => {
      const smallEpsilon = 0.001;
      const largeEpsilon = 1.0;
      
      const smallBehavior = createRandomDriftBehavior(["x"], smallEpsilon);
      const largeBehavior = createRandomDriftBehavior(["x"], largeEpsilon);
      
      const initialState = { x: 10 };
      
      const smallResults = [];
      const largeResults = [];
      
      for (let i = 0; i < 50; i++) {
        const smallState = smallBehavior.step(initialState, mockTick, undefined);
        const largeState = largeBehavior.step(initialState, mockTick, undefined);
        
        smallResults.push(Math.abs(smallState.x - initialState.x));
        largeResults.push(Math.abs(largeState.x - initialState.x));
      }
      
      const avgSmallDrift = smallResults.reduce((a, b) => a + b) / smallResults.length;
      const avgLargeDrift = largeResults.reduce((a, b) => a + b) / largeResults.length;
      
      expect(avgLargeDrift).toBeGreaterThan(avgSmallDrift);
    });

    it("should handle zero epsilon", () => {
      const behavior = createRandomDriftBehavior(["x"], 0);
      const initialState = { x: 5 };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      // With zero epsilon, value should remain unchanged
      expect(newState.x).toBe(initialState.x);
    });

    it("should handle negative epsilon", () => {
      const behavior = createRandomDriftBehavior(["x"], -0.1);
      const initialState = { x: 5 };
      
      // Should not throw and should behave predictably
      expect(() => {
        const newState = behavior.step(initialState, mockTick, undefined);
        expect(Number.isFinite(newState.x)).toBe(true);
      }).not.toThrow();
    });
  });

  describe("multiple keys", () => {
    it("should handle empty keys array", () => {
      const behavior = createRandomDriftBehavior([]);
      const initialState = { x: 1, y: 2 };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      // Should return identical state when no keys specified
      expect(newState).toEqual(initialState);
    });

    it("should handle many keys", () => {
      const keys = Array.from({ length: 100 }, (_, i) => `key${i}`);
      const behavior = createRandomDriftBehavior(keys, 0.01);
      
      const initialState = keys.reduce((state, key, index) => {
        state[key] = index;
        return state;
      }, {} as Record<string, number>);
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      // All keys should be modified
      keys.forEach(key => {
        expect(newState[key]).not.toBe(initialState[key]);
        expect(Number.isFinite(newState[key])).toBe(true);
      });
    });

    it("should handle duplicate keys gracefully", () => {
      const behavior = createRandomDriftBehavior(["x", "x", "y", "x"]);
      const initialState = { x: 1, y: 2 };
      
      // Should not throw and should produce valid result
      expect(() => {
        const newState = behavior.step(initialState, mockTick, undefined);
        expect(Number.isFinite(newState.x)).toBe(true);
        expect(Number.isFinite(newState.y)).toBe(true);
      }).not.toThrow();
    });
  });

  describe("context parameter", () => {
    it("should ignore context parameter", () => {
      const behavior = createRandomDriftBehavior(["x"]);
      const initialState = { x: 1 };
      const context = { someContext: "value" };
      
      // Should work the same regardless of context
      const newState1 = behavior.step(initialState, mockTick, undefined);
      const newState2 = behavior.step(initialState, mockTick, context);
      
      expect(Number.isFinite(newState1.x)).toBe(true);
      expect(Number.isFinite(newState2.x)).toBe(true);
    });
  });

  describe("tick parameter", () => {
    it("should ignore tick parameter", () => {
      const behavior = createRandomDriftBehavior(["x"]);
      const initialState = { x: 1 };
      
      const tick1: GaiaTick = { now: 1000, delta: 16, frame: 0 };
      const tick2: GaiaTick = { now: 2000, delta: 32, frame: 100 };
      
      // Should work the same regardless of tick data
      const newState1 = behavior.step(initialState, tick1, undefined);
      const newState2 = behavior.step(initialState, tick2, undefined);
      
      expect(Number.isFinite(newState1.x)).toBe(true);
      expect(Number.isFinite(newState2.x)).toBe(true);
    });
  });

  describe("type safety", () => {
    it("should work with typed state interfaces", () => {
      interface Position {
        x: number;
        y: number;
        z?: number;
      }
      
      const behavior = createRandomDriftBehavior(["x", "y"]);
      const initialState: Position = { x: 1, y: 2 };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      expect(typeof newState.x).toBe("number");
      expect(typeof newState.y).toBe("number");
      expect(newState.z).toBeUndefined();
    });

    it("should preserve non-numeric properties", () => {
      interface MixedState {
        x: number;
        name: string;
        active: boolean;
        data: object;
      }
      
      const behavior = createRandomDriftBehavior(["x"]);
      const initialState: MixedState = { 
        x: 1, 
        name: "test", 
        active: true, 
        data: { nested: "value" } 
      };
      
      const newState = behavior.step(initialState, mockTick, undefined);
      
      expect(newState.x).not.toBe(initialState.x);
      expect(newState.name).toBe(initialState.name);
      expect(newState.active).toBe(initialState.active);
      expect(newState.data).toBe(initialState.data);
    });
  });
});