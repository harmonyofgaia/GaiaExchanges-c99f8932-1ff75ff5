import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createTicker } from "../src/tick";
import type { GaiaTick } from "../src/types";

describe("createTicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("basic functionality", () => {
    it("should create ticker with start/stop/isRunning methods", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      expect(ticker).toHaveProperty("start");
      expect(ticker).toHaveProperty("stop");
      expect(ticker).toHaveProperty("isRunning");
      expect(typeof ticker.start).toBe("function");
      expect(typeof ticker.stop).toBe("function");
      expect(typeof ticker.isRunning).toBe("function");
    });

    it("should not be running initially", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      expect(ticker.isRunning()).toBe(false);
    });

    it("should be running after start", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      ticker.start();
      expect(ticker.isRunning()).toBe(true);
      
      ticker.stop();
    });

    it("should not be running after stop", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      ticker.start();
      ticker.stop();
      expect(ticker.isRunning()).toBe(false);
    });
  });

  describe("tick behavior", () => {
    it("should call onTick at specified intervals", () => {
      const onTick = vi.fn();
      const ticker = createTicker(10, onTick); // 10 FPS = 100ms intervals
      
      ticker.start();
      
      // No ticks yet
      expect(onTick).not.toHaveBeenCalled();
      
      // Advance by one interval
      vi.advanceTimersByTime(100);
      expect(onTick).toHaveBeenCalledTimes(1);
      
      // Advance by another interval
      vi.advanceTimersByTime(100);
      expect(onTick).toHaveBeenCalledTimes(2);
      
      ticker.stop();
    });

    it("should provide correct tick data structure", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      ticker.start();
      vi.advanceTimersByTime(Math.floor(1000 / 60)); // 60 FPS interval
      
      expect(onTick).toHaveBeenCalledWith(
        expect.objectContaining({
          now: expect.any(Number),
          delta: expect.any(Number),
          frame: expect.any(Number)
        })
      );
      
      ticker.stop();
    });

    it("should increment frame counter", () => {
      const onTick = vi.fn<[GaiaTick], void>();
      const ticker = createTicker(60, onTick);
      
      ticker.start();
      
      // First tick
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledWith(expect.objectContaining({ frame: 0 }));
      
      // Second tick
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledWith(expect.objectContaining({ frame: 1 }));
      
      // Third tick
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledWith(expect.objectContaining({ frame: 2 }));
      
      ticker.stop();
    });

    it("should calculate delta time correctly", () => {
      const onTick = vi.fn<[GaiaTick], void>();
      const ticker = createTicker(10, onTick); // 100ms intervals
      
      ticker.start();
      
      // First tick
      vi.advanceTimersByTime(100);
      const firstCall = onTick.mock.calls[0][0];
      
      // Second tick
      vi.advanceTimersByTime(100);
      const secondCall = onTick.mock.calls[1][0];
      
      // Delta should be approximately the interval (may have slight timing differences)
      expect(secondCall.delta).toBeCloseTo(100, 1);
      expect(secondCall.now).toBeGreaterThan(firstCall.now);
      
      ticker.stop();
    });

    it("should handle different FPS values", () => {
      const onTick = vi.fn();
      
      // Test 30 FPS
      const ticker30 = createTicker(30, onTick);
      ticker30.start();
      vi.advanceTimersByTime(Math.floor(1000 / 30)); // ~33ms
      expect(onTick).toHaveBeenCalledTimes(1);
      ticker30.stop();
      
      onTick.mockClear();
      
      // Test 120 FPS
      const ticker120 = createTicker(120, onTick);
      ticker120.start();
      vi.advanceTimersByTime(Math.floor(1000 / 120)); // ~8ms
      expect(onTick).toHaveBeenCalledTimes(1);
      ticker120.stop();
    });

    it("should enforce minimum interval of 1ms", () => {
      const onTick = vi.fn();
      const ticker = createTicker(10000, onTick); // Very high FPS should be clamped
      
      ticker.start();
      vi.advanceTimersByTime(1); // Minimum interval
      expect(onTick).toHaveBeenCalledTimes(1);
      ticker.stop();
    });

    it("should handle zero or negative FPS gracefully", () => {
      const onTick = vi.fn();
      
      // Should not throw and should clamp to reasonable value
      expect(() => {
        const ticker1 = createTicker(0, onTick);
        const ticker2 = createTicker(-10, onTick);
        ticker1.start();
        ticker2.start();
        ticker1.stop();
        ticker2.stop();
      }).not.toThrow();
    });
  });

  describe("start/stop behavior", () => {
    it("should allow multiple start calls without issues", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      ticker.start();
      ticker.start();
      ticker.start();
      
      expect(ticker.isRunning()).toBe(true);
      
      // Should still tick normally
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledTimes(1);
      
      ticker.stop();
    });

    it("should allow multiple stop calls without issues", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      ticker.start();
      ticker.stop();
      ticker.stop();
      ticker.stop();
      
      expect(ticker.isRunning()).toBe(false);
      
      // Should not tick after stop
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).not.toHaveBeenCalled();
    });

    it("should support start/stop cycles", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      // First cycle
      ticker.start();
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledTimes(1);
      ticker.stop();
      
      // Should not tick when stopped
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledTimes(1);
      
      // Second cycle
      ticker.start();
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledTimes(2);
      ticker.stop();
    });

    it("should continue frame counter across restarts", () => {
      const onTick = vi.fn<[GaiaTick], void>();
      const ticker = createTicker(60, onTick);
      
      // First run
      ticker.start();
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenLastCalledWith(expect.objectContaining({ frame: 1 }));
      ticker.stop();
      
      onTick.mockClear();
      
      // Second run - frame should continue counting
      ticker.start();
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledWith(expect.objectContaining({ frame: 2 }));
      ticker.stop();
    });
  });

  describe("error handling", () => {
    it("should continue ticking even if onTick throws an error", () => {
      let callCount = 0;
      const onTick = vi.fn(() => {
        callCount++;
        if (callCount === 2) {
          throw new Error("Test error");
        }
      });
      
      const ticker = createTicker(60, onTick);
      ticker.start();
      
      // First tick - should work
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledTimes(1);
      
      // Second tick - should throw but not stop ticker
      expect(() => {
        vi.advanceTimersByTime(Math.floor(1000 / 60));
      }).toThrow("Test error");
      expect(onTick).toHaveBeenCalledTimes(2);
      
      // Third tick - should continue working
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      expect(onTick).toHaveBeenCalledTimes(3);
      
      ticker.stop();
    });
  });

  describe("timing accuracy", () => {
    it("should maintain consistent timing intervals", () => {
      const ticks: GaiaTick[] = [];
      const onTick = vi.fn((tick: GaiaTick) => {
        ticks.push(tick);
      });
      
      const ticker = createTicker(10, onTick); // 100ms intervals
      ticker.start();
      
      // Collect several ticks
      for (let i = 0; i < 5; i++) {
        vi.advanceTimersByTime(100);
      }
      
      ticker.stop();
      
      // Check that intervals are consistent
      for (let i = 1; i < ticks.length; i++) {
        const deltaTime = ticks[i].now - ticks[i - 1].now;
        expect(deltaTime).toBeCloseTo(100, 1);
      }
    });

    it("should handle performance.now availability", () => {
      // Mock performance.now being unavailable
      const originalPerformance = globalThis.performance;
      delete (globalThis as any).performance;
      
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      ticker.start();
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      
      expect(onTick).toHaveBeenCalledWith(
        expect.objectContaining({
          now: expect.any(Number),
          delta: expect.any(Number),
          frame: 0
        })
      );
      
      ticker.stop();
      
      // Restore performance
      globalThis.performance = originalPerformance;
    });
  });

  describe("memory management", () => {
    it("should clean up timer when stopped", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      ticker.start();
      expect(ticker.isRunning()).toBe(true);
      
      ticker.stop();
      expect(ticker.isRunning()).toBe(false);
      
      // Should not continue ticking after stop
      vi.advanceTimersByTime(1000);
      expect(onTick).not.toHaveBeenCalled();
    });

    it("should not leak timers on multiple start/stop cycles", () => {
      const onTick = vi.fn();
      const ticker = createTicker(60, onTick);
      
      // Multiple cycles should not create multiple timers
      for (let i = 0; i < 10; i++) {
        ticker.start();
        ticker.stop();
      }
      
      // Final start
      ticker.start();
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      
      // Should only have one active timer
      expect(onTick).toHaveBeenCalledTimes(1);
      
      ticker.stop();
    });
  });

  describe("edge cases", () => {
    it("should handle very high FPS values", () => {
      const onTick = vi.fn();
      const ticker = createTicker(1000, onTick); // Very high FPS
      
      ticker.start();
      vi.advanceTimersByTime(1); // Minimum interval
      expect(onTick).toHaveBeenCalledTimes(1);
      ticker.stop();
    });

    it("should handle fractional FPS values", () => {
      const onTick = vi.fn();
      const ticker = createTicker(59.94, onTick); // NTSC frame rate
      
      ticker.start();
      const expectedInterval = Math.floor(1000 / 59.94);
      vi.advanceTimersByTime(expectedInterval);
      expect(onTick).toHaveBeenCalledTimes(1);
      ticker.stop();
    });

    it("should work with different onTick function signatures", () => {
      // Sync function
      const syncOnTick = vi.fn((tick: GaiaTick) => {
        return tick.frame;
      });
      
      // Async function (though ticker doesn't await it)
      const asyncOnTick = vi.fn(async (tick: GaiaTick) => {
        return Promise.resolve(tick.frame);
      });
      
      const ticker1 = createTicker(60, syncOnTick);
      const ticker2 = createTicker(60, asyncOnTick);
      
      ticker1.start();
      ticker2.start();
      
      vi.advanceTimersByTime(Math.floor(1000 / 60));
      
      expect(syncOnTick).toHaveBeenCalled();
      expect(asyncOnTick).toHaveBeenCalled();
      
      ticker1.stop();
      ticker2.stop();
    });
  });
});