// GAIA Engine Game Loop Prototype
// Handles main update/render cycle and entity/component management

export interface Component {
  type: string;
  update?(dt: number): void;
}

export class Entity {
  id: string;
  components: Map<string, Component> = new Map();

  constructor(id: string) {
    this.id = id;
  }

  addComponent(component: Component) {
    this.components.set(component.type, component);
  }

  getComponent(type: string): Component | undefined {
    return this.components.get(type);
  }

  update(dt: number) {
    for (const comp of this.components.values()) {
      if (comp.update) comp.update(dt);
    }
  }
}

export class GameLoop {
  entities: Map<string, Entity> = new Map();
  running = false;
  lastTime = 0;

  addEntity(entity: Entity) {
    this.entities.set(entity.id, entity);
  }

  removeEntity(id: string) {
    this.entities.delete(id);
  }

  start() {
    this.running = true;
    this.lastTime = Date.now();
    this.loop();
  }

  stop() {
    this.running = false;
  }

  loop() {
    if (!this.running) return;
    const now = Date.now();
    const dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    for (const entity of this.entities.values()) {
      entity.update(dt);
    }
    setTimeout(() => this.loop(), 16); // ~60 FPS
  }
}
