
import { describe, it, expect } from "vitest";
import { GaiaEngine } from "../src/coreEngine";

describe("GaiaEngine", () => {
  it("should initialize with config and set status to ready", () => {
    const engine = new GaiaEngine({ name: "Test", version: "1.0.0" });
    expect(engine.status).toBe("ready");
    expect(engine.config.name).toBe("Test");
  });

  it("should start and set status to running", () => {
    const engine = new GaiaEngine({ name: "Test", version: "1.0.0" });
    engine.start();
    expect(engine.status).toBe("running");
  });

  it("should stop and set status to ready", () => {
    const engine = new GaiaEngine({ name: "Test", version: "1.0.0" });
    engine.start();
    engine.stop();
    expect(engine.status).toBe("ready");
  });
});
